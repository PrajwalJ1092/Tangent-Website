import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useState, useEffect, type ElementType, type ReactNode } from 'react'
import { MOTION_DURATIONS, MOTION_EASINGS } from '@/lib/motionTokens'
import { cn } from '@/lib/utils'

export interface EditorialHeadingProps {
  title: string
  eyebrow?: string
  description?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  titleClassName?: string
  eyebrowClassName?: string
  descriptionClassName?: string
  delay?: number
}

/**
 * Editorial Heading with masked line movement and restrained metadata timing.
 */
export function EditorialHeading({
  title,
  eyebrow,
  description,
  as: Component = 'h2',
  className = '',
  titleClassName = '',
  eyebrowClassName = '',
  descriptionClassName = '',
  delay = 0,
}: EditorialHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })
  const prefersReduced = useReducedMotion()

  const lines = title.split('\n').filter(Boolean)

  if (prefersReduced) {
    return (
      <div className={cn('space-y-3', className)}>
        {eyebrow && (
          <span className={cn('block font-mono text-xs uppercase tracking-[0.2em] text-[#777B60]', eyebrowClassName)}>
            {eyebrow}
          </span>
        )}
        <Component className={cn('font-serif font-normal tracking-tight text-[#20211E]', titleClassName)}>
          {title}
        </Component>
        {description && (
          <p className={cn('font-sans text-sm sm:text-base text-[#53554D] leading-relaxed', descriptionClassName)}>
            {description}
          </p>
        )}
      </div>
    )
  }

  return (
    <div ref={ref} className={cn('space-y-3', className)}>
      {/* Eyebrow metadata */}
      {eyebrow && (
        <motion.span
          className={cn('block font-mono text-xs uppercase tracking-[0.2em] text-[#777B60]', eyebrowClassName)}
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: MOTION_DURATIONS.standard, delay, ease: MOTION_EASINGS.cinematic }}
        >
          {eyebrow}
        </motion.span>
      )}

      {/* Main masked heading */}
      <Component className={cn('font-serif font-normal tracking-tight text-[#20211E]', titleClassName)}>
        {lines.map((line, idx) => (
          <span key={idx} className="block overflow-hidden py-0.5">
            <motion.span
              className="block will-change-transform"
              initial={{ y: '110%', opacity: 0.15 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0.15 }}
              transition={{
                duration: MOTION_DURATIONS.reveal,
                delay: delay + 0.08 + idx * 0.12,
                ease: MOTION_EASINGS.cinematic,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Component>

      {/* Supporting paragraph description */}
      {description && (
        <motion.p
          className={cn('font-sans text-sm sm:text-base text-[#53554D] leading-relaxed', descriptionClassName)}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: MOTION_DURATIONS.medium,
            delay: delay + 0.22,
            ease: MOTION_EASINGS.gentle,
          }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

export interface EditorialParagraphProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

/**
 * Editorial paragraph with restrained opacity and subtle vertical arrival.
 */
export function EditorialParagraph({
  children,
  className = '',
  delay = 0,
  as: Component = 'p',
}: EditorialParagraphProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-6% 0px' })
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>
  }

  const MotionComponent = motion.create(Component)

  return (
    <MotionComponent
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{
        duration: MOTION_DURATIONS.medium,
        delay,
        ease: MOTION_EASINGS.gentle,
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * Alias for EditorialParagraph for semantic naming
 */
export const ParagraphReveal = EditorialParagraph

export interface WordRevealProps {
  children: string
  className?: string
  as?: ElementType
  delay?: number
  stagger?: number
  once?: boolean
}

/**
 * Word-by-word editorial reveal that staggers words into place with vertical offset and opacity.
 * Accessible for screen readers via aria-label.
 */
export function WordReveal({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  stagger = 0.035,
  once = true,
}: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-6% 0px' })
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>
  }

  const words = children.split(' ').filter(Boolean)

  return (
    <Component ref={ref} className={cn('inline-flex flex-wrap gap-x-[0.28em] gap-y-1', className)} aria-label={children}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden py-0.5" aria-hidden="true">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '115%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
            transition={{
              duration: MOTION_DURATIONS.reveal,
              delay: delay + idx * stagger,
              ease: MOTION_EASINGS.cinematic,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  )
}

export interface CharacterRevealProps {
  children?: string
  text?: string
  className?: string
  as?: ElementType
  delay?: number
  stagger?: number
  once?: boolean
}

/**
 * Subtle character-by-character reveal for short statements, tags, and monograms.
 * Accessible for assistive technology.
 */
export function CharacterReveal({
  children,
  text,
  className = '',
  as: Component = 'span',
  delay = 0,
  stagger = 0.02,
  once = true,
}: CharacterRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-4% 0px' })
  const prefersReduced = useReducedMotion()

  const content = text ?? children ?? ''

  if (prefersReduced) {
    return <Component className={className}>{content}</Component>
  }

  const chars = Array.from(content)

  return (
    <Component ref={ref} className={cn('inline-block', className)} aria-label={content}>
      {chars.map((char, idx) => (
        <span key={idx} className="inline-block overflow-hidden" aria-hidden="true">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: MOTION_DURATIONS.medium,
              delay: delay + idx * stagger,
              ease: MOTION_EASINGS.editorial,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </Component>
  )
}

export interface MaskedHeadlineProps {
  lines?: string[]
  text?: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  delay?: number
  stagger?: number
  once?: boolean
}

/**
 * Masked Headline where each line rises through a clipped container with refined architectural easing.
 */
export function MaskedHeadline({
  lines,
  text,
  className = '',
  as: Component = 'h2',
  delay = 0,
  stagger = 0.12,
  once = true,
}: MaskedHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once, margin: '-6% 0px' })
  const prefersReduced = useReducedMotion()

  const resolvedLines = lines && lines.length > 0 
    ? lines 
    : text 
      ? text.split('\n') 
      : []
  const fullText = text || (lines ? lines.join(' ') : '')

  if (prefersReduced) {
    return (
      <Component className={className} aria-label={fullText}>
        {resolvedLines.map((l, i) => (
          <span key={i} className="block">{l}</span>
        ))}
      </Component>
    )
  }

  return (
    <Component ref={ref} className={className} aria-label={fullText}>
      {resolvedLines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden py-0.5">
          <motion.span
            className="block will-change-transform"
            initial={{ y: '115%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
            transition={{
              duration: MOTION_DURATIONS.reveal,
              delay: delay + idx * stagger,
              ease: MOTION_EASINGS.editorial,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  )
}

export interface ScrollScaleHeadingProps {
  children: ReactNode
  className?: string
  scaleFrom?: number
  scaleTo?: number
  opacityFrom?: number
  opacityTo?: number
}

/**
 * Controlled transition between an expansive editorial heading and a docked state as user scrolls.
 */
export function ScrollScaleHeading({
  children,
  className = '',
  scaleFrom = 1.0,
  scaleTo = 0.95,
  opacityFrom = 1.0,
  opacityTo = 0.7,
}: ScrollScaleHeadingProps) {
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
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, isMobile ? scaleFrom : scaleTo])
  const opacity = useTransform(scrollYProgress, [0, 1], [opacityFrom, opacityTo])

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={cn('relative will-change-transform', className)}>
      <motion.div style={{ scale, opacity }}>
        {children}
      </motion.div>
    </div>
  )
}

export interface ScrollParallaxTextProps {
  children: ReactNode
  className?: string
  offset?: number
}

/**
 * Subtle vertical drift in relation to scroll progress for large spatial headings.
 */
export function ScrollParallaxText({
  children,
  className = '',
  offset = 24,
}: ScrollParallaxTextProps) {
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
    offset: ['start end', 'end start'],
  })

  const activeOffset = isMobile ? offset * 0.35 : offset
  const y = useTransform(scrollYProgress, [0, 1], [-activeOffset, activeOffset])

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={cn('relative will-change-transform', className)}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
