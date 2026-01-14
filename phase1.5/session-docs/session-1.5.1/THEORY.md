# Session 1.5.1 - Core Concepts & Utility-First

## Table of Contents

1. [Utility-First Philosophy](#1-utility-first-philosophy)
2. [Spacing System](#2-spacing-system)
3. [Typography](#3-typography)
4. [Color System](#4-color-system)
5. [Sizing](#5-sizing)
6. [Best Practices](#6-best-practices)

---

## 1. Utility-First Philosophy

### What is Utility-First CSS?

Utility-First là cách tiếp cận CSS mà thay vì viết custom CSS classes, bạn sử dụng các **pre-built utility classes** trực tiếp trong HTML/JSX.

### Traditional CSS vs Utility-First

**Traditional CSS Approach:**

```css
/* styles.css */
.product-card {
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.product-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}
```

```jsx
<div className="product-card">
  <h2 className="product-title">Product Name</h2>
</div>
```

**Utility-First Approach (Tailwind):**

```jsx
<div className="p-4 mb-6 bg-white rounded-lg shadow-sm">
  <h2 className="text-xl font-bold text-gray-800 mb-2">Product Name</h2>
</div>
```

### Pros & Cons của Utility-First

**Ưu điểm (Pros):**

| Advantage | Giải thích |
|-----------|-----------|
| **No naming struggle** | Không cần nghĩ tên class như `.product-card-wrapper-inner` |
| **No CSS bloat** | Reuse utilities, không duplicate styles |
| **Safe changes** | Thay đổi class không ảnh hưởng component khác |
| **Fast development** | Không cần switch giữa CSS và JSX files |
| **Consistent design** | Sử dụng design tokens (spacing, colors) có sẵn |
| **Responsive made easy** | `md:p-4 lg:p-6` - responsive ngay trong class |

**Nhược điểm (Cons):**

| Disadvantage | Giải thích |
|--------------|-----------|
| **Long class strings** | `className` có thể dài, khó đọc ban đầu |
| **Learning curve** | Cần nhớ utility class names |
| **HTML/JSX verbose** | Markup có nhiều classes |
| **Repetition** | Cùng pattern lặp lại (giải quyết bằng components) |

### Khi nào nên dùng Utility-First?

✅ **Nên dùng:**
- Component-based frameworks (React, Vue, Svelte)
- Rapid prototyping
- Design system với consistent spacing/colors
- Team projects cần consistency

❌ **Cân nhắc alternatives khi:**
- Content-heavy sites (blogs, docs) - cần prose styling
- Very small projects không cần build step
- Team chưa quen với utility-first

---

## 2. Spacing System

Tailwind sử dụng **consistent spacing scale** dựa trên `0.25rem (4px)` increments.

### Spacing Scale Reference

| Class | Value | Pixels | Mô tả |
|-------|-------|--------|-------|
| `0` | 0 | 0px | Không có spacing |
| `px` | 1px | 1px | 1 pixel |
| `0.5` | 0.125rem | 2px | Rất nhỏ |
| `1` | 0.25rem | 4px | Nhỏ |
| `2` | 0.5rem | 8px | Small |
| `3` | 0.75rem | 12px | Medium-small |
| `4` | 1rem | 16px | **Base** (phổ biến nhất) |
| `5` | 1.25rem | 20px | Medium |
| `6` | 1.5rem | 24px | Medium-large |
| `8` | 2rem | 32px | Large |
| `10` | 2.5rem | 40px | Extra large |
| `12` | 3rem | 48px | 2x large |
| `16` | 4rem | 64px | 3x large |
| `20` | 5rem | 80px | 4x large |
| `24` | 6rem | 96px | 5x large |

### Padding (Khoảng cách bên trong)

Padding tạo khoảng cách **bên trong** element, giữa content và border.

```
┌─────────────────────────┐
│      ← padding →        │
│   ┌───────────────┐     │
│   │   CONTENT     │     │
│   └───────────────┘     │
│                         │
└─────────────────────────┘
```

| Class | Mô tả | Ví dụ |
|-------|-------|-------|
| `p-{size}` | All sides | `p-4` = padding 1rem tất cả 4 phía |
| `px-{size}` | Horizontal (left + right) | `px-4` = padding-left + padding-right |
| `py-{size}` | Vertical (top + bottom) | `py-2` = padding-top + padding-bottom |
| `pt-{size}` | Top only | `pt-4` = padding-top |
| `pb-{size}` | Bottom only | `pb-4` = padding-bottom |
| `pl-{size}` | Left only | `pl-4` = padding-left |
| `pr-{size}` | Right only | `pr-4` = padding-right |

**Ví dụ thực tế:**

```jsx
// Card với padding đều 4 phía
<div className="p-4">Card content</div>

// Button với padding horizontal nhiều hơn vertical
<button className="px-6 py-2">Click me</button>

// Section với padding top lớn
<section className="pt-12 pb-8 px-4">Hero section</section>
```

### Margin (Khoảng cách bên ngoài)

Margin tạo khoảng cách **bên ngoài** element, giữa element và elements khác.

```
          ↑ margin-top
┌─────────────────────────┐
│       ELEMENT           │
└─────────────────────────┘
          ↓ margin-bottom
```

| Class | Mô tả | Ví dụ |
|-------|-------|-------|
| `m-{size}` | All sides | `m-4` = margin 1rem tất cả 4 phía |
| `mx-{size}` | Horizontal | `mx-auto` = center horizontally |
| `my-{size}` | Vertical | `my-4` = margin top + bottom |
| `mt-{size}` | Top only | `mt-8` = margin-top 2rem |
| `mb-{size}` | Bottom only | `mb-4` = margin-bottom |
| `ml-{size}` | Left only | `ml-2` = margin-left |
| `mr-{size}` | Right only | `mr-2` = margin-right |

**Negative margins:** Thêm `-` prefix:
```jsx
<div className="-mt-4">Overlap previous element by 1rem</div>
```

**Auto margins:**
```jsx
// Center block element
<div className="mx-auto w-96">Centered container</div>

// Push element to right
<button className="ml-auto">Right aligned</button>
```

### Space Between (Khoảng cách giữa children)

`space-{x|y}-{size}` thêm margin cho **tất cả children** trừ child đầu tiên.

```jsx
// Vertical spacing giữa các items
<div className="space-y-4">
  <div>Item 1</div>        {/* No margin-top */}
  <div>Item 2</div>        {/* margin-top: 1rem */}
  <div>Item 3</div>        {/* margin-top: 1rem */}
</div>

// Horizontal spacing
<div className="flex space-x-2">
  <button>Btn 1</button>   {/* No margin-left */}
  <button>Btn 2</button>   {/* margin-left: 0.5rem */}
  <button>Btn 3</button>   {/* margin-left: 0.5rem */}
</div>
```

**Lưu ý:** `space-*` áp dụng cho **direct children**, cần có children elements.

### Gap (For Flexbox/Grid)

`gap-{size}` tạo khoảng cách trong **flex** hoặc **grid** containers.

```jsx
// Flex with gap
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Grid with different row/column gaps
<div className="grid grid-cols-3 gap-x-4 gap-y-6">
  {/* Grid items */}
</div>
```

**Khác biệt `space` vs `gap`:**

| Feature | `space-*` | `gap-*` |
|---------|-----------|---------|
| Áp dụng cho | Any container | Flex/Grid only |
| Mechanism | Adds margin to children | CSS gap property |
| Wrapping | Có thể gây issues | Handles wrap tốt |
| Performance | OK | Better |

**Recommend:** Dùng `gap` cho flex/grid, `space` cho stacked elements không phải flex/grid.

---

## 3. Typography

### Font Size

| Class | Size | Mô tả |
|-------|------|-------|
| `text-xs` | 0.75rem (12px) | Extra small, captions |
| `text-sm` | 0.875rem (14px) | Small, secondary text |
| `text-base` | 1rem (16px) | **Base size** (default) |
| `text-lg` | 1.125rem (18px) | Slightly larger |
| `text-xl` | 1.25rem (20px) | Large text |
| `text-2xl` | 1.5rem (24px) | Headings |
| `text-3xl` | 1.875rem (30px) | Large headings |
| `text-4xl` | 2.25rem (36px) | Hero text |
| `text-5xl` | 3rem (48px) | Display text |
| `text-6xl` | 3.75rem (60px) | Large display |
| `text-7xl` | 4.5rem (72px) | Extra large |
| `text-8xl` | 6rem (96px) | Huge |
| `text-9xl` | 8rem (128px) | Maximum |

### Font Weight

| Class | Weight | Mô tả |
|-------|--------|-------|
| `font-thin` | 100 | Rất mỏng |
| `font-extralight` | 200 | Extra light |
| `font-light` | 300 | Light |
| `font-normal` | 400 | **Normal** (default) |
| `font-medium` | 500 | Medium |
| `font-semibold` | 600 | Semi-bold |
| `font-bold` | 700 | **Bold** |
| `font-extrabold` | 800 | Extra bold |
| `font-black` | 900 | Heaviest |

### Line Height (Leading)

| Class | Value | Mô tả |
|-------|-------|-------|
| `leading-none` | 1 | Không có extra space |
| `leading-tight` | 1.25 | Tight, cho headings |
| `leading-snug` | 1.375 | Slightly tight |
| `leading-normal` | 1.5 | **Normal** (default) |
| `leading-relaxed` | 1.625 | Relaxed, dễ đọc |
| `leading-loose` | 2 | Very loose |

**Fixed line heights:** `leading-{number}` (3-10)

```jsx
// Heading với tight line height
<h1 className="text-4xl font-bold leading-tight">
  Large Heading Text
</h1>

// Paragraph với relaxed line height
<p className="text-base leading-relaxed">
  Long paragraph text that needs comfortable reading...
</p>
```

### Text Decoration

| Class | Effect |
|-------|--------|
| `underline` | Underline text |
| `overline` | Line above text |
| `line-through` | ~~Strikethrough~~ |
| `no-underline` | Remove underline |

### Text Transform

| Class | Effect |
|-------|--------|
| `uppercase` | UPPERCASE |
| `lowercase` | lowercase |
| `capitalize` | Capitalize Each Word |
| `normal-case` | Normal Case |

### Text Alignment

| Class | Alignment |
|-------|-----------|
| `text-left` | Left aligned |
| `text-center` | Center aligned |
| `text-right` | Right aligned |
| `text-justify` | Justified |

### Typography Example - E-commerce Product

```jsx
<div className="p-4">
  {/* Category - small, uppercase, light color */}
  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
    Electronics
  </p>

  {/* Product name - large, bold */}
  <h2 className="text-xl font-bold text-gray-900 mb-2">
    Wireless Bluetooth Headphones
  </h2>

  {/* Description - normal size, relaxed reading */}
  <p className="text-base text-gray-600 leading-relaxed mb-4">
    Premium quality wireless headphones with noise cancellation
    and 30-hour battery life.
  </p>

  {/* Price - large, bold, accent color */}
  <p className="text-2xl font-bold text-blue-600">
    $199.99
  </p>
</div>
```

---

## 4. Color System

Tailwind cung cấp comprehensive color palette với **11 shades** cho mỗi color (50-950).

### Color Shade Scale

```
50  ████ Lightest   - backgrounds, subtle highlights
100 ████ Very light - hover backgrounds
200 ████ Light      - borders, dividers
300 ████ Light-med  - disabled states
400 ████ Medium     - placeholder text
500 ████ Base       - primary buttons, icons
600 ████ Med-dark   - hover states for primary
700 ████ Dark       - text on light backgrounds
800 ████ Very dark  - primary text
900 ████ Darkest    - headings, emphasis
950 ████ Near black - maximum contrast
```

### Default Color Palette

| Color | Mô tả | Use cases |
|-------|-------|-----------|
| `slate` | Cool gray | UI backgrounds, text |
| `gray` | Neutral gray | General purpose |
| `zinc` | Warm gray | Modern, neutral |
| `neutral` | True gray | Minimal designs |
| `stone` | Warm neutral | Earthy designs |
| `red` | Red | Errors, destructive |
| `orange` | Orange | Warnings |
| `amber` | Amber/Gold | Caution, highlights |
| `yellow` | Yellow | Warnings, attention |
| `lime` | Lime green | Success, fresh |
| `green` | Green | Success, positive |
| `emerald` | Emerald | Rich success |
| `teal` | Teal | Cool accent |
| `cyan` | Cyan | Info, links |
| `sky` | Sky blue | Light accent |
| `blue` | Blue | Primary, links |
| `indigo` | Indigo | Rich primary |
| `violet` | Violet | Creative, premium |
| `purple` | Purple | Luxury, creative |
| `fuchsia` | Fuchsia | Bold accent |
| `pink` | Pink | Playful, feminine |
| `rose` | Rose | Soft pink, romantic |

### Color Usage Patterns

**Background Colors: `bg-{color}-{shade}`**

```jsx
// Light backgrounds
<div className="bg-gray-50">Very light gray bg</div>
<div className="bg-blue-100">Light blue bg</div>

// Colored backgrounds
<div className="bg-blue-500">Blue bg</div>
<div className="bg-green-600">Green bg</div>

// Dark backgrounds
<div className="bg-gray-900">Dark bg</div>
```

**Text Colors: `text-{color}-{shade}`**

```jsx
// Light text (for dark backgrounds)
<p className="text-white">White text</p>
<p className="text-gray-100">Very light text</p>

// Normal text
<p className="text-gray-600">Secondary text</p>
<p className="text-gray-800">Primary text</p>
<p className="text-gray-900">Heading text</p>

// Colored text
<p className="text-blue-600">Link text</p>
<p className="text-red-500">Error text</p>
<p className="text-green-600">Success text</p>
```

**Border Colors: `border-{color}-{shade}`**

```jsx
<div className="border border-gray-200">Light border</div>
<div className="border-2 border-blue-500">Blue border</div>
<input className="border border-red-500" /> {/* Error state */}
```

### Color Contrast Guidelines

**Text trên backgrounds:**

| Background | Recommended Text |
|------------|------------------|
| `bg-white`, `bg-*-50` | `text-gray-800`, `text-gray-900` |
| `bg-*-100`, `bg-*-200` | `text-gray-700`, `text-gray-800` |
| `bg-*-500`, `bg-*-600` | `text-white` |
| `bg-*-700`, `bg-*-800`, `bg-*-900` | `text-white`, `text-gray-100` |

**Common Color Combinations:**

```jsx
// Primary button
<button className="bg-blue-600 text-white">Primary</button>

// Secondary button
<button className="bg-gray-200 text-gray-800">Secondary</button>

// Success message
<div className="bg-green-100 text-green-800 border border-green-200">
  Success!
</div>

// Error message
<div className="bg-red-100 text-red-800 border border-red-200">
  Error!
</div>

// Warning message
<div className="bg-yellow-100 text-yellow-800 border border-yellow-200">
  Warning!
</div>
```

### E-commerce Color Usage

```jsx
// Sale badge
<span className="bg-red-500 text-white px-2 py-1 text-xs font-bold">
  SALE
</span>

// New badge
<span className="bg-green-500 text-white px-2 py-1 text-xs font-bold">
  NEW
</span>

// Out of stock
<span className="bg-gray-500 text-white px-2 py-1 text-xs font-bold">
  OUT OF STOCK
</span>

// Original price (strikethrough)
<span className="text-gray-400 line-through">$299.99</span>

// Sale price
<span className="text-red-600 font-bold text-xl">$199.99</span>
```

---

## 5. Sizing

### Width

| Class | Value | Mô tả |
|-------|-------|-------|
| `w-0` | 0 | Zero width |
| `w-px` | 1px | 1 pixel |
| `w-{0-96}` | 0-24rem | Fixed widths |
| `w-auto` | auto | Automatic |
| `w-full` | 100% | Full width |
| `w-screen` | 100vw | Viewport width |
| `w-min` | min-content | Minimum content |
| `w-max` | max-content | Maximum content |
| `w-fit` | fit-content | Fit content |

**Fractional widths:**

| Class | Value |
|-------|-------|
| `w-1/2` | 50% |
| `w-1/3` | 33.333% |
| `w-2/3` | 66.667% |
| `w-1/4` | 25% |
| `w-3/4` | 75% |
| `w-1/5` | 20% |
| `w-2/5` | 40% |
| `w-3/5` | 60% |
| `w-4/5` | 80% |
| `w-1/6` | 16.667% |
| `w-5/6` | 83.333% |

### Height

| Class | Value | Mô tả |
|-------|-------|-------|
| `h-{0-96}` | 0-24rem | Fixed heights |
| `h-auto` | auto | Automatic |
| `h-full` | 100% | Full height |
| `h-screen` | 100vh | Viewport height |
| `h-min` | min-content | Minimum |
| `h-max` | max-content | Maximum |
| `h-fit` | fit-content | Fit content |

### Max/Min Width

| Class | Value |
|-------|-------|
| `max-w-xs` | 20rem (320px) |
| `max-w-sm` | 24rem (384px) |
| `max-w-md` | 28rem (448px) |
| `max-w-lg` | 32rem (512px) |
| `max-w-xl` | 36rem (576px) |
| `max-w-2xl` | 42rem (672px) |
| `max-w-3xl` | 48rem (768px) |
| `max-w-4xl` | 56rem (896px) |
| `max-w-5xl` | 64rem (1024px) |
| `max-w-6xl` | 72rem (1152px) |
| `max-w-7xl` | 80rem (1280px) |
| `max-w-full` | 100% |
| `max-w-screen-sm` | 640px |
| `max-w-screen-md` | 768px |
| `max-w-screen-lg` | 1024px |
| `max-w-screen-xl` | 1280px |

### Min Width/Height

```jsx
// Minimum sizes
<div className="min-w-0">     {/* Allow shrinking to 0 */}
<div className="min-w-full">  {/* At least full width */}
<div className="min-h-screen">{/* At least full viewport height */}
```

### Sizing Example - E-commerce Layout

```jsx
// Full-width container with max-width
<div className="w-full max-w-7xl mx-auto px-4">

  {/* Product image - fixed aspect */}
  <div className="w-full h-64">
    <img className="w-full h-full object-cover" src="..." />
  </div>

  {/* Two-column layout */}
  <div className="flex gap-4">
    <div className="w-2/3">Main content</div>
    <div className="w-1/3">Sidebar</div>
  </div>

  {/* Button with min-width */}
  <button className="min-w-32 px-4 py-2">Add to Cart</button>
</div>
```

---

## 6. Best Practices

### 1. Mobile-First Approach

Tailwind sử dụng mobile-first breakpoints. Viết styles cho mobile trước, rồi thêm responsive modifiers.

```jsx
// ❌ Wrong: Desktop-first thinking
<div className="lg:p-2 p-8">

// ✅ Correct: Mobile-first
<div className="p-2 lg:p-8">
```

### 2. Consistent Spacing

Sử dụng spacing scale thay vì arbitrary values khi có thể.

```jsx
// ❌ Avoid: Arbitrary values
<div className="p-[13px] m-[7px]">

// ✅ Prefer: Scale values
<div className="p-3 m-2">
```

### 3. Color Semantic Usage

Dùng colors theo semantic meaning:

```jsx
// Success states
<div className="bg-green-100 text-green-800 border-green-200">

// Error states
<div className="bg-red-100 text-red-800 border-red-200">

// Warning states
<div className="bg-yellow-100 text-yellow-800 border-yellow-200">

// Info states
<div className="bg-blue-100 text-blue-800 border-blue-200">
```

### 4. Typography Hierarchy

Tạo clear visual hierarchy:

```jsx
<article>
  {/* Category - smallest, muted */}
  <span className="text-xs text-gray-500 uppercase tracking-wider">
    Category
  </span>

  {/* Title - largest, boldest */}
  <h1 className="text-2xl font-bold text-gray-900 mt-1">
    Main Title
  </h1>

  {/* Subtitle - medium, semi-bold */}
  <h2 className="text-lg font-semibold text-gray-700 mt-2">
    Subtitle
  </h2>

  {/* Body - normal */}
  <p className="text-base text-gray-600 mt-4 leading-relaxed">
    Body text content...
  </p>
</article>
```

### 5. Component Patterns

Khi patterns lặp lại, extract thành React components:

```jsx
// Instead of repeating long class strings...
// Create a reusable Badge component

interface BadgeProps {
  variant: 'sale' | 'new' | 'soldOut'
  children: React.ReactNode
}

function Badge({ variant, children }: BadgeProps) {
  const variants = {
    sale: 'bg-red-500 text-white',
    new: 'bg-green-500 text-white',
    soldOut: 'bg-gray-500 text-white'
  }

  return (
    <span className={`px-2 py-1 text-xs font-bold rounded ${variants[variant]}`}>
      {children}
    </span>
  )
}

// Usage
<Badge variant="sale">-20%</Badge>
<Badge variant="new">NEW</Badge>
```

### 6. Avoid Deep Nesting

Giữ component structure flat khi có thể:

```jsx
// ❌ Deep nesting
<div className="...">
  <div className="...">
    <div className="...">
      <div className="...">
        Content
      </div>
    </div>
  </div>
</div>

// ✅ Flatter structure
<div className="...">
  <header className="...">Header</header>
  <main className="...">Content</main>
  <footer className="...">Footer</footer>
</div>
```

---

## Quick Reference Cheat Sheet

### Spacing
```
p-4  = padding: 1rem (16px)
m-4  = margin: 1rem (16px)
px-4 = padding-left + right
py-4 = padding-top + bottom
mx-auto = center horizontally
space-y-4 = vertical gap between children
gap-4 = gap in flex/grid
```

### Typography
```
text-sm/base/lg/xl/2xl = font sizes
font-normal/medium/semibold/bold = weights
leading-tight/normal/relaxed = line heights
text-gray-600 = text color
```

### Colors
```
bg-{color}-{50-950} = background
text-{color}-{50-950} = text color
border-{color}-{50-950} = border color

50-200 = light (backgrounds)
300-500 = medium (accents)
600-900 = dark (text, buttons)
```

### Sizing
```
w-full = width: 100%
w-1/2 = width: 50%
max-w-xl = max-width: 36rem
h-screen = height: 100vh
min-h-screen = min-height: 100vh
```

---

**Next Session:** 1.5.2 - Flexbox & Grid Layout
