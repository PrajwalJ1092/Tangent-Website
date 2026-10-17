import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  align?: 'left' | 'center' | 'split'
}

export function SectionHeading({
  className,
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  ...props
}: SectionHeadingProps) {
  if (align === 'split') {
    return (
      <div
        className={cn(
          'flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E9E5DC]',
          className,
        )}
        {...props}
      >
        <div className="space-y-3 max-w-2xl">
          {eyebrow && (
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#777B60] block">
              {eyebrow}
            </span>
          )}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#20211E] text-balance">
            {title}
          </h2>
          {description && (
            <p className="font-sans text-sm sm:text-base text-[#53554D] leading-relaxed text-pretty">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'space-y-3 pb-8 border-b border-[#E9E5DC]',
        align === 'center' && 'text-center mx-auto max-w-3xl',
        align === 'left' && 'max-w-2xl text-left',
        className,
      )}
      {...props}
    >
      {eyebrow && (
        <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#777B60] block">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#20211E] text-balance">
        {title}
      </h2>
      {description && (
        <p className="font-sans text-sm sm:text-base text-[#53554D] leading-relaxed text-pretty">
          {description}
        </p>
      )}
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}
