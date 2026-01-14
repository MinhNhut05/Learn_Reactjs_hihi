# Session 1.5.6 Quiz - Headless UI & Production

**Thời gian:** 15-20 phút
**Pass Score:** >= 8/10 (80%)

---

## Câu 1: CVA là gì?

**A)** CSS Variable Authority - Quản lý CSS variables
**B)** Class Variance Authority - Quản lý variant classes type-safe
**C)** Component Version API - API versioning cho components
**D)** Custom Validation Attribute - Validate form inputs

<details>
<summary>Đáp án</summary>

**B) Class Variance Authority - Quản lý variant classes type-safe**

CVA (class-variance-authority) là thư viện giúp định nghĩa và quản lý component variants với TypeScript support.

</details>

---

## Câu 2: Cách đúng để gọi CVA variants?

```tsx
const buttonVariants = cva('base', { variants: { size: { sm: '...', lg: '...' } } })
```

**A)** `<button className={buttonVariants}>`
**B)** `<button className={buttonVariants.size.sm}>`
**C)** `<button className={buttonVariants({ size: 'sm' })}>`
**D)** `<button className={buttonVariants['sm']}>`

<details>
<summary>Đáp án</summary>

**C) `<button className={buttonVariants({ size: 'sm' })}>`**

`buttonVariants` là một function, cần gọi với object chứa variant options.

</details>

---

## Câu 3: cn() helper kết hợp những gì?

**A)** classnames + tailwind
**B)** clsx + tailwind-merge
**C)** className + css-modules
**D)** css + sass

<details>
<summary>Đáp án</summary>

**B) clsx + tailwind-merge**

- `clsx` xử lý conditional classes
- `tailwind-merge` resolve conflicting Tailwind classes

</details>

---

## Câu 4: Kết quả của `twMerge('p-4', 'p-8')` là gì?

**A)** `'p-4 p-8'`
**B)** `'p-4'`
**C)** `'p-8'`
**D)** `''`

<details>
<summary>Đáp án</summary>

**C) `'p-8'`**

`tailwind-merge` resolve conflicts, class cuối cùng (p-8) sẽ thắng.

</details>

---

## Câu 5: Trong Headless UI, để thêm animation cho Dialog cần dùng component nào?

**A)** `Animation`
**B)** `Motion`
**C)** `Transition`
**D)** `Animate`

<details>
<summary>Đáp án</summary>

**C) `Transition`**

```tsx
<Transition show={open}>
  <Dialog>...</Dialog>
</Transition>
```

</details>

---

## Câu 6: Transition.Child dùng props nào để định nghĩa animation khi mở?

**A)** `open`, `openFrom`, `openTo`
**B)** `enter`, `enterFrom`, `enterTo`
**C)** `show`, `showFrom`, `showTo`
**D)** `animate`, `from`, `to`

<details>
<summary>Đáp án</summary>

**B) `enter`, `enterFrom`, `enterTo`**

```tsx
<Transition.Child
  enter="ease-out duration-300"
  enterFrom="opacity-0"
  enterTo="opacity-100"
  leave="ease-in duration-200"
  leaveFrom="opacity-100"
  leaveTo="opacity-0"
>
```

</details>

---

## Câu 7: Menu.Item render prop trả về object với property nào?

**A)** `{ hover, focus }`
**B)** `{ active, disabled }`
**C)** `{ selected, highlighted }`
**D)** `{ open, close }`

<details>
<summary>Đáp án</summary>

**B) `{ active, disabled }`**

```tsx
<Menu.Item>
  {({ active, disabled }) => (
    <button className={active ? 'bg-blue-500' : ''}>
      Item
    </button>
  )}
</Menu.Item>
```

</details>

---

## Câu 8: Tại sao dynamic class names bị purge trong production?

```tsx
const color = 'blue'
<div className={`bg-${color}-500`}>  // Bị purge!
```

**A)** Tailwind không hỗ trợ template literals
**B)** Tailwind scanner không thể detect class names động
**C)** JavaScript không cho phép string interpolation
**D)** CSS không hỗ trợ dynamic values

<details>
<summary>Đáp án</summary>

**B) Tailwind scanner không thể detect class names động**

Tailwind scanner tìm complete class names trong code. `bg-${color}-500` không match pattern `bg-blue-500`, nên class này bị purge.

**Solution:**
```tsx
<div className={color === 'blue' ? 'bg-blue-500' : 'bg-red-500'}>
```

</details>

---

## Câu 9: VariantProps trong CVA dùng để làm gì?

**A)** Validate props at runtime
**B)** Extract TypeScript types từ variants definition
**C)** Create CSS variables
**D)** Generate documentation

<details>
<summary>Đáp án</summary>

**B) Extract TypeScript types từ variants definition**

```tsx
type ButtonProps = VariantProps<typeof buttonVariants>
// => { variant?: 'primary' | 'secondary', size?: 'sm' | 'md' | 'lg' }
```

</details>

---

## Câu 10: Headless UI components có đặc điểm gì?

**A)** Có sẵn styles đẹp, chỉ cần import
**B)** Unstyled, accessible, cần tự style với Tailwind
**C)** Chỉ hoạt động với CSS modules
**D)** Yêu cầu Redux để quản lý state

<details>
<summary>Đáp án</summary>

**B) Unstyled, accessible, cần tự style với Tailwind**

Headless UI cung cấp:
- ❌ Không có styles mặc định
- ✅ Accessible by default (ARIA, keyboard)
- ✅ Bạn tự style với Tailwind CSS
- ✅ Focus management, transitions

</details>

---

## Câu 11: compoundVariants trong CVA dùng khi nào?

**A)** Khi cần combine multiple CSS files
**B)** Khi cần thêm classes khi NHIỀU variants cùng match
**C)** Khi cần nested variants
**D)** Khi cần async loading variants

<details>
<summary>Đáp án</summary>

**B) Khi cần thêm classes khi NHIỀU variants cùng match**

```tsx
compoundVariants: [
  {
    variant: 'danger',
    size: 'lg',
    className: 'font-bold uppercase', // Thêm khi cả danger VÀ lg
  },
]
```

</details>

---

## Câu 12: Cách nào đúng để allow className override trong component?

**A)**
```tsx
<button className={`${baseClass} ${className}`}>
```

**B)**
```tsx
<button className={cn(baseClass, className)}>
```

**C)**
```tsx
<button className={baseClass + className}>
```

**D)**
```tsx
<button className={[baseClass, className]}>
```

<details>
<summary>Đáp án</summary>

**B) `<button className={cn(baseClass, className)}>`**

cn() sẽ:
1. Merge các classes
2. Resolve conflicts (className có thể override baseClass)
3. Handle conditionals

</details>

---

## Kết quả

| Điểm | Đánh giá |
|------|----------|
| 12/12 | Xuất sắc! Master Headless UI & CVA |
| 10-11 | Rất tốt! Hiểu rõ các concepts |
| 8-9 | Đạt! Có thể tiếp tục |
| 6-7 | Cần ôn lại một số phần |
| < 6 | Cần đọc lại Theory và làm lại exercises |

---

## Tổng kết

Nếu bạn đạt **>= 8/12 (67%)**, bạn đã sẵn sàng cho Session 1.5.R!

Các concepts quan trọng cần nhớ:
1. **CVA** = Type-safe variants
2. **cn()** = clsx + tailwind-merge
3. **Headless UI** = Unstyled + Accessible
4. **Transition** = Animations for Dialog/Menu
5. **Static classes** = Avoid purging
