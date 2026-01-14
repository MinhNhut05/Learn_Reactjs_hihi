# Session 1.5.5 - Summary Checklist

## Design System for E-commerce

---

## Concepts Learned

### 1. @theme Directive (Tailwind v4)

- [ ] Hieu `@theme` la cach config Tailwind v4 trong CSS
- [ ] Biet them custom colors voi `--color-*` prefix
- [ ] Hieu cac prefix khac: `--font-*`, `--spacing-*`, `--shadow-*`
- [ ] Config nam trong CSS, KHONG can tailwind.config.js

```css
@theme {
  --color-brand-500: #22c55e;
}
/* Usage: bg-brand-500, text-brand-500 */
```

---

### 2. @layer Directive

- [ ] Hieu 2 layers chinh: `components` va `utilities`
- [ ] Biet khi nao dung `@layer components` (reusable UI)
- [ ] Biet khi nao dung `@layer utilities` (single-purpose)

```css
@layer components {
  .btn-primary { ... }
}

@layer utilities {
  .text-shadow { ... }
}
```

---

### 3. @apply Directive

- [ ] Biet dung `@apply` de combine Tailwind classes
- [ ] Hieu khi nao NEN dung (>3 lan, can consistency)
- [ ] Hieu khi nao KHONG nen dung (1-2 lan, simple)
- [ ] Luon dat trong `@layer components`

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-brand-500 text-white rounded-lg;
  }
}
```

---

### 4. Design System Structure

- [ ] Hieu cau truc files:
  - `index.css` - @theme config + imports
  - `styles/components.css` - @layer components

- [ ] Biet tao color palette (50-900)
- [ ] Biet tao semantic colors (success, error, warning, info)

---

### 5. Component Classes Created

- [ ] **Buttons:** `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`
- [ ] **Inputs:** `.input-field`, `.input-error`, `.input-success`
- [ ] **Cards:** `.card`, `.card-interactive`
- [ ] **Badges:** `.badge-*`
- [ ] **Alerts:** `.alert-*`
- [ ] **Form helpers:** `.form-label`, `.form-helper`, `.form-error`

---

### 6. Refactoring Skills

- [ ] Biet thay the hardcoded colors bang brand colors
- [ ] Biet dung component classes thay vi inline styles
- [ ] Dam bao consistency toan bo project
- [ ] Test tat ca states (hover, focus, active, disabled)

---

## Design System Overview

### Colors
```
Brand (Green):   brand-50 → brand-900
Accent (Amber):  accent-50 → accent-600
Semantic:        success, error, warning, info
```

### Button Classes
```
.btn-primary    - Main CTA (green)
.btn-secondary  - Secondary (gray)
.btn-outline    - Bordered (green outline)
.btn-ghost      - Minimal (transparent)
.btn-danger     - Destructive (red)
```

### Input Classes
```
.input-field    - Base input with focus ring
.input-error    - Error state (red)
.input-success  - Success state (green)
```

---

## Files Modified/Created

### Created:
- `src/session-1.5.5/THEORY.md`
- `src/session-1.5.5/exercises/Micro1-CustomColor.tsx`
- `src/session-1.5.5/exercises/Micro2-ApplyDirective.tsx`
- `src/session-1.5.5/exercises/Mini-DesignTokens.tsx`
- `src/session-1.5.5/exercises/Real-RefactorDesignSystem.tsx`
- `src/session-1.5.5/solutions/*`
- `src/styles/components.css`

### Updated:
- `src/index.css` - Added @theme config
- `src/components/ProductCard.tsx` - brand colors
- `src/components/Header.tsx` - brand colors
- `src/components/Button.tsx` - brand colors
- `src/components/Input.tsx` - brand colors

---

## Quick Reference

### Add Custom Color
```css
@theme {
  --color-primary: #22c55e;
}
/* Use: bg-primary, text-primary */
```

### Create Component Class
```css
@layer components {
  .my-class {
    @apply px-4 py-2 bg-brand-500;
  }
}
```

### Import Components
```css
@import "tailwindcss";
@import "./styles/components.css";
```

---

## Next Steps

- [ ] Session 1.5.6: Headless UI & Production
- [ ] Session 1.5.R: Final Review

---

**Session 1.5.5 Complete!**
