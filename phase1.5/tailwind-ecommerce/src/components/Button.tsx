/**
 * Button Component - Session 1.5.5 (Design System Version)
 *
 * Reusable button với đầy đủ interactive states:
 * - Multiple variants (primary, secondary, outline, ghost, danger)
 * - Multiple sizes (sm, md, lg)
 * - Hover, focus, active, disabled states
 * - Smooth transitions
 *
 * UPDATE 1.5.5: Sử dụng brand colors (green) từ design system
 * - blue-* → brand-*
 * - Có thể sử dụng class .btn-primary từ components.css
 *
 * Sử dụng: <Button variant="primary" size="md">Click me</Button>
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  isLoading?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  // Base classes - áp dụng cho tất cả buttons
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:transform-none disabled:hover:shadow-none
  `

  // Variant classes - màu sắc và style theo variant
  const variantClasses: Record<ButtonVariant, string> = {
    primary: `
      bg-brand-500 text-white
      hover:bg-brand-600 hover:shadow-md hover:-translate-y-0.5
      focus:ring-brand-500
      active:scale-95 active:bg-brand-700
      disabled:hover:bg-brand-500
    `,
    secondary: `
      bg-gray-600 text-white
      hover:bg-gray-700 hover:shadow-md hover:-translate-y-0.5
      focus:ring-gray-500
      active:scale-95 active:bg-gray-800
      disabled:hover:bg-gray-600
    `,
    outline: `
      bg-transparent text-brand-500 border-2 border-brand-500
      hover:bg-brand-50 hover:-translate-y-0.5
      focus:ring-brand-500
      active:scale-95 active:bg-brand-100
      disabled:hover:bg-transparent
    `,
    ghost: `
      bg-transparent text-gray-600
      hover:bg-gray-100 hover:text-gray-900
      focus:ring-gray-400
      active:scale-95 active:bg-gray-200
      disabled:hover:bg-transparent disabled:hover:text-gray-600
    `,
    danger: `
      bg-red-500 text-white
      hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5
      focus:ring-red-500
      active:scale-95 active:bg-red-700
      disabled:hover:bg-red-500
    `,
  }

  // Size classes
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  }

  // Width class
  const widthClass = fullWidth ? 'w-full' : ''

  // Combine all classes
  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClass}
    ${className}
  `.replace(/\s+/g, ' ').trim()

  return (
    <button
      className={combinedClasses}
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

/**
 * USAGE EXAMPLES:
 *
 * // Primary button (default)
 * <Button>Add to Cart</Button>
 *
 * // Different variants
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="outline">Outline</Button>
 * <Button variant="ghost">Ghost</Button>
 * <Button variant="danger">Delete</Button>
 *
 * // Different sizes
 * <Button size="sm">Small</Button>
 * <Button size="md">Medium</Button>
 * <Button size="lg">Large</Button>
 *
 * // Full width
 * <Button fullWidth>Full Width Button</Button>
 *
 * // Loading state
 * <Button isLoading>Processing...</Button>
 *
 * // Disabled
 * <Button disabled>Disabled</Button>
 *
 * // With icon
 * <Button>
 *   <span>🛒</span>
 *   Add to Cart
 * </Button>
 */

/**
 * STATES BREAKDOWN:
 *
 * 1. HOVER STATE:
 *    - bg-{color}-600: Màu đậm hơn
 *    - shadow-md: Thêm shadow
 *    - -translate-y-0.5: Nâng lên nhẹ
 *
 * 2. FOCUS STATE:
 *    - outline-none: Remove browser outline
 *    - ring-2: Thêm ring
 *    - ring-{color}-500: Màu ring
 *    - ring-offset-2: Khoảng cách ring
 *
 * 3. ACTIVE STATE:
 *    - scale-95: Thu nhỏ khi click
 *    - bg-{color}-700: Màu đậm nhất
 *
 * 4. DISABLED STATE:
 *    - opacity-50: Mờ đi
 *    - cursor-not-allowed: Cursor disabled
 *    - hover:transform-none: Disable hover effects
 */
