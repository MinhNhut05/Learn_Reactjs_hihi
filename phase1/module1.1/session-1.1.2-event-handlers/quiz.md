# Session 1.1.2 Quiz - Event Handlers Typing

**Total Questions:** 10
**Time:** Không giới hạn
**Passing Score:** 7/10 (70%)

---

## QUESTION 1: ChangeEvent Type (1 point)

Type nào đúng cho input onChange handler?

```tsx
const handleChange = (e: ???) => {
  console.log(e.target.value)
}

<input onChange={handleChange} />
```

**A.** `Event`
**B.** `ChangeEvent<HTMLInputElement>`
**C.** `InputEvent<HTMLInputElement>`
**D.** `React.SyntheticEvent`

---

## QUESTION 2: FormEvent Type (1 point)

Type nào đúng cho form submit handler?

```tsx
const handleSubmit = (e: ???) => {
  e.preventDefault()
  // Submit logic
}

<form onSubmit={handleSubmit}>...</form>
```

**A.** `SubmitEvent<HTMLFormElement>`
**B.** `FormEvent<HTMLFormElement>`
**C.** `Event`
**D.** `MouseEvent<HTMLFormElement>`

---

## QUESTION 3: KeyboardEvent cho Input (1 point)

Type nào đúng cho input keyboard event?

```tsx
const handleKeyDown = (e: ???) => {
  if (e.key === 'Enter') {
    performSearch()
  }
}

<input onKeyDown={handleKeyDown} />
```

**A.** `KeyEvent<HTMLInputElement>`
**B.** `KeyboardEvent<HTMLInputElement>`
**C.** `KeyDownEvent<HTMLInputElement>`
**D.** `KeyPressEvent<HTMLInputElement>`

---

## QUESTION 4: Native KeyboardEvent (1 point)

Type nào đúng cho global keyboard event listener?

```tsx
useEffect(() => {
  const handleKeyDown = (e: ???) => {
    if (e.key === '+') {
      increment()
    }
  }

  window.addEventListener('keydown', handleKeyDown)

  return () => {
    window.removeEventListener('keydown', handleKeyDown)
  }
}, [])
```

**A.** `KeyboardEvent<Window>`
**B.** `React.KeyboardEvent`
**C.** `KeyboardEvent` (Native DOM type)
**D.** `WindowKeyboardEvent`

---

## QUESTION 5: preventDefault Usage (1 point)

Khi nào PHẢI dùng `e.preventDefault()`?

**A.** Trong mọi event handler để prevent bugs
**B.** Khi muốn prevent default browser behavior (form submit, scroll, etc.)
**C.** Chỉ khi dùng TypeScript
**D.** Chỉ trong button onClick handlers

---

## QUESTION 6: Code Analysis - Bug Detection (2 points)

Code sau có bug gì?

```tsx
function LoginForm() {
  const [username, setUsername] = useState('')

  const validate = (): boolean => {
    if (username.length < 3) {
      return false
    }
    return true
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate) {  // Line A
      return
    }

    console.log('Login:', username)
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

**A.** Không có bug, code đúng
**B.** Line A: Phải là `!validate()` với dấu ngoặc
**C.** Missing preventDefault() trong validate
**D.** useState không được type

---

## QUESTION 7: useEffect Cleanup (2 points)

Tại sao PHẢI có cleanup function trong useEffect khi add event listener?

```tsx
useEffect(() => {
  const handler = (e: KeyboardEvent) => { }
  window.addEventListener('keydown', handler)

  return () => {
    window.removeEventListener('keydown', handler)  // Cleanup
  }
}, [])
```

**A.** TypeScript yêu cầu
**B.** Prevent memory leaks - listener vẫn chạy sau khi unmount
**C.** Improve performance
**D.** React sẽ báo lỗi nếu không có

---

## QUESTION 8: Modifier Keys (1 point)

Code nào check đúng shortcut "Ctrl + S"?

**A.** `if (e.key === 'Ctrl+S') { }`
**B.** `if (e.ctrlKey && e.key === 's') { }`
**C.** `if (e.keys === ['Ctrl', 's']) { }`
**D.** `if (e.modifiers.ctrl && e.key === 's') { }`

---

## QUESTION 9: Callback Form in setState (1 point)

Cách nào TỐT NHẤT để update count trong useEffect với global keyboard?

**A.** `setCount(count + 1)`
**B.** `setCount(prev => prev + 1)`
**C.** `setCount(function(prev) { return prev + 1 })`
**D.** Cả B và C đều tốt

---

## QUESTION 10: Code Completion (1 point)

Điền code vào chỗ trống để clear searchTerm và results khi press Escape:

```tsx
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    performSearch(searchTerm)
  }

  if (e.key === _____) {  // Fill blank
    setSearchTerm('')
    setResults([])
  }
}
```

**A.** `'Esc'`
**B.** `'ESC'`
**C.** `'Escape'`
**D.** `27` (keyCode)

---

## SUBMISSION

Trả lời theo format:
```
1: B
2: A
3: C
...
10: D
```

**Gửi answers của bạn để tôi chấm điểm!** 🎯
