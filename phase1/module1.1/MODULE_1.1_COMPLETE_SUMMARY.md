# MODULE 1.1 - TypeScript cho React: TỔNG HỢP KIẾN THỨC

> **Module:** 1.1 - TypeScript Fundamentals for React
> **Sessions:** 4 sessions (1.1.1 → 1.1.4)
> **Mức độ:** Fresher/Junior React Developer

---

## OVERVIEW

| Session | Chủ đề | Kiến thức chính |
|---------|--------|-----------------|
| 1.1.1 | Props & State Typing | Interface, Union Types, ReactNode, Generic Components |
| 1.1.2 | Event Handlers Typing | ChangeEvent, FormEvent, KeyboardEvent, MouseEvent |
| 1.1.3 | Hooks với TypeScript | Custom Hooks, Generic Hooks, useLocalStorage, useDebounce, useFetch |
| 1.1.4 | Utility Types | Partial, Pick, Omit, Record, ComponentProps, Type Guards |

---

# SESSION 1.1.1: Props & State Typing

## 1. Interface cho Props

```tsx
interface ButtonProps {
  label: string                              // Required
  variant: 'primary' | 'secondary' | 'danger' // Union type
  size?: 'sm' | 'md' | 'lg'                  // Optional với ?
  disabled?: boolean
  onClick: () => void
}
```

**Key Points:**
- `interface` cho object shapes (Props)
- Union types cho restricted values: `'a' | 'b' | 'c'`
- Optional props dùng `?`
- Không có `?` = required

---

## 2. Default Values trong Destructuring

```tsx
function Button({
  label,
  variant,
  size = 'md',        // Default value
  disabled = false
}: ButtonProps) {
  // size luôn có giá trị, không bao giờ undefined
}
```

---

## 3. ReactNode Type cho Children

```tsx
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode    // string, JSX, array, null, undefined
  footer?: ReactNode
}
```

**ReactNode chấp nhận:**
- String, number
- JSX elements
- Arrays
- null, undefined
- Boolean (không render)

---

## 4. Conditional Rendering

```tsx
// Pattern 1: && operator
{footer && <div className="footer">{footer}</div>}

// Pattern 2: Ternary
{isLoggedIn ? <Dashboard /> : <Login />}

// Pattern 3: Early return
if (!data) return <Loading />
return <Content data={data} />
```

---

## 5. Generic Types `<T>`

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

// Usage với type inference
<List<User>
  items={users}
  renderItem={(user) => <div>{user.name}</div>}  // user có autocomplete
  keyExtractor={(user) => user.id}
/>
```

---

# SESSION 1.1.2: Event Handlers Typing

## 1. Event Types Reference

| Event Type | Element Type | Use Case |
|------------|--------------|----------|
| `ChangeEvent<HTMLInputElement>` | input | onChange |
| `ChangeEvent<HTMLSelectElement>` | select | onChange |
| `ChangeEvent<HTMLTextAreaElement>` | textarea | onChange |
| `FormEvent<HTMLFormElement>` | form | onSubmit |
| `MouseEvent<HTMLButtonElement>` | button | onClick |
| `KeyboardEvent<HTMLInputElement>` | input | onKeyDown, onKeyUp |
| `KeyboardEvent` (native) | window | Global keyboard |

---

## 2. ChangeEvent

```tsx
import { ChangeEvent } from 'react'

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value  // string
  setValue(value)
}

<input onChange={handleChange} />
```

---

## 3. FormEvent

```tsx
import { FormEvent } from 'react'

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()  // CRITICAL: Prevent page reload
  // Submit logic
}

<form onSubmit={handleSubmit}>...</form>
```

---

## 4. KeyboardEvent

```tsx
import { KeyboardEvent } from 'react'

// React KeyboardEvent (cho JSX elements)
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') performSearch()
  if (e.key === 'Escape') clearInput()
}

<input onKeyDown={handleKeyDown} />
```

---

## 5. Global Keyboard Events (useEffect)

```tsx
useEffect(() => {
  // NATIVE KeyboardEvent (không import từ React)
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === '+') setCount(prev => prev + 1)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()
      save()
    }
  }

  window.addEventListener('keydown', handleKeyDown)

  // CLEANUP - CRITICAL!
  return () => {
    window.removeEventListener('keydown', handleKeyDown)
  }
}, [])
```

---

## 6. Modifier Keys

```tsx
e.ctrlKey   // Ctrl
e.shiftKey  // Shift
e.altKey    // Alt
e.metaKey   // Cmd (Mac) / Win key

// Combination
if (e.ctrlKey && e.key === 's') {
  e.preventDefault()
  save()
}
```

---

## 7. setState Callback Form (Avoid Stale Closure)

```tsx
// ❌ BAD - Stale closure
useEffect(() => {
  const handler = () => setCount(count + 1)  // count is stale
  window.addEventListener('keydown', handler)
}, [])

// ✅ GOOD - Callback form
useEffect(() => {
  const handler = () => setCount(prev => prev + 1)  // Always latest
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])
```

---

# SESSION 1.1.3: Hooks với TypeScript

## 1. useLocalStorage Hook

```tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Lazy initialization - chỉ run 1 lần
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

// Usage
const [theme, setTheme] = useLocalStorage<string>('theme', 'light')
const [user, setUser] = useLocalStorage<User>('user', { name: '', email: '' })
```

---

## 2. useDebounce Hook

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // CRITICAL: Cleanup previous timeout
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// Usage - Search input
const [searchTerm, setSearchTerm] = useState('')
const debouncedSearch = useDebounce(searchTerm, 500)

useEffect(() => {
  if (debouncedSearch) {
    fetchResults(debouncedSearch)
  }
}, [debouncedSearch])
```

---

## 3. useFetch Hook

```tsx
function useFetch<T>(url: string): {
  data: T | null
  loading: boolean
  error: string
} {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(url, {
          signal: controller.signal
        })

        // IMPORTANT: fetch KHÔNG throw cho 404/500
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const json = await response.json()
        setData(json)
      } catch (err) {
        // Ignore AbortError
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // CLEANUP: Abort on unmount
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

// Usage
const { data, loading, error } = useFetch<User[]>('/api/users')

if (loading) return <Loading />
if (error) return <Error message={error} />
return <UserList users={data!} />
```

---

# SESSION 1.1.4: Utility Types

## 1. Partial<T> - Làm tất cả props optional

```tsx
interface User {
  id: number
  name: string
  email: string
}

type UserUpdate = Partial<User>
// = { id?: number; name?: string; email?: string }

function updateUser(id: number, updates: Partial<User>) {
  // updates có thể có 0, 1, hoặc nhiều properties
}

updateUser(1, { name: 'New Name' })  // ✅ OK
updateUser(2, {})                     // ✅ OK
```

---

## 2. Pick<T, K> - Chọn specific properties

```tsx
interface User {
  id: number
  name: string
  email: string
  password: string
}

type LoginForm = Pick<User, 'email' | 'password'>
// = { email: string; password: string }

type PublicProfile = Pick<User, 'id' | 'name'>
// = { id: number; name: string }
```

---

## 3. Omit<T, K> - Loại bỏ specific properties

```tsx
type SafeUser = Omit<User, 'password'>
// = { id: number; name: string; email: string }

// Pick vs Omit
// Pick: Khi cần ÍT properties (< 50% fields)
// Omit: Khi cần NHIỀU properties (> 50% fields)
```

---

## 4. Record<K, V> - Dynamic object với typed keys

```tsx
type Status = 'idle' | 'loading' | 'success' | 'error'
type StatusConfig = Record<Status, { color: string; message: string }>

const config: StatusConfig = {
  idle: { color: 'gray', message: 'Ready' },
  loading: { color: 'blue', message: 'Loading...' },
  success: { color: 'green', message: 'Done!' },
  error: { color: 'red', message: 'Error!' }
}

// Form Errors
type FormErrors = Partial<Record<keyof User, string>>
const errors: FormErrors = { name: 'Required' }
```

---

## 5. ComponentProps<typeof Component>

```tsx
import { ComponentProps } from 'react'

// Extract props từ component
interface IconButtonProps extends ComponentProps<typeof Button> {
  icon: ReactNode
}

// Extract native HTML element props
interface CustomButtonProps extends ComponentProps<'button'> {
  variant: 'primary' | 'secondary'
}

// Omit specific props
interface IconOnlyProps extends Omit<ComponentProps<typeof Button>, 'children'> {
  icon: ReactNode
}
```

---

## 6. PropsWithChildren<T>

```tsx
import { PropsWithChildren } from 'react'

interface CardProps {
  title: string
}

function Card({ title, children }: PropsWithChildren<CardProps>) {
  return (
    <div>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

---

## 7. Type Guards

```tsx
// typeof guard
function print(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase())  // value is string
  } else {
    console.log(value.toFixed(2))     // value is number
  }
}

// in guard
function greet(person: User | Admin) {
  if ('email' in person) {
    console.log(person.email)  // person is User
  }
}

// Discriminated Union
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function render(state: FetchState<User>) {
  switch (state.status) {
    case 'loading': return <Loading />
    case 'success': return <div>{state.data.name}</div>
    case 'error': return <div>{state.error}</div>
  }
}
```

---

# COMMON PATTERNS

## Pattern 1: Typed Form với Validation

```tsx
interface FormData {
  username: string
  email: string
  password: string
}

function LoginForm() {
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.username) newErrors.username = 'Required'
    if (!formData.email) newErrors.email = 'Required'
    if (!formData.password) newErrors.password = 'Required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    console.log('Submit:', formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} />
      {errors.username && <span>{errors.username}</span>}
      {/* ... */}
    </form>
  )
}
```

---

## Pattern 2: Generic List Component

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
  emptyMessage?: string
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage }: ListProps<T>) {
  if (items.length === 0) {
    return <div>{emptyMessage || 'No items'}</div>
  }

  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}
```

---

## Pattern 3: Custom Hook với Loading/Error States

```tsx
function useApi<T>(url: string) {
  const [state, setState] = useState<{
    data: T | null
    loading: boolean
    error: string
  }>({
    data: null,
    loading: true,
    error: ''
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => setState({ data, loading: false, error: '' }))
      .catch(err => {
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err.message })
        }
      })

    return () => controller.abort()
  }, [url])

  return state
}
```

---

# COMMON MISTAKES TO AVOID

## 1. Quên Default Values

```tsx
// ❌ BAD
function Button({ size }: Props) {
  return <button className={`btn-${size}`} />  // size có thể undefined
}

// ✅ GOOD
function Button({ size = 'md' }: Props) {
  return <button className={`btn-${size}`} />
}
```

## 2. Function Reference vs Call

```tsx
// ❌ BAD - Checks if function exists (always true)
if (!validate) return

// ✅ GOOD - Calls function
if (!validate()) return
```

## 3. Missing Cleanup

```tsx
// ❌ BAD - Memory leak
useEffect(() => {
  window.addEventListener('keydown', handler)
}, [])

// ✅ GOOD
useEffect(() => {
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])
```

## 4. Stale Closure

```tsx
// ❌ BAD
useEffect(() => {
  const handler = () => setCount(count + 1)  // stale
}, [])

// ✅ GOOD
useEffect(() => {
  const handler = () => setCount(prev => prev + 1)
}, [])
```

## 5. Async useEffect

```tsx
// ❌ BAD
useEffect(async () => {
  const data = await fetch(url)
}, [])

// ✅ GOOD
useEffect(() => {
  const fetchData = async () => {
    const data = await fetch(url)
  }
  fetchData()
}, [])
```

## 6. Not Checking response.ok

```tsx
// ❌ BAD - 404/500 won't throw
const data = await fetch(url).then(r => r.json())

// ✅ GOOD
const res = await fetch(url)
if (!res.ok) throw new Error(`HTTP ${res.status}`)
const data = await res.json()
```

---

# KEY TAKEAWAYS

1. **Interface for Props** - Dùng interface cho component props, type cho unions
2. **Type Safety** - TypeScript bắt lỗi ngay khi code, không phải runtime
3. **Generic Types `<T>`** - Tạo reusable components và hooks
4. **Event Types** - Mỗi event type khác nhau cho mỗi element
5. **Cleanup Side Effects** - Luôn cleanup setTimeout, addEventListener, fetch
6. **Callback Form** - Dùng `setState(prev => ...)` trong event handlers
7. **Utility Types** - Partial, Pick, Omit, Record giúp DRY code
8. **Type Guards** - Discriminated unions cho type-safe state management

---

**Module 1.1 Completed!**
