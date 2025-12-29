# PHASE 1: REACT FOUNDATION (Chi Tiết V2 - Fresher Focus)

> Thời gian: 3 tuần (với 5h/ngày)
> Mục tiêu: Master TypeScript + React fundamentals + Hooks
> Sessions: 13 (bao gồm 1 review session)

---

## 📅 MODULE 1.1: TypeScript cho React (4-5 days) - ĐÃ HỌC

### **Session 1.1.1: Props & State Typing (2-3h)** ✅ COMPLETED

#### Concepts:
- Type vs Interface cho Props
- Optional props & default values
- Children typing: ReactNode vs ReactElement
- Generic props

#### Bài tập:
1. Button Component với variant typing
2. Card Component với children
3. Generic List Component

---

### **Session 1.1.2: Event Handlers Typing (2-3h)** ✅ COMPLETED

#### Concepts:
- Event types: MouseEvent, ChangeEvent, FormEvent, KeyboardEvent
- Generic event types: React.ChangeEvent<HTMLInputElement>
- Custom event handlers
- preventDefault & stopPropagation

#### Bài tập:
1. Login Form với validation
2. Search Component với keyboard shortcuts
3. Interactive Counter với global events

---

### **Session 1.1.3: Hooks với TypeScript (2h)** ✅ COMPLETED

#### Concepts:
- useState với type inference vs explicit type
- Generic custom hooks
- useLocalStorage, useDebounce, useFetch patterns
- AbortController cleanup

#### Bài tập:
1. useLocalStorage Hook
2. useDebounce Hook
3. useFetch Hook với AbortController

---

### **Session 1.1.4: Utility Types & Advanced (2h)** ✅ COMPLETED

#### Concepts:
- Partial<T>, Required<T>, Pick<T>, Omit<T>
- Record<K, V>
- PropsWithChildren<P>
- ComponentProps<typeof Component>

#### Bài tập:
1. Form Builder với Utility Types
2. Props Extraction với ComponentProps
3. Type transformations

---

### **🆕 Session 1.1.R: TypeScript Review & Practice (2-3h)**

> **MỤC TIÊU:** Củng cố TypeScript React - Làm lại exercises KHÔNG XEM code cũ

#### Format:

**Part 1: Timed Challenges (1.5h)**
Làm lại các bài tập sau KHÔNG xem solution:

**Challenge 1: Component Props (30 phút)**
```typescript
// YÊU CẦU:
// 1. IconButton component extend Button props
// 2. Thêm icon prop (ReactNode)
// 3. Variant: 'primary' | 'secondary' | 'danger'
// 4. Size optional với default 'md'
// 5. Disabled state

// TODO: Code từ đầu
```

**Challenge 2: Form với Events (45 phút)**
```typescript
// YÊU CẦU:
// 1. Multi-step registration form (Step 1: Personal, Step 2: Account)
// 2. Typed onChange handlers cho tất cả inputs
// 3. Validation cho mỗi field
// 4. Submit handler với preventDefault
// 5. Keyboard navigation (Enter → next field)

// TODO: Code từ đầu
```

**Challenge 3: Custom Hook Combo (45 phút)**
```typescript
// YÊU CẦU:
// Combine useLocalStorage + useDebounce
// 1. useLocalStorageDebounced<T>(key, initialValue, delay)
// 2. Save to localStorage nhưng debounced
// 3. Generic type support
// 4. Proper cleanup

// USAGE:
// const [search, setSearch] = useLocalStorageDebounced('search', '', 500)

// TODO: Implement
```

---

**Part 2: Self-Assessment (30 phút)**

Sau khi code xong, tự đánh giá:

**Checklist:**
- [ ] Challenge 1: Code được ≥80% không xem solution
- [ ] Challenge 2: Code được ≥80% không xem solution
- [ ] Challenge 3: Code được ≥80% không xem solution
- [ ] TypeScript types chính xác
- [ ] Không có type errors
- [ ] Code chạy được

**Nếu < 80%:** Ôn lại sessions 1.1.1-1.1.4 trước khi tiếp tục!

---

**Part 3: Mini Quiz (30 phút)**

10 câu hỏi tổng hợp từ Module 1.1:

1. Khi nào dùng `type` vs `interface`?
2. `ReactNode` vs `ReactElement` khác gì?
3. Generic `<T>` giải quyết vấn đề gì?
4. `React.ChangeEvent<HTMLInputElement>` là gì?
5. Tại sao cần `preventDefault()` trong form submit?
6. `useLocalStorage` cần cleanup không? Tại sao?
7. AbortController dùng để làm gì?
8. `Partial<User>` vs `Pick<User, 'name' | 'email'>` khác gì?
9. Khi nào dùng lazy initialization trong useState?
10. Functional update `setState(prev => ...)` giải quyết vấn đề gì?

**Pass score:** ≥8/10

---

## 📅 MODULE 1.2: React Mental Model (3 days)

### **Session 1.2.1: Rendering & Re-rendering (2-3h)**

> **MỨC ĐỘ:** Trung bình (hiểu batching, memo, optimization)

#### Concepts:

**1. Render Triggers**
- State change → component re-renders
- Parent re-render → child re-renders (mặc định)
- Props change → component re-renders
- Context value change → consumers re-render

**2. React Rendering Process**
- Initial render: ReactDOM.createRoot().render()
- Re-render: setState, forceUpdate, parent re-render
- Virtual DOM diffing (khái niệm cơ bản)

**3. Batching Updates (React 18)**
- Multiple setState calls → batched into 1 render
- Automatic batching trong event handlers, setTimeout, promises
- Ví dụ:
```typescript
const handleClick = () => {
  setCount(c => c + 1)
  setName('Updated')
  setFlag(true)
  // Chỉ render 1 lần, không phải 3 lần!
}
```

**4. React.memo - Tối ưu Re-renders**
- Memoize component để skip re-render khi props không đổi
- Shallow comparison props
- Khi nào dùng: expensive renders, pure components
- Syntax: `export default React.memo(MyComponent)`

**5. useCallback - Stabilize Functions**
- Prevent function recreation mỗi render
- Dùng khi pass function vào memo component
- Syntax: `const memoizedFn = useCallback(() => {...}, [deps])`

---

#### Bài tập:

**Exercise 1: Render Counter (30 phút)**
```typescript
// YÊU CẦU:
// 1. Component hiển thị số lần render (dùng useRef)
// 2. Button "Increment Count" → tăng state → trigger re-render
// 3. Button "Do Nothing" → không làm gì → không re-render
// 4. Log mỗi lần render vào console

// QUAN SÁT:
// - Button 1 click → component re-render
// - Button 2 click → component KHÔNG re-render

// TODO: Implement RenderCounter component
```

---

**Exercise 2: Parent-Child Re-renders (45 phút)**
```typescript
// YÊU CẦU:
// 1. Parent component có counter state
// 2. Child1 component: không nhận props, chỉ hiển thị static content
// 3. Child2 component: nhận counter từ props
// 4. Mỗi component log khi render
// 5. Parent có button tăng counter

// QUAN SÁT & GIẢI THÍCH:
// - Khi Parent state change:
//   - Child1 có re-render không? Tại sao?
//   - Child2 có re-render không? Tại sao?

// TODO: Implement và giải thích behavior trong comments
```

---

**Exercise 3: Optimize với React.memo (60 phút)**
```typescript
// YÊU CẦU:
// 1. TodoList component hiển thị 100 todos
// 2. Mỗi TodoItem có checkbox và label
// 3. Click checkbox → toggle todo
// 4. Log mỗi lần TodoItem render

// VERSION A: Không optimize
// - Click 1 todo → TẤT CẢ 100 items re-render

// VERSION B: Optimize với React.memo + useCallback
// - Click 1 todo → CHỈ todo đó re-render

// TODO:
// - Implement version A, đếm số lần render
// - Optimize với React.memo
// - Dùng useCallback cho toggle handler
// - So sánh performance

interface Todo {
  id: number
  text: string
  completed: boolean
}

// Implement TodoList và TodoItem
```

---

#### Knowledge Check (10 câu):

1. Liệt kê 4 triggers làm component re-render
2. React 18 batching có gì khác React 17?
3. React.memo so sánh props như thế nào?
4. Khi nào KHÔNG nên dùng React.memo?
5. useCallback giải quyết vấn đề gì?
6. `useCallback` vs `useMemo` khác gì?
7. Nếu Parent re-render, Child có re-render không (mặc định)?
8. Làm sao biết component re-render bao nhiêu lần?
9. Virtual DOM là gì? (giải thích đơn giản)
10. Batching có áp dụng cho async functions không? (React 18)

---

### **Session 1.2.2: One-way Data Flow (2h)**

> **MỨC ĐỘ:** Cơ bản (fundamental pattern)

#### Concepts:

**1. Props Down, Events Up**
- Data flows từ parent → child qua props
- Child không thể modify props
- Child gọi callbacks để inform parent
- Parent update state → props change → child re-render

**2. Lifting State Up**
- Khi 2+ components cần shared state
- Lift state lên common ancestor
- Pass state + setState qua props
- Pattern:
```typescript
// Parent holds state
const [value, setValue] = useState('')

// Pass to children
<Input value={value} onChange={setValue} />
<Display value={value} />
```

**3. Controlled vs Uncontrolled Components**
- **Controlled:** React state controls input value
  - `<input value={state} onChange={e => setState(e.target.value)} />`
- **Uncontrolled:** DOM controls value, use ref to access
  - `<input ref={inputRef} />`
- Best practice: Prefer controlled

**4. Single Source of Truth**
- Mỗi piece of data có 1 nguồn duy nhất
- Derived data tính từ source, không duplicate state
- Ví dụ: `filteredItems` tính từ `items` + `filter`, không lưu riêng

---

#### Bài tập:

**Exercise 1: Temperature Converter (45 phút)**
```typescript
// YÊU CẦU:
// 1. TemperatureInput component:
//    - Props: value (number), scale ('c' | 'f'), onChange
//    - Input field hiển thị temperature
// 2. Calculator component (parent):
//    - State: temperature (number), scale ('c' | 'f')
//    - Render 2 TemperatureInputs (Celsius và Fahrenheit)
//    - Khi đổi Celsius → Fahrenheit tự update
//    - Khi đổi Fahrenheit → Celsius tự update
// 3. Conversion functions:
//    - toCelsius(fahrenheit)
//    - toFahrenheit(celsius)

// PATTERN: Lifting state up
// - State ở Calculator (parent)
// - TemperatureInput là controlled component
// - TemperatureInput gọi onChange → Calculator update state

// TODO: Implement
```

---

**Exercise 2: Search + Filter List (60 phút)**
```typescript
// YÊU CẦU:
// Components:
// 1. SearchBar: input search text
// 2. CategoryFilter: dropdown chọn category
// 3. ProductList: hiển thị filtered products

// Data:
interface Product {
  id: number
  name: string
  category: string
  price: number
}

const products: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1000 },
  { id: 2, name: 'Phone', category: 'Electronics', price: 500 },
  { id: 3, name: 'Chair', category: 'Furniture', price: 200 },
  // ...more
]

// QUESTIONS:
// - State (searchText, selectedCategory) nên ở đâu?
// - filteredProducts tính như thế nào?
// - SearchBar và CategoryFilter là controlled hay uncontrolled?

// TODO:
// - Implement với lifted state
// - Search và filter cùng hoạt động
```

---

**Exercise 3: Multi-field Form (45 phút)**
```typescript
// YÊU CẦU:
// 1. RegistrationForm với 4 fields:
//    - Name (text)
//    - Email (email)
//    - Password (password)
//    - Confirm Password (password)
// 2. Tất cả là controlled inputs
// 3. State object:
interface FormState {
  name: string
  email: string
  password: string
  confirmPassword: string
}
// 4. Validation:
//    - Email format
//    - Password min 8 chars
//    - Confirm password matches
// 5. Submit button disabled nếu invalid
// 6. Show errors dưới mỗi field

// TODO: Implement controlled form
```

---

#### Knowledge Check (8 câu):

1. "Props down, events up" nghĩa là gì?
2. Khi nào cần lifting state up?
3. Controlled component là gì? Cho ví dụ
4. Uncontrolled component là gì? Khi nào dùng?
5. Tại sao không nên mutate props?
6. Single source of truth là gì?
7. Derived state có nên lưu vào useState không?
8. Form validation nên ở đâu: parent hay input component?

---

### **Session 1.2.3: Component Composition (2h)**

> **MỨC ĐỘ:** Cơ bản (anti prop-drilling)

#### Concepts:

**1. Composition vs Inheritance**
- React khuyến khích composition, không dùng inheritance
- Dùng `children` prop để compose components
- "Has-a" relationship thay vì "Is-a"

**2. Children Prop Pattern**
```typescript
function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>
}

// Usage:
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

**3. Slot Pattern** (Multiple children)
```typescript
interface LayoutProps {
  header: ReactNode
  sidebar: ReactNode
  content: ReactNode
}

function Layout({ header, sidebar, content }: LayoutProps) {
  return (
    <div>
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{content}</main>
    </div>
  )
}
```

**4. Container/Presentational Pattern**
- **Container:** Logic, state, data fetching
- **Presentational:** UI, nhận props, không có logic
- Ví dụ: UserListContainer ↔ UserListView

**5. Giải quyết Prop Drilling**
- Problem: Pass props qua nhiều levels
- Solution 1: Composition (pass components, not data)
- Solution 2: Context (học sau)

---

#### Bài tập:

**Exercise 1: Layout System (45 phút)**
```typescript
// YÊU CẦU:
// Tạo layout system với composition:

// Components:
// 1. AppLayout: wrapper chính
// 2. Header: top bar
// 3. Sidebar: left navigation
// 4. Content: main content area
// 5. Footer: bottom bar

// PATTERN: Dùng children prop

interface AppLayoutProps {
  header?: ReactNode
  sidebar?: ReactNode
  content: ReactNode
  footer?: ReactNode
}

// TODO: Implement AppLayout với flexible slots

// USAGE:
<AppLayout
  header={<Header />}
  sidebar={<Sidebar />}
  content={<MainContent />}
  footer={<Footer />}
/>
```

---

**Exercise 2: Modal Component (45 phút)**
```typescript
// YÊU CẦU:
// Compound component pattern:

// API:
<Modal open={isOpen} onClose={closeModal}>
  <Modal.Header>
    <h2>Title</h2>
  </Modal.Header>
  <Modal.Body>
    <p>Content here...</p>
  </Modal.Body>
  <Modal.Footer>
    <button>Cancel</button>
    <button>Confirm</button>
  </Modal.Footer>
</Modal>

// TODO:
// 1. Modal component với children
// 2. Modal.Header, Modal.Body, Modal.Footer subcomponents
// 3. Backdrop click → close modal
// 4. ESC key → close modal
```

---

**Exercise 3: DataTable với Slots (60 phút)**
```typescript
// YÊU CẦU:
// Flexible table component:

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  renderHeader?: (column: Column<T>) => ReactNode
  renderCell?: (item: T, column: Column<T>) => ReactNode
  renderEmpty?: () => ReactNode
}

// USAGE:
<DataTable
  data={users}
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ]}
  renderCell={(user, column) => {
    if (column.key === 'email') {
      return <a href={`mailto:${user.email}`}>{user.email}</a>
    }
    return user[column.key]
  }}
  renderEmpty={() => <p>No data</p>}
/>

// TODO: Implement generic DataTable
```

---

#### Knowledge Check (8 câu):

1. Composition pattern là gì?
2. Tại sao React không khuyến khích inheritance?
3. `children` prop có type gì trong TypeScript?
4. Slot pattern khác gì children prop?
5. Container/Presentational pattern là gì?
6. Prop drilling là vấn đề gì?
7. Composition giải quyết prop drilling như thế nào?
8. Khi nào dùng composition vs context?

---

## 📅 MODULE 1.3: Hooks Deep Dive (5-6 days)

### **Session 1.3.1: useState Advanced (2h)**

#### Concepts:

**1. Lazy Initialization**
- Problem: expensive calculation chạy mỗi render
```typescript
// ❌ BAD: readLocalStorage runs every render
const [state, setState] = useState(readLocalStorage('key'))

// ✅ GOOD: runs only once
const [state, setState] = useState(() => readLocalStorage('key'))
```

**2. Functional Updates**
- Problem: stale closure với setState
```typescript
// ❌ BAD: stale count value
const increment = () => {
  setState(count + 1) // count = 0
  setState(count + 1) // count = 0
  setState(count + 1) // count = 0
  // Result: 1 (not 3!)
}

// ✅ GOOD: functional update
const increment = () => {
  setState(c => c + 1) // c = 0 → 1
  setState(c => c + 1) // c = 1 → 2
  setState(c => c + 1) // c = 2 → 3
  // Result: 3
}
```

**3. Object State Updates**
- State object phải immutable
```typescript
// ❌ BAD: mutate state
form.name = 'new name'
setForm(form) // React won't detect change!

// ✅ GOOD: create new object
setForm({ ...form, name: 'new name' })
```

**4. Multiple States vs Single Object**
- Khi nào dùng multiple useState?
  - Independent values
  - Different update patterns
- Khi nào dùng single object?
  - Related values
  - Update together

---

#### Bài tập:

**Exercise 1: Lazy Initialization (30 phút)**
```typescript
// YÊU CẦU:
// So sánh 2 implementations:

// VERSION A: Direct initialization
function ComponentA() {
  console.log('Reading localStorage...')
  const saved = localStorage.getItem('count') || '0'
  const [count, setCount] = useState(parseInt(saved))

  return <button onClick={() => setCount(c => c + 1)}>
    Count: {count}
  </button>
}

// VERSION B: Lazy initialization
function ComponentB() {
  const [count, setCount] = useState(() => {
    console.log('Reading localStorage...')
    const saved = localStorage.getItem('count') || '0'
    return parseInt(saved)
  })

  return <button onClick={() => setCount(c => c + 1)}>
    Count: {count}
  </button>
}

// TODO:
// 1. Implement cả 2 versions
// 2. Click button nhiều lần
// 3. Quan sát console.log
// 4. Giải thích: Version nào log nhiều lần? Tại sao?
```

---

**Exercise 2: Functional Updates (30 phút)**
```typescript
// YÊU CẦU:
// 1. Counter component
// 2. Button "Increment 3 times" → tăng counter 3 đơn vị trong 1 click

// VERSION A: Direct update
const handleClickA = () => {
  setCount(count + 1)
  setCount(count + 1)
  setCount(count + 1)
}

// VERSION B: Functional update
const handleClickB = () => {
  setCount(c => c + 1)
  setCount(c => c + 1)
  setCount(c => c + 1)
}

// TODO:
// 1. Implement cả 2 versions
// 2. Test behavior
// 3. Giải thích: Version A tăng bao nhiêu? Version B?
// 4. Khi nào PHẢI dùng functional update?
```

---

**Exercise 3: Form Object State (60 phút)**
```typescript
// YÊU CẦU:
// Registration form với object state:

interface FormState {
  name: string
  email: string
  age: number
  terms: boolean
}

// TODO:
// 1. Tạo form với 4 fields
// 2. Single useState cho toàn bộ form
// 3. handleChange function update từng field
// 4. Validation
// 5. Reset button

// CHALLENGE: Implement generic handleChange
const handleChange = (field: keyof FormState) =>
  (value: FormState[typeof field]) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }
```

---

#### Knowledge Check (8 câu):

1. Lazy initialization là gì? Khi nào dùng?
2. Functional update giải quyết vấn đề gì?
3. Tại sao không được mutate state object?
4. `{ ...obj, field: value }` làm gì?
5. Multiple states vs single object: chọn khi nào?
6. `setState` có async không?
7. Batching ảnh hưởng thế nào đến multiple `setState`?
8. `useState` có thể lưu function không? Cách nào?

---

### **Session 1.3.2: useEffect Mastery (3h)**

> **MỨC ĐỘ:** Trung bình (cleanup, race conditions, AbortController)

#### Concepts:

**1. Dependencies Array**
```typescript
useEffect(() => {
  // Runs after every render
})

useEffect(() => {
  // Runs only on mount
}, [])

useEffect(() => {
  // Runs when dep1 or dep2 changes
}, [dep1, dep2])
```

**2. Cleanup Function**
```typescript
useEffect(() => {
  const id = setInterval(() => {...}, 1000)

  return () => {
    clearInterval(id) // Cleanup
  }
}, [])
```

**3. Race Conditions**
- Problem: user changes quickly, old requests finish later
- Solution: Cancel old requests

**4. AbortController Pattern**
```typescript
useEffect(() => {
  const controller = new AbortController()

  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err)
      }
    })

  return () => controller.abort()
}, [url])
```

**5. Common Mistakes**
- Missing dependencies
- Infinite loops
- Not cleaning up
- Async function as useEffect callback

---

#### Bài tập:

**Exercise 1: Dependencies Debug (30 phút)**
```typescript
// YÊU CẦU:
// Cho code có bugs, fix dependencies:

function BuggyComponent() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])

  // BUG 1: Missing dependency
  useEffect(() => {
    fetchData(count).then(setData)
  }, []) // ❌ Should include count

  // BUG 2: Infinite loop
  useEffect(() => {
    setData([...data, 'new item'])
  }, [data]) // ❌ setData causes re-run

  // BUG 3: Stale closure
  const handleClick = () => {
    setTimeout(() => {
      console.log(count) // Old value
    }, 3000)
  }

  // TODO: Fix all 3 bugs
}
```

---

**Exercise 2: Data Fetching với Cleanup (60 phút)**
```typescript
// YÊU CẦU:
// User profile fetcher với proper cleanup

interface User {
  id: number
  name: string
  email: string
}

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // TODO:
  // 1. Fetch user khi userId changes
  // 2. Dùng AbortController để cancel old requests
  // 3. Handle loading state
  // 4. Handle errors (network, abort, etc.)
  // 5. Race condition: user clicks user1 → user2 nhanh
  //    → chỉ hiển thị user2, cancel request user1

  useEffect(() => {
    // Implement here
  }, [userId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <div>No user</div>

  return <div>{user.name} - {user.email}</div>
}
```

---

**Exercise 3: Event Listeners Cleanup (45 phút)**
```typescript
// YÊU CẦU:
// Implement cleanup cho 3 patterns:

// 1. Window resize listener
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    // TODO:
    // - Add resize listener
    // - Update size on resize
    // - Cleanup: remove listener
  }, [])

  return size
}

// 2. Keyboard shortcuts
function useKeyboard(key: string, callback: () => void) {
  useEffect(() => {
    // TODO:
    // - Add keydown listener
    // - Check if pressed key matches
    // - Call callback
    // - Cleanup
  }, [key, callback])
}

// 3. Interval
function useInterval(callback: () => void, delay: number) {
  useEffect(() => {
    // TODO:
    // - setInterval
    // - Cleanup: clearInterval
  }, [callback, delay])
}
```

---

#### Knowledge Check (12 câu):

1. useEffect chạy khi nào?
2. Dependencies array [] vs không có array?
3. Cleanup function chạy khi nào?
4. Race condition trong data fetching là gì?
5. AbortController làm gì?
6. `fetch` throw error khi response 404 không?
7. Tại sao không được dùng async function làm useEffect callback?
8. Làm sao check nếu request bị abort?
9. Missing dependency warning là gì?
10. Infinite loop useEffect thường do nguyên nhân nào?
11. addEventListener cần cleanup không? Tại sao?
12. setInterval cần cleanup không? Tại sao?

---

### **Session 1.3.3: useContext & useReducer (2-3h)**

> **MỨC ĐỘ:** Trung bình (Context cho theme/auth, Reducer cho todo)

#### Concepts:

**1. useContext - Tránh Prop Drilling**

**Creating Context:**
```typescript
const ThemeContext = createContext<'light' | 'dark'>('light')
```

**Provider:**
```typescript
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  )
}
```

**Consumer:**
```typescript
function Button() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>Click</button>
}
```

**2. Custom Context Hook Pattern**
```typescript
// ❌ BAD: Forget to check if inside Provider
const theme = useContext(ThemeContext)

// ✅ GOOD: Custom hook with check
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

**3. useReducer - Complex State Logic**

**Basic Pattern:**
```typescript
type State = { count: number }
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 })
```

**4. Context + Reducer Pattern**
- Combine for global state management
- Alternative to Redux for simple apps

---

#### Bài tập:

**Exercise 1: Theme Context (45 phút)**
```typescript
// YÊU CẦU:
// Implement theme system:

// 1. ThemeContext
type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

// 2. ThemeProvider component
function ThemeProvider({ children }: { children: ReactNode }) {
  // TODO:
  // - useState cho theme
  // - toggleTheme function
  // - Persist theme to localStorage
  // - Provide value
}

// 3. useTheme hook
function useTheme() {
  // TODO:
  // - useContext
  // - Error if outside Provider
  // - Return { theme, toggleTheme }
}

// 4. Usage
function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  )
}

function Page() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}
```

---

**Exercise 2: Auth Context (60 phút)**
```typescript
// YÊU CẦU:
// Authentication context:

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

// TODO:
// 1. AuthContext + AuthProvider
// 2. useAuth hook
// 3. login function (fake API call)
// 4. logout function
// 5. Persist user to localStorage
// 6. ProtectedRoute component:
//    - If authenticated: render children
//    - Else: redirect to login

// BONUS: Loading state while checking auth
```

---

**Exercise 3: Todo App với useReducer (75 phút)**
```typescript
// YÊU CẦU:
// Todo app với useReducer:

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface State {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
}

type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: string }
  | { type: 'DELETE_TODO'; id: string }
  | { type: 'SET_FILTER'; filter: State['filter'] }

// TODO:
// 1. Implement reducer với TypeScript
function todoReducer(state: State, action: Action): State {
  // Implement all actions
}

// 2. Component dùng useReducer
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  })

  // Derived state
  const filteredTodos = // TODO: filter todos based on state.filter

  return (
    // TODO: UI
  )
}

// 3. Persist to localStorage
```

---

#### Knowledge Check (10 câu):

1. useContext giải quyết vấn đề gì?
2. createContext nhận argument gì?
3. Tại sao nên tạo custom hook cho context?
4. Context value change → components nào re-render?
5. useReducer vs useState: khi nào dùng reducer?
6. Reducer function phải pure không?
7. dispatch có trigger re-render không?
8. Làm sao type Actions trong TypeScript?
9. Context + Reducer pattern thay thế Redux được không?
10. Multiple contexts vs single large context: approach nào tốt hơn?

---

### **Session 1.3.4: Custom Hooks Patterns (2h)**

#### Concepts:

**1. When to Create Custom Hook**
- Reuse stateful logic giữa components
- Abstract complex logic
- Compose multiple hooks
- Naming: MUST start with "use"

**2. Return Patterns**

**Array Pattern (giống useState):**
```typescript
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = () => setValue(v => !v)
  return [value, toggle] as const
}

// Usage
const [isOpen, toggleOpen] = useToggle()
```

**Object Pattern (flexible):**
```typescript
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  return {
    value,
    toggle: () => setValue(v => !v),
    setTrue: () => setValue(true),
    setFalse: () => setValue(false)
  }
}

// Usage
const { value: isOpen, toggle, setTrue: open } = useToggle()
```

**3. Composing Hooks**
```typescript
function useLocalStorage(key, initial) {
  // Uses useState internally
}

function useDebounce(value, delay) {
  // Uses useState + useEffect
}

function useDebouncedLocalStorage(key, initial, delay) {
  // Composes useLocalStorage + useDebounce
}
```

---

#### Bài tập:

**Exercise 1: useToggle Hook (30 phút)**
```typescript
// YÊU CẦU:
// Boolean state shortcuts:

function useToggle(initialValue = false) {
  // TODO: Implement
  // Return: { value, toggle, setTrue, setFalse }
}

// USAGE:
function Modal() {
  const { value: isOpen, toggle, setTrue: open, setFalse: close } = useToggle()

  return (
    <>
      <button onClick={open}>Open Modal</button>
      {isOpen && (
        <div>
          <p>Modal content</p>
          <button onClick={close}>Close</button>
          <button onClick={toggle}>Toggle</button>
        </div>
      )}
    </>
  )
}
```

---

**Exercise 2: useForm Hook (60 phút)**
```typescript
// YÊU CẦU:
// Generic form hook:

interface UseFormOptions<T> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string>>
  onSubmit: (values: T) => void | Promise<void>
}

function useForm<T extends Record<string, any>>(options: UseFormOptions<T>) {
  // TODO: Implement
  // - values state
  // - errors state
  // - touched state
  // - handleChange function
  // - handleBlur function
  // - handleSubmit function
  // - reset function

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  }
}

// USAGE:
function RegistrationForm() {
  const form = useForm({
    initialValues: { name: '', email: '', password: '' },
    validate: (values) => {
      const errors: any = {}
      if (!values.email.includes('@')) {
        errors.email = 'Invalid email'
      }
      if (values.password.length < 8) {
        errors.password = 'Min 8 characters'
      }
      return errors
    },
    onSubmit: async (values) => {
      await registerUser(values)
    }
  })

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        name="email"
        value={form.values.email}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />
      {form.touched.email && form.errors.email && (
        <span>{form.errors.email}</span>
      )}
      {/* More fields... */}
    </form>
  )
}
```

---

**Exercise 3: useAsync Hook (45 phút)**
```typescript
// YÊU CẦU:
// Hook cho async operations:

type Status = 'idle' | 'loading' | 'success' | 'error'

function useAsync<T>() {
  // TODO: Implement
  // - status state
  // - data state
  // - error state
  // - run function: accepts async function
  // - reset function

  return {
    status,
    data,
    error,
    run,
    reset,
    // Derived
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error'
  }
}

// USAGE:
function UserProfile({ userId }: { userId: number }) {
  const { data, isLoading, isError, error, run } = useAsync<User>()

  useEffect(() => {
    run(fetchUser(userId))
  }, [userId])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!data) return null

  return <div>{data.name}</div>
}
```

---

#### Knowledge Check (8 câu):

1. Custom hook PHẢI bắt đầu với "use" không? Tại sao?
2. Array return vs Object return: ưu/nhược điểm?
3. `as const` trong return array làm gì?
4. Custom hook có thể call hooks khác không?
5. Custom hook có thể dùng JSX không?
6. Rules of Hooks áp dụng cho custom hooks không?
7. Khi nào nên extract logic thành custom hook?
8. Testing custom hooks như thế nào?

---

### **🆕 Session 1.3.R: Hooks Practice + Mini Project (3-4h)**

> **MỤC TIÊU:** Củng cố Module 1.3 - Build mini project áp dụng TẤT CẢ hooks

#### Part 1: Timed Practice (1.5h)

Làm lại exercises khó nhất KHÔNG xem code:

**Challenge 1: Form với useReducer (45 phút)**
```typescript
// YÊU CẦU:
// Multi-step form với useReducer:
// - Step 1: Personal info (name, email)
// - Step 2: Account info (username, password)
// - Step 3: Review & submit

// State với useReducer:
interface FormState {
  step: 1 | 2 | 3
  personal: { name: string; email: string }
  account: { username: string; password: string }
  errors: Record<string, string>
}

// Actions: NEXT_STEP, PREV_STEP, UPDATE_PERSONAL, UPDATE_ACCOUNT, SET_ERROR

// TODO: Code từ đầu
```

**Challenge 2: Data Fetching với Cleanup (45 phút)**
```typescript
// YÊU CẦU:
// Search component:
// 1. Input search term
// 2. Debounce 500ms
// 3. Fetch results khi search term changes
// 4. AbortController cancel old requests
// 5. Loading + error states

// TODO: Dùng useDebounce + useEffect + AbortController
```

---

#### Part 2: Mini Project - Counter App (2h)

**YÊU CẦU:**
Build Counter App áp dụng TẤT CẢ hooks đã học:

**Features:**
- Counter value
- Increment/Decrement buttons
- Reset button
- Theme toggle (light/dark)
- Persist counter + theme to localStorage
- Keyboard shortcuts (↑ increment, ↓ decrement, R reset)

**Technical Requirements:**
✅ **useState:** counter value, theme
✅ **useEffect:**
  - Persist to localStorage
  - Keyboard listeners với cleanup
✅ **useContext:** ThemeContext
✅ **useReducer:** Counter logic (INCREMENT, DECREMENT, RESET actions)
✅ **Custom hooks:**
  - useLocalStorage (counter + theme)
  - useKeyboard (shortcuts)

**Bonus:**
- Animate counter change
- History của counter values
- Undo/Redo functionality

---

**Project Structure:**
```
src/
├── contexts/
│   └── ThemeContext.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   └── useKeyboard.ts
├── reducers/
│   └── counterReducer.ts
├── components/
│   ├── Counter.tsx
│   └── ThemeToggle.tsx
└── App.tsx
```

---

#### Self-Assessment:

**Checklist:**
- [ ] Counter hoạt động (increment, decrement, reset)
- [ ] Theme toggle hoạt động
- [ ] Persist to localStorage (refresh page → data giữ nguyên)
- [ ] Keyboard shortcuts hoạt động
- [ ] Cleanup event listeners khi unmount
- [ ] Code organized (contexts, hooks, reducers folders)
- [ ] TypeScript types chính xác
- [ ] Không có warnings/errors

**Pass Criteria:**
- ✅ Tất cả features hoạt động
- ✅ Code được ≥80% không xem solution
- ✅ Áp dụng được ít nhất 5/6 hooks patterns

---

## ✅ PHASE 1 COMPLETION CHECKLIST

Hoàn thành Phase 1 khi:
- [✅] Module 1.1: TypeScript cho React (4 sessions + 1 review)
- [ ] Module 1.2: React Mental Model (3 sessions)
- [ ] Module 1.3: Hooks Deep Dive (4 sessions + 1 review)
- [ ] Score ≥80% tất cả Knowledge Checks
- [ ] Làm xong Mini Projects (2 projects)
- [ ] Tự tin giải thích concepts cho người khác

**Next:** Phase 2 - State Management & Backend

---

## 📚 RESOURCES

**Official Docs:**
- https://react.dev (React docs mới)
- https://www.typescriptlang.org/docs/handbook/react.html

**Practice:**
- https://react-typescript-cheatsheet.netlify.app/

**Deep Dives:**
- https://overreacted.io/ (Dan Abramov blog)

---

**VERSION:** 2.0 - Fresher Optimized
**DATE:** 2025-12-28
