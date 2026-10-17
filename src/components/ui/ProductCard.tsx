import { Link } from 'react-router-dom'
import { Plus, Check, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import type { DigitalProduct } from '@/types/product'
import { ImageFrame } from './ImageFrame'
import { Badge } from './Badge'
import { Button } from './Button'
import {
  formatPaiseToInr,
  formatCategoryLabel,
  calculateDiscountPercent,
} from '@/lib/formatters'
import { useCart } from '@/context'
import { cn } from '@/lib/utils'
import { CardHover } from '@/components/motion'

export interface ProductCardProps {
  product: DigitalProduct
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 'standard')
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1600)
  }

  const primaryImage = product.coverImage || product.previewImages[0]
  const discountPercent = calculateDiscountPercent(
    product.priceInPaise,
    product.compareAtPriceInPaise,
  )

  return (
    <CardHover lift={3} className={cn('h-full', className)}>
      <article
        className="group flex flex-col justify-between h-full bg-white rounded-lg border border-[#E9E5DC] p-4 transition-all duration-300 hover:border-[#D3CDC0] hover:shadow-[0_8px_24px_-4px_rgba(32,33,30,0.06)] text-left"
      >
      <div className="space-y-4">
        {/* Thumbnail link with tag badges */}
        <div className="relative">
          <Link
            to={`/shop/${product.slug}`}
            className="block overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
            aria-label={`View details for ${product.name}`}
          >
            <ImageFrame
              src={primaryImage?.url || ''}
              alt={primaryImage?.alt || product.name}
              aspectRatio="landscape"
              hoverZoom
            />
          </Link>

          {/* Discount or Featured Badge */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 pointer-events-none">
            {discountPercent ? (
              <span className="bg-[#777B60] text-white text-[10px] font-sans uppercase font-bold px-2 py-0.5 rounded shadow-sm">
                Save {discountPercent}%
              </span>
            ) : product.featured ? (
              <span className="bg-[#20211E]/80 backdrop-blur-sm text-[#F6F4EF] text-[10px] font-sans uppercase font-semibold px-2 py-0.5 rounded">
                Featured
              </span>
            ) : null}
          </div>
        </div>

        {/* Product Meta & Title */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#797C72]">
            <span className="font-sans uppercase tracking-wider text-[11px] font-medium text-[#777B60]">
              {formatCategoryLabel(product.category)}
            </span>
            {product.licenseType === 'extended' ? (
              <Badge variant="accent">Enterprise</Badge>
            ) : (
              <span className="text-[10px] font-mono text-[#797C72]">
                {product.fileSize || 'Digital Asset'}
              </span>
            )}
          </div>

          <h3 className="font-sans text-base font-medium text-[#20211E] group-hover:text-[#777B60] transition-colors line-clamp-1">
            <Link
              to={`/shop/${product.slug}`}
              className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#20211E] rounded-sm"
            >
              {product.name}
            </Link>
          </h3>

          <p className="font-sans text-xs text-[#53554D] line-clamp-2 leading-relaxed font-light">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Footer: Price in INR, Compare At, and Cart Action */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#E9E5DC]">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-xl font-medium text-[#20211E] font-mono">
              {formatPaiseToInr(product.priceInPaise)}
            </span>
            {product.compareAtPriceInPaise && (
              <span className="text-xs text-[#797C72] line-through font-mono">
                {formatPaiseToInr(product.compareAtPriceInPaise)}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[#797C72] block">
            {product.licenseSummary ? 'Verified License' : 'Studio License'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/shop/${product.slug}`}
            className="p-2 text-[#797C72] hover:text-[#20211E] rounded-md hover:bg-[#E9E5DC]/50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#20211E]"
            aria-label={`View ${product.name} details`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Button
            size="sm"
            variant={justAdded ? 'secondary' : 'primary'}
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to shopping bag`}
            className={cn(
              'transition-colors gap-1.5',
              justAdded && 'bg-[#777B60] text-white border-[#777B60]',
            )}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Add
              </>
            )}
          </Button>
        </div>
      </div>
      </article>
    </CardHover>
  )
}
