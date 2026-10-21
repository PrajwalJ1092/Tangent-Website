import { useEffect, useCallback, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { useMotionSafe } from '@/lib/motionTokens'

export interface LightboxImage {
  id?: string
  url: string
  alt: string
  caption?: string
}

export interface ProjectLightboxProps {
  images: LightboxImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export function ProjectLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ProjectLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [imgError, setImgError] = useState(false)
  const { isMotionSafe } = useMotionSafe()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Keep currentIndex synced with initialIndex whenever lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setImgError(false)
    }
  }, [isOpen, initialIndex])

  const hasNext = images.length > 1
  const currentImage = images[currentIndex] || images[0]

  const handleNext = useCallback(() => {
    setImgError(false)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const handlePrev = useCallback(() => {
    setImgError(false)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Prevent background scrolling while open
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 50)

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, handleNext, handlePrev])

  if (!isOpen || images.length === 0) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isMotionSafe ? 0.3 : 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0E0F0D]/90 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close image viewer"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 p-3 rounded-full bg-[#20211E]/70 hover:bg-[#20211E] text-[#F6F4EF] hover:text-white transition-colors cursor-pointer border border-[#F6F4EF]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F4EF]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous image button */}
          {hasNext && (
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#20211E]/70 hover:bg-[#20211E] text-[#F6F4EF] hover:text-white transition-colors cursor-pointer border border-[#F6F4EF]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F4EF]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next image button */}
          {hasNext && (
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#20211E]/70 hover:bg-[#20211E] text-[#F6F4EF] hover:text-white transition-colors cursor-pointer border border-[#F6F4EF]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F4EF]"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Lightbox content card */}
          <motion.div
            key={currentIndex}
            initial={isMotionSafe ? { opacity: 0, scale: 0.95 } : { opacity: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={isMotionSafe ? { opacity: 0, scale: 0.95 } : { opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
          >
            <div className="relative overflow-hidden rounded-lg shadow-2xl bg-[#1A1B18] border border-[#F6F4EF]/10 max-h-[75vh]">
              {imgError ? (
                <div className="p-16 flex flex-col items-center justify-center text-center text-[#9E9B93]">
                  <ImageOff className="w-12 h-12 mb-3 opacity-60" />
                  <p className="font-serif italic text-lg text-[#F6F4EF]">
                    Architectural Plate Unavailable
                  </p>
                  <p className="font-sans text-xs uppercase tracking-wider text-[#9E9B93] mt-1">
                    {currentImage?.alt}
                  </p>
                </div>
              ) : (
                <img
                  src={currentImage?.url}
                  alt={currentImage?.alt || 'Architectural visual plate'}
                  onError={() => setImgError(true)}
                  className="max-h-[72vh] max-w-full object-contain rounded-md"
                />
              )}
            </div>

            {/* Plate counter and caption */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl px-2 gap-2 text-center sm:text-left">
              <span className="font-mono text-xs text-[#C5C2BA] uppercase tracking-wider">
                Plate {currentIndex + 1} of {images.length}
              </span>
              {currentImage?.caption && (
                <p className="font-serif italic text-sm text-[#F6F4EF] max-w-xl">
                  {currentImage.caption}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
