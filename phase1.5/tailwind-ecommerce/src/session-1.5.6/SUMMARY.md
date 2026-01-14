# Session 1.5.6 Summary - Headless UI & Production

## Tổng quan

Session này tập trung vào việc xây dựng production-ready components với:
- **Headless UI** - Accessible, unstyled components
- **CVA** - Type-safe component variants
- **cn()** - Smart class merging
- **Production optimization**

---

## Checklist kiến thức

### 1. Headless UI

- [ ] Hiểu concept "headless" (unstyled, accessible)
- [ ] Sử dụng được `Dialog` component cho modals
- [ ] Sử dụng được `Menu` component cho dropdowns
- [ ] Sử dụng được `Transition` cho animations
- [ ] Hiểu cách kết hợp `Transition.Child` với Dialog/Menu
- [ ] Biết các props: `show`, `enter`, `enterFrom`, `enterTo`, `leave`, `leaveFrom`, `leaveTo`

### 2. CVA (class-variance-authority)

- [ ] Hiểu tại sao cần CVA (type-safety, maintainability)
- [ ] Tạo được variants với `cva()`
- [ ] Sử dụng `defaultVariants`
- [ ] Hiểu `compoundVariants` cho combined conditions
- [ ] Extract types với `VariantProps<typeof variants>`
- [ ] Integrate CVA với React components

### 3. cn() Helper

- [ ] Hiểu vấn đề với class concatenation
- [ ] Biết `clsx` xử lý conditional classes
- [ ] Biết `tailwind-merge` resolve conflicts
- [ ] Tạo được cn() = twMerge(clsx(...))
- [ ] Sử dụng cn() trong components

### 4. Production Optimization

- [ ] Hiểu CSS purging trong Tailwind
- [ ] Tránh dynamic class names
- [ ] Content configuration đúng

---

## Code Patterns

### CVA Button Pattern

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('base-classes', {
  variants: {
    variant: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  // ...
}

function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
```

### cn() Helper Pattern

```tsx
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage
cn('p-4', isActive && 'bg-blue-500', className)
```

### Headless UI Dialog Pattern

```tsx
<Transition show={open} as={Fragment}>
  <Dialog onClose={onClose}>
    <Transition.Child enter="..." enterFrom="..." enterTo="..." leave="..." leaveFrom="..." leaveTo="...">
      <div className="backdrop" />
    </Transition.Child>
    <Transition.Child enter="..." enterFrom="..." enterTo="..." leave="..." leaveFrom="..." leaveTo="...">
      <Dialog.Panel>
        <Dialog.Title>Title</Dialog.Title>
        <Dialog.Description>Description</Dialog.Description>
        {children}
      </Dialog.Panel>
    </Transition.Child>
  </Dialog>
</Transition>
```

### Headless UI Menu Pattern

```tsx
<Menu as="div" className="relative">
  <Menu.Button>Trigger</Menu.Button>
  <Transition enter="..." enterFrom="..." enterTo="..." leave="..." leaveFrom="..." leaveTo="...">
    <Menu.Items>
      <Menu.Item>
        {({ active }) => (
          <button className={cn(active && 'bg-brand-500 text-white')}>
            Item
          </button>
        )}
      </Menu.Item>
    </Menu.Items>
  </Transition>
</Menu>
```

---

## Files đã tạo

### Components

| File | Mô tả |
|------|-------|
| `src/lib/utils.ts` | cn() helper function |
| `src/components/ui/Button.tsx` | Button with CVA variants |
| `src/components/ui/Modal.tsx` | Headless UI Dialog wrapper |
| `src/components/ui/Dropdown.tsx` | Headless UI Menu wrapper |
| `src/components/ui/CartDrawer.tsx` | Slide-in cart drawer |

### Exercises

| File | Thời gian | Mô tả |
|------|-----------|-------|
| `Micro1-CVAButton.tsx` | 5 phút | Tạo button variants với CVA |
| `Micro2-CNHelper.tsx` | 5 phút | Tạo cn() helper |
| `Mini-Modal.tsx` | 20 phút | Quick View modal với Headless UI |
| `Real-Ecommerce.tsx` | 60 phút | Complete e-commerce với tất cả features |

---

## Dependencies đã cài

```bash
npm install @headlessui/react class-variance-authority clsx tailwind-merge
```

---

## Common Mistakes

1. **CVA - Gọi như object thay vì function**
   ```tsx
   // ❌ Wrong
   <button className={buttonVariants}>

   // ✅ Correct
   <button className={buttonVariants({ variant: 'primary' })}>
   ```

2. **Missing Transition wrapper**
   ```tsx
   // ❌ No animation
   <Dialog open={open}>

   // ✅ With animation
   <Transition show={open}>
     <Dialog>
   ```

3. **Dynamic class names bị purge**
   ```tsx
   // ❌ Will be purged
   <div className={`bg-${color}-500`}>

   // ✅ Static classes
   <div className={color === 'blue' ? 'bg-blue-500' : 'bg-red-500'}>
   ```

4. **Không dùng cn() cho overrides**
   ```tsx
   // ❌ May have conflicts
   <button className={`${base} ${className}`}>

   // ✅ Conflicts resolved
   <button className={cn(base, className)}>
   ```

---

## Tiếp theo

- **Session 1.5.R**: Review & Polish
- Hoàn thiện E-commerce project
- Chuẩn bị cho Phase 2

---

**Completed:** ⬜ Chưa hoàn thành | ✅ Đã hoàn thành

- [ ] Đọc THEORY.md
- [ ] Hoàn thành Micro 1 (CVA Button)
- [ ] Hoàn thành Micro 2 (cn() Helper)
- [ ] Hoàn thành Mini (Modal)
- [ ] Hoàn thành Real (E-commerce)
- [ ] Làm Quiz (>= 8/10)
