import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

interface BaseFieldProps {
  label?: string
  helper?: string
  error?: string
  required?: boolean
}

export interface FormInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BaseFieldProps {}

export interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseFieldProps {}

export interface FormSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    BaseFieldProps {
  children: ReactNode
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, helper, error, required, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label htmlFor={inputId} className="font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#20211E]">
            {label} {required && <span className="text-[#777B60]">*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 rounded-md border border-[#E9E5DC] bg-white text-sm font-sans text-[#20211E] placeholder:text-[#797C72] transition-colors focus:border-[#20211E] focus:outline-none focus:ring-1 focus:ring-[#20211E] disabled:opacity-50',
            error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
            className,
          )}
          {...props}
        />
        {helper && !error && <span className="text-xs text-[#797C72] font-sans">{helper}</span>}
        {error && <span className="text-xs text-red-600 font-sans">{error}</span>}
      </div>
    )
  },
)

FormInput.displayName = 'FormInput'

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, helper, error, required, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label htmlFor={textareaId} className="font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#20211E]">
            {label} {required && <span className="text-[#777B60]">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full px-4 py-3 rounded-md border border-[#E9E5DC] bg-white text-sm font-sans text-[#20211E] placeholder:text-[#797C72] transition-colors focus:border-[#20211E] focus:outline-none focus:ring-1 focus:ring-[#20211E] disabled:opacity-50 resize-y',
            error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
            className,
          )}
          {...props}
        />
        {helper && !error && <span className="text-xs text-[#797C72] font-sans">{helper}</span>}
        {error && <span className="text-xs text-red-600 font-sans">{error}</span>}
      </div>
    )
  },
)

FormTextarea.displayName = 'FormTextarea'

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, label, helper, error, required, id, children, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label htmlFor={selectId} className="font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#20211E]">
            {label} {required && <span className="text-[#777B60]">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 rounded-md border border-[#E9E5DC] bg-white text-sm font-sans text-[#20211E] transition-colors focus:border-[#20211E] focus:outline-none focus:ring-1 focus:ring-[#20211E] disabled:opacity-50 cursor-pointer',
            error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {helper && !error && <span className="text-xs text-[#797C72] font-sans">{helper}</span>}
        {error && <span className="text-xs text-red-600 font-sans">{error}</span>}
      </div>
    )
  },
)

FormSelect.displayName = 'FormSelect'
