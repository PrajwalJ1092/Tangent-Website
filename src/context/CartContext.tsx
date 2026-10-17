import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import type {
  CartItem,
  StoredCartItem,
  CartSummary,
  DiscountRule,
  CheckoutFormData,
} from '@/types/cart'
import type { DigitalProduct, LicenseType } from '@/types/product'
import type { DemoOrder, OrderItemSnapshot } from '@/types/order'
import { getProductById } from '@/data/products'
import {
  calculateLineTotal,
  calculateSubtotal,
  calculateDiscount,
  calculateEstimatedTax,
  calculateOrderTotal,
  lookupPromoCode,
} from '@/lib/pricing'
import { CartContext, type ApplyDiscountResult } from './cartContextDef'

const CART_STORAGE_KEY = 'tangent_studio_cart_v2'
const LAST_ORDER_STORAGE_KEY = 'tangent_studio_last_order'

/**
 * Validates whether an unknown value parsed from storage matches StoredCartItem schema.
 */
function isValidStoredItem(item: unknown): item is StoredCartItem {
  if (!item || typeof item !== 'object') return false
  const candidate = item as Record<string, unknown>
  const hasValidId =
    typeof candidate.productId === 'string' && candidate.productId.trim().length > 0
  const hasValidQty =
    typeof candidate.quantity === 'number' &&
    Number.isInteger(candidate.quantity) &&
    candidate.quantity > 0
  return hasValidId && hasValidQty
}

/**
 * Safely parses and validates persisted cart items from localStorage.
 */
function loadStoredCart(): StoredCartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      console.warn('[Cart] Malformed cart data in localStorage. Resetting to empty cart.')
      return []
    }

    // Filter only valid items
    return parsed.filter(isValidStoredItem)
  } catch (err) {
    console.warn('[Cart] Error parsing localStorage cart, recovering gracefully:', err)
    return []
  }
}

/**
 * Safely loads the last confirmed demo order from sessionStorage for page refresh resilience.
 */
function loadLastOrder(): DemoOrder | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(LAST_ORDER_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as DemoOrder
    if (parsed && parsed.isSimulated && parsed.id) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Stored items represent only ID, license, and quantity (no stale product copies)
  const [storedItems, setStoredItems] = useState<StoredCartItem[]>(() => loadStoredCart())
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountRule | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [lastOrder, setLastOrder] = useState<DemoOrder | null>(() => loadLastOrder())

  // Persist minimal state to localStorage on modification
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedItems))
    } catch (e) {
      console.warn('[Cart] LocalStorage write failed:', e)
    }
  }, [storedItems])

  // Hydrate stored items against the authoritative product catalog
  const items = useMemo<CartItem[]>(() => {
    const hydrated: CartItem[] = []

    for (const stored of storedItems) {
      const product = getProductById(stored.productId)
      if (!product) {
        console.warn(
          `[Cart] Product ID "${stored.productId}" is discontinued or missing from catalog. Skipping.`,
        )
        continue
      }

      const license: LicenseType = stored.license || 'standard'
      const multiplier =
        license === 'extended' ? 2.5 : license === 'commercial' ? 1.5 : 1

      const unitPriceInPaise = Math.round(product.priceInPaise * multiplier)
      const lineTotalInPaise = calculateLineTotal(unitPriceInPaise, stored.quantity)
      const unitPriceUsd = Math.round((product.priceUsd || 100) * multiplier)

      hydrated.push({
        id: `${product.id}-${license}`,
        productId: product.id,
        license,
        quantity: stored.quantity,
        product,
        unitPriceInPaise,
        lineTotalInPaise,
        unitPriceUsd,
      })
    }

    return hydrated
  }, [storedItems])

  // Cart operations
  const addItem = useCallback(
    (product: DigitalProduct, license: LicenseType = 'standard', quantity = 1) => {
      setStoredItems((prev) => {
        const existingIdx = prev.findIndex(
          (item) => item.productId === product.id && (item.license || 'standard') === license,
        )

        if (existingIdx >= 0) {
          // Increment license seats (max 10 workstation seats per order)
          return prev.map((item, idx) =>
            idx === existingIdx
              ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
              : item,
          )
        }

        const newItem: StoredCartItem = {
          productId: product.id,
          license,
          quantity: Math.max(1, Math.min(10, quantity)),
        }
        return [...prev, newItem]
      })
    },
    [],
  )

  const removeItem = useCallback((itemId: string) => {
    setStoredItems((prev) =>
      prev.filter((item) => `${item.productId}-${item.license || 'standard'}` !== itemId),
    )
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setStoredItems((prev) =>
        prev.filter((item) => `${item.productId}-${item.license || 'standard'}` !== itemId),
      )
      return
    }

    const cappedQuantity = Math.min(10, Math.floor(quantity))
    setStoredItems((prev) =>
      prev.map((item) =>
        `${item.productId}-${item.license || 'standard'}` === itemId
          ? { ...item, quantity: cappedQuantity }
          : item,
      ),
    )
  }, [])

  const clearCart = useCallback(() => {
    setStoredItems([])
  }, [])

  // Promotional discount actions
  const applyDiscountCode = useCallback(
    (rawCode: string): ApplyDiscountResult => {
      const rule = lookupPromoCode(rawCode)
      if (!rule) {
        return {
          success: false,
          message: `Promo code "${rawCode.trim().toUpperCase()}" is invalid or expired. Try "TANGENT10" or "STUDIO20".`,
        }
      }

      setAppliedDiscount(rule)
      return {
        success: true,
        message: `Applied ${rule.label} successfully!`,
      }
    },
    [],
  )

  const removeDiscountCode = useCallback(() => {
    setAppliedDiscount(null)
  }, [])

  // Calculations: integer paise source of truth
  const summary = useMemo<CartSummary>(() => {
    const subtotalInPaise = calculateSubtotal(items)
    const discountInPaise = calculateDiscount(subtotalInPaise, appliedDiscount)
    const taxablePaise = Math.max(0, subtotalInPaise - discountInPaise)
    const estimatedTaxInPaise = calculateEstimatedTax(taxablePaise)
    const totalInPaise = calculateOrderTotal(subtotalInPaise, discountInPaise, estimatedTaxInPaise)
    const itemCount = items.reduce((count, item) => count + item.quantity, 0)

    // Legacy USD compatibility for backward compatibility
    const subtotalUsd = Math.round(subtotalInPaise / 8500)
    const discountUsd = Math.round(discountInPaise / 8500)
    const estimatedTaxUsd = Math.round(estimatedTaxInPaise / 8500)
    const totalUsd = Math.round(totalInPaise / 8500)

    return {
      subtotalInPaise,
      discountInPaise,
      estimatedTaxInPaise,
      totalInPaise,
      itemCount,
      appliedDiscount: appliedDiscount || undefined,
      subtotalUsd,
      estimatedTaxUsd,
      discountUsd,
      totalUsd,
    }
  }, [items, appliedDiscount])

  // Demo Order creation
  const placeDemoOrder = useCallback(
    (formData: CheckoutFormData): DemoOrder => {
      if (items.length === 0) {
        throw new Error('Cannot create an order from an empty cart.')
      }

      // Generate simulated order identifier
      const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase()
      const orderId = `DEMO-TNG-2026-${randomHex}`

      const orderItemSnapshots: OrderItemSnapshot[] = items.map((item) => ({
        productId: item.productId,
        productSlug: item.product.slug,
        productName: item.product.name,
        coverImageUrl: item.product.coverImage.url,
        license: item.license,
        quantity: item.quantity,
        unitPriceInPaise: item.unitPriceInPaise,
        lineTotalInPaise: item.lineTotalInPaise,
        includedFiles: item.product.includedFiles,
      }))

      const newOrder: DemoOrder = {
        id: orderId,
        createdAt: new Date().toISOString(),
        status: 'simulated_demo',
        isSimulated: true,
        customer: { ...formData },
        items: orderItemSnapshots,
        pricing: {
          subtotalInPaise: summary.subtotalInPaise,
          discountInPaise: summary.discountInPaise,
          discountCode: appliedDiscount?.code,
          estimatedTaxInPaise: summary.estimatedTaxInPaise,
          totalInPaise: summary.totalInPaise,
          currency: 'INR',
        },
      }

      // Store in sessionStorage to persist across page refresh
      try {
        window.sessionStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(newOrder))
      } catch (err) {
        console.warn('[Cart] Failed saving demo order to sessionStorage:', err)
      }

      setLastOrder(newOrder)
      // Clear cart upon order placement
      setStoredItems([])
      setAppliedDiscount(null)

      return newOrder
    },
    [items, summary, appliedDiscount],
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyDiscountCode,
      removeDiscountCode,
      appliedDiscount,
      summary,
      lastOrder,
      placeDemoOrder,
      isCartOpen,
      setIsCartOpen,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyDiscountCode,
      removeDiscountCode,
      appliedDiscount,
      summary,
      lastOrder,
      placeDemoOrder,
      isCartOpen,
      setIsCartOpen,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
