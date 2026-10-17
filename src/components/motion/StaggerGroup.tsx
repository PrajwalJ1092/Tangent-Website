import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode, type ElementType } from 'react'
import { MOTION_DURATIONS, MOTION_EASINGS, MOTION_STAGGERS } from '@/lib/motionTokens'

export interface StaggerGroupProps {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  once?: boolean
  margin?: string
  as?: ElementType
}

export function StaggerGroup({
  children,
  className = '',
  stagger = MOTION_STAGGERS.standard,
  delay = 0,
  once = true,
  margin = '-8% 0px',
  as: Component = 'div',
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: margin as `${number}px` | `${number}%` })
  const prefersReduced = useReducedMotion()

  const MotionComponent = motion.create(Component)

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {children}
    </MotionComponent>
  )
}

export interface StaggerItemProps {
  children: ReactNode
  className?: string
  yOffset?: number
  duration?: number
  as?: ElementType
}

export function StaggerItem({
  children,
  className = '',
  yOffset = 20,
  duration = MOTION_DURATIONS.medium,
  as: Component = 'div',
}: StaggerItemProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>
  }

  const MotionComponent = motion.create(Component)

  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: MOTION_EASINGS.cinematic,
      },
    },
  }

  return (
    <MotionComponent className={className} variants={itemVariants}>
      {children}
    </MotionComponent>
  )
}
