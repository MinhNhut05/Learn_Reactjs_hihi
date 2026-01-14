/**
 * Micro Exercise 1: CVA Button
 * Session 1.5.6 - Headless UI & Production
 *
 * MỤC TIÊU:
 * Tạo buttonVariants sử dụng CVA (class-variance-authority)
 *
 * YÊU CẦU:
 * 1. Tạo buttonVariants với cva()
 * 2. Định nghĩa variants:
 *    - variant: primary, secondary, outline
 *    - size: sm, md, lg
 * 3. Có defaultVariants
 * 4. Sử dụng VariantProps để extract types
 *
 * THỜI GIAN: 5 phút
 *
 * GỢI Ý:
 * - Import { cva, type VariantProps } from 'class-variance-authority'
 * - Base classes: 'inline-flex items-center justify-center rounded-lg font-medium transition-colors'
 * - primary: 'bg-brand-500 text-white hover:bg-brand-600'
 * - secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
 * - outline: 'border-2 border-brand-500 text-brand-500 hover:bg-brand-50'
 */

import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

// TODO: Tạo buttonVariants với CVA
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
        outline:
          "border-2 border-brand-500 text-brand-500 hover:bg-brand-50 focus:ring-brand-500",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-4 py-2",
        lg: "px-6 py-3",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

// TODO: Extract types từ buttonVariants
// TODO: Tạo interface ButtonProps
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

// TODO: Tạo Button component
export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  // Implement me!
  return (
    <button className={buttonVariants({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

// Test component - Không cần sửa
export default function Micro1CVAButton() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Micro 1: CVA Button</h1>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Variants</h2>
        <div className="flex gap-4">
          {/* TODO: Uncomment khi hoàn thành */}
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Sizes</h2>
        <div className="flex items-center gap-4">
          {/* TODO: Uncomment khi hoàn thành */}
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Combined</h2>
        <div className="flex items-center gap-4">
          {/* TODO: Uncomment khi hoàn thành */}
          <Button variant="primary" size="lg">
            Primary Large
          </Button>
          <Button variant="outline" size="sm">
            Outline Small
          </Button>
        </div>
      </div>
    </div>
  );
}
