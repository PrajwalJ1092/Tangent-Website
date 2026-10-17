import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Mock window.matchMedia and IntersectionObserver for JSDOM test environments
if (typeof window !== 'undefined') {
  window.scrollTo = () => {}

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })

  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null
    readonly rootMargin: string = ''
    readonly thresholds: ReadonlyArray<number> = []
    disconnect = () => {}
    observe = (target: Element) => {
      // Simulate immediate intersection in test environment so components render visible
      if (this.callback) {
        this.callback(
          [
            {
              isIntersecting: true,
              target,
              intersectionRatio: 1,
              boundingClientRect: target.getBoundingClientRect(),
              intersectionRect: target.getBoundingClientRect(),
              rootBounds: null,
              time: Date.now(),
            } as IntersectionObserverEntry,
          ],
          this,
        )
      }
    }
    takeRecords = () => []
    unobserve = () => {}
    constructor(private callback?: IntersectionObserverCallback) {}
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
}

// Global animation frame fallbacks for test teardown resilience
if (typeof global !== 'undefined') {
  if (!global.requestAnimationFrame) {
    global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
      return setTimeout(() => callback(Date.now()), 16) as unknown as number
    }
  }
  if (!global.cancelAnimationFrame) {
    global.cancelAnimationFrame = (id: number): void => {
      clearTimeout(id)
    }
  }
}

afterEach(() => {
  cleanup()
})
