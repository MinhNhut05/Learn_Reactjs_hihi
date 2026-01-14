# Session 1.5.5 - Quiz

## Custom Configuration & Design System

**Passing Score:** >= 8/10 (80%)

---

### Question 1: @theme Directive

Trong Tailwind v4, de them custom color "brand-500", ban can:

**A)** Tao file `tailwind.config.js` va them vao `theme.extend.colors`

**B)** Them `--color-brand-500: #22c55e;` trong `@theme` block trong CSS

**C)** Them `brand-500: #22c55e` trong `:root` CSS variables

**D)** Cai dat plugin `@tailwindcss/brand-colors`

<details>
<summary>Answer</summary>

**B)** Them `--color-brand-500: #22c55e;` trong `@theme` block trong CSS

Tailwind v4 su dung CSS-first configuration voi `@theme` directive.
</details>

---

### Question 2: @layer components

`.btn-primary` class nen duoc dat trong:

**A)** `@layer base { }`

**B)** `@layer components { }`

**C)** `@layer utilities { }`

**D)** Khong can `@layer`, dat truc tiep trong CSS

<details>
<summary>Answer</summary>

**B)** `@layer components { }`

Component classes (buttons, cards, inputs) thuoc `@layer components`.
</details>

---

### Question 3: @apply Usage

Khi nao KHONG nen dung `@apply`?

**A)** Khi tao button class dung di dung lai nhieu lan

**B)** Khi component chi dung 1-2 lan trong project

**C)** Khi can dam bao consistency cho team

**D)** Khi class co nhieu utilities can nhom lai

<details>
<summary>Answer</summary>

**B)** Khi component chi dung 1-2 lan trong project

Neu chi dung 1-2 lan, inline Tailwind classes tot hon vi giam complexity va de doc.
</details>

---

### Question 4: Color Naming

Trong Tailwind v4, de tao custom color su dung duoc voi utilities, prefix dung la:

**A)** `--bg-brand-500`

**B)** `--text-brand-500`

**C)** `--color-brand-500`

**D)** `--theme-brand-500`

<details>
<summary>Answer</summary>

**C)** `--color-brand-500`

Tailwind v4 dung `--color-*` prefix cho colors trong `@theme`.
</details>

---

### Question 5: File Structure

Trong design system setup, file nao chua `@theme` config?

**A)** `tailwind.config.js`

**B)** `src/styles/components.css`

**C)** `src/index.css`

**D)** `package.json`

<details>
<summary>Answer</summary>

**C)** `src/index.css`

File chinh (`index.css`) chua `@import "tailwindcss"` va `@theme` block.
</details>

---

### Question 6: Composing Classes

De tao `.btn-primary` ke thua tu `.btn`, cach dung trong `@apply` la:

**A)** `@apply extends .btn bg-brand-500;`

**B)** `@apply btn bg-brand-500 text-white;`

**C)** `@apply @btn bg-brand-500;`

**D)** `@apply .btn + bg-brand-500;`

<details>
<summary>Answer</summary>

**B)** `@apply btn bg-brand-500 text-white;`

Trong `@apply`, class names duoc viet khong co dot (`.`).
</details>

---

### Question 7: CSS Variables

De su dung CSS variable voi opacity trong Tailwind v4, format nao dung?

**A)** `--color-primary: #22c55e;`

**B)** `--color-primary: rgb(34, 197, 94);`

**C)** `--color-primary: 34 197 94;` (RGB values only)

**D)** Tat ca deu dung trong Tailwind v4

<details>
<summary>Answer</summary>

**D)** Tat ca deu dung trong Tailwind v4

Tailwind v4 tu dong handle opacity cho tat ca color formats.
</details>

---

### Question 8: Semantic Colors

Color nao KHONG phai la semantic color thong thuong?

**A)** success

**B)** error

**C)** primary

**D)** warning

<details>
<summary>Answer</summary>

**C)** primary

`primary` la brand color, khong phai semantic. Semantic colors la: success, error, warning, info.
</details>

---

### Question 9: Layer Priority

Thu tu priority cua Tailwind layers tu thap den cao la:

**A)** utilities → components → base

**B)** base → components → utilities

**C)** components → base → utilities

**D)** base → utilities → components

<details>
<summary>Answer</summary>

**B)** base → components → utilities

Utilities co priority cao nhat, co the override component styles.
</details>

---

### Question 10: Design System Benefit

Loi ich CHINH cua design system la gi?

**A)** Giam kich thuoc CSS file

**B)** Tang toc do load page

**C)** Dam bao consistency va de maintain

**D)** Ho tro nhieu browsers hon

<details>
<summary>Answer</summary>

**C)** Dam bao consistency va de maintain

Design system giup UI consistent va de thay doi brand identity.
</details>

---

### Question 11: @apply Limit

Trong best practice, khi @apply qua dai (>10-15 utilities), ban nen:

**A)** Chia thanh nhieu classes nho hon

**B)** Giu nguyen vi @apply handle duoc

**C)** Dung inline styles thay the

**D)** Tao JavaScript component

<details>
<summary>Answer</summary>

**A)** Chia thanh nhieu classes nho hon

Break down thanh `.btn` (base) + `.btn-primary` (variant) thay vi 1 class qua dai.
</details>

---

### Question 12: Refactoring

Khi refactor tu `bg-blue-500` sang design system, thay doi dung la:

**A)** `bg-blue-500` → `bg-primary`

**B)** `bg-blue-500` → `bg-brand-500`

**C)** `bg-blue-500` → `bg-color-brand-500`

**D)** `bg-blue-500` → `bg-[#22c55e]`

<details>
<summary>Answer</summary>

**B)** `bg-blue-500` → `bg-brand-500`

Su dung brand color tu @theme: `--color-brand-500` → `bg-brand-500`.
</details>

---

## Scoring

| Score | Result |
|-------|--------|
| 10-12 | Excellent! |
| 8-9 | Pass |
| 6-7 | Review needed |
| <6 | Re-study required |

---

**Good luck!**
