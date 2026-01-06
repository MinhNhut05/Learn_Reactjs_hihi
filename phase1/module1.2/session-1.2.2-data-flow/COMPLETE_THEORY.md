# Session 1.2.2 - One-way Data Flow

## Mục tiêu

Sau session này, bạn sẽ:
- Hiểu **data flow một chiều** - nguyên tắc core của React
- Master **lifting state up** - pattern quan trọng nhất
- Áp dụng **component composition** để tránh props drilling

---

# PART 1: One-way Data Flow & Lifting State Up

## 1.1 One-way Data Flow là gì?

React sử dụng **one-way data flow** (unidirectional data flow):

```
┌─────────────────────────────────────────────────────┐
│                    PARENT                           │
│                   (state)                           │
│                      │                              │
│         ┌───────────┼───────────┐                  │
│         ▼           ▼           ▼                  │
│      CHILD A     CHILD B     CHILD C               │
│      (props)     (props)     (props)               │
│                                                     │
│   Data flows DOWN (parent → children)              │
│   Events flow UP (children → parent)               │
└─────────────────────────────────────────────────────┘
```

### Nguyên tắc cơ bản:

1. **Data chảy xuống** qua props (parent → children)
2. **Events chảy lên** qua callbacks (children → parent)
3. **State là single source of truth** - một data chỉ có 1 nơi quản lý

### Tại sao React chọn One-way thay vì Two-way binding?

| One-way (React) | Two-way (Angular/Vue v-model) |
|-----------------|-------------------------------|
| Dễ debug - biết data từ đâu đến | Khó trace nguồn gốc thay đổi |
| Predictable - dễ đoán behavior | Magic - thay đổi tự động |
| Explicit - code rõ ràng | Implicit - ẩn logic |
| Scalable - dễ mở rộng | Phức tạp khi app lớn |

---

## 1.2 Vấn đề: Shared State giữa Siblings

Khi 2 components cần **share cùng một state**:

```tsx
// ❌ Không thể share state trực tiếp giữa siblings
function App() {
  return (
    <div>
      <CelsiusInput />   {/* Có state riêng */}
      <FahrenheitInput /> {/* Có state riêng */}
      {/* Làm sao sync 2 inputs này? */}
    </div>
  )
}
```

**Vấn đề:** Mỗi component có state riêng, không thể sync với nhau.

---

## 1.3 Giải pháp: Lifting State Up

**Lifting State Up** = Di chuyển state lên **shared ancestor** (cha chung).

```tsx
// ✅ State ở Parent - shared ancestor
function App() {
  const [temperature, setTemperature] = useState(0)

  return (
    <div>
      <CelsiusInput
        value={temperature}
        onChange={setTemperature}
      />
      <FahrenheitInput
        value={temperature}
        onChange={setTemperature}
      />
    </div>
  )
}
```

### Khi nào cần Lifting State Up?

| Situation | Action |
|-----------|--------|
| Siblings cần share data | Lift lên parent |
| Cousins cần share data | Lift lên grandparent |
| Nhiều components cần sync | Lift lên shared ancestor |

### Pattern chuẩn:

```tsx
// 1. State ở Parent
function Parent() {
  const [value, setValue] = useState(initialValue)

  return (
    <>
      {/* 2. Pass value xuống qua props */}
      <ChildA value={value} />

      {/* 3. Pass setter xuống để child có thể update */}
      <ChildB value={value} onChange={setValue} />
    </>
  )
}

// 4. Child nhận props và callback
function ChildB({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
```

---

## 1.4 Ví dụ: Temperature Converter

Đây là classic example của lifting state up:

```tsx
// Conversion functions
function toCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit(celsius: number): number {
  return (celsius * 9 / 5) + 32
}

// Parent - single source of truth
function TemperatureConverter() {
  // State: temperature in Celsius (source of truth)
  const [celsius, setCelsius] = useState(0)

  // Derived value - không cần state riêng
  const fahrenheit = toFahrenheit(celsius)

  const handleCelsiusChange = (value: number) => {
    setCelsius(value)
  }

  const handleFahrenheitChange = (value: number) => {
    setCelsius(toCelsius(value))
  }

  return (
    <div>
      <TemperatureInput
        scale="C"
        value={celsius}
        onChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="F"
        value={fahrenheit}
        onChange={handleFahrenheitChange}
      />
    </div>
  )
}

// Controlled component - không có state riêng
function TemperatureInput({ scale, value, onChange }) {
  return (
    <label>
      Enter temperature in {scale === 'C' ? 'Celsius' : 'Fahrenheit'}:
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}
```

### Key insights:

1. **Single source of truth**: Chỉ có 1 state `celsius`
2. **Derived value**: `fahrenheit` được tính từ `celsius`, không cần state riêng
3. **Controlled components**: Cả 2 inputs đều controlled bởi parent
4. **Bidirectional sync**: Thay đổi 1 input → update state → cả 2 render lại

---

## 1.5 Tips & Common Mistakes

### ✅ DO:
```tsx
// State ở đúng level
function Parent() {
  const [shared, setShared] = useState(...)
  return <Child value={shared} onChange={setShared} />
}
```

### ❌ DON'T:
```tsx
// Duplicate state
function Child({ initialValue }) {
  const [value, setValue] = useState(initialValue)
  // ⚠️ Bây giờ có 2 sources of truth!
}
```

### ❌ DON'T:
```tsx
// Sync state manually (anti-pattern)
useEffect(() => {
  setLocalValue(props.value)
}, [props.value])
// ⚠️ Nếu cần sync, đó là dấu hiệu cần lift state up!
```

---

# PART 2: Component Composition

## 2.1 Vấn đề: Props Drilling

**Props Drilling** = Pass props qua nhiều levels mà middle components không dùng.

```tsx
// ❌ Props drilling - nightmare
function App() {
  const [user, setUser] = useState(...)
  return <Layout user={user} setUser={setUser} />
}

function Layout({ user, setUser }) {
  // Layout không dùng user, chỉ pass xuống
  return <Sidebar user={user} setUser={setUser} />
}

function Sidebar({ user, setUser }) {
  // Sidebar cũng không dùng, chỉ pass xuống
  return <UserProfile user={user} setUser={setUser} />
}

function UserProfile({ user, setUser }) {
  // Cuối cùng mới dùng!
  return <div>{user.name}</div>
}
```

**Vấn đề:**
- Code khó maintain
- Components bị coupled
- Thêm/bớt props phải sửa nhiều nơi
- Components trung gian bị "polluted" bởi props không liên quan

---

## 2.2 Giải pháp: Component Composition

**Composition** = Xây dựng UI bằng cách **compose** (kết hợp) các components.

### 2.2.1 Dùng `children` prop

```tsx
// ✅ Composition với children
function App() {
  const [user, setUser] = useState(...)

  return (
    <Layout>
      <Sidebar>
        <UserProfile user={user} setUser={setUser} />
      </Sidebar>
    </Layout>
  )
}

// Layout và Sidebar không cần biết về user!
function Layout({ children }) {
  return <div className="layout">{children}</div>
}

function Sidebar({ children }) {
  return <aside className="sidebar">{children}</aside>
}
```

**Lợi ích:**
- Layout, Sidebar không bị coupled với user data
- Dễ test riêng từng component
- Flexible - có thể render bất kỳ children nào

---

### 2.2.2 Multiple Slots với named props

Khi cần nhiều "slots" khác nhau:

```tsx
// Nhiều slots
function Card({ header, body, footer }) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">{body}</div>
      <div className="card-footer">{footer}</div>
    </div>
  )
}

// Usage
<Card
  header={<h2>Title</h2>}
  body={<p>Content here...</p>}
  footer={<button>Action</button>}
/>
```

---

### 2.2.3 Compound Components Pattern

Pattern nâng cao hơn - tạo API giống HTML native:

```tsx
// Compound components
function Card({ children }) {
  return <div className="card">{children}</div>
}

Card.Header = function CardHeader({ children }) {
  return <div className="card-header">{children}</div>
}

Card.Body = function CardBody({ children }) {
  return <div className="card-body">{children}</div>
}

Card.Footer = function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>
}

// Usage - giống HTML native!
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

**Ưu điểm:**
- API rõ ràng, dễ đọc
- Flexible - thêm/bớt parts dễ dàng
- Self-documenting - biết ngay có những parts nào

---

## 2.3 So sánh: Props Drilling vs Composition

```tsx
// ❌ Props Drilling
<Card
  title="Hello"
  subtitle="World"
  body="Content..."
  footerText="Click me"
  onFooterClick={handleClick}
  headerIcon={<Icon />}
  bodyImage={<Image />}
  // Props list dài vô tận...
/>

// ✅ Composition
<Card>
  <Card.Header>
    <Icon /> Hello
    <small>World</small>
  </Card.Header>
  <Card.Body>
    <Image />
    Content...
  </Card.Body>
  <Card.Footer>
    <button onClick={handleClick}>Click me</button>
  </Card.Footer>
</Card>
```

---

## 2.4 Khi nào dùng gì?

| Situation | Solution |
|-----------|----------|
| Simple data pass (1-2 levels) | Props - OK |
| Complex nested structure | Composition với children |
| Multiple content slots | Named props hoặc Compound |
| Deeply nested + shared state | Context API (học sau) |

---

## 2.5 Tips & Best Practices

### ✅ Prefer Composition:
```tsx
// Flexible, dễ extend
<Modal>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Any content here...</Modal.Body>
  <Modal.Actions>
    <Button>Cancel</Button>
    <Button primary>Confirm</Button>
  </Modal.Actions>
</Modal>
```

### ✅ Use children for single slot:
```tsx
function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}

<Button onClick={handleClick}>
  <Icon /> Click me
</Button>
```

### ✅ Use named props for multiple slots:
```tsx
function Layout({ sidebar, main, footer }) {
  return (
    <div>
      <aside>{sidebar}</aside>
      <main>{main}</main>
      <footer>{footer}</footer>
    </div>
  )
}
```

---

## Summary

| Concept | Key Point |
|---------|-----------|
| One-way Data Flow | Data xuống, Events lên |
| Lifting State Up | State ở shared ancestor |
| Single Source of Truth | Mỗi data chỉ 1 nơi quản lý |
| Props Drilling | Vấn đề: pass qua nhiều levels |
| Composition | Giải pháp: dùng children |
| Compound Components | Pattern: Card.Header, Card.Body |

---

## Tiếp theo

Sau khi nắm vững:
- **Exercise 1**: Temperature Converter - Lifting State Up
- **Exercise 2**: Card Component - Composition Pattern

Rồi đến **Session 1.2.3**: Component Lifecycle (mount, update, unmount)
