/**
 * Button Component with CVA - Session 1.5.6
 *
 * Production-ready button component using:
 * - class-variance-authority (CVA) for type-safe variants
 * - cn() helper for class merging
 * - forwardRef for composability
 *
 * Usage:
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" size="lg" fullWidth>Full Width</Button>
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

// Define button variants using CVA
export const buttonVariants = cva(
  // Base classes - applied to all variants
  [
    'inline-flex items-center justify-center',
    'font-medium rounded-lg',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'disabled:hover:transform-none disabled:hover:shadow-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-brand-500 text-white',
          'hover:bg-brand-600 hover:shadow-md hover:-translate-y-0.5',
          'focus:ring-brand-500',
          'active:scale-95 active:bg-brand-700',
          'disabled:hover:bg-brand-500',
        ],
        secondary: [
          'bg-gray-600 text-white',
          'hover:bg-gray-700 hover:shadow-md hover:-translate-y-0.5',
          'focus:ring-gray-500',
          'active:scale-95 active:bg-gray-800',
          'disabled:hover:bg-gray-600',
        ],
        outline: [
          'bg-transparent text-brand-500 border-2 border-brand-500',
          'hover:bg-brand-50 hover:-translate-y-0.5',
          'focus:ring-brand-500',
          'active:scale-95 active:bg-brand-100',
          'disabled:hover:bg-transparent',
        ],
        ghost: [
          'bg-transparent text-gray-600',
          'hover:bg-gray-100 hover:text-gray-900',
          'focus:ring-gray-400',
          'active:scale-95 active:bg-gray-200',
          'disabled:hover:bg-transparent disabled:hover:text-gray-600',
        ],
        danger: [
          'bg-red-500 text-white',
          'hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5',
          'focus:ring-red-500',
          'active:scale-95 active:bg-red-700',
          'disabled:hover:bg-red-500',
        ],
      },
      size: {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-4 py-2 text-base gap-2',
        lg: 'px-6 py-3 text-lg gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      // Large danger buttons are more prominent
      {
        variant: 'danger',
        size: 'lg',
        className: 'font-semibold',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

// Extract variant props type from CVA
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  isLoading?: boolean
}

// Button component with forwardRef for composability
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export default Button
