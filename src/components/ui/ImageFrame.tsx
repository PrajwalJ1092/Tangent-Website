import { useState, type HTMLAttributes } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ImageFrameProps extends HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide' | 'auto'
  caption?: string
  priority?: boolean
  hoverZoom?: boolean
  dominantColor?: string
}

export function ImageFrame({
  src,
  alt,
  aspectRatio = 'landscape',
  caption,
  priority = false,
  hoverZoom = true,
  dominantColor = '#E9E5DC',
  className,
  ...props
}: ImageFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const aspectStyles = {
    landscape: 'aspect-[16/10]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
    auto: 'aspect-auto',
  }

  return (
    <figure className={cn('group flex flex-col gap-2 w-full', className)} {...props}>
      <div
        className={cn(
          'relative w-full overflow-hidden bg-[#E9E5DC] rounded-md transition-all duration-300',
          aspectStyles[aspectRatio],
        )}
        style={{ backgroundColor: dominantColor }}
      >
        {/* Loading skeleton shimmer */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F6F4EF]/30 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
        )}

        {/* Failed image fallback */}
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#E9E5DC] text-[#797C72]">
            <ImageOff className="w-8 h-8 mb-2 opacity-50" />
            <span className="font-serif italic text-sm text-[#53554D]">
              Architectural Plate Reference Unavailable
            </span>
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#797C72] mt-1">
              {alt}
            </span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={cn(
              'w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]',
              hoverZoom && 'group-hover:scale-[1.035]',
            )}
          />
        )}
      </div>

      {caption && (
        <figcaption className="font-serif italic text-xs sm:text-sm text-[#797C72] pt-1 leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
