# Session 1.1.2 - Event Handlers Typing - Complete Theory Guide

> **Đọc PART tương ứng trước khi làm exercise**
>
> - PART 1 → Exercise 1 (Login Form)
> - PART 2 → Exercise 2 (Search Component)
> - PART 3 → Exercise 3 (Interactive Counter)

---

# 📚 PART 1: Concepts cho EXERCISE 1 - Login Form

## 1️⃣ ChangeEvent<HTMLInputElement>

### 🤔 VẤN ĐỀ THỰC TẾ:

Khi làm form trong React, bạn cần handle input changes:

```tsx
// ❌ KHÔNG TYPE - TypeScript ERROR
function LoginForm() {
  const handleChange = (e) => {  // ❌ Error: Parameter 'e' implicitly has 'any' type
    console.log(e.target.value)
  }

  return <input onChange={handleChange} />
}
```

**Problem:**
- TypeScript không biết `e` là gì
- `e.target.value` có thể undefined, lỗi runtime
- Không có autocomplete cho event properties

---

### 📚 GIẢI PHÁP: ChangeEvent<HTMLInputElement>

**Import:**
```tsx
import { ChangeEvent } from 'react'
```

**Syntax:**
```tsx
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value)  // ✅ TypeScript hiểu e.target.value là string
}
```

**Khi nào dùng:**
- Input text, password, email: `ChangeEvent<HTMLInputElement>`
- Textarea: `ChangeEvent<HTMLTextAreaElement>`
- Select dropdown: `ChangeEvent<HTMLSelectElement>`

**Cách hoạt động:**
1. `ChangeEvent` = generic type từ React
2. `<HTMLInputElement>` = specify element type
3. TypeScript infer `e.target` là HTMLInputElement
4. `e.target.value` automatically typed as string

---

### 💻 EXAMPLE CODE - Input onChange:

```tsx
import { ChangeEvent, useState } from 'react'

function LoginForm() {
  const [username, setUsername] = useState<string>('')

  // ✅ Type event với ChangeEvent<HTMLInputElement>
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value  // value: string
    setUsername(value)
  }

  return (
    <input
      type="text"
      value={username}
      onChange={handleUsernameChange}
    />
  )
}
```

**Giải thích từng dòng:**
- Line 5: `useState<string>('')` - State typed as string
- Line 8: `e: ChangeEvent<HTMLInputElement>` - Event typing
- Line 9: `e.target.value` - TypeScript biết là string
- Line 10: `setUsername(value)` - Type-safe, không lỗi
- Line 16: `onChange={handleUsernameChange}` - Compatible với ChangeEvent

---

### 💻 EXAMPLE CODE - Inline Handler:

```tsx
function LoginForm() {
  const [password, setPassword] = useState('')

  return (
    <input
      type="password"
      value={password}
      // Inline handler - TypeScript tự infer type
      onChange={(e) => setPassword(e.target.value)}
    />
  )
}
```

**Giải thích:**
- TypeScript **tự động infer** `e` là `ChangeEvent<HTMLInputElement>`
- Vì `onChange` của `<input>` yêu cầu type đó
- Không cần explicit type khi inline

**Best Practice:**
- ✅ Inline handler: Để TypeScript infer
- ✅ Separate handler: Explicit type `ChangeEvent<HTMLInputElement>`

---

## 2️⃣ FormEvent<HTMLFormElement>

### 🤔 VẤN ĐỀ THỰC TẾ:

Khi submit form, bạn cần prevent default behavior (page reload):

```tsx
// ❌ KHÔNG TYPE
function LoginForm() {
  const handleSubmit = (e) => {  // ❌ Error: 'e' has any type
    e.preventDefault()  // Prevent page reload
    // Submit logic
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

**Problem:**
- TypeScript không biết `e` là event gì
- `e.preventDefault()` có thể không tồn tại
- Không có type safety

---

### 📚 GIẢI PHÁP: FormEvent<HTMLFormElement>

**Syntax:**
```tsx
import { FormEvent } from 'react'

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()  // ✅ TypeScript hiểu e có preventDefault()
  // Submit logic
}
```

**Khi nào dùng:**
- Form submit: `FormEvent<HTMLFormElement>`
- Button trong form (type="submit"): `FormEvent<HTMLFormElement>`

---

### 💻 EXAMPLE CODE - Form Submit:

```tsx
import { FormEvent, useState } from 'react'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // ✅ Type với FormEvent<HTMLFormElement>
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()  // Prevent page reload

    // Submit logic
    console.log('Logging in:', { username, password })

    // Call API, validate, etc.
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}
```

**Giải thích từng dòng:**
- Line 8: `e: FormEvent<HTMLFormElement>` - Type form event
- Line 9: `e.preventDefault()` - Prevent page reload (QUAN TRỌNG!)
- Line 12: Submit logic - log data, call API
- Line 18: `onSubmit={handleSubmit}` - Trigger khi submit form
- Line 29: `type="submit"` - Button type để trigger form submit

---

## 3️⃣ Event.target Typing

### 🤔 VẤN ĐỀ THỰC TẾ:

Khi access `e.target` trong event handler:

```tsx
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.target)        // ✅ e.target: HTMLInputElement
  console.log(e.target.value)  // ✅ value: string
  console.log(e.target.checked) // ❌ Property 'checked' does not exist
}
```

**Key Points:**
- `e.target` type phụ thuộc generic `<HTMLInputElement>`
- Different elements có different properties:
  - `HTMLInputElement`: value, checked, disabled
  - `HTMLButtonElement`: disabled, type
  - `HTMLTextAreaElement`: value, rows, cols

---

### 💻 EXAMPLE CODE - Different Input Types:

```tsx
// Text input
const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value     // ✅ string
  e.target.checked   // ❌ Error: Property doesn't exist
}

// Checkbox input
const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.checked   // ✅ boolean
  e.target.value     // ✅ string (có nhưng thường không dùng)
}

// Textarea
const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  e.target.value     // ✅ string
  e.target.rows      // ✅ number
}
```

---

## 4️⃣ Form Validation & Error States

### 🤔 VẤN ĐỀ THỰC TẾ:

Forms cần validation để check user input:

**Use cases:**
- Username quá ngắn (< 3 chars)
- Password quá yếu (< 6 chars)
- Email format sai
- Required fields empty

---

### 📚 GIẢI PHÁP: State-based Validation

**Pattern:**
```tsx
const [error, setError] = useState<string>('')  // Error message

const validate = (username: string, password: string): boolean => {
  if (username.length < 3) {
    setError('Username must be at least 3 characters')
    return false
  }
  if (password.length < 6) {
    setError('Password must be at least 6 characters')
    return false
  }
  setError('')  // Clear error
  return true
}
```

---

### 💻 EXAMPLE CODE - Full Login Form with Validation:

```tsx
import { ChangeEvent, FormEvent, useState } from 'react'

function LoginForm() {
  // State
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  // Handlers
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    setError('')  // Clear error khi user type
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setError('')  // Clear error khi user type
  }

  // Validation
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

  // Submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate()) return  // Stop nếu validation fail

    // Submit logic
    console.log('Login successful:', { username, password })

    // Clear form
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button type="submit">Login</button>
    </form>
  )
}
```

**Giải thích step-by-step:**
1. **State (Lines 5-7):**
   - `username`, `password`: Form data
   - `error`: Error message string

2. **onChange Handlers (Lines 10-18):**
   - Update state khi user type
   - Clear error để user thấy feedback

3. **Validation (Lines 21-38):**
   - Check required fields với `.trim()`
   - Check minimum length
   - Set error message cụ thể
   - Return boolean

4. **Submit Handler (Lines 41-51):**
   - Prevent default reload
   - Validate trước khi submit
   - Return early nếu fail
   - Submit logic nếu pass

5. **Render (Lines 54-76):**
   - Controlled inputs với `value` và `onChange`
   - Conditional render error với `{error && ...}`
   - Submit button triggers form submit

---

## 💡 TIPS - PART 1:

### 1. **Type Inference:**
```tsx
// ✅ GOOD - Inline, let TypeScript infer
<input onChange={(e) => setValue(e.target.value)} />

// ✅ GOOD - Separate, explicit type
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
}
```

### 2. **Clear Errors on Change:**
```tsx
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
  setError('')  // ✅ Clear error khi user fix
}
```

### 3. **Validation Timing:**
```tsx
// Option 1: Validate on Submit (recommended for simple forms)
const handleSubmit = (e: FormEvent) => {
  e.preventDefault()
  if (!validate()) return
  // Submit
}

// Option 2: Validate on Blur (advanced)
const handleBlur = () => {
  if (username.length < 3) setError('Too short')
}
```

### 4. **Trim Input:**
```tsx
// ✅ ALWAYS trim khi validate
if (username.trim() === '') {  // Prevent "   " passing validation
  setError('Required')
}
```

---

## 🎯 REQUIREMENTS RECAP - EXERCISE 1:

**Tạo Login Form với:**

1. **2 Inputs:**
   - Username: text input
   - Password: password input

2. **Event Handlers:**
   - `onChange` với `ChangeEvent<HTMLInputElement>`
   - `onSubmit` với `FormEvent<HTMLFormElement>`

3. **Validation:**
   - Username: required, min 3 chars
   - Password: required, min 6 chars
   - Error state hiển thị message

4. **Submit Logic:**
   - Prevent default reload
   - Validate trước submit
   - Console.log data nếu pass
   - Clear form sau submit

**Ready? → Đọc xong PART 1 → Code Exercise 1! 🚀**

---
---

# 📚 PART 2: Concepts cho EXERCISE 2 - Search Component

## 1️⃣ KeyboardEvent<HTMLInputElement>

### 🤔 VẤN ĐỀ THỰC TẾ:

Search input thường có feature: "Press Enter to search"

```tsx
// ❌ KHÔNG TYPE
function SearchComponent() {
  const handleKeyPress = (e) => {  // ❌ Error: 'e' has any type
    if (e.key === 'Enter') {       // Không có autocomplete cho e.key
      // Search logic
    }
  }

  return <input onKeyDown={handleKeyPress} />
}
```

**Problem:**
- Không biết `e.key` có những values gì
- Không có autocomplete cho event properties
- Typo `e.key === 'enter'` (lowercase) sẽ không catch

---

### 📚 GIẢI PHÁP: KeyboardEvent<HTMLInputElement>

**Import:**
```tsx
import { KeyboardEvent } from 'react'
```

**Syntax:**
```tsx
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  console.log(e.key)        // ✅ string - key name ('Enter', 'Escape', 'a', etc.)
  console.log(e.code)       // ✅ string - physical key ('Enter', 'KeyA', etc.)
  console.log(e.ctrlKey)    // ✅ boolean - Ctrl pressed?
  console.log(e.shiftKey)   // ✅ boolean - Shift pressed?
  console.log(e.altKey)     // ✅ boolean - Alt pressed?
}
```

**Khi nào dùng:**
- `onKeyDown`: Khi key được press xuống (most common)
- `onKeyUp`: Khi key được release lên
- `onKeyPress`: Deprecated, không dùng

---

### 💻 EXAMPLE CODE - Enter Key Search:

```tsx
import { KeyboardEvent, useState } from 'react'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<string[]>([])

  // Search function
  const performSearch = (query: string) => {
    console.log('Searching for:', query)
    // Giả sử search logic
    setResults([`Result 1 for ${query}`, `Result 2 for ${query}`])
  }

  // ✅ Type với KeyboardEvent<HTMLInputElement>
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {  // ✅ Autocomplete cho 'Enter'
      performSearch(searchTerm)
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}  // ✅ Trigger on key press
      />

      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  )
}
```

**Giải thích từng dòng:**
- Line 15: `e: KeyboardEvent<HTMLInputElement>` - Type keyboard event
- Line 16: `e.key === 'Enter'` - Check key pressed (autocomplete available!)
- Line 17: `performSearch(searchTerm)` - Execute search
- Line 28: `onKeyDown={handleKeyDown}` - Attach keyboard handler

---

### 💻 EXAMPLE CODE - Escape Key to Clear:

```tsx
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    performSearch(searchTerm)
  }

  if (e.key === 'Escape') {  // ✅ Escape to clear
    setSearchTerm('')
    setResults([])
  }
}
```

**Common Keys:**
- `'Enter'` - Enter key
- `'Escape'` - Escape key
- `'ArrowUp'`, `'ArrowDown'`, `'ArrowLeft'`, `'ArrowRight'` - Arrow keys
- `'Backspace'` - Backspace
- `'Tab'` - Tab key
- `' '` - Space (single space string)

---

## 2️⃣ MouseEvent<HTMLButtonElement>

### 🤔 VẤN ĐỀ THỰC TẾ:

Search component thường có "Clear" button:

```tsx
// ❌ KHÔNG TYPE
function SearchComponent() {
  const handleClear = (e) => {  // ❌ Error: 'e' has any type
    setSearchTerm('')
  }

  return <button onClick={handleClear}>Clear</button>
}
```

---

### 📚 GIẢI PHÁP: MouseEvent<HTMLButtonElement>

**Import:**
```tsx
import { MouseEvent } from 'react'
```

**Syntax:**
```tsx
const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
  console.log(e.button)       // ✅ number - which mouse button (0=left, 1=middle, 2=right)
  console.log(e.clientX)      // ✅ number - mouse X position
  console.log(e.clientY)      // ✅ number - mouse Y position
  console.log(e.ctrlKey)      // ✅ boolean - Ctrl pressed?
  console.log(e.shiftKey)     // ✅ boolean - Shift pressed?
}
```

**Element Types:**
- Button: `MouseEvent<HTMLButtonElement>`
- Div: `MouseEvent<HTMLDivElement>`
- Link: `MouseEvent<HTMLAnchorElement>`

---

### 💻 EXAMPLE CODE - Clear Button:

```tsx
import { MouseEvent, useState } from 'react'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')

  // ✅ Type với MouseEvent<HTMLButtonElement>
  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    setSearchTerm('')
    setResults([])
  }

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleClear}>Clear</button>
    </div>
  )
}
```

**Giải thích:**
- Line 7: `e: MouseEvent<HTMLButtonElement>` - Type mouse event on button
- Line 8-9: Clear state
- Line 18: `onClick={handleClear}` - Trigger on click

---

### 💻 EXAMPLE CODE - Inline Handler (Type Inference):

```tsx
// ✅ TypeScript tự infer type
<button onClick={(e) => {
  setSearchTerm('')  // e được infer là MouseEvent<HTMLButtonElement>
}}>
  Clear
</button>
```

**Best Practice:**
- Inline handler ngắn: Để TypeScript infer
- Separate handler: Explicit type

---

## 3️⃣ Controlled Input Pattern

### 🤔 VẤN ĐỀ THỰC TẾ:

Search component cần:
- Display search term
- Update khi user type
- Clear khi click button
- Search khi press Enter

**Solution: Controlled Input**

---

### 📚 GIẢI PHÁP: Controlled Input với State

**Pattern:**
```tsx
const [value, setValue] = useState('')

<input
  value={value}                           // ✅ Display state
  onChange={(e) => setValue(e.target.value)}  // ✅ Update state
/>
```

**Lợi ích:**
- Single source of truth (state)
- Easy to clear, reset, validate
- React controls input value

---

### 💻 EXAMPLE CODE - Full Search Component:

```tsx
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [results, setResults] = useState<string[]>([])

  // Search logic
  const performSearch = (query: string) => {
    if (query.trim() === '') {
      setResults([])
      return
    }

    console.log('Searching for:', query)
    // Giả sử search API
    const mockResults = [
      `Result 1 for "${query}"`,
      `Result 2 for "${query}"`,
      `Result 3 for "${query}"`
    ]
    setResults(mockResults)
  }

  // Handlers
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
    <div className="search-component">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      <div className="search-results">
        {results.length > 0 && (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
```

**Giải thích step-by-step:**

1. **State (Lines 4-5):**
   - `searchTerm`: Current search query
   - `results`: Search results array

2. **Search Logic (Lines 8-22):**
   - Validate query không empty
   - Mock search results
   - Update results state

3. **Handlers:**
   - Line 25: `handleChange` - Update search term khi type
   - Line 29: `handleKeyDown` - Enter to search, Escape to clear
   - Line 38: `handleClear` - Clear button handler
   - Line 43: `handleSearch` - Search button handler

4. **Render (Lines 47-68):**
   - Controlled input với `value` và `onChange`
   - `onKeyDown` cho keyboard shortcuts
   - Search và Clear buttons
   - Conditional render results

---

## 💡 TIPS - PART 2:

### 1. **KeyboardEvent Keys:**
```tsx
// ✅ GOOD - Exact string match
if (e.key === 'Enter') { }

// ❌ BAD - Typo (lowercase)
if (e.key === 'enter') { }  // Sẽ không work!
```

### 2. **Prevent Form Submit:**
```tsx
// Nếu input trong <form>, Enter sẽ submit form
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault()  // ✅ Prevent form submit
    performSearch(searchTerm)
  }
}
```

### 3. **Clear on Empty:**
```tsx
const performSearch = (query: string) => {
  if (query.trim() === '') {  // ✅ Check empty
    setResults([])           // Clear results
    return
  }
  // Search logic
}
```

### 4. **Button vs Input onClick:**
```tsx
// Button
const handleClick = (e: MouseEvent<HTMLButtonElement>) => { }

// Div (nếu dùng div như button)
const handleClick = (e: MouseEvent<HTMLDivElement>) => { }

// Input (ít dùng)
const handleClick = (e: MouseEvent<HTMLInputElement>) => { }
```

---

## 🎯 REQUIREMENTS RECAP - EXERCISE 2:

**Tạo Search Component với:**

1. **Input:**
   - Text input với placeholder "Search..."
   - `onChange` để update search term
   - `onKeyDown` để handle Enter và Escape

2. **Buttons:**
   - "Search" button - trigger search
   - "Clear" button - clear input và results

3. **Keyboard Shortcuts:**
   - Enter: Perform search
   - Escape: Clear search

4. **Search Logic:**
   - Console.log search term
   - Mock results array
   - Display results trong list
   - Clear results nếu query empty

5. **Event Types:**
   - `ChangeEvent<HTMLInputElement>` cho onChange
   - `KeyboardEvent<HTMLInputElement>` cho onKeyDown
   - `MouseEvent<HTMLButtonElement>` cho button clicks

**Ready? → Đọc xong PART 2 → Code Exercise 2! 🚀**

---
---

# 📚 PART 3: Concepts cho EXERCISE 3 - Interactive Counter

## 1️⃣ Global Keyboard Event Listeners

### 🤔 VẤN ĐỀ THỰC TẾ:

Counter component muốn có keyboard shortcuts:
- Press "+" để increment
- Press "-" để decrement
- Press "r" để reset

**Problem:** Input events chỉ work khi input có focus. Làm sao handle keyboard globally?

---

### 📚 GIẢI PHÁP: useEffect + addEventListener

**Pattern:**
```tsx
import { useEffect } from 'react'

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {  // ⚠️ KHÔNG PHẢI React.KeyboardEvent
    // Handle key
  }

  window.addEventListener('keydown', handleKeyDown)

  // Cleanup
  return () => {
    window.removeEventListener('keydown', handleKeyDown)
  }
}, [dependencies])
```

**Key Points:**
- `KeyboardEvent` - Native DOM type (NOT from React)
- `window.addEventListener` - Listen globally
- Cleanup trong return function
- Dependencies array

---

### 💻 EXAMPLE CODE - Global Keyboard Shortcuts:

```tsx
import { useEffect, useState } from 'react'

function InteractiveCounter() {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    // ✅ KeyboardEvent - Native DOM type (không import từ React)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        setCount(prev => prev + 1)
      }
      if (e.key === '-' || e.key === '_') {
        setCount(prev => prev - 1)
      }
      if (e.key === 'r' || e.key === 'R') {
        setCount(0)
      }
    }

    // Add listener
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup - QUAN TRỌNG!
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])  // Empty deps - chỉ setup 1 lần

  return <div>Count: {count}</div>
}
```

**Giải thích step-by-step:**

1. **useEffect Hook (Line 6):**
   - Setup side effect (event listener)
   - Runs after component mount

2. **Handler Function (Lines 8-18):**
   - `e: KeyboardEvent` - Native DOM type
   - Check `e.key` cho different keys
   - `setCount(prev => prev + 1)` - Update state

3. **Add Listener (Line 21):**
   - `window.addEventListener` - Listen globally
   - Works anywhere in app

4. **Cleanup (Lines 24-26):**
   - Remove listener when unmount
   - Prevent memory leaks

5. **Dependencies (Line 27):**
   - `[]` - Empty array
   - Chỉ setup listener 1 lần
   - Không re-run khi re-render

---

### ⚠️ IMPORTANT: KeyboardEvent Types

```tsx
// ❌ WRONG - React.KeyboardEvent chỉ cho React elements
import { KeyboardEvent } from 'react'
const handler = (e: KeyboardEvent<HTMLInputElement>) => { }

// ✅ CORRECT - Native KeyboardEvent cho window events
const handler = (e: KeyboardEvent) => { }  // Không import
```

**Giải thích:**
- `React.KeyboardEvent<T>` - Cho React elements (`<input onKeyDown={...}>`)
- `KeyboardEvent` - Native DOM type cho `window.addEventListener`
- TypeScript tự hiểu `KeyboardEvent` là DOM type

---

## 2️⃣ Event Cleanup Pattern

### 🤔 VẤN ĐỀ THỰC TẾ:

Nếu không cleanup event listeners:
- Memory leaks
- Listeners vẫn chạy sau unmount
- Multiple listeners nếu component re-mount

```tsx
// ❌ BAD - Không cleanup
useEffect(() => {
  const handler = (e: KeyboardEvent) => { }
  window.addEventListener('keydown', handler)
  // Missing cleanup!
}, [])

// Component unmount → listener vẫn còn! 💥
```

---

### 📚 GIẢI PHÁP: Return Cleanup Function

**Pattern:**
```tsx
useEffect(() => {
  // Setup
  const handler = (e: KeyboardEvent) => { }
  window.addEventListener('keydown', handler)

  // Cleanup
  return () => {
    window.removeEventListener('keydown', handler)
  }
}, [])
```

**Cleanup runs when:**
- Component unmounts
- Dependencies change (re-run effect)

---

### 💻 EXAMPLE CODE - Proper Cleanup:

```tsx
import { useEffect, useState } from 'react'

function InteractiveCounter() {
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (!isActive) return  // ✅ Conditional setup

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.key)

      if (e.key === '+') setCount(prev => prev + 1)
      if (e.key === '-') setCount(prev => prev - 1)
    }

    console.log('Adding listener')
    window.addEventListener('keydown', handleKeyDown)

    // ✅ Cleanup
    return () => {
      console.log('Removing listener')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive])  // ✅ Re-run khi isActive changes

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Deactivate' : 'Activate'} Shortcuts
      </button>
    </div>
  )
}
```

**Giải thích:**
- Line 8: Conditional setup - chỉ add listener nếu active
- Line 17-18: Add listener với log
- Lines 21-24: Cleanup với log
- Line 25: Dependencies - re-run khi `isActive` changes

**Test:**
1. Click "Deactivate" → cleanup runs → listener removed
2. Click "Activate" → setup runs → listener added
3. Press +/- → chỉ work khi active

---

## 3️⃣ Button Click Events

### 💻 EXAMPLE CODE - Counter với Buttons:

```tsx
import { MouseEvent, useState } from 'react'

function InteractiveCounter() {
  const [count, setCount] = useState<number>(0)

  // ✅ Type với MouseEvent<HTMLButtonElement>
  const handleIncrement = (e: MouseEvent<HTMLButtonElement>) => {
    setCount(prev => prev + 1)
  }

  const handleDecrement = (e: MouseEvent<HTMLButtonElement>) => {
    setCount(prev => prev - 1)
  }

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    setCount(0)
  }

  return (
    <div className="counter">
      <h2>Count: {count}</h2>

      <div className="buttons">
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}
```

---

## 4️⃣ Combining Click + Keyboard Events

### 💻 EXAMPLE CODE - Full Interactive Counter:

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
      // Increment
      if (e.key === '+' || e.key === '=') {
        setCount(prev => prev + 1)
      }

      // Decrement
      if (e.key === '-' || e.key === '_') {
        setCount(prev => prev - 1)
      }

      // Reset
      if (e.key === 'r' || e.key === 'R') {
        setCount(0)
      }

      // Special: Ctrl + Up Arrow = +10
      if (e.ctrlKey && e.key === 'ArrowUp') {
        e.preventDefault()  // Prevent scroll
        setCount(prev => prev + 10)
      }

      // Special: Ctrl + Down Arrow = -10
      if (e.ctrlKey && e.key === 'ArrowDown') {
        e.preventDefault()  // Prevent scroll
        setCount(prev => prev - 10)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="interactive-counter">
      <h2>Interactive Counter</h2>
      <div className="count-display">
        <span className="count">{count}</span>
      </div>

      <div className="buttons">
        <button onClick={handleIncrement}>+ Increment</button>
        <button onClick={handleDecrement}>- Decrement</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="shortcuts-info">
        <h3>Keyboard Shortcuts:</h3>
        <ul>
          <li><kbd>+</kbd> or <kbd>=</kbd> - Increment</li>
          <li><kbd>-</kbd> - Decrement</li>
          <li><kbd>r</kbd> or <kbd>R</kbd> - Reset</li>
          <li><kbd>Ctrl</kbd> + <kbd>↑</kbd> - +10</li>
          <li><kbd>Ctrl</kbd> + <kbd>↓</kbd> - -10</li>
        </ul>
      </div>
    </div>
  )
}

export default InteractiveCounter
```

**Giải thích features:**

1. **Button Clicks (Lines 7-17):**
   - `MouseEvent<HTMLButtonElement>` typed
   - Update count với `prev => prev + 1`

2. **Basic Keyboard Shortcuts (Lines 23-35):**
   - `+` / `=` → increment
   - `-` → decrement
   - `r` / `R` → reset

3. **Advanced Shortcuts (Lines 38-46):**
   - `Ctrl + ArrowUp` → +10
   - `Ctrl + ArrowDown` → -10
   - `e.preventDefault()` - Prevent page scroll
   - Check `e.ctrlKey` modifier

4. **Cleanup (Lines 49-52):**
   - Remove listener on unmount

5. **UI (Lines 55-78):**
   - Display count
   - Buttons
   - Shortcuts info guide

---

## 💡 TIPS - PART 3:

### 1. **Native vs React KeyboardEvent:**
```tsx
// React element event
const handler = (e: React.KeyboardEvent<HTMLInputElement>) => { }
<input onKeyDown={handler} />

// Window/global event
const handler = (e: KeyboardEvent) => { }  // Native DOM type
window.addEventListener('keydown', handler)
```

### 2. **Prevent Default:**
```tsx
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'ArrowUp') {
    e.preventDefault()  // ✅ Prevent browser scroll
    // Custom logic
  }
}
```

### 3. **Multiple Keys:**
```tsx
// Accept multiple keys for same action
if (e.key === '+' || e.key === '=') {  // Both work
  increment()
}

if (e.key === 'r' || e.key === 'R') {  // Case insensitive
  reset()
}
```

### 4. **Modifiers:**
```tsx
// Check modifier keys
if (e.ctrlKey && e.key === 's') {     // Ctrl + S
  e.preventDefault()  // Prevent browser save
  // Custom save
}

if (e.shiftKey && e.key === 'Tab') {  // Shift + Tab
  // Custom tab logic
}

if (e.altKey && e.key === 'n') {      // Alt + N
  // New item
}
```

### 5. **Cleanup Always:**
```tsx
// ✅ ALWAYS cleanup event listeners
useEffect(() => {
  const handler = (e: KeyboardEvent) => { }
  window.addEventListener('keydown', handler)

  return () => {
    window.removeEventListener('keydown', handler)  // Must cleanup!
  }
}, [])
```

### 6. **Empty Dependencies:**
```tsx
// ✅ Empty deps - setup once
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    setCount(prev => prev + 1)  // Use callback form
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])  // Empty - handler NEVER re-created

// ❌ BAD - với deps, handler re-created mỗi lần count changes
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    setCount(count + 1)  // Stale closure!
  }
  // ...
}, [count])  // Re-run mỗi lần count changes → performance issue
```

---

## 🎯 REQUIREMENTS RECAP - EXERCISE 3:

**Tạo Interactive Counter với:**

1. **State:**
   - `count` number state

2. **Button Handlers:**
   - Increment button - `MouseEvent<HTMLButtonElement>`
   - Decrement button - `MouseEvent<HTMLButtonElement>`
   - Reset button - `MouseEvent<HTMLButtonElement>`

3. **Keyboard Shortcuts:**
   - `+` or `=` → increment
   - `-` → decrement
   - `r` or `R` → reset
   - (Optional) `Ctrl + ArrowUp` → +10
   - (Optional) `Ctrl + ArrowDown` → -10

4. **Event Listeners:**
   - `useEffect` để setup global keyboard listener
   - Cleanup function để remove listener
   - Native `KeyboardEvent` type

5. **UI:**
   - Display current count
   - 3 buttons (Increment, Decrement, Reset)
   - Shortcuts info (optional)

**Ready? → Đọc xong PART 3 → Code Exercise 3! 🚀**

---
---

# 🎓 SUMMARY - All Event Types

## Event Types Reference:

| Event Handler | Type | Element | Usage |
|---------------|------|---------|-------|
| `onChange` | `ChangeEvent<HTMLInputElement>` | `<input>`, `<textarea>` | Input changes |
| `onChange` | `ChangeEvent<HTMLSelectElement>` | `<select>` | Select changes |
| `onSubmit` | `FormEvent<HTMLFormElement>` | `<form>` | Form submit |
| `onClick` | `MouseEvent<HTMLButtonElement>` | `<button>` | Button click |
| `onClick` | `MouseEvent<HTMLDivElement>` | `<div>` | Div click |
| `onKeyDown` | `KeyboardEvent<HTMLInputElement>` | `<input>` | Key press on input |
| Global `keydown` | `KeyboardEvent` (native) | `window` | Global shortcuts |

---

## Common Patterns:

### Pattern 1: Controlled Input
```tsx
const [value, setValue] = useState('')
<input value={value} onChange={(e) => setValue(e.target.value)} />
```

### Pattern 2: Form Submit
```tsx
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // Submit logic
}
<form onSubmit={handleSubmit}>...</form>
```

### Pattern 3: Keyboard Shortcut
```tsx
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    // Action
  }
}
<input onKeyDown={handleKeyDown} />
```

### Pattern 4: Global Keyboard Listener
```tsx
useEffect(() => {
  const handler = (e: KeyboardEvent) => { }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])
```

---

**✅ Session 1.1.2 Complete Theory Ready!**

Workflow:
1. ✅ Đọc PART 1 → Code Exercise 1
2. ✅ Đọc PART 2 → Code Exercise 2
3. ✅ Đọc PART 3 → Code Exercise 3
4. ✅ Quiz → Summary → Next Session

**Bắt đầu với Exercise 1! 🚀**
