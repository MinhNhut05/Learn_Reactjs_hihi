# Summary - Session 1.3.5: useMemo & Custom Hooks

## ✅ Checklist kiến thức

### useMemo

- [ ] Hiểu useMemo syntax: `useMemo(() => value, [deps])`
- [ ] Biết khi nào DÙNG: expensive calc, stable reference
- [ ] Biết khi nào KHÔNG dùng: simple calc, unstable deps
- [ ] Phân biệt useMemo vs useCallback

### Custom Hooks

- [ ] Biết naming convention: phải bắt đầu bằng `use`
- [ ] Hiểu Rules of Hooks trong custom hooks
- [ ] Nắm return patterns: Tuple vs Object
- [ ] Biết dùng TypeScript generics
- [ ] Luôn cleanup side effects

### Common Hooks đã build

- [ ] `useToggle` - Boolean toggle
- [ ] `useLocalStorage` - Persist to localStorage
- [ ] `useDebounce` - Delay value updates
- [ ] `useFetch` - Data fetching with states

---

## 🔑 Quick Reference

### useMemo Syntax

```tsx
const memoizedValue = useMemo(() => expensiveCalculation(a, b), [a, b]);
```

### Custom Hook Template

```tsx
function useCustomHook<T>(param: T) {
  const [state, setState] = useState<T>(param);

  useEffect(() => {
    // Side effect
    return () => {
      /* Cleanup */
    };
  }, [dependency]);

  return { state, setState }; // hoặc [state, setState] as const
}
```

### useToggle

```tsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle] as const;
}
```

### useLocalStorage

```tsx
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
```

### useDebounce

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

---

## ⚠️ Common Mistakes

| Lỗi              | Fix                                     |
| ---------------- | --------------------------------------- |
| Missing deps     | Thêm đầy đủ dependencies                |
| Overuse useMemo  | Chỉ dùng khi thực sự expensive          |
| Hook không "use" | Đổi tên thành use\*                     |
| Thiếu `as const` | Thêm để TypeScript infer đúng tuple     |
| Thiếu cleanup    | Return cleanup function trong useEffect |

---

## 📊 So sánh

| Hook        | Cache    | Return         | Use case         |
| ----------- | -------- | -------------- | ---------------- |
| useMemo     | Value    | Computed value | Expensive calc   |
| useCallback | Function | Memoized fn    | Stable callbacks |

| Pattern    | Khi nào dùng              |
| ---------- | ------------------------- |
| `[a, b]`   | 2-3 values, cần rename    |
| `{ a, b }` | Nhiều props, lấy chọn lọc |

---

**Session hoàn thành khi:**

- ✅ 3 exercises done
- ✅ Quiz >= 8/10
- ✅ Build được 4 custom hooks
