# Quiz - Session 1.2.3: Component Lifecycle

> Trả lời các câu hỏi sau để kiểm tra hiểu biết về lifecycle và useEffect

---

## Câu 1: Lifecycle Phases

**Component lifecycle có bao nhiêu phases chính?**

- A) 2 phases: render và update
- B) 3 phases: mount, update, unmount
- C) 4 phases: create, mount, update, destroy
- D) 1 phase: render

<details>
<summary>📝 Đáp án</summary>

**B) 3 phases: mount, update, unmount**

- **Mount:** Component xuất hiện lần đầu trên DOM
- **Update:** Component re-render do state/props thay đổi
- **Unmount:** Component bị remove khỏi DOM

</details>

---

## Câu 2: useEffect Dependencies

**Đoạn code sau chạy khi nào?**

```tsx
useEffect(() => {
  console.log('Effect ran!')
}, [])
```

- A) Chạy sau mỗi render
- B) Chạy một lần khi mount
- C) Chạy khi component unmount
- D) Không bao giờ chạy

<details>
<summary>📝 Đáp án</summary>

**B) Chạy một lần khi mount**

Empty dependencies `[]` nghĩa là effect chỉ chạy một lần khi component mount.

</details>

---

## Câu 3: Dependencies Array

**Đoạn code sau chạy khi nào?**

```tsx
useEffect(() => {
  console.log('Effect ran!')
}, [userId, page])
```

- A) Chỉ khi mount
- B) Khi mount + khi userId HOẶC page thay đổi
- C) Chỉ khi cả userId VÀ page đều thay đổi
- D) Sau mỗi render

<details>
<summary>📝 Đáp án</summary>

**B) Khi mount + khi userId HOẶC page thay đổi**

Effect chạy khi mount và mỗi khi BẤT KỲ dependency nào trong array thay đổi.

</details>

---

## Câu 4: No Dependencies

**Đoạn code sau chạy khi nào?**

```tsx
useEffect(() => {
  console.log('Effect ran!')
})
```

- A) Chỉ khi mount
- B) Chỉ khi unmount
- C) Sau mỗi render (mount + mọi update)
- D) Không bao giờ chạy

<details>
<summary>📝 Đáp án</summary>

**C) Sau mỗi render (mount + mọi update)**

Không có dependencies array = effect chạy sau MỌI render. Cẩn thận với pattern này!

</details>

---

## Câu 5: Cleanup Function

**Cleanup function trong useEffect chạy khi nào?**

```tsx
useEffect(() => {
  console.log('Setup')
  return () => {
    console.log('Cleanup')
  }
}, [userId])
```

- A) Chỉ khi mount
- B) Chỉ khi unmount
- C) Trước mỗi effect tiếp theo + khi unmount
- D) Sau mỗi effect

<details>
<summary>📝 Đáp án</summary>

**C) Trước mỗi effect tiếp theo + khi unmount**

Cleanup chạy:
1. Trước khi effect chạy lại (khi deps thay đổi)
2. Khi component unmount

</details>

---

## Câu 6: Memory Leak

**Đoạn code nào gây memory leak?**

```tsx
// Option A
useEffect(() => {
  const id = setInterval(() => {}, 1000)
}, [])

// Option B
useEffect(() => {
  const id = setInterval(() => {}, 1000)
  return () => clearInterval(id)
}, [])
```

- A) Option A (không có cleanup)
- B) Option B (có cleanup)
- C) Cả hai đều leak
- D) Không có đoạn nào leak

<details>
<summary>📝 Đáp án</summary>

**A) Option A (không có cleanup)**

Option A không clear interval khi unmount → interval tiếp tục chạy → memory leak.

Option B có cleanup nên không leak.

</details>

---

## Câu 7: Correct Cleanup

**Cách cleanup đúng cho addEventListener?**

```tsx
useEffect(() => {
  const handleClick = () => console.log('clicked')
  window.addEventListener('click', handleClick)

  // Cleanup?
}, [])
```

- A) `return () => window.removeEventListener('click')`
- B) `return () => window.removeEventListener('click', handleClick)`
- C) `return () => handleClick = null`
- D) Không cần cleanup

<details>
<summary>📝 Đáp án</summary>

**B) `return () => window.removeEventListener('click', handleClick)`**

Phải pass đúng function reference khi remove listener.

</details>

---

## Câu 8: Effect Order

**Console output là gì khi component mount?**

```tsx
function Demo() {
  console.log('1: Render')

  useEffect(() => {
    console.log('2: Effect')
  }, [])

  console.log('3: After useEffect call')

  return <div>Demo</div>
}
```

- A) 1, 2, 3
- B) 1, 3, 2
- C) 2, 1, 3
- D) 3, 1, 2

<details>
<summary>📝 Đáp án</summary>

**B) 1, 3, 2**

1. `1: Render` - trong render phase
2. `3: After useEffect call` - vẫn trong render phase (useEffect chỉ đăng ký, chưa chạy)
3. `2: Effect` - chạy SAU khi render hoàn thành

useEffect chạy **sau** khi React đã render xong DOM.

</details>

---

## Câu 9: Fetch Pattern

**Tại sao cần cancelled flag trong pattern này?**

```tsx
useEffect(() => {
  let cancelled = false

  fetchData().then(data => {
    if (!cancelled) setData(data)
  })

  return () => { cancelled = true }
}, [id])
```

- A) Để tăng performance
- B) Để tránh update state của unmounted component
- C) Để cache data
- D) Không cần thiết

<details>
<summary>📝 Đáp án</summary>

**B) Để tránh update state của unmounted component**

Nếu component unmount trước khi fetch complete, việc gọi setData sẽ gây warning/error. Cancelled flag ngăn điều này.

</details>

---

## Câu 10: Timer Dependencies

**Dependencies nào đúng cho timer này?**

```tsx
function Timer() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [???])
}
```

- A) `[]`
- B) `[count]`
- C) `[isRunning]`
- D) `[count, isRunning]`

<details>
<summary>📝 Đáp án</summary>

**C) `[isRunning]`**

- `isRunning` được dùng trong condition → phải trong deps
- `count` không cần vì dùng functional update `setCount(c => c + 1)`
- `setCount` không cần vì stable (không thay đổi giữa renders)

</details>

---

## 📊 Đánh giá

| Số câu đúng | Đánh giá |
|-------------|----------|
| 10/10 | Xuất sắc! Master lifecycle |
| 8-9/10 | Tốt! Hiểu rõ concepts |
| 6-7/10 | Khá! Cần review lại một số điểm |
| < 6/10 | Cần đọc lại COMPLETE_THEORY.md |
