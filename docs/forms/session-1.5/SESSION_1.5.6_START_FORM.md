# SESSION START FORM - Session 1.5.6

---

## SESSION INFO

**Session ID:** 1.5.6
**Session Title:** Headless UI & Production
**Module:** 1.5 - Tailwind CSS Mastery
**Phase:** Phase 1.5 - Tailwind CSS
**Roadmap Version:** V2.1

---

## SESSION CONTEXT

**Vi tri trong Roadmap:**
- **Phase 1.5:** Tailwind CSS Mastery (Session 6/7)
- **Module 1.5.3:** Advanced Tailwind (Session 2/2)
- **Previous Session:** 1.5.5 - Custom Configuration & Design System (Completed)
- **Next Session:** 1.5.R - Review & Polish

**Prerequisites Completed:**
- All previous Tailwind sessions
- Design system configured
- E-commerce with full styling

**Why This Session Important:**
- **Headless UI / Radix** - Accessible, unstyled components
- **CVA (class-variance-authority)** - Type-safe variants
- **clsx + tailwind-merge** - Class merging utilities
- **Production optimization** - Purging, minification
- Professional component architecture

---

## LEARNING OBJECTIVES

Sau session nay, toi se:

1. **Headless UI:**
   - Dialog/Modal
   - Dropdown Menu
   - Transitions
   - Accessible by default

2. **Radix UI (Alternative):**
   - Dropdown Menu
   - Dialog
   - Tooltip
   - Styling with Tailwind

3. **CVA (class-variance-authority):**
   - Defining variants
   - Compound variants
   - TypeScript integration
   - Default variants

4. **Utility Libraries:**
   - clsx - Conditional classes
   - tailwind-merge - Merge conflicting classes
   - cn() helper function

5. **Production:**
   - Content configuration
   - CSS purging
   - Minification
   - Build optimization

---

## PROJECT CONTINUATION

**HOAN THIEN PROJECT:**

```
phase1.5/
└── tailwind-ecommerce/
    ├── src/
    │   ├── lib/
    │   │   └── utils.ts         <- TAO MOI: cn() helper
    │   ├── components/
    │   │   ├── ui/
    │   │   │   ├── Button.tsx   <- UPDATE: CVA variants
    │   │   │   ├── Modal.tsx    <- TAO MOI: Headless UI
    │   │   │   └── Dropdown.tsx <- TAO MOI: Headless UI
    │   │   ├── ProductCard.tsx  (Update: Quick View modal)
    │   │   ├── Header.tsx       (Update: User dropdown)
    │   │   └── CartDrawer.tsx   <- TAO MOI
    │   └── ...
```

---

## TEACHING STYLE

### **Learning Flow:**
```
PHASE 1: Doc ly thuyet (45-60p) -> Headless UI, CVA, Production
PHASE 2: Tom tat (15p)         -> Claude tao checklist
PHASE 3: Lam bai tap (75-90p)  -> Micro/Mini/Real exercises
PHASE 4: Quiz (15-20p)         -> Knowledge Check, pass >= 80%
```

---

## EXERCISES OVERVIEW

### **Micro 1: CVA Button (5 phut)**

**Yeu cau:**
```typescript
// Tao buttonVariants voi CVA
// Variants: primary, secondary | Sizes: sm, md, lg
```

**Concepts practiced:**
- cva() function
- variants object
- defaultVariants

**Expected output:**
- Type-safe button variants
- Easy to extend

---

### **Micro 2: cn() Helper (5 phut)**

**Yeu cau:**
```typescript
// Tao helper function cn() voi clsx + tailwind-merge
// Test voi conditional classes
```

**Concepts practiced:**
- clsx for conditionals
- tailwind-merge for conflicts
- Combining utilities

**Expected output:**
- cn() function ready to use
- Clean class merging

---

### **Mini: E-commerce Modal (20 phut)**

**Yeu cau:**
```typescript
// Su dung Headless UI hoac Radix tao:
// - Modal "Quick View" cho product
// - Hien thi anh lon, thong tin chi tiet
// - Close button, backdrop click to close
// - Smooth animations
```

**Concepts practiced:**
- Dialog component
- Transition animations
- Accessibility
- Tailwind styling on headless

**Expected output:**
- Accessible modal component
- Smooth open/close animation
- Click outside to close

---

### **Real: E-commerce Hoan Chinh (60 phut)**

**Yeu cau:**
```typescript
// Hoan thien E-commerce project voi production-ready features:
//
// COMPONENTS NEN CO:
// - Header voi dropdown menu (user menu)
// - Product grid voi Quick View modal
// - Add to Cart voi notification/toast
// - Cart drawer/sidebar (slide in tu phai)
// - Filter dropdowns (category, price range)
//
// TECHNICAL:
// - Tat ca buttons su dung CVA
// - Tat ca interactive components co animations
// - Dark mode hoat dong
// - Mobile responsive
//
// Day la project hoan chinh cua Phase 1.5!
```

**Concepts practiced:**
- Complete component library
- Headless UI integration
- CVA for all variants
- Production-ready code

**Expected output:**
- Full E-commerce UI
- Professional components
- Ready for Phase 2

---

## DIFFICULTY & TIME ESTIMATE

**Do kho:** Hard (Nhieu concepts moi, integration)

**Thoi gian du kien:**
- Doc Theory: 45-60 phut
- Claude tom tat: 15 phut
- Micro 1 (CVA Button): 5 phut
- Micro 2 (cn() Helper): 5 phut
- Mini (Modal): 20 phut
- Real (Complete E-commerce): 60 phut
- Quiz: 15-20 phut

**Total:** ~3-3.5 hours

---

## SUCCESS CRITERIA

Session hoan thanh khi:

- [ ] Hoan thanh 2 Micro exercises
- [ ] Hoan thanh Mini exercise (Modal)
- [ ] Hoan thanh Real exercise (E-commerce complete)
- [ ] Hieu Headless UI / Radix
- [ ] Biet dung CVA cho variants
- [ ] Co cn() helper
- [ ] Quiz score >= 8/10
- [ ] E-commerce project production-ready

---

## COMMON PITFALLS (Se hoc cach tranh)

```typescript
// CVA - Wrong variant access
const button = cva('base-classes', { variants: {...} });
<button className={button}>  // Wrong! button is a function
<button className={button({ variant: 'primary' })}>  // Correct

// CVA - Missing variant
button({ variant: 'danger' })  // Error if 'danger' not defined
// Always use TypeScript for variant checking

// Headless UI - Missing Transition
<Dialog open={open}>  // No animation!
  <Dialog.Panel>...</Dialog.Panel>
</Dialog>
// Dung: Wrap with Transition

// tailwind-merge - Order matters
twMerge('p-4', 'p-2')  // Result: 'p-2' (last wins)
// Use for overriding, not adding

// Production - Missing content paths
module.exports = {
  content: ['./src/**/*.tsx'],  // Missing .ts files!
  // Classes in .ts files will be purged
}
// Dung: content: ['./src/**/*.{ts,tsx}']
```

---

## READY TO START

**AI, please:**

1. Tao **THEORY.md** voi:
   - Headless UI overview
   - Radix UI overview
   - CVA deep dive
   - clsx + tailwind-merge
   - cn() helper pattern
   - Production optimization
   - Best practices
2. Tao **4 exercise files** theo Micro/Mini/Real format
3. Tao **src/lib/utils.ts** voi cn() function
4. **INSTALL** dependencies: @headlessui/react, class-variance-authority, clsx, tailwind-merge
5. Tao **Modal, Dropdown, CartDrawer** components
6. **UPDATE** Button voi CVA, Header voi Dropdown
7. Tao **summary.md** voi checklist
8. Tao **quiz.md** voi 10-12 cau hoi

**Luu y quan trong:**
- **HEADLESS UI** or **RADIX** - chon 1 (Headless UI recommended for beginners)
- **CVA** cho tat ca components co variants
- **cn()** cho tat ca conditional classes
- **PRODUCTION** config dung

---

## KEY CONCEPTS TO COVER

### CVA (class-variance-authority):
```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base classes
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand-500 text-white hover:bg-brand-600',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'border-2 border-brand-500 text-brand-500 hover:bg-brand-50',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  // ...
}

function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
```

### cn() Helper:
```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  isDisabled && 'disabled-classes',
  className  // Allow override from props
)} />
```

### Headless UI Modal:
```typescript
import { Dialog, Transition } from '@headlessui/react';

function Modal({ open, onClose, children }) {
  return (
    <Transition show={open}>
      <Dialog onClose={onClose}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
```

---

## E-COMMERCE PROJECT PROGRESS

**Session 1.5.6 - Production Ready:**
```
[x] ProductCard component
[x] Header component with Dropdown
[x] ProductGrid component
[x] FilterSidebar
[x] Button with CVA
[x] Input component
[x] Modal component
[x] CartDrawer component
[x] All RESPONSIVE
[x] All INTERACTIVE
[x] DESIGN SYSTEM applied
[x] PRODUCTION READY
[ ] Final polish (Session 1.5.R)
```

---

**LET'S BUILD PRODUCTION-READY COMPONENTS!**

---

**VERSION:** 1.0
**CREATED:** 2025-01-11
**FOR:** Session 1.5.6 - Headless UI & Production
**FORMAT:** Micro/Mini/Real (Self-code)
**THEME:** E-commerce
**PREVIOUS SESSION:** 1.5.5 - Design System
