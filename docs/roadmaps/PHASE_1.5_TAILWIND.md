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

**🔹 Micro 1: Spacing Classes (5 phút)**
```typescript
// Viết 1 div với: padding 4, margin-top 2, margin-bottom 6
// Bên trong có 2 paragraphs với khoảng cách vertical 3
```

**🔹 Micro 2: Typography Classes (5 phút)**
```typescript
// Viết 1 heading với: text 2xl, bold, màu gray-800
// Viết 1 paragraph với: text base, màu gray-600, line-height relaxed
```

**🔸 Mini: Product Price Display (15 phút)**
```typescript
// Tạo component hiển thị giá sản phẩm:
// - Tên sản phẩm (heading style)
// - Giá gốc (gạch ngang, màu nhạt)
// - Giá sale (màu đỏ/xanh, bold, size lớn hơn)
// - Badge "Sale 20%" (background màu, text trắng, padding nhỏ)
```

**🔶 Real: Product Card E-commerce (45 phút)**
```typescript
// Xây dựng ProductCard component cho trang E-commerce:
// - Hiển thị ảnh sản phẩm (có thể dùng placeholder)
// - Tên, giá gốc, giá sale
// - Rating stars
// - Badge trạng thái (New, Sale, Out of Stock)
// - Nút "Add to Cart"
//
// Yêu cầu: Áp dụng spacing, typography, colors hợp lý
// Component này sẽ được dùng tiếp ở các session sau
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

**🔹 Micro 1: Flex Centering (5 phút)**
```typescript
// Viết 1 div căn giữa cả ngang và dọc bằng flexbox
// Chiều cao full viewport
```

**🔹 Micro 2: Grid Columns (5 phút)**
```typescript
// Tạo grid 3 cột đều nhau với gap 4
// Mỗi cột chứa 1 div có background màu khác nhau
```

**🔸 Mini: Product Grid Layout (15 phút)**
```typescript
// Sử dụng ProductCard đã tạo ở Session 1.5.1
// Hiển thị 4-6 products trong grid:
// - Mobile: 1 cột
// - Tablet: 2 cột
// - Desktop: 3 cột
// - Gap hợp lý
```

**🔶 Real: E-commerce Header + Product Section (45 phút)**
```typescript
// Xây dựng layout cho trang chủ E-commerce:
//
// HEADER:
// - Logo bên trái
// - Search bar ở giữa
// - Cart icon + User icon bên phải
//
// PRODUCT SECTION:
// - Tiêu đề "Featured Products"
// - Grid ProductCard responsive (dùng component đã tạo)
// - Filter sidebar bên trái (desktop only)
//
// Component này sẽ được mở rộng ở các session sau
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

**🔹 Micro 1: Responsive Text (5 phút)**
```typescript
// Viết heading: mobile text-xl, tablet text-2xl, desktop text-4xl
```

**🔹 Micro 2: Show/Hide (5 phút)**
```typescript
// Tạo 2 buttons: 1 chỉ hiện trên mobile, 1 chỉ hiện trên desktop
```

**🔸 Mini: Responsive ProductCard (15 phút)**
```typescript
// Cải tiến ProductCard từ session trước:
// - Mobile: layout dọc, ảnh trên, thông tin dưới
// - Desktop: layout ngang, ảnh trái, thông tin phải
// - Padding tăng theo breakpoint
```

**🔶 Real: Responsive E-commerce Homepage (45 phút)**
```typescript
// Cải tiến layout E-commerce từ session 1.5.2:
//
// MOBILE:
// - Header: logo + hamburger menu icon
// - Không có sidebar
// - Products grid 1 cột
//
// TABLET:
// - Header đầy đủ
// - Products grid 2 cột
//
// DESKTOP:
// - Sidebar filter bên trái
// - Products grid 3 cột
// - Spacing lớn hơn
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

**🔹 Micro 1: Hover Button (5 phút)**
```typescript
// Tạo button với: hover đổi màu background, active scale nhỏ lại
```

**🔹 Micro 2: Focus Input (5 phút)**
```typescript
// Tạo input với: focus có ring xanh, border trong suốt
```

**🔸 Mini: Interactive ProductCard (15 phút)**
```typescript
// Thêm interactivity cho ProductCard:
// - Hover: shadow lớn hơn, translate Y lên trên
// - Hover vào ảnh: ảnh scale lên (dùng group)
// - Button Add to Cart: hover/active states
// - Transition smooth
```

**🔶 Real: E-commerce với Full Interactivity (45 phút)**
```typescript
// Hoàn thiện trang E-commerce với states:
//
// HEADER:
// - Search input với focus states
// - Cart icon có badge số lượng
// - Dropdown menu khi hover user icon (group pattern)
//
// PRODUCT CARDS:
// - Tất cả hover effects từ Mini exercise
// - "Quick View" button hiện khi hover card
// - Heart icon (wishlist) toggle on click
//
// Tùy chọn: Thêm dark mode toggle
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

**🔹 Micro 1: Custom Color (5 phút)**
```typescript
// Thêm màu "brand" vào tailwind.config.js
// Sử dụng: bg-brand-500, text-brand-600
```

**🔹 Micro 2: @apply (5 phút)**
```typescript
// Tạo class .btn-primary với @apply trong globals.css
// Bao gồm: padding, background, hover, focus ring
```

**🔸 Mini: E-commerce Design Tokens (20 phút)**
```typescript
// Tạo design system cho E-commerce project:
// 1. Colors: brand (primary), accent, success, error
// 2. Custom spacing nếu cần
// 3. Button classes: .btn-primary, .btn-secondary, .btn-outline
// 4. Input class: .input-field với focus states
```

**🔶 Real: Refactor E-commerce với Design System (45 phút)**
```typescript
// Áp dụng design system vào project E-commerce:
// - Thay thế hardcoded colors bằng brand colors
// - Sử dụng button/input classes đã tạo
// - Đảm bảo consistency toàn bộ project
// - Thêm dark mode variants nếu chưa có
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

**🔹 Micro 1: CVA Button (5 phút)**
```typescript
// Tạo buttonVariants với CVA
// Variants: primary, secondary | Sizes: sm, md, lg
```

**🔹 Micro 2: cn() Helper (5 phút)**
```typescript
// Tạo helper function cn() với clsx + tailwind-merge
// Test với conditional classes
```

**🔸 Mini: E-commerce Modal (20 phút)**
```typescript
// Sử dụng Headless UI hoặc Radix tạo:
// - Modal "Quick View" cho product
// - Hiển thị ảnh lớn, thông tin chi tiết
// - Close button, backdrop click to close
// - Smooth animations
```

**🔶 Real: E-commerce Hoàn Chỉnh (60 phút)**
```typescript
// Hoàn thiện E-commerce project với production-ready features:
//
// COMPONENTS NÊN CÓ:
// - Header với dropdown menu (user menu)
// - Product grid với Quick View modal
// - Add to Cart với notification/toast
// - Cart drawer/sidebar (slide in từ phải)
// - Filter dropdowns (category, price range)
//
// TECHNICAL:
// - Tất cả buttons sử dụng CVA
// - Tất cả interactive components có animations
// - Dark mode hoạt động
// - Mobile responsive
//
// Đây là project hoàn chỉnh của Phase 1.5!
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

## 📅 Session 1.5.R: Review & Polish (2-3h)

> **MỤC TIÊU:** Review kiến thức + Hoàn thiện E-commerce project

---

### Part 1: Quick Challenges (1h)

**Challenge 1: Rebuild ProductCard từ đầu (20 phút)**
```typescript
// Không xem code cũ, tự code lại ProductCard với:
// - Responsive layout
// - Hover effects
// - Dark mode support
```

**Challenge 2: Build Component mới (20 phút)**
```typescript
// Tạo "Testimonial Card":
// - Avatar, tên, chức danh
// - Quote text
// - Star rating
// - Hover effect
// - Chưa từng làm trước đó
```

**Challenge 3: Responsive Debug (20 phút)**
```typescript
// Nhận 1 component bị lỗi responsive
// Tìm và sửa các issues
```

---

### Part 2: E-commerce Project Completion

**Checklist hoàn thành:**
- [ ] Header responsive với search, cart, user menu
- [ ] Product grid với filter sidebar
- [ ] ProductCard với đầy đủ effects
- [ ] Quick View modal
- [ ] Cart drawer/notification
- [ ] Dark mode toggle hoạt động
- [ ] Design system (colors, buttons, inputs)
- [ ] Mobile-first responsive
- [ ] Không có horizontal scroll trên mobile
- [ ] Tất cả interactive states hoạt động

**Pass Criteria:**
- ✅ Tất cả checklist hoàn thành
- ✅ Code được ≥80% không xem solution
- ✅ Project có thể demo được

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
