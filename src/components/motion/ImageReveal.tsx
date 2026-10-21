import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useState, useEffect, type ImgHTMLAttributes } from 'react'
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

export interface ImageExpansionProps {
  src: string
  alt: string
  caption?: string
  aspectRatio?: 'landscape' | 'wide' | 'auto'
  className?: string
  containerClassName?: string
}

/**
 * Editorial Image Expansion that smoothly expands from a restrained inset frame
 * into a full architectural composition on scroll.
 */
export function ImageExpansion({
  src,
  alt,
  caption,
  aspectRatio = 'landscape',
  className = '',
  containerClassName = '',
}: ImageExpansionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  // Scale container from inset (0.92) to full (1.0)
  const scale = useTransform(scrollYProgress, [0, 1], [isMobile ? 0.96 : 0.92, 1.0])
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['12px', '0px'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0])

  if (prefersReduced) {
    return (
      <figure className={cn('w-full', containerClassName)}>
        <div className={cn('relative w-full overflow-hidden bg-[#E9E5DC]', aspectRatios[aspectRatio])}>
          <img src={src} alt={alt} className={cn('w-full h-full object-cover', className)} />
        </div>
        {caption && (
          <figcaption className="font-serif italic text-xs sm:text-sm text-[#797C72] pt-2">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure ref={ref} className={cn('w-full relative', containerClassName)}>
      <motion.div
        style={{ scale, borderRadius }}
        className={cn(
          'relative w-full overflow-hidden bg-[#E9E5DC] shadow-floating',
          aspectRatios[aspectRatio],
        )}
      >
        <motion.img
          style={{ scale: imageScale }}
          src={src}
          alt={alt}
          className={cn('w-full h-full object-cover will-change-transform', className)}
        />
      </motion.div>
      {caption && (
        <figcaption className="font-serif italic text-xs sm:text-sm text-[#797C72] pt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export interface ImageTransitionPlate {
  id: string
  src: string
  alt: string
  label: string
}

export interface ImageTransitionProps {
  plates: ImageTransitionPlate[]
  aspectRatio?: 'landscape' | 'portrait' | 'square'
  className?: string
  caption?: string
}

/**
 * Architectural Image Transition allowing smooth cross-fade between paired architectural photographs.
 */
export function ImageTransition({
  plates,
  aspectRatio = 'landscape',
  className = '',
  caption,
}: ImageTransitionProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = plates[activeIdx] || plates[0]!

  return (
    <div className={cn('relative group flex flex-col gap-2.5', className)}>
      <div className={cn('relative w-full overflow-hidden bg-[#E9E5DC] rounded-sm', aspectRatios[aspectRatio])}>
        <motion.img
          key={current.id}
          src={current.src}
          alt={current.alt}
          initial={{ opacity: 0.35, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: MOTION_DURATIONS.medium, ease: MOTION_EASINGS.cinematic }}
          className="w-full h-full object-cover"
        />

        {/* Plate Switcher Tabs */}
        {plates.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 p-1 rounded-sm bg-black/60 backdrop-blur-md border border-white/20 z-10">
            {plates.map((plate, idx) => (
              <button
                key={plate.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  'px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded-xs transition-colors',
                  activeIdx === idx
                    ? 'bg-white text-[#20211E] font-medium'
                    : 'text-white/80 hover:text-white',
                )}
                aria-label={`View plate: ${plate.label}`}
              >
                {plate.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {caption && (
        <p className="font-serif italic text-xs text-[#797C72]">
          {caption}
        </p>
      )}
    </div>
  )
}

