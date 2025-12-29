# Session 1.1.3 Quiz - Hooks với TypeScript

**Time:** 15 phút
**Total Questions:** 12
**Passing Score:** 9/12 (75%)

---

## PART 1: GENERIC CUSTOM HOOKS (4 questions)

### Q1. Generic Hook Signature

Điều gì SAI về generic hook signature này?

```tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // ...
}
```

**A)** Generic type `<T>` should be after function name
**B)** Return type should be `Array<T>` instead of tuple
**C)** initialValue should be `T | undefined`
**D)** Không có gì sai - signature này correct

<details>
<summary>✅ Answer</summary>

**D) Không có gì sai - signature này correct**

**Giải thích:**
- Generic `<T>` đúng vị trí (after function name)
- Tuple return type `[T, (value: T) => void]` giống useState - correct
- initialValue type `T` correct (không cần undefined vì là required param)
</details>

---

### Q2. Type Inference

Code nào dưới đây có **type inference** tốt nhất?

```tsx
// Option A
const [count, setCount] = useLocalStorage<number>('count', 0)

// Option B
const [count, setCount] = useLocalStorage('count', 0)

// Option C
const [count, setCount] = useLocalStorage<number | string>('count', 0)

// Option D
const [count, setCount] = useLocalStorage<any>('count', 0)
```

**A)** Option A - Explicit type safest
**B)** Option B - Type inferred from initialValue
**C)** Option C - Most flexible
**D)** Option D - Most permissive

<details>
<summary>✅ Answer</summary>

**A hoặc B đều tốt, nhưng A is safer in complex cases**

**Giải thích:**
- **Option A**: Explicit type - clear intent, no ambiguity ✅
- **Option B**: Type inference works - `T = number` từ `0` ✅
- **Option C**: Union type unnecessary - over-engineering ❌
- **Option D**: `any` defeats TypeScript - never use ❌

**Best practice:** Explicit type nếu complex, inference OK nếu simple
</details>

---

### Q3. Custom Hook Naming

Điều gì là **REQUIRED** cho custom hook naming?

**A)** Hook name phải start với `use`
**B)** Hook name phải be camelCase
**C)** Hook name phải describe functionality
**D)** Tất cả các điều trên

<details>
<summary>✅ Answer</summary>

**D) Tất cả các điều trên**

**Giải thích:**
- **Start với `use`**: MANDATORY - React enforces Rules of Hooks based on naming
- **camelCase**: Convention - `useLocalStorage`, not `use_local_storage`
- **Describe functionality**: Best practice - `useDebounce`, not `useHook1`

**Examples:**
- ✅ `useLocalStorage`, `useDebounce`, `useFetch`
- ❌ `localStorage`, `debounce`, `fetchData` (không start với `use`)
</details>

---

### Q4. Generic Hook Usage

Code nào dưới đây sẽ TypeScript ERROR?

```tsx
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // ... implementation
}

// Option A
const [user, setUser] = useLocalStorage<User>('user', { name: 'John', age: 30 })
setUser({ name: 'Jane', age: 25 })

// Option B
const [theme, setTheme] = useLocalStorage<string>('theme', 'light')
setTheme('dark')

// Option C
const [count, setCount] = useLocalStorage<number>('count', 0)
setCount('10')  // ⚠️

// Option D
const [items, setItems] = useLocalStorage<string[]>('items', [])
setItems(['a', 'b', 'c'])
```

**A)** Option A
**B)** Option B
**C)** Option C
**D)** Option D

<details>
<summary>✅ Answer</summary>

**C) Option C - Type error**

**Giải thích:**
- **Option C**: `setCount('10')` - Argument type `string` không assign được to `number` ❌
  - Hook generic type: `<number>`
  - setValue expects: `(value: number) => void`
  - Passing: `string`
  - TypeScript error: ❌

**Others:**
- Option A: ✅ Object matches User type
- Option B: ✅ 'dark' is string
- Option D: ✅ Array of strings

**Fix Option C:**
```tsx
setCount(10)  // ✅ Number
// or
setCount(parseInt('10'))  // ✅ Parse first
```
</details>

---

## PART 2: USELOCALSTORAGE HOOK (3 questions)

### Q5. Lazy Initialization

Tại sao phải dùng lazy initialization trong useLocalStorage?

```tsx
// ❌ BAD
const [storedValue, setStoredValue] = useState<T>(
  localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : initialValue
)

// ✅ GOOD
const [storedValue, setStoredValue] = useState<T>(() => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : initialValue
})
```

**A)** Để avoid reading localStorage on every re-render
**B)** Để handle errors better với try/catch
**C)** Để TypeScript type inference works
**D)** Cả A và B

<details>
<summary>✅ Answer</summary>

**D) Cả A và B**

**Giải thích:**

**Reason A - Performance:**
- WITHOUT lazy init: `localStorage.getItem()` runs on EVERY re-render
- WITH lazy init: Chỉ runs 1 lần when component mounts
- localStorage access is synchronous và slow - avoid unnecessary calls

**Reason B - Error Handling:**
```tsx
const [value, setValue] = useState<T>(() => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.error(error)
    return initialValue  // Fallback gracefully
  }
})
```
- Can wrap trong try/catch
- Handle parse errors, localStorage disabled, etc.

**Key:** Lazy init function `() => {...}` chỉ runs ONCE on mount!
</details>

---

### Q6. JSON.stringify/parse

Code nào dưới đây sẽ FAIL?

```tsx
// Option A
const user = { name: 'John', age: 30 }
localStorage.setItem('user', JSON.stringify(user))
const retrieved = JSON.parse(localStorage.getItem('user')!)

// Option B
const theme = 'light'
localStorage.setItem('theme', JSON.stringify(theme))
const retrieved = JSON.parse(localStorage.getItem('theme')!)

// Option C
const count = 42
localStorage.setItem('count', count.toString())  // ⚠️
const retrieved = parseInt(localStorage.getItem('count')!)

// Option D
const items = ['a', 'b', 'c']
localStorage.setItem('items', JSON.stringify(items))
const retrieved = JSON.parse(localStorage.getItem('items')!)
```

**A)** Option A - Object stringify fails
**B)** Option B - String doesn't need stringify
**C)** Option C - Inconsistent với pattern
**D)** Option D - Array stringify fails

<details>
<summary>✅ Answer</summary>

**C) Option C - Inconsistent pattern**

**Giải thích:**

**Why Option C is problematic:**
- Uses `toString()` instead of `JSON.stringify()`
- Uses `parseInt()` instead of `JSON.parse()`
- Inconsistent với generic hook pattern
- Won't work cho complex types

**Generic hook cần consistent approach:**
```tsx
// ✅ ALWAYS use JSON
localStorage.setItem(key, JSON.stringify(value))
const retrieved = JSON.parse(localStorage.getItem(key)!)
```

**Why JSON for everything:**
- Works với objects, arrays, strings, numbers, booleans
- Consistent API
- Type-safe với TypeScript generics

**Others work fine:**
- Option A: ✅ Object stringifies correctly
- Option B: ✅ String stringifies to `"light"` (valid JSON)
- Option D: ✅ Array stringifies to `["a","b","c"]`
</details>

---

### Q7. Error Handling

localStorage có thể fail khi nào?

**A)** When localStorage disabled (private browsing)
**B)** When storage quota exceeded
**C)** When JSON.parse fails (invalid JSON)
**D)** Tất cả các trường hợp trên

<details>
<summary>✅ Answer</summary>

**D) Tất cả các trường hợp trên**

**Giải thích:**

**Case 1: localStorage Disabled**
- Private browsing mode
- Browser settings
- Security policies
- `localStorage.setItem()` throws error

**Case 2: Quota Exceeded**
- localStorage limit: ~5-10MB per domain
- Try to store too much data
- `QuotaExceededError` thrown

**Case 3: Parse Fails**
- Corrupted data in localStorage
- Manually edited localStorage
- `JSON.parse()` throws error

**Best Practice - Handle all errors:**
```tsx
const [value, setValue] = useState<T>(() => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return initialValue  // Always fallback
  }
})

const setValue = (value: T) => {
  try {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
    // State updated but localStorage failed - acceptable degradation
  }
}
```
</details>

---

## PART 3: USEDEBOUNCE HOOK (2 questions)

### Q8. setTimeout Cleanup

Tại sao cleanup function quan trọng trong useDebounce?

```tsx
useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedValue(value)
  }, delay)

  return () => {
    clearTimeout(handler)  // ⚠️ Why?
  }
}, [value, delay])
```

**A)** Để cancel previous timeout khi value thay đổi
**B)** Để prevent memory leaks
**C)** Để ensure only last value is used
**D)** Tất cả các lý do trên

<details>
<summary>✅ Answer</summary>

**D) Tất cả các lý do trên**

**Giải thích:**

**WITHOUT Cleanup:**
```
User types "react":
t=0ms:   Type "r" → setTimeout #1 (will run at t=500ms)
t=100ms: Type "e" → setTimeout #2 (will run at t=600ms)
t=200ms: Type "a" → setTimeout #3 (will run at t=700ms)
t=300ms: Type "c" → setTimeout #4 (will run at t=800ms)
t=400ms: Type "t" → setTimeout #5 (will run at t=900ms)

Result: 5 updates! (defeats purpose of debouncing) ❌
```

**WITH Cleanup:**
```
User types "react":
t=0ms:   Type "r" → setTimeout #1
t=100ms: Type "e" → clearTimeout #1 → setTimeout #2
t=200ms: Type "a" → clearTimeout #2 → setTimeout #3
t=300ms: Type "c" → clearTimeout #3 → setTimeout #4
t=400ms: Type "t" → clearTimeout #4 → setTimeout #5
t=900ms: setTimeout #5 runs → setDebouncedValue("react")

Result: 1 update! ✅
```

**Key Points:**
- **Cancel previous**: Cleanup runs BEFORE next effect
- **Memory leak prevention**: Pending timeouts cleared
- **Only last value**: Previous timeouts canceled
</details>

---

### Q9. Debouncing Use Cases

Khi nào KHÔNG nên dùng debouncing?

**A)** Search input onChange
**B)** Window resize event
**C)** Button click handler
**D)** Auto-save editor content

<details>
<summary>✅ Answer</summary>

**C) Button click handler**

**Giải thích:**

**Button clicks KHÔNG cần debounce:**
- User expects immediate feedback
- Clicks are discrete actions (not rapid like typing)
- Better to disable button or show loading state

**GOOD use cases:**

**Search input (A):**
```tsx
const debouncedQuery = useDebounce(searchTerm, 300)
// Wait for user to finish typing before API call
```

**Window resize (B):**
```tsx
const debouncedSize = useDebounce(windowSize, 200)
// Wait for resize to finish before recalculating layout
```

**Auto-save (D):**
```tsx
const debouncedContent = useDebounce(content, 1000)
// Save after 1s of no changes
```

**For button clicks, use different pattern:**
```tsx
// ❌ DON'T debounce button click
const debouncedHandleClick = useDebounce(handleClick, 500)

// ✅ DO disable button or show loading
const [loading, setLoading] = useState(false)
const handleClick = async () => {
  setLoading(true)
  await saveData()
  setLoading(false)
}
<button disabled={loading}>Save</button>
```
</details>

---

## PART 4: USEFETCH HOOK (3 questions)

### Q10. AbortController

Code nào dưới đây sẽ có memory leak warning?

```tsx
// Option A
useEffect(() => {
  const controller = new AbortController()

  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))

  return () => controller.abort()
}, [url])

// Option B
useEffect(() => {
  fetch(url)
    .then(res => res.json())
    .then(data => setData(data))
}, [url])

// Option C
useEffect(() => {
  const controller = new AbortController()

  const fetchData = async () => {
    const res = await fetch(url, { signal: controller.signal })
    const data = await res.json()
    setData(data)
  }

  fetchData()
  return () => controller.abort()
}, [url])
```

**A)** Option A
**B)** Option B
**C)** Option C
**D)** All options

<details>
<summary>✅ Answer</summary>

**B) Option B - No abort controller**

**Giải thích:**

**Option B Problem:**
```tsx
useEffect(() => {
  fetch(url)
    .then(res => res.json())
    .then(data => setData(data))  // ⚠️
}, [url])

// Scenario:
// 1. Component mounts → fetch starts
// 2. Component unmounts BEFORE fetch completes
// 3. Fetch completes → tries to setData()
// 4. ❌ Warning: "Can't perform state update on unmounted component"
```

**Option A & C: Correct với AbortController:**
```tsx
return () => controller.abort()  // ✅ Cancels pending request
```

**Why AbortController critical:**
- Cancels in-flight requests on unmount
- Prevents setState on unmounted components
- No memory leaks
- Clean code

**Real-world scenario:**
```tsx
// User navigates quickly between pages
Page1 mounts → fetch /api/page1 starts
User clicks link → Page1 unmounts
WITHOUT abort: fetch continues → setState on unmounted component ❌
WITH abort: fetch canceled → no setState → clean ✅
```
</details>

---

### Q11. response.ok Check

Tại sao phải check `response.ok`?

```tsx
const response = await fetch(url)

// ❌ WITHOUT check
const data = await response.json()  // Could be error HTML!

// ✅ WITH check
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`)
}
const data = await response.json()
```

**A)** fetch() doesn't throw on 404/500 errors
**B)** response.json() might fail on error responses
**C)** Better error messages for users
**D)** Tất cả các lý do trên

<details>
<summary>✅ Answer</summary>

**D) Tất cả các lý do trên**

**Giải thích:**

**fetch() behavior:**
```tsx
// ✅ fetch() ONLY throws on network errors:
// - No internet connection
// - DNS lookup failed
// - Request timeout

// ❌ fetch() DOES NOT throw on HTTP errors:
// - 404 Not Found
// - 500 Internal Server Error
// - 401 Unauthorized
// → Response returned normally!
```

**WITHOUT response.ok check:**
```tsx
const response = await fetch('/api/users/999')  // 404 Not Found
const data = await response.json()
// response.json() might be:
// { "error": "User not found" }
// or error HTML page → JSON.parse fails
```

**WITH response.ok check:**
```tsx
const response = await fetch('/api/users/999')
if (!response.ok) {  // response.ok = false for status 404
  throw new Error(`HTTP error! status: ${response.status}`)
}
// Now we know response is 200-299
const data = await response.json()
```

**response.ok definition:**
- `true`: status 200-299
- `false`: status 300+

**Best practice:**
```tsx
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`)
}
```
</details>

---

### Q12. Async useEffect Pattern

Pattern nào ĐÚNG cho async function trong useEffect?

```tsx
// Option A
useEffect(async () => {
  const data = await fetch(url)
  setData(data)
}, [url])

// Option B
useEffect(() => {
  async function fetchData() {
    const data = await fetch(url)
    setData(data)
  }
  fetchData()
}, [url])

// Option C
useEffect(() => {
  (async () => {
    const data = await fetch(url)
    setData(data)
  })()
}, [url])

// Option D
useEffect(() => {
  fetch(url).then(data => setData(data))
}, [url])
```

**A)** Option A
**B)** Option B
**C)** Option C
**D)** B and C đều đúng

<details>
<summary>✅ Answer</summary>

**D) B and C đều đúng (B preferred)**

**Giải thích:**

**Option A - WRONG:**
```tsx
useEffect(async () => {  // ❌ async callback
  // ...
}, [url])

// Error: useEffect callback must return:
// - undefined (no cleanup)
// - cleanup function
// Async function returns Promise → NOT allowed!
```

**Option B - CORRECT (Preferred):**
```tsx
useEffect(() => {
  async function fetchData() {  // ✅ Async function inside
    const data = await fetch(url)
    setData(data)
  }
  fetchData()

  // Can add cleanup:
  return () => { /* cleanup */ }
}, [url])
```
- Named function - clear intent
- Easy to add cleanup
- Easy to read

**Option C - CORRECT (IIFE):**
```tsx
useEffect(() => {
  (async () => {  // ✅ IIFE (Immediately Invoked Function Expression)
    const data = await fetch(url)
    setData(data)
  })()
}, [url])
```
- Works correctly
- More concise
- Harder to add cleanup

**Option D - CORRECT (Promise chain):**
```tsx
useEffect(() => {
  fetch(url).then(data => setData(data))
}, [url])
```
- No async/await
- Works but harder to read
- Error handling harder

**Best Practice: Option B**
```tsx
useEffect(() => {
  const controller = new AbortController()

  const fetchData = async () => {
    try {
      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok) throw new Error(`HTTP error! ${response.status}`)
      const data = await response.json()
      setData(data)
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message)
    }
  }

  fetchData()
  return () => controller.abort()
}, [url])
```
</details>

---

## 🎯 ANSWER KEY

| Question | Answer | Topic |
|----------|--------|-------|
| Q1 | D | Generic hook signature |
| Q2 | A hoặc B | Type inference |
| Q3 | D | Hook naming |
| Q4 | C | Generic type safety |
| Q5 | D | Lazy initialization |
| Q6 | C | JSON.stringify/parse |
| Q7 | D | localStorage errors |
| Q8 | D | setTimeout cleanup |
| Q9 | C | Debouncing use cases |
| Q10 | B | AbortController |
| Q11 | D | response.ok check |
| Q12 | D | Async useEffect |

---

## 📊 SCORING

**Your Score: _____ / 12**

- **12/12 (100%)**: 🌟 PERFECT! Master level!
- **10-11 (83-92%)**: 🎉 Excellent! Very strong understanding
- **9 (75%)**: ✅ Good! Passed, review missed questions
- **7-8 (58-67%)**: 📚 Review concepts, retake quiz
- **< 7 (< 58%)**: 📖 Re-read theory, practice more

---

## 💡 KEY TAKEAWAYS

### **Generic Hooks:**
- Must start with `use` prefix
- Generic type `<T>` for flexibility
- Type inference works but explicit safer

### **useLocalStorage:**
- Lazy initialization for performance
- Always JSON.stringify/parse
- Handle all errors gracefully

### **useDebounce:**
- setTimeout + cleanup pattern
- Cleanup prevents multiple updates
- Use for rapid value changes (typing, resize)
- DON'T use for discrete actions (clicks)

### **useFetch:**
- AbortController prevents memory leaks
- Must check response.ok (fetch doesn't throw on HTTP errors)
- Async function INSIDE useEffect, not AS callback
- Three states: loading, error, data

---

**Date Completed:** ___________
**Time Taken:** ___________ minutes
**Notes:** ___________
