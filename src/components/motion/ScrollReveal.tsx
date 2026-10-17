import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode, type ElementType } from 'react'
import {
  MOTION_DURATIONS,
  MOTION_EASINGS,
  MOTION_VARIANTS,
  REDUCED_MOTION_VARIANTS,
} from '@/lib/motionTokens'

export interface ScrollRevealProps {
  children: ReactNode
  className?: string
  variant?: 'fade-up' | 'fade-in' | 'scale-subtle' | 'clip-up'
  delay?: number
  duration?: number
  threshold?: number
  margin?: string
  once?: boolean
  as?: ElementType
}

/**
 * Reusable scroll-triggered animation wrapper for sections, cards, and content blocks.
 * Automatically respects prefers-reduced-motion and provides reverse-scroll safety.
 */
export function ScrollReveal({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration,
  margin = '-8% 0px',
  once = true,
  as: Component = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: margin as `${number}px` | `${number}%` })
  const prefersReduced = useReducedMotion()

  const variantMap = {
    'fade-up': MOTION_VARIANTS.fadeUp,
    'fade-in': MOTION_VARIANTS.fadeIn,
    'scale-subtle': MOTION_VARIANTS.scaleSubtle,
    'clip-up': MOTION_VARIANTS.clipUp,
  }

  const activeVariant = variantMap[variant]
  const defaultDuration = duration ?? (variant === 'fade-in' ? MOTION_DURATIONS.standard : MOTION_DURATIONS.reveal)

  const MotionComponent = motion.create(Component)

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: prefersReduced ? REDUCED_MOTION_VARIANTS.hidden : activeVariant.hidden,
        visible: prefersReduced
          ? REDUCED_MOTION_VARIANTS.visible
          : {
              ...activeVariant.visible({ delay, duration: defaultDuration }),
              transition: {
                duration: defaultDuration,
                delay,
                ease: variant === 'clip-up' ? MOTION_EASINGS.mask : MOTION_EASINGS.cinematic,
              },
            },
      }}
    >
      {children}
    </MotionComponent>
  )
}
