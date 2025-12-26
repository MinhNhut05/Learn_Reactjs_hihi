# Session 1.1.1 - Complete Theory Guide

> Đọc PART tương ứng trước khi làm exercise. Mỗi PART độc lập, có đầy đủ kiến thức cần thiết.

---

# 📚 PART 1: Concepts cho EXERCISE 1 (Button Component)

## ✅ ĐÃ HOÀN THÀNH
Bạn đã làm xong Exercise 1 hoàn hảo! Skip phần này.

---

# 📚 PART 2: Concepts cho EXERCISE 2 (Card Component)

> **Đọc phần này trước khi làm Exercise 2**

## 1️⃣ ReactNode Type - Children Typing

### 🤔 Vấn đề:

Components thường nhận **children** (nội dung bên trong):
```tsx
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

TypeScript cần biết `children` có type gì?

---

### 📚 Giải pháp: ReactNode

**ReactNode** là type cho **bất cứ thứ gì có thể render**:

```tsx
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode  // ← Type này
}

function Card({ children }: CardProps) {
  return <div>{children}</div>
}
```

**ReactNode chấp nhận:**
- ✅ String: `<Card>Hello</Card>`
- ✅ Number: `<Card>{123}</Card>`
- ✅ JSX element: `<Card><div>Content</div></Card>`
- ✅ Array: `<Card>{items.map(...)}</Card>`
- ✅ null/undefined: `<Card>{loading ? null : <Content />}</Card>`
- ✅ Boolean (không render): `<Card>{isActive && <Badge />}</Card>`

---

### 💻 Example Code:

```tsx
import { ReactNode } from 'react'

interface CardProps {
  title: string       // Text title (required)
  children: ReactNode // Flexible content (required)
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  )
}

// ✅ Usage - tất cả đều OK
<Card title="Profile">
  <p>John Doe</p>
</Card>

<Card title="Products">
  {products.map(p => <div key={p.id}>{p.name}</div>)}
</Card>

<Card title="Status">
  {isLoading ? <Spinner /> : <Content />}
</Card>
```

---

## 2️⃣ Optional ReactNode Props

### 🤔 Vấn đề:

Không phải lúc nào cũng cần footer:
```tsx
<Card title="Basic">Content</Card>              // Không có footer
<Card title="Full" footer="Updated">Content</Card>  // Có footer
```

---

### 📚 Giải pháp: Optional với `?`

```tsx
interface CardProps {
  title: string
  children: ReactNode
  footer?: ReactNode  // ← Optional, có thể undefined
}
```

**Khi render:**
```tsx
function Card({ title, children, footer }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>

      {/* Chỉ render khi footer có giá trị */}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
```

**Giải thích `{footer && ...}`:**
- Nếu `footer` là `undefined` → không render gì
- Nếu `footer` có giá trị → render `<div className="card-footer">`

---

### 💻 Example Code:

```tsx
interface CardProps {
  title: string
  children: ReactNode
  footer?: ReactNode  // Optional
}

function Card({ title, children, footer }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

// ✅ Usage
<Card title="Simple">Just content, no footer</Card>

<Card title="With Footer" footer="Last updated: 2025">
  Content here
</Card>

<Card title="Dynamic" footer={user.isAdmin ? <AdminTools /> : null}>
  Main content
</Card>
```

---

## 3️⃣ ClassName Merging

### 🤔 Vấn đề:

Component có className mặc định `"card"`, nhưng user muốn thêm custom class:
```tsx
<Card className="highlight">...</Card>
// Muốn kết quả: className="card highlight"
```

---

### 📚 Giải pháp: Merge className

```tsx
interface CardProps {
  title: string
  children: ReactNode
  footer?: ReactNode
  className?: string  // ← Custom className (optional)
}

function Card({ title, children, footer, className }: CardProps) {
  // Merge: base class + custom class
  const cardClass = className ? `card ${className}` : 'card'

  return (
    <div className={cardClass}>
      {/* ... */}
    </div>
  )
}
```

**Cách hoạt động:**
- Nếu `className` undefined → dùng `"card"`
- Nếu `className = "highlight"` → dùng `"card highlight"`

---

### 💻 Example Code:

```tsx
interface CardProps {
  title: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

function Card({ title, children, footer, className }: CardProps) {
  // Method 1: Ternary
  const cardClass = className ? `card ${className}` : 'card'

  // Method 2: Template string (always safe)
  // const cardClass = `card ${className || ''}`

  return (
    <div className={cardClass}>
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

// ✅ Usage
<Card title="Default">
  Regular card with className="card"
</Card>

<Card title="Highlighted" className="highlight">
  Card with className="card highlight"
</Card>

<Card title="Custom" className="large bordered">
  Card with className="card large bordered"
</Card>
```

---

## 4️⃣ Conditional Rendering Patterns

### Pattern 1: && operator
```tsx
{footer && <div>{footer}</div>}
// Nếu footer có giá trị → render
// Nếu footer undefined/null → không render
```

### Pattern 2: Ternary
```tsx
{isLoading ? <Spinner /> : <Content />}
// Nếu loading → render Spinner
// Nếu không → render Content
```

### Pattern 3: Early return
```tsx
function Card({ title, children }: CardProps) {
  if (!children) return null  // Không render gì nếu không có children

  return <div>...</div>
}
```

---

## 🎯 EXERCISE 2 REQUIREMENTS RECAP

Bạn cần implement:

```tsx
interface CardProps {
  title: string          // Required
  children: ReactNode    // Required
  footer?: ReactNode     // Optional
  className?: string     // Optional
}

function Card({ title, children, footer, className }: CardProps) {
  // TODO: Merge className
  const cardClass = /* ... */

  return (
    <div className={cardClass}>
      {/* TODO: Render header với title */}
      {/* TODO: Render body với children */}
      {/* TODO: Render footer nếu có */}
    </div>
  )
}
```

**Test cases:**
1. Card với title + children
2. Card với footer
3. Card với custom className
4. Card với tất cả props

---

## 💡 TIPS cho Exercise 2:

1. **Import ReactNode:**
   ```tsx
   import { ReactNode } from 'react'
   ```

2. **Conditional rendering:**
   ```tsx
   {footer && <div className="card-footer">{footer}</div>}
   ```

3. **ClassName merge:**
   ```tsx
   const cardClass = className ? `card ${className}` : 'card'
   ```

4. **Test trong browser:**
   - Card không footer → không thấy footer section
   - Card có custom class → inspect element xem className

---

# 📚 PART 3: Concepts cho EXERCISE 3 (Generic List)

> **Đọc phần này sau khi hoàn thành Exercise 2**

## 1️⃣ Problem: Code Duplication

### 🤔 Vấn đề:

Bạn cần hiển thị lists của nhiều types khác nhau:

```tsx
// UserList
function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}

// ProductList
function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.title}</li>)}
    </ul>
  )
}

// TodoList
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map(t => <li key={t.id}>{t.text}</li>)}
    </ul>
  )
}
```

**Problem:** Code lặp lại, chỉ khác type và render logic!

---

## 2️⃣ Solution: Generic Component

### 📚 Generic Types `<T>`

**Generic** = placeholder cho type, được xác định khi sử dụng.

```tsx
// Generic interface
interface ListProps<T> {
  items: T[]  // Array của type T (chưa biết T là gì)
}

// Generic component
function List<T>({ items }: ListProps<T>) {
  // T được infer khi dùng
}
```

**Khi sử dụng:**
```tsx
<List<User> items={users} />     // T = User
<List<Product> items={products} /> // T = Product
<List<string> items={tags} />      // T = string
```

---

### 💻 Example: Simple Generic List

```tsx
interface ListProps<T> {
  items: T[]
}

function List<T>({ items }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{String(item)}</li>
      ))}
    </ul>
  )
}

// ✅ Usage
<List<number> items={[1, 2, 3]} />
<List<string> items={['React', 'Vue', 'Angular']} />
```

**Vấn đề:** Chỉ hiển thị được string, không custom được render!

---

## 3️⃣ Render Props Pattern

### 🤔 Vấn đề:

Mỗi item render khác nhau:
- User: `{name} - {email}`
- Product: `{title} - ${price}`
- Todo: checkbox + text

Làm sao cho phép user custom render?

---

### 📚 Giải pháp: renderItem Function

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode  // ← Function để render
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}
```

**Usage:**
```tsx
<List<User>
  items={users}
  renderItem={(user) => (
    <div>
      <strong>{user.name}</strong> - {user.email}
    </div>
  )}
/>
```

**Magic:** TypeScript biết `user` có type `User` → autocomplete hoạt động!

---

### 💻 Example Code:

```tsx
interface User {
  id: number
  name: string
  email: string
}

interface Product {
  id: number
  title: string
  price: number
}

interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={index} className="list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

// ✅ Usage với User
const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]

<List<User>
  items={users}
  renderItem={(user) => (
    <div>
      {user.name} - {user.email}
      {/* TypeScript biết user.name, user.email exist! */}
    </div>
  )}
/>

// ✅ Usage với Product
const products: Product[] = [
  { id: 1, title: 'Laptop', price: 999 },
  { id: 2, title: 'Mouse', price: 29 },
]

<List<Product>
  items={products}
  renderItem={(product) => (
    <div>
      {product.title} - ${product.price}
      {/* TypeScript biết product.title, product.price exist! */}
    </div>
  )}
/>
```

---

## 4️⃣ Key Extractor Pattern

### 🤔 Vấn đề:

Dùng `index` làm key không tốt:
```tsx
<li key={index}>...</li>  // ❌ Bad practice
```

Mỗi type có key field khác nhau:
- User: `id`
- Product: `id` hoặc `sku`
- Tag (string): chính nó

---

### 📚 Giải pháp: keyExtractor Function

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number  // ← Lấy unique key
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
```

**Usage:**
```tsx
<List<User>
  items={users}
  renderItem={(user) => user.name}
  keyExtractor={(user) => user.id}  // ← Dùng id làm key
/>

<List<string>
  items={tags}
  renderItem={(tag) => tag}
  keyExtractor={(tag) => tag}  // ← Dùng chính nó làm key
/>
```

---

### 💻 Complete Example:

```tsx
interface User {
  id: number
  name: string
  email: string
}

interface Product {
  id: number
  title: string
  price: number
}

interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={keyExtractor(item)} className="list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

// ✅ Usage
const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]

<List<User>
  items={users}
  renderItem={(user) => (
    <div>
      <strong>{user.name}</strong>
      <br />
      {user.email}
    </div>
  )}
  keyExtractor={(user) => user.id}
/>

const products: Product[] = [
  { id: 1, title: 'Laptop', price: 999 },
  { id: 2, title: 'Mouse', price: 29 },
]

<List<Product>
  items={products}
  renderItem={(product) => (
    <div>
      {product.title} - <span style={{ color: 'green' }}>${product.price}</span>
    </div>
  )}
  keyExtractor={(product) => product.id}
/>

const tags: string[] = ['React', 'TypeScript', 'Vite']

<List<string>
  items={tags}
  renderItem={(tag) => <span className="badge">{tag}</span>}
  keyExtractor={(tag) => tag}
/>
```

---

## 5️⃣ Type Inference Magic

### TypeScript tự động infer type:

```tsx
// Cách 1: Explicit type
<List<User> items={users} ... />
// TypeScript biết T = User

// Cách 2: Type inference (tự động)
<List items={users} ... />
// TypeScript infer T = User từ type của users

// Trong renderItem:
renderItem={(user) => {
  // TypeScript biết user: User
  user.name  // ✅ Autocomplete hoạt động
  user.email // ✅ Autocomplete hoạt động
  user.age   // ❌ Error: Property 'age' does not exist
}}
```

**Benefits:**
- ✅ Full autocomplete
- ✅ Type safety
- ✅ Catch errors ngay khi code

---

## 🎯 EXERCISE 3 REQUIREMENTS RECAP

Bạn cần implement:

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={keyExtractor(item)} className="list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
```

**Test với 3 types:**
1. `List<User>` - Hiển thị name + email
2. `List<Product>` - Hiển thị title + price
3. `List<string>` - Hiển thị tags

---

## 💡 TIPS cho Exercise 3:

1. **Import ReactNode:**
   ```tsx
   import { ReactNode } from 'react'
   ```

2. **Define types cho test data:**
   ```tsx
   interface User {
     id: number
     name: string
     email: string
   }
   ```

3. **Generic syntax:**
   ```tsx
   // Interface
   interface ListProps<T> { ... }

   // Component
   function List<T>({ ... }: ListProps<T>) { ... }

   // Usage
   <List<User> items={users} ... />
   ```

4. **Map with key:**
   ```tsx
   {items.map((item) => (
     <li key={keyExtractor(item)}>
       {renderItem(item)}
     </li>
   ))}
   ```

5. **Test autocomplete:**
   - Trong `renderItem={(user) => ...}` → gõ `user.` → thấy autocomplete
   - Chứng tỏ type inference hoạt động

---

## 📊 COMPARISON: Generic vs Non-Generic

### ❌ Without Generics (BAD):
```tsx
// Phải tạo 3 components
function UserList({ users }) { ... }
function ProductList({ products }) { ... }
function TodoList({ todos }) { ... }

// Code lặp lại, khó maintain
```

### ✅ With Generics (GOOD):
```tsx
// 1 component, reuse cho tất cả types
function List<T>({ items, renderItem, keyExtractor }) { ... }

// Usage
<List<User> ... />
<List<Product> ... />
<List<Todo> ... />

// DRY, type-safe, maintainable
```

---

## 🎯 SUCCESS CRITERIA

Exercise 3 thành công khi:
- ✅ List component works với User, Product, string
- ✅ TypeScript autocomplete hoạt động trong renderItem
- ✅ Không có type errors
- ✅ Keys được extract đúng (không dùng index)
- ✅ Render custom cho mỗi type

---

# 🎉 TÓM TẮT SESSION 1.1.1

## Concepts đã học:

### Exercise 1: Button
- ✅ Interface cho Props
- ✅ Optional props với `?`
- ✅ Default values
- ✅ Union types

### Exercise 2: Card
- ✅ ReactNode typing
- ✅ Optional ReactNode props
- ✅ Conditional rendering với `&&`
- ✅ ClassName merging

### Exercise 3: Generic List
- ✅ Generic types `<T>`
- ✅ Generic props interface
- ✅ Render props pattern
- ✅ Key extractor pattern
- ✅ Type inference

---

## 🚀 WORKFLOW

1. **Đọc PART 2** (Exercise 2 theory) → 10 phút
2. **Làm Exercise 2** → 15-20 phút
3. **Gửi code cho AI review** → nhắn "xong ex2"
4. **Trong lúc chờ review:** Đọc PART 3 (Exercise 3 theory) → 10 phút
5. **Sau khi fix Ex2:** Làm Exercise 3 → 20-30 phút
6. **Gửi code Ex3** → nhắn "xong ex3"
7. **Done!** Quiz → Summary → Next session

---

**Tổng thời gian:** ~1.5-2 giờ (thay vì 3 giờ nếu chờ AI từng bước)

Bắt đầu đọc **PART 2** ngay để làm Exercise 2! 🚀
