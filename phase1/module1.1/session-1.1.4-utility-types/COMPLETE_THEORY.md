# Session 1.1.4 - Utility Types & Advanced TypeScript - Complete Theory Guide

> Đọc PART tương ứng trước khi làm exercise

---

# 📚 PART 1: UTILITY TYPES - Concepts cho EXERCISE 1

## 1️⃣ Utility Types là gì?

### 🤔 VẤN ĐỀ THỰC TẾ

Bạn có một interface User như thế này:

```tsx
interface User {
  id: number
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  createdAt: Date
}
```

**Vấn đề 1:** Form **đăng ký** chỉ cần `name`, `email`, `password` → Làm sao tránh duplicate interface?

**Vấn đề 2:** Form **update profile** có tất cả fields **optional** → Làm sao không viết lại interface?

**Vấn đề 3:** Dynamic form config với các field names khác nhau → Làm sao type-safe?

**Ví dụ không có solution:**

```tsx
// ❌ BAD - Duplicate interfaces
interface UserRegister {
  name: string
  email: string
  password: string
}

interface UserUpdate {
  id?: number
  name?: string
  email?: string
  password?: string
  role?: 'admin' | 'user'
  createdAt?: Date
}

interface FormErrors {
  nameError: string
  emailError: string
  passwordError: string
}

// Vấn đề:
// - Duplicate code
// - Hard to maintain (thay đổi User → phải sửa 3 interfaces)
// - Error prone (quên update 1 trong 3)
```

---

### 📚 GIẢI PHÁP: TypeScript Utility Types

TypeScript built-in **Utility Types** giúp transform existing types thành new types một cách type-safe.

**Khi nào dùng:**
- ✅ Tránh duplicate type definitions
- ✅ Transform existing types
- ✅ Create variations của một type
- ✅ Type-safe dynamic objects

**Các Utility Types quan trọng:**

| Utility Type | Mục đích | Ví dụ |
|--------------|----------|-------|
| `Partial<T>` | Làm tất cả properties optional | Update forms |
| `Pick<T, K>` | Chọn specific properties | Registration forms |
| `Omit<T, K>` | Loại bỏ specific properties | Sensitive data |
| `Record<K, V>` | Object với dynamic keys | Form errors, configs |

---

## 2️⃣ Partial<T> - Tất cả properties optional

### 📚 Cú pháp:

```tsx
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

**Giải thích:**
- `keyof T`: Lấy tất cả keys của type T
- `[P in keyof T]`: Loop qua tất cả keys
- `?`: Làm mỗi property optional
- `T[P]`: Giữ nguyên type của property

### 💻 Example Code:

```tsx
interface User {
  id: number
  name: string
  email: string
  password: string
}

// ❌ BAD - Manual optional interface
interface UserUpdate {
  id?: number
  name?: string
  email?: string
  password?: string
}

// ✅ GOOD - Dùng Partial<T>
type UserUpdate = Partial<User>

// Usage
function updateUser(id: number, updates: Partial<User>) {
  // updates có thể có 0, 1, hoặc nhiều properties
  // Tất cả đều optional
}

updateUser(1, { name: 'New Name' })              // ✅ OK
updateUser(2, { email: 'new@email.com' })        // ✅ OK
updateUser(3, { name: 'John', password: '123' }) // ✅ OK
updateUser(4, {})                                 // ✅ OK - empty object
```

### 💡 TIPS:

**1. Partial<T> trong React Forms:**

```tsx
interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

function ProfileForm() {
  // ❌ BAD - Full required state
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // ✅ GOOD - Optional state (form có thể incomplete)
  const [formData, setFormData] = useState<Partial<FormData>>({})

  // Có thể update từng field riêng
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
}
```

**2. Kết hợp với Required fields:**

```tsx
// Form cần ít nhất id, nhưng các field khác optional
type UpdateRequest = { id: number } & Partial<User>

function updateUser(data: UpdateRequest) {
  // data.id luôn có (required)
  // data.name, data.email optional
}

updateUser({ id: 1 })                        // ✅ OK
updateUser({ id: 2, name: 'John' })          // ✅ OK
updateUser({ name: 'John' })                 // ❌ ERROR - Missing id
```

---

## 3️⃣ Pick<T, K> - Chọn specific properties

### 📚 Cú pháp:

```tsx
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

**Giải thích:**
- `K extends keyof T`: K phải là keys có trong T
- `[P in K]`: Loop qua các keys được chọn
- `T[P]`: Giữ nguyên type của property

### 💻 Example Code:

```tsx
interface User {
  id: number
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  createdAt: Date
}

// ✅ Registration form - CHỈ CẦN name, email, password
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

### 💡 TIPS:

**1. Multiple Picks:**

```tsx
// Login form - chỉ cần email + password
type LoginForm = Pick<User, 'email' | 'password'>

// Public profile - chỉ show id, name (không show email, password)
type PublicProfile = Pick<User, 'id' | 'name'>

// Display trong list
const users: PublicProfile[] = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
]
```

**2. Pick với Union Types:**

```tsx
type UserFields = 'name' | 'email' | 'password'
type PickedUser = Pick<User, UserFields>

// Có thể reuse UserFields
function validateFields(data: Pick<User, UserFields>) {
  // Validate chỉ 3 fields này
}
```

---

## 4️⃣ Omit<T, K> - Loại bỏ specific properties

### 📚 Cú pháp:

```tsx
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

**Giải thích:**
- `Exclude<keyof T, K>`: Lấy tất cả keys NGOẠI TRỪ K
- `Pick<T, ...>`: Chọn các keys đã exclude

### 💻 Example Code:

```tsx
interface User {
  id: number
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
}

// ✅ GOOD - Loại bỏ sensitive fields
type SafeUser = Omit<User, 'password'>

// Equivalent to:
// interface SafeUser {
//   id: number
//   name: string
//   email: string
//   role: 'admin' | 'user'
// }

// Send to frontend (không gửi password)
function getUserProfile(id: number): SafeUser {
  const user = database.findUser(id)
  const { password, ...safeUser } = user // Destructure để loại bỏ password
  return safeUser
}
```

### 💡 TIPS:

**1. Pick vs Omit - Khi nào dùng gì?**

```tsx
// ✅ Pick - Khi cần ÍT properties (< 50% fields)
type LoginForm = Pick<User, 'email' | 'password'>  // Chỉ 2/5 fields

// ✅ Omit - Khi cần NHIỀU properties (> 50% fields)
type SafeUser = Omit<User, 'password'>  // 4/5 fields, loại bỏ 1
```

**2. Omit nhiều fields:**

```tsx
// Loại bỏ tất cả sensitive fields
type PublicUser = Omit<User, 'password' | 'email' | 'role'>

// Equivalent to Pick
type PublicUser = Pick<User, 'id' | 'name'>
```

**3. Omit trong extends:**

```tsx
// Admin user extends User nhưng không có password field (hashed riêng)
interface AdminUser extends Omit<User, 'password'> {
  hashedPassword: string
  permissions: string[]
}
```

---

## 5️⃣ Record<K, V> - Dynamic object với typed keys

### 📚 Cú pháp:

```tsx
type Record<K extends keyof any, V> = {
  [P in K]: V
}
```

**Giải thích:**
- `K extends keyof any`: K có thể là string, number, symbol
- `[P in K]`: Loop qua tất cả keys trong K
- `V`: Type của value cho tất cả keys

### 💻 Example Code:

```tsx
// ❌ BAD - Manual object type
interface FormErrors {
  name: string
  email: string
  password: string
}

// ✅ GOOD - Dynamic với Record
type FormField = 'name' | 'email' | 'password'
type FormErrors = Record<FormField, string>

// Equivalent to:
// interface FormErrors {
//   name: string
//   email: string
//   password: string
// }

// Usage
const errors: FormErrors = {
  name: 'Name is required',
  email: 'Invalid email',
  password: 'Password too short'
}

// ✅ Type-safe access
console.log(errors.name)     // ✅ OK
console.log(errors.age)      // ❌ ERROR - 'age' không có trong FormField
```

### 💡 TIPS:

**1. Record với keyof:**

```tsx
interface User {
  name: string
  email: string
  password: string
}

// Tạo validation rules cho MỌI field của User
type ValidationRules = Record<keyof User, (value: string) => boolean>

const rules: ValidationRules = {
  name: (value) => value.length > 0,
  email: (value) => value.includes('@'),
  password: (value) => value.length >= 8
}

// ✅ Nếu thêm field mới vào User, TypeScript sẽ báo lỗi ở ValidationRules
```

**2. Record với Union Types:**

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
// ❌ Thiếu 1 status → TypeScript error
```

**3. Partial Record:**

```tsx
// Không bắt buộc tất cả keys
type PartialErrors = Partial<Record<keyof User, string>>

const errors: PartialErrors = {
  name: 'Invalid name'
  // email, password optional
}
```

---

## 6️⃣ Kết hợp Utility Types

### 💻 Real-world Examples:

**Example 1: Form Builder với Validation**

```tsx
interface FormField {
  type: 'text' | 'email' | 'password' | 'number'
  label: string
  placeholder: string
  required: boolean
  defaultValue: string
}

// Form config
type FormConfig = Record<string, FormField>

// Form values (tất cả fields return string)
type FormValues<T extends FormConfig> = Record<keyof T, string>

// Form errors (optional - chỉ show error khi có)
type FormErrors<T extends FormConfig> = Partial<Record<keyof T, string>>

// Usage
const loginForm: FormConfig = {
  email: {
    type: 'email',
    label: 'Email',
    placeholder: 'Enter email',
    required: true,
    defaultValue: ''
  },
  password: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    required: true,
    defaultValue: ''
  }
}

const values: FormValues<typeof loginForm> = {
  email: 'user@example.com',
  password: 'secret123'
}

const errors: FormErrors<typeof loginForm> = {
  email: 'Invalid email format'
  // password không có error → optional
}
```

**Example 2: API Response Transformation**

```tsx
interface ApiUser {
  id: number
  username: string
  email: string
  password_hash: string
  created_at: string
  updated_at: string
}

// Frontend chỉ cần subset + rename
type FrontendUser = Pick<ApiUser, 'id' | 'username' | 'email'>

// Update API - tất cả optional ngoại trừ id
type UpdateUserRequest = { id: number } & Partial<Omit<ApiUser, 'id' | 'password_hash'>>

function updateUser(data: UpdateUserRequest) {
  // data.id luôn có
  // data.username, data.email optional
  // data.password_hash KHÔNG được gửi
}
```

---

## 🎯 REQUIREMENTS RECAP - EXERCISE 1

**Bạn sẽ build:** Form Builder với Utility Types

**Features:**
1. ✅ Dynamic form config với `Record<K, V>`
2. ✅ Form values type-safe với `Record<keyof T, string>`
3. ✅ Optional form errors với `Partial<Record<K, V>>`
4. ✅ Field selection với `Pick<T, K>`
5. ✅ Sensitive field removal với `Omit<T, K>`

**Skills:**
- Hiểu cách hoạt động của Partial, Pick, Omit, Record
- Kết hợp utility types
- Type-safe form handling
- Generic types với utility types

---

# 📚 PART 2: COMPONENT PROPS PATTERNS - Concepts cho EXERCISE 2

## 1️⃣ Component Props Extraction

### 🤔 VẤN ĐỀ THỰC TẾ

Bạn có 1 button component:

```tsx
function Button({ variant, size, children, onClick }: ButtonProps) {
  return <button>...</button>
}
```

**Vấn đề:** Bạn muốn tạo `IconButton` component **extend** tất cả props của `Button` + thêm `icon` prop.

**Cách thông thường:**

```tsx
// ❌ BAD - Duplicate ButtonProps
interface IconButtonProps {
  variant: 'primary' | 'secondary'  // Duplicate
  size: 'sm' | 'md' | 'lg'          // Duplicate
  children: ReactNode               // Duplicate
  onClick: () => void               // Duplicate
  icon: ReactNode                   // New prop
}
```

**Vấn đề:**
- Duplicate props definition
- Khi ButtonProps thay đổi → IconButtonProps phải update manually
- Error prone

---

### 📚 GIẢI PHÁP: ComponentProps<typeof Component>

TypeScript cung cấp built-in utility để **extract props từ component**.

```tsx
import { ComponentProps } from 'react'

// ✅ GOOD - Extract props từ Button
type ButtonProps = ComponentProps<typeof Button>

interface IconButtonProps extends ButtonProps {
  icon: ReactNode  // Chỉ thêm new prop
}
```

**Cách hoạt động:**
- `typeof Button`: Lấy type của Button component
- `ComponentProps<...>`: Extract props type từ component type
- `extends ButtonProps`: Kế thừa tất cả props

---

### 💻 Example Code:

```tsx
// Original Button component
interface ButtonProps {
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
  children: ReactNode
  onClick?: () => void
}

function Button({ variant, size, children, onClick }: ButtonProps) {
  return (
    <button className={`btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  )
}

// ✅ Extract props using ComponentProps
type ExtractedButtonProps = ComponentProps<typeof Button>

// ✅ Extend với new props
interface IconButtonProps extends ComponentProps<typeof Button> {
  icon: ReactNode
  iconPosition?: 'left' | 'right'
}

function IconButton({
  icon,
  iconPosition = 'left',
  children,
  ...buttonProps
}: IconButtonProps) {
  return (
    <Button {...buttonProps}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </Button>
  )
}

// Usage
<IconButton
  variant="primary"
  size="md"
  icon={<StarIcon />}
  iconPosition="left"
  onClick={() => console.log('clicked')}
>
  Favorite
</IconButton>
```

---

### 💡 TIPS:

**1. ComponentProps vs ComponentPropsWithoutRef:**

```tsx
// ComponentProps - Bao gồm ref
type ButtonProps = ComponentProps<'button'>  // HTMLButtonElement props + ref

// ComponentPropsWithoutRef - Không bao gồm ref (phổ biến hơn)
type ButtonPropsWithoutRef = ComponentPropsWithoutRef<'button'>
```

**2. Extract từ HTML elements:**

```tsx
// Extract tất cả props của button element
type NativeButtonProps = ComponentProps<'button'>

// Tương đương:
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

// Usage
interface CustomButtonProps extends ComponentProps<'button'> {
  variant: 'primary' | 'secondary'
}

function CustomButton({ variant, ...buttonProps }: CustomButtonProps) {
  return <button {...buttonProps} className={`btn-${variant}`} />
}

// ✅ Có tất cả native button props: disabled, type, onClick, etc.
<CustomButton variant="primary" disabled type="submit" onClick={handleClick}>
  Submit
</CustomButton>
```

**3. Omit props khi extend:**

```tsx
// IconButton không cho phép children (chỉ icon)
interface IconButtonProps extends Omit<ComponentProps<typeof Button>, 'children'> {
  icon: ReactNode
}

function IconButton({ icon, ...buttonProps }: IconButtonProps) {
  return <Button {...buttonProps}>{icon}</Button>
}

// ❌ ERROR - children không được phép
<IconButton variant="primary" size="md" icon={<Icon />}>
  Text
</IconButton>
```

---

## 2️⃣ PropsWithChildren Pattern

### 🤔 VẤN ĐỀ THỰC TẾ

**Tình huống phổ biến:**

```tsx
interface CardProps {
  title: string
  className?: string
  // ❓ Làm sao thêm children typing?
}

function Card({ title, className, children }: CardProps) {
  //                                 ^^^^^^^ Lỗi: 'children' doesn't exist
  return (
    <div className={className}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

**Cách thông thường:**

```tsx
// ❌ BAD - Manual children typing
interface CardProps {
  title: string
  className?: string
  children?: ReactNode  // Phải nhớ thêm thủ công
}
```

---

### 📚 GIẢI PHÁP: PropsWithChildren<T>

React cung cấp `PropsWithChildren<T>` utility type.

```tsx
import { PropsWithChildren } from 'react'

// ✅ GOOD - Tự động thêm children
interface CardProps {
  title: string
  className?: string
}

function Card({ title, className, children }: PropsWithChildren<CardProps>) {
  return (
    <div className={className}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

**Định nghĩa của PropsWithChildren:**

```tsx
type PropsWithChildren<P = unknown> = P & { children?: ReactNode }
```

**Giải thích:**
- `P & { children?: ReactNode }`: Intersect P với `{ children?: ReactNode }`
- Tự động thêm `children` optional prop
- Không cần define thủ công

---

### 💻 Example Code:

```tsx
// Component chỉ accept children (không có props khác)
function Container({ children }: PropsWithChildren) {
  return <div className="container">{children}</div>
}

// Component với props + children
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

// Usage
<Card title="Profile" footer={<button>Edit</button>}>
  <p>User profile content here</p>
</Card>
```

---

### 💡 TIPS:

**1. Khi nào dùng PropsWithChildren:**

```tsx
// ✅ DÙNG khi component LUÔN LUÔN accept children
function Layout({ children }: PropsWithChildren) {
  return <main>{children}</main>
}

// ❌ KHÔNG DÙNG khi component KHÔNG accept children
interface ButtonProps {
  label: string  // Children không cần thiết
}

function Button({ label }: ButtonProps) {
  return <button>{label}</button>
}
```

**2. Required children:**

```tsx
// PropsWithChildren mặc định children optional
type PropsWithChildren<P> = P & { children?: ReactNode }

// Tự define required children
type PropsWithRequiredChildren<P> = P & { children: ReactNode }

interface LayoutProps {
  title: string
}

function Layout({ title, children }: PropsWithRequiredChildren<LayoutProps>) {
  return (
    <div>
      <h1>{title}</h1>
      {children}  {/* children bắt buộc */}
    </div>
  )
}

// ❌ ERROR - Missing children
<Layout title="Home" />

// ✅ OK
<Layout title="Home">
  <p>Content</p>
</Layout>
```

---

## 3️⃣ Polymorphic Components

### 🤔 VẤN ĐỀ THỰC TẾ

Bạn muốn tạo `Text` component có thể render as different HTML elements:

```tsx
<Text as="h1">Heading</Text>
<Text as="p">Paragraph</Text>
<Text as="span">Span</Text>
<Text as="a" href="/about">Link</Text>  {/* href chỉ có khi as="a" */}
```

**Vấn đề:**
- Làm sao type `as` prop?
- Làm sao đảm bảo props phù hợp với element được chọn?
- `href` chỉ valid khi `as="a"`, không phải `as="p"`

---

### 📚 GIẢI PHÁP: Polymorphic Component Pattern

```tsx
type PolymorphicComponentProps<E extends React.ElementType> = {
  as?: E
  children: ReactNode
} & Omit<ComponentProps<E>, 'as' | 'children'>

function Text<E extends React.ElementType = 'span'>({
  as,
  children,
  ...props
}: PolymorphicComponentProps<E>) {
  const Component = as || 'span'
  return <Component {...props}>{children}</Component>
}
```

---

### 💻 Example Code:

```tsx
// Định nghĩa Polymorphic Props
type TextProps<E extends React.ElementType> = {
  as?: E
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<E>, keyof { as?: E; children: ReactNode; className?: string }>

function Text<E extends React.ElementType = 'span'>({
  as,
  children,
  className,
  ...props
}: TextProps<E>) {
  const Component = as || 'span'
  return (
    <Component className={`text ${className}`} {...props}>
      {children}
    </Component>
  )
}

// Usage - TypeScript infers correct props based on 'as'
<Text as="h1">Heading</Text>
<Text as="p">Paragraph</Text>
<Text as="a" href="/about">Link</Text>  {/* ✅ href valid */}
<Text as="button" onClick={() => {}}>Button</Text>  {/* ✅ onClick valid */}

// ❌ ERROR - href not valid for 'p'
<Text as="p" href="/about">Paragraph</Text>
```

---

### 💡 TIPS:

**1. Default Element Type:**

```tsx
// Default 'span' nếu không có 'as'
function Text<E extends React.ElementType = 'span'>(props: TextProps<E>) {
  const Component = props.as || 'span'
  return <Component {...props} />
}

<Text>Default span</Text>  {/* Renders as <span> */}
```

**2. Restrict Allowed Elements:**

```tsx
// Chỉ cho phép heading elements
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type HeadingProps<E extends HeadingElement> = {
  as?: E
  children: ReactNode
} & Omit<ComponentProps<E>, 'as' | 'children'>

function Heading<E extends HeadingElement = 'h2'>(props: HeadingProps<E>) {
  const Component = props.as || 'h2'
  return <Component {...props} />
}

<Heading as="h1">Title</Heading>  {/* ✅ OK */}
<Heading as="p">Text</Heading>    {/* ❌ ERROR - 'p' not allowed */}
```

---

## 🎯 REQUIREMENTS RECAP - EXERCISE 2

**Bạn sẽ build:** Component Props Extractor

**Features:**
1. ✅ Extract props từ existing component với `ComponentProps<typeof Component>`
2. ✅ Extend component props với new props
3. ✅ Remove props với `Omit<ComponentProps<T>, K>`
4. ✅ PropsWithChildren pattern cho layouts
5. ✅ Polymorphic component với dynamic element types

**Skills:**
- Component props extraction
- Props composition và extension
- PropsWithChildren usage
- Polymorphic component patterns
- Type-safe component APIs

---

# 📚 PART 3: ADVANCED TYPE PATTERNS - Concepts cho EXERCISE 3

## 1️⃣ Conditional Types

### 🤔 VẤN ĐỀ THỰC TẾ

Bạn có function `getValue` lấy value từ object:

```tsx
function getValue(obj: any, key: string): any {
  return obj[key]
}

const user = { name: 'John', age: 30 }
const name = getValue(user, 'name')  // Type: any 😞
```

**Vấn đề:** Return type là `any`, không type-safe!

**Mong muốn:** Return type phụ thuộc vào `key`:
- `getValue(user, 'name')` → return `string`
- `getValue(user, 'age')` → return `number`

---

### 📚 GIẢI PHÁP: Conditional Types

```tsx
type ConditionalType = T extends U ? X : Y
```

**Giải thích:**
- Giống ternary operator: `condition ? true : false`
- `T extends U`: Check if T is assignable to U
- `? X`: If true, type is X
- `: Y`: If false, type is Y

### 💻 Example Code:

**Example 1: Basic Conditional Type**

```tsx
type IsString<T> = T extends string ? true : false

type A = IsString<string>   // type A = true
type B = IsString<number>   // type B = false
type C = IsString<'hello'>  // type C = true
```

**Example 2: Extract Return Type**

```tsx
// Built-in ReturnType utility
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never

function getUser() {
  return { name: 'John', age: 30 }
}

type User = ReturnType<typeof getUser>
// type User = { name: string; age: number }
```

**Example 3: Type-safe getValue**

```tsx
function getValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'John', age: 30 }
const name = getValue(user, 'name')  // Type: string ✅
const age = getValue(user, 'age')    // Type: number ✅
```

---

### 💡 TIPS:

**1. Infer Keyword trong Conditional Types:**

```tsx
// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : never

type StringArray = ElementType<string[]>  // type StringArray = string
type NumberArray = ElementType<number[]>  // type NumberArray = number
type NotArray = ElementType<string>       // type NotArray = never

// Extract Promise resolved type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

type A = UnwrapPromise<Promise<string>>  // type A = string
type B = UnwrapPromise<number>           // type B = number
```

**2. Distributive Conditional Types:**

```tsx
type ToArray<T> = T extends any ? T[] : never

type A = ToArray<string | number>
// Distributes over union:
// ToArray<string> | ToArray<number>
// string[] | number[]

// VS Non-distributive (wrap in [T]):
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never

type B = ToArrayNonDist<string | number>
// (string | number)[]  - NOT distributed
```

---

## 2️⃣ Type Guards & Narrowing

### 🤔 VẤN ĐỀ THỰC TẾ

```tsx
function printValue(value: string | number) {
  console.log(value.toUpperCase())  // ❌ ERROR - toUpperCase doesn't exist on number
}
```

**Vấn đề:** Union type `string | number` không có `toUpperCase()` method.

**Mong muốn:** Check type trước khi call method.

---

### 📚 GIẢI PHÁP: Type Guards

Type guards là expressions/functions check type at runtime, giúp TypeScript **narrow** type.

**Built-in Type Guards:**

```tsx
// 1. typeof guard
function printValue(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase())  // ✅ value is string
  } else {
    console.log(value.toFixed(2))  // ✅ value is number
  }
}

// 2. instanceof guard
function handleError(error: Error | string) {
  if (error instanceof Error) {
    console.log(error.message)  // ✅ error is Error
  } else {
    console.log(error)  // ✅ error is string
  }
}

// 3. in guard
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

### 📚 Custom Type Guards (User-defined)

```tsx
// Type predicate: `value is Type`
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function printValue(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase())  // ✅ value is string
  }
}
```

---

### 💻 Example Code:

**Example 1: API Response Type Guard**

```tsx
interface SuccessResponse {
  success: true
  data: any
}

interface ErrorResponse {
  success: false
  error: string
}

type ApiResponse = SuccessResponse | ErrorResponse

// ✅ Type guard using discriminated union
function handleResponse(response: ApiResponse) {
  if (response.success) {
    console.log(response.data)  // ✅ response is SuccessResponse
  } else {
    console.error(response.error)  // ✅ response is ErrorResponse
  }
}
```

**Example 2: Custom Type Guard for Objects**

```tsx
interface User {
  id: number
  name: string
  email: string
}

// Type guard function
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  )
}

// Usage
function processData(data: unknown) {
  if (isUser(data)) {
    console.log(data.name)  // ✅ data is User
  } else {
    console.log('Invalid user data')
  }
}
```

---

### 💡 TIPS:

**1. Type Predicates Best Practices:**

```tsx
// ✅ GOOD - Thorough check
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj && typeof (obj as any).id === 'number' &&
    'name' in obj && typeof (obj as any).name === 'string' &&
    'email' in obj && typeof (obj as any).email === 'string'
  )
}

// ❌ BAD - Weak check
function isUser(obj: unknown): obj is User {
  return obj !== null  // Too loose!
}
```

**2. Assertion Functions:**

```tsx
// Assertion function (throws if false)
function assertIsUser(obj: unknown): asserts obj is User {
  if (!isUser(obj)) {
    throw new Error('Not a user')
  }
}

function processUser(data: unknown) {
  assertIsUser(data)
  // After assertion, data is User
  console.log(data.name)  // ✅ No if needed
}
```

---

## 3️⃣ Discriminated Unions

### 🤔 VẤN ĐỀ THỰC TẾ

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
  // ❌ How to know if shape is Circle or Rectangle?
  return Math.PI * shape.radius ** 2  // ERROR - radius doesn't exist on Rectangle
}
```

---

### 📚 GIẢI PHÁP: Discriminated Unions

Thêm **discriminant property** (common property với literal types) để distinguish unions.

```tsx
// ✅ GOOD - Add 'kind' discriminant
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

---

### 💻 Example Code:

**Example 1: Fetch States**

```tsx
// Discriminated union cho fetch states
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: 'idle' })

  useEffect(() => {
    setState({ status: 'loading' })

    fetch(url)
      .then(res => res.json())
      .then(data => setState({ status: 'success', data }))
      .catch(error => setState({ status: 'error', error: error.message }))
  }, [url])

  return state
}

// Usage with type narrowing
function UserProfile() {
  const state = useFetch<User>('/api/user')

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

**Example 2: Form Actions**

```tsx
type FormAction =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'RESET_FORM' }
  | { type: 'SUBMIT_FORM' }

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      // ✅ action.field và action.value exist
      return { ...state, [action.field]: action.value }
    case 'RESET_FORM':
      // ✅ No extra properties
      return initialState
    case 'SUBMIT_FORM':
      // ✅ No extra properties
      return { ...state, submitting: true }
  }
}
```

---

### 💡 TIPS:

**1. Exhaustive Checking:**

```tsx
function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'rectangle':
      return shape.width * shape.height
    default:
      // Exhaustive check
      const _exhaustiveCheck: never = shape
      throw new Error(`Unhandled shape: ${_exhaustiveCheck}`)
  }
}

// Nếu thêm Triangle nhưng quên handle trong switch:
// ❌ ERROR - Type 'Triangle' is not assignable to type 'never'
```

**2. Multiple Discriminants:**

```tsx
// Có thể có nhiều discriminant properties
type Action =
  | { type: 'user'; action: 'login'; username: string }
  | { type: 'user'; action: 'logout' }
  | { type: 'admin'; action: 'delete'; userId: number }

function handleAction(action: Action) {
  if (action.type === 'user') {
    if (action.action === 'login') {
      console.log(action.username)  // ✅
    }
  }
}
```

---

## 4️⃣ Template Literal Types

### 🤔 VẤN ĐỀ THỰC TẾ

Bạn có event system với naming convention: `on${EventName}`:

```tsx
// ❌ BAD - Manual typing
type EventHandlers = {
  onClick: () => void
  onHover: () => void
  onFocus: () => void
  onBlur: () => void
}

// Vấn đề: Phải manually type tất cả event names
```

---

### 📚 GIẢI PHÁP: Template Literal Types

```tsx
type Event = 'Click' | 'Hover' | 'Focus' | 'Blur'

// ✅ GOOD - Generate event handler names
type EventHandler = `on${Event}`
// type EventHandler = 'onClick' | 'onHover' | 'onFocus' | 'onBlur'

type EventHandlers = Record<EventHandler, () => void>
```

---

### 💻 Example Code:

**Example 1: CSS Property Names**

```tsx
type CSSProperty = 'color' | 'fontSize' | 'margin'
type CSSValue = string

// Generate CSS variables: --color, --fontSize, --margin
type CSSVariable = `--${CSSProperty}`

type CSSVariables = Record<CSSVariable, CSSValue>

const styles: CSSVariables = {
  '--color': 'red',
  '--fontSize': '16px',
  '--margin': '10px'
}
```

**Example 2: API Endpoints**

```tsx
type Resource = 'users' | 'posts' | 'comments'
type Action = 'get' | 'create' | 'update' | 'delete'

// Generate: 'get-users', 'create-users', 'update-users', ...
type Endpoint = `${Action}-${Resource}`

type EndpointHandlers = Record<Endpoint, (data: any) => Promise<void>>

const handlers: EndpointHandlers = {
  'get-users': async (data) => {},
  'create-users': async (data) => {},
  'update-users': async (data) => {},
  'delete-users': async (data) => {},
  // ... 12 total combinations
}
```

**Example 3: Type-safe Form Field Names**

```tsx
type FormField = 'name' | 'email' | 'password'

// Generate: 'nameError', 'emailError', 'passwordError'
type ErrorField = `${FormField}Error`

type FormErrors = Partial<Record<ErrorField, string>>

const errors: FormErrors = {
  nameError: 'Name is required',
  emailError: 'Invalid email'
}
```

---

### 💡 TIPS:

**1. Uppercase/Lowercase/Capitalize:**

```tsx
type Event = 'click' | 'hover'

type CapitalizedEvent = Capitalize<Event>
// type CapitalizedEvent = 'Click' | 'Hover'

type UppercaseEvent = Uppercase<Event>
// type UppercaseEvent = 'CLICK' | 'HOVER'

type LowercaseEvent = Lowercase<Event>
// type LowercaseEvent = 'click' | 'hover'

// Usage
type EventHandler = `on${Capitalize<Event>}`
// type EventHandler = 'onClick' | 'onHover'
```

**2. Combining with Mapped Types:**

```tsx
type Events = {
  click: { x: number; y: number }
  hover: { elementId: string }
}

// Generate event handlers
type EventHandlers = {
  [K in keyof Events as `on${Capitalize<K & string>}`]: (event: Events[K]) => void
}

// Result:
// type EventHandlers = {
//   onClick: (event: { x: number; y: number }) => void
//   onHover: (event: { elementId: string }) => void
// }
```

---

## 🎯 REQUIREMENTS RECAP - EXERCISE 3

**Bạn sẽ build:** Advanced Type Patterns

**Features:**
1. ✅ Conditional types cho type transformation
2. ✅ Type guards cho runtime type checking
3. ✅ Discriminated unions cho state management
4. ✅ Exhaustive checking với `never` type
5. ✅ Template literal types cho dynamic keys

**Skills:**
- Conditional type syntax và usage
- Custom type guards với type predicates
- Discriminated unions for type narrowing
- Exhaustive switch checks
- Template literal types for dynamic APIs

---

# 🎉 SESSION THEORY COMPLETE

Bạn đã học đầy đủ concepts cho **Session 1.1.4: Utility Types & Advanced TypeScript**.

**Next Steps:**
1. ✅ Đọc toàn bộ PART 1
2. ✅ Code Exercise 1: FormBuilder
3. ✅ Gửi code → AI review
4. ✅ Trong lúc chờ → Đọc PART 2
5. ✅ Tiếp tục Exercise 2, 3
6. ✅ Quiz sau khi xong 3 exercises
7. ✅ Summary & update progress

**Good luck! 🚀**
