# Session 1.5.2 - Quiz

**Passing Score:** 8/10 (80%)

---

## Question 1 (Multiple Choice)

Để tạo một flex container với items xếp theo cột, bạn dùng class nào?

A. `flex flex-column`
B. `flex flex-col`
C. `display-flex direction-column`
D. `flex-col`

<details>
<summary>Answer</summary>

**B. `flex flex-col`**

- `flex` tạo flex container
- `flex-col` set `flex-direction: column`
- Option D sai vì thiếu `flex` (flex-col chỉ set direction, không tạo flex container)
</details>

---

## Question 2 (Multiple Choice)

Class nào dùng để căn items theo main axis trong flexbox?

A. `items-center`
B. `align-center`
C. `justify-center`
D. `center`

<details>
<summary>Answer</summary>

**C. `justify-center`**

- `justify-*` controls main axis alignment
- `items-*` controls cross axis alignment
- Với `flex-row` (default): justify = horizontal, items = vertical
</details>

---

## Question 3 (True/False)

True hay False: `gap-4` sẽ hoạt động trên bất kỳ container nào?

<details>
<summary>Answer</summary>

**False**

`gap` chỉ hoạt động trên flex hoặc grid containers. Cần có `flex` hoặc `grid` class đi kèm.

```jsx
// ❌ Won't work
<div className="gap-4">

// ✅ Works
<div className="flex gap-4">
<div className="grid gap-4">
```
</details>

---

## Question 4 (Code Output)

Code sau sẽ hiển thị items như thế nào?

```jsx
<div className="flex justify-between">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>
```

A. `A B C` (sát nhau, căn trái)
B. `A     B     C` (khoảng cách đều, có space ở 2 đầu)
C. `A           B           C` (A ở đầu, C ở cuối, B ở giữa)
D. `     A B C     ` (sát nhau, căn giữa)

<details>
<summary>Answer</summary>

**C. `A           B           C`**

`justify-between` phân bố items với:
- Item đầu ở start
- Item cuối ở end
- Khoảng cách đều giữa các items
- Không có space ở 2 đầu
</details>

---

## Question 5 (Multiple Choice)

Để tạo một grid 3 cột đều nhau, bạn dùng:

A. `grid grid-3-cols`
B. `grid cols-3`
C. `grid grid-cols-3`
D. `grid-cols-3`

<details>
<summary>Answer</summary>

**C. `grid grid-cols-3`**

- `grid` tạo grid container
- `grid-cols-3` tạo 3 cột đều nhau
- Option D thiếu `grid` nên sẽ không tạo được grid container
</details>

---

## Question 6 (Code Output)

Code sau có vấn đề gì?

```jsx
<div className="grid-cols-2 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

A. Không có vấn đề gì
B. Thiếu `grid` class
C. `gap-4` sai syntax
D. `grid-cols-2` phải là `cols-2`

<details>
<summary>Answer</summary>

**B. Thiếu `grid` class**

Cần thêm `grid` để tạo grid container:
```jsx
<div className="grid grid-cols-2 gap-4">
```

Không có `grid`, thì `grid-cols-2` và `gap-4` sẽ không có tác dụng.
</details>

---

## Question 7 (Multiple Choice)

Để center một element cả horizontal và vertical với flexbox, dùng:

A. `flex center`
B. `flex items-center`
C. `flex justify-center items-center`
D. `flex align-center justify-center`

<details>
<summary>Answer</summary>

**C. `flex justify-center items-center`**

- `justify-center` - center theo main axis (horizontal với flex-row)
- `items-center` - center theo cross axis (vertical với flex-row)
- Kết hợp cả hai = center hoàn toàn
</details>

---

## Question 8 (True/False)

True hay False: `flex-1` sẽ hoạt động ngay cả khi parent không phải là flex container?

<details>
<summary>Answer</summary>

**False**

`flex-1` chỉ hoạt động khi parent là flex container (có class `flex` hoặc `inline-flex`).

```jsx
// ❌ Won't work
<div>
  <div className="flex-1">No effect</div>
</div>

// ✅ Works
<div className="flex">
  <div className="flex-1">Takes remaining space</div>
</div>
```
</details>

---

## Question 9 (Code Analysis)

Với layout sau, sidebar sẽ có width bao nhiêu?

```jsx
<div className="flex">
  <aside className="flex-none w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

A. 64px
B. 256px (16rem)
C. 50% của container
D. Auto (tùy content)

<details>
<summary>Answer</summary>

**B. 256px (16rem)**

- `flex-none` = không grow, không shrink
- `w-64` = width: 16rem = 256px
- Sidebar sẽ luôn giữ width 256px
- `main` với `flex-1` sẽ chiếm phần còn lại
</details>

---

## Question 10 (Multiple Choice)

Để một grid item span qua 2 cột, dùng class nào?

A. `span-2`
B. `col-2`
C. `col-span-2`
D. `grid-span-2`

<details>
<summary>Answer</summary>

**C. `col-span-2`**

```jsx
<div className="grid grid-cols-4">
  <div className="col-span-2">Spans 2 columns</div>
  <div>1 column</div>
  <div>1 column</div>
</div>
```

`col-span-{n}` để span columns, `row-span-{n}` để span rows.
</details>

---

## Bonus Question (Advanced)

Có bao nhiêu lỗi trong code sau?

```jsx
<div className="gap-4">
  <div className="grid-cols-3">
    <div className="flex-1">A</div>
    <div className="col-span-2">B</div>
  </div>
</div>
```

<details>
<summary>Answer</summary>

**3 lỗi:**

1. `gap-4` không hoạt động vì parent không phải flex/grid
2. `grid-cols-3` không hoạt động vì thiếu `grid`
3. `flex-1` không hoạt động vì parent không phải flex container
4. `col-span-2` không hoạt động vì không có grid container

**Fixed version:**
```jsx
<div className="grid gap-4">
  <div className="grid grid-cols-3">
    <div>A</div>
    <div className="col-span-2">B</div>
  </div>
</div>
```
</details>

---

## Score Calculation

| Score | Result |
|-------|--------|
| 10/10 | Excellent! |
| 8-9/10 | Pass |
| 6-7/10 | Review needed |
| < 6/10 | Re-study required |

**Your Score:** ___/10
