# Session 1.5.6 - Headless UI & Production

## Mục tiêu học tập

Sau session này, bạn sẽ:
- Hiểu và sử dụng **Headless UI** để tạo accessible components
- Master **CVA (class-variance-authority)** cho type-safe variants
- Tạo **cn() helper** với clsx + tailwind-merge
- Biết cách tối ưu Tailwind cho **production**

---

## 1. Headless UI là gì?

### 1.1 Khái niệm

**Headless UI** là thư viện components từ Tailwind Labs, cung cấp:
- **Unstyled components** - Không có CSS mặc định
- **Fully accessible** - WAI-ARIA compliant
- **Keyboard navigation** - Hỗ trợ keyboard đầy đủ
- **Focus management** - Quản lý focus tự động

```tsx
// Headless UI KHÔNG style gì cả
// Bạn tự style với Tailwind CSS
import { Dialog } from '@headlessui/react'

<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
  {/* Bạn tự thêm styles */}
  <Dialog.Panel className="bg-white rounded-xl p-6">
    ...
  </Dialog.Panel>
</Dialog>
```

### 1.2 Các components chính

| Component | Mô tả | Use case |
|-----------|-------|----------|
| `Dialog` | Modal/Popup | Quick view, confirmations |
| `Menu` | Dropdown menu | User menu, actions |
| `Listbox` | Custom select | Form selects |
| `Combobox` | Autocomplete | Search, filters |
| `Disclosure` | Accordion | FAQs, expandable |
| `Popover` | Tooltip/Popover | Info tooltips |
| `Transition` | Animations | Enter/leave effects |

### 1.3 Dialog (Modal) Component

```tsx
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export function Modal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)}>
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          {/* Modal container */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
                <Dialog.Title className="text-lg font-semibold">
                  Modal Title
                </Dialog.Title>
                <Dialog.Description className="text-gray-500 mt-2">
                  Modal description here...
                </Dialog.Description>

                <div className="mt-4">
                  <button onClick={() => setIsOpen(false)}>
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
```

**Giải thích các phần:**
- `Transition.show` - Control hiển thị animation
- `Transition.Child` - Animate từng phần riêng
- `enter/leave` - Duration classes
- `enterFrom/enterTo` - Start/end state khi mở
- `leaveFrom/leaveTo` - Start/end state khi đóng
- `Dialog.Panel` - Container chính của modal

### 1.4 Menu (Dropdown) Component

```tsx
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export function Dropdown() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="px-4 py-2 bg-brand-500 text-white rounded-lg">
        Options
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-brand-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-brand-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
```

**Key points:**
- `Menu.Item` render prop trả về `{ active }` - item đang được hover/focus
- Keyboard navigation hoạt động tự động
- Focus trap được quản lý

---

## 2. CVA (class-variance-authority)

### 2.1 Tại sao cần CVA?

**Problem:** Quản lý variants với object + string concatenation khó maintain

```tsx
// WITHOUT CVA - Khó maintain, dễ bug
const variantClasses = {
  primary: 'bg-brand-500 text-white',
  secondary: 'bg-gray-100 text-gray-900',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
}

// Phải tự combine, không type-safe
<button className={`${variantClasses[variant]} ${sizeClasses[size]}`}>
```

**Solution:** CVA cung cấp type-safe, declarative API

```tsx
// WITH CVA - Clean, type-safe, easy to extend
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand-500 text-white hover:bg-brand-600',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

// Type-safe usage
buttonVariants({ variant: 'primary', size: 'sm' })
buttonVariants({ variant: 'danger' }) // TypeScript error!
```

### 2.2 Cấu trúc cva()

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const componentVariants = cva(
  // 1. BASE CLASSES - Áp dụng cho tất cả variants
  'base classes here',

  {
    // 2. VARIANTS - Định nghĩa các variation
    variants: {
      variant: {
        primary: 'primary-classes',
        secondary: 'secondary-classes',
        outline: 'outline-classes',
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
        lg: 'large-classes',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        full: 'rounded-full',
      },
    },

    // 3. COMPOUND VARIANTS - Kết hợp nhiều variants
    compoundVariants: [
      {
        variant: 'primary',
        size: 'lg',
        className: 'uppercase tracking-wide', // Extra classes khi cả 2 match
      },
    ],

    // 4. DEFAULT VARIANTS - Giá trị mặc định
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'sm',
    },
  }
)

// 5. EXTRACT TYPES - Lấy types từ variants
type ComponentProps = VariantProps<typeof componentVariants>
// => { variant?: 'primary' | 'secondary' | 'outline', size?: 'sm' | 'md' | 'lg', ... }
```

### 2.3 Compound Variants

Compound variants cho phép thêm classes khi NHIỀU conditions match:

```tsx
const buttonVariants = cva('base', {
  variants: {
    intent: {
      primary: 'bg-brand-500',
      danger: 'bg-red-500',
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
  compoundVariants: [
    // Khi intent=danger VÀ size=lg
    {
      intent: 'danger',
      size: 'lg',
      className: 'font-bold uppercase', // Thêm classes này
    },
    // Có thể match multiple values
    {
      intent: ['primary', 'danger'],
      size: 'sm',
      className: 'border-2',
    },
  ],
})
```

### 2.4 Complete Button Example với CVA

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base classes
  [
    'inline-flex items-center justify-center',
    'font-medium rounded-lg',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-brand-500 text-white',
          'hover:bg-brand-600 hover:shadow-md',
          'focus:ring-brand-500',
          'active:scale-95',
        ],
        secondary: [
          'bg-gray-100 text-gray-900',
          'hover:bg-gray-200',
          'focus:ring-gray-500',
        ],
        outline: [
          'border-2 border-brand-500 text-brand-500',
          'hover:bg-brand-50',
          'focus:ring-brand-500',
        ],
        ghost: [
          'text-gray-600',
          'hover:bg-gray-100 hover:text-gray-900',
          'focus:ring-gray-400',
        ],
        danger: [
          'bg-red-500 text-white',
          'hover:bg-red-600',
          'focus:ring-red-500',
        ],
      },
      size: {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-4 py-2 text-base gap-2',
        lg: 'px-6 py-3 text-lg gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={props.disabled || isLoading}
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

export { Button, buttonVariants }
```

---

## 3. cn() Helper Function

### 3.1 Vấn đề với Tailwind Classes

```tsx
// Problem 1: Conditional classes messy
<div className={`px-4 ${isActive ? 'bg-blue-500' : ''} ${isDisabled ? 'opacity-50' : ''}`}>

// Problem 2: Conflicting classes không được resolve
<div className="p-4 p-2">  {/* Cả 2 đều apply! */}

// Problem 3: Override từ props
function Card({ className }) {
  return <div className={`p-4 ${className}`}>  {/* p-4 có thể bị override sai */}
}
<Card className="p-8" />  {/* Muốn p-8, nhưng p-4 vẫn còn */}
```

### 3.2 clsx - Conditional Classes

**clsx** giúp combine classes với conditions:

```tsx
import { clsx } from 'clsx'

// Basic usage
clsx('foo', 'bar')  // => 'foo bar'

// Conditional
clsx('base', isActive && 'active')  // => 'base active' or 'base'

// Object syntax
clsx({
  'bg-blue-500': isActive,
  'opacity-50': isDisabled,
  'cursor-pointer': !isDisabled,
})

// Mixed
clsx(
  'base-class',
  isActive && 'active-class',
  { 'conditional-class': condition },
  maybeClass,  // undefined/null/false sẽ bị ignore
)
```

### 3.3 tailwind-merge - Resolve Conflicts

**tailwind-merge** resolve conflicting Tailwind classes:

```tsx
import { twMerge } from 'tailwind-merge'

twMerge('p-4 p-2')          // => 'p-2' (last wins)
twMerge('px-4 p-2')         // => 'p-2' (p-2 overrides px-4)
twMerge('text-red-500 text-blue-500')  // => 'text-blue-500'

// Useful for props override
twMerge('p-4 rounded-lg', className)  // className có thể override
```

### 3.4 cn() - Best of Both

Combine clsx + tailwind-merge:

```tsx
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**

```tsx
import { cn } from '@/lib/utils'

// Conditional classes
<div className={cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class',
)}>

// Allow prop override
function Card({ className }) {
  return (
    <div className={cn(
      'p-4 rounded-lg bg-white',  // defaults
      className  // can override any of above
    )}>
  )
}

<Card className="p-8 bg-gray-100" />  // p-8 replaces p-4, bg-gray-100 replaces bg-white

// With CVA
<button className={cn(
  buttonVariants({ variant, size }),
  className  // Allow override
)}>
```

---

## 4. Production Optimization

### 4.1 Content Configuration (Tailwind v4)

Tailwind v4 sử dụng automatic content detection, nhưng bạn có thể configure trong CSS:

```css
/* src/index.css */
@import "tailwindcss";

/* Tailwind v4 auto-detects content từ project */
/* Không cần config content manually */
```

### 4.2 CSS Purging

Tailwind tự động remove unused classes trong production build:

```bash
# Development - Tất cả classes available
npm run dev

# Production - Chỉ classes được sử dụng
npm run build
```

### 4.3 Build Optimization Tips

```tsx
// 1. AVOID dynamic class names
// Bad - Không thể purge
const color = 'blue'
<div className={`bg-${color}-500`}>  // ❌ Will be purged!

// Good - Static class names
<div className={color === 'blue' ? 'bg-blue-500' : 'bg-red-500'}>  // ✅

// 2. USE safelist for truly dynamic classes (tailwind.config.js)
// Tailwind v4: Use @source directive in CSS
```

### 4.4 Performance Best Practices

```tsx
// 1. Prefer utility classes over custom CSS
// Tailwind utilities are optimized and shared

// 2. Use cn() to avoid duplicate classes
<div className={cn('p-4', className)}>  // Clean output

// 3. Group related variants
const styles = cva('base', {
  variants: {
    state: {
      default: 'bg-white border-gray-200',
      active: 'bg-brand-50 border-brand-500',
      error: 'bg-red-50 border-red-500',
    },
  },
})

// 4. Avoid inline style objects when possible
// Bad
<div style={{ padding: '16px' }}>
// Good
<div className="p-4">
```

---

## 5. Best Practices Summary

### Component Architecture

```tsx
// 1. Separate variants definition
// src/components/ui/Button.tsx
export const buttonVariants = cva(...)
export const Button = forwardRef(...)

// 2. Use cn() everywhere
className={cn(baseStyles, conditionalStyles, className)}

// 3. Forward refs for composability
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => ...)

// 4. Export both component and variants
export { Button, buttonVariants }
// Cho phép dùng variants ở nơi khác (links styled as buttons, etc.)
```

### File Structure

```
src/
├── lib/
│   └── utils.ts          # cn() helper
├── components/
│   └── ui/               # Primitive components
│       ├── Button.tsx    # With CVA
│       ├── Modal.tsx     # Headless UI Dialog
│       ├── Dropdown.tsx  # Headless UI Menu
│       └── index.ts      # Barrel export
```

### Accessibility Checklist

- ✅ Use Headless UI for interactive components
- ✅ Keyboard navigation works
- ✅ Focus states visible
- ✅ ARIA attributes present
- ✅ Color contrast sufficient
- ✅ Motion respects `prefers-reduced-motion`

---

## 6. Common Mistakes to Avoid

```tsx
// ❌ CVA - Calling as object instead of function
<button className={buttonVariants}>  // Wrong!
<button className={buttonVariants({ variant: 'primary' })}>  // ✅

// ❌ Missing Transition wrapper
<Dialog open={open}>  // No animation!
  <Dialog.Panel>...</Dialog.Panel>
</Dialog>

// ✅ With Transition
<Transition show={open}>
  <Dialog>
    <Dialog.Panel>...</Dialog.Panel>
  </Dialog>
</Transition>

// ❌ Dynamic class names
<div className={`bg-${color}-500`}>  // Will be purged!

// ✅ Static class names
<div className={color === 'blue' ? 'bg-blue-500' : 'bg-red-500'}>

// ❌ Not using cn() for overrides
<Button className={`${baseClass} ${props.className}`}>  // May have conflicts

// ✅ Using cn()
<Button className={cn(baseClass, props.className)}>  // Conflicts resolved
```

---

## Quick Reference

### CVA Pattern
```tsx
const variants = cva('base', {
  variants: { ... },
  compoundVariants: [ ... ],
  defaultVariants: { ... },
})
```

### cn() Usage
```tsx
cn('base', condition && 'conditional', className)
```

### Headless UI Dialog
```tsx
<Transition show={open}>
  <Dialog onClose={close}>
    <Transition.Child>backdrop</Transition.Child>
    <Transition.Child>
      <Dialog.Panel>content</Dialog.Panel>
    </Transition.Child>
  </Dialog>
</Transition>
```

### Headless UI Menu
```tsx
<Menu>
  <Menu.Button>trigger</Menu.Button>
  <Transition>
    <Menu.Items>
      <Menu.Item>{({ active }) => ...}</Menu.Item>
    </Menu.Items>
  </Transition>
</Menu>
```

---

**Tiếp theo:** Làm exercises để practice! 🚀
