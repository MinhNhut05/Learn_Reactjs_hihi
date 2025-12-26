# Session 1.1.1 Summary - Props & State Typing

**Date:** 2025-12-26
**Status:** ✅ Completed
**Duration:** ~2 hours
**Quiz Score:** 4.5/5 (90%)

---

## 📚 CONCEPTS LEARNED

### 1. **Interface cho Props**
```tsx
interface ButtonProps {
  label: string          // Required
  variant: 'primary' | 'secondary' | 'danger'  // Required, union type
  size?: 'sm' | 'md' | 'lg'     // Optional
  disabled?: boolean     // Optional
}
```

**Key Points:**
- Interface preferred cho object shapes (Props)
- Union types cho restricted values
- Optional props dùng `?`
- Không có `?` = required

---

### 2. **Default Values trong Destructuring**
```tsx
function Button({
  label,
  variant,
  size = 'md',         // Default value
  disabled = false
}: ButtonProps) {
  // size luôn có giá trị (không bao giờ undefined)
}
```

**Key Points:**
- Default values cho optional props
- Syntax: `prop = defaultValue`
- Tránh undefined checks trong component body

---

### 3. **ReactNode Type cho Children**
```tsx
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode    // Flexible: string, JSX, array, null
  footer?: ReactNode     // Optional
}
```

**Key Points:**
- ReactNode = bất cứ thứ gì có thể render
- Chấp nhận: string, number, JSX, arrays, null, undefined
- Flexible hơn ReactElement

---

### 4. **Conditional Rendering**
```tsx
function Card({ footer }: CardProps) {
  return (
    <div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
```

**Key Points:**
- `{condition && <Component />}` - render nếu true
- `undefined && ...` → false → không render
- `null && ...` → false → không render

---

### 5. **ClassName Merging**
```tsx
function Card({ className }: CardProps) {
  const cardClass = className ? `card ${className}` : 'card'
  return <div className={cardClass}>...</div>
}
```

**Key Points:**
- Merge base class + custom class
- Template string: `` `card ${className}` ``
- Fallback với ternary

---

### 6. **Generic Types `<T>`**
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
```

**Key Points:**
- `<T>` = placeholder cho type
- Reusable component cho nhiều types
- Type inference từ usage
- Full autocomplete trong renderItem

---

### 7. **Render Props Pattern**
```tsx
<List<User>
  items={users}
  renderItem={(user) => (
    <div>{user.name} - {user.email}</div>
  )}
  keyExtractor={(user) => user.id}
/>
```

**Key Points:**
- Function prop để custom render
- TypeScript infer type của param
- Flexible, reusable pattern

---

## 💻 CODE PATTERNS TO REMEMBER

### Pattern 1: Button Component
```tsx
interface ButtonProps {
  label: string
  variant: 'primary' | 'secondary' | 'danger'
  onClick: () => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

function Button({ label, variant, onClick, size = 'md', disabled = false }: ButtonProps) {
  const className = `btn btn-${variant} btn-${size}`
  return <button className={className} onClick={onClick} disabled={disabled}>{label}</button>
}
```

### Pattern 2: Card Component
```tsx
interface CardProps {
  title: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

function Card({ title, children, footer, className }: CardProps) {
  const cardClass = className ? `card ${className}` : 'card'
  return (
    <div className={cardClass}>
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
```

### Pattern 3: Generic List
```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul className="list">
      {items.map(item => (
        <li key={keyExtractor(item)} className="list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
```

---

## ❌ COMMON MISTAKES TO AVOID

### Mistake 1: Quên Default Values
```tsx
// ❌ BAD
function Button({ size }: ButtonProps) {
  const className = `btn btn-${size}`  // size có thể undefined
}

// ✅ GOOD
function Button({ size = 'md' }: ButtonProps) {
  const className = `btn btn-${size}`  // size luôn có giá trị
}
```

### Mistake 2: ClassName Không Merge
```tsx
// ❌ BAD
<div className={className}>  // Mất base class 'card'

// ✅ GOOD
const cardClass = className ? `card ${className}` : 'card'
<div className={cardClass}>
```

### Mistake 3: Dùng Index as Key
```tsx
// ❌ BAD
{items.map((item, index) => <li key={index}>...</li>)}

// ✅ GOOD
{items.map(item => <li key={keyExtractor(item)}>...</li>)}
```

### Mistake 4: String vs string (Type Case)
```tsx
// ❌ BAD
<List<String> items={tags} />  // String = wrapper object

// ✅ GOOD
<List<string> items={tags} />  // string = primitive type
```

---

## 🎯 KEY TAKEAWAYS

1. **Interface for Props**: Dùng interface cho Props, type cho unions
2. **Optional Props**: `?` cho optional, provide defaults trong destructuring
3. **ReactNode**: Type linh hoạt nhất cho children
4. **Conditional Rendering**: `{condition && <Component />}`
5. **Generics**: `<T>` cho reusable components
6. **Type Safety**: TypeScript bắt lỗi ngay khi code, không phải runtime

---

## 📊 EXERCISES PERFORMANCE

| Exercise | Score | Highlights |
|----------|-------|------------|
| Ex1: Button | 10/10 | Perfect interface, defaults, template string |
| Ex2: Card | 10/10 | ReactNode, conditional, className merge |
| Ex3: Generic List | 9/10 | Generic types, render props, type inference |

**Overall:** 29/30 (96.7%)

---

## 📝 QUIZ RESULTS

**Score:** 4.5/5 (90%)

### Correct Answers:
- ✅ Interface cho Props
- ✅ Optional props = undefined
- ✅ Conditional rendering behavior
- ✅ ClassName merge logic

### Partial Credit:
- ⚠️ Generic type inference: Cả explicit và inference đều work

---

## 🔄 SPACED REPETITION

### Day 1 (Tomorrow):
- [ ] Review this summary (10 phút)
- [ ] Đọc lại code patterns

### Day 3:
- [ ] Làm lại Ex2 (Card) không xem code
- [ ] Làm lại Ex3 (Generic List) không xem code

### Day 7:
- [ ] Quiz lại concepts
- [ ] Implement Button + Card từ đầu

### Day 14:
- [ ] Dùng patterns này trong mini project

---

## 📅 NEXT SESSION

**Session 1.1.2: Event Handlers Typing**

**Prerequisites:** Session 1.1.1 completed ✅

**Topics:**
- ChangeEvent<HTMLInputElement>
- FormEvent<HTMLFormElement>
- KeyboardEvent
- Custom event handlers

**Exercises:**
- Login Form với typed event handlers
- Search Component với debounce

---

## 💡 PERSONAL NOTES

### Insights:
- Generic types ban đầu khó hiểu, nhưng sau khi code thì rất clear
- ReactNode flexible hơn nghĩ, chấp nhận cả null/undefined
- Type inference trong generics rất mạnh - autocomplete hoạt động perfect

### Questions Answered:
- ✅ Khi nào dùng interface vs type
- ✅ ReactNode vs ReactElement khác gì
- ✅ Generic components hoạt động như thế nào

### What Worked Well:
- Workflow: Đọc lý thuyết trước → Code → Review song song
- Shared project structure: Không cần setup lại mỗi exercise
- Comment/uncomment pattern trong App.tsx: Dễ switch

---

**Status:** ✅ Session 1.1.1 Completed
**Next:** Session 1.1.2 (khi sẵn sàng)
**Files Created:**
- ✅ 01-Button.tsx
- ✅ 02-Card.tsx
- ✅ 03-GenericList.tsx
- ✅ Solutions files
- ✅ COMPLETE_THEORY.md
