/**
 * Input Component - Session 1.5.5 (Design System Version)
 *
 * Reusable input với đầy đủ focus states:
 * - Focus ring
 * - Error/success states
 * - Helper text
 * - Label support
 * - Peer pattern cho validation messages
 *
 * UPDATE 1.5.5: Sử dụng brand colors (green) từ design system
 * - blue-* → brand-*
 * - Có thể sử dụng class .input-field từ components.css
 *
 * Sử dụng: <Input label="Email" placeholder="your@email.com" />
 */

import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

type InputSize = 'sm' | 'md' | 'lg'
type InputState = 'default' | 'error' | 'success'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  size?: InputSize
  state?: InputState
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      successMessage,
      size = 'md',
      state = 'default',
      fullWidth = true,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    // Base classes
    const baseClasses = `
      block rounded-lg border
      transition-all duration-200
      outline-none
      placeholder:text-gray-400
      disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
    `

    // Size classes
    const sizeClasses: Record<InputSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    }

    // State classes
    const stateClasses: Record<InputState, string> = {
      default: `
        border-gray-300
        focus:border-transparent focus:ring-2 focus:ring-brand-500
        hover:border-gray-400
      `,
      error: `
        border-red-500
        focus:border-transparent focus:ring-2 focus:ring-red-500
        bg-red-50
      `,
      success: `
        border-green-500
        focus:border-transparent focus:ring-2 focus:ring-green-500
        bg-green-50
      `,
    }

    // Width class
    const widthClass = fullWidth ? 'w-full' : ''

    // Combine classes
    const combinedClasses = `
      ${baseClasses}
      ${sizeClasses[size]}
      ${stateClasses[state]}
      ${widthClass}
      ${className}
    `.replace(/\s+/g, ' ').trim()

    // Determine message to show
    const message = errorMessage || successMessage || helperText
    const messageColor =
      errorMessage ? 'text-red-500' :
      successMessage ? 'text-green-500' :
      'text-gray-500'

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={inputId}
          className={combinedClasses}
          {...props}
        />

        {/* Helper/Error/Success Message */}
        {message && (
          <p className={`mt-1.5 text-sm ${messageColor}`}>
            {message}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

/**
 * ADVANCED: Input với Peer Pattern cho dynamic validation UI
 */
export function InputWithValidation({
  label,
  size: _size,
  state: _state,
  helperText: _helperText,
  errorMessage: _errorMessage,
  successMessage: _successMessage,
  fullWidth: _fullWidth,
  ...props
}: InputProps) {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
        </label>
      )}

      {/* Input with peer class */}
      <input
        id={inputId}
        className="
          peer w-full px-4 py-2 rounded-lg border border-gray-300
          outline-none transition-all duration-200
          placeholder:text-gray-400
          focus:border-transparent focus:ring-2 focus:ring-brand-500
          invalid:border-red-500 invalid:focus:ring-red-500
          valid:border-green-500 valid:focus:ring-green-500
        "
        {...props}
      />

      {/* Helper text - visible when focused (not invalid) */}
      <p className="
        mt-1 text-sm text-gray-500
        invisible peer-focus:visible
        peer-invalid:invisible
      ">
        Enter your information
      </p>

      {/* Error message - visible when invalid */}
      <p className="
        mt-1 text-sm text-red-500
        hidden peer-invalid:block
      ">
        Please enter a valid value
      </p>

      {/* Success indicator - visible when valid and not placeholder-shown */}
      <p className="
        mt-1 text-sm text-green-500
        hidden peer-valid:peer-not-placeholder-shown:block
        peer-focus:hidden
      ">
        ✓ Looks good!
      </p>
    </div>
  )
}

/**
 * USAGE EXAMPLES:
 *
 * // Basic input
 * <Input placeholder="Enter text" />
 *
 * // With label
 * <Input label="Email" placeholder="your@email.com" />
 *
 * // Required field
 * <Input label="Username" required />
 *
 * // Different sizes
 * <Input size="sm" placeholder="Small" />
 * <Input size="md" placeholder="Medium" />
 * <Input size="lg" placeholder="Large" />
 *
 * // Error state
 * <Input
 *   label="Email"
 *   state="error"
 *   errorMessage="Please enter a valid email"
 * />
 *
 * // Success state
 * <Input
 *   label="Email"
 *   state="success"
 *   successMessage="Email is available!"
 * />
 *
 * // With helper text
 * <Input
 *   label="Password"
 *   type="password"
 *   helperText="Must be at least 8 characters"
 * />
 *
 * // With peer validation (dynamic)
 * <InputWithValidation
 *   type="email"
 *   label="Email"
 *   required
 *   placeholder="your@email.com"
 * />
 */

/**
 * STATES BREAKDOWN:
 *
 * 1. DEFAULT STATE:
 *    - border-gray-300: Border nhẹ
 *    - hover:border-gray-400: Đậm hơn khi hover
 *
 * 2. FOCUS STATE:
 *    - focus:ring-2: Ring width
 *    - focus:ring-blue-500: Ring color
 *    - focus:border-transparent: Ẩn border
 *
 * 3. ERROR STATE:
 *    - border-red-500: Red border
 *    - focus:ring-red-500: Red ring
 *    - bg-red-50: Light red background
 *
 * 4. SUCCESS STATE:
 *    - border-green-500: Green border
 *    - focus:ring-green-500: Green ring
 *    - bg-green-50: Light green background
 *
 * 5. DISABLED STATE:
 *    - bg-gray-100: Gray background
 *    - text-gray-400: Gray text
 *    - cursor-not-allowed: Disabled cursor
 */
