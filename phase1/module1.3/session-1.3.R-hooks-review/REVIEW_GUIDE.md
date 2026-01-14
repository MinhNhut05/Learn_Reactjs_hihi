# 📚 Hooks Review Guide - Session 1.3.R

## Quick Reference Cheat Sheet

| Hook          | Purpose            | Key Points                           |
| ------------- | ------------------ | ------------------------------------ |
| `useState`    | Local state        | Lazy init, functional updates        |
| `useEffect`   | Side effects       | Deps array, cleanup, AbortController |
| `useRef`      | DOM/mutable values | No re-render, `.current`             |
| `useCallback` | Memoize function   | Use với `React.memo`                 |
| `useMemo`     | Memoize value      | Expensive calculations               |
| `useContext`  | Global state       | Provider pattern                     |
| `useReducer`  | Complex state      | Actions, dispatch                    |

---

## 1. useState

```tsx
// Basic
const [count, setCount] = useState(0);

// Lazy initialization (expensive initial value)
const [data, setData] = useState(() => expensiveOperation());

// Functional update (when new state depends on old state)
setCount((prev) => prev + 1);

// Object state (always spread!)
setUser((prev) => ({ ...prev, name: "New Name" }));
```

**⚠️ Common Mistakes:**

- Không dùng functional update trong loops/async
- Mutate state trực tiếp thay vì spread

---

## 2. useEffect

```tsx
// Run on every render
useEffect(() => {
  /* ... */
});

// Run once on mount
useEffect(() => {
  /* ... */
}, []);

// Run when dependencies change
useEffect(() => {
  /* ... */
}, [dep1, dep2]);

// Cleanup function
useEffect(() => {
  const handler = () => {};
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}, []);

// AbortController for fetch
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then((res) => res.json())
    .then(setData)
    .catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });
  return () => controller.abort();
}, [url]);
```

**⚠️ Common Mistakes:**

- Missing cleanup → memory leaks
- Wrong dependencies → stale data or infinite loops
- setState in effect without deps → infinite loop

---

## 3. useRef

```tsx
// DOM reference
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();

// Mutable value (không trigger re-render)
const countRef = useRef(0);
countRef.current++; // Không re-render!

// Previous value pattern
const prevValueRef = useRef(value);
useEffect(() => {
  prevValueRef.current = value;
}, [value]);
```

**useRef vs useState:**
| | useRef | useState |
|---|--------|----------|
| Re-render | ❌ | ✅ |
| Persist across renders | ✅ | ✅ |
| Use case | DOM, timers, prev values | UI state |

---

## 4. useCallback

```tsx
// Memoize function để tránh re-create
const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []); // Empty deps = function never changes

// With dependencies
const handleSearch = useCallback(
  (query: string) => {
    fetchResults(query, userId);
  },
  [userId]
); // Re-create when userId changes
```

**Khi nào dùng:**

- Pass callback cho `React.memo` child
- Callback là dependency của `useEffect`

---

## 5. useMemo

```tsx
// Memoize expensive calculation
const filteredItems = useMemo(() => {
  return items.filter((item) => item.name.includes(search));
}, [items, search]);

// Memoize object/array to maintain referential equality
const config = useMemo(
  () => ({
    theme: "dark",
    size: "large",
  }),
  []
);
```

**useMemo vs useCallback:**

```tsx
// These are equivalent:
useMemo(() => fn, deps);
useCallback(fn, deps);
```

---

## 6. useContext

```tsx
// 1. Create context
const ThemeContext = createContext<Theme>("light");

// 2. Provider component
function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

// 3. Consume context
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

---

## 7. useReducer

```tsx
// 1. Define types
type State = { count: number };
type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET"; payload: number };

// 2. Reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "SET":
      return { count: action.payload };
    default:
      return state;
  }
}

// 3. Use in component
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: "INCREMENT" });
dispatch({ type: "SET", payload: 10 });
```

---

## 8. Custom Hooks

```tsx
// Naming: always start with "use"
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
const [name, setName] = useLocalStorage("name", "");
```

---

## Quick Recall Questions

1. **useState**: Lazy init dùng khi nào?

   > Khi initial value cần expensive operation

2. **useEffect**: Cleanup chạy khi nào?

   > Before next effect run AND on unmount

3. **useRef**: Khác useState như thế nào?

   > Không trigger re-render

4. **useCallback vs useMemo**: Khác nhau?

   > useCallback memoize function, useMemo memoize value

5. **useContext + useReducer**: Kết hợp để làm gì?
   > Global state management (like Redux)

---

## Decision Tree: Chọn Hook Nào?

```
Cần lưu trữ gì đó?
├── Cần re-render khi thay đổi?
│   ├── State đơn giản? → useState
│   └── State phức tạp với nhiều actions? → useReducer
├── Không cần re-render?
│   └── useRef
└── Cần share state giữa nhiều components?
    └── useContext + useState/useReducer

Cần optimize performance?
├── Memoize expensive calculation? → useMemo
└── Memoize callback cho child? → useCallback

Cần side effects?
└── useEffect (với cleanup!)

Cần reuse logic?
└── Custom Hook
```
