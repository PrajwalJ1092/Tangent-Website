import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface PageHeadingProps extends HTMLAttributes<HTMLDivElement> {
  breadcrumbs?: ReactNode
  title: string
  subtitle?: string
  actions?: ReactNode
}

export function PageHeading({
  className,
  breadcrumbs,
  title,
  subtitle,
  actions,
  ...props
}: PageHeadingProps) {
  return (
    <div
      className={cn(
        'pt-12 pb-10 border-b border-[#E9E5DC] space-y-4 w-full',
        className,
      )}
      {...props}
    >
      {breadcrumbs && <div>{breadcrumbs}</div>}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#20211E] text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="font-sans text-base sm:text-lg text-[#53554D] leading-relaxed max-w-2xl text-pretty font-light">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="shrink-0 flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  )
}
