import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'narrow' | 'default' | 'wide' | 'full'
  noPadding?: boolean
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', noPadding = false, children, ...props }, ref) => {
    const sizeStyles = {
      narrow: 'max-w-3xl',
      default: 'max-w-7xl',
      wide: 'max-w-[1536px]',
      full: 'max-w-none',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'w-full mx-auto',
          sizeStyles[size],
          !noPadding && 'px-6 sm:px-8 lg:px-12',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Container.displayName = 'Container'
