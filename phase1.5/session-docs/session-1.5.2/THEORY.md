# Session 1.5.2 - Flexbox & Grid Layout

## Table of Contents

1. [Flexbox Basics](#1-flexbox-basics)
2. [Flexbox Items](#2-flexbox-items)
3. [Grid Basics](#3-grid-basics)
4. [Grid Items](#4-grid-items)
5. [Centering Patterns](#5-centering-patterns)
6. [Common Layout Patterns](#6-common-layout-patterns)
7. [Best Practices](#7-best-practices)

---

## 1. Flexbox Basics

Flexbox là **one-dimensional layout** - xử lý layout theo một chiều (row hoặc column) tại một thời điểm.

### 1.1 Flex Container

Để bắt đầu sử dụng Flexbox, bạn cần khai báo container là flex:

```html
<!-- Flex container -->
<div class="flex">...</div>

<!-- Inline flex (behaves like inline element) -->
<div class="inline-flex">...</div>
```

### 1.2 Flex Direction

Xác định **main axis** (trục chính) của flex container:

| Class | CSS | Mô tả |
|-------|-----|-------|
| `flex-row` | `flex-direction: row` | Items xếp theo hàng ngang (default) |
| `flex-row-reverse` | `flex-direction: row-reverse` | Hàng ngang, ngược chiều |
| `flex-col` | `flex-direction: column` | Items xếp theo cột dọc |
| `flex-col-reverse` | `flex-direction: column-reverse` | Cột dọc, ngược chiều |

```jsx
// Horizontal layout (default)
<div className="flex flex-row">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
// Result: [1] [2] [3]

// Vertical layout
<div className="flex flex-col">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
// Result:
// [1]
// [2]
// [3]
```

### 1.3 Flex Wrap

Xác định items có wrap sang dòng mới không:

| Class | CSS | Mô tả |
|-------|-----|-------|
| `flex-nowrap` | `flex-wrap: nowrap` | Không wrap, items co lại (default) |
| `flex-wrap` | `flex-wrap: wrap` | Wrap xuống dòng mới |
| `flex-wrap-reverse` | `flex-wrap: wrap-reverse` | Wrap lên dòng trên |

```jsx
// Items will wrap to next line when container is too small
<div className="flex flex-wrap">
  <div className="w-1/3">Item 1</div>
  <div className="w-1/3">Item 2</div>
  <div className="w-1/3">Item 3</div>
  <div className="w-1/3">Item 4</div>
</div>
```

### 1.4 Justify Content (Main Axis)

Căn chỉnh items theo **main axis** (trục chính):

| Class | CSS | Mô tả |
|-------|-----|-------|
| `justify-start` | `justify-content: flex-start` | Đầu trục (default) |
| `justify-center` | `justify-content: center` | Giữa trục |
| `justify-end` | `justify-content: flex-end` | Cuối trục |
| `justify-between` | `justify-content: space-between` | Khoảng cách đều, không có ở 2 đầu |
| `justify-around` | `justify-content: space-around` | Khoảng cách đều, có ở 2 đầu (1/2) |
| `justify-evenly` | `justify-content: space-evenly` | Khoảng cách hoàn toàn đều |

```jsx
// Center items horizontally
<div className="flex justify-center">
  <button>Button</button>
</div>

// Space between - logo left, nav right
<nav className="flex justify-between">
  <div>Logo</div>
  <div>Navigation</div>
</nav>

// Evenly distributed
<div className="flex justify-evenly">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>
```

**Visual comparison:**
```
justify-start:   [A][B][C]............
justify-center:  ......[A][B][C]......
justify-end:     ............[A][B][C]
justify-between: [A]......[B]......[C]
justify-around:  ..[A]....[B]....[C]..
justify-evenly:  ...[A]...[B]...[C]...
```

### 1.5 Align Items (Cross Axis)

Căn chỉnh items theo **cross axis** (trục vuông góc):

| Class | CSS | Mô tả |
|-------|-----|-------|
| `items-start` | `align-items: flex-start` | Đầu cross axis |
| `items-center` | `align-items: center` | Giữa cross axis |
| `items-end` | `align-items: flex-end` | Cuối cross axis |
| `items-baseline` | `align-items: baseline` | Căn theo baseline của text |
| `items-stretch` | `align-items: stretch` | Kéo dài full height (default) |

```jsx
// Center vertically
<div className="flex items-center h-20">
  <span>Centered text</span>
</div>

// Different heights, align to bottom
<div className="flex items-end h-32">
  <div className="h-8 bg-blue-500">Short</div>
  <div className="h-16 bg-green-500">Medium</div>
  <div className="h-24 bg-red-500">Tall</div>
</div>
```

### 1.6 Gap

Khoảng cách giữa các flex items:

| Class | CSS | Mô tả |
|-------|-----|-------|
| `gap-{size}` | `gap: {size}` | Khoảng cách cả 2 chiều |
| `gap-x-{size}` | `column-gap: {size}` | Khoảng cách ngang |
| `gap-y-{size}` | `row-gap: {size}` | Khoảng cách dọc |

```jsx
// Equal gap all around
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Different horizontal and vertical gaps
<div className="flex flex-wrap gap-x-4 gap-y-2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**Gap sizes:**
- `gap-0` = 0px
- `gap-1` = 0.25rem (4px)
- `gap-2` = 0.5rem (8px)
- `gap-4` = 1rem (16px)
- `gap-6` = 1.5rem (24px)
- `gap-8` = 2rem (32px)

---

## 2. Flexbox Items

### 2.1 Flex Grow, Shrink, Basis

| Class | CSS | Mô tả |
|-------|-----|-------|
| `flex-1` | `flex: 1 1 0%` | Grow & shrink, basis 0 |
| `flex-auto` | `flex: 1 1 auto` | Grow & shrink, basis auto |
| `flex-initial` | `flex: 0 1 auto` | Shrink only (default) |
| `flex-none` | `flex: none` | Không grow, không shrink |

```jsx
// Sidebar fixed, content flexible
<div className="flex">
  <aside className="flex-none w-64">Sidebar (fixed 256px)</aside>
  <main className="flex-1">Content (takes remaining space)</main>
</div>

// Three equal columns
<div className="flex">
  <div className="flex-1">Column 1</div>
  <div className="flex-1">Column 2</div>
  <div className="flex-1">Column 3</div>
</div>

// Middle section takes most space
<div className="flex">
  <div className="flex-none">Logo</div>
  <div className="flex-1">Search Bar</div>
  <div className="flex-none">Icons</div>
</div>
```

### 2.2 Flex Grow & Shrink

| Class | CSS | Mô tả |
|-------|-----|-------|
| `grow` | `flex-grow: 1` | Item sẽ grow |
| `grow-0` | `flex-grow: 0` | Item không grow |
| `shrink` | `flex-shrink: 1` | Item sẽ shrink (default) |
| `shrink-0` | `flex-shrink: 0` | Item không shrink |

```jsx
// Only middle item grows
<div className="flex">
  <div className="grow-0">Fixed</div>
  <div className="grow">Grows</div>
  <div className="grow-0">Fixed</div>
</div>

// Prevent image from shrinking
<div className="flex">
  <img className="shrink-0 w-16 h-16" src="..." alt="..." />
  <p>Long text that might cause shrinking...</p>
</div>
```

### 2.3 Order

Thay đổi thứ tự hiển thị của items:

| Class | CSS |
|-------|-----|
| `order-first` | `order: -9999` |
| `order-last` | `order: 9999` |
| `order-none` | `order: 0` |
| `order-1` to `order-12` | `order: 1` to `order: 12` |

```jsx
// Move item to first position
<div className="flex">
  <div className="order-2">A (shows 2nd)</div>
  <div className="order-1">B (shows 1st)</div>
  <div className="order-3">C (shows 3rd)</div>
</div>
```

### 2.4 Align Self

Override `align-items` cho individual item:

| Class | CSS |
|-------|-----|
| `self-auto` | `align-self: auto` |
| `self-start` | `align-self: flex-start` |
| `self-center` | `align-self: center` |
| `self-end` | `align-self: flex-end` |
| `self-stretch` | `align-self: stretch` |

```jsx
// One item centered, others at start
<div className="flex items-start h-32">
  <div>Start</div>
  <div className="self-center">Center</div>
  <div>Start</div>
</div>
```

---

## 3. Grid Basics

Grid là **two-dimensional layout** - xử lý layout theo cả hàng và cột cùng lúc.

### 3.1 Grid Container

```html
<!-- Grid container -->
<div class="grid">...</div>

<!-- Inline grid -->
<div class="inline-grid">...</div>
```

### 3.2 Grid Template Columns

| Class | CSS | Mô tả |
|-------|-----|-------|
| `grid-cols-1` | `grid-template-columns: repeat(1, minmax(0, 1fr))` | 1 column |
| `grid-cols-2` | `grid-template-columns: repeat(2, minmax(0, 1fr))` | 2 equal columns |
| `grid-cols-3` | `grid-template-columns: repeat(3, minmax(0, 1fr))` | 3 equal columns |
| `grid-cols-4` | `grid-template-columns: repeat(4, minmax(0, 1fr))` | 4 equal columns |
| ... | ... | ... |
| `grid-cols-12` | `grid-template-columns: repeat(12, minmax(0, 1fr))` | 12 columns |
| `grid-cols-none` | `grid-template-columns: none` | No columns |

```jsx
// 3 equal columns
<div className="grid grid-cols-3">
  <div>Col 1</div>
  <div>Col 2</div>
  <div>Col 3</div>
</div>

// 4 columns for product grid
<div className="grid grid-cols-4 gap-4">
  <ProductCard />
  <ProductCard />
  <ProductCard />
  <ProductCard />
</div>
```

### 3.3 Grid Template Rows

| Class | CSS |
|-------|-----|
| `grid-rows-1` | `grid-template-rows: repeat(1, minmax(0, 1fr))` |
| `grid-rows-2` | `grid-template-rows: repeat(2, minmax(0, 1fr))` |
| `grid-rows-3` | `grid-template-rows: repeat(3, minmax(0, 1fr))` |
| ... | ... |
| `grid-rows-6` | `grid-template-rows: repeat(6, minmax(0, 1fr))` |

```jsx
// Fixed 3 rows
<div className="grid grid-rows-3 grid-flow-col">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>
// Result:
// [1] [4]
// [2] [5]
// [3] [6]
```

### 3.4 Gap (Grid)

Giống như Flexbox, Grid cũng dùng gap:

```jsx
// Equal gap
<div className="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

// Different horizontal and vertical gaps
<div className="grid grid-cols-3 gap-x-4 gap-y-8">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

### 3.5 Grid Flow

Xác định cách auto-place items:

| Class | CSS | Mô tả |
|-------|-----|-------|
| `grid-flow-row` | `grid-auto-flow: row` | Fill by row (default) |
| `grid-flow-col` | `grid-auto-flow: column` | Fill by column |
| `grid-flow-dense` | `grid-auto-flow: dense` | Fill gaps |
| `grid-flow-row-dense` | `grid-auto-flow: row dense` | Row + dense |
| `grid-flow-col-dense` | `grid-auto-flow: column dense` | Column + dense |

```jsx
// Fill by column instead of row
<div className="grid grid-rows-2 grid-flow-col gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
// Result:
// [1] [3]
// [2] [4]
```

---

## 4. Grid Items

### 4.1 Column Span

| Class | CSS | Mô tả |
|-------|-----|-------|
| `col-span-1` | `grid-column: span 1 / span 1` | Span 1 column |
| `col-span-2` | `grid-column: span 2 / span 2` | Span 2 columns |
| `col-span-3` | `grid-column: span 3 / span 3` | Span 3 columns |
| ... | ... | ... |
| `col-span-full` | `grid-column: 1 / -1` | Span all columns |

```jsx
// Featured item spans 2 columns
<div className="grid grid-cols-4 gap-4">
  <div className="col-span-2">Featured (2 cols)</div>
  <div>Normal</div>
  <div>Normal</div>
</div>

// Full-width header
<div className="grid grid-cols-3 gap-4">
  <div className="col-span-full">Header (full width)</div>
  <div>Sidebar</div>
  <div className="col-span-2">Content</div>
</div>
```

### 4.2 Row Span

| Class | CSS |
|-------|-----|
| `row-span-1` | `grid-row: span 1 / span 1` |
| `row-span-2` | `grid-row: span 2 / span 2` |
| `row-span-3` | `grid-row: span 3 / span 3` |
| ... | ... |
| `row-span-full` | `grid-row: 1 / -1` |

```jsx
// Sidebar spans 2 rows
<div className="grid grid-cols-3 grid-rows-2 gap-4">
  <div className="row-span-2">Sidebar (2 rows tall)</div>
  <div className="col-span-2">Content Top</div>
  <div className="col-span-2">Content Bottom</div>
</div>
```

### 4.3 Column Start/End

| Class | CSS |
|-------|-----|
| `col-start-1` | `grid-column-start: 1` |
| `col-start-2` | `grid-column-start: 2` |
| ... | ... |
| `col-end-3` | `grid-column-end: 3` |
| `col-end-4` | `grid-column-end: 4` |

```jsx
// Precise positioning
<div className="grid grid-cols-4 gap-4">
  <div className="col-start-2 col-end-4">
    Starts at column 2, ends before column 4
  </div>
</div>
```

### 4.4 Row Start/End

Tương tự column start/end:

```jsx
<div className="grid grid-cols-3 grid-rows-3 gap-4">
  <div className="row-start-1 row-end-3 col-start-1">
    Tall sidebar
  </div>
  <div className="col-span-2">Content 1</div>
  <div className="col-span-2">Content 2</div>
</div>
```

---

## 5. Centering Patterns

### 5.1 Flexbox Centering

```jsx
// Center horizontally only
<div className="flex justify-center">
  <div>Centered horizontally</div>
</div>

// Center vertically only (need height)
<div className="flex items-center h-screen">
  <div>Centered vertically</div>
</div>

// Center both (MOST COMMON)
<div className="flex items-center justify-center h-screen">
  <div>Perfectly centered</div>
</div>

// Center with column direction
<div className="flex flex-col items-center justify-center h-screen">
  <h1>Title</h1>
  <p>Subtitle</p>
</div>
```

### 5.2 Grid Centering

```jsx
// Place items center (shorthand)
<div className="grid place-items-center h-screen">
  <div>Centered with grid</div>
</div>

// Explicit centering
<div className="grid justify-items-center items-center h-screen">
  <div>Also centered</div>
</div>

// Place content (for the entire grid)
<div className="grid place-content-center h-screen">
  <div>Content centered</div>
</div>
```

### 5.3 Comparison: Flex vs Grid Centering

| Method | Code | Use Case |
|--------|------|----------|
| Flex center | `flex items-center justify-center` | Single item, simple centering |
| Grid place-items | `grid place-items-center` | Multiple items, each centered |
| Grid place-content | `grid place-content-center` | Center the entire grid content |

```jsx
// Flex - items stay inline
<div className="flex items-center justify-center h-32 bg-gray-100">
  <span>A</span>
  <span>B</span>
</div>
// Result: A B (side by side, centered)

// Grid place-items - each item centered in its cell
<div className="grid grid-cols-2 place-items-center h-32 bg-gray-100">
  <span>A</span>
  <span>B</span>
</div>
// Result: each in center of its column
```

---

## 6. Common Layout Patterns

### 6.1 Navbar Pattern

```jsx
// Classic navbar: Logo | Nav Links | Actions
<nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
  {/* Logo - fixed */}
  <div className="flex-none">
    <span className="text-xl font-bold">Logo</span>
  </div>

  {/* Nav links - center */}
  <div className="flex gap-6">
    <a href="#">Home</a>
    <a href="#">Products</a>
    <a href="#">About</a>
  </div>

  {/* Actions - fixed */}
  <div className="flex items-center gap-4">
    <button>Cart</button>
    <button>Login</button>
  </div>
</nav>
```

### 6.2 Card Grid Pattern

```jsx
// Responsive product grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

### 6.3 Sidebar Layout Pattern

```jsx
// Fixed sidebar + flexible content
<div className="flex min-h-screen">
  {/* Sidebar - fixed width */}
  <aside className="flex-none w-64 bg-gray-800 text-white p-4">
    <nav>Sidebar content</nav>
  </aside>

  {/* Main content - takes remaining space */}
  <main className="flex-1 p-6">
    <h1>Main Content</h1>
  </main>
</div>
```

### 6.4 Holy Grail Layout

```jsx
// Header + (Sidebar + Content + Sidebar) + Footer
<div className="min-h-screen flex flex-col">
  {/* Header */}
  <header className="flex-none h-16 bg-blue-600">Header</header>

  {/* Middle section */}
  <div className="flex-1 flex">
    <aside className="flex-none w-48 bg-gray-200">Left</aside>
    <main className="flex-1 p-4">Content</main>
    <aside className="flex-none w-48 bg-gray-200">Right</aside>
  </div>

  {/* Footer */}
  <footer className="flex-none h-16 bg-gray-800">Footer</footer>
</div>
```

### 6.5 Hero Section Pattern

```jsx
// Centered hero with background
<section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
  <div className="text-center text-white">
    <h1 className="text-5xl font-bold mb-4">Welcome</h1>
    <p className="text-xl mb-8">Subtitle text here</p>
    <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold">
      Get Started
    </button>
  </div>
</section>
```

### 6.6 Form Layout Pattern

```jsx
// Form with label-input pairs
<form className="grid gap-4 max-w-md">
  <div className="grid gap-2">
    <label className="font-medium">Email</label>
    <input className="border rounded px-3 py-2" type="email" />
  </div>

  <div className="grid gap-2">
    <label className="font-medium">Password</label>
    <input className="border rounded px-3 py-2" type="password" />
  </div>

  <button className="bg-blue-600 text-white py-2 rounded">Submit</button>
</form>
```

---

## 7. Best Practices

### 7.1 Flex vs Grid - When to Use

| Use Flexbox | Use Grid |
|-------------|----------|
| One-dimensional layout (row OR column) | Two-dimensional layout (rows AND columns) |
| Navigation bars | Product grids |
| Button groups | Dashboard layouts |
| Card content alignment | Image galleries |
| Unknown number of items | Known structure |
| Content-first (let content determine size) | Layout-first (define structure, content fills) |

### 7.2 Common Mistakes to Avoid

```jsx
// ❌ WRONG: flex-1 without flex parent
<div>
  <div className="flex-1">Won't work!</div>
</div>

// ✅ CORRECT: flex-1 with flex parent
<div className="flex">
  <div className="flex-1">Works!</div>
</div>

// ❌ WRONG: grid-cols without grid
<div className="grid-cols-3">
  <div>Won't work!</div>
</div>

// ✅ CORRECT: grid-cols with grid
<div className="grid grid-cols-3">
  <div>Works!</div>
</div>

// ❌ WRONG: gap without flex/grid
<div className="gap-4">
  <div>Gap won't apply!</div>
</div>

// ✅ CORRECT: gap with flex or grid
<div className="flex gap-4">
  <div>Gap works!</div>
</div>
```

### 7.3 Responsive Grid Pattern

```jsx
// Mobile-first responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Items */}
</div>

// Explanation:
// - Default (mobile): 1 column
// - sm (640px+): 2 columns
// - md (768px+): 3 columns
// - lg (1024px+): 4 columns
```

### 7.4 Centering Checklist

```jsx
// Centering một element:
// 1. Parent cần có height (h-screen, h-full, h-64, etc.)
// 2. Parent cần là flex hoặc grid
// 3. Áp dụng centering classes

// Quick reference:
<div className="h-screen flex items-center justify-center">
  <div>Centered!</div>
</div>

// Or with grid:
<div className="h-screen grid place-items-center">
  <div>Centered!</div>
</div>
```

### 7.5 Gap vs Space

```jsx
// ✅ PREFERRED: gap (works with flex and grid)
<div className="flex gap-4">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>

// ⚠️ OLDER: space-x (margin-based, can cause issues)
<div className="flex space-x-4">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>

// Why gap is better:
// - Works consistently with wrapping
// - No negative margin issues
// - Works the same for flex and grid
```

---

## Quick Reference Card

### Flexbox Container
```
flex / inline-flex
flex-row / flex-col / flex-row-reverse / flex-col-reverse
flex-wrap / flex-nowrap / flex-wrap-reverse
justify-start / justify-center / justify-end / justify-between / justify-around / justify-evenly
items-start / items-center / items-end / items-baseline / items-stretch
gap-{size} / gap-x-{size} / gap-y-{size}
```

### Flexbox Items
```
flex-1 / flex-auto / flex-initial / flex-none
grow / grow-0 / shrink / shrink-0
order-first / order-last / order-{1-12}
self-auto / self-start / self-center / self-end / self-stretch
```

### Grid Container
```
grid / inline-grid
grid-cols-{1-12} / grid-cols-none
grid-rows-{1-6} / grid-rows-none
gap-{size} / gap-x-{size} / gap-y-{size}
grid-flow-row / grid-flow-col / grid-flow-dense
```

### Grid Items
```
col-span-{1-12} / col-span-full
row-span-{1-6} / row-span-full
col-start-{1-13} / col-end-{1-13}
row-start-{1-7} / row-end-{1-7}
```

### Centering
```
Flex: flex items-center justify-center
Grid: grid place-items-center
```

---

**Next Session Preview:** Session 1.5.3 sẽ cover Responsive Design với breakpoints (sm, md, lg, xl, 2xl) và responsive utilities.
