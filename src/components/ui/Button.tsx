import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'editorial'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-sans font-medium transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.985] tracking-wide'

    const variantStyles = {
      primary:
        'bg-[#20211E] text-[#F6F4EF] hover:bg-[#151614] hover:shadow-[0_4px_16px_rgba(32,33,30,0.15)] rounded-md border border-[#20211E]',
      secondary:
        'bg-[#E9E5DC] text-[#20211E] hover:bg-[#DDD8CD] rounded-md border border-[#E9E5DC]',
      outline:
        'border border-[#20211E] text-[#20211E] bg-transparent hover:bg-[#20211E] hover:text-[#F6F4EF] rounded-md',
      ghost:
        'text-[#53554D] hover:text-[#20211E] hover:bg-[#E9E5DC]/50 rounded-md',
      editorial:
        'text-[#20211E] bg-transparent p-0 rounded-none border-b border-[#20211E] hover:border-[#777B60] hover:text-[#777B60] pb-0.5',
    }

    const sizeStyles = {
      sm: variant === 'editorial' ? 'text-xs' : 'text-xs px-3.5 py-1.5 gap-1.5',
      md: variant === 'editorial' ? 'text-sm' : 'text-sm px-5 py-2.5 gap-2',
      lg: variant === 'editorial' ? 'text-base' : 'text-base px-7 py-3.5 gap-2.5',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
