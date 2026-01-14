# Session 1.3.5 - useMemo & Custom Hooks

## PHẦN 1: useMemo HOOK

### 1.1 useMemo là gì?

`useMemo` là hook dùng để **memoize** (lưu cache) kết quả của một phép tính expensive. React chỉ tính lại khi dependencies thay đổi.

```tsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]); // Chỉ tính lại khi a hoặc b thay đổi
```

**Mental Model:**

- `useMemo` = "Nhớ **giá trị** này"
- `useCallback` = "Nhớ **function** này"

---

### 1.2 Syntax chi tiết

```tsx
const cachedValue = useMemo(
  () => computeValue(dep1, dep2), // Factory function - return giá trị cần cache
  [dep1, dep2] // Dependencies array
);
```

**Các thành phần:**
| Phần | Mô tả |
|------|-------|
| `() => computeValue()` | Function tính toán, return giá trị |
| `[dep1, dep2]` | Array các dependencies |
| `cachedValue` | Giá trị được cache |

---

### 1.3 Khi nào DÙNG useMemo?

#### ✅ Case 1: Expensive Calculations

```tsx
function ProductList({ products, searchTerm }) {
  // Expensive: Filter + Sort 1000+ items
  const filteredProducts = useMemo(() => {
    console.log("Filtering..."); // Chỉ log khi cần tính lại
    return products
      .filter((p) => p.name.includes(searchTerm))
      .sort((a, b) => a.price - b.price);
  }, [products, searchTerm]);

  return (
    <ul>
      {filteredProducts.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

#### ✅ Case 2: Stable Object Reference (for React.memo)

```tsx
function Parent({ data }) {
  // Không có useMemo: config mới mỗi render → Child re-render
  // Có useMemo: config stable reference → Child skip re-render
  const config = useMemo(
    () => ({
      theme: "dark",
      showHeader: true,
    }),
    []
  );

  return <MemoizedChild config={config} />;
}
```

#### ✅ Case 3: Avoid Recalculating in Multiple Places

```tsx
function Dashboard({ orders }) {
  const stats = useMemo(
    () => ({
      total: orders.reduce((sum, o) => sum + o.amount, 0),
      count: orders.length,
      average:
        orders.length > 0
          ? orders.reduce((sum, o) => sum + o.amount, 0) / orders.length
          : 0,
    }),
    [orders]
  );

  return (
    <>
      <Summary stats={stats} />
      <Chart stats={stats} />
      <Report stats={stats} />
    </>
  );
}
```

---

### 1.4 Khi nào KHÔNG DÙNG useMemo?

#### ❌ Không cần thiết: Phép tính đơn giản

```tsx
// ❌ Sai: count * 2 rất nhanh, không cần memo
const doubled = useMemo(() => count * 2, [count]);

// ✅ Đúng: Viết trực tiếp
const doubled = count * 2;
```

#### ❌ Không cần thiết: Object mới mỗi render nhưng không affect child

```tsx
// ❌ Sai: Không có child nào dùng React.memo với config
const config = useMemo(() => ({ theme: "dark" }), []);

// ✅ Đúng: Đơn giản hơn
const config = { theme: "dark" };
```

#### ❌ Dependencies thay đổi liên tục

```tsx
// ❌ Sai: filter thay đổi mỗi keystroke, memo vô nghĩa
const filtered = useMemo(() => {
  return items.filter((i) => i.name.includes(filter));
}, [items, filter]); // filter thay đổi → vẫn tính lại

// → Xem xét dùng useDebounce cho filter trước
```

---

### 1.5 useMemo vs useCallback

| Tiêu chí         | useMemo                 | useCallback                   |
| ---------------- | ----------------------- | ----------------------------- |
| **Cache cái gì** | Giá trị (value)         | Function                      |
| **Return**       | Kết quả của computation | Function được memoize         |
| **Use case**     | Expensive calculations  | Stable callbacks cho children |

```tsx
// useMemo: Cache kết quả tính toán
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.order - b.order);
}, [items]);

// useCallback: Cache function
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);

// Tương đương nhưng dùng useMemo
const handleClick = useMemo(() => {
  return () => console.log(count);
}, [count]);
```

---

## PHẦN 2: CUSTOM HOOKS

### 2.1 Custom Hook là gì?

Custom Hook là **function bắt đầu bằng "use"** và có thể gọi các hooks khác bên trong. Giúp **tái sử dụng logic stateful** giữa các components.

```tsx
// Custom Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  return { count, increment, decrement };
}

// Sử dụng
function Counter() {
  const { count, increment, decrement } = useCounter(10);
  return <button onClick={increment}>{count}</button>;
}
```

---

### 2.2 Rules của Custom Hooks

#### 1. Tên PHẢI bắt đầu bằng "use"

```tsx
// ✅ Đúng
function useLocalStorage() {}
function useToggle() {}
function useFetch() {}

// ❌ Sai - React không nhận ra đây là hook
function getLocalStorage() {}
function toggleHook() {}
```

#### 2. Chỉ gọi hooks ở top level

```tsx
function useConditionalHook(condition) {
  // ❌ Sai: Gọi hook trong condition
  if (condition) {
    const [value, setValue] = useState("");
  }

  // ✅ Đúng: Hook ở top level
  const [value, setValue] = useState("");
  if (!condition) return null;
  return { value, setValue };
}
```

#### 3. Chỉ gọi trong React function hoặc custom hook khác

```tsx
// ✅ Đúng: Trong component
function MyComponent() {
  const toggle = useToggle();
}

// ✅ Đúng: Trong custom hook khác
function useAuth() {
  const storage = useLocalStorage("token", "");
}

// ❌ Sai: Trong function thường
function regularFunction() {
  const toggle = useToggle(); // Lỗi!
}
```

---

### 2.3 Return Patterns

#### Pattern 1: Tuple (Array) - Như useState

```tsx
function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle]; // [state, action]
}

// Usage - Có thể đặt tên tùy ý
const [isOpen, toggleOpen] = useToggle();
const [isDark, toggleTheme] = useToggle(true);
```

**Khi nào dùng Tuple:**

- Giống pattern của useState
- Có 2-3 values
- Người dùng thường đổi tên biến

#### Pattern 2: Object - Flexible

```tsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  return {
    value,
    toggle: () => setValue((v) => !v),
    setTrue: () => setValue(true),
    setFalse: () => setValue(false),
    reset: () => setValue(initial),
  };
}

// Usage - Destructuring theo tên
const { value, toggle, setTrue } = useToggle();
const { value: isOpen, toggle: toggleModal } = useToggle();
```

**Khi nào dùng Object:**

- Có nhiều values/actions
- Muốn chỉ lấy một số properties
- API phức tạp, cần tên rõ ràng

---

### 2.4 TypeScript Generics cho Hooks

```tsx
// Generic hook cho mọi kiểu data
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage - TypeScript tự infer type
const [name, setName] = useLocalStorage("name", ""); // string
const [count, setCount] = useLocalStorage("count", 0); // number
const [user, setUser] = useLocalStorage("user", { id: 1 }); // { id: number }
```

---

## PHẦN 3: COMMON CUSTOM HOOKS

### 3.1 useToggle

```tsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}

// Usage
function Modal() {
  const { value: isOpen, toggle, setFalse: close } = useToggle();

  return (
    <>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && (
        <div className="modal">
          <button onClick={close}>Close</button>
        </div>
      )}
    </>
  );
}
```

---

### 3.2 useLocalStorage

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  // Lazy initialization - đọc từ localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Sync to localStorage khi value thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

// Usage
function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [user, setUser] = useLocalStorage("user", null);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current: {theme}
    </button>
  );
}
```

---

### 3.3 useDebounce

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout để update debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clear timeout nếu value thay đổi trước khi delay hết
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage - Search với debounce
function SearchComponent() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // API call chỉ chạy sau 500ms không gõ
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

### 3.4 useFetch

```tsx
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const json = await response.json();
      setData(json);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    const cleanup = fetchData();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Usage
function UserProfile({ userId }: { userId: string }) {
  const {
    data: user,
    loading,
    error,
    refetch,
  } = useFetch<User>(`https://api.example.com/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

---

## PHẦN 4: COMMON MISTAKES & FIXES

### Mistake 1: Missing Dependencies trong useMemo

```tsx
// ❌ Sai: Thiếu `searchTerm` trong deps
const filtered = useMemo(() => {
  return items.filter((i) => i.name.includes(searchTerm));
}, [items]); // searchTerm thay đổi nhưng không re-compute!

// ✅ Đúng
const filtered = useMemo(() => {
  return items.filter((i) => i.name.includes(searchTerm));
}, [items, searchTerm]);
```

---

### Mistake 2: useMemo cho việc đơn giản

```tsx
// ❌ Sai: Phép tính quá đơn giản
const fullName = useMemo(() => {
  return `${firstName} ${lastName}`;
}, [firstName, lastName]);

// ✅ Đúng: Không cần memo
const fullName = `${firstName} ${lastName}`;
```

---

### Mistake 3: Custom Hook không bắt đầu bằng "use"

```tsx
// ❌ Sai: React không nhận đây là hook
function getToggle() {
  const [on, setOn] = useState(false); // Rules of Hooks bị vi phạm
  return [on, () => setOn((v) => !v)];
}

// ✅ Đúng
function useToggle() {
  const [on, setOn] = useState(false);
  return [on, () => setOn((v) => !v)];
}
```

---

### Mistake 4: Return không có "as const"

```tsx
// ❌ Sai: TypeScript infer thành (boolean | function)[]
function useToggle() {
  const [value, setValue] = useState(false);
  return [value, () => setValue((v) => !v)];
}
// toggle có type: boolean | (() => void) → không thể gọi toggle()

// ✅ Đúng: "as const" để preserve tuple type
function useToggle() {
  const [value, setValue] = useState(false);
  return [value, () => setValue((v) => !v)] as const;
}
// toggle có type: () => void → OK
```

---

### Mistake 5: Không cleanup trong custom hook với side effects

```tsx
// ❌ Sai: Memory leak nếu component unmount
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    // Missing cleanup!
  }, []);

  return width;
}

// ✅ Đúng
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler); // Cleanup!
  }, []);

  return width;
}
```

---

## TÓM TẮT

### useMemo Checklist

| Câu hỏi                                   | Có → useMemo | Không → Skip |
| ----------------------------------------- | ------------ | ------------ |
| Phép tính có expensive không? (>10ms)     | ✅           | ❌           |
| Object/Array có được pass cho React.memo? | ✅           | ❌           |
| Dependencies có ổn định không?            | ✅           | ❌           |

### Custom Hook Checklist

| Rule            | Mô tả                                   |
| --------------- | --------------------------------------- |
| Tên `use*`      | Bắt buộc, giúp React enforce rules      |
| Top-level calls | Không gọi hooks trong conditions/loops  |
| Return pattern  | Tuple cho đơn giản, Object cho phức tạp |
| TypeScript      | Dùng generics cho reusability           |
| Cleanup         | Luôn cleanup side effects               |
