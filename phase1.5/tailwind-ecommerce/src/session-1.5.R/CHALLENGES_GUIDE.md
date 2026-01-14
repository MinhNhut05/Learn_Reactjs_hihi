# Session 1.5.R - Challenges Guide

## Overview

| Challenge | Thời gian | Độ khó | Mục tiêu |
|-----------|-----------|--------|----------|
| 1. ProductCard | 20 phút | Medium | Rebuild từ đầu |
| 2. Testimonial | 20 phút | Medium | Build component mới |
| 3. Debug | 20 phút | Hard | Fix responsive issues |

---

# Challenge 1: Rebuild ProductCard

## Yêu cầu
Rebuild lại ProductCard **không xem code cũ**.

## Cấu trúc HTML

```
Card Container
├── Image Section
│   ├── Product Image (hover zoom)
│   └── Badge (Sale/New)
└── Content Section
    ├── Product Name
    ├── Price (current + original)
    ├── Star Rating
    └── Add to Cart Button
```

## Chi tiết từng phần

### 1. Card Container
```
Cần có:
- group          → cho hover effects con
- rounded-lg     → bo góc
- shadow-md      → đổ bóng
- overflow-hidden→ ẩn phần thừa khi zoom image
- bg-white       → nền trắng
- dark:bg-gray-800 → dark mode
```

### 2. Image Wrapper
```
Cần có:
- relative       → để position badge absolute
- overflow-hidden→ ẩn phần zoom ra ngoài
```

### 3. Product Image
```
Cần có:
- w-full         → full width
- aspect-square  → tỉ lệ 1:1
- object-cover   → crop ảnh đẹp
- transition-transform → smooth animation
- duration-300   → 300ms
- group-hover:scale-110 → zoom khi hover card
```

### 4. Badge (Sale/New)
```
Cần có:
- absolute       → position tuyệt đối
- top-2 right-2  → góc trên phải
- px-2 py-1      → padding
- rounded-full   → bo tròn
- text-xs        → chữ nhỏ
- font-medium    → độ đậm vừa
- text-white     → chữ trắng

Màu theo loại:
- Sale: bg-red-500
- New: bg-green-500
```

### 5. Content Section
```
Cần có:
- p-4            → padding 16px
```

### 6. Product Name
```
Cần có:
- font-semibold  → chữ đậm
- text-gray-800  → màu chữ
- dark:text-white→ dark mode
- truncate       → cắt text dài (hoặc line-clamp-2)
```

### 7. Price Row
```
Container:
- flex items-center gap-2 mt-2

Current Price:
- text-lg font-bold text-gray-900 dark:text-white

Original Price:
- text-sm text-gray-500 line-through
```

### 8. Star Rating
```
Cần có:
- flex gap-1     → layout stars
- mt-2           → margin top
- text-yellow-400→ màu vàng

Stars: ★ (filled) và ☆ (empty)
```

### 9. Add to Cart Button
```
Cần có:
- w-full         → full width
- mt-4           → margin top
- py-2           → padding vertical
- rounded-lg     → bo góc
- bg-blue-500    → màu nền
- text-white     → chữ trắng
- font-medium    → độ đậm
- transition     → smooth
- hover:bg-blue-600  → hover state
- active:bg-blue-700 → click state
```

---

# Challenge 2: Testimonial Card

## Yêu cầu
Tạo component **hoàn toàn mới** - chưa từng làm trước đó.

## Cấu trúc HTML

```
Card Container
├── Quote Icon (")
├── Quote Text (italic)
├── Star Rating
└── Author Section
    ├── Avatar (rounded)
    ├── Name
    └── Title & Company
```

## Chi tiết từng phần

### 1. Card Container
```
Cần có:
- bg-white dark:bg-gray-800    → background
- rounded-xl                    → bo góc lớn
- shadow-md                     → đổ bóng
- p-6                          → padding
- transition-all duration-300   → smooth animation
- hover:shadow-xl              → shadow lớn hơn khi hover
- hover:-translate-y-1         → nhấc lên khi hover
```

### 2. Quote Icon
```
Cần có:
- text-4xl hoặc text-5xl       → size lớn
- text-gray-200 dark:text-gray-700 → màu nhạt
- font-serif                   → font có chân
- leading-none                 → không line height

Ký tự: " hoặc dùng SVG
```

### 3. Quote Text
```
Cần có:
- text-gray-600 dark:text-gray-300 → màu chữ
- italic                       → in nghiêng
- mt-2                         → margin top
- leading-relaxed              → line height thoáng
```

### 4. Star Rating
```
Cần có:
- flex gap-1                   → layout
- mt-4                         → margin top
- text-yellow-400              → màu vàng

Logic: Hiển thị ★ cho filled, ☆ cho empty
```

### 5. Author Section
```
Container:
- flex items-center gap-3 mt-4 → layout horizontal

Avatar:
- w-12 h-12                    → size 48px
- rounded-full                 → tròn
- object-cover                 → crop đẹp

Name:
- font-semibold text-gray-800 dark:text-white

Title:
- text-sm text-gray-500 dark:text-gray-400
```

## Layout Options

### Option A: Quote trên, Author dưới (Vertical)
```jsx
<div className="card">
  <div className="quote-icon">"</div>
  <p className="quote-text">...</p>
  <div className="stars">★★★★☆</div>
  <div className="author">
    <img className="avatar" />
    <div>
      <p className="name">Name</p>
      <p className="title">Title, Company</p>
    </div>
  </div>
</div>
```

### Option B: Avatar bên trái (Horizontal)
```jsx
<div className="card">
  <div className="flex gap-4">
    <img className="avatar" />
    <div>
      <div className="quote-icon">"</div>
      <p className="quote-text">...</p>
      <div className="stars">★★★★☆</div>
      <p className="name">Name</p>
      <p className="title">Title</p>
    </div>
  </div>
</div>
```

---

# Challenge 3: Debug Responsive

## Yêu cầu
Tìm và sửa **tất cả lỗi responsive** trong component Team Section.

## Danh sách lỗi cần tìm

### Lỗi 1: Fixed width gây horizontal scroll
```
❌ SAI:  style={{ width: '400px' }}
✅ ĐÚNG: className="w-full max-w-sm" hoặc không cần width
```

### Lỗi 2: Image dimensions cố định
```
❌ SAI:  style={{ width: '150px', height: '150px' }}
✅ ĐÚNG: className="w-24 h-24 md:w-32 md:h-32"
```

### Lỗi 3: Font size quá nhỏ (inline styles)
```
❌ SAI:  style={{ fontSize: '10px' }}
✅ ĐÚNG: className="text-sm" (14px) hoặc "text-base" (16px)
```

### Lỗi 4: Line height không tốt
```
❌ SAI:  style={{ lineHeight: '1.2' }}
✅ ĐÚNG: className="leading-relaxed" hoặc "leading-normal"
```

### Lỗi 5: Buttons quá gần nhau
```
❌ SAI:  style={{ gap: '2px', padding: '4px 6px' }}
✅ ĐÚNG: className="gap-2 md:gap-3" và "px-3 py-1.5"
```

### Lỗi 6: Grid không responsive
```
❌ SAI:  style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
✅ ĐÚNG: className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
```

### Lỗi 7: Heading không responsive
```
❌ SAI:  style={{ fontSize: '24px' }}
✅ ĐÚNG: className="text-2xl md:text-3xl lg:text-4xl"
```

### Lỗi 8: Thiếu dark mode
```
❌ SAI:  className="bg-white text-gray-900"
✅ ĐÚNG: className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
```

### Lỗi 9: Thiếu container max-width
```
❌ SAI:  <div>content</div>
✅ ĐÚNG: <div className="max-w-7xl mx-auto px-4">content</div>
```

### Lỗi 10: Padding không responsive
```
❌ SAI:  className="p-6"
✅ ĐÚNG: className="p-4 md:p-6"
```

## Quy tắc sửa lỗi

### 1. Loại bỏ tất cả inline styles
```jsx
// ❌ KHÔNG dùng
style={{ width: '400px', fontSize: '14px' }}

// ✅ Dùng Tailwind classes
className="w-full text-sm"
```

### 2. Mobile-first approach
```jsx
// Base = mobile, thêm breakpoints cho màn hình lớn
className="text-sm md:text-base lg:text-lg"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
className="p-4 md:p-6 lg:p-8"
```

### 3. Responsive sizing
```jsx
// Images
className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"

// Text
className="text-base md:text-lg"

// Spacing
className="gap-4 md:gap-6"
```

### 4. Dark mode cho mọi element
```jsx
// Background
className="bg-white dark:bg-gray-800"

// Text
className="text-gray-900 dark:text-white"
className="text-gray-600 dark:text-gray-300"

// Border
className="border-gray-200 dark:border-gray-700"
```

---

# Tailwind Cheatsheet

## Spacing
| Class | Value |
|-------|-------|
| p-1 | 4px |
| p-2 | 8px |
| p-4 | 16px |
| p-6 | 24px |
| p-8 | 32px |

## Font Size
| Class | Size |
|-------|------|
| text-xs | 12px |
| text-sm | 14px |
| text-base | 16px |
| text-lg | 18px |
| text-xl | 20px |
| text-2xl | 24px |

## Breakpoints
| Prefix | Min-width |
|--------|-----------|
| sm: | 640px |
| md: | 768px |
| lg: | 1024px |
| xl: | 1280px |

## Common Patterns

### Card
```
rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800
```

### Button
```
px-4 py-2 rounded-lg bg-blue-500 text-white font-medium
hover:bg-blue-600 active:bg-blue-700 transition
```

### Image
```
w-full aspect-square object-cover
```

### Flex Center
```
flex items-center justify-center
```

### Grid Responsive
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

---

# Evaluation Checklist

## Challenge 1: ProductCard
- [ ] Component renders correctly
- [ ] Responsive on mobile/desktop
- [ ] Hover effects smooth (image zoom, button)
- [ ] Dark mode works
- [ ] Code clean (no inline styles)

## Challenge 2: Testimonial Card
- [ ] Design looks professional
- [ ] All elements styled correctly
- [ ] Hover effects present
- [ ] Responsive
- [ ] Reusable component

## Challenge 3: Debug
- [ ] All inline styles removed
- [ ] No horizontal scroll on mobile
- [ ] Text readable (min 14px)
- [ ] Grid responsive (1→2→4 cols)
- [ ] Images scale properly
- [ ] Dark mode added
- [ ] Works on 320px+ screens

---

**Good luck! Gửi code khi hoàn thành để được review.**
