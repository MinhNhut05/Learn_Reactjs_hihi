# Session 1.1.3 - Hooks với TypeScript - Complete Theory Guide

> **Hướng dẫn sử dụng:**
> - Đọc PART 1 trước khi làm Exercise 1
> - Đọc PART 2 trước khi làm Exercise 2
> - Đọc PART 3 trước khi làm Exercise 3
> - Trong lúc chờ AI review exercise trước, đọc PART tiếp

---

# 📚 PART 1: Custom useLocalStorage Hook

> Đọc PART này trước khi làm Exercise 1

## 1️⃣ Generic Custom Hooks

### 🤔 VẤN ĐỀ THỰC TẾ

Khi làm việc với localStorage, bạn thường phải viết code lặp lại:

```tsx
// ❌ Code lặp lại trong mỗi component
function UserSettings() {
  const [theme, setTheme] = useState<string>(() => {
    const saved = localStorage.getItem('theme')
    return saved ? JSON.parse(saved) : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  // ...
}

function UserProfile() {
  const [username, setUsername] = useState<string>(() => {
    const saved = localStorage.getItem('username')
    return saved ? JSON.parse(saved) : ''
  })

  useEffect(() => {
    localStorage.setItem('username', JSON.stringify(username))
  }, [username])

  // ...
}
```

**Problems:**
1. Code lặp lại cho mỗi state cần sync với localStorage
2. Dễ quên parse/stringify JSON
3. Không handle errors khi localStorage full hoặc disabled
4. Không type-safe - có thể lưu/đọc sai type

---

### 📚 GIẢI PHÁP: Generic Custom Hook

**Khi nào dùng:**
- Cần reuse logic phức tạp (localStorage, fetch, debounce)
- Logic liên quan đến React hooks (useState, useEffect, useRef)
- Muốn abstract away implementation details
- Cần type-safe với nhiều loại data

**Generic Hook là gì:**
- Custom hook với generic type `<T>`
- Có thể dùng với bất kỳ data type nào
- Type-safe: TypeScript biết chính xác type của data
- Reusable: Viết 1 lần, dùng nhiều nơi

**Cách hoạt động:**

```tsx
// Hook signature với generic
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void]
```

**Giải thích:**
- `<T>` - Generic type placeholder
- `key: string` - localStorage key
- `initialValue: T` - Giá trị mặc định có type T
- Return `[T, (value: T) => void]` - Tuple giống useState

---

### 💻 VÍ DỤ CODE CHI TIẾT:

#### **Bước 1: Hook Signature**

```tsx
import { useState } from 'react'

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Implementation
}
```

**Giải thích:**
- Generic `<T>` cho phép hook work với bất kỳ type nào
- Return type `[T, (value: T) => void]` - tuple với value và setter
- Giống như `useState<T>` nhưng sync với localStorage

#### **Bước 2: Initialize State từ localStorage**

```tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Khởi tạo state từ localStorage hoặc initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Lấy từ localStorage
      const item = window.localStorage.getItem(key)

      // Parse và return nếu có
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // Nếu lỗi (parse error, localStorage disabled), return initialValue
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // ...
}
```

**Giải thích từng dòng:**
- `useState<T>(() => {...})` - Lazy initialization, chỉ chạy 1 lần khi mount
- `window.localStorage.getItem(key)` - Lấy string từ localStorage
- `JSON.parse(item)` - Convert string → object/array/etc
- `catch (error)` - Handle localStorage disabled hoặc parse error
- Return `initialValue` nếu không có saved value hoặc lỗi

#### **Bước 3: setValue Function - Sync với localStorage**

```tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // ... (code từ bước 2)
  })

  // Function để update value và sync với localStorage
  const setValue = (value: T) => {
    try {
      // Lưu vào state
      setStoredValue(value)

      // Lưu vào localStorage
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // localStorage full hoặc disabled
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
```

**Giải thích:**
- `setValue` - Function wrapper để update cả state VÀ localStorage
- `setStoredValue(value)` - Update React state (trigger re-render)
- `localStorage.setItem(key, JSON.stringify(value))` - Sync với localStorage
- `try/catch` - Handle localStorage quota exceeded hoặc disabled

#### **Bước 4: Full Implementation**

```tsx
import { useState } from 'react'

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // 1. Initialize state từ localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // 2. setValue function - sync với localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  // 3. Return tuple như useState
  return [storedValue, setValue]
}
```

---

### 🎯 CÁCH DÙNG HOOK:

#### **Example 1: Simple String**

```tsx
function ThemeToggle() {
  // T = string
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light')

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  )
}
```

**Giải thích:**
- `useLocalStorage<string>` - Generic type là string
- `'theme'` - localStorage key
- `'light'` - Initial value nếu chưa có saved value
- TypeScript knows `theme` is `string`, `setTheme` accepts `string`

#### **Example 2: Object Type**

```tsx
interface User {
  name: string
  age: number
}

function UserProfile() {
  // T = User
  const [user, setUser] = useLocalStorage<User>('user', {
    name: '',
    age: 0
  })

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
      />
    </div>
  )
}
```

**Giải thích:**
- `useLocalStorage<User>` - Type-safe với User interface
- TypeScript auto-complete cho `user.name`, `user.age`
- `setUser` chỉ accept object có shape của User
- Spread operator `{...user, name: ...}` để update immutably

#### **Example 3: Array Type**

```tsx
interface Todo {
  id: number
  text: string
  completed: boolean
}

function TodoList() {
  // T = Todo[]
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
        </div>
      ))}
    </div>
  )
}
```

**Giải thích:**
- `useLocalStorage<Todo[]>` - Array of Todo objects
- Auto persists todos to localStorage on every update
- Type-safe: `todos.map(todo => ...)` knows `todo` is `Todo`

---

### 💡 TIPS & BEST PRACTICES:

#### **1. Type Inference**

```tsx
// ✅ GOOD - Explicit type
const [count, setCount] = useLocalStorage<number>('count', 0)

// ✅ ALSO GOOD - Type inferred from initialValue
const [count, setCount] = useLocalStorage('count', 0)  // T inferred as number

// ❌ CAREFUL - Inference might be wrong
const [user, setUser] = useLocalStorage('user', null)  // T inferred as null
const [user, setUser] = useLocalStorage<User | null>('user', null)  // ✅ Better
```

#### **2. Error Handling**

```tsx
// ✅ Hook handles errors gracefully
const [data, setData] = useLocalStorage('key', initialValue)
// - localStorage disabled → fallback to initialValue
// - localStorage full → update state but log error
// - Parse error → fallback to initialValue
```

#### **3. Storage Events (Advanced - Optional)**

```tsx
// Listen for changes in other tabs/windows
useEffect(() => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === key && e.newValue) {
      setStoredValue(JSON.parse(e.newValue))
    }
  }

  window.addEventListener('storage', handleStorageChange)
  return () => window.removeEventListener('storage', handleStorageChange)
}, [key])
```

**Note:** This is BONUS - not required for basic implementation

#### **4. Common Mistakes**

```tsx
// ❌ WRONG - Forget to stringify
localStorage.setItem('user', user)  // "[object Object]"

// ✅ CORRECT
localStorage.setItem('user', JSON.stringify(user))

// ❌ WRONG - Forget to parse
const user = localStorage.getItem('user')  // string

// ✅ CORRECT
const user = JSON.parse(localStorage.getItem('user') || '{}')
```

---

### 🎯 EXERCISE 1 REQUIREMENTS RECAP:

**Bạn cần implement:**

1. **Generic Hook Signature:**
   ```tsx
   function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
   ```

2. **Initialize from localStorage:**
   - Use `useState` lazy initialization
   - Try to read from localStorage
   - Parse JSON
   - Fallback to `initialValue` if error

3. **setValue Function:**
   - Update React state
   - Sync to localStorage with JSON.stringify
   - Handle errors gracefully

4. **Demo Component:**
   - Use hook với string type (theme)
   - Use hook với object type (user: {name, email})
   - Buttons/inputs để test

5. **Type Safety:**
   - Generic type `<T>` works correctly
   - TypeScript auto-complete works
   - Return type is correct tuple

**Success Criteria:**
- Refresh page → data persists
- Change value → localStorage updates
- TypeScript no errors
- Handles localStorage disabled/full

---

# 📚 PART 2: Custom useDebounce Hook

> Đọc PART này trước khi làm Exercise 2

## 2️⃣ useDebounce - Delay Updates

### 🤔 VẤN ĐỀ THỰC TẾ

Khi user type vào search input, bạn không muốn search sau MỖI keystroke:

```tsx
// ❌ BAD - Search sau mỗi keystroke
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    performExpensiveSearch(e.target.value)  // Called too many times!
  }

  return <input onChange={handleChange} />
}
```

**Problems:**
- User type "react" → 5 searches: "r", "re", "rea", "reac", "react"
- Waste API calls, bandwidth, processing
- Bad UX: Results keep changing while typing
- Performance issues với expensive operations

**Ideal behavior:**
- User types "react"
- Wait 500ms after LAST keystroke
- Only then perform search with "react"
- 1 search instead of 5!

---

### 📚 GIẢI PHÁP: Debounce Hook

**Debouncing là gì:**
- Delay execution until user "stops" typing
- "Stops" = no input for X milliseconds (e.g., 500ms)
- Only the LAST value is used

**Use cases:**
- Search input (wait for user to finish typing)
- Window resize events (wait for resize to finish)
- Auto-save (wait for user to stop editing)
- API calls (reduce request count)

**Cách hoạt động:**

```
User types: r -> re -> rea -> reac -> react
           |    |     |      |       |
Time:      0    100   200    300     400   900ms
                                            ↓
                                       Search "react"
                                       (500ms after last keystroke)
```

---

### 💻 VÍ DỤ CODE CHI TIẾT:

#### **Bước 1: Hook Signature**

```tsx
import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay: number): T {
  // Implementation
}
```

**Giải thích:**
- Generic `<T>` - works with any value type
- `value: T` - The value to debounce (e.g., search term)
- `delay: number` - Delay in milliseconds (e.g., 500)
- Returns `T` - The debounced value

#### **Bước 2: State để lưu debounced value**

```tsx
function useDebounce<T>(value: T, delay: number): T {
  // State để lưu debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  // ...

  return debouncedValue
}
```

**Giải thích:**
- `debouncedValue` - Value sau khi debounce
- Initialize với `value` (no delay lần đầu)
- Return debounced value cho component

#### **Bước 3: useEffect với setTimeout**

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set timeout để update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup: Clear timeout nếu value thay đổi trước khi delay hết
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])  // Re-run khi value hoặc delay thay đổi

  return debouncedValue
}
```

**Giải thích từng dòng:**
- `setTimeout(() => setDebouncedValue(value), delay)` - Schedule update sau `delay` ms
- `return () => clearTimeout(handler)` - Cleanup: Cancel previous timeout
- `[value, delay]` - Dependencies: Re-run khi value/delay thay đổi

**Cách hoạt động:**

```
User types "r":
  → useEffect runs
  → setTimeout: update debouncedValue to "r" after 500ms

User types "e" (100ms later):
  → useEffect cleanup runs → clearTimeout (cancel "r" update)
  → useEffect runs again
  → setTimeout: update debouncedValue to "re" after 500ms

User types "a" (100ms later):
  → useEffect cleanup runs → clearTimeout (cancel "re" update)
  → useEffect runs again
  → setTimeout: update debouncedValue to "rea" after 500ms

... (same for "c" and "t")

User stops typing at "react":
  → No new keystrokes for 500ms
  → setTimeout completes
  → setDebouncedValue("react") runs
  → Component re-renders with debouncedValue = "react"
```

#### **Bước 4: Full Implementation**

```tsx
import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay: number): T {
  // 1. State để lưu debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  // 2. useEffect với setTimeout + cleanup
  useEffect(() => {
    // Set timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  // 3. Return debounced value
  return debouncedValue
}
```

---

### 🎯 CÁCH DÙNG HOOK:

#### **Example 1: Debounced Search**

```tsx
import { ChangeEvent, useEffect, useState } from 'react'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)  // Update immediately (for input display)
  }

  // Effect chỉ chạy khi debouncedSearchTerm thay đổi
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm)
      // Perform API call, expensive search, etc.
    }
  }, [debouncedSearchTerm])

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
      <p>Searching for: {debouncedSearchTerm}</p>
    </div>
  )
}
```

**Giải thích:**
- `searchTerm` - Updates immediately on every keystroke (for input)
- `debouncedSearchTerm` - Updates 500ms after user stops typing
- `useEffect` depends on `debouncedSearchTerm` → only runs after delay
- Result: 1 search instead of many!

#### **Example 2: Auto-save**

```tsx
interface FormData {
  title: string
  content: string
}

function Editor() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: ''
  })
  const debouncedFormData = useDebounce<FormData>(formData, 1000)

  // Auto-save khi debouncedFormData thay đổi
  useEffect(() => {
    if (debouncedFormData.title || debouncedFormData.content) {
      console.log('Auto-saving...', debouncedFormData)
      // Save to backend, localStorage, etc.
    }
  }, [debouncedFormData])

  return (
    <div>
      <input
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        placeholder="Content"
      />
      <p>Last saved: {JSON.stringify(debouncedFormData)}</p>
    </div>
  )
}
```

**Giải thích:**
- Form updates immediately (good UX)
- Auto-save only after 1 second of no changes
- Reduces save operations significantly

#### **Example 3: Window Resize**

```tsx
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const debouncedSize = useDebounce(windowSize, 200)

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return debouncedSize
}

function ResponsiveComponent() {
  const { width, height } = useWindowSize()

  return <div>Window size: {width} x {height}</div>
}
```

**Giải thích:**
- Window resize fires many events during resize
- Debounced size only updates 200ms after resize stops
- Prevents expensive re-renders during resize

---

### 💡 TIPS & BEST PRACTICES:

#### **1. Choosing Delay Duration**

```tsx
// Search input
useDebounce(searchTerm, 300)  // 300ms - Quick response

// Auto-save
useDebounce(formData, 1000)   // 1000ms - Save less frequently

// Window resize
useDebounce(windowSize, 200)  // 200ms - Balance between responsive & performance

// Expensive operations
useDebounce(data, 500)        // 500ms - Common default
```

#### **2. Combining với API Calls**

```tsx
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setResults([])
      return
    }

    const searchAPI = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${debouncedSearchTerm}`)
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Search failed:', error)
      } finally {
        setLoading(false)
      }
    }

    searchAPI()
  }, [debouncedSearchTerm])

  // ...
}
```

#### **3. useDebounce vs useDebouncedCallback**

```tsx
// useDebounce - Debounce a VALUE
const debouncedValue = useDebounce(value, 500)

// useDebouncedCallback - Debounce a FUNCTION (different pattern)
const debouncedFunction = useDebouncedCallback(
  (value) => performSearch(value),
  500
)
```

**Note:** Exercise 2 focuses on `useDebounce` (value debouncing)

#### **4. Testing Debounce**

```tsx
// In browser console:
// 1. Type quickly: "hello"
// 2. Watch console.log
// 3. Should only see 1 log ~500ms after you stop typing
```

---

### 🎯 EXERCISE 2 REQUIREMENTS RECAP:

**Bạn cần implement:**

1. **Generic Hook:**
   ```tsx
   function useDebounce<T>(value: T, delay: number): T
   ```

2. **State:**
   - `debouncedValue` initialized với `value`

3. **useEffect:**
   - `setTimeout` để update debouncedValue
   - Cleanup với `clearTimeout`
   - Dependencies: `[value, delay]`

4. **Demo Component:**
   - Input cho search term
   - Display both immediate value và debounced value
   - Show difference visually

5. **Type Safety:**
   - Works với different types (string, number, object)
   - TypeScript inference works

**Success Criteria:**
- Type quickly → debounced value updates only after delay
- Cleanup works (no memory leaks)
- Generic type works correctly

---

# 📚 PART 3: Custom useFetch Hook

> Đọc PART này trước khi làm Exercise 3

## 3️⃣ useFetch - Data Fetching Hook

### 🤔 VẤN ĐỀ THỰC TẾ

Khi fetch data, bạn phải handle nhiều states:

```tsx
// ❌ Code lặp lại trong mỗi component
function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return <div>{users.map(...)}</div>
}

// Same pattern repeated in ProductList, PostList, etc.
```

**Problems:**
1. Code lặp lại: loading, error, data states
2. Không cancel request khi unmount → memory leak warning
3. Không type-safe response data
4. Phải remember try/catch/finally pattern

---

### 📚 GIẢI PHÁP: useFetch Hook

**Generic Fetch Hook:**
- Abstract data fetching logic
- Handle loading, error, data states
- Type-safe response data với generics
- Auto cleanup với AbortController
- Reusable cho mọi API endpoint

**Hook signature:**

```tsx
function useFetch<T>(url: string): {
  data: T | null
  loading: boolean
  error: string
}
```

**Giải thích:**
- Generic `<T>` - Type of response data
- `url: string` - API endpoint
- Returns object với 3 properties: data, loading, error

---

### 💻 VÍ DỤ CODE CHI TIẾT:

#### **Bước 1: States cho data, loading, error**

```tsx
import { useEffect, useState } from 'react'

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  // ...

  return { data, loading, error }
}
```

**Giải thích:**
- `data: T | null` - Response data (null initially)
- `loading: boolean` - True while fetching
- `error: string` - Error message (empty string = no error)

#### **Bước 2: useEffect với fetch**

```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reset states
        setLoading(true)
        setError('')

        // Fetch data
        const response = await fetch(url)

        // Check response ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Parse JSON
        const json = await response.json()

        // Update data
        setData(json)
      } catch (err) {
        // Handle error
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        // Always set loading to false
        setLoading(false)
      }
    }

    fetchData()
  }, [url])  // Re-fetch khi url thay đổi

  return { data, loading, error }
}
```

**Giải thích từng phần:**

1. **Reset states:**
   ```tsx
   setLoading(true)
   setError('')
   ```
   - Start loading
   - Clear previous errors

2. **Fetch:**
   ```tsx
   const response = await fetch(url)
   ```
   - Make HTTP request
   - Returns Response object

3. **Check response:**
   ```tsx
   if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`)
   }
   ```
   - `response.ok` = status 200-299
   - Throw error for 404, 500, etc.

4. **Parse JSON:**
   ```tsx
   const json = await response.json()
   setData(json)
   ```
   - Convert response body to JSON
   - TypeScript knows `json` type is `T`

5. **Error handling:**
   ```tsx
   catch (err) {
     setError(err instanceof Error ? err.message : 'An error occurred')
   }
   ```
   - Type guard: check if `err` is Error object
   - Extract message or use default

6. **Finally:**
   ```tsx
   finally {
     setLoading(false)
   }
   ```
   - Always runs (success or error)
   - Stop loading spinner

#### **Bước 3: AbortController - Cancel Request on Unmount**

```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Create AbortController
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        // Pass signal to fetch
        const response = await fetch(url, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const json = await response.json()
        setData(json)
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Cleanup: Abort request khi unmount
    return () => {
      controller.abort()
    }
  }, [url])

  return { data, loading, error }
}
```

**Giải thích AbortController:**

1. **Create controller:**
   ```tsx
   const controller = new AbortController()
   ```
   - Native browser API
   - Allows canceling fetch requests

2. **Pass signal:**
   ```tsx
   fetch(url, { signal: controller.signal })
   ```
   - Links fetch to controller
   - Can be aborted via controller

3. **Cleanup:**
   ```tsx
   return () => controller.abort()
   ```
   - Runs when component unmounts hoặc url thay đổi
   - Cancels pending request
   - Prevents "Can't update unmounted component" warning

4. **Ignore abort errors:**
   ```tsx
   if (err.name === 'AbortError') return
   ```
   - Abort throws error
   - We don't want to show error for intentional abort

---

### 🎯 CÁCH DÙNG HOOK:

#### **Example 1: Fetch User List**

```tsx
interface User {
  id: number
  name: string
  email: string
}

function UserList() {
  const { data, loading, error } = useFetch<User[]>('/api/users')

  if (loading) return <div>Loading users...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data</div>

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  )
}
```

**Giải thích:**
- `useFetch<User[]>` - Generic type = array of Users
- TypeScript knows `data` is `User[] | null`
- Auto-complete works: `user.name`, `user.email`

#### **Example 2: Fetch Single Post**

```tsx
interface Post {
  id: number
  title: string
  body: string
}

function PostDetail({ postId }: { postId: number }) {
  const { data, loading, error } = useFetch<Post>(`/api/posts/${postId}`)

  if (loading) return <div>Loading post...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>Post not found</div>

  return (
    <article>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </article>
  )
}
```

**Giải thích:**
- URL includes `postId` - dynamic URL
- useFetch re-runs when `postId` changes (url dependency)
- Type-safe: `data.title`, `data.body`

#### **Example 3: Public API - JSONPlaceholder**

```tsx
interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

function TodoList() {
  const { data, loading, error } = useFetch<Todo[]>(
    'https://jsonplaceholder.typicode.com/todos'
  )

  if (loading) return <div>Loading todos...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ul>
      {data?.slice(0, 10).map(todo => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} readOnly />
          {todo.title}
        </li>
      ))}
    </ul>
  )
}
```

**Giải thích:**
- Real public API (no mock)
- `data?.slice(0, 10)` - Optional chaining, take first 10
- Works with external APIs

---

### 💡 TIPS & BEST PRACTICES:

#### **1. Type Safety với Generic**

```tsx
// ✅ GOOD - Explicit type
const { data } = useFetch<User[]>('/api/users')
// data type: User[] | null

// ❌ BAD - No type
const { data } = useFetch('/api/users')
// data type: unknown | null (no auto-complete)
```

#### **2. Error Response Handling**

```tsx
// Check response.ok before parsing
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`)
}
```

**Why:**
- `fetch` doesn't throw on 404, 500, etc.
- Only throws on network errors
- Must manually check `response.ok`

#### **3. AbortController Benefits**

```tsx
// Without AbortController:
// - Request continues even after unmount
// - setState on unmounted component → warning
// - Memory leak

// With AbortController:
// - Request canceled on unmount
// - No warnings
// - Clean code
```

#### **4. Loading States**

```tsx
// Always check loading first
if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />
if (!data) return <NoData />

// Then render data
return <DataDisplay data={data} />
```

#### **5. Dependencies**

```tsx
useEffect(() => {
  // ...
}, [url])  // Re-fetch when URL changes
```

**Common scenarios:**
```tsx
// Static URL - fetch once
useFetch<User[]>('/api/users')

// Dynamic URL - re-fetch on param change
useFetch<Post>(`/api/posts/${postId}`)
```

---

### 🎯 EXERCISE 3 REQUIREMENTS RECAP:

**Bạn cần implement:**

1. **Generic Hook:**
   ```tsx
   function useFetch<T>(url: string): {
     data: T | null
     loading: boolean
     error: string
   }
   ```

2. **States:**
   - `data: T | null` - Response data
   - `loading: boolean` - Loading state
   - `error: string` - Error message

3. **useEffect:**
   - Async fetch function
   - Try/catch/finally
   - Parse JSON
   - Check response.ok
   - Handle errors

4. **AbortController:**
   - Create controller
   - Pass signal to fetch
   - Cleanup: abort on unmount
   - Ignore AbortError

5. **Demo Component:**
   - Fetch from public API (JSONPlaceholder)
   - Show loading state
   - Show error state
   - Display data

6. **Type Safety:**
   - Generic `<T>` works
   - Return type correct
   - TypeScript auto-complete

**Success Criteria:**
- Fetches data successfully
- Shows loading while fetching
- Shows error on failure
- No warnings on unmount
- Type-safe data

**Suggested API for testing:**
```tsx
// JSONPlaceholder - Free fake API
'https://jsonplaceholder.typicode.com/users'
'https://jsonplaceholder.typicode.com/posts'
'https://jsonplaceholder.typicode.com/todos'
```

---

# 🎯 OVERALL SESSION SUMMARY

## Session 1.1.3 Concepts:

1. **Generic Custom Hooks:**
   - Hook with `<T>` type parameter
   - Reusable với different data types
   - Type-safe returns

2. **useLocalStorage:**
   - Sync state với localStorage
   - JSON parse/stringify
   - Error handling
   - Generic type `<T>`

3. **useDebounce:**
   - Delay value updates
   - setTimeout + cleanup
   - Prevent excessive operations
   - Generic value debouncing

4. **useFetch:**
   - Data fetching abstraction
   - Loading/error/data states
   - AbortController cleanup
   - Generic response type `<T>`

5. **Hook Patterns:**
   - Custom hook naming: `use*`
   - useEffect cleanup
   - Generic types for flexibility
   - Error handling
   - Type inference

---

## 🔗 Liên kết với sessions trước:

**From Session 1.1.1 (Props):**
- Generic types `<T>` - same concept!
- Interface definitions
- Type inference

**From Session 1.1.2 (Events):**
- useEffect cleanup pattern
- ChangeEvent for inputs
- setState callback form

**New in 1.1.3:**
- Custom hooks
- Generic hooks
- localStorage
- Debouncing
- Data fetching
- AbortController

---

## 💪 Ready to Code!

Bây giờ bạn đã có đầy đủ lý thuyết để làm 3 exercises:

1. **Exercise 1:** useLocalStorage - Generic localStorage sync
2. **Exercise 2:** useDebounce - Value debouncing với timeout
3. **Exercise 3:** useFetch - Data fetching với loading/error states

**Workflow:**
1. Đọc xong PART 1 → Code Exercise 1 → Send code
2. Trong lúc chờ review → Đọc PART 2
3. Fix Exercise 1 → Code Exercise 2 → Send code
4. Trong lúc chờ review → Đọc PART 3
5. Fix Exercise 2 → Code Exercise 3 → Send code
6. Fix Exercise 3 → Quiz → Summary

Good luck! 🚀
