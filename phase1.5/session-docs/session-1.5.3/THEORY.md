# Session 1.5.3 - Responsive Design

## Table of Contents

1. [Mobile-First Philosophy](#1-mobile-first-philosophy)
2. [Breakpoints System](#2-breakpoints-system)
3. [Responsive Patterns](#3-responsive-patterns)
4. [Container & Max-Width](#4-container--max-width)
5. [Responsive Typography](#5-responsive-typography)
6. [Responsive Images](#6-responsive-images)
7. [Testing Responsive Designs](#7-testing-responsive-designs)
8. [Best Practices](#8-best-practices)

---

## 1. Mobile-First Philosophy

### 1.1 Mobile-First là gì?

Mobile-First là approach thiết kế **từ màn hình nhỏ nhất trước**, sau đó mở rộng lên màn hình lớn hơn.

```
Mobile (base) → Tablet (sm/md) → Desktop (lg/xl/2xl)
```

**Tại sao Mobile-First?**
- **60%+ traffic** từ mobile devices
- Force **prioritize content** - chỉ giữ những gì quan trọng
- **Progressive enhancement** - thêm features cho màn hình lớn
- **Performance** - mobile load ít CSS hơn

### 1.2 Mobile-First trong Tailwind

Tailwind CSS sử dụng **mobile-first breakpoints** mặc định:

```jsx
// Base styles = Mobile
// Breakpoint prefixes = Larger screens

// ✅ CORRECT: Mobile-first
<div className="text-sm md:text-base lg:text-lg">
  {/* Mobile: text-sm (default) */}
  {/* Tablet 768px+: text-base */}
  {/* Desktop 1024px+: text-lg */}
</div>

// ❌ WRONG: Desktop-first thinking
<div className="lg:text-lg md:text-base text-sm">
  {/* Works but harder to read/maintain */}
</div>
```

### 1.3 Cách đọc Responsive Classes

```jsx
<div className="p-4 md:p-6 lg:p-8">
```

Đọc như sau:
- **Mặc định (0px+):** `p-4` (padding 16px)
- **Từ 768px+:** `md:p-6` (padding 24px)
- **Từ 1024px+:** `lg:p-8` (padding 32px)

**Visualization:**
```
Screen width:  0px -------- 768px -------- 1024px --------→
Padding:       p-4          md:p-6         lg:p-8
               16px         24px           32px
```

---

## 2. Breakpoints System

### 2.1 Default Breakpoints

| Prefix | Min-width | CSS | Target Devices |
|--------|-----------|-----|----------------|
| (none) | 0px | Default | Mobile phones |
| `sm:` | 640px | `@media (min-width: 640px)` | Large phones, small tablets |
| `md:` | 768px | `@media (min-width: 768px)` | Tablets |
| `lg:` | 1024px | `@media (min-width: 1024px)` | Laptops, small desktops |
| `xl:` | 1280px | `@media (min-width: 1280px)` | Desktops |
| `2xl:` | 1536px | `@media (min-width: 1536px)` | Large monitors |

### 2.2 Breakpoint Visualization

```
│◀──────────────────── Screen Width ────────────────────▶│

│  Mobile  │   sm    │    md    │    lg    │   xl   │ 2xl │
│  < 640   │  640+   │   768+   │  1024+   │ 1280+  │1536+│
│          │         │          │          │        │     │
└──────────┴─────────┴──────────┴──────────┴────────┴─────┘
     ▲           ▲          ▲          ▲         ▲       ▲
  iPhone    iPad Mini    iPad     MacBook    Desktop  Large
```

### 2.3 Syntax Pattern

```jsx
// Pattern: {breakpoint}:{utility}
<div className="
  w-full        // Mobile: full width
  sm:w-1/2      // 640px+: half width
  md:w-1/3      // 768px+: one-third
  lg:w-1/4      // 1024px+: one-quarter
">
```

### 2.4 Multiple Properties

Bạn có thể responsive bất kỳ utility nào:

```jsx
<div className="
  // Width responsive
  w-full md:w-1/2 lg:w-1/3

  // Padding responsive
  p-4 md:p-6 lg:p-8

  // Flex direction responsive
  flex flex-col md:flex-row

  // Grid columns responsive
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

  // Text size responsive
  text-sm md:text-base lg:text-lg

  // Display responsive
  hidden md:block
">
```

---

## 3. Responsive Patterns

### 3.1 Show/Hide Pattern

Điều khiển visibility theo breakpoint:

```jsx
// Hide on mobile, show on desktop
<div className="hidden md:block">
  Desktop only content
</div>

// Show on mobile, hide on desktop
<div className="block md:hidden">
  Mobile only content
</div>

// Hide on mobile, show as flex on desktop
<nav className="hidden lg:flex gap-4">
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
</nav>
```

**Common Use Cases:**

```jsx
// Mobile: Hamburger menu icon
// Desktop: Full navigation
<header className="flex items-center justify-between">
  <Logo />

  {/* Mobile hamburger */}
  <button className="block lg:hidden">
    ☰
  </button>

  {/* Desktop navigation */}
  <nav className="hidden lg:flex gap-6">
    <a href="#">Home</a>
    <a href="#">Products</a>
    <a href="#">About</a>
  </nav>
</header>
```

### 3.2 Stacking Pattern (Flex Direction)

Thay đổi direction theo screen size:

```jsx
// Vertical on mobile, horizontal on desktop
<div className="flex flex-col md:flex-row gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**Visual:**
```
Mobile (flex-col):        Desktop (md:flex-row):
┌─────────────┐           ┌────────┬────────┬────────┐
│   Item 1    │           │ Item 1 │ Item 2 │ Item 3 │
├─────────────┤           └────────┴────────┴────────┘
│   Item 2    │
├─────────────┤
│   Item 3    │
└─────────────┘
```

### 3.3 Responsive Grid Columns

```jsx
// 1 column mobile → 2 tablet → 3 laptop → 4 desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <ProductCard />
  <ProductCard />
  <ProductCard />
  <ProductCard />
</div>
```

**Visual:**
```
Mobile (1 col):    Tablet (2 cols):    Desktop (4 cols):
┌──────────┐       ┌─────┬─────┐       ┌────┬────┬────┬────┐
│  Card 1  │       │  1  │  2  │       │ 1  │ 2  │ 3  │ 4  │
├──────────┤       ├─────┼─────┤       └────┴────┴────┴────┘
│  Card 2  │       │  3  │  4  │
├──────────┤       └─────┴─────┘
│  Card 3  │
├──────────┤
│  Card 4  │
└──────────┘
```

### 3.4 Responsive Spacing

```jsx
// Padding increases with screen size
<div className="p-4 md:p-6 lg:p-8 xl:p-12">
  Content with responsive padding
</div>

// Gap increases with screen size
<div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Margin responsive
<section className="my-8 md:my-12 lg:my-16">
  Section content
</section>
```

### 3.5 Responsive Width

```jsx
// Full width on mobile, constrained on desktop
<div className="w-full md:w-3/4 lg:w-1/2">
  Centered content
</div>

// Sidebar pattern
<aside className="w-full md:w-64 lg:w-80">
  Sidebar grows on larger screens
</aside>

// Card in grid
<div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
  Card adapts to available space
</div>
```

### 3.6 Responsive Order

Thay đổi thứ tự hiển thị:

```jsx
<div className="flex flex-col md:flex-row">
  {/* Sidebar: shows last on mobile, first on desktop */}
  <aside className="order-2 md:order-1 w-full md:w-64">
    Sidebar
  </aside>

  {/* Content: shows first on mobile, second on desktop */}
  <main className="order-1 md:order-2 flex-1">
    Main content
  </main>
</div>
```

---

## 4. Container & Max-Width

### 4.1 Container Class

Tailwind's `container` class tự động set max-width theo breakpoint:

```jsx
<div className="container mx-auto">
  {/*
    Width automatically adapts:
    - sm: max-width: 640px
    - md: max-width: 768px
    - lg: max-width: 1024px
    - xl: max-width: 1280px
    - 2xl: max-width: 1536px
  */}
</div>
```

### 4.2 Container với Padding

```jsx
// Container centered with padding
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  Content stays readable on all screens
</div>
```

### 4.3 Custom Max-Width

Đôi khi bạn muốn max-width cố định:

```jsx
// Fixed max-width regardless of breakpoint
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* max-w-7xl = 80rem = 1280px */}
</div>

// Common max-width values
<div className="max-w-xs">    {/* 320px */}</div>
<div className="max-w-sm">    {/* 384px */}</div>
<div className="max-w-md">    {/* 448px */}</div>
<div className="max-w-lg">    {/* 512px */}</div>
<div className="max-w-xl">    {/* 576px */}</div>
<div className="max-w-2xl">   {/* 672px */}</div>
<div className="max-w-3xl">   {/* 768px */}</div>
<div className="max-w-4xl">   {/* 896px */}</div>
<div className="max-w-5xl">   {/* 1024px */}</div>
<div className="max-w-6xl">   {/* 1152px */}</div>
<div className="max-w-7xl">   {/* 1280px */}</div>
<div className="max-w-full">  {/* 100% */}</div>
<div className="max-w-prose"> {/* 65ch - ideal for reading */}</div>
```

### 4.4 Responsive Max-Width

```jsx
// Full on mobile, constrained on desktop
<div className="max-w-full md:max-w-2xl lg:max-w-4xl mx-auto">
  Content
</div>
```

---

## 5. Responsive Typography

### 5.1 Font Size Scaling

```jsx
// Heading scales up with screen
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>

// Body text
<p className="text-sm md:text-base lg:text-lg">
  Body text that's readable on all devices
</p>
```

### 5.2 Common Typography Pattern

```jsx
// Hero section
<section className="text-center">
  <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
    Welcome to Our Store
  </h1>
  <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto">
    Discover amazing products at great prices
  </p>
</section>
```

### 5.3 Line Height & Letter Spacing

```jsx
// Adjust line height for better readability
<p className="leading-relaxed md:leading-loose">
  Long paragraph text...
</p>

// Tighter tracking for large headings
<h1 className="text-4xl lg:text-6xl tracking-tight lg:tracking-tighter">
  Big Heading
</h1>
```

---

## 6. Responsive Images

### 6.1 Responsive Image Sizing

```jsx
// Image fills container
<img
  src="product.jpg"
  alt="Product"
  className="w-full h-auto object-cover"
/>

// Fixed aspect ratio
<div className="aspect-square md:aspect-video lg:aspect-[4/3]">
  <img src="..." className="w-full h-full object-cover" />
</div>
```

### 6.2 Object Fit & Position

```jsx
// Cover - crops to fill
<img className="w-full h-48 md:h-64 object-cover object-center" />

// Contain - shows full image
<img className="w-full h-48 md:h-64 object-contain" />

// Position for cropping
<img className="object-cover object-top md:object-center" />
```

### 6.3 Hide/Show Images

```jsx
// Different images for different screens
<picture>
  {/* Desktop image */}
  <img
    src="desktop-hero.jpg"
    className="hidden md:block w-full"
  />
  {/* Mobile image */}
  <img
    src="mobile-hero.jpg"
    className="block md:hidden w-full"
  />
</picture>
```

---

## 7. Testing Responsive Designs

### 7.1 Browser DevTools

**Chrome DevTools:**
1. Mở DevTools (F12 hoặc Cmd+Opt+I)
2. Click icon "Toggle device toolbar" (Ctrl+Shift+M)
3. Chọn device hoặc resize manually

**Common test widths:**
- 375px - iPhone SE/Mini
- 390px - iPhone 12/13/14
- 768px - iPad portrait
- 1024px - iPad landscape / small laptop
- 1280px - Desktop
- 1440px - Large desktop

### 7.2 Testing Checklist

```markdown
□ Mobile (< 640px)
  - Text readable without zooming
  - Buttons large enough to tap (min 44x44px)
  - No horizontal scroll
  - Images not cropped badly

□ Tablet (640px - 1024px)
  - Layout adjusts appropriately
  - Good use of space
  - Navigation accessible

□ Desktop (> 1024px)
  - Content not too wide (use max-width)
  - Proper spacing
  - All features accessible
```

### 7.3 Responsive Debug Utility

Thêm indicator để biết đang ở breakpoint nào:

```jsx
// Development only - shows current breakpoint
function BreakpointIndicator() {
  return (
    <div className="fixed bottom-4 left-4 z-50 px-2 py-1 bg-black text-white text-xs rounded">
      <span className="sm:hidden">XS</span>
      <span className="hidden sm:inline md:hidden">SM</span>
      <span className="hidden md:inline lg:hidden">MD</span>
      <span className="hidden lg:inline xl:hidden">LG</span>
      <span className="hidden xl:inline 2xl:hidden">XL</span>
      <span className="hidden 2xl:inline">2XL</span>
    </div>
  )
}
```

---

## 8. Best Practices

### 8.1 Mobile-First Rules

```jsx
// ✅ GOOD: Start with mobile, add for larger
<div className="text-sm md:text-base lg:text-lg">

// ❌ AVOID: Starting with desktop
<div className="text-lg md:text-base sm:text-sm">
```

### 8.2 Don't Overuse Breakpoints

```jsx
// ❌ TOO MANY: Every breakpoint
<div className="p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 2xl:p-6">

// ✅ BETTER: Only when needed (usually 2-3)
<div className="p-4 md:p-6 lg:p-8">
```

### 8.3 Always Set Base Styles

```jsx
// ❌ WRONG: Missing base (hidden on mobile!)
<div className="md:block">Content</div>

// ✅ CORRECT: Has base style
<div className="hidden md:block">Content</div>
<div className="block md:hidden">Content</div>
```

### 8.4 Test Real Devices

- DevTools simulation != real device
- Test on actual phone/tablet khi có thể
- Check touch targets (buttons, links)
- Test landscape orientation

### 8.5 Common Responsive Components

**Responsive Card:**
```jsx
<div className="
  flex flex-col md:flex-row
  p-4 md:p-6
  gap-4 md:gap-6
  bg-white rounded-lg shadow
">
  <img className="w-full md:w-48 h-48 object-cover rounded" />
  <div className="flex-1">
    <h3 className="text-lg md:text-xl font-bold">Title</h3>
    <p className="text-sm md:text-base text-gray-600">Description</p>
  </div>
</div>
```

**Responsive Navigation:**
```jsx
<header className="flex items-center justify-between p-4">
  <Logo />

  {/* Mobile: hamburger */}
  <button className="lg:hidden p-2">☰</button>

  {/* Desktop: full nav */}
  <nav className="hidden lg:flex items-center gap-6">
    <a href="#">Home</a>
    <a href="#">Products</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
</header>
```

**Responsive Grid:**
```jsx
<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-4 md:gap-6
">
  {products.map(p => <ProductCard key={p.id} product={p} />)}
</div>
```

---

## Quick Reference Card

### Breakpoints
```
(base) = 0px+      Mobile phones
sm:    = 640px+    Large phones
md:    = 768px+    Tablets
lg:    = 1024px+   Laptops
xl:    = 1280px+   Desktops
2xl:   = 1536px+   Large screens
```

### Common Patterns
```jsx
// Show/Hide
hidden md:block          // Hide mobile, show desktop
block md:hidden          // Show mobile, hide desktop

// Stacking
flex flex-col md:flex-row   // Stack mobile, row desktop

// Grid
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4

// Spacing
p-4 md:p-6 lg:p-8        // Responsive padding
gap-4 md:gap-6           // Responsive gap

// Width
w-full md:w-1/2 lg:w-1/3 // Responsive width

// Typography
text-sm md:text-base lg:text-lg
```

### Container
```jsx
// Tailwind container
<div className="container mx-auto px-4">

// Custom max-width
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

---

**Next Session Preview:** Session 1.5.4 sẽ cover States & Interactivity với hover, focus, active, và các pseudo-classes khác.
