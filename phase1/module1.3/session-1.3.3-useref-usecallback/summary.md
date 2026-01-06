# Session 1.3.3 Summary - useRef & useCallback

## Checklist - Hoan thanh session

### useRef Fundamentals
- [x] Hieu syntax: `useRef<Type>(initialValue)`
- [x] Hieu `ref.current` la cach access gia tri
- [x] Biet rang thay doi `ref.current` KHONG trigger re-render
- [x] Biet initial value cho DOM refs la `null`

### useRef DOM Access
- [x] Tao ref cho input: `useRef<HTMLInputElement>(null)`
- [x] Attach ref to element: `<input ref={inputRef} />`
- [x] Access DOM methods: `inputRef.current?.focus()`
- [x] Biet cac DOM types: HTMLInputElement, HTMLDivElement, etc.

### useRef for Mutable Values
- [x] Luu previous value pattern voi useEffect
- [x] Luu timer IDs (interval, timeout)
- [x] Hieu khi nao dung ref thay vi state

### useCallback Fundamentals
- [x] Hieu syntax: `useCallback(fn, deps)`
- [x] Biet rang useCallback memoize function REFERENCE
- [x] Hieu dependencies array giong useEffect

### useCallback + React.memo Pattern
- [x] Wrap child voi `React.memo()`
- [x] Pass memoized callback to child
- [x] Hieu khi nao useCallback co hieu qua

### Best Practices
- [x] Dung functional update de giam dependencies
- [x] Null check truoc khi access ref.current
- [x] Chi dung useCallback khi can thiet

### Exercises Completed
- [x] Exercise 1: useRef Basics (focus input, scroll to element)
- [x] Exercise 2: useRef Advanced (previous value, timer)
- [x] Exercise 3: useCallback (memoized callbacks, React.memo)

### Quiz
- [x] Dat 9/10 cau dung ✅ PASSED

---

## Quick Reference (Tham khao nhanh)

### useRef Syntax
```tsx
// DOM Reference
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();

// Mutable Value
const countRef = useRef(0);
countRef.current += 1; // No re-render!

// Previous Value
const prevRef = useRef<number>();
useEffect(() => {
  prevRef.current = currentValue;
}, [currentValue]);
```

### useCallback Syntax
```tsx
// No dependencies - never changes
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);

// With dependencies - changes when deps change
const handleMultiply = useCallback(() => {
  setCount(c => c * multiplier);
}, [multiplier]);
```

### React.memo Pattern
```tsx
const MemoChild = memo(function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>;
});

// Parent
const callback = useCallback(() => {...}, []);
<MemoChild onClick={callback} />
```

---

## Decision Matrix (Ma tran quyet dinh)

### Khi nao dung useRef?
| Scenario | Dung? |
|----------|-------|
| Access DOM element | YES |
| Luu previous value | YES |
| Luu timer ID | YES |
| Gia tri can hien thi UI | NO - dung useState |

### Khi nao dung useCallback?
| Scenario | Dung? |
|----------|-------|
| Pass to React.memo child | YES |
| Callback la dep cua useEffect | YES |
| Inline handler don gian | NO |
| Child khong dung memo | NO |

---

## Common Mistakes (Loi thuong gap)

### useRef
```tsx
// SAI: Dung ref cho UI value
const countRef = useRef(0);
<p>{countRef.current}</p> // Khong update!

// SAI: Khong null check
inputRef.current.focus(); // Error!

// DUNG
inputRef.current?.focus();
```

### useCallback
```tsx
// SAI: Quen dependency
const logCount = useCallback(() => {
  console.log(count); // Stale!
}, []); // Missing: count

// SAI: Khong can thiet
const handleClick = useCallback(() => {...}, []);
<button onClick={handleClick}>Click</button> // Vo ich!

// DUNG: Voi memoized child
<MemoChild onClick={handleClick} />
```

---

## Session Completed!

**What's Next:** Session 1.3.4 - useMemo & Custom Hooks
- useMemo de memoize VALUES (khong phai functions)
- Custom hooks de reuse logic

---

**VERSION:** 1.0
**SESSION:** 1.3.3 - useRef & useCallback
**MODULE:** 1.3 - Hooks Deep Dive
