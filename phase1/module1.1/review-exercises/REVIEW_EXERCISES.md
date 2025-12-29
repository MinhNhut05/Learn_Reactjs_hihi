# MODULE 1.1 - BÀI TẬP TỔNG HỢP

> **Mục tiêu:** Ôn tập và củng cố TOÀN BỘ kiến thức của Module 1.1
> **Thời gian:** ~2-3 giờ cho cả 3 bài
> **Level:** Tổng hợp tất cả 4 sessions

---

## HƯỚNG DẪN

1. Đọc kỹ requirements trước khi code
2. Tự code KHÔNG xem solution
3. Chỉ xem solution sau khi hoàn thành hoặc stuck quá 30 phút
4. Mỗi bài tập kết hợp nhiều concepts từ các sessions khác nhau

---

# BÀI TẬP 1: TODO APP với TypeScript

## Mức độ: Trung bình | Thời gian: 45-60 phút

### Requirements

Xây dựng một Todo App hoàn chỉnh với các tính năng:

**1. Data Types (Session 1.1.1):**
```tsx
interface Todo {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}
```

**2. Features:**
- Add new todo với form (title + priority selector)
- Toggle complete status khi click
- Delete todo
- Filter by: All | Active | Completed
- Persist todos trong localStorage

**3. Components cần tạo:**

```
TodoApp
├── TodoForm          // Form để add todo mới
├── TodoFilters       // Filter buttons
├── TodoList<T>       // Generic list component
│   └── TodoItem      // Single todo item
└── TodoStats         // Hiển thị thống kê
```

### Kiến thức cần dùng

| Session | Concepts |
|---------|----------|
| 1.1.1 | Interface, Union Types, ReactNode, Generic `<T>` |
| 1.1.2 | ChangeEvent, FormEvent, MouseEvent |
| 1.1.3 | useLocalStorage hook |
| 1.1.4 | Partial, Pick, ComponentProps |

### TODO Comments

```tsx
// TODO 1: Define interface Todo với các fields: id, title, completed, priority, createdAt

// TODO 2: Tạo type FilterType = 'all' | 'active' | 'completed'

// TODO 3: Implement useLocalStorage<T> hook để persist todos

// TODO 4: Tạo TodoForm component với:
//   - Input cho title (ChangeEvent<HTMLInputElement>)
//   - Select cho priority (ChangeEvent<HTMLSelectElement>)
//   - Form submit handler (FormEvent<HTMLFormElement>)

// TODO 5: Tạo generic TodoList<T> component

// TODO 6: Implement filter logic

// TODO 7: Tạo TodoStats component hiển thị số completed/total
```

### Bonus Challenges
- [ ] Add keyboard shortcut: Enter để submit form
- [ ] Add keyboard shortcut: Escape để clear input
- [ ] Sort todos by priority
- [ ] Add edit functionality với inline editing

---

# BÀI TẬP 2: CONTACT FORM với Validation

## Mức độ: Trung bình-Khó | Thời gian: 45-60 phút

### Requirements

Xây dựng Contact Form với real-time validation và debounced submit.

**1. Data Types:**
```tsx
interface ContactForm {
  name: string
  email: string
  phone: string
  subject: 'general' | 'support' | 'sales' | 'other'
  message: string
}

interface FormField {
  value: string
  error: string
  touched: boolean
}
```

**2. Features:**
- Real-time validation với debounce (500ms)
- Show error khi field touched + invalid
- Disable submit button khi form invalid
- Loading state khi submit
- Success/Error message sau submit

**3. Validation Rules:**
```tsx
// Name: Required, min 2 characters
// Email: Required, valid email format
// Phone: Optional, if provided must be valid (10-11 digits)
// Subject: Required
// Message: Required, min 10 characters, max 500 characters
```

**4. Components:**
```
ContactFormPage
├── ContactForm
│   ├── FormField          // Reusable input với error
│   ├── SelectField        // Reusable select với error
│   └── TextAreaField      // Reusable textarea với error
└── FormStatus             // Success/Error message
```

### Kiến thức cần dùng

| Session | Concepts |
|---------|----------|
| 1.1.1 | Interface, ReactNode, Optional props |
| 1.1.2 | ChangeEvent, FormEvent, onBlur |
| 1.1.3 | useDebounce hook |
| 1.1.4 | Partial, Record, Pick, Omit |

### TODO Comments

```tsx
// TODO 1: Define interfaces: ContactForm, FormField, ValidationErrors

// TODO 2: Create type-safe form state với Record<keyof ContactForm, FormField>

// TODO 3: Implement useDebounce hook

// TODO 4: Create validation functions cho each field
//   - validateName(value: string): string
//   - validateEmail(value: string): string
//   - validatePhone(value: string): string
//   - validateMessage(value: string): string

// TODO 5: Create FormField component với:
//   - Props: label, name, value, error, touched, onChange, onBlur
//   - Show error only when touched && error

// TODO 6: Implement debounced validation
//   - Validate sau 500ms khi user stop typing

// TODO 7: Form submit với loading state
//   - Simulate API call với setTimeout
//   - Show success/error message

// TODO 8: Disable submit button khi:
//   - Form invalid
//   - Loading
```

### Bonus Challenges
- [ ] Add character counter cho message field
- [ ] Add "Confirm email" field
- [ ] Save draft to localStorage
- [ ] Add reset form button

---

# BÀI TẬP 3: USER DASHBOARD với Data Fetching

## Mức độ: Khó | Thời gian: 60-90 phút

### Requirements

Xây dựng User Dashboard với data fetching, search, và sorting.

**1. Data Types:**
```tsx
interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
  }
  address: {
    street: string
    city: string
  }
}

type SortField = 'name' | 'email' | 'company'
type SortOrder = 'asc' | 'desc'

interface FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
```

**2. Features:**
- Fetch users từ JSONPlaceholder API
- Search users by name/email (debounced)
- Sort by name/email/company
- Click user để xem details trong modal
- Loading/Error states

**3. API:**
```
GET https://jsonplaceholder.typicode.com/users
```

**4. Components:**
```
UserDashboard
├── SearchBar              // Search input với debounce
├── SortControls           // Sort buttons
├── UserList<User>         // Generic list
│   └── UserCard           // Single user display
├── UserModal              // User details modal
├── LoadingSpinner
└── ErrorMessage
```

### Kiến thức cần dùng

| Session | Concepts |
|---------|----------|
| 1.1.1 | Interface, Generic `<T>`, ReactNode, children |
| 1.1.2 | ChangeEvent, KeyboardEvent, MouseEvent |
| 1.1.3 | useFetch, useDebounce |
| 1.1.4 | Pick, Omit, Discriminated Union, Type Guards |

### TODO Comments

```tsx
// TODO 1: Define all interfaces: User, FetchState<T>, SortConfig

// TODO 2: Implement useFetch<T> hook với:
//   - AbortController for cleanup
//   - Discriminated union cho state
//   - Error handling

// TODO 3: Implement useDebounce<T> hook

// TODO 4: Create SearchBar component với:
//   - ChangeEvent<HTMLInputElement>
//   - KeyboardEvent: Escape để clear
//   - Debounced search term

// TODO 5: Create SortControls component với:
//   - Type-safe sort field selection
//   - Toggle asc/desc order

// TODO 6: Create generic UserList<T> component

// TODO 7: Create UserCard component với:
//   - Pick<User, 'name' | 'email' | 'company'> cho display
//   - onClick để open modal

// TODO 8: Create UserModal component với:
//   - Full user details
//   - Close on Escape key (global listener)
//   - Close on backdrop click

// TODO 9: Implement filter + sort logic trong UserDashboard

// TODO 10: Handle all states:
//   - Loading spinner
//   - Error message với retry button
//   - Empty state khi no results
```

### Bonus Challenges
- [ ] Add pagination (10 users per page)
- [ ] Add "Copy email" button
- [ ] Persist search/sort preferences trong localStorage
- [ ] Add skeleton loading
- [ ] Keyboard navigation (arrow keys để navigate users)

---

# TIÊU CHÍ ĐÁNH GIÁ

## Cho mỗi bài tập:

| Tiêu chí | Điểm |
|----------|------|
| TypeScript types đúng và đầy đủ | 25% |
| Logic hoạt động đúng | 25% |
| Clean code & patterns | 20% |
| Error handling | 15% |
| Bonus features | 15% |

## Thang điểm tổng:

| Score | Level |
|-------|-------|
| 90-100% | Excellent - Ready cho Module 1.2 |
| 75-89% | Good - Review weak areas |
| 60-74% | Needs Improvement - Redo exercises |
| < 60% | Review Module 1.1 theory |

---

# CHECKLIST KIẾN THỨC

Sau khi hoàn thành cả 3 bài, bạn nên confident với:

## Session 1.1.1
- [ ] Interface cho Props
- [ ] Union Types
- [ ] Optional props với `?`
- [ ] Default values
- [ ] ReactNode type
- [ ] Generic components `<T>`

## Session 1.1.2
- [ ] ChangeEvent<HTMLInputElement>
- [ ] ChangeEvent<HTMLSelectElement>
- [ ] FormEvent<HTMLFormElement>
- [ ] KeyboardEvent (React vs Native)
- [ ] MouseEvent
- [ ] e.preventDefault()
- [ ] Global event listeners + cleanup

## Session 1.1.3
- [ ] useLocalStorage hook
- [ ] useDebounce hook
- [ ] useFetch hook
- [ ] AbortController
- [ ] Lazy state initialization
- [ ] Cleanup patterns

## Session 1.1.4
- [ ] Partial<T>
- [ ] Pick<T, K>
- [ ] Omit<T, K>
- [ ] Record<K, V>
- [ ] ComponentProps
- [ ] Discriminated Unions
- [ ] Type Guards

---

**Good luck! Hãy code hết mình và đừng xem solution quá sớm!**
