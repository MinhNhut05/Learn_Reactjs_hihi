# Session 1.5.1 Quiz - Core Concepts & Utility-First

**Passing Score:** 8/10 (80%)

---

## Câu hỏi

### Câu 1: Spacing - Padding vs Margin

Class nào tạo **khoảng cách bên trong** element?

A) `m-4`
B) `p-4`
C) `space-y-4`
D) `gap-4`

---

### Câu 2: Spacing Scale

`p-4` trong Tailwind tương đương với bao nhiêu pixels?

A) 4px
B) 8px
C) 16px
D) 24px

---

### Câu 3: Typography - Font Size

Để tạo text có font-size 24px (1.5rem), bạn dùng class nào?

A) `text-lg`
B) `text-xl`
C) `text-2xl`
D) `text-3xl`

---

### Câu 4: Typography - Font Weight

Class nào tạo font-weight **700** (bold)?

A) `font-medium`
B) `font-semibold`
C) `font-bold`
D) `font-extrabold`

---

### Câu 5: Color Shades

Trong color system của Tailwind, shade **500** thường được dùng cho:

A) Background rất nhạt
B) Text chính
C) Primary color / buttons
D) Borders

---

### Câu 6: Color - Text Contrast

Trên background `bg-gray-100`, text color nào dễ đọc nhất?

A) `text-gray-200`
B) `text-gray-400`
C) `text-gray-600`
D) `text-gray-800`

---

### Câu 7: Spacing - Space vs Gap

Điểm khác biệt chính giữa `space-y-4` và `gap-4` là gì?

A) `space-y-4` chỉ dùng cho flex, `gap-4` dùng cho tất cả
B) `gap-4` chỉ dùng cho flex/grid, `space-y-4` dùng margin cho children
C) Không có khác biệt
D) `space-y-4` tạo padding, `gap-4` tạo margin

---

### Câu 8: Typography - Line Height

Class nào tạo line-height phù hợp để đọc **đoạn văn dài**?

A) `leading-none`
B) `leading-tight`
C) `leading-relaxed`
D) `leading-3`

---

### Câu 9: Sizing

Class nào đặt width = **50%** của parent?

A) `w-50`
B) `w-half`
C) `w-1/2`
D) `w-50%`

---

### Câu 10: Mobile-First

Trong Tailwind, thứ tự viết responsive classes đúng là:

A) `lg:p-8 md:p-6 p-4`
B) `p-4 md:p-6 lg:p-8`
C) `sm:p-4 md:p-6 lg:p-8`
D) Không quan trọng thứ tự

---

## Đáp án

<details>
<summary>Click để xem đáp án</summary>

### Câu 1: **B) `p-4`**
- `p-*` = padding (bên trong)
- `m-*` = margin (bên ngoài)
- `space-y-*` = margin cho children
- `gap-*` = gap trong flex/grid

### Câu 2: **C) 16px**
- Tailwind spacing scale: số × 4px
- `p-4` = 4 × 4 = 16px = 1rem

### Câu 3: **C) `text-2xl`**
- `text-lg` = 18px
- `text-xl` = 20px
- `text-2xl` = 24px (1.5rem)
- `text-3xl` = 30px

### Câu 4: **C) `font-bold`**
- `font-medium` = 500
- `font-semibold` = 600
- `font-bold` = 700
- `font-extrabold` = 800

### Câu 5: **C) Primary color / buttons**
- 50-200: backgrounds
- 300-400: borders, disabled
- **500-600: primary, buttons**
- 700-900: text

### Câu 6: **D) `text-gray-800`**
- Trên background nhạt (100), cần text đậm (700-900)
- `gray-800` có contrast ratio tốt nhất

### Câu 7: **B) `gap-4` chỉ dùng cho flex/grid, `space-y-4` dùng margin cho children**
- `gap-*` = CSS gap property (flex/grid only)
- `space-y-*` = adds margin-top to all children except first

### Câu 8: **C) `leading-relaxed`**
- `leading-none` = 1 (quá chật)
- `leading-tight` = 1.25 (cho headings)
- `leading-relaxed` = 1.625 (tốt cho paragraph)
- `leading-3` = fixed value, không responsive

### Câu 9: **C) `w-1/2`**
- Tailwind dùng fraction notation
- `w-1/2` = 50%
- `w-1/3` = 33.33%
- `w-2/3` = 66.67%

### Câu 10: **B) `p-4 md:p-6 lg:p-8`**
- Tailwind là **mobile-first**
- Base styles (không prefix) = mobile
- Sau đó thêm breakpoint từ nhỏ đến lớn
- Sai: `lg:p-8 md:p-6 p-4` - ngược thứ tự

</details>

---

## Scoring

| Correct Answers | Score | Status |
|-----------------|-------|--------|
| 10/10 | 100% | ⭐ Excellent! |
| 9/10 | 90% | ✅ Great! |
| 8/10 | 80% | ✅ Pass |
| 7/10 | 70% | ❌ Review needed |
| < 7 | < 70% | ❌ Re-study required |

---

## Nếu chưa đạt 8/10

1. Đọc lại phần tương ứng trong THEORY.md
2. Thực hành lại exercises
3. Làm lại quiz

---

**Next:** Hoàn thành checklist trong summary.md trước khi chuyển sang Session 1.5.2
