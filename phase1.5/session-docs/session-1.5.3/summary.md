# Session 1.5.3 - Responsive Design - Summary Checklist

## 📚 Concepts Mastered

### Mobile-First Philosophy
- [ ] Hiểu mobile-first approach
- [ ] Biết tại sao mobile-first quan trọng
- [ ] Đọc được responsive classes từ trái qua phải
- [ ] Hiểu cách Tailwind áp dụng mobile-first

### Breakpoints System
- [ ] Nhớ được 6 breakpoints: (none), sm, md, lg, xl, 2xl
- [ ] Nhớ được min-width của từng breakpoint:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
- [ ] Biết breakpoint nào target device nào
- [ ] Hiểu syntax `{breakpoint}:{utility}`

### Responsive Patterns
- [ ] **Show/Hide Pattern:**
  - `hidden md:block` - hide mobile, show desktop
  - `block md:hidden` - show mobile, hide desktop
  - `hidden md:flex` - hide mobile, flex desktop
- [ ] **Stacking Pattern:**
  - `flex flex-col md:flex-row` - vertical mobile, horizontal desktop
- [ ] **Responsive Grid:**
  - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- [ ] **Responsive Spacing:**
  - `p-4 md:p-6 lg:p-8`
  - `gap-4 md:gap-6`
- [ ] **Responsive Width:**
  - `w-full md:w-1/2 lg:w-1/3`
- [ ] **Responsive Order:**
  - `order-1 md:order-2`

### Container & Max-Width
- [ ] Sử dụng `container mx-auto`
- [ ] Biết khi nào dùng `max-w-{size}`
- [ ] Hiểu difference giữa container và max-w
- [ ] Áp dụng responsive padding cho container

### Responsive Typography
- [ ] Scale font size: `text-sm md:text-base lg:text-lg`
- [ ] Adjust line height: `leading-relaxed md:leading-loose`
- [ ] Responsive tracking: `tracking-tight lg:tracking-tighter`
- [ ] Không overuse breakpoints cho text

### Responsive Images
- [ ] `w-full h-auto` cho responsive images
- [ ] Sử dụng `object-cover` và `object-contain`
- [ ] Responsive aspect ratio
- [ ] Show/hide different images per breakpoint

---

## 🛠️ Practical Skills

### Testing Responsive Designs
- [ ] Mở Chrome DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test các common widths: 375px, 768px, 1024px, 1280px
- [ ] Test cả portrait và landscape
- [ ] Check trên real device khi có thể

### Common Responsive Components

#### ✅ Responsive Header
```jsx
<header>
  {/* Logo - always visible */}
  {/* Search - hidden md:block */}
  {/* Hamburger - block lg:hidden */}
  {/* Nav - hidden lg:flex */}
</header>
```

#### ✅ Responsive Product Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

#### ✅ Responsive Card
```jsx
<div className="flex flex-col md:flex-row gap-4">
  <img className="w-full md:w-48" />
  <div className="flex-1">...</div>
</div>
```

#### ✅ Responsive Sidebar Layout
```jsx
<div className="flex gap-6">
  <aside className="hidden lg:block w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

---

## ⚠️ Common Mistakes to Avoid

- [ ] ❌ Quên set base style (chỉ dùng `md:block` thay vì `hidden md:block`)
- [ ] ❌ Dùng quá nhiều breakpoints không cần thiết
- [ ] ❌ Sử dụng `flex-1` mà không có flex parent
- [ ] ❌ Sử dụng `grid-cols-3` mà không có grid parent
- [ ] ❌ Dùng desktop-first thay vì mobile-first
- [ ] ❌ Quên test trên nhiều screen sizes
- [ ] ❌ Hardcode pixel values thay vì dùng responsive utilities

---

## ✅ Best Practices Checklist

### Mobile-First Development
- [ ] Luôn bắt đầu với mobile styles (no prefix)
- [ ] Progressively enhance lên desktop
- [ ] Chỉ thêm breakpoint khi cần thiết
- [ ] Ưu tiên 2-3 breakpoints chính (thường md và lg)

### Layout Patterns
- [ ] Sử dụng flex/grid cho layout
- [ ] Thêm `gap` thay vì margin giữa items
- [ ] Sử dụng `max-w-*` để giới hạn content width
- [ ] Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Show/Hide Strategically
- [ ] Luôn set base display value
- [ ] Dùng appropriate display type (block, flex, grid, inline)
- [ ] Ẩn content không quan trọng trên mobile
- [ ] Hiện full features trên desktop

### Testing Workflow
- [ ] Develop mobile-first trong DevTools
- [ ] Test tất cả breakpoints
- [ ] Check overflow và scroll
- [ ] Verify touch targets trên mobile (min 44x44px)
- [ ] Test trên real devices

---

## 📝 Code Snippets to Remember

### Show/Hide
```jsx
// Mobile only
className="block md:hidden"

// Desktop only
className="hidden md:block"

// Tablet and up
className="hidden md:flex"
```

### Responsive Grid
```jsx
// 1 → 2 → 3 → 4 columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
```

### Responsive Text
```jsx
// Heading
className="text-2xl md:text-3xl lg:text-5xl font-bold"

// Body
className="text-sm md:text-base leading-relaxed"
```

### Responsive Spacing
```jsx
// Padding
className="p-4 md:p-6 lg:p-8"

// Container
className="container mx-auto px-4 sm:px-6 lg:px-8"
```

### Flex Direction
```jsx
// Stack mobile, row desktop
className="flex flex-col md:flex-row gap-4"
```

---

## 🎯 Exercise Completion Checklist

### Micro Exercises
- [ ] Micro 1: Responsive Text
  - [ ] Text size scales with breakpoints
  - [ ] Line height responsive
  - [ ] Readable on all screens
- [ ] Micro 2: Show/Hide Pattern
  - [ ] Hamburger visible mobile only
  - [ ] Nav visible desktop only
  - [ ] Correct display types used

### Mini Exercise
- [ ] Responsive ProductCard
  - [ ] Vertical layout mobile (flex-col)
  - [ ] Horizontal layout desktop (md:flex-row)
  - [ ] Image sizing responsive
  - [ ] Padding scales appropriately

### Real Exercise
- [ ] Responsive E-commerce Homepage
  - [ ] Header responsive (search, hamburger, nav)
  - [ ] Filter button visible on mobile/tablet
  - [ ] Sidebar hidden until desktop (lg+)
  - [ ] Product grid: 1 → 2 → 3 columns
  - [ ] All spacing responsive
  - [ ] No horizontal scroll on any breakpoint

---

## 🔍 Self-Assessment

**Beginner Level** (Complete these first):
- [ ] Biết 6 breakpoints và min-width của chúng
- [ ] Viết được `hidden md:block` và `block md:hidden`
- [ ] Tạo responsive grid 1 → 2 → 3 columns
- [ ] Scale text size với breakpoints

**Intermediate Level**:
- [ ] Tạo responsive card với flex direction switching
- [ ] Implement responsive navigation (hamburger + full nav)
- [ ] Sử dụng container và max-width correctly
- [ ] Combine multiple responsive utilities

**Advanced Level**:
- [ ] Build complete responsive homepage layout
- [ ] Responsive sidebar với mobile drawer pattern
- [ ] Optimize spacing và sizing cho tất cả breakpoints
- [ ] Không cần nhìn docs, code responsive fluently

---

## 📖 Quick Reference

### Breakpoints
```
     sm      md      lg      xl      2xl
     640     768     1024    1280    1536  (px)
```

### Pattern Templates
```jsx
// Navigation
<nav className="hidden lg:flex gap-6">...</nav>
<button className="block lg:hidden">☰</button>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Card
<div className="flex flex-col md:flex-row gap-4">

// Sidebar Layout
<div className="flex gap-6">
  <aside className="hidden lg:block w-64">...</aside>
  <main className="flex-1">...</main>
</div>

// Container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

---

## ✨ Next Steps

- [ ] Review THEORY.md nếu có concepts chưa rõ
- [ ] Complete tất cả exercises
- [ ] So sánh code của bạn với solutions
- [ ] Test tất cả exercises ở nhiều screen sizes
- [ ] Take quiz để verify understanding
- [ ] Ready for Session 1.5.4 - States & Interactivity! 🎉

---

**Progress Tracker:**
- Concepts understood: _____ / 40
- Exercises completed: _____ / 4
- Best practices applied: _____ / 15
- Ready for next session: ☐ Yes ☐ Need more practice

**Notes:**
```
(Write your notes, questions, or areas needing more practice here)




```
