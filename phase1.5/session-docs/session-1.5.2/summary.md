# Session 1.5.2 - Summary & Checklist

## Flexbox Checklist

### Container Properties
- [ ] `flex` - Tạo flex container
- [ ] `inline-flex` - Flex container dạng inline
- [ ] `flex-row` / `flex-col` - Direction (hàng/cột)
- [ ] `flex-wrap` - Cho phép wrap items
- [ ] `justify-{start|center|end|between|around|evenly}` - Main axis alignment
- [ ] `items-{start|center|end|baseline|stretch}` - Cross axis alignment
- [ ] `gap-{size}` - Khoảng cách giữa items

### Item Properties
- [ ] `flex-1` - Grow và shrink, basis 0
- [ ] `flex-none` - Không grow, không shrink
- [ ] `flex-auto` - Grow và shrink, basis auto
- [ ] `grow` / `grow-0` - Control growing
- [ ] `shrink` / `shrink-0` - Control shrinking
- [ ] `order-{n}` - Thay đổi thứ tự
- [ ] `self-{start|center|end}` - Override alignment cho item

---

## Grid Checklist

### Container Properties
- [ ] `grid` - Tạo grid container
- [ ] `grid-cols-{1-12}` - Số cột
- [ ] `grid-rows-{1-6}` - Số hàng
- [ ] `gap-{size}` - Khoảng cách
- [ ] `gap-x-{size}` / `gap-y-{size}` - Gap riêng
- [ ] `grid-flow-row` / `grid-flow-col` - Hướng fill

### Item Properties
- [ ] `col-span-{1-12}` - Span nhiều cột
- [ ] `row-span-{1-6}` - Span nhiều hàng
- [ ] `col-span-full` - Full width
- [ ] `col-start-{n}` / `col-end-{n}` - Vị trí cụ thể

---

## Centering Patterns

### Flexbox Centering
```jsx
// Horizontal only
<div className="flex justify-center">

// Vertical only (cần height)
<div className="flex items-center h-screen">

// Both
<div className="flex items-center justify-center h-screen">
```

### Grid Centering
```jsx
// Quick way
<div className="grid place-items-center h-screen">

// Alternative
<div className="grid place-content-center h-screen">
```

---

## Common Patterns Checklist

- [ ] **Navbar:** `flex justify-between items-center`
- [ ] **Card Grid:** `grid grid-cols-{n} gap-{size}`
- [ ] **Sidebar Layout:** `flex` + `flex-none w-{size}` + `flex-1`
- [ ] **Center Everything:** `flex items-center justify-center h-screen`
- [ ] **Responsive Grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

---

## Mistakes to Avoid

| Mistake | Fix |
|---------|-----|
| `flex-1` without flex parent | Add `flex` to parent |
| `grid-cols-3` without grid | Add `grid` to same element |
| `gap-4` without flex/grid | Add `flex` or `grid` |
| Centering without height | Add `h-screen` or explicit height |
| Using `space-x` instead of `gap` | Prefer `gap` for consistency |

---

## Key Concepts Summary

### Flex vs Grid
| Flexbox | Grid |
|---------|------|
| 1 chiều (row OR column) | 2 chiều (rows AND columns) |
| Navbar, button groups | Product grids, dashboards |
| Content determines size | Structure determines size |

### Justify vs Items
| Property | Axis | Flex-row | Flex-col |
|----------|------|----------|----------|
| `justify-*` | Main axis | Horizontal | Vertical |
| `items-*` | Cross axis | Vertical | Horizontal |

### Flex Values
| Class | Grow | Shrink | Basis | Use Case |
|-------|------|--------|-------|----------|
| `flex-1` | 1 | 1 | 0% | Equal columns, flexible content |
| `flex-auto` | 1 | 1 | auto | Flexible based on content |
| `flex-none` | 0 | 0 | auto | Fixed size (logo, icons) |

---

## Session Exercises Completed

- [ ] Micro 1: Flex Centering (5 phút)
- [ ] Micro 2: Grid Columns (5 phút)
- [ ] Mini: Product Grid Layout (15 phút)
- [ ] Real: E-commerce Header + Product Section (45 phút)
- [ ] Quiz: >= 8/10

---

## Components Created

- [ ] `Header.tsx` - Navigation layout
- [ ] `ProductGrid.tsx` - Grid hiển thị ProductCards
- [ ] `FilterSidebar.tsx` - Placeholder cho session sau

---

## Quick Reference

```jsx
// Perfect centering
<div className="flex items-center justify-center h-screen">

// Navbar pattern
<nav className="flex justify-between items-center p-4">
  <div>Logo</div>
  <div className="flex gap-4">Links</div>
  <div>Actions</div>
</nav>

// Product grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.map(p => <ProductCard key={p.id} />)}
</div>

// Sidebar layout
<div className="flex">
  <aside className="flex-none w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```
