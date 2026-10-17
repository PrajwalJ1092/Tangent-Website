export function formatCurrencyUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatCurrencyInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formats integer paise to INR display (100 paise = 1 INR)
 * Validates that price is a non-negative integer.
 */
export function formatPaiseToInr(paise: number): string {
  if (typeof paise !== 'number' || !Number.isInteger(paise) || paise < 0) {
    throw new Error(
      `Invalid price in paise: expected non-negative integer, received ${paise}`,
    )
  }
  const inr = paise / 100
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inr)
}

export function calculateDiscountPercent(
  priceInPaise: number,
  compareAtPriceInPaise?: number,
): number | null {
  if (
    !compareAtPriceInPaise ||
    typeof compareAtPriceInPaise !== 'number' ||
    compareAtPriceInPaise <= priceInPaise
  ) {
    return null
  }
  const discount =
    ((compareAtPriceInPaise - priceInPaise) / compareAtPriceInPaise) * 100
  return Math.round(discount)
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
}

export function formatCategoryLabel(category: string): string {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
