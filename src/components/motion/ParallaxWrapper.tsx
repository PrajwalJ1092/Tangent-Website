import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { useIsMobile } from '@/lib/motionTokens'

export interface ParallaxWrapperProps {
  children: ReactNode
  className?: string
  /**
   * Distance in pixels to translate across scroll traversal.
   * Positive moves down slower (background), negative moves up faster (foreground).
   * Default: 30
   */
  offset?: number
  direction?: 'vertical' | 'horizontal'
}

/**
 * Layered Parallax component that translates elements at slightly different rates.
 * Automatically dampens on mobile viewports and disables for reduced-motion.
 */
export function ParallaxWrapper({
  children,
  className = '',
  offset = 30,
  direction = 'vertical',
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Reduce offset on mobile to avoid touch jitter
  const activeOffset = isMobile ? offset * 0.35 : offset

  const y = useTransform(scrollYProgress, [0, 1], [-activeOffset, activeOffset])
  const x = useTransform(scrollYProgress, [0, 1], [-activeOffset, activeOffset])

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={`relative will-change-transform ${className}`}>
      <motion.div style={direction === 'vertical' ? { y } : { x }}>
        {children}
      </motion.div>
    </div>
  )
}

export interface ScrollScaleImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  scaleFrom?: number
  scaleTo?: number
}

/**
 * Scroll-linked image scale component that subtly drifts with scroll progress.
 */
export function ScrollScaleImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  scaleFrom = 1.0,
  scaleTo = 1.08,
}: ScrollScaleImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [scaleFrom, isMobile ? scaleFrom + (scaleTo - scaleFrom) * 0.4 : scaleTo],
  )

  return (
    <div ref={ref} className={`overflow-hidden relative ${containerClassName}`}>
      {prefersReduced ? (
        <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          style={{ scale }}
          className={`w-full h-full object-cover will-change-transform ${className}`}
        />
      )}
    </div>
  )
}
