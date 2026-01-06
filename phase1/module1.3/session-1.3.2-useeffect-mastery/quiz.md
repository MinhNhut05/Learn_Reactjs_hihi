# Session 1.3.2: useEffect Mastery - Quiz

> **Pass Score:** 8/10 (80%)
> **Time:** 20-30 minutes

---

## Instructions

- Đọc kỹ từng câu hỏi
- Chọn 1 đáp án đúng nhất
- Đáp án ở cuối file
- Nếu dưới 8/10, review lại COMPLETE_THEORY.md

---

## Questions

### Question 1: Dependencies Array Basics

```tsx
useEffect(() => {
  console.log("Effect runs");
}, []);
```

Khi nào effect này chạy?

- A) Mỗi lần component render
- B) Chỉ 1 lần khi component mount
- C) Không bao giờ chạy
- D) Khi dependencies array thay đổi

---

### Question 2: No Dependencies

```tsx
useEffect(() => {
  console.log("Effect runs");
});
```

Khi nào effect này chạy?

- A) Chỉ 1 lần khi mount
- B) Mỗi lần component render
- C) Không bao giờ chạy
- D) Khi state thay đổi

---

### Question 3: Effect Timing

```tsx
function Example() {
  console.log("1. Render");

  useEffect(() => {
    console.log("2. Effect");
  }, []);

  return <div>Hello</div>;
}
```

Thứ tự console output khi component mount?

- A) "2. Effect" → "1. Render"
- B) "1. Render" → "2. Effect"
- C) Chỉ "1. Render"
- D) Chỉ "2. Effect"

---

### Question 4: Cleanup Function

```tsx
useEffect(() => {
  const handler = () => console.log("clicked");
  window.addEventListener("click", handler);

  return () => {
    window.removeEventListener("click", handler);
  };
}, []);
```

Cleanup function (return) chạy khi nào?

- A) Ngay sau khi effect chạy
- B) Trước khi effect chạy lần tiếp theo VÀ khi unmount
- C) Chỉ khi component unmount
- D) Không bao giờ chạy vì dependencies là []

---

### Question 5: Infinite Loop

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  });

  return <div>{count}</div>;
}
```

Điều gì xảy ra?

- A) Count tăng lên 1 và dừng
- B) Count tăng lên vô hạn (infinite loop)
- C) Không có gì xảy ra
- D) Error: Maximum update depth exceeded

---

### Question 6: Stale Closure Fix

```tsx
// Có interval đếm seconds, muốn cleanup đúng cách
useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(/* ??? */);
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

Điền gì vào `???` để tránh stale closure?

- A) `seconds + 1`
- B) `(prev) => prev + 1`
- C) `1`
- D) `count + 1`

---

### Question 7: AbortController

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    });

  return () => controller.abort();
}, [url]);
```

Tại sao check `err.name !== "AbortError"`?

- A) Để ignore tất cả errors
- B) Vì AbortError không phải lỗi thật - chỉ là cancelled request
- C) Để log tất cả errors
- D) Để retry request

---

### Question 8: Race Condition

User type nhanh: "A" → "AB" → "ABC". Không có cleanup.
Request 1 (A) slow, Request 3 (ABC) fast.

Điều gì xảy ra?

- A) UI hiển thị kết quả của "ABC" (đúng)
- B) UI hiển thị kết quả của "A" (sai - stale data)
- C) UI hiển thị cả 3 kết quả
- D) Error xảy ra

---

### Question 9: When NOT to Use useEffect

```tsx
function FilteredList({ items, filter }) {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(items.filter(i => i.includes(filter)));
  }, [items, filter]);

  return <List items={filteredItems} />;
}
```

Đây là pattern:

- A) Tốt - đúng cách dùng useEffect
- B) Xấu - nên compute filteredItems trực tiếp trong render
- C) Xấu - thiếu cleanup
- D) Tốt - cần useEffect để react to changes

---

### Question 10: Dependencies Comparison

```tsx
const user = { name: "John" };

useEffect(() => {
  console.log("User changed");
}, [user]);
```

Effect chạy bao nhiêu lần sau mỗi render?

- A) 0 lần - user không thay đổi
- B) 1 lần - chỉ khi mount
- C) Mỗi render - vì user là object mới mỗi render
- D) Chỉ khi user.name thay đổi

---

## Answers

<details>
<summary>Click to reveal answers</summary>

### Đáp án:

1. **B** - `[]` = empty dependencies = chỉ chạy 1 lần khi mount

2. **B** - Không có dependencies array = chạy MỖI render

3. **B** - Render trước, Effect sau (effect chạy SAU DOM update)

4. **B** - Cleanup chạy:
   - Trước effect chạy lần tiếp (khi deps change)
   - Khi component unmount

5. **D** - Maximum update depth exceeded:
   - Effect → setCount → re-render → effect → setCount → ...
   - React detect infinite loop và throw error

6. **B** - `(prev) => prev + 1`:
   - Functional update dùng prev value
   - Không depend on closure của seconds
   - Luôn có giá trị mới nhất

7. **B** - AbortError không phải lỗi thật:
   - Chỉ là signal rằng request bị cancelled
   - Không nên show cho user

8. **B** - UI hiển thị "A" (stale data):
   - Request 3 trả về trước → set data "ABC"
   - Request 1 trả về sau → OVERWRITE với data "A"
   - Race condition!

9. **B** - Nên compute trực tiếp:
   ```tsx
   const filteredItems = items.filter(i => i.includes(filter));
   ```
   - Không cần state + effect
   - Tránh extra re-render cycle

10. **C** - Mỗi render:
    - `{ name: "John" }` là object MỚI mỗi render
    - `Object.is(obj1, obj2)` = false (different references)
    - Fix: dùng `[user.name]` hoặc `useMemo`

### Scoring:

- 10/10: Excellent! Ready for next session
- 8-9/10: Good understanding
- 6-7/10: Review weak areas
- < 6/10: Re-read COMPLETE_THEORY.md

</details>

---

## Key Concepts Checklist

After this quiz, make sure you understand:

- [ ] Dependencies array: `[]` vs `[deps]` vs no array
- [ ] Effect timing: runs AFTER render
- [ ] Cleanup: runs before next effect AND on unmount
- [ ] Stale closures: use functional updates
- [ ] AbortController: cancel pending requests
- [ ] Race conditions: why cleanup prevents them
- [ ] When NOT to use useEffect (derived state)
- [ ] Object/Array references in dependencies
