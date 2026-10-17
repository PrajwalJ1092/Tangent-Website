import { cn } from '@/lib/utils'

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      aria-label="Loading content"
      className={cn(
        'w-6 h-6 border-2 border-[#E9E5DC] border-t-[#20211E] rounded-full animate-spin',
        className,
      )}
    />
  )
}

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[#E9E5DC]/80',
        className,
      )}
      {...props}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="space-y-4 p-4 border border-[#E9E5DC] rounded-lg bg-white">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}
