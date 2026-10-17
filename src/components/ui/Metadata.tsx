import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface MetadataItem {
  label: string
  value: ReactNode
}

export interface MetadataProps {
  items: MetadataItem[]
  layout?: 'grid' | 'stacked' | 'horizontal'
  className?: string
}

export function Metadata({ items, layout = 'grid', className }: MetadataProps) {
  if (layout === 'horizontal') {
    return (
      <div className={cn('flex flex-wrap items-center gap-x-8 gap-y-3 py-4 border-y border-[#E9E5DC]', className)}>
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs">
            <span className="uppercase tracking-[0.15em] font-medium text-[#797C72]">
              {item.label}:
            </span>
            <span className="font-sans font-medium text-[#20211E]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    )
  }

  if (layout === 'stacked') {
    return (
      <dl className={cn('divide-y divide-[#E9E5DC] border-y border-[#E9E5DC]', className)}>
        {items.map((item) => (
          <div key={item.label} className="py-3 flex items-center justify-between gap-4 text-xs">
            <dt className="uppercase tracking-[0.15em] font-medium text-[#797C72]">
              {item.label}
            </dt>
            <dd className="font-sans font-medium text-[#20211E] text-right">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    )
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-6 border-y border-[#E9E5DC]',
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="space-y-1">
          <span className="block font-sans text-[11px] uppercase tracking-[0.18em] font-medium text-[#797C72]">
            {item.label}
          </span>
          <span className="block font-sans text-sm font-medium text-[#20211E]">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}
