# Session 1.1.4 - Utility Types (Simplified for Fresher/Junior)

> **MỨC ĐỘ:** Cơ bản - Chỉ học những gì CẦN THIẾT cho Fresher/Junior
> **THỜI GIAN:** 1.5-2h (rút gọn từ 3h+)

---

## 🎯 MỤC TIÊU SESSION (Simplified)

Học **6 Utility Types quan trọng nhất** mà Fresher/Junior thường gặp:

1. ✅ `Partial<T>` - Update forms
2. ✅ `Pick<T, K>` - Select specific fields
3. ✅ `Omit<T, K>` - Remove fields
4. ✅ `Record<K, V>` - Dynamic objects
5. ✅ `ComponentProps<typeof C>` - Extract component props
6. ✅ `PropsWithChildren<T>` - Add children prop

**KHÔNG HỌC SÂU:**
- ❌ Polymorphic Components (too advanced)
- ❌ Conditional Types (hiểu concept là đủ)
- ❌ Template Literal Types (rarely used)
- ❌ Custom Type Guards (basic guards đủ rồi)

---

# 📚 PART 1: UTILITY TYPES CƠ BẢN

## 1️⃣ Partial<T> - Làm tất cả props optional

### 🤔 VẤN ĐỀ:

```tsx
interface User {
  id: number
  name: string
  email: string
  password: string
}

// ❌ Update form phải define lại interface với tất cả props optional?
interface UserUpdate {
  id?: number
  name?: string
  email?: string
  password?: string
}
```

### ✅ GIẢI PHÁP: `Partial<T>`

```tsx
// ✅ Tự động làm tất cả props optional
type UserUpdate = Partial<User>

function updateUser(id: number, updates: Partial<User>) {
  // updates có thể có 0, 1, hoặc nhiều properties
}

updateUser(1, { name: 'New Name' })              // ✅ OK
updateUser(2, { email: 'new@email.com' })        // ✅ OK
updateUser(3, {})                                 // ✅ OK - empty object
```

### 💡 USE CASES:

**1. Form State (incomplete data):**

```tsx
interface FormData {
  username: string
  email: string
  password: string
}

function ProfileForm() {
  // Form có thể incomplete → dùng Partial
  const [formData, setFormData] = useState<Partial<FormData>>({})

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
}
```

**2. Update API calls:**

```tsx
// Update chỉ cần id + optional fields
type UpdateRequest = { id: number } & Partial<User>

updateUser({ id: 1, name: 'John' })  // ✅ OK
updateUser({ id: 2 })                 // ✅ OK - chỉ có id
```

---

## 2️⃣ Pick<T, K> - Chọn specific properties

### 🤔 VẤN ĐỀ:

```tsx
interface User {
  id: number
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  createdAt: Date
}

// ❌ Registration form cần name, email, password → phải duplicate?
```

### ✅ GIẢI PHÁP: `Pick<T, K>`

```tsx
// ✅ Chọn chỉ 3 fields cần thiết
type RegisterForm = Pick<User, 'name' | 'email' | 'password'>

// Equivalent to:
// interface RegisterForm {
//   name: string
//   email: string
//   password: string
// }

const registerData: RegisterForm = {
  name: 'John',
  email: 'john@example.com',
  password: 'secret123'
  // ❌ Không thể thêm id, role, createdAt
}
```

### 💡 USE CASES:

**1. Login Form:**

```tsx
type LoginForm = Pick<User, 'email' | 'password'>
```

**2. Public Profile (không show sensitive data):**

```tsx
type PublicProfile = Pick<User, 'id' | 'name'>

const users: PublicProfile[] = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
]
```

---

## 3️⃣ Omit<T, K> - Loại bỏ specific properties

### 🤔 VẤN ĐỀ:

```tsx
// Muốn return User NGOẠI TRỪ password → Làm sao?
```

### ✅ GIẢI PHÁP: `Omit<T, K>`

```tsx
// ✅ Loại bỏ password field
type SafeUser = Omit<User, 'password'>

// Equivalent to:
// interface SafeUser {
//   id: number
//   name: string
//   email: string
//   role: 'admin' | 'user'
//   createdAt: Date
// }

function getUserProfile(id: number): SafeUser {
  const user = database.findUser(id)
  const { password, ...safeUser } = user
  return safeUser
}
```

### 💡 PICK vs OMIT - Khi nào dùng gì?

```tsx
// ✅ Pick - Khi cần ÍT properties (< 50% fields)
type LoginForm = Pick<User, 'email' | 'password'>  // Chỉ 2/6 fields

// ✅ Omit - Khi cần NHIỀU properties (> 50% fields)
type SafeUser = Omit<User, 'password'>  // 5/6 fields, loại bỏ 1
```

### 💡 USE CASES:

**1. Remove sensitive data:**

```tsx
type PublicUser = Omit<User, 'password' | 'email'>
```

**2. Extend interface without specific fields:**

```tsx
interface AdminUser extends Omit<User, 'password'> {
  hashedPassword: string
  permissions: string[]
}
```

---

## 4️⃣ Record<K, V> - Dynamic object với typed keys

### 🤔 VẤN ĐỀ:

```tsx
// ❌ Form errors phải define thủ công?
interface FormErrors {
  name: string
  email: string
  password: string
}
```

### ✅ GIẢI PHÁP: `Record<K, V>`

```tsx
// ✅ Dynamic với Record
type FormField = 'name' | 'email' | 'password'
type FormErrors = Record<FormField, string>

// Equivalent to:
// interface FormErrors {
//   name: string
//   email: string
//   password: string
// }

const errors: FormErrors = {
  name: 'Name is required',
  email: 'Invalid email',
  password: 'Password too short'
}

console.log(errors.name)  // ✅ OK
console.log(errors.age)   // ❌ ERROR - 'age' không có trong FormField
```

### 💡 USE CASES:

**1. Form Errors với keyof:**

```tsx
interface User {
  name: string
  email: string
  password: string
}

// Tự động sync với User fields
type FormErrors = Partial<Record<keyof User, string>>

const errors: FormErrors = {
  name: 'Invalid name'
  // email, password optional
}

// ✅ Nếu thêm field mới vào User, FormErrors tự động có!
```

**2. Status Config:**

```tsx
type Status = 'idle' | 'loading' | 'success' | 'error'
type StatusConfig = Record<Status, { color: string; message: string }>

const statusConfig: StatusConfig = {
  idle: { color: 'gray', message: 'Ready' },
  loading: { color: 'blue', message: 'Loading...' },
  success: { color: 'green', message: 'Success!' },
  error: { color: 'red', message: 'Error occurred' }
}

// ✅ Bắt buộc phải có đủ 4 status
```

---

## 🎯 EXERCISE 1 REQUIREMENTS

**Build:** Simple Form Builder

**Features:**
1. Form config với `Record<string, FormField>`
2. Form values type-safe
3. Form errors với `Partial<Record<K, V>>`
4. Dùng `Pick` để select specific fields
5. Dùng `Omit` để remove sensitive fields

---

# 📚 PART 2: COMPONENT PROPS UTILITIES

## 1️⃣ ComponentProps<typeof Component>

### 🤔 VẤN ĐỀ:

```tsx
// Có Button component:
function Button({ variant, size, children, onClick }: ButtonProps) {
  return <button>...</button>
}

// Muốn tạo IconButton extend tất cả Button props + thêm icon
// ❌ Phải duplicate ButtonProps?
interface IconButtonProps {
  variant: 'primary' | 'secondary'  // Duplicate!
  size: 'sm' | 'md' | 'lg'          // Duplicate!
  children: ReactNode               // Duplicate!
  onClick: () => void               // Duplicate!
  icon: ReactNode                   // New
}
```

### ✅ GIẢI PHÁP: `ComponentProps<typeof Component>`

```tsx
import { ComponentProps } from 'react'

// ✅ Extract props từ Button
interface IconButtonProps extends ComponentProps<typeof Button> {
  icon: ReactNode  // Chỉ thêm new prop
}

function IconButton({ icon, ...buttonProps }: IconButtonProps) {
  return (
    <Button {...buttonProps}>
      {icon} {buttonProps.children}
    </Button>
  )
}
```

### 💡 USE CASES:

**1. Extend HTML elements:**

```tsx
// Extract tất cả native button props
interface CustomButtonProps extends ComponentProps<'button'> {
  variant: 'primary' | 'secondary'
}

function CustomButton({ variant, ...buttonProps }: CustomButtonProps) {
  return <button {...buttonProps} className={`btn-${variant}`} />
}

// ✅ Có tất cả native props: disabled, type, onClick, etc.
<CustomButton variant="primary" disabled type="submit" />
```

**2. Omit props khi extend:**

```tsx
// IconButton không cho phép children
interface IconButtonProps extends Omit<ComponentProps<typeof Button>, 'children'> {
  icon: ReactNode
}

function IconButton({ icon, ...buttonProps }: IconButtonProps) {
  return <Button {...buttonProps}>{icon}</Button>
}

// ❌ ERROR - children không được phép
<IconButton icon={<Icon />}>Text</IconButton>
```

---

## 2️⃣ PropsWithChildren<T>

### 🤔 VẤN ĐỀ:

```tsx
interface CardProps {
  title: string
  className?: string
  // ❓ Phải nhớ thêm children manually?
}

function Card({ title, className, children }: CardProps) {
  //                                 ^^^^^^^ ERROR - children doesn't exist
  return <div>{title}{children}</div>
}
```

### ✅ GIẢI PHÁP: `PropsWithChildren<T>`

```tsx
import { PropsWithChildren } from 'react'

interface CardProps {
  title: string
  className?: string
}

// ✅ Tự động thêm children
function Card({ title, className, children }: PropsWithChildren<CardProps>) {
  return (
    <div className={className}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

### 💡 USE CASES:

**1. Layout Components:**

```tsx
function Container({ children }: PropsWithChildren) {
  return <div className="container">{children}</div>
}
```

**2. Card với props + children:**

```tsx
interface CardProps {
  title: string
  footer?: ReactNode
}

function Card({ title, footer, children }: PropsWithChildren<CardProps>) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
```

---

## 🎯 EXERCISE 2 REQUIREMENTS

**Build:** Component Props Extractor

**Features:**
1. Extract props với `ComponentProps<typeof Component>`
2. Extend component props với new props
3. Remove props với `Omit<ComponentProps<T>, K>`
4. PropsWithChildren cho layouts

---

# 📚 PART 3: TYPE GUARDS (Simplified)

## 1️⃣ Built-in Type Guards

### 🤔 VẤN ĐỀ:

```tsx
function printValue(value: string | number) {
  console.log(value.toUpperCase())  // ❌ ERROR - number không có toUpperCase
}
```

### ✅ GIẢI PHÁP: Type Guards

```tsx
// 1. typeof guard
function printValue(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase())  // ✅ value is string
  } else {
    console.log(value.toFixed(2))  // ✅ value is number
  }
}

// 2. in guard
interface User {
  name: string
  email: string
}

interface Admin {
  name: string
  role: string
}

function greet(person: User | Admin) {
  if ('email' in person) {
    console.log(person.email)  // ✅ person is User
  } else {
    console.log(person.role)  // ✅ person is Admin
  }
}
```

---

## 2️⃣ Discriminated Unions

### 🤔 VẤN ĐỀ:

```tsx
type Shape = Circle | Rectangle

interface Circle {
  radius: number
}

interface Rectangle {
  width: number
  height: number
}

function getArea(shape: Shape) {
  // ❌ Làm sao biết shape là Circle hay Rectangle?
  return Math.PI * shape.radius ** 2  // ERROR
}
```

### ✅ GIẢI PHÁP: Discriminated Unions

```tsx
// ✅ Thêm 'kind' discriminant
interface Circle {
  kind: 'circle'  // Literal type
  radius: number
}

interface Rectangle {
  kind: 'rectangle'  // Literal type
  width: number
  height: number
}

type Shape = Circle | Rectangle

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2  // ✅ shape is Circle
    case 'rectangle':
      return shape.width * shape.height  // ✅ shape is Rectangle
  }
}
```

### 💡 USE CASE: Fetch States

```tsx
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function UserProfile() {
  const [state, setState] = useState<FetchState<User>>({ status: 'idle' })

  switch (state.status) {
    case 'idle':
      return <div>Click to load</div>
    case 'loading':
      return <div>Loading...</div>
    case 'success':
      return <div>Welcome {state.data.name}</div>  // ✅ state.data exists
    case 'error':
      return <div>Error: {state.error}</div>  // ✅ state.error exists
  }
}
```

---

## 🎯 EXERCISE 3 REQUIREMENTS (Simplified)

**Build:** Type-safe Fetch Hook

**Features:**
1. Use `typeof` guard cho basic type checking
2. Use Discriminated Union cho fetch states
3. Type-safe state management

---

# ✅ SUMMARY - ĐÃ HỌC GÌ?

## **PART 1: Utility Types (4 types)**
1. ✅ `Partial<T>` - Update forms
2. ✅ `Pick<T, K>` - Select fields
3. ✅ `Omit<T, K>` - Remove fields
4. ✅ `Record<K, V>` - Dynamic objects

## **PART 2: Component Props (2 utilities)**
1. ✅ `ComponentProps<typeof C>` - Extract props
2. ✅ `PropsWithChildren<T>` - Add children

## **PART 3: Type Guards (2 patterns)**
1. ✅ `typeof` và `in` guards
2. ✅ Discriminated Unions

---

# ❌ KHÔNG HỌC (Too Advanced)

- ❌ Polymorphic Components
- ❌ Conditional Types (chỉ hiểu concept)
- ❌ Template Literal Types
- ❌ Custom Type Guards với `is`
- ❌ Assertion Functions
- ❌ Mapped Types

**Lý do:** Những concepts này quá advanced cho Fresher/Junior. Hiểu 6 utilities + 2 type guards patterns ở trên là **ĐỦ** để làm việc hiệu quả.

---

# 🎯 NEXT STEPS

1. ✅ Đọc PART 1 → Code Exercise 1
2. ✅ Đọc PART 2 → Code Exercise 2
3. ✅ Đọc PART 3 → Code Exercise 3
4. ✅ Quiz (10 câu - chỉ cover concepts đã học)
5. ✅ Summary

**Total time:** ~1.5-2h (thay vì 3h+)

**Good luck! 🚀**
