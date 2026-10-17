import type { DiscountRule } from '@/types/cart'

/**
 * Valid promotional discount codes recognized by the prototype.
 */
export const AVAILABLE_PROMO_CODES: Record<string, DiscountRule> = {
  TANGENT10: {
    code: 'TANGENT10',
    label: 'Studio Launch Special (10% Off)',
    discountPercent: 10,
  },
  STUDIO20: {
    code: 'STUDIO20',
    label: 'Architecture Practice Bundle (20% Off)',
    discountPercent: 20,
  },
  ARCH500: {
    code: 'ARCH500',
    label: 'Architect Fellowship Credit (₹500 Off)',
    discountPaise: 50000, // ₹500 in integer paise
  },
}

/**
 * Calculates line item total in integer paise.
 * Ensures non-negative integers.
 */
export function calculateLineTotal(unitPriceInPaise: number, quantity: number): number {
  if (
    typeof unitPriceInPaise !== 'number' ||
    typeof quantity !== 'number' ||
    !Number.isInteger(unitPriceInPaise) ||
    !Number.isInteger(quantity) ||
    unitPriceInPaise < 0 ||
    quantity <= 0
  ) {
    throw new Error(
      `Invalid line item parameters: price (${unitPriceInPaise}), quantity (${quantity})`,
    )
  }
  return unitPriceInPaise * quantity
}

/**
 * Computes subtotal in integer paise for a collection of line items.
 */
export function calculateSubtotal(
  items: Array<{ unitPriceInPaise: number; quantity: number }>,
): number {
  return items.reduce((sum, item) => sum + calculateLineTotal(item.unitPriceInPaise, item.quantity), 0)
}

/**
 * Computes discount amount in integer paise based on an active promotional rule.
 * The discount can never exceed the subtotal.
 */
export function calculateDiscount(
  subtotalInPaise: number,
  discountRule?: DiscountRule | null,
): number {
  if (!discountRule || subtotalInPaise <= 0) return 0

  let discount = 0
  if (discountRule.discountPercent && discountRule.discountPercent > 0) {
    discount = Math.round((subtotalInPaise * discountRule.discountPercent) / 100)
  } else if (discountRule.discountPaise && discountRule.discountPaise > 0) {
    discount = discountRule.discountPaise
  }

  // Cap at subtotal and ensure non-negative integer
  return Math.min(subtotalInPaise, Math.max(0, Math.floor(discount)))
}

/**
 * Computes estimated tax in integer paise.
 * In accordance with Phase 05 rules:
 * Documented assumption: Standard 18% Goods & Services Tax (GST) estimate for digital downloads.
 */
export const ESTIMATED_GST_RATE_PERCENT = 18

export function calculateEstimatedTax(
  taxableAmountInPaise: number,
  taxRatePercent = ESTIMATED_GST_RATE_PERCENT,
): number {
  if (taxableAmountInPaise <= 0) return 0
  return Math.round((taxableAmountInPaise * taxRatePercent) / 100)
}

/**
 * Computes final payable total in integer paise:
 * total = subtotal - discount + estimatedTax
 */
export function calculateOrderTotal(
  subtotalInPaise: number,
  discountInPaise: number,
  taxInPaise: number,
): number {
  const postDiscount = Math.max(0, subtotalInPaise - discountInPaise)
  return postDiscount + Math.max(0, taxInPaise)
}

/**
 * Looks up a discount code case-insensitively.
 */
export function lookupPromoCode(code: string): DiscountRule | null {
  const normalized = code.trim().toUpperCase()
  return AVAILABLE_PROMO_CODES[normalized] ?? null
}
