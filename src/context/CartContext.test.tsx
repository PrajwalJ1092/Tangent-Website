import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import type { ReactNode } from 'react'
import { CartProvider, useCart } from './index'
import { PRODUCTS } from '@/data/products'

const sampleProduct = PRODUCTS[0]! // prod-01: Minimal Living Room 3D Scene (₹11,990 = 1,199,000 paise)
const secondProduct = PRODUCTS[1]! // prod-02: Tectonic Monograph Portfolio Template (₹8,990 = 899,000 paise)

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('PHASE 05 — Cart Architecture & Authoritative Hydration', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })

  it('initializes with an empty cart and zero paise totals', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.summary.itemCount).toBe(0)
    expect(result.current.summary.subtotalInPaise).toBe(0)
    expect(result.current.summary.discountInPaise).toBe(0)
    expect(result.current.summary.totalInPaise).toBe(0)
  })

  it('persists only minimal product identifiers and quantities in localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(sampleProduct, 'standard', 1)
    })

    const rawStored = window.localStorage.getItem('tangent_studio_cart_v2')
    expect(rawStored).not.toBeNull()
    const parsed = JSON.parse(rawStored!)

    // Must be minimal: { productId, license, quantity }
    expect(parsed).toEqual([
      {
        productId: 'prod-01',
        license: 'standard',
        quantity: 1,
      },
    ])
    // Must NOT contain full duplicate product object
    expect(parsed[0].name).toBeUndefined()
    expect(parsed[0].fullDescription).toBeUndefined()
  })

  it('hydrates cart line items accurately from the authoritative product catalog', () => {
    // Seed localStorage with minimal representation
    window.localStorage.setItem(
      'tangent_studio_cart_v2',
      JSON.stringify([
        { productId: 'prod-01', license: 'standard', quantity: 2 },
      ]),
    )

    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.items).toHaveLength(1)
    const item = result.current.items[0]!
    expect(item.productId).toBe('prod-01')
    expect(item.product.name).toBe('Minimal Living Room 3D Scene')
    expect(item.quantity).toBe(2)
    expect(item.unitPriceInPaise).toBe(1199000)
    expect(item.lineTotalInPaise).toBe(2398000)
  })

  it('handles duplicate additions by incrementing seat quantities capped at 10', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(sampleProduct, 'standard', 1)
      result.current.addItem(sampleProduct, 'standard', 2)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0]!.quantity).toBe(3)
    expect(result.current.summary.itemCount).toBe(3)

    // Attempting to exceed 10 seats is capped safely
    act(() => {
      result.current.updateQuantity(result.current.items[0]!.id, 15)
    })
    expect(result.current.items[0]!.quantity).toBe(10)
  })

  it('removes an item when quantity is set to 0 or negative', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(sampleProduct, 'standard', 2)
    })
    expect(result.current.items).toHaveLength(1)

    act(() => {
      result.current.updateQuantity(result.current.items[0]!.id, 0)
    })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.summary.itemCount).toBe(0)
  })

  it('clears all items via clearCart()', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(sampleProduct, 'standard', 1)
      result.current.addItem(secondProduct, 'standard', 1)
    })
    expect(result.current.items).toHaveLength(2)

    act(() => {
      result.current.clearCart()
    })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.summary.itemCount).toBe(0)
    expect(result.current.summary.totalInPaise).toBe(0)
  })

  it('recovers gracefully from corrupted or malformed localStorage data', () => {
    window.localStorage.setItem('tangent_studio_cart_v2', 'MALFORMED_JSON_STRING_#@!')

    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.summary.totalInPaise).toBe(0)
  })

  it('gracefully skips discontinued or missing product identifiers', () => {
    window.localStorage.setItem(
      'tangent_studio_cart_v2',
      JSON.stringify([
        { productId: 'non-existent-retired-product-999', license: 'standard', quantity: 1 },
        { productId: 'prod-02', license: 'standard', quantity: 1 },
      ]),
    )

    const { result } = renderHook(() => useCart(), { wrapper })

    // Discontinued product filtered out; valid product-02 preserved
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0]!.productId).toBe('prod-02')
  })
})

describe('PHASE 05 — Paise Calculations & Promotional Discounts', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })

  it('performs pure integer paise calculations with 18% GST estimate', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(sampleProduct, 'standard', 1) // ₹11,990 = 1,199,000 paise
    })

    const subtotal = 1199000
    const expectedTax = Math.round(subtotal * 0.18) // 215,820 paise = ₹2,158.20 -> ₹2,158
    const expectedTotal = subtotal + expectedTax // 1,414,820 paise = ₹14,148

    expect(result.current.summary.subtotalInPaise).toBe(subtotal)
    expect(result.current.summary.discountInPaise).toBe(0)
    expect(result.current.summary.estimatedTaxInPaise).toBe(expectedTax)
    expect(result.current.summary.totalInPaise).toBe(expectedTotal)
  })

  it('applies promo code TANGENT10 for 10% discount and recomputes tax on net total', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(sampleProduct, 'standard', 1) // 1,199,000 paise
    })

    act(() => {
      const promoResult = result.current.applyDiscountCode('TANGENT10')
      expect(promoResult.success).toBe(true)
    })

    const subtotal = 1199000
    const discount = Math.round((subtotal * 10) / 100) // 119,900 paise = ₹1,199
    const netTaxable = subtotal - discount // 1,079,100 paise
    const expectedTax = Math.round(netTaxable * 0.18) // 194,238 paise
    const expectedTotal = netTaxable + expectedTax // 1,273,338 paise

    expect(result.current.summary.discountInPaise).toBe(discount)
    expect(result.current.summary.estimatedTaxInPaise).toBe(expectedTax)
    expect(result.current.summary.totalInPaise).toBe(expectedTotal)

    // Remove promo code restores original total
    act(() => {
      result.current.removeDiscountCode()
    })
    expect(result.current.summary.discountInPaise).toBe(0)
  })

  it('rejects invalid promo codes with clear failure messages', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      const res = result.current.applyDiscountCode('INVALID_CODE_99')
      expect(res.success).toBe(false)
      expect(res.message).toContain('invalid or expired')
    })
    expect(result.current.appliedDiscount).toBeNull()
  })
})

describe('PHASE 05 — Demo Order Placement', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })

  it('creates a simulated demo order, clears the active cart, and saves to sessionStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(sampleProduct, 'standard', 1)
    })

    let createdOrder: unknown = null
    act(() => {
      createdOrder = result.current.placeDemoOrder({
        fullName: 'Ar. Maya Lin',
        email: 'maya@linstudio.arch',
        studioName: 'Maya Lin Spatial Studio',
        country: 'India',
        stateProvince: 'Karnataka',
        postalCode: '560001',
        agreeToLicenseTerms: true,
      })
    })

    expect(createdOrder).not.toBeNull()
    const order = createdOrder as ReturnType<typeof result.current.placeDemoOrder>

    // Check demo order signature
    expect(order.id).toMatch(/^DEMO-TNG-2026-[A-Z0-9]+$/)
    expect(order.isSimulated).toBe(true)
    expect(order.status).toBe('simulated_demo')
    expect(order.customer.fullName).toBe('Ar. Maya Lin')
    expect(order.customer.email).toBe('maya@linstudio.arch')
    expect(order.items).toHaveLength(1)
    expect(order.items[0]!.productName).toBe('Minimal Living Room 3D Scene')

    // Cart is cleared after order creation
    expect(result.current.items).toHaveLength(0)
    expect(result.current.summary.itemCount).toBe(0)

    // Persisted in sessionStorage for refresh resilience
    const rawSaved = window.sessionStorage.getItem('tangent_studio_last_order')
    expect(rawSaved).not.toBeNull()
    expect(JSON.parse(rawSaved!).id).toBe(order.id)
  })

  it('throws an error if attempting to place an order from an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    expect(() =>
      result.current.placeDemoOrder({
        fullName: 'Test User',
        email: 'test@example.com',
        country: 'India',
        stateProvince: 'Delhi',
        postalCode: '110001',
        agreeToLicenseTerms: true,
      }),
    ).toThrow(/Cannot create an order from an empty cart/i)
  })
})
