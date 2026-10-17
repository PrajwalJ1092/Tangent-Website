import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartPage } from './CartPage'
import { CheckoutPage } from './CheckoutPage'
import { OrderConfirmationPage } from './OrderConfirmationPage'
import { CartProvider } from '@/context'
import { PRODUCTS } from '@/data/products'

const sampleProduct = PRODUCTS[0]! // Minimal Living Room 3D Scene

const renderWithCart = (initialRoute: string, seedCart = false) => {
  if (seedCart) {
    window.localStorage.setItem(
      'tangent_studio_cart_v2',
      JSON.stringify([
        { productId: sampleProduct.id, license: 'standard', quantity: 1 },
      ]),
    )
  }

  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/confirmation" element={<OrderConfirmationPage />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>,
  )
}

describe('PHASE 05 — Cart & Checkout UI Integration', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })

  describe('/cart Page', () => {
    it('renders empty cart state when no items are queued', () => {
      renderWithCart('/cart', false)

      expect(screen.getByRole('heading', { name: /Your Studio Bag is Empty/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Explore Digital Resources/i })).toBeInTheDocument()
    })

    it('renders queued items, unit prices in INR, and allows seat increment', () => {
      renderWithCart('/cart', true)

      // Title & quantity
      expect(screen.getByText(/Minimal Living Room 3D Scene/i)).toBeInTheDocument()
      expect(screen.getAllByText(/1 seat/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/₹11,990/i).length).toBeGreaterThan(0)

      // Increment seat button
      const increaseBtn = screen.getByLabelText(/Increase seats for Minimal Living Room 3D Scene/i)
      fireEvent.click(increaseBtn)

      expect(screen.getAllByText(/2 seats/i).length).toBeGreaterThan(0)
      // Line total is 2 * ₹11,990 = ₹23,980
      expect(screen.getAllByText('₹23,980').length).toBeGreaterThan(0)
    })

    it('applies promotional discount code in the cart view', () => {
      renderWithCart('/cart', true)

      const promoInput = screen.getByPlaceholderText(/e.g. TANGENT10 or STUDIO20/i)
      const applyBtn = screen.getByRole('button', { name: /Apply/i })

      fireEvent.change(promoInput, { target: { value: 'TANGENT10' } })
      fireEvent.click(applyBtn)

      expect(screen.getByTestId('applied-promo')).toHaveTextContent(/Code TANGENT10 applied/i)
      expect(screen.getByText(/-₹1,199/i)).toBeInTheDocument() // 10% of 11,990
    })
  })

  describe('/checkout Page', () => {
    it('redirects to /cart if checkout is accessed with an empty cart', () => {
      renderWithCart('/checkout', false)

      // Should redirect and show empty cart
      expect(screen.getByRole('heading', { name: /Your Studio Bag is Empty/i })).toBeInTheDocument()
    })

    it('displays form fields, order summary, and prevents submission with validation errors', async () => {
      renderWithCart('/checkout', true)

      expect(screen.getByRole('heading', { name: /Simulated Studio Checkout/i })).toBeInTheDocument()
      expect(screen.getByText(/Demo Checkout Environment/i)).toBeInTheDocument()

      // Click submit without filling form
      const submitBtn = screen.getByRole('button', { name: /Place Demo Order/i })
      fireEvent.click(submitBtn)

      // Validation errors should appear
      expect(screen.getByText(/Please enter your full name/i)).toBeInTheDocument()
      expect(screen.getByText(/Please enter a valid work or personal email address/i)).toBeInTheDocument()
      expect(screen.getByText(/State or province is required/i)).toBeInTheDocument()
      expect(screen.getByText(/You must acknowledge the studio license and prototype terms/i)).toBeInTheDocument()
    })

    it('successfully validates and places a simulated demo order', async () => {
      renderWithCart('/checkout', true)

      // Fill in valid details
      fireEvent.change(screen.getByLabelText(/Full Name/i), {
        target: { value: 'Ar. Frank Lloyd' },
      })
      fireEvent.change(screen.getByLabelText(/Work Email/i), {
        target: { value: 'frank@taliesin.arch' },
      })
      fireEvent.change(screen.getByLabelText(/State \/ Province/i), {
        target: { value: 'Maharashtra' },
      })
      fireEvent.change(screen.getByLabelText(/Postal \/ PIN Code/i), {
        target: { value: '400001' },
      })

      // Check terms box
      const termsBox = screen.getByRole('checkbox')
      fireEvent.click(termsBox)

      const submitBtn = screen.getByRole('button', { name: /Place Demo Order/i })
      fireEvent.click(submitBtn)

      // Expect navigation to order confirmation receipt
      await waitFor(
        () => {
          expect(screen.getByRole('heading', { name: /Simulated Order Receipt/i })).toBeInTheDocument()
        },
        { timeout: 3000 },
      )

      expect(screen.getByText(/Reference: DEMO-TNG-2026-/i)).toBeInTheDocument()
      expect(screen.getByText(/Ar. Frank Lloyd/i)).toBeInTheDocument()
      expect(screen.getAllByText(/frank@taliesin.arch/i).length).toBeGreaterThan(0)
      expect(screen.getByText(/Download Demo \(\.zip\)/i)).toBeInTheDocument()
      expect(screen.getByText(/₹0 Charged \(Demo Prototype\)/i)).toBeInTheDocument()
    })
  })

  describe('/checkout/confirmation Page Persistence', () => {
    it('retrieves and displays order from sessionStorage on page refresh without duplicate charges', () => {
      const mockSavedOrder = {
        id: 'DEMO-TNG-2026-PERSIST1',
        createdAt: new Date().toISOString(),
        status: 'simulated_demo',
        isSimulated: true,
        customer: {
          fullName: 'Ar. Zaha Hadid',
          email: 'zaha@zha.studio',
          country: 'India',
          stateProvince: 'Delhi',
          postalCode: '110001',
          agreeToLicenseTerms: true,
        },
        items: [
          {
            productId: sampleProduct.id,
            productSlug: sampleProduct.slug,
            productName: sampleProduct.name,
            coverImageUrl: sampleProduct.coverImage.url,
            license: 'standard',
            quantity: 1,
            unitPriceInPaise: 1199000,
            lineTotalInPaise: 1199000,
            includedFiles: ['scene.blend', 'textures.zip'],
          },
        ],
        pricing: {
          subtotalInPaise: 1199000,
          discountInPaise: 0,
          estimatedTaxInPaise: 215820,
          totalInPaise: 1414820,
          currency: 'INR',
        },
      }

      window.sessionStorage.setItem('tangent_studio_last_order', JSON.stringify(mockSavedOrder))

      renderWithCart('/checkout/confirmation?orderId=DEMO-TNG-2026-PERSIST1', false)

      expect(screen.getByText(/Reference: DEMO-TNG-2026-PERSIST1/i)).toBeInTheDocument()
      expect(screen.getByText(/Ar. Zaha Hadid/i)).toBeInTheDocument()
      expect(screen.getAllByText(/zaha@zha.studio/i).length).toBeGreaterThan(0)
    })
  })
})
