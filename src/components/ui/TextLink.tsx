import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TextLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to?: string
  external?: boolean
  showArrow?: boolean
}

export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps & Partial<LinkProps>>(
  ({ className, to, external = false, showArrow = false, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center gap-1 font-sans text-sm font-medium text-[#20211E] hover:text-[#777B60] transition-colors duration-200 group relative border-b border-[#20211E]/40 hover:border-[#777B60] pb-0.5'

    if (to && !external) {
      return (
        <Link ref={ref} to={to} className={cn(baseStyles, className)} {...props}>
          <span>{children}</span>
          {showArrow && (
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </Link>
      )
    }

    return (
      <a
        ref={ref}
        href={to}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cn(baseStyles, className)}
        {...props}
      >
        <span>{children}</span>
        {showArrow && (
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </a>
    )
  },
)

TextLink.displayName = 'TextLink'
