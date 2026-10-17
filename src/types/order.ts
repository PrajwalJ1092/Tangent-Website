import type { LicenseType } from './product'
import type { CheckoutFormData } from './cart'

export interface OrderItemSnapshot {
  productId: string
  productSlug: string
  productName: string
  coverImageUrl: string
  license: LicenseType
  quantity: number
  unitPriceInPaise: number
  lineTotalInPaise: number
  includedFiles: string[]
}

export interface DemoOrder {
  id: string // e.g. DEMO-TNG-2026-4B81A
  createdAt: string // ISO timestamp
  status: 'simulated_demo'
  isSimulated: true
  customer: CheckoutFormData
  items: OrderItemSnapshot[]
  pricing: {
    subtotalInPaise: number
    discountInPaise: number
    discountCode?: string
    estimatedTaxInPaise: number
    totalInPaise: number
    currency: 'INR'
  }
}

/**
 * CLIENT-TO-SERVER PAYMENT & ORDER CREATION BOUNDARY CONTRACT
 *
 * Security Notice:
 * In production, the client frontend NEVER submits prices, discounts, or computed totals.
 * The client posts only product identifiers, selected quantities, customer info, and coupon codes.
 * The server API is the sole authority for:
 * 1. Looking up current unit prices from the secure database.
 * 2. Validating active coupon eligibility and calculating integer discount amounts.
 * 3. Calculating jurisdictional taxes (GST/VAT) based on customer geographic billing info.
 * 4. Generating a signed payment intent / order session with a payment gateway (e.g. Razorpay, Stripe).
 */
export interface CreateOrderPayload {
  items: Array<{
    productId: string
    quantity: number
    license: LicenseType
  }>
  customer: CheckoutFormData
  discountCode?: string
}

export interface CreateOrderResponse {
  success: boolean
  orderId: string
  paymentClientSecret?: string
  simulated: boolean
}
