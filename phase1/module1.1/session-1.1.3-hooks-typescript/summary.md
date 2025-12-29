# Session 1.1.3 Summary - Hooks với TypeScript

**Date:** 2025-12-28
**Status:** ✅ Completed
**Duration:** ~3 hours
**Quiz Score:** 10/12 (83%)

---

## 📚 CONCEPTS LEARNED

### 1️⃣ **Generic Custom Hooks**

**What:** Custom hooks với generic type parameter `<T>` cho flexibility

```tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Implementation
}

// Usage với different types
const [theme, setTheme] = useLocalStorage<string>('theme', 'light')
const [user, setUser] = useLocalStorage<User>('user', { name: '', email: '' })
```

**Key Points:**
- Generic `<T>` allows hook to work với any type
- Type inference works nhưng explicit type safer
- Must start with `use` prefix (React convention)
- Return type can be tuple hoặc object

**Real-world Applications:**
- useLocalStorage - sync state với localStorage
- useDebounce - delay value updates
- useFetch - data fetching abstraction
- useForm - form state management

---

### 2️⃣ **useLocalStorage Hook**

**What:** Sync React state với localStorage automatically

```tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // 1. Lazy initialization từ localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // 2. setValue function sync với localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
```

**Key Concepts:**

**Lazy Initialization:**
- `useState(() => {...})` - Function chỉ runs 1 lần on mount
- Avoid reading localStorage on every re-render
- Performance optimization

**JSON.stringify/parse:**
- localStorage chỉ lưu strings
- Must stringify objects/arrays → strings
- Must parse strings → objects/arrays
- Consistent pattern cho all types

**Error Handling:**
- localStorage có thể disabled (private browsing)
- localStorage có thể full (quota exceeded)
- JSON.parse có thể fail (invalid JSON)
- Always fallback to initialValue gracefully

**Use Cases:**
- Theme persistence (light/dark mode)
- User preferences (language, settings)
- Form auto-save
- Shopping cart
- Recently viewed items

---

### 3️⃣ **useDebounce Hook**

**What:** Delay value updates until user "stops" changing value

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Schedule update after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup: Cancel previous timeout
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

**How It Works:**

```
User types "react":
t=0ms:   Type "r" → setTimeout #1 (500ms)
t=100ms: Type "e" → clearTimeout #1 → setTimeout #2 (500ms)
t=200ms: Type "a" → clearTimeout #2 → setTimeout #3 (500ms)
t=300ms: Type "c" → clearTimeout #3 → setTimeout #4 (500ms)
t=400ms: Type "t" → clearTimeout #4 → setTimeout #5 (500ms)
t=900ms: setTimeout #5 fires → setDebouncedValue("react")

Result: 1 update instead of 5!
```

**Key Concepts:**

**setTimeout + Cleanup Pattern:**
- Each value change schedules new timeout
- Cleanup cancels previous timeout
- Only last timeout runs
- Prevents multiple updates

**Dependencies:**
- `[value, delay]` - Re-run when either changes
- Cleanup runs BEFORE next effect
- Cleanup runs on unmount

**Performance Benefits:**
- Search: 1 API call instead of many
- Window resize: 1 layout recalculation instead of hundreds
- Auto-save: 1 save instead of every keystroke

**Use Cases:**
- ✅ Search input (wait for typing to finish)
- ✅ Window resize (wait for resize to finish)
- ✅ Auto-save editor (save after inactivity)
- ✅ Form validation (validate after typing stops)
- ❌ Button clicks (use loading state instead)

---

### 4️⃣ **useFetch Hook**

**What:** Generic data fetching hook với loading/error/data states

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

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const json = await response.json()
        setData(json)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url])

  return { data, loading, error }
}
```

**Key Concepts:**

**Three-State Pattern:**
```tsx
if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage />
if (!data) return <NoData />
return <SuccessView />
```

**AbortController:**
- Create: `new AbortController()`
- Pass signal: `fetch(url, { signal: controller.signal })`
- Cleanup: `controller.abort()` on unmount
- Prevents "Can't update unmounted component" warning
- Critical for avoiding memory leaks

**response.ok Check:**
- fetch() DOES NOT throw on 404/500 errors
- Only throws on network errors
- Must manually check `response.ok`
- `response.ok` = true for status 200-299

**Async Function in useEffect:**
```tsx
// ❌ WRONG
useEffect(async () => {
  const data = await fetch(url)
}, [url])

// ✅ CORRECT
useEffect(() => {
  const fetchData = async () => {
    const data = await fetch(url)
  }
  fetchData()
}, [url])
```

**Why:** useEffect cleanup must be synchronous

**Use Cases:**
- Fetch user data on component mount
- Load posts/products from API
- Dynamic data based on URL params
- Real-time data updates

---

### 5️⃣ **Hook Best Practices**

**Naming:**
- ✅ Must start with `use` prefix
- ✅ camelCase: `useLocalStorage`, not `use_local_storage`
- ✅ Descriptive: `useDebounce`, not `useHook1`

**Type Safety:**
```tsx
// ✅ Explicit type - safest
const [data, setData] = useLocalStorage<User>('user', initialUser)

// ✅ Type inference - works for simple types
const [count, setCount] = useLocalStorage('count', 0)  // T = number

// ❌ Avoid any
const [data, setData] = useLocalStorage<any>('data', {})
```

**Error Handling:**
- Always use try/catch
- Log errors for debugging
- Fallback gracefully
- Don't crash app

**Cleanup:**
- Always cleanup side effects
- setTimeout → clearTimeout
- addEventListener → removeEventListener
- fetch → AbortController.abort()

**Dependencies:**
- Include all values used in effect
- ESLint exhaustive-deps helps
- Empty `[]` if no dependencies

---

## 💻 CODE PATTERNS TO REMEMBER

### Pattern 1: Lazy State Initialization

```tsx
// ❌ BAD - Runs on every re-render
const [value, setValue] = useState(expensiveComputation())

// ✅ GOOD - Runs only once on mount
const [value, setValue] = useState(() => expensiveComputation())
```

**Use when:**
- Reading from localStorage
- Computing initial value is expensive
- Only need initial value once

---

### Pattern 2: Generic Hook Signature

```tsx
function useCustomHook<T>(
  initialValue: T,
  options?: SomeOptions
): [T, (value: T) => void] {
  // Implementation
  return [value, setValue]
}
```

**Key points:**
- Generic `<T>` for flexibility
- Return tuple `[value, setter]` (like useState)
- Or return object `{ value, setValue }` (more explicit)

---

### Pattern 3: setTimeout Cleanup

```tsx
useEffect(() => {
  const handler = setTimeout(() => {
    // Do something after delay
  }, delay)

  // CRITICAL: Cleanup
  return () => {
    clearTimeout(handler)
  }
}, [dependencies])
```

**Why cleanup critical:**
- Prevents multiple timeouts running
- Avoids memory leaks
- Ensures only latest value used

---

### Pattern 4: Fetch with AbortController

```tsx
useEffect(() => {
  const controller = new AbortController()

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: controller.signal  // Pass signal
      })
      // ... handle response
    } catch (err) {
      // Ignore abort errors
      if (err.name === 'AbortError') return
      // Handle other errors
      setError(err.message)
    }
  }

  fetchData()

  return () => {
    controller.abort()  // Cancel on unmount
  }
}, [url])
```

---

### Pattern 5: Controlled Inputs with Hooks

```tsx
const [user, setUser] = useLocalStorage<User>('user', {
  name: '',
  email: ''
})

// Immutable update with spread
const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setUser({ ...user, name: e.target.value })
}
```

**Key points:**
- Controlled input: `value={user.name}`
- Immutable update: `{...user, name: newValue}`
- TypeScript auto-complete works

---

## ❌ COMMON MISTAKES TO AVOID

### Mistake 1: Forgetting Cleanup

```tsx
// ❌ WRONG - Memory leak
useEffect(() => {
  const handler = setTimeout(() => {
    doSomething()
  }, delay)
  // Missing cleanup!
}, [delay])

// ✅ CORRECT
useEffect(() => {
  const handler = setTimeout(() => {
    doSomething()
  }, delay)
  return () => clearTimeout(handler)
}, [delay])
```

---

### Mistake 2: Async useEffect Callback

```tsx
// ❌ WRONG - Async callback
useEffect(async () => {
  const data = await fetch(url)
  setData(data)
}, [url])

// ✅ CORRECT - Async function inside
useEffect(() => {
  const fetchData = async () => {
    const data = await fetch(url)
    setData(data)
  }
  fetchData()
}, [url])
```

---

### Mistake 3: Not Checking response.ok

```tsx
// ❌ WRONG - Doesn't catch HTTP errors
const response = await fetch(url)
const data = await response.json()

// ✅ CORRECT - Check response.ok
const response = await fetch(url)
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`)
}
const data = await response.json()
```

---

### Mistake 4: Forgetting JSON.stringify/parse

```tsx
// ❌ WRONG - Stores "[object Object]"
localStorage.setItem('user', user)

// ✅ CORRECT - Stringify first
localStorage.setItem('user', JSON.stringify(user))

// ❌ WRONG - Returns string
const user = localStorage.getItem('user')

// ✅ CORRECT - Parse to object
const user = JSON.parse(localStorage.getItem('user') || '{}')
```

---

### Mistake 5: Not Handling AbortError

```tsx
// ❌ WRONG - Shows error when unmounted
catch (err) {
  setError(err.message)
}

// ✅ CORRECT - Ignore AbortError
catch (err) {
  if (err.name === 'AbortError') return
  setError(err.message)
}
```

---

## 🎯 KEY TAKEAWAYS

### **1. Generic Hooks = Reusability + Type Safety**
- Write once, use with any type
- TypeScript ensures correctness
- Auto-complete works perfectly

### **2. Lazy Initialization = Performance**
- Expensive computations run only once
- localStorage reads minimized
- Better UX

### **3. Cleanup = No Memory Leaks**
- Always cleanup side effects
- setTimeout, addEventListener, fetch
- Critical for production apps

### **4. Debouncing = Performance Optimization**
- Reduces API calls
- Improves UX (less flickering)
- Essential for search, resize, auto-save

### **5. AbortController = Clean Fetching**
- Prevents warnings
- Avoids memory leaks
- Production-ready pattern

### **6. Error Handling = Robust Apps**
- localStorage can fail
- Network requests can fail
- Always fallback gracefully

---

## 📊 EXERCISES PERFORMANCE

| Exercise | Score | Highlights |
|----------|-------|------------|
| Ex1: useLocalStorage | 10/10 | Perfect hook implementation, error handling comprehensive, works with string & object types |
| Ex2: useDebounce | 10/10 | setTimeout cleanup perfect, visual difference clear, optimization demonstrated |
| Ex3: useFetch | 10/10 | AbortController perfect, three-state pattern correct, real API integration successful |

**Overall:** 30/30 (100%) 🌟

---

## 📝 QUIZ RESULTS

**Score:** 10/12 (83%)
**Grade:** 🎉 Excellent!

**Strong Areas:**
- ✅ Generic hook patterns
- ✅ Hook implementation details
- ✅ Cleanup patterns
- ✅ Error handling strategies
- ✅ Real-world use cases

**Concepts Mastered:**
- Generic type syntax and usage
- Lazy initialization benefits
- setTimeout cleanup pattern
- AbortController usage
- response.ok importance
- Async useEffect pattern

---

## 🔄 SPACED REPETITION

### Day 1 (Tomorrow - 2025-12-29):
- [ ] Review this summary (10 phút)
- [ ] Re-read quiz questions bạn missed
- [ ] Test hooks in browser DevTools

### Day 3 (2025-12-31):
- [ ] Implement useLocalStorage from scratch (no reference)
- [ ] Implement useDebounce from scratch
- [ ] Test persistence và debouncing

### Day 7 (2026-01-04):
- [ ] Quiz lại concepts (close notes)
- [ ] Build mini project using all 3 hooks
- [ ] Example: Todo app với localStorage + debounced search + API fetch

### Day 14 (2026-01-11):
- [ ] Use hooks trong real project
- [ ] Combine với concepts từ Sessions 1.1.1 & 1.1.2
- [ ] Build: Shopping cart với localStorage, debounced search, product API

---

## 🔗 CONNECTIONS TO PREVIOUS SESSIONS

**From Session 1.1.1 (Props Typing):**
- ✅ Generic types `<T>` - same concept, now in hooks!
- ✅ Interface definitions for complex objects
- ✅ Type inference principles

**From Session 1.1.2 (Event Handlers):**
- ✅ ChangeEvent for inputs
- ✅ useEffect cleanup pattern
- ✅ setState callback form: `prev => prev + 1`
- ✅ Event handler typing

**New in Session 1.1.3:**
- 🆕 Custom hooks creation
- 🆕 Generic hooks with `<T>`
- 🆕 localStorage sync patterns
- 🆕 Debouncing techniques
- 🆕 Data fetching abstraction
- 🆕 AbortController for cleanup
- 🆕 Three-state pattern (loading/error/data)

---

## 📅 NEXT SESSION

**Session 1.1.4: Utility Types & Advanced TypeScript**

**Prerequisites:** Sessions 1.1.1, 1.1.2, 1.1.3 completed ✅

**Topics Preview:**
- Utility types (Partial, Pick, Omit, Record)
- Conditional types
- Mapped types
- Type narrowing
- Advanced type patterns

**Why Important:**
- Build on generic knowledge from 1.1.3
- Essential for advanced React patterns
- Production TypeScript skills

---

## 💡 PERSONAL NOTES

### What Worked Well:
- ✅ COMPLETE_THEORY.md pattern - All theory in one file, read ahead
- ✅ Shared project structure - No setup overhead
- ✅ Exercise → Review → Fix workflow efficient
- ✅ TODO comments clear and helpful
- ✅ Solution files good for comparison

### Insights Gained:
- 💡 Generic hooks more powerful than expected
- 💡 AbortController essential for production fetch
- 💡 Cleanup pattern critical for all side effects
- 💡 Debouncing dramatically improves performance
- 💡 TypeScript type safety prevents runtime bugs

### Challenges Overcome:
- 🎯 Understanding when lazy initialization needed
- 🎯 AbortError handling initially unclear
- 🎯 Generic type inference vs explicit types
- 🎯 setTimeout cleanup importance

### Questions Answered:
- ✅ When to use generic hooks vs specific types?
- ✅ Why is AbortController needed for fetch?
- ✅ How does debouncing actually work internally?
- ✅ When should cleanup functions be used?

---

## 🎉 SESSION COMPLETION

**Status:** ✅ Session 1.1.3 Completed Successfully

**Files Created:**
- ✅ COMPLETE_THEORY.md (comprehensive theory guide)
- ✅ 01-useLocalStorage.tsx + Solution
- ✅ 02-useDebounce.tsx + Solution
- ✅ 03-useFetch.tsx + Solution
- ✅ quiz.md (12 questions)
- ✅ summary.md (this file)

**Time Spent:** ~3 hours
**Date Completed:** 2025-12-28

**Next Action:**
- Review summary tomorrow
- Start Session 1.1.4 when ready
- Practice hooks in side projects

---

## 📈 OVERALL PROGRESS TRACKER

**Module 1.1: TypeScript cho React**
- [✅] Session 1.1.1: Props & State Typing (96.7%)
- [✅] Session 1.1.2: Event Handlers Typing (98.3%)
- [✅] Session 1.1.3: Hooks với TypeScript (100%)
- [ ] Session 1.1.4: Utility Types & Advanced

**Module Progress:** 3/4 sessions (75%)

**Overall Learning Stats:**
- Sessions completed: 3
- Total exercises: 9
- Average score: 98%
- Quiz performance: 90%+

---

**🌟 CONGRATULATIONS on completing Session 1.1.3!**

You've mastered:
- ✅ Generic custom hooks
- ✅ localStorage synchronization
- ✅ Debouncing techniques
- ✅ Data fetching patterns
- ✅ TypeScript hook typing

**Ready for Session 1.1.4 whenever you are!** 🚀
