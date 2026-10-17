import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, useState, type ImgHTMLAttributes } from 'react'
import { MOTION_DURATIONS, MOTION_EASINGS } from '@/lib/motionTokens'
import { cn } from '@/lib/utils'

export interface ImageRevealProps
  extends Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    'src' | 'alt' | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  > {
  src: string
  alt: string
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide' | 'auto'
  direction?: 'up' | 'down' | 'left' | 'right' | 'center'
  delay?: number
  duration?: number
  hoverZoom?: boolean
  priority?: boolean
  caption?: string
  containerClassName?: string
}

const aspectRatios = {
  landscape: 'aspect-[16/10]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  wide: 'aspect-[21/9]',
  auto: 'aspect-auto',
}

const clipDirections = {
  up: {
    hidden: 'inset(100% 0% 0% 0%)',
    visible: 'inset(0% 0% 0% 0%)',
  },
  down: {
    hidden: 'inset(0% 0% 100% 0%)',
    visible: 'inset(0% 0% 0% 0%)',
  },
  left: {
    hidden: 'inset(0% 0% 0% 100%)',
    visible: 'inset(0% 0% 0% 0%)',
  },
  right: {
    hidden: 'inset(0% 100% 0% 0%)',
    visible: 'inset(0% 0% 0% 0%)',
  },
  center: {
    hidden: 'inset(10% 10% 10% 10%)',
    visible: 'inset(0% 0% 0% 0%)',
  },
}

/**
 * Cinematic Image Reveal with controlled mask clipping, gentle scale deceleration,
 * and zero layout shifts.
 */
export function ImageReveal({
  src,
  alt,
  aspectRatio = 'landscape',
  direction = 'up',
  delay = 0,
  duration = MOTION_DURATIONS.reveal,
  hoverZoom = true,
  priority = false,
  caption,
  className = '',
  containerClassName = '',
  ...props
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-8% 0px' })
  const prefersReduced = useReducedMotion()
  const [isLoaded, setIsLoaded] = useState(false)

  const clip = clipDirections[direction] || clipDirections.up

  return (
    <figure className={cn('group flex flex-col gap-2 w-full', containerClassName)}>
      <div
        ref={containerRef}
        className={cn(
          'relative w-full overflow-hidden bg-[#E9E5DC] rounded-sm',
          aspectRatios[aspectRatio],
        )}
      >
        {/* Animated Clipping Mask Container */}
        <motion.div
          className="w-full h-full"
          initial={prefersReduced ? false : { clipPath: clip.hidden }}
          animate={
            prefersReduced
              ? { clipPath: clip.visible }
              : isInView
                ? { clipPath: clip.visible }
                : { clipPath: clip.hidden }
          }
          transition={{
            duration,
            delay,
            ease: MOTION_EASINGS.mask,
          }}
        >
          {/* Subtle Inner Image Drift */}
          <motion.img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            initial={prefersReduced ? false : { scale: 1.08, opacity: 0.6 }}
            animate={
              prefersReduced
                ? { scale: 1, opacity: 1 }
                : isInView
                  ? { scale: 1, opacity: 1 }
                  : { scale: 1.08, opacity: 0.6 }
            }
            transition={{
              duration: duration * 1.15,
              delay,
              ease: MOTION_EASINGS.cinematic,
            }}
            className={cn(
              'w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
              hoverZoom && 'group-hover:scale-[1.035]',
              isLoaded ? 'opacity-100' : 'opacity-90',
              className,
            )}
            {...props}
          />
        </motion.div>
      </div>

      {caption && (
        <figcaption className="font-serif italic text-xs sm:text-sm text-[#797C72] pt-1 leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
