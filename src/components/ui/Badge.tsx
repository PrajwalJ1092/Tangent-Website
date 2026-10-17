import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'accent' | 'muted'
  children: ReactNode
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium tracking-[0.14em] uppercase'

  const variantStyles = {
    default: 'bg-[#E9E5DC] text-[#20211E] border border-[#D3CDC0]',
    outline: 'border border-[#797C72]/50 text-[#53554D]',
    accent: 'bg-[#777B60]/15 text-[#585C42] border border-[#777B60]/30',
    muted: 'bg-[#F2EFE8] text-[#797C72]',
  }

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  )
}
