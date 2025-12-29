# Session 1.1.2 Summary - Event Handlers Typing

**Date:** 2025-12-27
**Status:** ✅ Completed
**Duration:** ~2.5 hours
**Quiz Score:** 12/12 (100%)

---

## 📚 CONCEPTS LEARNED

### 1. **ChangeEvent<HTMLInputElement>**
```tsx
import { ChangeEvent } from 'react'

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value  // value: string
  setValue(value)
}

<input onChange={handleChange} />
```

**Key Points:**
- Type cho input onChange events
- `e.target.value` typed as string
- Different elements: `HTMLInputElement`, `HTMLTextAreaElement`, `HTMLSelectElement`
- TypeScript auto-infers type khi inline: `onChange={(e) => ...}`

---

### 2. **FormEvent<HTMLFormElement>**
```tsx
import { FormEvent } from 'react'

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()  // Prevent page reload
  // Submit logic
}

<form onSubmit={handleSubmit}>...</form>
```

**Key Points:**
- Type cho form submit events
- `e.preventDefault()` prevents page reload (CRITICAL!)
- Always validate before submit
- Clear form after successful submit

---

### 3. **MouseEvent<HTMLButtonElement>**
```tsx
import { MouseEvent } from 'react'

const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
  // Click logic
}

<button onClick={handleClick}>Click</button>
```

**Key Points:**
- Type cho button/element click events
- Generic type cho different elements: `HTMLButtonElement`, `HTMLDivElement`, `HTMLAnchorElement`
- TypeScript auto-infers khi inline

---

### 4. **KeyboardEvent<HTMLInputElement>**
```tsx
import { KeyboardEvent } from 'react'

const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    performSearch()
  }
  if (e.key === 'Escape') {
    clearInput()
  }
}

<input onKeyDown={handleKeyDown} />
```

**Key Points:**
- Type cho input keyboard events (onKeyDown, onKeyUp)
- `e.key` - Key name as string ('Enter', 'Escape', 'a', etc.)
- Case-sensitive: 'Enter' not 'enter'
- Common keys: 'Enter', 'Escape', 'Tab', 'ArrowUp', 'ArrowDown', ' ' (space)

---

### 5. **Native KeyboardEvent - Global Events**
```tsx
import { useEffect } from 'react'

useEffect(() => {
  // IMPORTANT: KeyboardEvent là NATIVE DOM type (không import từ React)
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === '+') {
      increment()
    }
  }

  window.addEventListener('keydown', handleKeyDown)

  // Cleanup - QUAN TRỌNG!
  return () => {
    window.removeEventListener('keydown', handleKeyDown)
  }
}, [])
```

**Key Points:**
- `KeyboardEvent` - Native DOM type (NOT `React.KeyboardEvent`)
- Global shortcuts work anywhere in app
- MUST cleanup với `removeEventListener`
- Empty dependencies `[]` - setup only once

---

### 6. **Modifier Keys**
```tsx
const handleKeyDown = (e: KeyboardEvent) => {
  // Ctrl + S
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault()  // Prevent browser save
    customSave()
  }

  // Shift + Tab
  if (e.shiftKey && e.key === 'Tab') {
    // Custom logic
  }

  // Alt + N
  if (e.altKey && e.key === 'n') {
    // Custom logic
  }

  // Ctrl + Arrow Up
  if (e.ctrlKey && e.key === 'ArrowUp') {
    e.preventDefault()  // Prevent scroll
    incrementBy10()
  }
}
```

**Key Points:**
- `e.ctrlKey` - Ctrl pressed?
- `e.shiftKey` - Shift pressed?
- `e.altKey` - Alt pressed?
- `e.metaKey` - Cmd (Mac) / Win key pressed?
- `e.preventDefault()` often needed with modifiers

---

### 7. **preventDefault() Usage**
```tsx
// Form submit
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()  // ✅ Prevent page reload
  // Submit
}

// Keyboard shortcuts
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault()  // ✅ Prevent browser save dialog
    customSave()
  }

  if (e.ctrlKey && e.key === 'ArrowUp') {
    e.preventDefault()  // ✅ Prevent page scroll
    incrementBy10()
  }
}
```

**When to use:**
- ✅ Form submit (prevent reload)
- ✅ Keyboard shortcuts conflicting với browser (Ctrl+S, Ctrl+Arrow)
- ✅ Link clicks khi custom navigation
- ❌ KHÔNG cần cho simple keys (+, -, r) - no default behavior

---

### 8. **useEffect Cleanup Pattern**
```tsx
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    // Handle event
  }

  // Add listener
  window.addEventListener('keydown', handler)

  // Cleanup function
  return () => {
    window.removeEventListener('keydown', handler)
  }
}, [])  // Empty deps
```

**Why cleanup is CRITICAL:**
- Prevents memory leaks
- Listener continues running after unmount without cleanup
- Can cause bugs (updating unmounted components)
- React best practice for side effects

---

### 9. **setState Callback Form**
```tsx
// ❌ BAD - Stale closure trong useEffect
useEffect(() => {
  const handler = () => {
    setCount(count + 1)  // 'count' is stale
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])  // count NOT in deps → stale

// ✅ GOOD - Callback form
useEffect(() => {
  const handler = () => {
    setCount(prev => prev + 1)  // 'prev' always latest
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])  // No deps needed, callback guarantees latest value
```

**Best Practice:**
- Always use callback form: `setState(prev => prev + newValue)`
- Guarantees latest value
- No stale closure bugs
- Works with empty dependencies

---

## 💻 CODE PATTERNS TO REMEMBER

### Pattern 1: Login Form
```tsx
import { ChangeEvent, FormEvent, useState } from 'react'

function LoginForm() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    setError('')  // Clear error on change
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setError('')
  }

  const validate = (): boolean => {
    if (username.trim() === '') {
      setError('Username is required')
      return false
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters')
      return false
    }
    if (password.trim() === '') {
      setError('Password is required')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate()) {  // IMPORTANT: Call function with ()
      return
    }

    console.log('Login:', { username, password })

    // Clear form
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Login</button>
    </form>
  )
}
```

---

### Pattern 2: Search Component
```tsx
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [results, setResults] = useState<string[]>([])

  const performSearch = (query: string) => {
    if (query.trim() === '') {
      setResults([])
      return
    }
    console.log('Searching:', query)
    const mockResults = [
      `Result 1 for "${query}"`,
      `Result 2 for "${query}"`,
      `Result 3 for "${query}"`
    ]
    setResults(mockResults)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch(searchTerm)
    }
    if (e.key === 'Escape') {
      setSearchTerm('')
      setResults([])
    }
  }

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    setSearchTerm('')
    setResults([])
  }

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    performSearch(searchTerm)
  }

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>

      {results.length > 0 && (
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

### Pattern 3: Interactive Counter
```tsx
import { MouseEvent, useEffect, useState } from 'react'

function InteractiveCounter() {
  const [count, setCount] = useState<number>(0)

  // Button handlers
  const handleIncrement = (e: MouseEvent<HTMLButtonElement>) => {
    setCount(prev => prev + 1)
  }

  const handleDecrement = (e: MouseEvent<HTMLButtonElement>) => {
    setCount(prev => prev - 1)
  }

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    setCount(0)
  }

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Basic shortcuts
      if (e.key === '+' || e.key === '=') {
        setCount(prev => prev + 1)
      }
      if (e.key === '-') {
        setCount(prev => prev - 1)
      }
      if (e.key === 'r' || e.key === 'R') {
        setCount(0)
      }

      // Advanced shortcuts with modifiers
      if (e.ctrlKey && e.key === 'ArrowUp') {
        e.preventDefault()
        setCount(prev => prev + 10)
      }
      if (e.ctrlKey && e.key === 'ArrowDown') {
        e.preventDefault()
        setCount(prev => prev - 10)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleIncrement}>+ Increment</button>
      <button onClick={handleDecrement}>- Decrement</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}
```

---

## ❌ COMMON MISTAKES TO AVOID

### Mistake 1: Function Reference vs Call
```tsx
// ❌ WRONG
if (!validate) {  // Checks if function exists (always true)
  return
}

// ✅ CORRECT
if (!validate()) {  // Calls function, checks return value
  return
}
```

### Mistake 2: Wrong Event Type for Global Listeners
```tsx
// ❌ WRONG
import { KeyboardEvent } from 'react'
const handler = (e: KeyboardEvent<HTMLInputElement>) => { }
window.addEventListener('keydown', handler)  // Type error!

// ✅ CORRECT
const handler = (e: KeyboardEvent) => { }  // Native DOM type
window.addEventListener('keydown', handler)
```

### Mistake 3: Missing Cleanup
```tsx
// ❌ WRONG - Memory leak
useEffect(() => {
  window.addEventListener('keydown', handler)
  // Missing cleanup!
}, [])

// ✅ CORRECT
useEffect(() => {
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])
```

### Mistake 4: Stale Closure
```tsx
// ❌ WRONG - Stale closure
useEffect(() => {
  const handler = () => {
    setCount(count + 1)  // 'count' is stale
  }
  // ...
}, [])  // count not in deps

// ✅ CORRECT - Callback form
useEffect(() => {
  const handler = () => {
    setCount(prev => prev + 1)  // Always latest
  }
  // ...
}, [])
```

### Mistake 5: Wrong Key Names
```tsx
// ❌ WRONG - Typo or wrong case
if (e.key === 'enter') { }    // Lowercase won't work
if (e.key === 'Esc') { }      // Should be 'Escape'

// ✅ CORRECT
if (e.key === 'Enter') { }    // Exact case
if (e.key === 'Escape') { }   // Full name
```

---

## 🎯 KEY TAKEAWAYS

1. **Event Types Reference:**
   - `ChangeEvent<HTMLInputElement>` - Input onChange
   - `FormEvent<HTMLFormElement>` - Form submit
   - `KeyboardEvent<HTMLInputElement>` - Input keyboard
   - `MouseEvent<HTMLButtonElement>` - Button click
   - `KeyboardEvent` (native) - Global keyboard

2. **Always Call Functions:**
   - `validate()` NOT `validate`
   - Function call returns value, reference just checks existence

3. **Cleanup is Critical:**
   - Every `addEventListener` needs `removeEventListener`
   - Return cleanup function in useEffect
   - Prevents memory leaks

4. **Callback Form in setState:**
   - Use `setState(prev => prev + value)` in event handlers
   - Guarantees latest value
   - No stale closure issues

5. **preventDefault() When Needed:**
   - Form submit (prevent reload)
   - Keyboard shortcuts (prevent browser behavior)
   - Not needed for simple keys

6. **Modifier Keys:**
   - `e.ctrlKey`, `e.shiftKey`, `e.altKey`
   - Combine with key check: `e.ctrlKey && e.key === 's'`

---

## 📊 EXERCISES PERFORMANCE

| Exercise | Score | Highlights |
|----------|-------|------------|
| Ex1: Login Form | 9.5/10 | Perfect implementation, 1 bug (function call vs reference) fixed |
| Ex2: Search Component | 10/10 | All event types correct, keyboard shortcuts perfect |
| Ex3: Interactive Counter | 10/10 | Global events, cleanup, BONUS modifiers implemented! |

**Overall:** 29.5/30 (98.3%)

---

## 📝 QUIZ RESULTS

**Score:** 12/12 (100%)

**Perfect understanding of:**
- All event types (ChangeEvent, FormEvent, KeyboardEvent, MouseEvent)
- Native vs React event types
- preventDefault() usage
- useEffect cleanup pattern
- Modifier keys
- setState callback form
- Bug detection skills

---

## 🔄 SPACED REPETITION

### Day 1 (Tomorrow):
- [ ] Review this summary (10 phút)
- [ ] Đọc lại event types reference

### Day 3:
- [ ] Implement LoginForm from scratch (no reference)
- [ ] Implement SearchComponent keyboard shortcuts

### Day 7:
- [ ] Quiz lại concepts
- [ ] Implement Counter với global keyboard events

### Day 14:
- [ ] Use event handlers trong mini project
- [ ] Combine với concepts từ Session 1.1.1

---

## 📅 NEXT SESSION

**Session 1.1.3: Hooks với TypeScript**

**Prerequisites:** Sessions 1.1.1, 1.1.2 completed ✅

**Topics:**
- useState với complex types
- useEffect typing và dependencies
- useRef typing (DOM refs vs mutable values)
- Custom hooks typing
- Generic hooks
- Hook return types

**Exercises:**
- Custom useLocalStorage hook
- Custom useDebounce hook
- Custom useFetch hook

---

## 💡 PERSONAL NOTES

### What Worked Well:
- Workflow: Đọc PART trước → Code → Song song review + đọc PART tiếp
- COMPLETE_THEORY.md pattern: Tất cả lý thuyết trong 1 file, tiết kiệm thời gian
- Shared project: Không setup lại mỗi exercise
- TODO comments rõ ràng, dễ follow

### Insights:
- Native vs React event types ban đầu confusing, nhưng sau khi code rất clear
- useEffect cleanup pattern critical - dễ quên nếu không chú ý
- Callback form trong setState solve nhiều bugs tiềm ẩn
- preventDefault() cần thiết cho shortcuts nhưng không phải mọi keys

### Questions Answered:
- ✅ Khi nào dùng ChangeEvent vs KeyboardEvent vs MouseEvent
- ✅ Native KeyboardEvent vs React.KeyboardEvent khác nhau ra sao
- ✅ Tại sao cần cleanup trong useEffect
- ✅ Function reference vs function call - bug thực tế!

---

**Status:** ✅ Session 1.1.2 Completed Successfully
**Next:** Session 1.1.3 (khi sẵn sàng)
**Files Created:**
- ✅ COMPLETE_THEORY.md
- ✅ 01-LoginForm.tsx + Solution
- ✅ 02-SearchComponent.tsx + Solution
- ✅ 03-InteractiveCounter.tsx + Solution
- ✅ quiz.md
- ✅ summary.md
