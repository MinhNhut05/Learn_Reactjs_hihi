# SESSION START FORM - Session 1.5.4

---

## SESSION INFO

**Session ID:** 1.5.4
**Session Title:** States & Interactivity
**Module:** 1.5 - Tailwind CSS Mastery
**Phase:** Phase 1.5 - Tailwind CSS
**Roadmap Version:** V2.1

---

## SESSION CONTEXT

**Vi tri trong Roadmap:**
- **Phase 1.5:** Tailwind CSS Mastery (Session 4/7)
- **Module 1.5.2:** Responsive & Interactive (Session 2/2)
- **Previous Session:** 1.5.3 - Responsive Design (Completed)
- **Next Session:** 1.5.5 - Custom Configuration & Design System

**Prerequisites Completed:**
- Session 1.5.1: Spacing, Typography, Colors
- Session 1.5.2: Flexbox & Grid Layout
- Session 1.5.3: Responsive Design
- E-commerce layout responsive

**Why This Session Important:**
- **Hover, Focus, Active** - User interaction feedback
- **Group & Peer** - Parent/sibling-based styling
- **Transitions** - Smooth state changes
- **Dark Mode** - Theme switching
- Professional interactive UI

---

## LEARNING OBJECTIVES

Sau session nay, toi se:

1. **State Modifiers:**
   - hover: - Mouse over
   - focus: - Keyboard focus
   - active: - Click/tap
   - disabled: - Disabled state

2. **Group Pattern:**
   - group class on parent
   - group-hover: on children
   - Tooltip, card hover effects

3. **Peer Pattern:**
   - peer class on sibling
   - peer-focus:, peer-invalid:
   - Form validation UI

4. **Transitions & Animations:**
   - transition-{property}
   - duration-{time}
   - ease-{type}
   - animate-{name}

5. **Dark Mode:**
   - dark: prefix
   - darkMode config
   - System preference vs toggle

---

## PROJECT CONTINUATION

**CAP NHAT PROJECT DA CO:**

```
phase1.5/
└── tailwind-ecommerce/
    └── src/
        └── components/
            ├── ProductCard.tsx      (Update: hover effects)
            ├── Header.tsx           (Update: dropdown, focus)
            ├── ProductGrid.tsx      (Exists)
            ├── FilterSidebar.tsx    (Exists)
            ├── Button.tsx           <- TAO MOI (variants)
            └── Input.tsx            <- TAO MOI (focus states)
```

---

## TEACHING STYLE

### **Learning Flow:**
```
PHASE 1: Doc ly thuyet (45-60p) -> States, Group/Peer, Transitions
PHASE 2: Tom tat (15p)         -> Claude tao checklist
PHASE 3: Lam bai tap (60-75p)  -> Micro/Mini/Real exercises
PHASE 4: Quiz (15-20p)         -> Knowledge Check, pass >= 80%
```

---

## EXERCISES OVERVIEW

### **Micro 1: Hover Button (5 phut)**

**Yeu cau:**
```typescript
// Tao button voi: hover doi mau background, active scale nho lai
```

**Concepts practiced:**
- hover:bg-{color}
- active:scale-95
- transition

**Expected output:**
- Button changes color on hover
- Button shrinks slightly on click

---

### **Micro 2: Focus Input (5 phut)**

**Yeu cau:**
```typescript
// Tao input voi: focus co ring xanh, border trong suot
```

**Concepts practiced:**
- focus:ring-2
- focus:ring-{color}
- focus:border-transparent
- outline-none

**Expected output:**
- Input shows blue ring when focused
- Clean focus indicator

---

### **Mini: Interactive ProductCard (15 phut)**

**Yeu cau:**
```typescript
// Them interactivity cho ProductCard:
// - Hover: shadow lon hon, translate Y len tren
// - Hover vao anh: anh scale len (dung group pattern)
// - Button Add to Cart: hover/active states
// - Transition smooth
```

**Concepts practiced:**
- group pattern
- hover:shadow-xl
- hover:-translate-y-1
- group-hover:scale-105
- transition-all

**Expected output:**
- Card lifts on hover
- Image zooms on card hover
- Button has proper states
- All transitions smooth

---

### **Real: E-commerce voi Full Interactivity (45 phut)**

**Yeu cau:**
```typescript
// Hoan thien trang E-commerce voi states:
//
// HEADER:
// - Search input voi focus states
// - Cart icon co badge so luong
// - Dropdown menu khi hover user icon (group pattern)
//
// PRODUCT CARDS:
// - Tat ca hover effects tu Mini exercise
// - "Quick View" button hien khi hover card
// - Heart icon (wishlist) toggle on click
//
// Tuy chon: Them dark mode toggle
```

**Concepts practiced:**
- Complete interactive UI
- Group hover patterns
- Focus states for forms
- Hidden on hover reveals
- Dark mode (optional)

**Expected output:**
- Full interactive E-commerce page
- Professional hover effects
- Form focus states
- Smooth transitions everywhere

---

## DIFFICULTY & TIME ESTIMATE

**Do kho:** Medium-Hard (Nhieu patterns moi)

**Thoi gian du kien:**
- Doc Theory: 45-60 phut
- Claude tom tat: 15 phut
- Micro 1 (Hover Button): 5 phut
- Micro 2 (Focus Input): 5 phut
- Mini (Interactive Card): 15 phut
- Real (Full Interactivity): 45 phut
- Quiz: 15-20 phut

**Total:** ~2.5-3 hours

---

## SUCCESS CRITERIA

Session hoan thanh khi:

- [ ] Hoan thanh 2 Micro exercises
- [ ] Hoan thanh Mini exercise
- [ ] Hoan thanh Real exercise
- [ ] Hieu hover, focus, active states
- [ ] Hieu group pattern
- [ ] Biet dung transitions
- [ ] Quiz score >= 8/10
- [ ] E-commerce co full hover effects

---

## COMMON PITFALLS (Se hoc cach tranh)

```html
<!-- Forgetting transition -->
<button class="bg-blue-500 hover:bg-blue-600">  <!-- Instant change -->
<button class="bg-blue-500 hover:bg-blue-600 transition-colors">  <!-- Smooth -->

<!-- Group pattern - missing group class -->
<div>
  <img class="group-hover:scale-105">  <!-- Won't work! -->
</div>
<!-- Dung: -->
<div class="group">
  <img class="group-hover:scale-105">  <!-- Works -->
</div>

<!-- Peer pattern - wrong order -->
<p class="peer-focus:visible">Message</p>
<input class="peer">  <!-- peer MUST come before peer-* elements -->
<!-- Dung: -->
<input class="peer">
<p class="peer-focus:visible">Message</p>

<!-- Transition on wrong property -->
<div class="transition hover:scale-105">  <!-- transition alone = all -->
<div class="transition-transform hover:scale-105">  <!-- More performant -->

<!-- Dark mode - forgetting base color -->
<div class="dark:bg-gray-800">  <!-- No color on light mode! -->
<div class="bg-white dark:bg-gray-800">  <!-- Correct -->
```

---

## READY TO START

**AI, please:**

1. Tao **THEORY.md** voi:
   - State modifiers chi tiet
   - Group pattern
   - Peer pattern
   - Transitions & animations
   - Dark mode setup
   - Best practices
2. Tao **4 exercise files** theo Micro/Mini/Real format
3. Tao **Button.tsx** va **Input.tsx** components
4. **UPDATE ProductCard, Header** voi hover effects
5. Tao **summary.md** voi checklist
6. Tao **quiz.md** voi 8-10 cau hoi

**Luu y quan trong:**
- **GROUP PATTERN** rat quan trong - can master
- **TRANSITIONS** cho moi interaction
- **DARK MODE** la optional nhung nen lam
- **PERFORMANCE** - transition-{property} thay vi transition

---

## KEY CONCEPTS TO COVER

### State Modifiers:
```html
<!-- Hover -->
<button class="bg-blue-500 hover:bg-blue-600">

<!-- Focus -->
<input class="border focus:ring-2 focus:ring-blue-500 focus:border-transparent">

<!-- Active -->
<button class="active:scale-95">

<!-- Disabled -->
<button class="disabled:opacity-50 disabled:cursor-not-allowed">
```

### Group Pattern:
```html
<!-- Parent controls children -->
<div class="group">
  <img class="group-hover:scale-105 transition-transform">
  <div class="opacity-0 group-hover:opacity-100 transition-opacity">
    Overlay
  </div>
</div>
```

### Peer Pattern:
```html
<!-- Sibling controls sibling -->
<input class="peer" placeholder="Email">
<p class="invisible peer-focus:visible">Enter your email</p>
<p class="hidden peer-invalid:block text-red-500">Invalid email</p>
```

### Transitions:
```html
<div class="transition-all duration-300 ease-in-out">
<div class="transition-colors duration-200">
<div class="transition-transform duration-150">
<div class="transition-opacity duration-500">
```

### Dark Mode:
```html
<!-- In component -->
<div class="bg-white dark:bg-gray-900">
<p class="text-gray-900 dark:text-white">

<!-- In tailwind.config.js -->
module.exports = {
  darkMode: 'class', // or 'media'
}

<!-- Toggle with class on html -->
<html class="dark">
```

---

## E-COMMERCE PROJECT PROGRESS

**Session 1.5.4 - Interactivity:**
```
[x] ProductCard component (1.5.1)
[x] Header component (1.5.2)
[x] ProductGrid component (1.5.2)
[x] FilterSidebar placeholder (1.5.2)
[x] All components RESPONSIVE (1.5.3)
[x] All components INTERACTIVE
[x] Button & Input components
[ ] Design System (Session 1.5.5)
[ ] Modals & Dropdowns (Session 1.5.6)
```

---

**LET'S MASTER STATES & INTERACTIVITY!**

---

**VERSION:** 1.0
**CREATED:** 2025-01-11
**FOR:** Session 1.5.4 - States & Interactivity
**FORMAT:** Micro/Mini/Real (Self-code)
**THEME:** E-commerce
**PREVIOUS SESSION:** 1.5.3 - Responsive Design
