# SESSION 1.5.4 - QUIZ

## States & Interactivity - Kiểm tra kiến thức

**Thời gian:** 15-20 phút
**Mục tiêu:** >= 8/10 câu đúng

---

### Câu 1: Hover State

Button nào có hover effect **ĐÚNG** và **SMOOTH**?

```html
<!-- A -->
<button class="bg-blue-500 hover:bg-blue-600">Click</button>

<!-- B -->
<button class="bg-blue-500 hover:bg-blue-600 transition-colors">Click</button>

<!-- C -->
<button class="bg-blue-500 transition-colors">Click</button>

<!-- D -->
<button class="hover:bg-blue-600 transition-colors">Click</button>
```

<details>
<summary>Xem đáp án</summary>

**Đáp án: B**

- A: Có hover effect nhưng KHÔNG smooth (thiếu transition)
- B: ✅ Đầy đủ: base color + hover color + transition
- C: Có transition nhưng thiếu hover state
- D: Thiếu base color (bg-blue-500)

</details>

---

### Câu 2: Focus Ring

Input nào có **focus ring đúng chuẩn** và **accessible**?

```html
<!-- A -->
<input class="border focus:ring-2 focus:ring-blue-500">

<!-- B -->
<input class="border outline-none focus:ring-2 focus:ring-blue-500">

<!-- C -->
<input class="border outline-none">

<!-- D -->
<input class="border focus:outline-none focus:border-blue-500">
```

<details>
<summary>Xem đáp án</summary>

**Đáp án: B**

- A: Có ring nhưng không xóa browser outline → chồng chéo
- B: ✅ Xóa outline + thêm ring = accessible và đẹp
- C: Xóa outline nhưng không có focus indicator → NOT accessible
- D: Chỉ đổi border, không có ring → khó nhìn

</details>

---

### Câu 3: Active State

Button nào có hiệu ứng **click/press đúng**?

```html
<!-- A -->
<button class="bg-blue-500 hover:scale-95">Click</button>

<!-- B -->
<button class="bg-blue-500 active:scale-95">Click</button>

<!-- C -->
<button class="bg-blue-500 focus:scale-95">Click</button>

<!-- D -->
<button class="bg-blue-500 active:scale-105">Click</button>
```

<details>
<summary>Xem đáp án</summary>

**Đáp án: B**

- A: Sai - hover không phải click state
- B: ✅ active:scale-95 = thu nhỏ khi click = chuẩn
- C: Sai - focus là khi tab vào, không phải click
- D: Sai - scale-105 là phóng to, button click thường thu nhỏ

</details>

---

### Câu 4: Group Pattern - Cú pháp

Code nào **ĐÚNG** cho group pattern?

```html
<!-- A -->
<div>
  <img class="group-hover:scale-105">
</div>

<!-- B -->
<div class="group">
  <img class="hover:scale-105">
</div>

<!-- C -->
<div class="group">
  <img class="group-hover:scale-105">
</div>

<!-- D -->
<div class="group-hover">
  <img class="scale-105">
</div>
```

<details>
<summary>Xem đáp án</summary>

**Đáp án: C**

- A: Thiếu class "group" ở parent → không hoạt động
- B: Sai - dùng hover: thay vì group-hover: → chỉ hover riêng image
- C: ✅ Parent có "group", child có "group-hover:" = chuẩn
- D: Sai cú pháp hoàn toàn

</details>

---

### Câu 5: Peer Pattern - Thứ tự

Code nào **ĐÚNG** cho peer pattern?

```html
<!-- A -->
<p class="peer-focus:text-blue-500">Helper</p>
<input class="peer">

<!-- B -->
<input class="peer">
<p class="peer-focus:text-blue-500">Helper</p>

<!-- C -->
<input class="peer-focus">
<p class="text-blue-500">Helper</p>

<!-- D -->
<div class="peer">
  <input>
  <p class="peer-focus:text-blue-500">Helper</p>
</div>
```

<details>
<summary>Xem đáp án</summary>

**Đáp án: B**

- A: ❌ Sai thứ tự - peer phải đứng TRƯỚC
- B: ✅ peer TRƯỚC, peer-focus: SAU = chuẩn
- C: Sai cú pháp - không có class "peer-focus"
- D: Sai - peer và peer-* phải là siblings, không phải parent-child

**Lưu ý quan trọng:** Trong CSS, peer pattern sử dụng sibling selector (+), nên element có class "peer" PHẢI đứng trước element dùng "peer-*".

</details>

---

### Câu 6: Transition Performance

Transition nào có **performance TỐT NHẤT** cho hover scale?

```html
<!-- A -->
<div class="hover:scale-105 transition">

<!-- B -->
<div class="hover:scale-105 transition-all">

<!-- C -->
<div class="hover:scale-105 transition-transform">

<!-- D -->
<div class="hover:scale-105 transition-colors">
```

<details>
<summary>Xem đáp án</summary>

**Đáp án: C**

- A: `transition` bao gồm nhiều properties (ok nhưng không tối ưu)
- B: `transition-all` bao gồm TẤT CẢ properties → performance kém nhất
- C: ✅ `transition-transform` chỉ animate transform → tối ưu nhất
- D: `transition-colors` không animate transform → không có effect

**Best practice:** Luôn dùng transition cụ thể (transition-transform, transition-colors, transition-opacity) thay vì transition-all.

</details>

---

### Câu 7: Dropdown Menu

Code nào tạo dropdown **ĐÚNG** với group hover?

```html
<!-- A -->
<div class="group">
  <button>Menu</button>
  <div class="hidden group-hover:block">
    Items...
  </div>
</div>

<!-- B -->
<div class="group">
  <button>Menu</button>
  <div class="opacity-0 group-hover:opacity-100">
    Items...
  </div>
</div>

<!-- C -->
<div class="group">
  <button>Menu</button>
  <div class="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
    Items...
  </div>
</div>

<!-- D -->
<div>
  <button class="group">Menu</button>
  <div class="opacity-0 group-hover:opacity-100">
    Items...
  </div>
</div>
```

<details>
<summary>Xem đáp án</summary>

**Đáp án: C**

- A: Dùng hidden/block → không có transition, xuất hiện đột ngột
- B: Có opacity transition nhưng element vẫn chiếm space khi invisible
- C: ✅ Dùng cả opacity + invisible + transition = smooth + không chiếm space
- D: Sai - class "group" phải ở parent container, không phải button

</details>

---

### Câu 8: Disabled State

Button disabled nào **ĐẦY ĐỦ** và **ĐÚNG**?

```html
<!-- A -->
<button disabled class="bg-blue-500 disabled:opacity-50">

<!-- B -->
<button disabled class="bg-blue-500 opacity-50 cursor-not-allowed">

<!-- C -->
<button disabled class="
  bg-blue-500
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:hover:bg-blue-500
">

<!-- D -->
<button class="bg-blue-500 disabled:opacity-50">
```

<details>
<summary>Xem đáp án</summary>

**Đáp án: C**

- A: Có opacity nhưng thiếu cursor và không cancel hover
- B: Luôn disabled style, không conditional
- C: ✅ Đầy đủ: opacity + cursor + cancel hover effect
- D: Thiếu `disabled` attribute

**Best practice cho disabled:**
```
disabled:opacity-50
disabled:cursor-not-allowed
disabled:hover:bg-{base-color}  ← Reset hover về base
disabled:hover:translate-y-0    ← Reset transform
disabled:hover:shadow-none      ← Reset shadow
```

</details>

---

### Câu 9: Dark Mode

Code dark mode nào **ĐÚNG**?

```html
<!-- A -->
<div class="dark:bg-gray-900">
  <p class="dark:text-white">Text</p>
</div>

<!-- B -->
<div class="bg-white dark:bg-gray-900">
  <p class="text-gray-900 dark:text-white">Text</p>
</div>

<!-- C -->
<div class="bg-gray-900 dark:bg-white">
  <p class="text-white dark:text-gray-900">Text</p>
</div>

<!-- D -->
<div class="dark:bg-white dark:bg-gray-900">
  <p class="dark:text-white dark:text-gray-900">Text</p>
</div>
```

<details>
<summary>Xem đáp án</summary>

**Đáp án: B**

- A: ❌ Thiếu base colors (light mode) → không có màu ở light mode
- B: ✅ Có cả light (bg-white, text-gray-900) và dark (dark:bg-gray-900, dark:text-white)
- C: Đảo ngược - dark mode sáng, light mode tối → confusing
- D: Sai cú pháp - duplicate dark: classes

**Rule:** Luôn khai báo CẢ light mode (base) và dark mode colors.

</details>

---

### Câu 10: Tổng hợp

Nhìn vào code sau, có bao nhiêu **LỖI**?

```html
<div>
  <img class="group-hover:scale-105 transition-all">
  <p class="peer-focus:text-blue-500">Label</p>
  <input class="peer focus:ring-2">
  <button class="bg-blue-500 hover:bg-blue-600">Click</button>
</div>
```

**A.** 1 lỗi
**B.** 2 lỗi
**C.** 3 lỗi
**D.** 4 lỗi

<details>
<summary>Xem đáp án</summary>

**Đáp án: C (3 lỗi)**

1. **Lỗi 1:** Thiếu class `group` ở parent div → `group-hover:scale-105` không hoạt động
2. **Lỗi 2:** Sai thứ tự peer pattern → input (peer) phải đứng TRƯỚC p (peer-focus)
3. **Lỗi 3:** Button thiếu `transition` → hover không smooth

**Code đúng:**
```html
<div class="group">
  <img class="group-hover:scale-105 transition-transform">
  <input class="peer focus:ring-2">
  <p class="peer-focus:text-blue-500">Label</p>
  <button class="bg-blue-500 hover:bg-blue-600 transition-colors">Click</button>
</div>
```

</details>

---

## Kết quả

| Số câu đúng | Đánh giá |
|-------------|----------|
| 10/10 | Xuất sắc! Master states & interactivity |
| 8-9/10 | Tốt! Sẵn sàng cho session tiếp theo |
| 6-7/10 | Ổn! Nên xem lại THEORY một lần nữa |
| < 6/10 | Cần ôn lại! Đọc kỹ THEORY và làm lại exercises |

---

## Lỗi thường gặp cần nhớ

1. **Quên transition** → Animations không smooth
2. **Group pattern thiếu class group** → Không hoạt động
3. **Peer pattern sai thứ tự** → Không hoạt động
4. **transition-all thay vì transition-{property}** → Performance kém
5. **Dark mode thiếu base colors** → Light mode không có màu
6. **Disabled không cancel hover effects** → Vẫn có hover style

---

**Hoàn thành Quiz!** Nếu đạt >= 8/10, bạn đã sẵn sàng cho Session 1.5.5: Custom Configuration & Design System.
