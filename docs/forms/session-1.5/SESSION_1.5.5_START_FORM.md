# SESSION START FORM - Session 1.5.5

---

## SESSION INFO

**Session ID:** 1.5.5
**Session Title:** Custom Configuration & Design System
**Module:** 1.5 - Tailwind CSS Mastery
**Phase:** Phase 1.5 - Tailwind CSS
**Roadmap Version:** V2.1

---

## SESSION CONTEXT

**Vi tri trong Roadmap:**
- **Phase 1.5:** Tailwind CSS Mastery (Session 5/7)
- **Module 1.5.3:** Advanced Tailwind (Session 1/2)
- **Previous Session:** 1.5.4 - States & Interactivity (Completed)
- **Next Session:** 1.5.6 - Headless UI & Production

**Prerequisites Completed:**
- Session 1.5.1-1.5.4: All Tailwind basics
- E-commerce layout with interactivity

**Why This Session Important:**
- **Custom Configuration** - Brand colors, fonts, spacing
- **Design System** - Consistent UI across app
- **@apply Directive** - Reusable component classes
- **CSS Variables** - Dynamic theming
- Professional codebase organization

---

## LEARNING OBJECTIVES

Sau session nay, toi se:

1. **tailwind.config.js:**
   - extend vs override
   - Custom colors
   - Custom fonts
   - Custom spacing
   - Custom animations

2. **@apply Directive:**
   - Creating component classes
   - @layer components
   - @layer utilities
   - When to use vs when NOT to use

3. **CSS Variables:**
   - Integration with Tailwind
   - Dynamic theming
   - Dark mode with variables

4. **Plugins:**
   - @tailwindcss/forms
   - @tailwindcss/typography
   - Custom plugins

---

## PROJECT CONTINUATION

**CAP NHAT PROJECT DA CO:**

```
phase1.5/
└── tailwind-ecommerce/
    ├── tailwind.config.js      <- UPDATE: custom config
    ├── src/
    │   ├── styles/
    │   │   └── components.css  <- TAO MOI: @apply classes
    │   └── components/
    │       ├── ProductCard.tsx  (Update: use design system)
    │       ├── Header.tsx       (Update: use design system)
    │       ├── Button.tsx       (Update: use design system)
    │       └── Input.tsx        (Update: use design system)
```

---

## TEACHING STYLE

### **Learning Flow:**
```
PHASE 1: Doc ly thuyet (45-60p) -> Config, @apply, Variables
PHASE 2: Tom tat (15p)         -> Claude tao checklist
PHASE 3: Lam bai tap (60-75p)  -> Micro/Mini/Real exercises
PHASE 4: Quiz (15-20p)         -> Knowledge Check, pass >= 80%
```

---

## EXERCISES OVERVIEW

### **Micro 1: Custom Color (5 phut)**

**Yeu cau:**
```typescript
// Them mau "brand" vao tailwind.config.js
// Su dung: bg-brand-500, text-brand-600
```

**Concepts practiced:**
- extend.colors
- Color palette structure
- Using custom colors

**Expected output:**
- Brand color available in utilities
- Multiple shades (50-900)

---

### **Micro 2: @apply (5 phut)**

**Yeu cau:**
```typescript
// Tao class .btn-primary voi @apply trong globals.css
// Bao gom: padding, background, hover, focus ring
```

**Concepts practiced:**
- @layer components
- @apply directive
- Component class pattern

**Expected output:**
- .btn-primary class available
- All styles bundled in one class

---

### **Mini: E-commerce Design Tokens (20 phut)**

**Yeu cau:**
```typescript
// Tao design system cho E-commerce project:
// 1. Colors: brand (primary), accent, success, error
// 2. Custom spacing neu can
// 3. Button classes: .btn-primary, .btn-secondary, .btn-outline
// 4. Input class: .input-field voi focus states
```

**Concepts practiced:**
- Complete color system
- Multiple component classes
- Consistent design tokens

**Expected output:**
- Design system configuration
- Reusable component classes
- Consistent look across app

---

### **Real: Refactor E-commerce voi Design System (45 phut)**

**Yeu cau:**
```typescript
// Ap dung design system vao project E-commerce:
// - Thay the hardcoded colors bang brand colors
// - Su dung button/input classes da tao
// - Dam bao consistency toan bo project
// - Them dark mode variants neu chua co
```

**Concepts practiced:**
- Refactoring to design system
- Consistency across components
- CSS variables for theming
- Dark mode with custom colors

**Expected output:**
- All components use design system
- Consistent colors throughout
- Easy to change theme
- Dark mode support

---

## DIFFICULTY & TIME ESTIMATE

**Do kho:** Medium-Hard (Configuration, refactoring)

**Thoi gian du kien:**
- Doc Theory: 45-60 phut
- Claude tom tat: 15 phut
- Micro 1 (Custom Color): 5 phut
- Micro 2 (@apply): 5 phut
- Mini (Design Tokens): 20 phut
- Real (Refactor): 45 phut
- Quiz: 15-20 phut

**Total:** ~2.5-3 hours

---

## SUCCESS CRITERIA

Session hoan thanh khi:

- [ ] Hoan thanh 2 Micro exercises
- [ ] Hoan thanh Mini exercise
- [ ] Hoan thanh Real exercise (Refactor)
- [ ] Hieu tailwind.config.js customization
- [ ] Biet dung @apply directive
- [ ] Co design system cho E-commerce
- [ ] Quiz score >= 8/10
- [ ] All components use design system

---

## COMMON PITFALLS (Se hoc cach tranh)

```javascript
// Config - override vs extend
module.exports = {
  theme: {
    colors: {  // OVERRIDE - removes all default colors!
      brand: '#...'
    }
  }
}
// Dung:
module.exports = {
  theme: {
    extend: {  // EXTEND - adds to defaults
      colors: {
        brand: '#...'
      }
    }
  }
}

// @apply - overusing
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
         transition-colors disabled:opacity-50;  // Too long!
}
// Better: Break into smaller pieces or use inline for simple cases

// @apply - in wrong layer
.btn-primary {
  @apply px-4 py-2;  // Works but should be in @layer
}
// Dung:
@layer components {
  .btn-primary {
    @apply px-4 py-2;
  }
}

// CSS Variables - wrong syntax in config
colors: {
  primary: 'var(--color-primary)'  // Won't work with opacity!
}
// Dung: Use Tailwind's color function or rgb values
```

---

## READY TO START

**AI, please:**

1. Tao **THEORY.md** voi:
   - tailwind.config.js deep dive
   - extend vs override
   - @apply directive
   - @layer components/utilities
   - CSS variables integration
   - Plugins overview
   - Best practices
2. Tao **4 exercise files** theo Micro/Mini/Real format
3. **UPDATE tailwind.config.js** voi custom config
4. Tao **src/styles/components.css** voi @apply classes
5. **REFACTOR** tat ca components de dung design system
6. Tao **summary.md** voi checklist
7. Tao **quiz.md** voi 10-12 cau hoi

**Luu y quan trong:**
- **EXTEND** khong OVERRIDE
- **@layer components** cho component classes
- **REFACTOR** khong tao moi - ap dung design system vao code cu
- **CSS VARIABLES** cho dynamic theming

---

## KEY CONCEPTS TO COVER

### tailwind.config.js:
```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        primary: 'var(--color-primary)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

### @apply Directive:
```css
/* src/styles/components.css */
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-colors
           focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply btn bg-brand-500 text-white hover:bg-brand-600
           focus:ring-brand-500;
  }

  .btn-secondary {
    @apply btn bg-gray-100 text-gray-900 hover:bg-gray-200
           focus:ring-gray-500;
  }

  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg
           focus:ring-2 focus:ring-brand-500 focus:border-transparent
           transition-shadow;
  }
}
```

### CSS Variables:
```css
/* globals.css */
:root {
  --color-primary: 59 130 246;  /* RGB for opacity support */
  --color-secondary: 16 185 129;
}

.dark {
  --color-primary: 96 165 250;
  --color-secondary: 52 211 153;
}
```

```javascript
// tailwind.config.js
colors: {
  primary: 'rgb(var(--color-primary) / <alpha-value>)',
}
```

---

## E-COMMERCE PROJECT PROGRESS

**Session 1.5.5 - Design System:**
```
[x] ProductCard component
[x] Header component
[x] ProductGrid component
[x] FilterSidebar
[x] Button & Input components
[x] All RESPONSIVE
[x] All INTERACTIVE
[x] DESIGN SYSTEM applied
[ ] Modals & Dropdowns (Session 1.5.6)
[ ] Final polish (Session 1.5.R)
```

---

**LET'S BUILD A DESIGN SYSTEM!**

---

**VERSION:** 1.0
**CREATED:** 2025-01-11
**FOR:** Session 1.5.5 - Custom Configuration & Design System
**FORMAT:** Micro/Mini/Real (Self-code)
**THEME:** E-commerce
**PREVIOUS SESSION:** 1.5.4 - States & Interactivity
