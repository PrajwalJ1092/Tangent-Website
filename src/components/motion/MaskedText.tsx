import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

interface MaskedTextProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  delay?: number
  duration?: number
}

/**
 * Editorial masked text reveal where text slides up smoothly from behind an overflow-hidden clipping mask.
 * Respects prefers-reduced-motion automatically through standard motion rules.
 */
export function MaskedText({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  duration = 0.85,
}: MaskedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  // Split lines if text contains explicit newlines, or split into sentences/words if needed
  const lines = children.split('\n').filter(Boolean)

  return (
    <Component ref={ref} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden py-1">
          <motion.span
            className="block"
            initial={{ y: '115%', opacity: 0.1, rotateX: 6 }}
            animate={isInView ? { y: '0%', opacity: 1, rotateX: 0 } : {}}
            transition={{
              duration,
              delay: delay + index * 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  )
}
