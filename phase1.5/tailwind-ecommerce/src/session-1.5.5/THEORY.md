# Session 1.5.5 - Custom Configuration & Design System

## Tailwind CSS v4 - CSS-First Configuration

> **Luu y:** Project nay dung Tailwind v4 - config bang CSS thay vi JavaScript

---

## 1. @theme Directive

Tailwind v4 dung `@theme` de custom design tokens **truc tiep trong CSS**:

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  /* Custom colors */
  --color-brand-50: #f0fdf4;
  --color-brand-100: #dcfce7;
  --color-brand-500: #22c55e;
  --color-brand-600: #16a34a;
  --color-brand-700: #15803d;
  --color-brand-900: #14532d;

  /* Custom fonts */
  --font-sans: 'Inter', sans-serif;

  /* Custom spacing */
  --spacing-18: 4.5rem;
}
```

**Su dung:** `bg-brand-500`, `text-brand-600`, `font-sans`, `p-18`

### Theme Variables Reference

| Category | Prefix | Example |
|----------|--------|---------|
| Colors | `--color-*` | `--color-primary: #22c55e` |
| Fonts | `--font-*` | `--font-display: 'Poppins'` |
| Spacing | `--spacing-*` | `--spacing-18: 4.5rem` |
| Radius | `--radius-*` | `--radius-xl: 1rem` |
| Shadow | `--shadow-*` | `--shadow-soft: 0 4px 6px...` |

---

## 2. @layer Directive

Tailwind v4 co 3 layers chinh:

```css
/* Layer components - cho reusable UI patterns */
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all;
  }

  .btn-primary {
    @apply btn bg-brand-500 text-white hover:bg-brand-600;
  }

  .card {
    @apply bg-white rounded-xl shadow-md p-4;
  }
}

/* Layer utilities - cho custom utilities */
@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
}
```

### Khi nao dung @layer?

| Layer | Khi nao | Vi du |
|-------|---------|-------|
| `components` | Reusable UI patterns | `.btn`, `.card`, `.input-field` |
| `utilities` | Single-purpose utilities | `.text-shadow`, `.scrollbar-hide` |

---

## 3. @apply Directive

**Combine Tailwind classes thanh custom class:**

```css
@layer components {
  .btn-primary {
    @apply
      px-4 py-2
      bg-brand-500 text-white
      rounded-lg font-medium
      hover:bg-brand-600
      focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
      transition-colors duration-200;
  }
}
```

### Khi nao dung @apply?

| Nen dung | Khong nen dung |
|----------|----------------|
| Component lap di lap lai nhieu lan | Component chi dung 1-2 lan |
| Can consistency (buttons, inputs) | Inline styles cung ok |
| Team can shared vocabulary | Qua nhieu utilities (>10) |

**Rule of thumb:** Neu component duoc dung >3 lan va can consistent -> @apply

---

## 4. CSS Variables cho Dynamic Theming

```css
/* Base theme */
:root {
  --color-primary-rgb: 34 197 94;  /* RGB format */
  --color-surface: #ffffff;
  --color-text: #1f2937;
}

/* Dark mode */
.dark {
  --color-primary-rgb: 74 222 128;
  --color-surface: #1f2937;
  --color-text: #f9fafb;
}

@theme {
  --color-primary: rgb(var(--color-primary-rgb) / <alpha-value>);
  --color-surface: var(--color-surface);
  --color-text: var(--color-text);
}
```

**Luu y:** Dung RGB format de ho tro opacity (`bg-primary/50`)

---

## 5. Design System Structure

```
src/
├── index.css           # @theme config + @import components
├── styles/
│   └── components.css  # @layer components { ... }
```

**index.css:**
```css
@import "tailwindcss";
@import "./styles/components.css";

@theme {
  /* Design tokens here */
}
```

---

## 6. Color Palette Best Practice

### Full Color Scale

```css
@theme {
  /* Brand colors - Green (Eco/Fresh) */
  --color-brand-50: #f0fdf4;
  --color-brand-100: #dcfce7;
  --color-brand-200: #bbf7d0;
  --color-brand-300: #86efac;
  --color-brand-400: #4ade80;
  --color-brand-500: #22c55e;   /* Primary */
  --color-brand-600: #16a34a;   /* Hover */
  --color-brand-700: #15803d;   /* Active */
  --color-brand-800: #166534;
  --color-brand-900: #14532d;   /* Text dark */

  /* Semantic colors */
  --color-success: #22c55e;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;
}
```

### Usage Pattern

| Use case | Color |
|----------|-------|
| Primary buttons | `bg-brand-500 hover:bg-brand-600` |
| Primary text | `text-brand-600` |
| Light backgrounds | `bg-brand-50` |
| Badges/Tags | `bg-brand-100 text-brand-700` |

---

## 7. Button Component Classes

```css
@layer components {
  /* Base button */
  .btn {
    @apply
      inline-flex items-center justify-center
      px-4 py-2 rounded-lg font-medium
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed;
  }

  /* Variants */
  .btn-primary {
    @apply btn bg-brand-500 text-white
           hover:bg-brand-600 focus:ring-brand-500
           active:bg-brand-700;
  }

  .btn-secondary {
    @apply btn bg-gray-100 text-gray-900
           hover:bg-gray-200 focus:ring-gray-500;
  }

  .btn-outline {
    @apply btn border-2 border-brand-500 text-brand-600
           hover:bg-brand-50 focus:ring-brand-500;
  }
}
```

---

## 8. Input Component Classes

```css
@layer components {
  .input-field {
    @apply
      w-full px-4 py-2
      border border-gray-300 rounded-lg
      transition-all duration-200
      placeholder:text-gray-400
      hover:border-gray-400
      focus:border-transparent focus:ring-2 focus:ring-brand-500
      disabled:bg-gray-100 disabled:cursor-not-allowed;
  }

  .input-error {
    @apply input-field border-red-500 focus:ring-red-500 bg-red-50;
  }

  .input-success {
    @apply input-field border-green-500 focus:ring-green-500 bg-green-50;
  }
}
```

---

## 9. Tailwind v4 vs v3 Comparison

| Feature | v3 | v4 |
|---------|-----|-----|
| Config file | `tailwind.config.js` | CSS `@theme` |
| Custom colors | `theme.extend.colors` | `--color-*` |
| @apply | Works | Works (same) |
| @layer | Works | Works (same) |
| Dark mode | `darkMode: 'class'` | Built-in |
| Plugins | JS plugins | CSS-based |

---

## 10. Quick Reference

### Adding Custom Color
```css
@theme {
  --color-brand-500: #22c55e;
}
/* Use: bg-brand-500, text-brand-500 */
```

### Creating Button Class
```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-brand-500 text-white rounded-lg;
  }
}
/* Use: <button class="btn-primary"> */
```

### CSS Variables for Theming
```css
:root { --primary: #22c55e; }
.dark { --primary: #4ade80; }

@theme {
  --color-primary: var(--primary);
}
```

---

## Summary Checklist

- [ ] Hieu `@theme` directive trong Tailwind v4
- [ ] Biet cach tao custom colors voi `--color-*`
- [ ] Hieu khi nao dung `@layer components` vs `@layer utilities`
- [ ] Biet dung `@apply` dung cach (khong overuse)
- [ ] Hieu CSS variables cho dynamic theming
- [ ] Co the tao design system cho project

---

**Next:** Lam exercises de practice!
