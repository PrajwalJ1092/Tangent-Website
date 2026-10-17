import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Register ScrollTrigger safely
if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  gsap.registerPlugin(ScrollTrigger)
  // Configure smooth scrolling tolerance
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  })
}

/**
 * Reusable React Hook for GSAP animations with automatic context cleanup
 * Avoids memory leaks, orphaned ScrollTriggers, and duplicate trigger creation on route changes.
 */
export function useGSAPContext(
  animationCallback: (context: gsap.Context) => void,
  dependencies: unknown[] = [],
  scopeRef?: React.RefObject<HTMLElement | null>,
) {
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    // Check prefers-reduced-motion
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReducedMotion) {
      return
    }

    const ctx = gsap.context(() => {
      if (isMountedRef.current) {
        animationCallback(ctx)
      }
    }, scopeRef?.current || undefined)

    return () => {
      isMountedRef.current = false
      ctx.revert() // Reverts all GSAP tweens and kills all ScrollTriggers created in this context
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

/**
 * Helper to refresh ScrollTrigger calculations when layout shifts or images complete loading
 */
export function refreshScrollTrigger() {
  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }
}

export { gsap, ScrollTrigger }
