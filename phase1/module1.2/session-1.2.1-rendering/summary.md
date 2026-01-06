# Session 1.2.1 - Rendering & Re-rendering - SUMMARY

> **Completed:** 2025-12-29
> **Score:** 8.6/10 (PASSED)
> **Module:** 1.2 - React Mental Model
> **Phase:** 1 - React Foundation

---

## 📊 SESSION RESULTS

| Component | Score | Notes |
|-----------|-------|-------|
| Exercise 1: Render Counter | 9.5/10 | useRef, useEffect, render triggers |
| Exercise 2: Parent-Child | 8/10 | Default re-render behavior |
| Exercise 3: Todo Optimize | 9/10 | React.memo, useCallback |
| Quiz | 8/10 | 8/10 correct |
| **AVERAGE** | **8.6/10** | ✅ PASSED |

---

## 🎯 KEY CONCEPTS LEARNED

### 1. Render Triggers

Component re-render khi:
- **State change:** `setState()` với giá trị khác
- **Props change:** Props từ parent thay đổi
- **Parent re-render:** Parent re-render → tất cả children re-render (default)
- **Context change:** Context value thay đổi

```tsx
// State change → re-render
setCount(count + 1)

// Ref change → NO re-render
ref.current += 1
```

### 2. useRef vs useState

| Feature | useState | useRef |
|---------|----------|--------|
| Trigger re-render | ✅ Yes | ❌ No |
| Persist across renders | ✅ Yes | ✅ Yes |
| Use case | UI data | Counting renders, DOM refs |

```tsx
// Đếm renders - dùng useRef
const renderCount = useRef(0)
useEffect(() => {
  renderCount.current += 1
})
```

### 3. useEffect Dependencies

```tsx
// Chạy sau MỌI render
useEffect(() => { ... })

// Chạy 1 lần (mount)
useEffect(() => { ... }, [])

// Chạy khi deps thay đổi
useEffect(() => { ... }, [count])
```

### 4. Parent-Child Default Behavior

> **Rule:** Khi Parent re-render → TẤT CẢ Children re-render (mặc định)

```tsx
function Parent() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <Child /> {/* Re-render dù không nhận props! */}
    </>
  )
}
```

### 5. React.memo

Skip re-render nếu props không thay đổi (shallow comparison):

```tsx
// ❌ Không memo - re-render mỗi lần parent re-render
function Child({ value }) { ... }

// ✅ Có memo - skip nếu props không đổi
const Child = memo(function Child({ value }) { ... })
```

### 6. useCallback

Giữ function reference stable giữa các renders:

```tsx
// ❌ Function MỚI mỗi render → memo child vẫn re-render
const handleClick = () => console.log('clicked')

// ✅ Function STABLE → memo child skip re-render
const handleClick = useCallback(() => {
  console.log('clicked')
}, [])
```

### 7. Functional Update

Tránh stale closure, không cần deps:

```tsx
// ❌ Stale closure - cần todos trong deps
const handleDelete = useCallback((id) => {
  setTodos(todos.filter(t => t.id !== id))
}, [todos])

// ✅ Functional update - empty deps OK
const handleDelete = useCallback((id) => {
  setTodos(prev => prev.filter(t => t.id !== id))
}, [])
```

### 8. Shallow Comparison

```tsx
// ❌ Object MỚI mỗi render → memo fail
<MemoChild user={{ name: 'John' }} />

// ✅ Stable object → memo works
const user = useMemo(() => ({ name: 'John' }), [])
<MemoChild user={user} />
```

---

## 🔧 PATTERNS TO REMEMBER

### Pattern 1: Counting Renders

```tsx
function Component() {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log(`Rendered: ${renderCount.current}`)
  })

  return <div>Renders: {renderCount.current}</div>
}
```

### Pattern 2: Optimized List Component

```tsx
// Parent
function TodoApp() {
  const [todos, setTodos] = useState([])

  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }, [])

  return <TodoList todos={todos} onDelete={handleDelete} />
}

// Memoized list
const TodoList = memo(function TodoList({ todos, onDelete }) {
  return todos.map(todo => (
    <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
  ))
})

// Memoized item
const TodoItem = memo(function TodoItem({ todo, onDelete }) {
  return (
    <div>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>×</button>
    </div>
  )
})
```

---

## ⚠️ COMMON MISTAKES TO AVOID

1. **Dùng useState để đếm renders** → Infinite loop!
2. **Quên useCallback khi pass function to memo child** → memo vô dụng
3. **Pass object literal to memo child** → Object mới mỗi render
4. **Overuse memo** → Overhead không cần thiết cho simple components
5. **Quên dependency trong useCallback** → Stale closure

---

## 📚 HOOKS CHEAT SHEET

| Hook | Purpose | When to Use |
|------|---------|-------------|
| `useRef` | Mutable value, no re-render | Counting, DOM refs, previous values |
| `useEffect` | Side effects | Logging, fetching, subscriptions |
| `useCallback` | Stable function reference | Pass to memo children, deps of other hooks |
| `useMemo` | Cache expensive calculation | Heavy computations, stable objects |
| `memo` | Skip re-render if props same | Expensive components, list items |

---

## 🚀 NEXT STEPS

**Next Session:** 1.2.2 - One-way Data Flow

Sẽ học:
- Props drilling
- Lifting state up
- Component composition
- Data flow patterns

---

## 📁 FILES CREATED

```
phase1/module1.2/
├── session-1.2.1-rendering/
│   ├── COMPLETE_THEORY.md
│   ├── quiz.md
│   └── summary.md (this file)
│
└── shared-project/
    └── src/session-1.2.1/
        ├── 01-RenderCounter.tsx ✅
        ├── 01-RenderCounter-Solution.tsx
        ├── 02-ParentChild.tsx ✅
        ├── 02-ParentChild-Solution.tsx
        ├── 03-TodoOptimize.tsx ✅
        ├── 03-TodoOptimize-Solution.tsx
        └── playground.tsx
```

---

**Session 1.2.1 COMPLETED! 🎉**
