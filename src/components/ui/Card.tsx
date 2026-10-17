import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hoverable?: boolean
  variant?: 'surface' | 'stone' | 'bordered'
}

export function Card({
  className,
  hoverable = false,
  variant = 'surface',
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    surface: 'bg-white border-[#E9E5DC]',
    stone: 'bg-[#F2EFE8] border-[#E9E5DC]',
    bordered: 'bg-transparent border-[#20211E]/20',
  }

  return (
    <div
      className={cn(
        'rounded-lg border p-6 transition-all duration-300 text-left',
        variantStyles[variant],
        hoverable &&
          'hover:border-[#D3CDC0] hover:shadow-[0_8px_24px_-4px_rgba(32,33,30,0.06)] hover:-translate-y-0.5',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
