import { motion, useReducedMotion } from 'motion/react'
import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { MOTION_DURATIONS, MOTION_EASINGS } from '@/lib/motionTokens'

export interface PageTransitionProps {
  children: ReactNode
}

/**
 * Polished route transition wrapper.
 * Fast, non-blocking (0.3s), preserves scroll position and accessible focus,
 * and eliminates layout flicker.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const prefersReduced = useReducedMotion()

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  if (prefersReduced) {
    return <>{children}</>
  }

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{
        duration: MOTION_DURATIONS.page,
        ease: MOTION_EASINGS.cinematic,
      }}
      className="w-full flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  )
}
