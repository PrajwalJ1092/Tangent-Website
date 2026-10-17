import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, type ElementType } from 'react'
import { MOTION_DURATIONS, MOTION_EASINGS } from '@/lib/motionTokens'

export interface MaskedTextProps {
  children: string
  className?: string
  as?: ElementType
  delay?: number
  duration?: number
  splitBy?: 'line' | 'word'
  once?: boolean
}

/**
 * Editorial masked text reveal where text rises through an overflow-hidden clipping window.
 * Preserves typography metrics and respects prefers-reduced-motion automatically.
 */
export function MaskedText({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  duration = MOTION_DURATIONS.reveal,
  splitBy = 'line',
  once = true,
}: MaskedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-8% 0px' })
  const prefersReduced = useReducedMotion()

  // If reduced motion is preferred, render clean un-animated typography
  if (prefersReduced) {
    return <Component className={className}>{children}</Component>
  }

  // Segment by explicit lines or word sequences
  const segments =
    splitBy === 'line'
      ? children.split('\n').filter(Boolean)
      : children.split(' ').filter(Boolean)

  return (
    <Component ref={ref} className={className}>
      {splitBy === 'line' ? (
        segments.map((line, index) => (
          <span key={index} className="block overflow-hidden py-0.5">
            <motion.span
              className="block will-change-transform"
              initial={{ y: '110%', opacity: 0.2 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0.2 }}
              transition={{
                duration,
                delay: delay + index * 0.12,
                ease: MOTION_EASINGS.cinematic,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))
      ) : (
        <span className="inline-flex flex-wrap gap-x-[0.28em]">
          {segments.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden py-0.5">
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: '110%', opacity: 0.2 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0.2 }}
                transition={{
                  duration: duration * 0.85,
                  delay: delay + index * 0.035,
                  ease: MOTION_EASINGS.cinematic,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      )}
    </Component>
  )
}
