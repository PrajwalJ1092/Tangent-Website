import type { DigitalProduct, LicenseType } from './product'

/**
 * Minimal persisted cart item representation.
 * In accordance with Phase 05 architecture rules, only identifiers and quantities
 * are saved to persistent browser storage. All rich product metadata is resolved
 * dynamically from the authoritative product catalog.
 */
export interface StoredCartItem {
  productId: string
  quantity: number
  license?: LicenseType
}

/**
 * Fully hydrated cart line item resolved against the authoritative product catalog.
 */
export interface CartItem {
  id: string // Compound ID: `${productId}-${license}`
  productId: string
  license: LicenseType
  quantity: number
  product: DigitalProduct
  unitPriceInPaise: number
  lineTotalInPaise: number

  // Compatibility aliases
  unitPriceUsd: number
}

/**
 * Promotional discount rule applied to the cart.
 */
export interface DiscountRule {
  code: string
  label: string
  discountPercent?: number
  discountPaise?: number
}

/**
 * Comprehensive monetary summary represented in integer paise (100 paise = 1 INR).
 */
export interface CartSummary {
  subtotalInPaise: number
  discountInPaise: number
  estimatedTaxInPaise: number
  totalInPaise: number
  itemCount: number
  appliedDiscount?: DiscountRule

  // Compatibility aliases
  subtotalUsd: number
  estimatedTaxUsd: number
  discountUsd: number
  totalUsd: number
}

export interface CheckoutFormData {
  fullName: string
  email: string
  studioName?: string
  country: string
  stateProvince: string
  postalCode: string
  agreeToLicenseTerms: boolean

  // Compatibility aliases
  company?: string
  vatNumber?: string
  agreeToTerms?: boolean
}
