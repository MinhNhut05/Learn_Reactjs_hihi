# Session 1.5.3 - Responsive Design - Quiz

## Instructions
- 10 câu hỏi trắc nghiệm
- Chọn đáp án đúng nhất
- Đáp án ở cuối file
- Mục tiêu: 8/10 để pass

---

## Questions

### Q1: Mobile-First Approach
Trong Tailwind CSS, mobile-first có nghĩa là gì?

A) Luôn thiết kế desktop trước, sau đó thu nhỏ cho mobile
B) Base styles áp dụng cho mobile, breakpoint prefixes thêm cho màn hình lớn hơn
C) Chỉ support mobile devices
D) Phải dùng `mobile:` prefix cho mobile styles

---

### Q2: Breakpoint Min-Width
Breakpoint `md:` trong Tailwind có min-width là bao nhiêu?

A) 640px
B) 768px
C) 1024px
D) 1280px

---

### Q3: Show/Hide Pattern
Để ẩn một element trên mobile và hiện từ tablet trở lên, bạn dùng class nào?

A) `block md:hidden`
B) `hidden md:block`
C) `md:block`
D) `visible md:hidden`

---

### Q4: Responsive Grid
Code nào tạo grid với 1 column trên mobile, 2 trên tablet, 4 trên desktop?

A) `grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1`
B) `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
C) `grid cols-1 md:cols-2 lg:cols-4`
D) `flex flex-col md:flex-row lg:grid-cols-4`

---

### Q5: Flex Direction
Để stack items theo chiều dọc trên mobile và ngang trên desktop, bạn dùng:

A) `flex flex-row md:flex-col`
B) `flex flex-col md:flex-row`
C) `block md:flex`
D) `stack md:row`

---

### Q6: Common Mistake
Đoạn code sau có vấn đề gì?
```jsx
<div className="md:block">Content</div>
```

A) Thiếu `flex` parent
B) Thiếu base display class, element sẽ có behavior không xác định
C) `md:block` là invalid class
D) Không có vấn đề gì

---

### Q7: Breakpoint Order
Thứ tự breakpoints từ nhỏ đến lớn trong Tailwind là:

A) xs, sm, md, lg, xl, 2xl
B) (none), sm, md, lg, xl, 2xl
C) mobile, tablet, desktop, wide
D) sm, md, lg, xl, xxl

---

### Q8: Container Class
Class `container mx-auto` làm gì?

A) Tạo một container full-width không giới hạn
B) Tạo container với max-width responsive và center horizontally
C) Chỉ center element mà không set max-width
D) Tạo flexbox container

---

### Q9: Responsive Navigation
Cho responsive header với hamburger menu trên mobile và full nav trên desktop, code nào đúng?

A)
```jsx
<button className="hidden lg:block">☰</button>
<nav className="block lg:hidden">Links</nav>
```

B)
```jsx
<button className="block lg:hidden">☰</button>
<nav className="hidden lg:flex">Links</nav>
```

C)
```jsx
<button className="lg:hidden">☰</button>
<nav className="lg:block">Links</nav>
```

D)
```jsx
<button className="mobile:block">☰</button>
<nav className="desktop:flex">Links</nav>
```

---

### Q10: Responsive Spacing
Để tăng padding từ 16px (mobile) → 24px (tablet) → 32px (desktop), bạn dùng:

A) `p-16 md:p-24 lg:p-32`
B) `p-4 md:p-6 lg:p-8`
C) `padding-4 md:padding-6 lg:padding-8`
D) `p-sm md:p-md lg:p-lg`

---

## Bonus Questions

### B1: Responsive Order
Để element hiển thị đầu tiên trên desktop nhưng cuối cùng trên mobile:

A) `order-last md:order-first`
B) `order-first md:order-last`
C) `last md:first`
D) `-order-1 md:order-1`

---

### B2: Best Practice
Khi làm responsive, best practice là:

A) Dùng tất cả 6 breakpoints cho mọi element
B) Bắt đầu với desktop styles, sau đó override cho mobile
C) Bắt đầu với mobile styles, chỉ thêm breakpoints khi cần thiết
D) Luôn dùng pixel values thay vì Tailwind utilities

---

## Answer Key

<details>
<summary>Click để xem đáp án</summary>

### Answers

| Question | Answer | Explanation |
|----------|--------|-------------|
| Q1 | **B** | Mobile-first: base styles cho mobile, breakpoint prefixes (sm:, md:, lg:...) cho màn hình lớn hơn |
| Q2 | **B** | md: = 768px (tablet). sm=640, lg=1024, xl=1280 |
| Q3 | **B** | `hidden md:block` - hidden mặc định (mobile), block từ md (768px+) |
| Q4 | **B** | Mobile-first: `grid-cols-1` → `md:grid-cols-2` → `lg:grid-cols-4` |
| Q5 | **B** | `flex-col` (vertical) mặc định, `md:flex-row` (horizontal) từ tablet |
| Q6 | **B** | Thiếu base class. Nên là `hidden md:block` hoặc `block md:hidden` |
| Q7 | **B** | (none/base), sm(640), md(768), lg(1024), xl(1280), 2xl(1536) |
| Q8 | **B** | `container` sets responsive max-width, `mx-auto` centers horizontally |
| Q9 | **B** | Hamburger: `block lg:hidden`, Nav: `hidden lg:flex` |
| Q10 | **B** | p-4=16px, p-6=24px, p-8=32px (multiply by 4) |
| B1 | **A** | `order-last` mặc định (mobile), `md:order-first` từ tablet |
| B2 | **C** | Mobile-first, chỉ thêm breakpoints khi thực sự cần |

### Scoring

| Score | Level |
|-------|-------|
| 10-12 | Excellent! Ready for next session |
| 8-9 | Good! Review missed concepts |
| 6-7 | Fair. Re-read THEORY.md |
| < 6 | Need more practice. Redo exercises |

### Common Mistakes Explained

**Q3 & Q6 - Show/Hide:**
```jsx
// ❌ WRONG - No base class
<div className="md:block">

// ✅ CORRECT - Has base class
<div className="hidden md:block">
```

**Q4 - Grid responsive:**
```jsx
// ❌ WRONG - Desktop-first (backwards)
grid-cols-4 md:grid-cols-2 sm:grid-cols-1

// ✅ CORRECT - Mobile-first
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

**Q10 - Spacing values:**
```
Tailwind spacing = value × 4px
p-4  = 4 × 4 = 16px
p-6  = 6 × 4 = 24px
p-8  = 8 × 4 = 32px
p-16 = 16 × 4 = 64px (not 16px!)
```

</details>

---

## Breakpoint Reference Card

```
Breakpoint | Min-Width | Target
-----------|-----------|--------
(none)     | 0px       | Mobile phones
sm:        | 640px     | Large phones
md:        | 768px     | Tablets
lg:        | 1024px    | Laptops
xl:        | 1280px    | Desktops
2xl:       | 1536px    | Large screens
```

## Pattern Cheat Sheet

```jsx
// Show/Hide
hidden md:block     // Desktop only
block md:hidden     // Mobile only

// Grid
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Flex Direction
flex flex-col md:flex-row

// Spacing
p-4 md:p-6 lg:p-8
gap-4 md:gap-6

// Container
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

---

**Your Score: _____ / 12**

**Ready for Session 1.5.4?** ☐ Yes ☐ Need review
