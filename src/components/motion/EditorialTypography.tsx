import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, type ElementType, type ReactNode } from 'react'
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
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
