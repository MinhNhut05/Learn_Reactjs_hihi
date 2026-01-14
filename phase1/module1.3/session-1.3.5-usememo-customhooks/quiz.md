# Quiz Session 1.3.5 - useMemo & Custom Hooks

**Format: Câu hỏi phỏng vấn**

---

## Câu 1: useMemo cơ bản

**Interviewer:** "useMemo dùng để làm gì? Khác useCallback như thế nào?"

**Expected Answer:**

- `useMemo` dùng để **cache kết quả tính toán**, chỉ tính lại khi dependencies thay đổi
- `useCallback` dùng để **cache function reference**
- Khác biệt:
  - `useMemo(() => value, deps)` → return **value**
  - `useCallback(() => {}, deps)` → return **function**
- Thực ra `useCallback(fn, deps)` tương đương `useMemo(() => fn, deps)`

---

## Câu 2: Khi nào dùng useMemo?

**Interviewer:** "Cho tôi 2-3 cases nên dùng useMemo, và 1-2 cases KHÔNG nên dùng?"

**Expected Answer:**

**Nên dùng:**

1. Expensive calculations (filter/sort 1000+ items)
2. Object/Array cần stable reference cho React.memo child
3. Giá trị được tính toán và dùng ở nhiều nơi

**Không nên dùng:**

1. Phép tính đơn giản (`count * 2`)
2. Object không được pass cho memoized children
3. Dependencies thay đổi liên tục → memo vô nghĩa

---

## Câu 3: Dependencies Array

**Interviewer:** "Code này có vấn đề gì?"

```tsx
const filtered = useMemo(() => {
  return items.filter((i) => i.name.includes(searchTerm));
}, [items]);
```

**Expected Answer:**

- **Thiếu `searchTerm`** trong dependencies array
- Khi `searchTerm` thay đổi, `filtered` sẽ **không được tính lại**
- Fix: `[items, searchTerm]`
- Có thể dùng **ESLint plugin `react-hooks/exhaustive-deps`** để tự động detect

---

## Câu 4: Custom Hook naming

**Interviewer:** "Tại sao custom hooks phải bắt đầu bằng 'use'?"

**Expected Answer:**

- Đây là **convention bắt buộc** để React nhận diện đây là hook
- React dùng tên để:
  1. **Enforce Rules of Hooks** (không gọi trong conditions/loops)
  2. **Lint rules** có thể check đúng cách
- Nếu không có `use`, React không biết đây là hook → lint không warning → dễ vi phạm rules

---

## Câu 5: Return pattern

**Interviewer:** "Khi nào dùng tuple return `[a, b]` và khi nào dùng object `{ a, b }`?"

**Expected Answer:**

**Tuple `[a, b]`:**

- Khi giống pattern useState (state + setter)
- Có 2-3 values
- User thường muốn đổi tên biến: `const [isOpen, toggle] = useToggle()`

**Object `{ a, b }`:**

- Khi có nhiều properties
- User chỉ cần lấy 1-2 properties: `const { refetch } = useFetch(url)`
- API phức tạp, cần tên rõ ràng

---

## Câu 6: "as const" trong TypeScript

**Interviewer:** "Đoạn code này có issue gì?"

```tsx
function useToggle() {
  const [value, setValue] = useState(false);
  return [value, () => setValue((v) => !v)];
}

const [isOpen, toggle] = useToggle();
toggle(); // Error?
```

**Expected Answer:**

- TypeScript infer return type là `(boolean | (() => void))[]`
- `toggle` có type `boolean | (() => void)` → không thể gọi được
- Fix: thêm `as const` để preserve tuple type:

```tsx
return [value, () => setValue((v) => !v)] as const;
```

---

## Câu 7: Cleanup trong custom hook

**Interviewer:** "Implement useWindowWidth hook, chú ý memory leak"

**Expected Answer:**

```tsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup để tránh memory leak
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
```

---

## Câu 8: useDebounce implementation

**Interviewer:** "Giải thích cách implement useDebounce hook"

**Expected Answer:**

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel timeout nếu value thay đổi trước delay
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

**Giải thích:**

1. Mỗi khi `value` thay đổi, set timeout mới
2. Cleanup function clear timeout cũ
3. Chỉ khi user ngừng thay đổi `delay` ms, debouncedValue mới update

---

## Câu 9: useFetch với AbortController

**Interviewer:** "Tại sao cần AbortController trong useFetch?"

**Expected Answer:**

- **Race condition**: Nếu user navigate đi, fetch cũ vẫn resolve → set state trên unmounted component → warning
- **Memory leak**: Pending requests giữ reference đến component
- **Stale data**: Request cũ resolve sau request mới → hiển thị data cũ

**Implementation:**

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then((res) => res.json())
    .then(setData)
    .catch((err) => {
      if (err.name !== "AbortError") setError(err);
    });

  return () => controller.abort(); // Cancel khi unmount hoặc url thay đổi
}, [url]);
```

---

## Câu 10: Composing Hooks

**Interviewer:** "Làm sao tạo usePersistedState hook kết hợp useState + localStorage?"

**Expected Answer:**

```tsx
function usePersistedState<T>(key: string, defaultValue: T) {
  // Lazy init: đọc từ localStorage
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}
```

**Key points:**

- Lazy initialization để không đọc localStorage mỗi render
- useEffect để sync khi state thay đổi
- Error handling cho JSON parse
- Generic type cho reusability

---

## Đáp án tham khảo

| Câu | Keyword chính                           |
| --- | --------------------------------------- |
| 1   | Cache value vs cache function           |
| 2   | Expensive calc, stable ref, simple calc |
| 3   | Missing dependency, ESLint plugin       |
| 4   | Rules enforcement, lint checking        |
| 5   | Tuple = 2-3 values, Object = many props |
| 6   | as const, tuple type inference          |
| 7   | removeEventListener cleanup             |
| 8   | setTimeout + clearTimeout               |
| 9   | AbortController, race condition         |
| 10  | Lazy init, useEffect sync, generics     |

---

**Pass criteria:** Trả lời được 8/10 câu với đầy đủ key points
