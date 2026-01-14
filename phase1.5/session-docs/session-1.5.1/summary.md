# Session 1.5.1 Summary - Core Concepts & Utility-First

## Checklist hoàn thành session

### Concepts đã học

- [ ] **Utility-First Philosophy**
  - [ ] Hiểu utility-first là gì và tại sao dùng
  - [ ] So sánh được với traditional CSS
  - [ ] Biết pros và cons

- [ ] **Spacing System**
  - [ ] Padding: `p-*`, `px-*`, `py-*`, `pt/pb/pl/pr-*`
  - [ ] Margin: `m-*`, `mx-*`, `my-*`, `mt/mb/ml/mr-*`
  - [ ] Space between: `space-x-*`, `space-y-*`
  - [ ] Gap (flex/grid): `gap-*`, `gap-x-*`, `gap-y-*`
  - [ ] Hiểu spacing scale (0, 1, 2, 3, 4, 5, 6, 8, 10, 12...)

- [ ] **Typography**
  - [ ] Font size: `text-xs/sm/base/lg/xl/2xl/3xl...`
  - [ ] Font weight: `font-normal/medium/semibold/bold`
  - [ ] Line height: `leading-tight/normal/relaxed/loose`
  - [ ] Text color: `text-{color}-{shade}`
  - [ ] Text decoration: `underline`, `line-through`
  - [ ] Text transform: `uppercase`, `lowercase`, `capitalize`

- [ ] **Color System**
  - [ ] Background: `bg-{color}-{shade}`
  - [ ] Text: `text-{color}-{shade}`
  - [ ] Border: `border-{color}-{shade}`
  - [ ] Hiểu shade scale (50-950)
  - [ ] Biết chọn contrast phù hợp

- [ ] **Sizing**
  - [ ] Width: `w-*`, `w-full`, `w-1/2`, `w-screen`
  - [ ] Height: `h-*`, `h-full`, `h-screen`
  - [ ] Max/Min: `max-w-*`, `min-h-*`

### Exercises hoàn thành

- [ ] **Micro 1: Spacing** (5 phút)
  - Tạo container với padding, margin
  - Sử dụng space-y cho vertical spacing

- [ ] **Micro 2: Typography** (5 phút)
  - Tạo heading với font size, weight, color
  - Tạo paragraph với line-height relaxed
  - Tạo label với uppercase, small text

- [ ] **Mini: Price Display** (15-20 phút)
  - Product name với heading style
  - Original price với strikethrough
  - Sale price với accent color
  - Sale badge với background color

- [ ] **Real: ProductCard** (45-60 phút)
  - Image placeholder
  - Status badge (NEW/SALE/SOLD OUT)
  - Product info (category, name, description)
  - Rating stars
  - Price section
  - Add to Cart button với disabled state

### Quiz

- [ ] Đạt ≥ 8/10 câu đúng

---

## Quick Reference

### Spacing Scale (hay dùng nhất)

| Class | Value | Pixels |
|-------|-------|--------|
| `*-0` | 0 | 0px |
| `*-1` | 0.25rem | 4px |
| `*-2` | 0.5rem | 8px |
| `*-3` | 0.75rem | 12px |
| `*-4` | 1rem | 16px |
| `*-6` | 1.5rem | 24px |
| `*-8` | 2rem | 32px |

### Typography Scale

| Class | Size |
|-------|------|
| `text-xs` | 12px |
| `text-sm` | 14px |
| `text-base` | 16px |
| `text-lg` | 18px |
| `text-xl` | 20px |
| `text-2xl` | 24px |

### Color Shades

| Range | Use case |
|-------|----------|
| 50-200 | Light backgrounds |
| 300-400 | Borders, disabled |
| 500-600 | Primary colors |
| 700-900 | Text, headings |

---

## Common Mistakes to Avoid

```jsx
// ❌ Padding vs Margin confusion
<div className="p-4">  // Padding INSIDE element
<div className="m-4">  // Margin OUTSIDE element

// ❌ Wrong color shade for text
<p className="text-gray-200">  // Quá nhạt, khó đọc
<p className="text-gray-800">  // ✅ Đủ đậm

// ❌ Missing font-weight for headings
<h1 className="text-2xl">           // Thiếu bold
<h1 className="text-2xl font-bold"> // ✅ Đúng

// ❌ space vs gap confusion
<div className="space-y-4">         // For stacked children
<div className="flex gap-4">        // ✅ For flex containers

// ❌ Wrong responsive order
<div className="md:p-4 p-2">        // Desktop-first
<div className="p-2 md:p-4">        // ✅ Mobile-first
```

---

## E-commerce Project Progress

**Session 1.5.1:**
- ✅ ProductCard component

**Coming up:**
- Session 1.5.2: Header + Product Grid (Flexbox & Grid)
- Session 1.5.3: Responsive Design
- Session 1.5.4: Hover Effects & Animations
- Session 1.5.5: Design System & Custom Theme
- Session 1.5.6: Modals & Dropdowns

---

## Files đã tạo

```
phase1.5/
├── tailwind-ecommerce/
│   ├── src/
│   │   ├── exercises/
│   │   │   ├── Micro1-Spacing.tsx
│   │   │   ├── Micro1-Spacing-Solution.tsx
│   │   │   ├── Micro2-Typography.tsx
│   │   │   ├── Micro2-Typography-Solution.tsx
│   │   │   ├── Mini-PriceDisplay.tsx
│   │   │   ├── Mini-PriceDisplay-Solution.tsx
│   │   │   ├── Real-ProductCard.tsx
│   │   │   └── Real-ProductCard-Solution.tsx
│   │   ├── App.tsx
│   │   └── index.css
│   ├── vite.config.ts
│   └── package.json
│
└── session-docs/
    └── session-1.5.1/
        ├── THEORY.md
        ├── summary.md
        └── quiz.md
```

---

**Next Session:** 1.5.2 - Flexbox & Grid Layout
