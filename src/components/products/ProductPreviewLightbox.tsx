import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProductPreviewMedia } from '@/types/product'

interface ProductPreviewLightboxProps {
  isOpen: boolean
  onClose: () => void
  images: ProductPreviewMedia[]
  currentIndex: number
  onIndexChange: (index: number) => void
  productTitle: string
}

export function ProductPreviewLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  productTitle,
}: ProductPreviewLightboxProps) {
  // Handle keyboard navigation: ESC to close, Left/Right arrows to navigate
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onIndexChange((currentIndex + 1) % images.length)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onIndexChange((currentIndex - 1 + images.length) % images.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange])

  if (!isOpen) return null

  const currentImage = images[currentIndex] || images[0]!

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex flex-col bg-[#151614]/95 backdrop-blur-md text-[#F6F4EF]"
        role="dialog"
        aria-modal="true"
        aria-label={`Preview gallery for ${productTitle}`}
      >
        {/* Top Bar with Info & Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="space-y-0.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#777B60]">
              Inspection Lightbox · {currentIndex + 1} of {images.length}
            </span>
            <h3 className="font-serif text-lg text-white font-normal truncate max-w-xl">
              {productTitle}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close document lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Center Stage: Large high-res preview */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-10 overflow-hidden">
          {/* Previous Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={() => onIndexChange((currentIndex - 1 + images.length) % images.length)}
              className="absolute left-4 sm:left-8 z-10 p-3 rounded-full bg-black/50 border border-white/15 text-white hover:bg-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous preview spread"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Active Image */}
          <motion.div
            key={currentImage.id || currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="max-w-6xl max-h-[75vh] flex flex-col items-center justify-center"
          >
            <img
              src={currentImage.url}
              alt={currentImage.alt}
              className="max-h-[70vh] max-w-full object-contain rounded-sm shadow-2xl border border-white/10"
            />
            {currentImage.alt && (
              <p className="mt-3 text-xs font-mono text-[#D3CDC0]/80 text-center max-w-2xl bg-black/60 px-3 py-1 rounded">
                {currentImage.alt}
              </p>
            )}
          </motion.div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={() => onIndexChange((currentIndex + 1) % images.length)}
              className="absolute right-4 sm:right-8 z-10 p-3 rounded-full bg-black/50 border border-white/15 text-white hover:bg-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next preview spread"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        {images.length > 1 && (
          <div className="border-t border-white/10 p-3 bg-black/40 flex items-center justify-center gap-3 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                type="button"
                onClick={() => onIndexChange(idx)}
                className={`relative rounded-sm overflow-hidden border transition-all shrink-0 ${
                  idx === currentIndex
                    ? 'border-white ring-2 ring-[#777B60]'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
                aria-label={`Jump to preview ${idx + 1}`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-16 h-12 object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </AnimatePresence>
  )
}
