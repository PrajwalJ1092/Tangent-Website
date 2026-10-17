import { motion, useReducedMotion } from 'motion/react'
import { useState, useRef, type ReactNode, type MouseEvent } from 'react'
import { MOTION_DURATIONS, MOTION_EASINGS, useIsMobile } from '@/lib/motionTokens'
import { cn } from '@/lib/utils'

export interface HoverUnderlineProps {
  children: ReactNode
  className?: string
  active?: boolean
  lineColor?: string
}

/**
 * Editorial animated underline for navigation links, inline text links, and tabs.
 */
export function HoverUnderline({
  children,
  className = '',
  active = false,
  lineColor = 'bg-current',
}: HoverUnderlineProps) {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <span
      className={cn('relative inline-block cursor-pointer', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {prefersReduced ? (
        active ? (
          <span className={cn('absolute bottom-0 left-0 right-0 h-[1.5px]', lineColor)} />
        ) : null
      ) : (
        <motion.span
          className={cn('absolute bottom-0 left-0 h-[1.5px] rounded-full', lineColor)}
          initial={false}
          animate={{
            width: active || isHovered ? '100%' : '0%',
            opacity: active || isHovered ? 1 : 0,
          }}
          transition={{
            duration: MOTION_DURATIONS.standard,
            ease: MOTION_EASINGS.snappy,
          }}
        />
      )}
    </span>
  )
}

export interface MagneticHoverProps {
  children: ReactNode
  className?: string
  strength?: number
}

/**
 * Subtle magnetic drift towards cursor for high-touch circular buttons, arrows, and tags.
 * Safely bypassed on mobile / touch and reduced motion.
 */
export function MagneticHover({
  children,
  className = '',
  strength = 14,
}: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const isMobile = useIsMobile()
  const prefersReduced = useReducedMotion()

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile || prefersReduced || !ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({
      x: (middleX / (width / 2)) * strength,
      y: (middleY / (height / 2)) * strength,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  if (isMobile || prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        damping: 18,
        stiffness: 220,
        mass: 0.15,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export interface CardHoverProps {
  children: ReactNode
  className?: string
  lift?: number
}

/**
 * Refined Card Hover wrapper providing architectural elevation without excessive movement.
 */
export function CardHover({
  children,
  className = '',
  lift = 3,
}: CardHoverProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      whileHover={{ y: -lift }}
      transition={{
        duration: MOTION_DURATIONS.standard,
        ease: MOTION_EASINGS.editorial,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
