# PHASE 1.5: TAILWIND CSS MASTERY (Chi Tiết - Nâng cao)

> Thời gian: 1-1.5 tuần (với 5h/ngày)
> Mục tiêu: Master Tailwind CSS từ cơ bản đến nâng cao, xây dựng Design System
> Sessions: 6 (bao gồm 1 review session)

---

## 📅 MODULE 1.5.1: Tailwind Fundamentals (2 days)

### **Session 1.5.1: Core Concepts & Utility-First (2-3h)**

#### Concepts:

**1. Utility-First CSS là gì?**
- Philosophy: Style directly in HTML với small utility classes
- So sánh: Traditional CSS vs Tailwind approach
- Pros & Cons của utility-first

**2. Spacing System**
```html
<!-- Padding & Margin -->
<div class="p-4 m-2">        <!-- p-4 = 1rem, m-2 = 0.5rem -->
<div class="px-4 py-2">      <!-- x = horizontal, y = vertical -->
<div class="pt-4 pb-2 pl-4"> <!-- top, bottom, left, right -->
<div class="space-y-4">      <!-- Vertical spacing giữa children -->
<div class="space-x-2">      <!-- Horizontal spacing -->
```

**3. Colors & Typography**
```html
<!-- Colors -->
<div class="bg-blue-500 text-white">     <!-- Background & text color -->
<div class="bg-slate-100 text-gray-800"> <!-- Neutral colors -->
<div class="border-red-500 border-2">    <!-- Border color -->

<!-- Typography -->
<p class="text-sm font-medium">          <!-- Size & weight -->
<p class="text-lg leading-relaxed">      <!-- Size & line-height -->
<p class="tracking-wide uppercase">      <!-- Letter spacing & transform -->
<p class="truncate">                     <!-- Truncate text -->
```

**4. Sizing**
```html
<div class="w-full h-screen">     <!-- width: 100%, height: 100vh -->
<div class="w-1/2 h-64">          <!-- width: 50%, height: 16rem -->
<div class="max-w-md min-h-full"> <!-- Max/min constraints -->
<div class="size-10">             <!-- width & height = 2.5rem -->
```

---

#### Bài tập:

**Exercise 1: Spacing Playground (30 phút)**
```typescript
// YÊU CẦU:
// 1. Card component với:
//    - Padding: 6 (1.5rem) all sides
//    - Margin bottom: 4 (1rem)
//    - Border radius: lg
//    - Shadow: md
// 2. Bên trong có 3 sections với spacing vertical 4

// TODO: Implement Card với spacing đúng
function SpacingCard() {
  return (
    // Sử dụng tailwind classes
  )
}
```

---

**Exercise 2: Typography Scale (30 phút)**
```typescript
// YÊU CẦU:
// Tạo component hiển thị:
// 1. Heading: text-2xl, font-bold, text-gray-900
// 2. Subtitle: text-lg, font-medium, text-gray-600
// 3. Body: text-base, text-gray-700, leading-relaxed
// 4. Caption: text-sm, text-gray-500

// TODO: Implement TypographyDemo
```

---

**Exercise 3: Color Palette Card (45 phút)**
```typescript
// YÊU CẦU:
// Product card với:
// - Image placeholder (bg-gray-200)
// - Title (text-gray-900)
// - Price (text-green-600, font-bold)
// - "Sale" badge (bg-red-500, text-white)
// - Button (bg-blue-600, hover:bg-blue-700, text-white)

// TODO: Implement ProductCard
```

---

#### Knowledge Check (10 câu):

1. `p-4` tương đương bao nhiêu rem?
2. `space-y-4` làm gì và áp dụng cho element nào?
3. `text-gray-800` vs `text-gray-200` - cái nào đậm hơn?
4. `w-1/3` nghĩa là gì?
5. Tailwind màu sắc đánh số từ bao nhiêu đến bao nhiêu?
6. `leading-tight` vs `leading-relaxed` khác gì?
7. `tracking-wide` là gì?
8. `truncate` class làm gì?
9. `size-10` tương đương với classes nào?
10. Utility-first có nhược điểm gì?

---

### **Session 1.5.2: Flexbox & Grid Layout (2-3h)**

#### Concepts:

**1. Flexbox với Tailwind**
```html
<!-- Basic flex -->
<div class="flex">                    <!-- display: flex -->
<div class="flex flex-col">           <!-- flex-direction: column -->
<div class="flex flex-row-reverse">   <!-- Reverse order -->

<!-- Alignment -->
<div class="flex justify-center">     <!-- Horizontal center -->
<div class="flex items-center">       <!-- Vertical center -->
<div class="flex justify-between">    <!-- Space between -->
<div class="flex justify-end">        <!-- Align right -->

<!-- Gap (thay thế space-x/y) -->
<div class="flex gap-4">              <!-- gap: 1rem all -->
<div class="flex gap-x-4 gap-y-2">    <!-- Separate x/y gap -->

<!-- Flex items -->
<div class="flex-1">                  <!-- flex: 1 1 0% -->
<div class="flex-none">               <!-- flex: none (không grow/shrink) -->
<div class="flex-grow">               <!-- flex-grow: 1 -->
<div class="flex-shrink-0">           <!-- Không shrink -->
```

**2. Grid với Tailwind**
```html
<!-- Basic grid -->
<div class="grid grid-cols-3">        <!-- 3 columns equal -->
<div class="grid grid-cols-12">       <!-- 12-column system -->

<!-- Gap -->
<div class="grid gap-4">              <!-- Gap all directions -->
<div class="grid gap-x-6 gap-y-4">    <!-- Separate gaps -->

<!-- Responsive columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

<!-- Column/row spanning -->
<div class="col-span-2">              <!-- Span 2 columns -->
<div class="col-span-full">           <!-- Span all columns -->
<div class="row-span-2">              <!-- Span 2 rows -->

<!-- Template columns -->
<div class="grid grid-cols-[200px_1fr_1fr]"> <!-- Custom widths -->
```

**3. Centering Patterns**
```html
<!-- Absolute center -->
<div class="flex items-center justify-center h-screen">

<!-- Grid center -->
<div class="grid place-items-center h-screen">
```

---

#### Bài tập:

**Exercise 1: Navigation Bar (45 phút)**
```typescript
// YÊU CẦU:
// Navbar với:
// - Logo bên trái
// - Nav links ở giữa (gap-6)
// - Auth buttons bên phải (gap-2)
// - Dùng flex + justify-between

interface NavbarProps {
  logo: string
  links: { href: string; label: string }[]
}

// TODO: Implement Navbar với flexbox
```

---

**Exercise 2: Product Grid (60 phút)**
```typescript
// YÊU CẦU:
// Products grid:
// - Mobile: 1 column
// - Tablet (md): 2 columns
// - Desktop (lg): 4 columns
// - Gap: 6
// - Mỗi product card có image, title, price

// TODO: Implement responsive ProductGrid
```

---

**Exercise 3: Dashboard Layout (75 phút)**
```typescript
// YÊU CẦU:
// Dashboard layout:
// - Sidebar: fixed width 250px, full height
// - Main content: flex-1
// - Header: fixed top
// - Content area scrollable

// Structure:
// [Sidebar 250px] | [Header]
//                 | [Content - scrollable]

// TODO: Implement với grid hoặc flex
```

---

#### Knowledge Check (8 câu):

1. `flex` vs `inline-flex` khác gì?
2. `justify-between` làm gì?
3. `items-center` vs `justify-center` khác gì?
4. `gap-4` vs `space-x-4` khi nào dùng cái nào?
5. `flex-1` vs `flex-auto` khác gì?
6. `grid-cols-12` system dùng để làm gì?
7. `col-span-2` trong grid 4 columns chiếm bao nhiêu %?
8. `place-items-center` là shorthand cho gì?

---

## 📅 MODULE 1.5.2: Responsive & Interactive (2 days)

### **Session 1.5.3: Responsive Design (2h)**

#### Concepts:

**1. Breakpoints**
```html
<!-- Default: mobile-first -->
<div class="text-sm md:text-base lg:text-lg xl:text-xl">

<!-- Breakpoints (min-width): -->
<!-- sm: 640px -->
<!-- md: 768px -->
<!-- lg: 1024px -->
<!-- xl: 1280px -->
<!-- 2xl: 1536px -->
```

**2. Responsive Patterns**
```html
<!-- Show/hide -->
<div class="hidden md:block">         <!-- Hide on mobile, show on md+ -->
<div class="block md:hidden">         <!-- Show on mobile, hide on md+ -->

<!-- Responsive flex direction -->
<div class="flex flex-col md:flex-row">

<!-- Responsive padding -->
<div class="px-4 md:px-6 lg:px-8">

<!-- Responsive font size -->
<h1 class="text-2xl md:text-3xl lg:text-5xl">
```

**3. Container**
```html
<!-- Centered container với max-width -->
<div class="container mx-auto px-4">

<!-- Custom container behavior -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

---

#### Bài tập:

**Exercise 1: Responsive Card Grid (45 phút)**
```typescript
// YÊU CẦU:
// Card grid:
// - Mobile: 1 card, stacked layout
// - Tablet: 2 cards per row
// - Desktop: 3 cards per row
// - Large: 4 cards per row
// - Card padding tăng theo breakpoint

// TODO: Implement ResponsiveCardGrid
```

---

**Exercise 2: Mobile-First Navigation (60 phút)**
```typescript
// YÊU CẦU:
// Navigation:
// - Mobile: hamburger menu, hidden links
// - Desktop: full nav với all links visible
// - Logo luôn hiển thị
// - Menu toggle button chỉ hiện trên mobile

// TODO: Implement với responsive classes
```

---

**Exercise 3: Hero Section (45 phút)**
```typescript
// YÊU CẦU:
// Hero section:
// - Mobile: full width, centered text, stacked layout
// - Desktop: 2 columns (text + image), larger fonts
// - Padding responsive
// - Height: min-h-[500px] md:min-h-[600px]

// TODO: Implement ResponsiveHero
```

---

### **Session 1.5.4: States & Interactivity (2h)**

#### Concepts:

**1. Hover, Focus, Active**
```html
<!-- Hover states -->
<button class="bg-blue-500 hover:bg-blue-600">
<a class="text-gray-600 hover:text-blue-500">

<!-- Focus states -->
<input class="focus:outline-none focus:ring-2 focus:ring-blue-500">
<button class="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

<!-- Active state -->
<button class="active:scale-95">
```

**2. Group & Peer**
```html
<!-- Group: parent hover affects children -->
<div class="group">
  <p class="text-gray-500 group-hover:text-black">Text</p>
  <span class="hidden group-hover:block">Tooltip</span>
</div>

<!-- Peer: sibling-based styling -->
<input class="peer" />
<p class="hidden peer-focus:block">Focus message</p>
<p class="peer-invalid:text-red-500">Error message</p>
```

**3. Transitions & Animations**
```html
<!-- Transitions -->
<div class="transition-all duration-300 ease-in-out">
<div class="transition-colors duration-200">
<div class="transition-transform hover:scale-105">

<!-- Built-in animations -->
<div class="animate-spin">      <!-- Spinning loader -->
<div class="animate-pulse">     <!-- Skeleton loader -->
<div class="animate-bounce">    <!-- Bouncing arrow -->
```

**4. Dark Mode**
```html
<!-- Dark mode classes -->
<div class="bg-white dark:bg-gray-900">
<p class="text-gray-900 dark:text-white">

<!-- Enable in tailwind.config.js -->
// darkMode: 'class' hoặc 'media'
```

---

#### Bài tập:

**Exercise 1: Interactive Button Set (30 phút)**
```typescript
// YÊU CẦU:
// Button variants với states:
// - Primary: bg-blue-600, hover:bg-blue-700, active:scale-95
// - Secondary: border, hover:bg-gray-100
// - Danger: bg-red-600, hover:bg-red-700
// - Focus ring cho tất cả
// - Disabled state: opacity-50, cursor-not-allowed

// TODO: Implement Button với variants
```

---

**Exercise 2: Card với Hover Effects (45 phút)**
```typescript
// YÊU CẦU:
// Card với hover effects:
// - Default: shadow-md
// - Hover: shadow-xl, translate-y-[-4px]
// - Transition smooth
// - Image scale on hover (group pattern)
// - "View Details" button hiện khi hover

// TODO: Implement HoverCard
```

---

**Exercise 3: Form với Focus States (60 phút)**
```typescript
// YÊU CẦU:
// Form inputs với:
// - Default: border-gray-300
// - Focus: ring-2 ring-blue-500 border-transparent
// - Error: ring-red-500, error message hiện (peer pattern)
// - Valid: ring-green-500
// - Floating label (peer + translate)

// TODO: Implement Form với focus states
```

---

**Exercise 4: Dark Mode Toggle (45 phút)**
```typescript
// YÊU CẦU:
// Implement dark mode:
// - Toggle button (sun/moon icon)
// - Card component với dark variants
// - Store preference in localStorage
// - Apply class to html element

// TODO: Implement useDarkMode hook + UI
```

---

## 📅 MODULE 1.5.3: Advanced Tailwind (2 days)

### **Session 1.5.5: Custom Configuration & Design System (3h)**

#### Concepts:

**1. tailwind.config.js Customization**
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Custom colors
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        primary: 'var(--color-primary)', // CSS variable
      },
      // Custom spacing
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      // Custom fonts
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cal Sans', 'sans-serif'],
      },
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
      },
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

**2. @apply Directive**
```css
/* globals.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg
           hover:bg-blue-700 transition-colors
           focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
  }

  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg
           focus:outline-none focus:ring-2 focus:ring-blue-500
           focus:border-transparent;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r;
  }
}
```

**3. CSS Variables Integration**
```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #10b981;
  --radius-default: 0.5rem;
}

.dark {
  --color-primary: #60a5fa;
  --color-secondary: #34d399;
}
```

```javascript
// tailwind.config.js
colors: {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
}
```

**4. Plugins**
```javascript
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),

    // Custom plugin
    plugin(function({ addUtilities, addComponents, theme }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0,0,0,0.1)',
        },
      })
    }),
  ],
}
```

---

#### Bài tập:

**Exercise 1: Brand Color System (45 phút)**
```typescript
// YÊU CẦU:
// 1. Tạo custom color palette trong tailwind.config.js:
//    - brand: primary brand color với shades 50-900
//    - success, warning, error colors
// 2. Tạo Button component sử dụng brand colors
// 3. Test với dark mode variants

// TODO: Configure colors + implement components
```

---

**Exercise 2: Typography System (45 phút)**
```typescript
// YÊU CẦU:
// 1. Configure custom fonts (Inter, Plus Jakarta Sans)
// 2. Tạo typography component classes với @apply:
//    - .heading-1, .heading-2, .heading-3
//    - .body-large, .body-default, .body-small
//    - .caption
// 3. Include responsive variants

// TODO: Setup typography system
```

---

**Exercise 3: Component Library Foundation (90 phút)**
```typescript
// YÊU CẦU:
// Tạo base components với @apply:
// 1. Button (.btn, .btn-primary, .btn-secondary, .btn-outline)
// 2. Input (.input-field, .input-error)
// 3. Card (.card, .card-header, .card-body, .card-footer)
// 4. Badge (.badge, .badge-success, .badge-warning, .badge-error)

// File: src/styles/components.css

// TODO: Implement component classes
```

---

### **Session 1.5.6: Tailwind + Headless UI & Production (2-3h)**

#### Concepts:

**1. Headless UI Integration**
```typescript
// Headless UI = unstyled, accessible components
// Bạn thêm Tailwind classes

import { Dialog, Transition } from '@headlessui/react'

function Modal({ isOpen, onClose, children }) {
  return (
    <Transition show={isOpen}>
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

        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md">
            {children}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}
```

**2. Radix UI + Tailwind**
```typescript
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

function Dropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="px-4 py-2 bg-white border rounded-lg">
        Options
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="min-w-[200px] bg-white rounded-lg shadow-lg p-2"
      >
        <DropdownMenu.Item
          className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Edit
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
```

**3. Class Variance Authority (CVA)**
```typescript
// cva: quản lý component variants
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
        outline: 'border-2 border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
        ghost: 'hover:bg-gray-100 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
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
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}
```

**4. Production Optimization**
```javascript
// tailwind.config.js - Production setup
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@headlessui/react/**/*.js', // Include libraries
  ],
  // Purge unused CSS automatically in production
}

// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {}, // Minify CSS
    }),
  },
}
```

**5. clsx & tailwind-merge**
```typescript
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

// Combine classes safely
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage:
<div className={cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50 cursor-not-allowed',
  className // External className override
)} />
```

---

#### Bài tập:

**Exercise 1: Accessible Modal với Headless UI (60 phút)**
```typescript
// YÊU CẦU:
// Modal component với:
// - @headlessui/react Dialog
// - Tailwind animations (fade in/out, scale)
// - Focus trap (built-in)
// - ESC to close
// - Backdrop click to close
// - Proper ARIA labels

// TODO: Implement AccessibleModal
```

---

**Exercise 2: Button System với CVA (60 phút)**
```typescript
// YÊU CẦU:
// Complete Button component:
// - Variants: primary, secondary, outline, ghost, danger
// - Sizes: sm, md, lg
// - States: loading (với spinner), disabled
// - Icon support (left/right icon)
// - Full width option
// - TypeScript types

// TODO: Implement với CVA
```

---

**Exercise 3: Dropdown Menu với Radix (60 phút)**
```typescript
// YÊU CẦU:
// Dropdown menu:
// - @radix-ui/react-dropdown-menu
// - Tailwind styling
// - Icons cho menu items
// - Keyboard navigation (built-in)
// - Sub-menus
// - Checkboxes/Radio trong menu

// TODO: Implement StyledDropdownMenu
```

---

#### Knowledge Check (12 câu):

1. `extend` trong tailwind.config.js làm gì?
2. Khi nào dùng `@apply` vs inline classes?
3. `@layer components` vs `@layer utilities` khác gì?
4. Làm sao để Tailwind include classes từ node_modules?
5. `class-variance-authority` giải quyết vấn đề gì?
6. Headless UI là gì? Tại sao cần?
7. `twMerge` giải quyết vấn đề gì?
8. CSS Variables + Tailwind config kết hợp như thế nào?
9. Làm sao để minify CSS trong production?
10. Plugin `@tailwindcss/forms` làm gì?
11. `content` array trong config dùng để làm gì?
12. Tailwind có tree-shaking không? Hoạt động như thế nào?

---

## 📅 Session 1.5.R: Review & Mini Project (3-4h)

> **MỤC TIÊU:** Củng cố Tailwind CSS - Build landing page hoàn chỉnh

---

### Part 1: Timed Challenges (1.5h)

**Challenge 1: Responsive Hero (30 phút)**
```typescript
// YÊU CẦU:
// Hero section:
// - Mobile: centered, stacked
// - Desktop: 2 columns
// - Gradient background
// - CTA buttons
// - Không xem code cũ

// TODO: Code từ đầu
```

---

**Challenge 2: Feature Grid (30 phút)**
```typescript
// YÊU CẦU:
// Features section:
// - 3 columns on desktop, 1 on mobile
// - Icon, title, description per feature
// - Hover effect on cards
// - Consistent spacing

// TODO: Code từ đầu
```

---

**Challenge 3: Interactive Form (30 phút)**
```typescript
// YÊU CẦU:
// Contact form:
// - Floating labels
// - Focus states
// - Error states (peer)
// - Submit button with loading state
// - Dark mode support

// TODO: Code từ đầu
```

---

### Part 2: Mini Project - Landing Page (2-2.5h)

**YÊU CẦU:**
Build complete landing page với TẤT CẢ Tailwind skills:

**Sections:**
- [ ] Hero section (gradient, responsive, CTAs)
- [ ] Features grid (icons, hover effects)
- [ ] Testimonials carousel/grid
- [ ] Pricing cards (highlighted plan)
- [ ] CTA section
- [ ] Footer (links, social icons)

**Technical Requirements:**
✅ **Responsive:** Mobile-first design
✅ **Dark mode:** Toggle với localStorage persistence
✅ **Animations:** Hover effects, transitions
✅ **States:** Focus, active, disabled
✅ **Components:** Reusable classes (@apply hoặc CVA)
✅ **Accessibility:** Focus rings, contrast ratios

**Bonus:**
- Smooth scroll navigation
- Animated statistics counter
- Newsletter signup form

---

### Self-Assessment:

**Checklist:**
- [ ] Hero responsive và đẹp
- [ ] Grid layouts hoạt động trên tất cả breakpoints
- [ ] Dark mode toggle hoạt động
- [ ] Hover/focus states đầy đủ
- [ ] Transitions smooth
- [ ] Không có horizontal scroll on mobile
- [ ] Typography consistent
- [ ] Spacing consistent

**Pass Criteria:**
- ✅ Tất cả sections hoàn thành
- ✅ Responsive trên mobile, tablet, desktop
- ✅ Dark mode hoạt động
- ✅ Code được ≥80% không xem solution

---

## ✅ PHASE 1.5 COMPLETION CHECKLIST

Hoàn thành Phase 1.5 khi:
- [ ] Hiểu utility-first philosophy
- [ ] Thành thạo spacing, colors, typography
- [ ] Master flexbox và grid với Tailwind
- [ ] Responsive design mobile-first
- [ ] Interactive states (hover, focus, active)
- [ ] Dark mode implementation
- [ ] Custom configuration và design system
- [ ] Headless UI/Radix integration
- [ ] CVA cho component variants
- [ ] Production optimization
- [ ] Hoàn thành Landing Page project

**Next:** Phase 2 - State Management & Data Fetching
(Bạn sẽ áp dụng Tailwind cho tất cả projects từ Phase 2 trở đi!)

---

## 📚 RESOURCES

**Official Docs:**
- https://tailwindcss.com/docs
- https://headlessui.com/
- https://www.radix-ui.com/

**Tools:**
- https://tailwindcss.com/docs/editor-setup (VS Code extension)
- https://www.tailwindplay.com/ (Tailwind Playground)
- https://hypercolor.dev/ (Gradient generator)
- https://tailwindcomponents.com/ (Component examples)

**Libraries:**
- class-variance-authority (CVA)
- clsx + tailwind-merge
- @tailwindcss/forms
- @tailwindcss/typography

**Design Inspiration:**
- https://tailwindui.com/ (Official components - paid)
- https://ui.shadcn.com/ (Free component library)
- https://daisyui.com/ (Component library)

---

**VERSION:** 1.0 - Nâng cao
**DATE:** 2025-01-03
**POSITION:** Sau Phase 1, trước Phase 2
