# SESSION START FORM - Session 1.5.2

---

## SESSION INFO

**Session ID:** 1.5.2
**Session Title:** Flexbox & Grid Layout
**Module:** 1.5 - Tailwind CSS Mastery
**Phase:** Phase 1.5 - Tailwind CSS
**Roadmap Version:** V2.1

---

## SESSION CONTEXT

**Vi tri trong Roadmap:**
- **Phase 1.5:** Tailwind CSS Mastery (Session 2/7)
- **Module 1.5.1:** Tailwind Fundamentals (Session 2/2)
- **Previous Session:** 1.5.1 - Core Concepts & Utility-First (Completed)
- **Next Session:** 1.5.3 - Responsive Design

**Prerequisites Completed:**
- Session 1.5.1: Spacing, Typography, Colors
- ProductCard component da tao

**Why This Session Important:**
- **Flexbox** - Layout 1 chieu, alignment
- **Grid** - Layout 2 chieu, complex layouts
- **E-commerce Header** - Navigation layout
- **Product Grid** - Display multiple ProductCards
- Foundation cho responsive design

---

## LEARNING OBJECTIVES

Sau session nay, toi se:

1. **Flexbox Basics:**
   - flex, inline-flex
   - flex-row, flex-col
   - justify-{position}
   - items-{position}
   - gap-{size}

2. **Flexbox Items:**
   - flex-1, flex-none, flex-auto
   - flex-grow, flex-shrink
   - order-{n}
   - self-{position}

3. **Grid Basics:**
   - grid, inline-grid
   - grid-cols-{n}
   - grid-rows-{n}
   - gap-{size}, gap-x, gap-y

4. **Grid Items:**
   - col-span-{n}
   - row-span-{n}
   - col-start, col-end

5. **Centering Patterns:**
   - flex items-center justify-center
   - grid place-items-center

---

## PROJECT CONTINUATION

**SU DUNG PROJECT DA CO:**

```
phase1.5/
└── tailwind-ecommerce/
    └── src/
        └── components/
            ├── ProductCard.tsx      (Session 1.5.1 - Exists)
            ├── Header.tsx           <- TAO MOI
            ├── ProductGrid.tsx      <- TAO MOI
            └── FilterSidebar.tsx    <- TAO MOI
```

---

## TEACHING STYLE

### **Learning Flow:**
```
PHASE 1: Doc ly thuyet (45-60p) -> Flexbox & Grid utilities
PHASE 2: Tom tat (15p)         -> Claude tao checklist
PHASE 3: Lam bai tap (60-75p)  -> Micro/Mini/Real exercises
PHASE 4: Quiz (15-20p)         -> Knowledge Check, pass >= 80%
```

---

## EXERCISES OVERVIEW

### **Micro 1: Flex Centering (5 phut)**

**Yeu cau:**
```typescript
// Viet 1 div can giua ca ngang va doc bang flexbox
// Chieu cao full viewport
```

**Concepts practiced:**
- flex
- items-center
- justify-center
- h-screen

**Expected output:**
- Content centered both horizontally and vertically
- Full viewport height

---

### **Micro 2: Grid Columns (5 phut)**

**Yeu cau:**
```typescript
// Tao grid 3 cot deu nhau voi gap 4
// Moi cot chua 1 div co background mau khac nhau
```

**Concepts practiced:**
- grid
- grid-cols-3
- gap-4

**Expected output:**
- 3 equal columns
- 1rem gap between columns

---

### **Mini: Product Grid Layout (15 phut)**

**Yeu cau:**
```typescript
// Su dung ProductCard da tao o Session 1.5.1
// Hien thi 4-6 products trong grid:
// - Mobile: 1 cot
// - Tablet: 2 cot
// - Desktop: 3 cot
// - Gap hop ly
```

**Concepts practiced:**
- Responsive grid (chua day du - preview)
- grid-cols with breakpoints
- Using existing components

**Expected output:**
- Grid of ProductCards
- Responsive columns (basic)

---

### **Real: E-commerce Header + Product Section (45 phut)**

**Yeu cau:**
```typescript
// Xay dung layout cho trang chu E-commerce:
//
// HEADER:
// - Logo ben trai
// - Search bar o giua
// - Cart icon + User icon ben phai
//
// PRODUCT SECTION:
// - Tieu de "Featured Products"
// - Grid ProductCard responsive (dung component da tao)
// - Filter sidebar ben trai (desktop only)
//
// Component nay se duoc mo rong o cac session sau
```

**Concepts practiced:**
- Complex flex layouts
- justify-between
- flex-1 for flexible sections
- Grid for product display
- Component composition

**Expected output:**
- Complete header with logo, search, icons
- Product section with grid
- Filter sidebar placeholder
- Professional E-commerce layout

---

## DIFFICULTY & TIME ESTIMATE

**Do kho:** Medium (Layout concepts, nhieu patterns)

**Thoi gian du kien:**
- Doc Theory: 45-60 phut
- Claude tom tat: 15 phut
- Micro 1 (Flex Centering): 5 phut
- Micro 2 (Grid Columns): 5 phut
- Mini (Product Grid): 15 phut
- Real (Header + Section): 45 phut
- Quiz: 15-20 phut

**Total:** ~2.5-3 hours

---

## SUCCESS CRITERIA

Session hoan thanh khi:

- [ ] Hoan thanh 2 Micro exercises
- [ ] Hoan thanh Mini exercise
- [ ] Hoan thanh Real exercise (Header + Product Section)
- [ ] Hieu flex container va items
- [ ] Hieu grid container va items
- [ ] Biet centering patterns
- [ ] Quiz score >= 8/10
- [ ] E-commerce layout co Header + Product Grid

---

## COMMON PITFALLS (Se hoc cach tranh)

```html
<!-- Flex - Forgetting to set flex container -->
<div>
  <div class="flex-1">  <!-- Khong hoat dong! Parent khong phai flex -->
</div>
<!-- Dung: -->
<div class="flex">
  <div class="flex-1">  <!-- Hoat dong -->
</div>

<!-- Grid - Wrong responsive pattern -->
<div class="grid-cols-1 md:grid-cols-3">  <!-- Thieu "grid" -->
<!-- Dung: -->
<div class="grid grid-cols-1 md:grid-cols-3">

<!-- Justify vs Items -->
<div class="flex justify-center">  <!-- Horizontal center -->
<div class="flex items-center">    <!-- Vertical center -->
<div class="flex justify-center items-center">  <!-- Both -->

<!-- Gap only works on flex/grid -->
<div class="gap-4">  <!-- Khong hoat dong! -->
<div class="flex gap-4">  <!-- Hoat dong -->

<!-- space-x/y vs gap -->
<div class="flex space-x-4">  <!-- Works but gap is preferred -->
<div class="flex gap-4">       <!-- Recommended -->
```

---

## READY TO START

**AI, please:**

1. Tao **THEORY.md** voi:
   - Flexbox utilities chi tiet
   - Grid utilities chi tiet
   - Centering patterns
   - Common layout patterns
   - Best practices
2. Tao **4 exercise files** theo Micro/Mini/Real format
3. Tao **3 component files** (Header, ProductGrid, FilterSidebar)
4. Tao **summary.md** voi checklist
5. Tao **quiz.md** voi 10 cau hoi (8 da co trong roadmap)

**Luu y quan trong:**
- **SU DUNG ProductCard** tu session 1.5.1
- **Header component** se duoc mo rong o session 1.5.4 (hover effects)
- **ProductGrid** se duoc responsive hoa o session 1.5.3
- **FilterSidebar** chi la placeholder, se hoat dong o session sau

---

## KEY CONCEPTS TO COVER

### Flexbox Container:
```html
<div class="flex">           <!-- display: flex -->
<div class="flex flex-col">  <!-- flex-direction: column -->
<div class="flex flex-wrap"> <!-- flex-wrap: wrap -->

<!-- Alignment -->
<div class="flex justify-start">    <!-- Main axis: start -->
<div class="flex justify-center">   <!-- Main axis: center -->
<div class="flex justify-end">      <!-- Main axis: end -->
<div class="flex justify-between">  <!-- Main axis: space-between -->

<div class="flex items-start">   <!-- Cross axis: start -->
<div class="flex items-center">  <!-- Cross axis: center -->
<div class="flex items-end">     <!-- Cross axis: end -->
```

### Grid Container:
```html
<div class="grid grid-cols-3">      <!-- 3 equal columns -->
<div class="grid grid-cols-12">     <!-- 12-column system -->
<div class="grid grid-cols-[200px_1fr_1fr]">  <!-- Custom widths -->

<!-- Responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

### Common Patterns:
```html
<!-- Navbar -->
<nav class="flex justify-between items-center">
  <div>Logo</div>
  <div class="flex gap-4">Links</div>
  <div>Actions</div>
</nav>

<!-- Card Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards -->
</div>

<!-- Sidebar Layout -->
<div class="flex">
  <aside class="w-64">Sidebar</aside>
  <main class="flex-1">Content</main>
</div>
```

---

## E-COMMERCE PROJECT PROGRESS

**Session 1.5.2 - Header + Grid:**
```
[x] ProductCard component (1.5.1)
[x] Header component
[x] ProductGrid component
[x] FilterSidebar placeholder
[ ] Responsive layout (Session 1.5.3)
[ ] Hover effects (Session 1.5.4)
[ ] Design System (Session 1.5.5)
[ ] Modals & Dropdowns (Session 1.5.6)
```

---

**LET'S MASTER FLEXBOX & GRID!**

---

**VERSION:** 1.0
**CREATED:** 2025-01-11
**FOR:** Session 1.5.2 - Flexbox & Grid Layout
**FORMAT:** Micro/Mini/Real (Self-code)
**THEME:** E-commerce
**PREVIOUS SESSION:** 1.5.1 - Core Concepts
