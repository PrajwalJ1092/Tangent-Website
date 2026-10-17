import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  to?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 text-xs', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="w-3 h-3 text-[#797C72]" />}
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="text-[#53554D] hover:text-[#20211E] transition-colors uppercase tracking-wider font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? 'page' : undefined}
                className={cn(
                  'uppercase tracking-wider font-medium',
                  isLast ? 'text-[#20211E]' : 'text-[#53554D]',
                )}
              >
                {item.label}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}
