# Summary - Session 1.2.3: Component Lifecycle

## Concepts Learned

### 1. Component Lifecycle

| Phase | Mô tả | Khi nào |
|-------|-------|---------|
| **Mount** | Component xuất hiện trên DOM | Lần đầu render |
| **Update** | Component re-render | State/props thay đổi |
| **Unmount** | Component bị remove | Điều kiện render false |

### 2. useEffect Syntax

```tsx
useEffect(() => {
  // Effect code - chạy SAU render
  return () => {
    // Cleanup - chạy TRƯỚC effect tiếp theo / unmount
  }
}, [dependencies])
```

### 3. Dependencies Cheat Sheet

| Dependencies | Chạy khi |
|--------------|----------|
| `[]` | Chỉ mount |
| `[a, b]` | Mount + khi a hoặc b thay đổi |
| Không có | Sau mỗi render |

### 4. Cleanup Patterns

| Resource | Setup | Cleanup |
|----------|-------|---------|
| Interval | `setInterval()` | `clearInterval(id)` |
| Timeout | `setTimeout()` | `clearTimeout(id)` |
| Event | `addEventListener()` | `removeEventListener()` |
| Fetch | `fetch()` | Cancelled flag |

---

## Key Takeaways

1. **Effect chạy SAU render** - không block UI
2. **Cleanup chạy TRƯỚC effect tiếp theo** và khi unmount
3. **Dependencies control timing** - empty = mount only
4. **Always cleanup** intervals, listeners, subscriptions
5. **Functional updates** (`setCount(c => c + 1)`) tránh stale closures

---

## Common Mistakes to Avoid

- Quên cleanup → memory leaks
- Missing dependencies → stale values
- Object/Array trong deps → infinite loops
- Update state sau unmount → warnings

---

## Session Completed!

- [ ] Exercise 1: Lifecycle Logger
- [ ] Exercise 2: Timer with Cleanup
- [ ] Quiz score: ___/10

**Next Session:** 1.3.1 - useEffect Deep Dive
