import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ShoppingBag, Check } from 'lucide-react'
import { formatPaiseToInr } from '@/lib/formatters'
import { Button } from '@/components/ui'
import type { DigitalProduct } from '@/types/product'

interface StickyPurchaseBarProps {
  product: DigitalProduct
  onAddToCart: () => void
  isAdded: boolean
}

export function StickyPurchaseBar({
  product,
  onAddToCart,
  isAdded,
}: StickyPurchaseBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls down at least 500px
      if (window.scrollY > 480) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 bg-[#FCFAF6]/95 backdrop-blur-md border-t border-[#E9E5DC] py-3.5 px-6 sm:px-12 shadow-floating"
          aria-label="Quick purchase navigation"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Thumbnail & Title */}
            <div className="flex items-center gap-3 truncate">
              <img
                src={product.coverImage.url}
                alt={product.coverImage.alt}
                className="w-11 h-11 object-cover rounded-sm border border-[#E9E5DC] shrink-0"
              />
              <div className="truncate text-left">
                <h4 className="font-serif text-sm sm:text-base text-[#20211E] truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#777B60] uppercase tracking-wider">
                  <span>{product.deliverableType || 'Digital Resource'}</span>
                  {product.pageCount && <span>• {product.pageCount}</span>}
                </div>
              </div>
            </div>

            {/* Right: Pricing & CTA */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#797C72] block">
                  Studio Investment
                </span>
                <span className="font-serif text-lg font-normal text-[#20211E]">
                  {formatPaiseToInr(product.priceInPaise)}
                </span>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={onAddToCart}
                className={`gap-2 text-xs font-mono uppercase tracking-wider px-5 py-2.5 transition-all ${
                  isAdded
                    ? 'bg-emerald-800 text-white hover:bg-emerald-850'
                    : 'bg-[#20211E] text-white hover:bg-[#3A3B36]'
                }`}
                aria-live="polite"
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add to Bag
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
