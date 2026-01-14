# SESSION 1.5.4 - STATES & INTERACTIVITY

## Mục lục

1. [State Modifiers](#1-state-modifiers)
2. [Group Pattern](#2-group-pattern)
3. [Peer Pattern](#3-peer-pattern)
4. [Transitions & Animations](#4-transitions--animations)
5. [Dark Mode (Cơ bản)](#5-dark-mode-cơ-bản)
6. [Best Practices](#6-best-practices)

---

## 1. State Modifiers

State modifiers cho phép bạn áp dụng styles dựa trên **trạng thái tương tác** của element.

### 1.1 Hover State (`hover:`)

Kích hoạt khi user **di chuột** lên element.

```html
<!-- Button đổi màu khi hover -->
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Hover Me
</button>

<!-- Nhiều properties thay đổi -->
<button class="
  bg-blue-500 text-white px-4 py-2 rounded
  hover:bg-blue-600
  hover:shadow-lg
  hover:-translate-y-1
">
  Hover Effects
</button>
```

**Common hover patterns:**
| Pattern | Ý nghĩa |
|---------|---------|
| `hover:bg-{color}` | Đổi background color |
| `hover:text-{color}` | Đổi text color |
| `hover:shadow-{size}` | Thêm/đổi shadow |
| `hover:scale-{value}` | Phóng to/thu nhỏ |
| `hover:-translate-y-1` | Di chuyển lên trên |
| `hover:opacity-{value}` | Đổi độ trong suốt |
| `hover:underline` | Thêm underline (links) |

### 1.2 Focus State (`focus:`)

Kích hoạt khi element được **focus** (bằng keyboard tab hoặc click).

```html
<!-- Input với focus ring -->
<input
  type="text"
  class="
    border border-gray-300 px-4 py-2 rounded
    outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-transparent
  "
  placeholder="Type here..."
/>

<!-- Button với focus visible (accessibility) -->
<button class="
  bg-blue-500 text-white px-4 py-2 rounded
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
">
  Focus Me
</button>
```

**Focus utilities:**
| Pattern | Ý nghĩa |
|---------|---------|
| `focus:ring-{size}` | Ring width (0, 1, 2, 4, 8) |
| `focus:ring-{color}` | Ring color |
| `focus:ring-offset-{size}` | Khoảng cách ring với element |
| `focus:border-{color}` | Border color |
| `focus:border-transparent` | Ẩn border khi focus |
| `outline-none` | Remove browser outline |

**⚠️ Accessibility Note:** Luôn có visible focus indicator cho keyboard users!

### 1.3 Active State (`active:`)

Kích hoạt khi element đang được **click/tap** (mousedown).

```html
<!-- Button nhỏ lại khi click -->
<button class="
  bg-blue-500 text-white px-4 py-2 rounded
  hover:bg-blue-600
  active:scale-95
  active:bg-blue-700
">
  Click Me
</button>
```

**Common active patterns:**
| Pattern | Ý nghĩa |
|---------|---------|
| `active:scale-95` | Thu nhỏ khi click |
| `active:bg-{color}` | Màu đậm hơn khi click |
| `active:translate-y-0` | Reset position khi click |

### 1.4 Disabled State (`disabled:`)

Áp dụng cho elements có attribute `disabled`.

```html
<!-- Disabled button -->
<button
  disabled
  class="
    bg-blue-500 text-white px-4 py-2 rounded
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:bg-blue-500
  "
>
  Disabled
</button>

<!-- Disabled input -->
<input
  disabled
  class="
    border px-4 py-2 rounded
    disabled:bg-gray-100
    disabled:text-gray-400
    disabled:cursor-not-allowed
  "
/>
```

### 1.5 Kết hợp States

Các states có thể kết hợp với nhau:

```html
<!-- Complete button với tất cả states -->
<button class="
  bg-blue-500 text-white px-6 py-3 rounded-lg font-medium

  hover:bg-blue-600
  hover:shadow-lg
  hover:-translate-y-0.5

  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2

  active:scale-95
  active:bg-blue-700

  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:hover:bg-blue-500
  disabled:hover:translate-y-0
  disabled:hover:shadow-none

  transition-all duration-200
">
  Complete Button
</button>
```

---

## 2. Group Pattern

**Group pattern** cho phép **parent element** điều khiển style của **children** khi parent được hover/focus.

### 2.1 Cú pháp cơ bản

```html
<!-- Parent có class "group" -->
<div class="group">
  <!-- Children sử dụng "group-hover:" -->
  <div class="group-hover:text-blue-500">
    Text changes when parent is hovered
  </div>
</div>
```

### 2.2 Card Hover Effects

**Ví dụ thực tế:** Product card với hover effects

```html
<div class="group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer
            hover:shadow-xl transition-shadow duration-300">

  <!-- Image zooms when card is hovered -->
  <div class="overflow-hidden">
    <img
      src="product.jpg"
      class="w-full h-48 object-cover
             group-hover:scale-110
             transition-transform duration-300"
    />
  </div>

  <!-- Hidden overlay appears on hover -->
  <div class="absolute inset-0 bg-black/30
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              flex items-center justify-center">
    <button class="bg-white text-gray-900 px-4 py-2 rounded">
      Quick View
    </button>
  </div>

  <!-- Arrow icon moves on hover -->
  <div class="p-4 flex items-center justify-between">
    <h3 class="font-semibold">Product Name</h3>
    <span class="group-hover:translate-x-1 transition-transform">
      →
    </span>
  </div>
</div>
```

### 2.3 Dropdown Menu

```html
<div class="relative group">
  <!-- Trigger -->
  <button class="flex items-center gap-2 px-4 py-2">
    <span>Menu</span>
    <span class="group-hover:rotate-180 transition-transform">▼</span>
  </button>

  <!-- Dropdown content -->
  <div class="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200">
    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Option 2</a>
    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Option 3</a>
  </div>
</div>
```

### 2.4 Tooltip Pattern

```html
<div class="relative group inline-block">
  <!-- Trigger element -->
  <button class="text-blue-500 underline">
    Hover for tooltip
  </button>

  <!-- Tooltip -->
  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
              px-3 py-1 bg-gray-900 text-white text-sm rounded
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200
              whitespace-nowrap">
    This is a tooltip!
    <!-- Arrow -->
    <div class="absolute top-full left-1/2 -translate-x-1/2
                border-4 border-transparent border-t-gray-900">
    </div>
  </div>
</div>
```

### 2.5 Group Modifiers

```html
<!-- group-focus: khi group được focus -->
<div class="group">
  <input type="text" class="border px-4 py-2" />
  <p class="text-gray-400 group-focus-within:text-blue-500">
    Helper text
  </p>
</div>

<!-- Named groups (Tailwind v3.4+) -->
<div class="group/card">
  <div class="group/button">
    <button class="group-hover/card:bg-blue-500 group-hover/button:scale-110">
      Nested groups
    </button>
  </div>
</div>
```

---

## 3. Peer Pattern

**Peer pattern** cho phép **sibling element** điều khiển style của **sibling khác**.

### 3.1 Cú pháp cơ bản

```html
<!-- peer PHẢI đứng TRƯỚC element sử dụng peer-* -->
<input type="text" class="peer" />
<p class="peer-focus:text-blue-500">
  This changes when input is focused
</p>
```

**⚠️ QUAN TRỌNG:** Thứ tự HTML matters! `peer` class phải đứng TRƯỚC các elements sử dụng `peer-*`.

### 3.2 Form Validation UI

```html
<div class="space-y-1">
  <label class="text-sm font-medium text-gray-700">Email</label>

  <!-- Input with peer class -->
  <input
    type="email"
    required
    placeholder="your@email.com"
    class="peer w-full px-4 py-2 border border-gray-300 rounded-lg
           focus:ring-2 focus:ring-blue-500 focus:border-transparent
           invalid:border-red-500 invalid:focus:ring-red-500"
  />

  <!-- Helper text - visible when focused -->
  <p class="text-sm text-gray-400
            invisible peer-focus:visible
            peer-invalid:invisible">
    Enter a valid email address
  </p>

  <!-- Error message - visible when invalid -->
  <p class="text-sm text-red-500
            hidden peer-invalid:block">
    Please enter a valid email address
  </p>
</div>
```

### 3.3 Floating Label Pattern

```html
<div class="relative">
  <input
    type="text"
    id="name"
    placeholder=" "
    class="peer w-full px-4 py-3 border border-gray-300 rounded-lg
           focus:ring-2 focus:ring-blue-500 focus:border-transparent
           placeholder-transparent"
  />

  <label
    for="name"
    class="absolute left-4 top-3 text-gray-400 transition-all duration-200
           peer-placeholder-shown:top-3
           peer-placeholder-shown:text-base
           peer-focus:-top-2.5
           peer-focus:text-sm
           peer-focus:text-blue-500
           peer-focus:bg-white
           peer-focus:px-1
           -top-2.5 text-sm bg-white px-1"
  >
    Your Name
  </label>
</div>
```

### 3.4 Checkbox/Radio Styling

```html
<!-- Custom checkbox -->
<label class="flex items-center gap-3 cursor-pointer">
  <input type="checkbox" class="peer sr-only" />

  <div class="w-5 h-5 border-2 border-gray-300 rounded
              peer-checked:bg-blue-500
              peer-checked:border-blue-500
              flex items-center justify-center
              transition-colors">
    <span class="text-white text-xs opacity-0 peer-checked:opacity-100">✓</span>
  </div>

  <span class="text-gray-700 peer-checked:text-blue-600">
    I agree to the terms
  </span>
</label>
```

### 3.5 Peer Modifiers

| Modifier | Khi nào kích hoạt |
|----------|-------------------|
| `peer-hover:` | Peer được hover |
| `peer-focus:` | Peer được focus |
| `peer-checked:` | Peer checkbox/radio checked |
| `peer-disabled:` | Peer bị disabled |
| `peer-invalid:` | Peer input invalid |
| `peer-required:` | Peer có required attribute |
| `peer-placeholder-shown:` | Peer placeholder đang hiển thị |

---

## 4. Transitions & Animations

### 4.1 Transition Utilities

Transitions tạo hiệu ứng **chuyển đổi mượt mà** giữa các states.

```html
<!-- Basic transition -->
<button class="bg-blue-500 hover:bg-blue-600 transition">
  Smooth color change
</button>

<!-- Specific property -->
<button class="bg-blue-500 hover:bg-blue-600 transition-colors">
  Only color transitions
</button>
```

**Transition properties:**

| Class | Properties |
|-------|------------|
| `transition` | Tất cả (color, bg, border, shadow, opacity, transform) |
| `transition-none` | Không transition |
| `transition-all` | Mọi property (use with caution) |
| `transition-colors` | Color, background-color, border-color |
| `transition-opacity` | Opacity |
| `transition-shadow` | Box-shadow |
| `transition-transform` | Transform |

### 4.2 Duration

```html
<!-- Duration options -->
<div class="transition duration-75">75ms</div>
<div class="transition duration-100">100ms</div>
<div class="transition duration-150">150ms (default)</div>
<div class="transition duration-200">200ms</div>
<div class="transition duration-300">300ms</div>
<div class="transition duration-500">500ms</div>
<div class="transition duration-700">700ms</div>
<div class="transition duration-1000">1000ms</div>
```

**Recommended:**
- Micro interactions (button press): `duration-100` to `duration-150`
- Hover effects: `duration-200` to `duration-300`
- Page transitions: `duration-300` to `duration-500`

### 4.3 Timing Functions (Easing)

```html
<div class="transition ease-linear">Linear</div>
<div class="transition ease-in">Slow start</div>
<div class="transition ease-out">Slow end</div>
<div class="transition ease-in-out">Slow both ends</div>
```

**Recommendations:**
- `ease-out`: Tốt nhất cho hover effects (natural feel)
- `ease-in-out`: Tốt cho animations lớn hơn
- `ease-in`: Dùng cho exit animations
- `linear`: Dùng cho progress bars, loading

### 4.4 Delay

```html
<!-- Delayed transition -->
<div class="transition delay-150">150ms delay</div>
<div class="transition delay-300">300ms delay</div>
```

### 4.5 Animations

Tailwind cung cấp các animations built-in:

```html
<!-- Spin - cho loading spinners -->
<div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>

<!-- Ping - cho notifications -->
<span class="relative flex h-3 w-3">
  <span class="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
  <span class="relative rounded-full h-3 w-3 bg-red-500"></span>
</span>

<!-- Pulse - cho skeleton loading -->
<div class="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>

<!-- Bounce - cho attention -->
<div class="animate-bounce">↓</div>
```

### 4.6 Complete Example

```html
<!-- Product Card with all transitions -->
<div class="
  group
  bg-white rounded-xl shadow-md overflow-hidden
  hover:shadow-2xl
  transition-shadow duration-300 ease-out
">
  <div class="overflow-hidden">
    <img
      src="product.jpg"
      class="w-full h-48 object-cover
             group-hover:scale-105
             transition-transform duration-500 ease-out"
    />
  </div>

  <div class="p-4">
    <h3 class="font-semibold text-gray-900
               group-hover:text-blue-600
               transition-colors duration-200">
      Product Name
    </h3>

    <button class="
      mt-4 w-full py-2 bg-blue-500 text-white rounded-lg
      hover:bg-blue-600
      active:scale-95
      transition-all duration-200
    ">
      Add to Cart
    </button>
  </div>
</div>
```

---

## 5. Dark Mode (Cơ bản)

Tailwind hỗ trợ dark mode với prefix `dark:`.

### 5.1 Cấu hình

Trong file CSS với Tailwind v4:

```css
/* index.css */
@import "tailwindcss";

/* Dark mode tự động detect từ system preference */
/* Hoặc dùng class strategy */
@custom-variant dark (&:where(.dark, .dark *));
```

### 5.2 Sử dụng

```html
<!-- LUÔN khai báo cả light và dark colors -->
<div class="bg-white dark:bg-gray-900">
  <h1 class="text-gray-900 dark:text-white">
    Title
  </h1>
  <p class="text-gray-600 dark:text-gray-300">
    Description
  </p>
</div>
```

### 5.3 Color Mapping cơ bản

| Light Mode | Dark Mode |
|------------|-----------|
| `bg-white` | `dark:bg-gray-900` |
| `bg-gray-50` | `dark:bg-gray-800` |
| `bg-gray-100` | `dark:bg-gray-700` |
| `text-gray-900` | `dark:text-white` |
| `text-gray-600` | `dark:text-gray-300` |
| `border-gray-200` | `dark:border-gray-700` |

### 5.4 Toggle Dark Mode (React)

```tsx
// Đơn giản với useState
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  const toggleDark = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <button onClick={toggleDark} class="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}
```

---

## 6. Best Practices

### 6.1 Performance Tips

```html
<!-- ❌ Avoid: transition-all có thể chậm -->
<div class="transition-all duration-300">

<!-- ✅ Better: Chỉ transition những gì cần -->
<div class="transition-transform duration-300">
<div class="transition-colors duration-200">
<div class="transition-opacity duration-150">
```

### 6.2 Common Mistakes

```html
<!-- ❌ Quên transition - thay đổi tức thì -->
<button class="bg-blue-500 hover:bg-blue-600">

<!-- ✅ Thêm transition -->
<button class="bg-blue-500 hover:bg-blue-600 transition-colors">

<!-- ❌ Group pattern - thiếu class "group" -->
<div>
  <img class="group-hover:scale-105">
</div>

<!-- ✅ Đúng -->
<div class="group">
  <img class="group-hover:scale-105 transition-transform">
</div>

<!-- ❌ Peer pattern - sai thứ tự HTML -->
<p class="peer-focus:visible">Message</p>
<input class="peer">

<!-- ✅ Đúng - peer TRƯỚC -->
<input class="peer">
<p class="peer-focus:visible">Message</p>

<!-- ❌ Dark mode - thiếu base color -->
<div class="dark:bg-gray-800">

<!-- ✅ Đúng -->
<div class="bg-white dark:bg-gray-800">
```

### 6.3 Accessibility

```html
<!-- Đảm bảo focus visible cho keyboard users -->
<button class="
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
">

<!-- Giữ disabled state rõ ràng -->
<button disabled class="
  disabled:opacity-50
  disabled:cursor-not-allowed
">

<!-- Link có underline hoặc color khác biệt -->
<a class="text-blue-600 hover:underline focus:underline">
```

### 6.4 Reusable Patterns

Tạo các patterns có thể tái sử dụng:

```tsx
// Button component với tất cả states
const buttonClasses = `
  px-6 py-3 rounded-lg font-medium
  bg-blue-500 text-white
  hover:bg-blue-600 hover:shadow-md hover:-translate-y-0.5
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  active:scale-95 active:bg-blue-700
  disabled:opacity-50 disabled:cursor-not-allowed
  disabled:hover:bg-blue-500 disabled:hover:translate-y-0 disabled:hover:shadow-none
  transition-all duration-200
`
```

---

## Tóm tắt

| Concept | Syntax | Use Case |
|---------|--------|----------|
| Hover | `hover:` | Button, card, link hover |
| Focus | `focus:` | Input focus ring, button focus |
| Active | `active:` | Button click effect |
| Disabled | `disabled:` | Disabled form elements |
| Group | `group` + `group-hover:` | Parent controls children |
| Peer | `peer` + `peer-focus:` | Sibling controls sibling |
| Transition | `transition-{property}` | Smooth state changes |
| Duration | `duration-{ms}` | Animation speed |
| Easing | `ease-{type}` | Animation curve |
| Dark Mode | `dark:` | Theme switching |

---

## Tiếp theo

Sau khi đọc xong theory, hãy:
1. Tóm tắt lại các concepts
2. Làm các exercises theo thứ tự: Micro → Mini → Real
3. Hoàn thành Quiz (mục tiêu >= 80%)

**Thời gian đọc ước tính:** 45-60 phút
