# Session 1.2.1 - Rendering & Re-rendering - Complete Theory Guide

> **Module:** 1.2 - React Mental Model
> **Phase:** 1 - React Foundation
> **Thời gian đọc:** ~30 phút

---

## 📋 MỤC LỤC

- [PART 1: Render Counter](#-part-1-concepts-cho-exercise-1-render-counter) - Hiểu render triggers
- [PART 2: Parent-Child Re-renders](#-part-2-concepts-cho-exercise-2-parent-child-re-renders) - Parent-child relationship
- [PART 3: Optimize với React.memo](#-part-3-concepts-cho-exercise-3-optimize-với-reactmemo) - Performance optimization

---

# 📚 PART 1: Concepts cho EXERCISE 1 (Render Counter)

## 1️⃣ Render Triggers - Khi nào Component Re-render?

### 🤔 Vấn đề thực tế:

Bạn có bao giờ thắc mắc:
- Tại sao component của mình lại render lại?
- Làm sao biết component đã render bao nhiêu lần?
- State change có phải là nguyên nhân duy nhất khiến component re-render?

**Hiểu render triggers là NỀN TẢNG để:**
- Debug performance issues
- Optimize ứng dụng React
- Viết code hiệu quả hơn

### 📚 Giải pháp: Hiểu 4 Render Triggers

React component sẽ re-render khi:

| Trigger | Mô tả | Ví dụ |
|---------|-------|-------|
| **1. State change** | Khi setState được gọi với giá trị khác | `setCount(count + 1)` |
| **2. Props change** | Khi props từ parent thay đổi | `<Child value={newValue} />` |
| **3. Parent re-render** | Khi parent component re-render | Parent setState → Child cũng re-render |
| **4. Context change** | Khi context value thay đổi | `useContext(ThemeContext)` nhận value mới |

### 💻 Example Code: Đếm số lần render

```tsx
import { useState, useRef, useEffect } from 'react'

function RenderCounterExample() {
  // State - thay đổi state sẽ trigger re-render
  const [count, setCount] = useState(0)

  // Ref - KHÔNG trigger re-render khi thay đổi
  // Đây là lý do chúng ta dùng ref để đếm renders
  const renderCount = useRef(0)

  // useEffect chạy SAU mỗi render
  // Không có dependency array → chạy sau MỌI render
  useEffect(() => {
    renderCount.current += 1
    console.log(`🔄 Component rendered! Count: ${renderCount.current}`)
  })

  // Handler thay đổi state → trigger re-render
  const handleIncrement = () => {
    setCount(prev => prev + 1)  // State change → Re-render!
  }

  // Handler KHÔNG thay đổi state → KHÔNG re-render
  const handleDoNothing = () => {
    console.log('Button clicked, but no state change!')
    // Không có setState → Không có re-render
  }

  return (
    <div>
      <p>Render count: {renderCount.current}</p>
      <p>Current count: {count}</p>
      <button onClick={handleIncrement}>Increment (triggers re-render)</button>
      <button onClick={handleDoNothing}>Do Nothing (no re-render)</button>
    </div>
  )
}
```

### 🔍 Phân tích chi tiết:

**Tại sao dùng `useRef` để đếm renders?**

```tsx
// ❌ KHÔNG DÙNG useState để đếm renders
const [renderCount, setRenderCount] = useState(0)

useEffect(() => {
  setRenderCount(prev => prev + 1) // ← Cái này tạo INFINITE LOOP!
  // setRenderCount → re-render → useEffect → setRenderCount → ...
})

// ✅ DÙNG useRef - không trigger re-render
const renderCount = useRef(0)

useEffect(() => {
  renderCount.current += 1 // ← Thay đổi ref KHÔNG trigger re-render
})
```

**useEffect dependency array:**

```tsx
// Chạy sau MỖI render (bao gồm cả initial render)
useEffect(() => {
  console.log('Rendered!')
}) // Không có dependency array

// Chạy CHỈ 1 LẦN sau initial render (mount)
useEffect(() => {
  console.log('Mounted!')
}, []) // Empty dependency array

// Chạy khi count thay đổi
useEffect(() => {
  console.log('Count changed:', count)
}, [count]) // Dependency array với count
```

### ⚠️ React.StrictMode và Double Render

**Quan trọng:** Trong development mode với `<StrictMode>`, React sẽ render component **2 lần** để giúp detect side effects!

```tsx
// main.tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>  {/* ← Đây là nguyên nhân double render */}
    <App />
  </StrictMode>,
)
```

Điều này chỉ xảy ra trong **development**. Production sẽ render 1 lần bình thường.

### 💡 TIPS:

1. **Đếm renders để debug:** Dùng `useRef` + `useEffect` như pattern trên
2. **Console.log trong component body:** Cũng chạy mỗi render!
   ```tsx
   function MyComponent() {
     console.log('🔄 Rendering...') // Log mỗi render
     return <div>Hello</div>
   }
   ```
3. **React DevTools Profiler:** Tool chính thức để debug renders

### 🎯 Requirements Recap cho Exercise 1:

Bạn cần tạo component với:

1. **State `count`** - số integer, bắt đầu từ 0
2. **Ref `renderCount`** - đếm số lần render
3. **useEffect** - log mỗi lần render, tăng renderCount
4. **Button "Increment Count"** - tăng count state
5. **Button "Do Nothing"** - chỉ console.log, không setState

**Kết quả mong đợi:**
- Click "Increment Count" → render count tăng
- Click "Do Nothing" → render count KHÔNG đổi

---

# 📚 PART 2: Concepts cho EXERCISE 2 (Parent-Child Re-renders)

## 2️⃣ Parent-Child Relationship & Default Re-render Behavior

### 🤔 Vấn đề thực tế:

Trong ứng dụng thực tế:
- Bạn có Parent component chứa nhiều Child components
- Khi Parent re-render, điều gì xảy ra với Children?
- Nếu Child không cần re-render, có cách nào tránh được không?

### 📚 Giải pháp: Hiểu Default Behavior

**Rule quan trọng nhất:**
> Khi Parent re-render → TẤT CẢ Children cũng re-render (mặc định)

Điều này xảy ra **BẤT KỂ** props của Child có thay đổi hay không!

```tsx
function Parent() {
  const [parentCount, setParentCount] = useState(0)

  console.log('👨 Parent rendered!')

  return (
    <div>
      <button onClick={() => setParentCount(c => c + 1)}>
        Update Parent
      </button>

      {/* Child sẽ re-render NGAY CẢ KHI không nhận props nào! */}
      <Child />

      {/* Child này cũng re-render, dù props là static! */}
      <ChildWithProps message="Hello" />
    </div>
  )
}

function Child() {
  console.log('👶 Child rendered!')
  return <div>I'm a child</div>
}

function ChildWithProps({ message }: { message: string }) {
  console.log('👶 ChildWithProps rendered!')
  return <div>{message}</div>
}
```

**Kết quả khi click "Update Parent":**
```
👨 Parent rendered!
👶 Child rendered!           ← Re-render dù không nhận props!
👶 ChildWithProps rendered!  ← Re-render dù props không đổi!
```

### 💻 Example Code: Quan sát Parent-Child Re-renders

```tsx
import { useState, useRef, useEffect } from 'react'

// ===== PARENT COMPONENT =====
function Parent() {
  const [parentState, setParentState] = useState(0)
  const parentRenderCount = useRef(0)

  useEffect(() => {
    parentRenderCount.current += 1
  })

  console.log('👨 Parent rendered!')

  return (
    <div className="component-box parent">
      <span className="component-label">Parent</span>

      <p>Parent State: {parentState}</p>
      <p>Parent Render Count: {parentRenderCount.current}</p>

      <button onClick={() => setParentState(s => s + 1)}>
        Update Parent State
      </button>

      {/* Child nhận props từ parent state */}
      <ChildA value={parentState} />

      {/* Child KHÔNG nhận props liên quan đến state */}
      <ChildB />
    </div>
  )
}

// ===== CHILD A - Nhận props =====
function ChildA({ value }: { value: number }) {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
  })

  console.log('👶 ChildA rendered!')

  return (
    <div className="component-box child">
      <span className="component-label">ChildA (receives props)</span>
      <p>Value from parent: {value}</p>
      <p>Render Count: {renderCount.current}</p>
    </div>
  )
}

// ===== CHILD B - Không nhận props =====
function ChildB() {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
  })

  console.log('👶 ChildB rendered!')

  return (
    <div className="component-box child">
      <span className="component-label">ChildB (no props)</span>
      <p>I don't receive any props</p>
      <p>Render Count: {renderCount.current}</p>
    </div>
  )
}
```

### 🔍 Phân tích chi tiết:

**Tại sao React re-render tất cả children?**

React không thể biết trước:
- Child có phụ thuộc vào props không?
- Child có side effects phụ thuộc vào context không?
- Child có cần update không?

Vì vậy, **mặc định React re-render tất cả** và để bạn optimize những chỗ cần thiết.

**Đây có phải là vấn đề?**

Trong hầu hết trường hợp: **KHÔNG!**

React render rất nhanh. Re-render một component đơn giản chỉ mất microseconds.

**Khi nào đây là vấn đề?**

- Component có tính toán phức tạp
- Component render danh sách dài
- Component fetch data mỗi lần render (anti-pattern!)
- Deep component tree với nhiều levels

### 💡 TIPS:

1. **Đừng optimize sớm:** Measure first, optimize later
2. **React DevTools Profiler:** Giúp identify slow renders
3. **console.log pattern:** Thêm log vào mỗi component để observe
4. **Highlight updates:** React DevTools > Settings > Highlight updates

### 🎯 Requirements Recap cho Exercise 2:

Bạn cần tạo:

1. **Parent component:**
   - State riêng (e.g., `parentCount`)
   - Button để update state
   - Render count tracker
   - Chứa 2 children

2. **ChildA component:**
   - Nhận props từ parent
   - Render count tracker

3. **ChildB component:**
   - KHÔNG nhận props từ parent
   - Render count tracker

**Quan sát:**
- Khi Parent update state → CẢ HAI children re-render
- ChildB re-render dù không nhận props!

---

# 📚 PART 3: Concepts cho EXERCISE 3 (Optimize với React.memo)

## 3️⃣ React.memo và useCallback - Performance Optimization

### 🤔 Vấn đề thực tế:

Từ Exercise 2, chúng ta thấy:
- ChildB re-render không cần thiết
- Trong app lớn, điều này có thể gây performance issues

**Câu hỏi:**
- Làm sao ngăn child re-render khi props không đổi?
- Có tool nào React cung cấp cho việc này?

### 📚 Giải pháp: React.memo HOC

`React.memo` là Higher-Order Component (HOC) wrap component và **skip re-render nếu props không thay đổi**.

```tsx
import { memo } from 'react'

// Trước: Re-render mỗi khi parent re-render
function ExpensiveComponent({ value }: { value: number }) {
  // Tính toán phức tạp...
  return <div>{value}</div>
}

// Sau: Skip re-render nếu props không đổi
const MemoizedComponent = memo(function ExpensiveComponent({ value }: { value: number }) {
  // Tính toán phức tạp...
  return <div>{value}</div>
})

// Hoặc với arrow function
const MemoizedComponent2 = memo(({ value }: { value: number }) => {
  return <div>{value}</div>
})
```

### 💻 Example Code: So sánh có và không có memo

```tsx
import { useState, useRef, useEffect, memo, useCallback } from 'react'

function Parent() {
  const [count, setCount] = useState(0)

  // Function được tạo MỚI mỗi lần Parent render
  const handleClick = () => {
    console.log('Clicked!')
  }

  // Function được STABLE hóa với useCallback
  const stableHandleClick = useCallback(() => {
    console.log('Clicked!')
  }, []) // Empty deps = function reference never changes

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Update Parent ({count})</button>

      {/* Không memo → re-render mỗi lần */}
      <NormalChild value={10} onClick={handleClick} />

      {/* Có memo nhưng onClick thay đổi mỗi render! */}
      <MemoizedChild value={10} onClick={handleClick} />

      {/* Có memo + stable function → skip re-render! */}
      <MemoizedChild value={10} onClick={stableHandleClick} />
    </div>
  )
}

// Component bình thường
function NormalChild({ value, onClick }: { value: number; onClick: () => void }) {
  console.log('🔴 NormalChild rendered')
  return <button onClick={onClick}>Value: {value}</button>
}

// Component với React.memo
const MemoizedChild = memo(function MemoizedChild({
  value,
  onClick
}: {
  value: number
  onClick: () => void
}) {
  console.log('🟢 MemoizedChild rendered')
  return <button onClick={onClick}>Value: {value}</button>
})
```

### 🔍 React.memo hoạt động như thế nào?

```
Parent re-render
       ↓
React.memo kiểm tra: "Props có thay đổi không?"
       ↓
   ┌───┴───┐
   ↓       ↓
  YES      NO
   ↓       ↓
Re-render  Skip! (Dùng kết quả render trước)
```

**Shallow Comparison:**

React.memo dùng **shallow comparison** để so sánh props:

```tsx
// Shallow comparison examples:

// ✅ Primitive values - compare by value
previousProps.value === nextProps.value  // 10 === 10 → true

// ❌ Objects - compare by reference!
previousProps.user === nextProps.user
// { name: 'John' } === { name: 'John' } → FALSE!
// Vì đây là 2 object khác nhau trong memory

// ❌ Functions - compare by reference!
previousProps.onClick === nextProps.onClick
// () => {} === () => {} → FALSE!
// Vì mỗi render tạo function MỚI
```

### 💻 useCallback - Stable Function References

Vấn đề: Mỗi render tạo function mới → props thay đổi → memo không hoạt động!

```tsx
function Parent() {
  const [count, setCount] = useState(0)

  // ❌ Function MỚI mỗi render
  const handleClick = () => {
    console.log('Clicked!')
  }

  // ✅ Function STABLE với useCallback
  const stableHandleClick = useCallback(() => {
    console.log('Clicked!')
  }, []) // Dependencies: khi nào cần tạo function mới?

  // ✅ Function stable, nhưng update khi count thay đổi
  const handleClickWithCount = useCallback(() => {
    console.log('Count is:', count)
  }, [count]) // Tạo function mới khi count thay đổi

  return <MemoizedChild onClick={stableHandleClick} />
}
```

### ⚠️ React 18 Automatic Batching

React 18 giới thiệu **automatic batching** - gộp nhiều setState thành 1 render!

```tsx
function handleClick() {
  // React 17: 3 renders
  // React 18: 1 render (batched!)
  setCount(c => c + 1)
  setFlag(f => !f)
  setName('John')
}

// Batching hoạt động ở mọi nơi trong React 18:
setTimeout(() => {
  setCount(c => c + 1)  // ← Batched!
  setFlag(f => !f)      // ← Batched!
}, 1000)

fetch('/api').then(() => {
  setCount(c => c + 1)  // ← Batched!
  setFlag(f => !f)      // ← Batched!
})
```

### 💡 TIPS - Khi nào KHÔNG nên dùng React.memo?

```tsx
// ❌ KHÔNG DÙNG memo cho:

// 1. Component render nhanh, đơn giản
const SimpleText = memo(({ text }: { text: string }) => {
  return <span>{text}</span>  // Quá đơn giản, memo có overhead!
})

// 2. Component luôn nhận props mới
const AlwaysNewProps = memo(({ data }: { data: object }) => {
  // data là object mới mỗi render → memo vô dụng
  return <div>{JSON.stringify(data)}</div>
})

// 3. Component là leaf node không có children
// (Re-render cost rất thấp)
```

```tsx
// ✅ NÊN DÙNG memo cho:

// 1. Component có expensive calculations
const ExpensiveList = memo(({ items }: { items: Item[] }) => {
  const processed = items.map(item => heavyCalculation(item))
  return <ul>{processed.map(p => <li key={p.id}>{p.name}</li>)}</ul>
})

// 2. Component render nhiều items
const TodoList = memo(({ todos }: { todos: Todo[] }) => {
  return todos.map(todo => <TodoItem key={todo.id} {...todo} />)
})

// 3. Component ở giữa tree, có nhiều children
const Dashboard = memo(({ user }: { user: User }) => {
  return (
    <div>
      <Header user={user} />
      <Sidebar user={user} />
      <MainContent user={user} />
    </div>
  )
})
```

### 🎯 Requirements Recap cho Exercise 3:

Tạo **Todo App đơn giản** với optimization:

1. **Parent (TodoApp):**
   - State: `todos` array, `inputValue` string
   - Input để thêm todo
   - Render count tracker

2. **TodoList component:**
   - Nhận `todos` array và `onDelete` function
   - Render danh sách TodoItem
   - **Wrap với React.memo**

3. **TodoItem component:**
   - Nhận `todo` object và `onDelete` function
   - Hiển thị todo text + delete button
   - **Wrap với React.memo**

4. **Optimization:**
   - Dùng `useCallback` cho `onDelete` function
   - Quan sát: khi typing → chỉ Parent re-render
   - TodoList và TodoItem KHÔNG re-render khi typing

**Kết quả mong đợi:**
- Typing trong input → chỉ Parent re-render
- Add todo → TodoList re-render
- Delete todo → TodoList re-render

---

## 📊 Tổng kết Concepts

| Concept | Mục đích | Khi nào dùng |
|---------|----------|--------------|
| **useRef** | Giữ value không trigger re-render | Đếm renders, store previous values |
| **useEffect** | Side effects sau render | Log, fetch, subscriptions |
| **React.memo** | Skip re-render nếu props không đổi | Expensive components |
| **useCallback** | Stable function reference | Pass functions to memoized children |
| **Batching** | Gộp nhiều setState → 1 render | Automatic in React 18 |

---

## 🚀 Ready for Exercises!

Bạn đã sẵn sàng làm exercises:

1. **Exercise 1:** Áp dụng PART 1 - Đếm renders
2. **Exercise 2:** Áp dụng PART 2 - Quan sát parent-child
3. **Exercise 3:** Áp dụng PART 3 - Optimize với memo

**Good luck! 🎯**
