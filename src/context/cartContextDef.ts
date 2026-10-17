import { createContext } from 'react'
import type { CartItem, CartSummary, DiscountRule, CheckoutFormData } from '@/types/cart'
import type { DigitalProduct, LicenseType } from '@/types/product'
import type { DemoOrder } from '@/types/order'

export interface ApplyDiscountResult {
  success: boolean
  message: string
}

export interface CartContextValue {
  items: CartItem[]
  addItem: (product: DigitalProduct, license?: LicenseType, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  applyDiscountCode: (code: string) => ApplyDiscountResult
  removeDiscountCode: () => void
  appliedDiscount: DiscountRule | null
  summary: CartSummary
  lastOrder: DemoOrder | null
  placeDemoOrder: (formData: CheckoutFormData) => DemoOrder
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

export const CartContext = createContext<CartContextValue | null>(null)
