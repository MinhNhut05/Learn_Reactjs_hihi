/**
 * Micro Exercise 1: CVA Button - SOLUTION
 * Session 1.5.6 - Headless UI & Production
 */

import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

// 1. Tạo buttonVariants với CVA
const buttonVariants = cva(
  // Base classes - áp dụng cho tất cả variants
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    // 2. Định nghĩa variants
    variants: {
      variant: {
        primary: 'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
        outline: 'border-2 border-brand-500 text-brand-500 hover:bg-brand-50 focus:ring-brand-500',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    // 3. Default variants
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

// 4. Extract types từ buttonVariants
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
}

// 5. Button component
export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  )
}

// Export buttonVariants for reuse
export { buttonVariants }

// Test component
export default function Micro1CVAButtonSolution() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Micro 1: CVA Button - Solution</h1>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Variants</h2>
        <div className="flex gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Sizes</h2>
        <div className="flex items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Combined</h2>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="lg">Primary Large</Button>
          <Button variant="outline" size="sm">Outline Small</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Type Safety Demo</h2>
        <p className="text-sm text-gray-500">
          TypeScript sẽ báo lỗi nếu dùng variant không tồn tại:
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg text-sm">
{`// ✅ Valid
<Button variant="primary" />
<Button variant="secondary" size="lg" />

// ❌ TypeScript Error
// <Button variant="danger" />  // 'danger' is not assignable
// <Button size="xl" />         // 'xl' is not assignable`}
        </pre>
      </div>
    </div>
  )
}
