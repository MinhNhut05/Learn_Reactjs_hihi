# Session 1.5.6 - Hướng dẫn làm bài tập chi tiết

## Tổng quan

| Bài | Tên | Thời gian | Độ khó |
|-----|-----|-----------|--------|
| Micro 1 | CVA Button | 5 phút | ⭐ |
| Micro 2 | cn() Helper | 5 phút | ⭐ |
| Mini | Quick View Modal | 20 phút | ⭐⭐ |
| Real | E-commerce Complete | 60 phút | ⭐⭐⭐ |

---

## Micro 1: CVA Button (5 phút) ✅

**Đã hoàn thành** - Xem file `exercises/Micro1-CVAButton.tsx`

---

## Micro 2: cn() Helper (5 phút) ✅

**Đã hoàn thành** - Xem file `exercises/Micro2-CNHelper.tsx`

---

## Mini: Quick View Modal (20 phút)

### Mục tiêu
Tạo modal "Quick View" cho product sử dụng Headless UI Dialog với animations.

### Yêu cầu chi tiết

#### 1. Import Headless UI
```tsx
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
```

#### 2. Cấu trúc Modal cơ bản
```
<Transition show={open}>
  <Dialog onClose={onClose}>
    ├── <Transition.Child> → Backdrop (overlay mờ)
    └── <div> Container centering
        └── <Transition.Child> → Panel (nội dung modal)
            └── <Dialog.Panel> → Content wrapper
                ├── Close button (góc phải)
                ├── Product image
                ├── Product info (name, price, description)
                └── Add to Cart button
```

#### 3. Animations cần có

**Backdrop:**
```tsx
<Transition.Child
  enter="ease-out duration-300"
  enterFrom="opacity-0"
  enterTo="opacity-100"
  leave="ease-in duration-200"
  leaveFrom="opacity-100"
  leaveTo="opacity-0"
>
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
</Transition.Child>
```

**Panel (scale + fade):**
```tsx
<Transition.Child
  enter="ease-out duration-300"
  enterFrom="opacity-0 scale-95"
  enterTo="opacity-100 scale-100"
  leave="ease-in duration-200"
  leaveFrom="opacity-100 scale-100"
  leaveTo="opacity-0 scale-95"
>
  <Dialog.Panel>...</Dialog.Panel>
</Transition.Child>
```

### Checklist

- [ ] Import `Dialog`, `Transition` từ `@headlessui/react`
- [ ] Wrap toàn bộ với `<Transition show={open}>`
- [ ] `<Dialog onClose={onClose}>` để click outside đóng
- [ ] Backdrop với `Transition.Child` (fade animation)
- [ ] Panel với `Transition.Child` (scale + fade animation)
- [ ] Close button ở góc phải
- [ ] Hiển thị product: image, name, price, description
- [ ] Add to Cart button

### Gợi ý từng bước

**Bước 1:** Thay thế `{isOpen && (...)}` bằng `<Transition show={open}>`

**Bước 2:** Wrap content với `<Dialog onClose={onClose}>`

**Bước 3:** Tách backdrop và panel thành 2 `Transition.Child` riêng

**Bước 4:** Thêm animation classes cho mỗi Transition.Child

**Bước 5:** Đảm bảo Panel có `className="fixed inset-0 flex items-center justify-center"`

### Code mẫu khung

```tsx
function QuickViewModal({ open, onClose, product }) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
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
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        {/* Container để center modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* Panel với animation */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
              {/* TODO: Thêm close button */}
              {/* TODO: Thêm product content */}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
```

---

## Real: E-commerce Complete (60 phút)

### Mục tiêu
Hoàn thiện E-commerce với tất cả production-ready features.

### Yêu cầu chi tiết

#### 1. Header với User Dropdown

**Cần làm:**
- Logo + Navigation links
- Search bar (optional)
- User dropdown menu (Headless UI Menu)
- Cart icon với badge số lượng

**Code mẫu User Dropdown:**
```tsx
import { Menu, Transition } from '@headlessui/react'

<Menu as="div" className="relative">
  <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
    <UserIcon />
    <span>Account</span>
    <ChevronDownIcon />
  </Menu.Button>

  <Transition
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
      <Menu.Item>
        {({ active }) => (
          <button className={cn(
            'w-full px-3 py-2 text-left text-sm',
            active && 'bg-brand-500 text-white'
          )}>
            Profile
          </button>
        )}
      </Menu.Item>
      {/* More items... */}
    </Menu.Items>
  </Transition>
</Menu>
```

#### 2. Filter Dropdown

**Cần làm:**
- Dropdown chọn category
- Có thể dùng `Menu` hoặc `Listbox` từ Headless UI

**Code mẫu:**
```tsx
<Menu as="div" className="relative">
  <Menu.Button className="px-4 py-2 border rounded-lg">
    Category: {selectedCategory}
  </Menu.Button>
  <Menu.Items className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg">
    {categories.map((cat) => (
      <Menu.Item key={cat}>
        {({ active }) => (
          <button
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'w-full px-3 py-2 text-left',
              active && 'bg-brand-500 text-white'
            )}
          >
            {cat}
          </button>
        )}
      </Menu.Item>
    ))}
  </Menu.Items>
</Menu>
```

#### 3. Product Card với Quick View

**Cần làm:**
- Hover effect trên image
- "Quick View" button xuất hiện khi hover
- Click mở Modal

**Code mẫu:**
```tsx
<div className="group relative">
  <div className="relative overflow-hidden">
    <img className="group-hover:scale-105 transition-transform duration-300" />

    {/* Quick View button - ẩn, hiện khi hover */}
    <button
      onClick={onQuickView}
      className="absolute bottom-4 left-1/2 -translate-x-1/2
                 opacity-0 group-hover:opacity-100
                 transition-opacity duration-200"
    >
      Quick View
    </button>
  </div>
</div>
```

#### 4. Cart Drawer (Slide-in từ phải)

**Cần làm:**
- Slide animation từ phải
- List cart items với quantity controls
- Remove item button
- Subtotal
- Checkout button

**Animation cho slide:**
```tsx
<Transition.Child
  enter="transform transition ease-out duration-300"
  enterFrom="translate-x-full"
  enterTo="translate-x-0"
  leave="transform transition ease-in duration-200"
  leaveFrom="translate-x-0"
  leaveTo="translate-x-full"
>
  <Dialog.Panel className="fixed right-0 top-0 h-full w-full max-w-md bg-white">
    {/* Cart content */}
  </Dialog.Panel>
</Transition.Child>
```

#### 5. Sử dụng CVA cho Buttons

**Thay thế tất cả buttons:**
```tsx
// Trước
<button className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600">

// Sau
<Button variant="primary" size="md">
```

### Checklist tổng hợp

**Header:**
- [ ] Logo
- [ ] Navigation (Products, Categories, Deals)
- [ ] User dropdown (Menu từ Headless UI)
- [ ] Cart icon với badge

**Products:**
- [ ] Filter dropdown (category)
- [ ] Product grid responsive
- [ ] Product card với hover effects
- [ ] Quick View button on hover

**Modals:**
- [ ] Quick View modal (Headless UI Dialog)
- [ ] Smooth animations (fade + scale)
- [ ] Click outside to close
- [ ] ESC to close

**Cart Drawer:**
- [ ] Slide-in từ phải
- [ ] List items với image, name, price
- [ ] Quantity controls (+/-)
- [ ] Remove item
- [ ] Subtotal calculation
- [ ] Checkout button

**Technical:**
- [ ] Tất cả buttons dùng CVA hoặc Button component
- [ ] Sử dụng cn() cho conditional classes
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Dark mode classes (optional)

### Thứ tự làm đề xuất

1. **Header** (15 phút)
   - Tạo layout header
   - Thêm User dropdown với Menu

2. **Filter** (5 phút)
   - Thay select bằng Menu dropdown

3. **Product Card** (10 phút)
   - Thêm hover effects
   - Quick View button

4. **Quick View Modal** (15 phút)
   - Convert sang Headless UI Dialog
   - Thêm animations

5. **Cart Drawer** (15 phút)
   - Convert sang Headless UI Dialog
   - Slide animation

---

## Tips chung

### Import cần thiết
```tsx
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../../components/ui/Button' // hoặc tự tạo với CVA
```

### Pattern hay dùng

**1. Dropdown item với active state:**
```tsx
<Menu.Item>
  {({ active }) => (
    <button className={cn(
      'base-classes',
      active && 'active-classes'
    )}>
      Label
    </button>
  )}
</Menu.Item>
```

**2. Transition wrapper:**
```tsx
<Transition
  as={Fragment}
  enter="transition ease-out duration-100"
  enterFrom="transform opacity-0 scale-95"
  enterTo="transform opacity-100 scale-100"
  leave="transition ease-in duration-75"
  leaveFrom="transform opacity-100 scale-100"
  leaveTo="transform opacity-0 scale-95"
>
  {/* Content */}
</Transition>
```

**3. Modal với backdrop riêng:**
```tsx
<Transition show={open}>
  <Dialog>
    <Transition.Child>{/* Backdrop */}</Transition.Child>
    <Transition.Child>{/* Panel */}</Transition.Child>
  </Dialog>
</Transition>
```

---

## Khi gặp khó khăn

1. **Modal không có animation:** Kiểm tra đã wrap với `<Transition show={open}>` chưa
2. **Click outside không đóng:** Đảm bảo `<Dialog onClose={onClose}>` đúng
3. **Dropdown không hiển thị:** Check `position: relative` trên parent
4. **Animation không smooth:** Kiểm tra `as={Fragment}` và transition classes

---

**Chúc bạn hoàn thành tốt! 🚀**
