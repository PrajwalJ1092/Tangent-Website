import { useReducedMotion } from 'motion/react'
import { useState, useEffect } from 'react'

/**
 * THE TANGENT COLLABORATIVE — GLOBAL MOTION TOKENS
 * Architectural, cinematic, and restrained motion language for luxury spatial design.
 */

export const MOTION_EASINGS = {
  // Primary fluid deceleration for editorial typography and spatial cards
  cinematic: [0.22, 1, 0.36, 1] as const,
  // High-precision architectural arrival for sharp borders and line rulers
  editorial: [0.16, 1, 0.3, 1] as const,
  // Gentle curve for ambient lighting and subtle background shifts
  gentle: [0.25, 0.1, 0.25, 1] as const,
  // Quartic wipe for curtain reveals and image clipping masks
  mask: [0.77, 0, 0.175, 1] as const,
  // Responsive micro-interaction curve for buttons, pills, and toggles
  snappy: [0.4, 0, 0.2, 1] as const,
}

export const MOTION_DURATIONS = {
  // Micro-interactions: buttons, pills, cart badge count, icons
  micro: 0.2,
  // Standard transitions: modal backdrops, dropdowns, card borders
  standard: 0.35,
  // Medium reveals: paragraph entrances, metadata rows, card contents
  medium: 0.55,
  // Editorial reveals: masked headlines, image curtain expansions
  reveal: 0.85,
  // Cinematic hero & atmospheric sequences
  cinematic: 1.25,
  // Page route transition
  page: 0.3,
}

export const MOTION_STAGGERS = {
  tight: 0.06,
  standard: 0.1,
  relaxed: 0.16,
}

/**
 * Standard Framer Motion Variants for Reusable UI Patterns
 */
export const MOTION_VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: (custom: { delay?: number; duration?: number } = {}) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: custom.duration ?? MOTION_DURATIONS.reveal,
        delay: custom.delay ?? 0,
        ease: MOTION_EASINGS.cinematic,
      },
    }),
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (custom: { delay?: number; duration?: number } = {}) => ({
      opacity: 1,
      transition: {
        duration: custom.duration ?? MOTION_DURATIONS.standard,
        delay: custom.delay ?? 0,
        ease: MOTION_EASINGS.gentle,
      },
    }),
  },
  scaleSubtle: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: (custom: { delay?: number; duration?: number } = {}) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: custom.duration ?? MOTION_DURATIONS.reveal,
        delay: custom.delay ?? 0,
        ease: MOTION_EASINGS.cinematic,
      },
    }),
  },
  clipUp: {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.8 },
    visible: (custom: { delay?: number; duration?: number } = {}) => ({
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      transition: {
        duration: custom.duration ?? MOTION_DURATIONS.reveal,
        delay: custom.delay ?? 0,
        ease: MOTION_EASINGS.mask,
      },
    }),
  },
}

/**
 * Reduced-motion safe variants: immediately visible without motion or delay
 */
export const REDUCED_MOTION_VARIANTS = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'none' },
  visible: { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'none', transition: { duration: 0 } },
}

/**
 * Hook to detect mobile viewports to gracefully simplify expensive continuous effects
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpoint
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return isMobile
}

/**
 * Hook combining prefers-reduced-motion with motion availability
 */
export function useMotionSafe() {
  const prefersReduced = useReducedMotion()
  return {
    isReduced: !!prefersReduced,
    isMotionSafe: !prefersReduced,
    easings: MOTION_EASINGS,
    durations: MOTION_DURATIONS,
    staggers: MOTION_STAGGERS,
  }
}
