# Props & State Typing - Concepts (Chi Tiết)

> File này giải thích **TẠI SAO cần**, **DÙNG KHI NÀO**, và **VÍ DỤ THỰC TẾ** cho mỗi concept

---

## Concept 1: Type vs Interface

### 🤔 VẤN ĐỀ THỰC TẾ

Khi bạn làm dự án React:
- Có hàng chục components
- Mỗi component nhận nhiều props
- Làm sao TypeScript biết props nào hợp lệ?

**Ví dụ không có types:**
```typescript
// ❌ JavaScript - Không có type checking
function Button(props) {
  return <button>{props.label}</button>
}

// Có thể gọi sai mà không báo lỗi:
<Button lable="Click" />  // Typo: "lable" thay vì "label"
<Button label={123} />    // Sai type: number thay vì string
```

TypeScript giúp **BẮT LỖI NGAY KHI VIẾT CODE** thay vì lỗi lúc runtime.

---

### 📚 GIẢI PHÁP: Interface & Type

#### **Interface - Dùng cho Object Shapes**

**Khi nào dùng:**
- Props của component (90% trường hợp)
- Có thể cần extend sau này
- Muốn định nghĩa "shape" của object

**Ví dụ thực tế:**

```typescript
// Props cho Button component
interface ButtonProps {
  label: string
  onClick: () => void
  variant: 'primary' | 'secondary'
}

// Sau này cần IconButton → extend dễ dàng
interface IconButtonProps extends ButtonProps {
  icon: string
  iconPosition: 'left' | 'right'
}

// Sử dụng
function IconButton(props: IconButtonProps) {
  // Có tất cả props của Button + thêm icon
}
```

**Real-world use case:**
Trong design system (Material-UI, Ant Design), họ có:
- `ButtonProps` (base)
- `IconButtonProps extends ButtonProps`
- `LoadingButtonProps extends ButtonProps`

---

#### **Type - Dùng cho Unions, Aliases, Complex Types**

**Khi nào dùng:**
- Union types: `'primary' | 'secondary'`
- Type aliases cho primitives
- Complex compositions
- Conditional types (advanced)

**Ví dụ thực tế:**

```typescript
// 1. Union types cho constants
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

// 2. Function types
type OnClickHandler = (event: MouseEvent) => void

// 3. Complex compositions
type ButtonProps = {
  label: string
  variant: ButtonVariant
  size: ButtonSize
} & CommonProps  // Kết hợp với type khác

// 4. Conditional types (advanced)
type ApiResponse<T> = T extends Error ? { error: string } : { data: T }
```

**Real-world use case:**
Trong React Query:
```typescript
type QueryStatus = 'idle' | 'loading' | 'success' | 'error'
type MutationResult<T> = { data: T } | { error: Error }
```

---

### 🎯 RULE OF THUMB

| Use Case | Dùng gì? | Lý do |
|----------|----------|-------|
| Props của component | **Interface** | Dễ extend, rõ ràng |
| Union types (`'a' \| 'b'`) | **Type** | Interface không support |
| Function signatures | **Type** hoặc Interface | Cả 2 đều được |
| Object có thể extend | **Interface** | Extend dễ hơn |
| Primitive aliases | **Type** | Interface chỉ cho objects |

**Trong project thực tế:**
```typescript
// ✅ GOOD PRACTICE
interface UserCardProps {
  user: User
  variant: CardVariant  // type
  onEdit: EditHandler   // type
}

type CardVariant = 'compact' | 'detailed'
type EditHandler = (userId: string) => void
```

---

## Concept 2: Optional Props & Default Values

### 🤔 VẤN ĐỀ THỰC TẾ

Ví dụ bạn có Button component:
- Hầu hết buttons dùng size `'md'`
- Đôi khi cần `'sm'` hoặc `'lg'`

**Không có optional props:**
```typescript
// ❌ Phải truyền size mỗi lần
<Button label="Save" variant="primary" size="md" onClick={save} />
<Button label="Cancel" variant="secondary" size="md" onClick={cancel} />
<Button label="Delete" variant="danger" size="md" onClick={del} />
// Lặp lại "size='md'" cả trăm lần!
```

**Có optional props:**
```typescript
// ✅ Size có default, không cần truyền
<Button label="Save" variant="primary" onClick={save} />
<Button label="Cancel" variant="secondary" onClick={cancel} />
<Button label="Small" variant="primary" size="sm" onClick={del} />
// Chỉ truyền size khi cần khác default
```

---

### 📚 GIẢI PHÁP: Optional Props (`?`) + Default Values

#### **Cú pháp:**

```typescript
interface ButtonProps {
  // BẮT BUỘC - không có ?
  label: string
  onClick: () => void

  // OPTIONAL - có ?
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

function Button({
  label,
  onClick,
  size = 'md',        // Default value
  disabled = false,   // Default value
  loading = false,    // Default value
}: ButtonProps) {
  // size, disabled, loading luôn có giá trị (không bao giờ undefined)
}
```

---

#### **Real-world Examples:**

**1. Modal Component:**
```typescript
interface ModalProps {
  isOpen: boolean          // Required
  onClose: () => void      // Required
  title?: string           // Optional - có modal không có title
  size?: 'sm' | 'md' | 'lg' // Optional - default 'md'
  closeOnOverlay?: boolean // Optional - default true
}

function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlay = true,
}: ModalProps) {
  // ...
}

// Usage
<Modal isOpen={true} onClose={handleClose} title="Settings" />
<Modal isOpen={true} onClose={handleClose} size="lg" />  // No title
```

**2. Input Component:**
```typescript
interface InputProps {
  value: string                    // Required
  onChange: (val: string) => void  // Required
  placeholder?: string             // Optional
  type?: 'text' | 'email' | 'password'  // Optional, default 'text'
  disabled?: boolean               // Optional, default false
  autoFocus?: boolean              // Optional, default false
}
```

**3. Card Component (Material-UI style):**
```typescript
interface CardProps {
  children: ReactNode       // Required
  variant?: 'outlined' | 'elevated'  // Optional, default 'elevated'
  padding?: 'sm' | 'md' | 'lg'       // Optional, default 'md'
  clickable?: boolean       // Optional, default false
  onClick?: () => void      // Optional - chỉ cần khi clickable=true
}
```

---

### 🎯 BEST PRACTICES

**1. Tránh quá nhiều optional props:**
```typescript
// ❌ BAD - Quá nhiều options, khó maintain
interface ButtonProps {
  label: string
  variant?: string
  size?: string
  color?: string
  rounded?: boolean
  shadow?: boolean
  gradient?: boolean
  // ... 20 props khác
}

// ✅ GOOD - Nhóm options thành variants
interface ButtonProps {
  label: string
  variant: 'primary' | 'secondary' | 'outlined'  // Đã bao gồm style
  size?: 'sm' | 'md' | 'lg'
}
```

**2. Default values hợp lý:**
```typescript
// ✅ Default là use case phổ biến nhất
size = 'md'          // Medium size được dùng nhiều nhất
disabled = false     // Hầu hết buttons không disabled
loading = false      // Hầu hết buttons không loading
```

**3. Required cho props quan trọng:**
```typescript
// ✅ onClick là required vì button không onClick thì vô nghĩa
interface ButtonProps {
  onClick: () => void  // Required
}

// ❌ BAD - onClick optional
interface ButtonProps {
  onClick?: () => void  // Button làm gì nếu không có onClick?
}
```

---

## Concept 3: Children Typing

### 🤔 VẤN ĐỀ THỰC TẾ

Nhiều components nhận **children** (nội dung bên trong):
```jsx
<Card>
  <h2>Title</h2>
  <p>Content here</p>
</Card>

<Modal>
  <Form />
</Modal>

<Button>Click Me</Button>
```

TypeScript cần biết children có **type gì**?

---

### 📚 GIẢI PHÁP: ReactNode vs ReactElement

#### **ReactNode - Flexible (Recommended)**

**Khi nào dùng:** 99% trường hợp

**Chấp nhận:**
- String: `<Card>Hello</Card>`
- Number: `<Card>{123}</Card>`
- JSX elements: `<Card><div>Content</div></Card>`
- Arrays: `<Card>{items.map(...)}</Card>`
- null/undefined: `<Card>{isLoading ? null : <Content />}</Card>`

```typescript
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode  // Flexible
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>
}

// ✅ Tất cả đều OK
<Card>Text content</Card>
<Card>{123}</Card>
<Card><h1>Title</h1></Card>
<Card>{items.map(item => <div key={item.id}>{item.name}</div>)}</Card>
<Card>{isLoading ? <Spinner /> : <Content />}</Card>
```

---

#### **ReactElement - Strict**

**Khi nào dùng:** Khi BẮT BUỘC phải là JSX element

```typescript
import { ReactElement } from 'react'

interface TabsProps {
  children: ReactElement[]  // Chỉ chấp nhận array of JSX elements
}

function Tabs({ children }: TabsProps) {
  return <div className="tabs">{children}</div>
}

// ✅ OK
<Tabs>
  <Tab label="Home">Content 1</Tab>
  <Tab label="Profile">Content 2</Tab>
</Tabs>

// ❌ ERROR - String không phải ReactElement
<Tabs>Hello</Tabs>

// ❌ ERROR - Number không phải ReactElement
<Tabs>{123}</Tabs>
```

---

#### **Real-world Examples:**

**1. Layout Components (ReactNode):**
```typescript
interface LayoutProps {
  header: ReactNode      // Flexible - có thể là string hoặc JSX
  sidebar: ReactNode
  children: ReactNode
  footer?: ReactNode     // Optional
}

function Layout({ header, sidebar, children, footer }: LayoutProps) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  )
}

// Usage - flexible
<Layout
  header={<AppBar />}
  sidebar="Menu here"    // String OK
  footer={null}          // null OK
>
  <Dashboard />
</Layout>
```

**2. Render Props Pattern (ReactNode):**
```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode  // Function return ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

// Usage
<List
  items={users}
  renderItem={(user) => `${user.name} - ${user.email}`}  // String OK
/>

<List
  items={users}
  renderItem={(user) => <UserCard user={user} />}  // JSX OK
/>
```

**3. Icon Components (ReactElement):**
```typescript
interface IconButtonProps {
  icon: ReactElement  // Strict - phải là component
  onClick: () => void
}

function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <button onClick={onClick}>
      {icon}
    </button>
  )
}

// ✅ OK
<IconButton icon={<TrashIcon />} onClick={handleDelete} />

// ❌ ERROR - String không được
<IconButton icon="trash" onClick={handleDelete} />
```

---

### 🎯 BEST PRACTICES

| Use Case | Dùng gì? | Ví dụ |
|----------|----------|-------|
| Generic container | **ReactNode** | Card, Modal, Layout |
| Render functions | **ReactNode** | `renderItem`, `renderHeader` |
| Strict component slots | **ReactElement** | Icon prop, Tab children |
| Multiple children | **ReactNode** | Hầu hết cases |

---

## Concept 4: Generic Props

### 🤔 VẤN ĐỀ THỰC TẾ

Bạn cần component hiển thị **list**:
- List users
- List products
- List todos
- List anything

**Không có generics:**
```typescript
// ❌ Phải tạo 3 components giống nhau
function UserList({ users }: { users: User[] }) {
  return <ul>{users.map(u => <li>{u.name}</li>)}</ul>
}

function ProductList({ products }: { products: Product[] }) {
  return <ul>{products.map(p => <li>{p.title}</li>)}</ul>
}

function TodoList({ todos }: { todos: Todo[] }) {
  return <ul>{todos.map(t => <li>{t.text}</li>)}</ul>
}
// Code lặp lại!
```

**Có generics:**
```typescript
// ✅ 1 component, reuse cho tất cả types
function List<T>({ items, renderItem }: {
  items: T[]
  renderItem: (item: T) => ReactNode
}) {
  return <ul>{items.map((item, i) => <li key={i}>{renderItem(item)}</li>)}</ul>
}

// Dùng với bất kỳ type nào
<List items={users} renderItem={(u) => u.name} />
<List items={products} renderItem={(p) => p.title} />
<List items={todos} renderItem={(t) => t.text} />
```

---

### 📚 GIẢI PHÁP: Generic Components

#### **Cú pháp:**

```typescript
// Interface với generic
interface ListProps<T> {
  items: T[]                        // Array of type T
  renderItem: (item: T) => ReactNode  // Function nhận T
  keyExtractor?: (item: T) => string | number
}

// Component với generic
function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor ? keyExtractor(item) : index}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
```

---

#### **Real-world Examples:**

**1. Dropdown/Select Component:**
```typescript
interface SelectProps<T> {
  options: T[]
  value: T
  onChange: (value: T) => void
  getLabel: (option: T) => string
  getValue: (option: T) => string | number
}

function Select<T>({
  options,
  value,
  onChange,
  getLabel,
  getValue,
}: SelectProps<T>) {
  return (
    <select
      value={getValue(value)}
      onChange={(e) => {
        const option = options.find(opt => getValue(opt) === e.target.value)
        if (option) onChange(option)
      }}
    >
      {options.map((option) => (
        <option key={getValue(option)} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  )
}

// Usage với User type
interface User {
  id: number
  name: string
}

<Select<User>
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  getLabel={(user) => user.name}
  getValue={(user) => user.id}
/>

// Usage với Product type
interface Product {
  sku: string
  title: string
}

<Select<Product>
  options={products}
  value={selectedProduct}
  onChange={setSelectedProduct}
  getLabel={(p) => p.title}
  getValue={(p) => p.sku}
/>
```

**2. Table Component:**
```typescript
interface Column<T> {
  key: string
  header: string
  render: (item: T) => ReactNode
  width?: string
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string | number
}

function Table<T>({ data, columns, keyExtractor }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={{ width: col.width }}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={keyExtractor(item)}>
            {columns.map((col) => (
              <td key={col.key}>{col.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Usage
interface User {
  id: number
  name: string
  email: string
  role: string
}

<Table<User>
  data={users}
  keyExtractor={(user) => user.id}
  columns={[
    {
      key: 'name',
      header: 'Name',
      render: (user) => user.name,
    },
    {
      key: 'email',
      header: 'Email',
      render: (user) => <a href={`mailto:${user.email}`}>{user.email}</a>,
    },
    {
      key: 'role',
      header: 'Role',
      render: (user) => <Badge>{user.role}</Badge>,
    },
  ]}
/>
```

**3. Form Field (Advanced):**
```typescript
interface FormFieldProps<T> {
  value: T
  onChange: (value: T) => void
  validate?: (value: T) => string | undefined
  format?: (value: T) => string
  parse?: (value: string) => T
}

function FormField<T>({
  value,
  onChange,
  validate,
  format,
  parse,
}: FormFieldProps<T>) {
  const [error, setError] = useState<string>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parse ? parse(e.target.value) : e.target.value as unknown as T

    const validationError = validate?.(newValue)
    setError(validationError)

    onChange(newValue)
  }

  return (
    <div>
      <input
        value={format ? format(value) : String(value)}
        onChange={handleChange}
      />
      {error && <span className="error">{error}</span>}
    </div>
  )
}

// Usage với number
<FormField<number>
  value={age}
  onChange={setAge}
  parse={(str) => parseInt(str, 10)}
  validate={(val) => val < 0 ? 'Age must be positive' : undefined}
/>

// Usage với Date
<FormField<Date>
  value={birthday}
  onChange={setBirthday}
  format={(date) => date.toISOString().split('T')[0]}
  parse={(str) => new Date(str)}
/>
```

---

### 🎯 KHI NÀO DÙNG GENERICS?

**✅ DÙNG khi:**
- Component làm việc với **nhiều types** data
- Muốn **type safety** khi render
- Có **logic giống nhau** cho nhiều types

**❌ KHÔNG DÙNG khi:**
- Component chỉ dùng 1 type cụ thể
- Logic khác nhau giữa các types
- Làm code phức tạp không cần thiết

**Examples:**

```typescript
// ✅ GOOD - Generic hợp lý
function List<T>({ items, render }: { items: T[], render: (item: T) => ReactNode })

// ❌ BAD - Không cần generic
function UserProfile({ user }: { user: User })  // Chỉ dùng User type
```

---

## 🎓 TÓM TẮT - KHI NÀO DÙNG GÌ

| Concept | Khi nào dùng | Real-world example |
|---------|--------------|-------------------|
| **Interface** | Props của components | ButtonProps, CardProps |
| **Type** | Unions, aliases | `'primary' \| 'secondary'` |
| **Optional `?`** | Props không bắt buộc | `size?: 'sm' \| 'md' \| 'lg'` |
| **Default values** | Set giá trị mặc định | `size = 'md'` |
| **ReactNode** | Flexible children | Card, Modal, Layout |
| **ReactElement** | Strict component children | Icon prop, Tab children |
| **Generic `<T>`** | Reusable với nhiều types | List, Table, Select |

---

**Đọc xong file này, bạn sẽ biết:**
1. ✅ Tại sao cần types
2. ✅ Type vs Interface dùng khi nào
3. ✅ Optional props giải quyết vấn đề gì
4. ✅ ReactNode vs ReactElement khác nhau thế nào
5. ✅ Generic components dùng để làm gì

**Next:** Làm exercises để thực hành!
