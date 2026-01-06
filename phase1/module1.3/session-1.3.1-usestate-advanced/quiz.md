# Session 1.3.1: useState Advanced - QUIZ

**Thời gian:** 15-20 phút
**Điểm đạt:** ≥ 8/10 (80%)
**Lưu ý:** Đọc kỹ câu hỏi, một số câu có thể có nhiều đáp án đúng

---

## Câu 1: Lazy Initialization Basics (1 điểm)

Đâu là cách ĐÚNG để lazy initialize state từ localStorage?

```tsx
A. const [data, setData] = useState(localStorage.getItem('key'));

B. const [data, setData] = useState(() => localStorage.getItem('key'));

C. const [data, setData] = useState(function() {
     return localStorage.getItem('key');
   });

D. Cả B và C đều đúng
```

**Đáp án:** ____

---

## Câu 2: Khi nào cần Lazy Init? (1 điểm)

Trường hợp nào SAI khi sử dụng lazy initialization?

```tsx
A. useState(() => Math.random())
B. useState(() => JSON.parse(localStorage.getItem('data')))
C. useState(() => [])
D. useState(() => computeExpensiveValue(props.input))
```

**Đáp án:** ____

**Giải thích:** ________________

---

## Câu 3: Direct vs Functional Update (1 điểm)

Code sau sẽ in ra giá trị gì khi click button?

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  return <button onClick={handleClick}>Click</button>;
}
```

**Đáp án:** ____
A. 0
B. 1
C. 3
D. undefined

---

## Câu 4: Functional Update Pattern (2 điểm)

Sửa code sau để counter tăng 3 mỗi click:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // FIX THIS CODE
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
}
```

**Code sửa:**
```tsx
const handleClick = () => {
  // YOUR ANSWER HERE



};
```

---

## Câu 5: Stale Closure trong setTimeout (2 điểm)

Code sau có vấn đề gì? Tại sao?

```tsx
function DelayedCounter() {
  const [count, setCount] = useState(0);

  const delayedIncrement = () => {
    setTimeout(() => {
      setCount(count + 1);
    }, 3000);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={delayedIncrement}>Delayed +1</button>
      <button onClick={() => setCount(c => c + 1)}>Instant +1</button>
    </div>
  );
}
```

**Vấn đề:** ____________________

**Cách fix:**
```tsx


```

---

## Câu 6: Object State Update (1 điểm)

Đâu là cách ĐÚNG để update nested object?

```tsx
interface User {
  name: string;
  address: { city: string; country: string };
}

const [user, setUser] = useState<User>({
  name: 'John',
  address: { city: 'NY', country: 'USA' }
});

// Muốn đổi city thành 'LA'

A. setUser({ ...user, address: { city: 'LA' } });

B. setUser({ ...user, address: { ...user.address, city: 'LA' } });

C. user.address.city = 'LA'; setUser(user);

D. setUser(prev => ({ ...prev, address: { ...prev.address, city: 'LA' } }));
```

**Đáp án:** ____ và ____
(Chọn TẤT CẢ các cách đúng)

---

## Câu 7: Performance Impact (1 điểm)

Component này có vấn đề performance gì?

```tsx
function HeavyComponent() {
  const [data, setData] = useState(processHugeDataset());
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{data.summary}</p>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
    </div>
  );
}
```

**Vấn đề:** ____________________

**Cách fix:** ____________________

---

## Câu 8: Multiple States Decision (1 điểm)

Với form sau, nên dùng multiple states hay single object state?

```tsx
// Option A: Multiple states
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');

// Option B: Single object
const [form, setForm] = useState({
  firstName: '',
  lastName: '',
  email: ''
});
```

**Chọn:** ____ (A hoặc B)

**Lý do:** ____________________

---

## ĐÁP ÁN VÀ GIẢI THÍCH

<details>
<summary>Click để xem đáp án (sau khi làm xong!)</summary>

### Câu 1: D
- Cả B và C đều đúng vì cùng truyền function thay vì value
- A sai vì gọi `getItem()` ngay → chạy mỗi render

### Câu 2: C
- `useState(() => [])` không cần lazy init vì `[]` rất rẻ
- Lazy init chỉ cần cho expensive operations

### Câu 3: A (in ra 0)
- `console.log(count)` chạy trong event handler
- Tại thời điểm đó, `count` vẫn là 0 (closure)
- Component chưa re-render

### Câu 4:
```tsx
const handleClick = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};
```

### Câu 5:
**Vấn đề:** Stale closure - `count` bị đóng băng khi tạo timeout

**Scenario:**
1. Click "Delayed +1" (count = 0)
2. Click "Instant +1" 5 lần → count = 5
3. Sau 3s, timeout chạy → `setCount(0 + 1)` → count = 1 (sai!)

**Fix:**
```tsx
setTimeout(() => {
  setCount(prev => prev + 1);
}, 3000);
```

### Câu 6: B và D
- B: Spread cả 2 levels, đúng
- D: Functional update + spread, đúng và tốt hơn
- A: SAI - mất `country`
- C: SAI - mutation

### Câu 7:
**Vấn đề:** `processHugeDataset()` chạy mỗi render (khi click button)

**Fix:**
```tsx
const [data, setData] = useState(() => processHugeDataset());
```

### Câu 8: B (Single object)
**Lý do:**
- 3 fields liên quan (form data)
- Dễ handle onChange chung
- Dễ validate và submit
- Option A OK nếu < 3 fields, nhưng B tốt hơn cho scalability

</details>

---

## SCORING

- **10/10:** Excellent! Bạn đã nắm vững useState advanced
- **8-9/10:** Very Good! Cần review lại 1-2 concepts
- **6-7/10:** Good! Đọc lại COMPLETE_THEORY.md
- **< 6/10:** Cần học lại từ đầu

**Điểm của bạn:** ____/10
