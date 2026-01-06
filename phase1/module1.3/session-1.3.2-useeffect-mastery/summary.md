# Session 1.3.2: useEffect Mastery - Summary

> Quick reference và checklist sau khi hoàn thành session

---

## Checklist - Tôi đã hiểu

### 1. useEffect Fundamentals

- [ ] useEffect là gì và khi nào dùng (side effects)
- [ ] Effect timing: chạy SAU render và DOM update
- [ ] Syntax: `useEffect(() => { setup; return cleanup; }, [deps]);`

### 2. Dependencies Array

- [ ] `[]` = chạy 1 lần khi mount
- [ ] `[count]` = chạy khi mount + khi count thay đổi
- [ ] Không có deps = chạy MỖI render (dangerous!)
- [ ] React dùng `Object.is()` để compare - objects/arrays là references

### 3. Cleanup Functions

- [ ] Cleanup chạy: trước effect tiếp theo VÀ khi unmount
- [ ] Event listeners: `addEventListener` → `removeEventListener`
- [ ] Timers: `setInterval` → `clearInterval`
- [ ] Fetch: `AbortController` → `abort()`

### 4. Data Fetching

- [ ] Loading/Error state management
- [ ] AbortController để cancel pending requests
- [ ] AbortError không phải lỗi thật - ignore nó
- [ ] Race condition và cách AbortController giải quyết

### 5. Common Mistakes

- [ ] Infinite loop: missing deps hoặc setState trong effect
- [ ] Stale closure: dùng functional update `prev => prev + 1`
- [ ] Memory leak: missing cleanup
- [ ] Không nên dùng effect cho derived state

---

## Quick Reference

### Dependencies Cheat Sheet

```tsx
// Runs ONCE on mount
useEffect(() => {
  // one-time setup
}, []);

// Runs when count changes
useEffect(() => {
  // react to count
}, [count]);

// Runs EVERY render (usually wrong!)
useEffect(() => {
  // runs too often!
});
```

### Cleanup Template

```tsx
useEffect(() => {
  // Setup
  window.addEventListener("resize", handler);

  // Cleanup
  return () => {
    window.removeEventListener("resize", handler);
  };
}, []);
```

### Data Fetching Template

```tsx
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const res = await fetch(url, { signal: controller.signal });
      const data = await res.json();
      setData(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, [url]);
```

### Don't Use Effect For

```tsx
// ❌ Derived state
useEffect(() => {
  setFiltered(items.filter(...));
}, [items]);

// ✅ Compute during render
const filtered = items.filter(...);

// ❌ Event response
useEffect(() => {
  console.log("clicked", count);
}, [count]);

// ✅ Log in handler
const handleClick = () => {
  console.log("clicked", count);
  setCount(c => c + 1);
};
```

---

## Session Completion

### Exercises Done:

- [ ] Exercise 1: Effect Basics (7 TODOs)
- [ ] Exercise 2: Cleanup Functions (12 TODOs)
- [ ] Exercise 3: Data Fetching (9 TODOs)

### Quiz:

- [ ] Score >= 8/10

### Ready for Next Session:

- [ ] Understand dependencies array
- [ ] Know when and how to cleanup
- [ ] Can handle async operations safely
- [ ] Know when NOT to use useEffect

---

## Next Up

**Session 1.3.3: useRef & useCallback**

- useRef for DOM access and mutable values
- useCallback for stable function references
- When to use each hook

---

## Resources

- [React Docs: useEffect](https://react.dev/reference/react/useEffect)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
