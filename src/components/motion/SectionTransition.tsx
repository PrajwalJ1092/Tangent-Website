import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { MOTION_DURATIONS, MOTION_EASINGS } from '@/lib/motionTokens'
import { cn } from '@/lib/utils'

export interface SectionTransitionProps {
  className?: string
  variant?: 'hairline' | 'dark-to-light' | 'light-to-dark' | 'bracket'
  label?: string
  coordinate?: string
}

/**
 * Section Transition divider pattern creating deliberate architectural transitions
 * between major visual zones.
 */
export function SectionTransition({
  className = '',
  variant = 'hairline',
  label,
  coordinate,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const prefersReduced = useReducedMotion()

  if (variant === 'hairline') {
    return (
      <div ref={ref} className={cn('w-full py-6 sm:py-8 overflow-hidden', className)}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between text-[11px] font-mono text-[#797C72] uppercase tracking-[0.24em] mb-3">
          {label && <span>{label}</span>}
          {coordinate && <span className="hidden sm:inline">{coordinate}</span>}
        </div>
        <div className="w-full h-[1px] bg-[#E9E5DC] relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#777B60]"
            initial={prefersReduced ? false : { width: '0%' }}
            animate={prefersReduced ? { width: '100%' } : isInView ? { width: '100%' } : { width: '0%' }}
            transition={{
              duration: MOTION_DURATIONS.cinematic,
              ease: MOTION_EASINGS.editorial,
            }}
          />
        </div>
      </div>
    )
  }

  if (variant === 'dark-to-light') {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full h-16 sm:h-24 bg-gradient-to-b from-[#1A1B18] to-[#F6F4EF] relative pointer-events-none',
          className,
        )}
      />
    )
  }

  if (variant === 'light-to-dark') {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full h-16 sm:h-24 bg-gradient-to-b from-[#F6F4EF] to-[#1A1B18] relative pointer-events-none',
          className,
        )}
      />
    )
  }

  // Bracket variant: editorial crosshairs
  return (
    <div ref={ref} className={cn('w-full py-4 flex items-center justify-center', className)}>
      <motion.div
        className="flex items-center gap-4 text-xs font-mono text-[#797C72]"
        initial={prefersReduced ? false : { opacity: 0, y: 10 }}
        animate={prefersReduced ? { opacity: 1, y: 0 } : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: MOTION_DURATIONS.standard, ease: MOTION_EASINGS.cinematic }}
      >
        <span className="w-8 h-[1px] bg-[#D3CDC0]" />
        <span>+</span>
        <span className="w-8 h-[1px] bg-[#D3CDC0]" />
      </motion.div>
    </div>
  )
}
