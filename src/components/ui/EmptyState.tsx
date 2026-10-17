import type { ReactNode } from 'react'
import { FolderArchive } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  actionNode?: ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionNode,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center border border-[#E9E5DC] rounded-lg bg-[#FCFAF6] max-w-lg mx-auto',
        className,
      )}
    >
      <div className="w-12 h-12 rounded-full bg-[#E9E5DC] flex items-center justify-center text-[#53554D] mb-4">
        {icon || <FolderArchive className="w-5 h-5" />}
      </div>
      <h3 className="font-serif text-2xl font-normal text-[#20211E] mb-2">
        {title}
      </h3>
      <p className="font-sans text-sm text-[#53554D] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionNode}
      {actionLabel && onAction && !actionNode && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
