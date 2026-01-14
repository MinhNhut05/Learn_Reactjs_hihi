# SESSION 1.5.4 - SUMMARY

## States & Interactivity - Tóm tắt nhanh

---

## Checklist kiến thức cần nhớ

### 1. State Modifiers

| Modifier | Khi nào kích hoạt | Ví dụ |
|----------|-------------------|-------|
| `hover:` | Di chuột vào | `hover:bg-blue-600` |
| `focus:` | Element được focus | `focus:ring-2` |
| `active:` | Đang click/tap | `active:scale-95` |
| `disabled:` | Có attribute disabled | `disabled:opacity-50` |

**Combo pattern chuẩn cho Button:**
```html
<button class="
  bg-blue-500 text-white px-4 py-2 rounded
  hover:bg-blue-600 hover:shadow-md hover:-translate-y-0.5
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  active:scale-95 active:bg-blue-700
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-200
">
```

---

### 2. Group Pattern

**Mục đích:** Parent điều khiển children khi hover

**Cú pháp:**
```html
<div class="group">                              <!-- Parent có class group -->
  <img class="group-hover:scale-105">            <!-- Child dùng group-hover -->
  <div class="opacity-0 group-hover:opacity-100"> <!-- Hiện khi hover parent -->
</div>
```

**Use cases:**
- Card hover → image zoom
- Card hover → overlay xuất hiện
- Card hover → quick view button hiện
- Dropdown menu

---

### 3. Peer Pattern

**Mục đích:** Sibling điều khiển sibling

**Cú pháp:**
```html
<input class="peer">                    <!-- Peer TRƯỚC -->
<p class="peer-focus:visible">          <!-- Peer-* SAU -->
```

**⚠️ QUAN TRỌNG:** `peer` class phải đứng TRƯỚC trong HTML!

**Use cases:**
- Form validation messages
- Floating labels
- Helper text hiện khi focus

---

### 4. Transitions

| Class | Dùng cho |
|-------|----------|
| `transition` | Mặc định (colors, bg, border, shadow, opacity, transform) |
| `transition-colors` | Chỉ màu sắc |
| `transition-transform` | Chỉ transform (scale, translate, rotate) |
| `transition-opacity` | Chỉ opacity |
| `transition-all` | Tất cả properties (cẩn thận performance) |

**Duration:**
- `duration-150`: Micro interactions
- `duration-200`: Hover effects
- `duration-300`: Larger animations

**Easing:**
- `ease-out`: Tốt nhất cho hover (natural)
- `ease-in-out`: Animations lớn

---

### 5. Dark Mode (Cơ bản)

```html
<!-- Luôn có cả light và dark -->
<div class="bg-white dark:bg-gray-900">
<p class="text-gray-900 dark:text-white">
```

**Color mapping:**
| Light | Dark |
|-------|------|
| `bg-white` | `dark:bg-gray-900` |
| `bg-gray-50` | `dark:bg-gray-800` |
| `text-gray-900` | `dark:text-white` |
| `text-gray-600` | `dark:text-gray-300` |

---

## Common Mistakes - Tránh lỗi

```html
<!-- ❌ Quên transition -->
<button class="hover:bg-blue-600">

<!-- ✅ Thêm transition -->
<button class="hover:bg-blue-600 transition-colors">

<!-- ❌ Group pattern thiếu class group -->
<div>
  <img class="group-hover:scale-105">
</div>

<!-- ✅ Đúng -->
<div class="group">
  <img class="group-hover:scale-105 transition-transform">
</div>

<!-- ❌ Peer sai thứ tự -->
<p class="peer-focus:visible">Message</p>
<input class="peer">

<!-- ✅ Đúng - peer TRƯỚC -->
<input class="peer">
<p class="peer-focus:visible">Message</p>

<!-- ❌ Dark mode thiếu base -->
<div class="dark:bg-gray-800">

<!-- ✅ Đúng -->
<div class="bg-white dark:bg-gray-800">
```

---

## Quick Reference

### Button hoàn chỉnh
```
bg-{color} text-white px-4 py-2 rounded
hover:bg-{darker} hover:shadow-md hover:-translate-y-0.5
focus:outline-none focus:ring-2 focus:ring-{color} focus:ring-offset-2
active:scale-95
disabled:opacity-50 disabled:cursor-not-allowed
transition-all duration-200
```

### Input hoàn chỉnh
```
border border-gray-300 px-4 py-2 rounded
outline-none
hover:border-gray-400
focus:ring-2 focus:ring-blue-500 focus:border-transparent
transition-all duration-200
```

### Card với group hover
```
group bg-white rounded-lg shadow-md overflow-hidden
hover:shadow-xl hover:-translate-y-1
transition-all duration-300

<!-- Image bên trong -->
group-hover:scale-105 transition-transform duration-500

<!-- Overlay/Button bên trong -->
opacity-0 group-hover:opacity-100 transition-opacity
```

### Dropdown menu
```
<!-- Trigger -->
<div class="group">
  <button>Trigger</button>

  <!-- Menu -->
  <div class="
    absolute opacity-0 invisible translate-y-2
    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
    transition-all duration-200
  ">
```

---

## Session Completion Checklist

- [ ] Đọc THEORY.md
- [ ] Hoàn thành Micro 1: Hover Button
- [ ] Hoàn thành Micro 2: Focus Input
- [ ] Hoàn thành Mini: Interactive Card
- [ ] Hoàn thành Real: Full Interactivity
- [ ] Hiểu hover, focus, active, disabled states
- [ ] Hiểu group pattern
- [ ] Hiểu peer pattern
- [ ] Biết dùng transitions
- [ ] Quiz score >= 8/10

---

## Files tạo trong session này

```
session-1.5.4/
├── THEORY.md
├── SUMMARY.md (file này)
├── QUIZ.md
├── exercises/
│   ├── Micro1-HoverButton.tsx
│   ├── Micro2-FocusInput.tsx
│   ├── Mini-InteractiveCard.tsx
│   └── Real-FullInteractivity.tsx
└── solutions/
    ├── Micro1-HoverButton-Solution.tsx
    ├── Micro2-FocusInput-Solution.tsx
    ├── Mini-InteractiveCard-Solution.tsx
    └── Real-FullInteractivity-Solution.tsx

components/
├── Button.tsx (TẠO MỚI)
├── Input.tsx (TẠO MỚI)
├── ProductCard.tsx (TẠO MỚI)
└── Header.tsx (UPDATED)
```

---

**Session tiếp theo:** 1.5.5 - Custom Configuration & Design System
