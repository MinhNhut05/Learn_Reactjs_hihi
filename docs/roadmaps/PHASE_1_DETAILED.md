# PHASE 1: CỦNG CỐ NỀN TẢNG (Chi Tiết)

> Thời gian: 2-3 tuần (với 5h/ngày)
> Mục tiêu: Master TypeScript + React mental model + Hooks

---

## 📅 MODULE 1.1: TypeScript cho React (4-5 days)

### **Session 1.1.1: Props & State Typing (2-3h)**

#### Concepts:
- Type vs Interface cho Props
- Optional props & default values
- Children typing: ReactNode vs ReactElement
- Generic props

#### Bài tập:

**Exercise 1: Button Component**
```typescript
// YÊU CẦU:
// 1. Tạo Button component với props:
//    - label: string (required)
//    - variant: 'primary' | 'secondary' | 'danger' (required)
//    - size: 'sm' | 'md' | 'lg' (optional, default 'md')
//    - onClick: click handler
//    - disabled: boolean (optional)
// 2. Phải có TypeScript types
// 3. Không có type errors

// TODO: Implement here
```

**Exercise 2: Card Component với Children**
```typescript
// YÊU CẦU:
// 1. Card component nhận:
//    - title: string
//    - children: ReactNode
//    - footer?: ReactNode
//    - className?: string
// 2. Render title, children, footer nếu có
// 3. Full TypeScript support

// TODO: Implement
```

**Exercise 3: Generic List Component**
```typescript
// YÊU CẦU:
// 1. List<T> component:
//    - items: T[]
//    - renderItem: (item: T) => ReactNode
//    - keyExtractor: (item: T) => string | number
// 2. Phải work với bất kỳ type nào:
//    - List<User>
//    - List<Product>
//    - List<string>

// TODO: Implement generic List
```

#### Knowledge Check:
```
1. Khi nào dùng type vs interface?
2. Tại sao children nên dùng ReactNode thay vì ReactElement?
3. Generic components giải quyết vấn đề gì?
```

---

### **Session 1.1.2: Event Handlers Typing (2-3h)**

#### Concepts:
- Event types: MouseEvent, ChangeEvent, FormEvent, KeyboardEvent
- Generic event types: React.ChangeEvent<HTMLInputElement>
- Custom event handlers
- preventDefault & stopPropagation với types

#### Bài tập:

**Exercise 1: Form với TypeScript**
```typescript
// YÊU CẦU:
// 1. Login form với:
//    - Email input
//    - Password input
//    - Submit button
// 2. Typed event handlers:
//    - handleEmailChange
//    - handlePasswordChange
//    - handleSubmit (prevent default)
// 3. State với proper types
// 4. Form validation (email format, password min length)

// TODO: Implement
```

**Exercise 2: Search Component**
```typescript
// YÊU CẦU:
// 1. Search input với:
//    - onChange handler (typed)
//    - onKeyDown handler (Enter to search)
//    - Clear button (onClick typed)
// 2. Debounced search (optional challenge)
// 3. Props type for onSearch callback

// TODO: Implement
```

#### Knowledge Check:
```
1. React.ChangeEvent<HTMLInputElement> vs React.FormEvent?
2. Làm sao type một custom callback prop?
3. e.currentTarget vs e.target khác gì?
```

---

### **Session 1.1.3: Hooks với TypeScript (2h)**

#### Concepts:
- useState với type inference vs explicit type
- useRef<HTMLDivElement> vs useRef<number>
- Custom hooks typing
- Return types cho hooks

#### Bài tập:

**Exercise 1: useLocalStorage Hook**
```typescript
// YÊU CẦU:
// 1. Tạo hook: useLocalStorage<T>(key: string, initialValue: T)
// 2. Return [value, setValue] như useState
// 3. Sync với localStorage
// 4. Generic type support
// 5. Handle JSON parse errors

// USAGE:
// const [user, setUser] = useLocalStorage<User>('user', null)
// const [count, setCount] = useLocalStorage<number>('count', 0)

// TODO: Implement
```

**Exercise 2: useDebounce Hook**
```typescript
// YÊU CẦU:
// 1. useDebounce<T>(value: T, delay: number): T
// 2. Return debounced value
// 3. Generic type

// USAGE:
// const debouncedSearch = useDebounce(searchTerm, 500)

// TODO: Implement
```

**Exercise 3: useFetch Hook**
```typescript
// YÊU CẦU:
// 1. useFetch<T>(url: string)
// 2. Return { data: T | null, loading: boolean, error: Error | null }
// 3. Handle abort on unmount
// 4. Generic response type

// USAGE:
// const { data, loading, error } = useFetch<User[]>('/api/users')

// TODO: Implement
```

---

### **Session 1.1.4: Utility Types & Advanced (2h)**

#### Concepts:
- Partial<T>, Required<T>, Pick<T>, Omit<T>
- Record<K, V>
- PropsWithChildren<P>
- ComponentProps<typeof Component>

#### Bài tập:

**Exercise 1: Form Builder**
```typescript
// YÊU CẦU:
// 1. Type cho form fields:
interface User {
  id: string
  name: string
  email: string
  age: number
  role: 'admin' | 'user'
}

// 2. Tạo type cho:
// - CreateUserForm: Omit<User, 'id'> (không cần id khi tạo)
// - UpdateUserForm: Partial<Omit<User, 'id'>> (update 1 số fields)
// - UserFormErrors: Record<keyof User, string | undefined>

// 3. Implement form component với types trên

// TODO: Implement
```

**Exercise 2: Props Extraction**
```typescript
// YÊU CẦU:
// 1. Tạo Button component
// 2. Tạo IconButton extends tất cả props của Button + thêm icon
// 3. Dùng ComponentProps<typeof Button>

// TODO: Implement
```

#### Checkpoint Quiz:
```
1. Khi nào dùng Partial vs Pick?
2. Record<string, unknown> vs { [key: string]: unknown }?
3. PropsWithChildren giải quyết vấn đề gì?
```

---

## 📅 MODULE 1.2: React Mental Model (5-6 days)

### **Session 1.2.1: Rendering & Re-rendering (3h)**

#### Concepts:
- Initial render vs re-render
- What triggers re-render: state change, parent re-render, context change
- React rendering is pure
- Batching updates

#### Bài tập:

**Exercise 1: Render Counter**
```typescript
// YÊU CẦU:
// 1. Tạo component hiển thị số lần render
// 2. Có button tăng counter
// 3. Có button không làm gì
// 4. Log mỗi lần render
// 5. Quan sát: button nào trigger re-render?

// TODO: Implement và quan sát console
```

**Exercise 2: Parent-Child Renders**
```typescript
// YÊU CẦU:
// 1. Parent component với state
// 2. Child component log khi render
// 3. Parent có button update state
// 4. Quan sát: Child render khi Parent state change?
// 5. Giải thích tại sao?

// COMPONENTS:
// - Parent: có counter state
// - Child: không dùng gì từ Parent
// - Child2: nhận counter từ props

// TODO: Implement và giải thích behavior
```

**Exercise 3: Batching Demo**
```typescript
// YÊU CẦU:
// 1. Component với 3 states
// 2. Button update cả 3 states cùng lúc
// 3. Log trong render
// 4. Quan sát: render mấy lần?
// 5. Giải thích batching trong React 18

const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [flag, setFlag] = useState(false)

const handleClick = () => {
  setCount(c => c + 1)
  setName('Updated')
  setFlag(true)
  // Render mấy lần?
}

// TODO: Implement và test
```

#### Deep Dive Discussion:
- Tại sao React batch updates?
- Automatic batching trong React 18 vs React 17
- Khi nào flush sync?

---

### **Session 1.2.2: Reconciliation & Keys (2-3h)**

#### Concepts:
- Virtual DOM & diffing algorithm
- Element type change → unmount/remount
- Keys trong lists
- Index as key - tại sao nguy hiểm

#### Bài tập:

**Exercise 1: Component Type Change**
```typescript
// YÊU CẦU:
// 1. Component toggle giữa:
//    <input /> và <textarea />
// 2. Mỗi cái có state riêng
// 3. Quan sát: state có preserve khi toggle?
// 4. Giải thích tại sao?

// TODO: Implement
```

**Exercise 2: Keys Debugging**
```typescript
// YÊU CẦU:
// 1. Todo list với items có thể reorder
// 2. Mỗi todo item có input field
// 3. Implementation A: dùng index as key
// 4. Implementation B: dùng item.id as key
// 5. Test: nhập text vào inputs, reorder list
// 6. Quan sát difference

// TODO: Implement cả 2 versions, so sánh
```

**Exercise 3: Forced Remount**
```typescript
// YÊU CẦU:
// 1. Form component với nhiều fields
// 2. Reset button
// 3. Implement reset bằng:
//    Method A: manually reset từng state
//    Method B: thay đổi key của form
// 4. So sánh 2 cách

// TODO: Implement cả 2 approaches
```

---

### **Session 1.2.3: Closure trong React (2-3h)**

#### Concepts:
- Closure trap trong useEffect
- Stale closure problem
- Functional updates
- useRef để escape closure

#### Bài tập:

**Exercise 1: Stale Closure Bug**
```typescript
// YÊU CẦU:
// 1. Component có counter
// 2. useEffect với setInterval log counter
// 3. Bug: luôn log 0
// 4. Fix bằng deps array
// 5. Fix bằng useRef

// TODO: Reproduce bug, then fix 2 ways
```

**Exercise 2: Event Handlers Closure**
```typescript
// YÊU CẦU:
// 1. Component có name state
// 2. Button log name sau 3 giây
// 3. Quan sát: nếu đổi name trong 3s, log value cũ hay mới?
// 4. Giải thích behavior
// 5. Implement version log latest name

const handleClick = () => {
  setTimeout(() => {
    console.log(name) // Giá trị gì?
  }, 3000)
}

// TODO: Implement và explain
```

**Exercise 3: Cleanup Function**
```typescript
// YÊU CẦU:
// 1. Component fetch user data
// 2. User có thể đổi userId nhanh
// 3. Implement cleanup để tránh race condition
// 4. Dùng AbortController

// TODO: Implement proper cleanup
```

---

### **Session 1.2.4: One-way Data Flow (2h)**

#### Concepts:
- Props down, events up
- Lifting state up
- State colocation
- Single source of truth

#### Bài tập:

**Exercise 1: Temperature Converter**
```typescript
// YÊU CẦU:
// 1. Celsius input và Fahrenheit input
// 2. Đổi 1 cái → cái kia tự update
// 3. Implement với lifted state
// 4. Controlled inputs

// COMPONENTS:
// - TemperatureInput (presentational)
// - Calculator (container, holds state)

// TODO: Implement
```

**Exercise 2: Filterable Product List**
```typescript
// YÊU CẦU:
// 1. SearchBar component
// 2. ProductList component
// 3. State ở đâu?
// 4. Implement lifting state up

// TODO: Implement proper architecture
```

---

## 📅 MODULE 1.3: Hooks Deep Dive (5-6 days)

### **Session 1.3.1: useState Advanced (2h)**

#### Concepts:
- Lazy initialization
- Functional updates
- Object state pitfalls
- Multiple states vs single object

#### Bài tập:

**Exercise 1: Expensive Initialization**
```typescript
// YÊU CẦU:
// 1. Component với state từ localStorage
// 2. Implementation A: direct initialization
//    const [state, setState] = useState(localStorage.getItem('key'))
// 3. Implementation B: lazy initialization
//    const [state, setState] = useState(() => localStorage.getItem('key'))
// 4. So sánh: cái nào re-run hàm mỗi render?

// TODO: Implement và profile
```

**Exercise 2: Functional Updates**
```typescript
// YÊU CẦU:
// 1. Counter với increment button
// 2. Button tăng 3 lần trong 1 click
// 3. Implementation A: setCount(count + 1) x3
// 4. Implementation B: setCount(c => c + 1) x3
// 5. Giải thích difference

// TODO: Implement cả 2, explain
```

**Exercise 3: Object State**
```typescript
// YÊU CẦU:
// 1. Form với multiple fields trong 1 object
// 2. Update individual fields
// 3. Common mistakes: mutating vs immutable update
// 4. Implement correctly

interface FormState {
  name: string
  email: string
  age: number
}

// TODO: Implement proper object state updates
```

---

### **Session 1.3.2: useEffect Mastery (3h)**

#### Concepts:
- Effect dependencies
- Effect cleanup
- Race conditions
- Effect timing vs useLayoutEffect

#### Bài tập:

**Exercise 1: Dependencies Debug**
```typescript
// YÊU CẦU:
// Cho code có bugs, fix them:

const [count, setCount] = useState(0)
const [data, setData] = useState([])

useEffect(() => {
  fetchData(count).then(setData)
}, []) // Bug: missing dep

const filteredData = data.filter(item => item.value > count)

useEffect(() => {
  console.log(filteredData)
}, [data]) // Bug: missing dep

// TODO: Fix tất cả dependency issues
```

**Exercise 2: Proper Data Fetching**
```typescript
// YÊU CẦU:
// 1. Fetch user data khi userId thay đổi
// 2. Handle cleanup (abort previous request)
// 3. Handle race conditions
// 4. Loading & error states

// TODO: Implement production-ready data fetching
```

**Exercise 3: Cleanup Patterns**
```typescript
// YÊU CẦU:
// Implement cleanup cho:
// 1. setInterval
// 2. addEventListener
// 3. WebSocket connection
// 4. Async operation với AbortController

// TODO: Implement all 4 patterns
```

---

### **Session 1.3.3: useMemo & useCallback (2-3h)**

#### Concepts:
- Khi nào dùng useMemo
- Khi nào KHÔNG nên dùng
- useCallback cho prop stability
- Premature optimization

#### Bài tập:

**Exercise 1: Expensive Calculation**
```typescript
// YÊU CẦU:
// 1. Component với expensive calculation
// 2. Component có state khác (không liên quan)
// 3. Version A: không dùng useMemo
// 4. Version B: dùng useMemo
// 5. Profile với React DevTools

function expensiveCalculation(num: number) {
  console.log('Calculating...')
  let result = 0
  for (let i = 0; i < 1000000000; i++) {
    result += num
  }
  return result
}

// TODO: Implement và profile
```

**Exercise 2: Referential Equality**
```typescript
// YÊU CẦU:
// 1. Parent component với object prop
// 2. Child component memo-ized
// 3. Version A: inline object
// 4. Version B: useMemo object
// 5. Observe re-renders

const Parent = () => {
  const [count, setCount] = useState(0)

  // Version A
  const config = { theme: 'dark', locale: 'vi' }

  // Version B
  const config = useMemo(() => ({ theme: 'dark', locale: 'vi' }), [])

  return <MemoizedChild config={config} />
}

// TODO: Test both versions
```

**Exercise 3: useCallback với Dependencies**
```typescript
// YÊU CẦU:
// 1. List component với memo-ized items
// 2. Each item có onClick handler
// 3. Implement without useCallback → observe re-renders
// 4. Implement with useCallback → observe difference

// TODO: Implement and compare
```

#### Anti-pattern Discussion:
```
Khi NÀO dùng useMemo/useCallback?
✅ Expensive calculations
✅ Prop stability cho memo components
✅ Dependency của useEffect

Khi NÀO KHÔNG dùng?
❌ Mọi thứ (premature optimization)
❌ Primitive values
❌ Small calculations
```

---

### **Session 1.3.4: useContext & useReducer (2-3h)**

#### Concepts:
- Context creation & provider
- useContext
- useReducer for complex state
- Combining context + reducer

#### Bài tập:

**Exercise 1: Theme Context**
```typescript
// YÊU CẦU:
// 1. ThemeContext: 'light' | 'dark'
// 2. ThemeProvider component
// 3. useTheme custom hook
// 4. Toggle theme button
// 5. TypeScript support

// TODO: Implement theme system
```

**Exercise 2: Auth Context**
```typescript
// YÊU CẦU:
// 1. AuthContext với user state
// 2. Actions: login, logout, updateUser
// 3. useAuth hook
// 4. Protected component (show content if logged in)

interface User {
  id: string
  name: string
  email: string
}

// TODO: Implement auth context
```

**Exercise 3: Complex State với useReducer**
```typescript
// YÊU CẦU:
// 1. Todo app state:
interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  loading: boolean
}

// 2. Actions:
// - ADD_TODO
// - TOGGLE_TODO
// - DELETE_TODO
// - SET_FILTER
// - SET_LOADING

// 3. Implement reducer với TypeScript
// 4. Component dùng useReducer

// TODO: Implement
```

---

### **Session 1.3.5: useRef Deep Dive (2h)**

#### Concepts:
- useRef for DOM elements
- useRef for mutable values
- useRef vs useState
- forwardRef pattern

#### Bài tập:

**Exercise 1: Focus Management**
```typescript
// YÊU CẦU:
// 1. Form với multiple inputs
// 2. Auto-focus first input khi mount
// 3. Enter key → focus next input
// 4. Dùng useRef

// TODO: Implement keyboard navigation
```

**Exercise 2: Previous Value**
```typescript
// YÊU CẦU:
// 1. Implement usePrevious hook
// 2. Return previous value của state/prop
// 3. Dùng useRef

function usePrevious<T>(value: T): T | undefined {
  // TODO: Implement
}

// USAGE:
const [count, setCount] = useState(0)
const prevCount = usePrevious(count)
```

**Exercise 3: Instance Variable**
```typescript
// YÊU CẦU:
// 1. Component với interval
// 2. Clear interval khi unmount
// 3. Dùng useRef để store interval ID
// 4. So sánh: tại sao không dùng useState?

// TODO: Implement
```

---

### **Session 1.3.6: Custom Hooks Patterns (2-3h)**

#### Concepts:
- When to create custom hook
- Naming convention (use*)
- Composing hooks
- Return patterns: array vs object

#### Bài tập:

**Exercise 1: useToggle**
```typescript
// YÊU CẦU:
function useToggle(initialValue = false) {
  // TODO: Implement
  // Return [value, toggle, setTrue, setFalse]
}

// USAGE:
const [isOpen, toggleOpen, open, close] = useToggle()
```

**Exercise 2: useForm**
```typescript
// YÊU CẦU:
// 1. Generic form hook
// 2. Handle values, errors, touched
// 3. Validation
// 4. Submit handling

function useForm<T>(initialValues: T, validate: (values: T) => Errors<T>) {
  // TODO: Implement
}

// USAGE:
const { values, errors, handleChange, handleSubmit } = useForm({
  name: '',
  email: ''
}, validateForm)
```

**Exercise 3: useAsync**
```typescript
// YÊU CẦU:
// 1. Hook cho async operations
// 2. States: idle, loading, success, error
// 3. run, reset functions

function useAsync<T>() {
  // TODO: Implement
  // Return { status, data, error, run, reset }
}

// USAGE:
const { status, data, error, run } = useAsync()
```

---

## 📊 PHASE 1 CHECKPOINT

### **Final Exercise: Todo App (4-5h)**

**YÊU CẦU:**
Build todo app áp dụng TẤT CẢ kiến thức Phase 1:

**Features:**
- [ ] Add, toggle, delete todos
- [ ] Filter: all/active/completed
- [ ] Persist to localStorage
- [ ] Full TypeScript
- [ ] Proper performance optimization
- [ ] Clean code architecture

**Technical Requirements:**
- [ ] Custom hooks: useLocalStorage, useForm
- [ ] Proper TypeScript types
- [ ] Proper useEffect cleanup
- [ ] Memo where needed
- [ ] Context cho theme (bonus)

**Code Quality:**
- [ ] No prop drilling
- [ ] Proper component composition
- [ ] No unnecessary re-renders
- [ ] Clean separation of concerns

---

## ✅ PHASE 1 COMPLETION CHECKLIST

Hoàn thành Phase 1 khi:
- [ ] Hiểu rõ TypeScript với React (types, generics, utility types)
- [ ] Giải thích được rendering process
- [ ] Hiểu closure traps và cách fix
- [ ] Biết khi nào dùng hook nào
- [ ] Tự code được custom hooks
- [ ] Làm xong Final Todo App
- [ ] Score ≥80% tất cả Knowledge Checks

**Next:** Phase 2 - State Management & Data Fetching

---

## 📚 RESOURCES

**Official Docs:**
- https://react.dev (new React docs)
- https://www.typescriptlang.org/docs/handbook/react.html

**Deep Dives:**
- https://beta.reactjs.org/learn/render-and-commit
- https://overreacted.io/ (Dan Abramov blog)

**Practice:**
- https://react-typescript-cheatsheet.netlify.app/
