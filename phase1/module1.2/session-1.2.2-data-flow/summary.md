# Summary - Session 1.2.2: One-way Data Flow

## Key Concepts

### 1. One-way Data Flow

```
Parent (state)
    │
    ▼ props (data flows DOWN)
Children
    │
    ▲ callbacks (events flow UP)
```

- **Data xuống**: Parent pass state qua props
- **Events lên**: Children gọi callbacks để thay đổi parent state
- **Predictable**: Dễ debug, dễ trace data

---

### 2. Lifting State Up

**Khi nào:** Siblings cần share/sync cùng data

**Pattern:**
```tsx
function Parent() {
  const [value, setValue] = useState(initial)

  return (
    <>
      <ChildA value={value} />
      <ChildB value={value} onChange={setValue} />
    </>
  )
}
```

**Rules:**
- State ở shared ancestor
- Pass value xuống qua props
- Pass setter xuống để child có thể update

---

### 3. Single Source of Truth

- Mỗi data chỉ được quản lý ở **1 nơi duy nhất**
- Derived values được **tính toán**, không cần state riêng

```tsx
// ✅ Single source of truth
const [celsius, setCelsius] = useState(0)
const fahrenheit = toFahrenheit(celsius) // derived

// ❌ Duplicate state - anti-pattern
const [celsius, setCelsius] = useState(0)
const [fahrenheit, setFahrenheit] = useState(32)
```

---

### 4. Component Composition

**children prop:**
```tsx
function Card({ children }) {
  return <div className="card">{children}</div>
}

<Card>
  <p>Any content here</p>
</Card>
```

**Compound components:**
```tsx
Card.Header = ({ children }) => <div className="header">{children}</div>
Card.Body = ({ children }) => <div className="body">{children}</div>

<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

**Lợi ích:**
- Tránh props drilling
- Flexible - render bất kỳ content nào
- Decoupled - components độc lập

---

## Comparison Table

| Pattern | Use Case |
|---------|----------|
| Props (1-2 levels) | Simple data passing |
| Lifting State Up | Siblings share data |
| Composition | Avoid props drilling |
| Compound Components | Complex UI với nhiều parts |

---

## Anti-patterns to Avoid

```tsx
// ❌ Duplicate state
const [localValue, setLocalValue] = useState(props.value)

// ❌ Sync với useEffect
useEffect(() => {
  setLocalValue(props.value)
}, [props.value])

// ❌ Props drilling qua nhiều levels
<A user={user}>
  <B user={user}>
    <C user={user}>
      <D user={user} /> // Mới thực sự dùng
```

---

## Checklist

- [ ] Hiểu one-way data flow (data xuống, events lên)
- [ ] Biết khi nào cần lifting state up
- [ ] Áp dụng single source of truth
- [ ] Dùng derived values thay vì duplicate state
- [ ] Sử dụng children prop cho composition
- [ ] Hiểu compound components pattern

---

## Next Session

**Session 1.2.3: Component Lifecycle**
- Mount, Update, Unmount
- useEffect cho side effects
- Cleanup functions
