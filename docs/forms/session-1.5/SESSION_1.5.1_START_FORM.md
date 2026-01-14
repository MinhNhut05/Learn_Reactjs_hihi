# SESSION START FORM - Session 1.5.1

---

## SESSION INFO

**Session ID:** 1.5.1
**Session Title:** Core Concepts & Utility-First
**Module:** 1.5 - Tailwind CSS Mastery
**Phase:** Phase 1.5 - Tailwind CSS
**Roadmap Version:** V2.1

---

## SESSION CONTEXT

**Vi tri trong Roadmap:**
- **Phase 1.5:** Tailwind CSS Mastery (Session 1/7)
- **Module 1.5.1:** Tailwind Fundamentals (Session 1/2)
- **Previous Phase:** Phase 1 - React Foundation (Completed)
- **Next Session:** 1.5.2 - Flexbox & Grid Layout

**Prerequisites Completed:**
- Phase 1: React Foundation (All modules)
- Basic CSS knowledge
- React component structure

**Why This Session Important:**
- **Utility-First CSS** - Philosophy khac biet voi traditional CSS
- **Spacing System** - Consistent spacing across app
- **Typography & Colors** - Design fundamentals
- **Bat dau E-commerce project** - ProductCard component
- Foundation cho tat ca UI trong cac Phase sau

---

## LEARNING OBJECTIVES

Sau session nay, toi se:

1. **Utility-First Philosophy:**
   - Hieu tai sao utility-first
   - So sanh voi traditional CSS/CSS-in-JS
   - Pros & Cons

2. **Spacing System:**
   - Padding: p-{size}, px, py, pt, pb, pl, pr
   - Margin: m-{size}, mx, my, mt, mb, ml, mr
   - Space between: space-x, space-y
   - Gap: gap-{size}

3. **Typography:**
   - Font size: text-{size}
   - Font weight: font-{weight}
   - Line height: leading-{size}
   - Text color: text-{color}-{shade}

4. **Colors:**
   - Background: bg-{color}-{shade}
   - Text: text-{color}-{shade}
   - Border: border-{color}-{shade}
   - Color palette: 50-900 shades

5. **Sizing:**
   - Width: w-{size}, w-full, w-1/2
   - Height: h-{size}, h-screen
   - Max/Min: max-w-{size}, min-h-{size}

---

## PROJECT SETUP REQUEST

**TAO PROJECT MOI CHO PHASE 1.5:**

```
phase1.5/
├── tailwind-ecommerce/           <- TAO MOI
│   ├── src/
│   │   ├── components/
│   │   │   └── ProductCard.tsx   <- Session 1.5.1
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── session-docs/
    ├── session-1.5.1/
    │   ├── THEORY.md
    │   └── summary.md
    └── ...
```

**Setup Tailwind:**
- Vite + React + TypeScript
- Tailwind CSS v3.x
- PostCSS + Autoprefixer

---

## TEACHING STYLE

### **Learning Flow:**
```
PHASE 1: Doc ly thuyet (45-60p) -> Spacing, Typography, Colors
PHASE 2: Tom tat (15p)         -> Claude tao checklist
PHASE 3: Lam bai tap (60-75p)  -> Micro/Mini/Real exercises
PHASE 4: Quiz (15-20p)         -> Knowledge Check, pass >= 80%
```

### **Exercise Format: "Micro → Mini → Real"**

**Micro (5 phut):** Hoc syntax co ban, 1 file nho
**Mini (15-20 phut):** Ket hop vai concepts
**Real (45-60 phut):** Bai tap thuc te, chi mo ta yeu cau

---

## EXERCISES OVERVIEW

### **Micro 1: Spacing Classes (5 phut)**

**Yeu cau:**
```typescript
// Viet 1 div voi: padding 4, margin-top 2, margin-bottom 6
// Ben trong co 2 paragraphs voi khoang cach vertical 3
```

**Concepts practiced:**
- p-{size} syntax
- mt-{size}, mb-{size}
- space-y-{size}

**Expected output:**
- Div voi padding 1rem (p-4)
- Margin top 0.5rem, bottom 1.5rem
- 2 paragraphs cach nhau 0.75rem

---

### **Micro 2: Typography Classes (5 phut)**

**Yeu cau:**
```typescript
// Viet 1 heading voi: text 2xl, bold, mau gray-800
// Viet 1 paragraph voi: text base, mau gray-600, line-height relaxed
```

**Concepts practiced:**
- text-{size}
- font-{weight}
- text-{color}-{shade}
- leading-{type}

**Expected output:**
- Heading 1.5rem, bold, dark gray
- Paragraph 1rem, lighter gray, relaxed line spacing

---

### **Mini: Product Price Display (15 phut)**

**Yeu cau:**
```typescript
// Tao component hien thi gia san pham:
// - Ten san pham (heading style)
// - Gia goc (gach ngang, mau nhat)
// - Gia sale (mau do/xanh, bold, size lon hon)
// - Badge "Sale 20%" (background mau, text trang, padding nho)
```

**Concepts practiced:**
- Typography hierarchy
- Color combinations
- line-through decoration
- Inline badges

**Expected output:**
- Product name styled as heading
- Original price with strikethrough
- Sale price prominent
- Badge with background color

---

### **Real: Product Card E-commerce (45 phut)**

**Yeu cau:**
```typescript
// Xay dung ProductCard component cho trang E-commerce:
// - Hien thi anh san pham (co the dung placeholder)
// - Ten, gia goc, gia sale
// - Rating stars
// - Badge trang thai (New, Sale, Out of Stock)
// - Nut "Add to Cart"
//
// Yeu cau: Ap dung spacing, typography, colors hop ly
// Component nay se duoc dung tiep o cac session sau
```

**Concepts practiced:**
- All spacing utilities
- Typography scale
- Color system
- Component composition
- Practical E-commerce UI

**Expected output:**
- Complete ProductCard component
- Reusable across E-commerce project
- Clean, professional appearance

---

## DIFFICULTY & TIME ESTIMATE

**Do kho:** Easy-Medium (Concepts don gian, nhieu classes can nho)

**Thoi gian du kien:**
- Doc Theory: 45-60 phut
- Claude tom tat: 15 phut
- Micro 1 (Spacing): 5 phut
- Micro 2 (Typography): 5 phut
- Mini (Price Display): 15 phut
- Real (ProductCard): 45 phut
- Quiz: 15-20 phut

**Total:** ~2.5-3 hours

---

## SUCCESS CRITERIA

Session hoan thanh khi:

- [ ] Hoan thanh 2 Micro exercises
- [ ] Hoan thanh Mini exercise
- [ ] Hoan thanh Real exercise (ProductCard)
- [ ] Hieu spacing system (p, m, space, gap)
- [ ] Hieu typography utilities
- [ ] Hieu color system (shades 50-900)
- [ ] Quiz score >= 8/10
- [ ] ProductCard co the reuse o session sau

---

## COMMON PITFALLS (Se hoc cach tranh)

```html
<!-- Spacing - Confusing p vs m -->
<div class="p-4">  <!-- Padding INSIDE -->
<div class="m-4">  <!-- Margin OUTSIDE -->

<!-- Colors - Wrong shade direction -->
<p class="text-gray-200">  <!-- Qua nhat, kho doc -->
<p class="text-gray-800">  <!-- Dam, de doc -->
<!-- Quy tac: 50-300 = light, 400-600 = medium, 700-900 = dark -->

<!-- Typography - Missing font-weight -->
<h1 class="text-2xl">        <!-- Chi size, khong bold -->
<h1 class="text-2xl font-bold">  <!-- Dung -->

<!-- Space vs Gap -->
<div class="space-y-4">  <!-- Ap dung cho CHILDREN, can co children -->
<div class="flex gap-4"> <!-- Ap dung cho FLEX/GRID container -->

<!-- Responsive prefix order -->
<div class="md:p-4 p-2">  <!-- Sai thu tu -->
<div class="p-2 md:p-4">  <!-- Dung: mobile-first -->
```

---

## READY TO START

**AI, please:**

1. Setup project `tailwind-ecommerce` voi Vite + React + TypeScript + Tailwind
2. Tao folder structure nhu tren
3. Tao **THEORY.md** voi:
   - Utility-First Philosophy
   - Spacing system chi tiet
   - Typography utilities
   - Color system
   - Sizing utilities
   - Best practices
4. Tao **4 exercise files** theo Micro/Mini/Real format
5. Tao **summary.md** voi checklist
6. Tao **quiz.md** voi 10 cau hoi

**Luu y quan trong:**
- **KHONG fill-in-blank** - Tu code toan bo
- **Micro:** Chi mo ta yeu cau ngan
- **Mini:** Mo ta scenario + yeu cau
- **Real:** Mo ta use case thuc te
- **E-commerce theme:** Tat ca bai tap huong toi xay dung E-commerce UI
- **ProductCard:** Component quan trong, se dung lai o cac session sau

---

## KEY CONCEPTS TO COVER

### Spacing Scale:
```
0 = 0px
1 = 0.25rem (4px)
2 = 0.5rem (8px)
3 = 0.75rem (12px)
4 = 1rem (16px)
5 = 1.25rem (20px)
6 = 1.5rem (24px)
8 = 2rem (32px)
10 = 2.5rem (40px)
12 = 3rem (48px)
...
```

### Typography Scale:
```
text-xs   = 0.75rem
text-sm   = 0.875rem
text-base = 1rem
text-lg   = 1.125rem
text-xl   = 1.25rem
text-2xl  = 1.5rem
text-3xl  = 1.875rem
text-4xl  = 2.25rem
...
```

### Color Shades:
```
50  = lightest (background)
100 = very light
200 = light
300 = light medium
400 = medium
500 = base color
600 = medium dark
700 = dark
800 = very dark
900 = darkest (text)
```

---

## E-COMMERCE PROJECT PROGRESS

**Session 1.5.1 - ProductCard:**
```
[x] ProductCard component
[ ] Header (Session 1.5.2)
[ ] Product Grid (Session 1.5.2)
[ ] Responsive (Session 1.5.3)
[ ] Hover effects (Session 1.5.4)
[ ] Design System (Session 1.5.5)
[ ] Modals & Dropdowns (Session 1.5.6)
```

---

**LET'S START TAILWIND CSS MASTERY!**

---

**VERSION:** 1.0
**CREATED:** 2025-01-11
**FOR:** Session 1.5.1 - Core Concepts & Utility-First
**FORMAT:** Micro/Mini/Real (Self-code)
**THEME:** E-commerce
