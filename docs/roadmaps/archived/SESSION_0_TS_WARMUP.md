# SESSION 0: TypeScript Warmup (1 giờ)

> **MỤC ĐÍCH:** Review nhanh TypeScript concepts cần thiết cho Phase 1
> **THỜI GIAN:** 1 giờ
> **KHI NÀO:** Trước Session 1.1.1

---

## 🎯 Mục tiêu Session

Đảm bảo bạn tự tin với:
- Generic types
- Utility types (Partial, Pick, Omit, Record)
- Type inference
- Union và Intersection types

**KHÔNG PHẢI:** Học TypeScript từ đầu (bạn đã biết rồi)
**CHỈ LÀ:** Quick refresh để sẵn sàng cho Phase 1

---

## 📋 Nội dung Review (30 phút)

### 1. Generic Types (10 phút)

**Concept:**
```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg
}

// Generic interface
interface Box<T> {
  value: T
}

// Generic constraints
interface Lengthwise {
  length: number
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

**React Examples:**
```typescript
// Props với generic
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

// Hook với generic
function useState<T>(initial: T): [T, (value: T) => void] {
  // ...
}
```

---

### 2. Utility Types (15 phút)

**Partial<T>** - Tất cả properties optional:
```typescript
interface User {
  id: string
  name: string
  email: string
}

type PartialUser = Partial<User>
// { id?: string; name?: string; email?: string }

// Use case: Update functions
function updateUser(id: string, updates: Partial<User>) {
  // Chỉ cần update 1 vài fields
}
```

**Pick<T, K>** - Chọn một số properties:
```typescript
type UserPreview = Pick<User, 'id' | 'name'>
// { id: string; name: string }
```

**Omit<T, K>** - Loại bỏ một số properties:
```typescript
type CreateUserDTO = Omit<User, 'id'>
// { name: string; email: string }
```

**Record<K, V>** - Object với keys và values cụ thể:
```typescript
type Role = 'admin' | 'user' | 'guest'
type Permissions = Record<Role, string[]>
// {
//   admin: string[]
//   user: string[]
//   guest: string[]
// }
```

---

### 3. Type Inference (5 phút)

```typescript
// TS tự suy ra type
const num = 42 // number
const arr = [1, 2, 3] // number[]
const obj = { name: 'John' } // { name: string }

// Generic inference
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn)
}

const result = map([1, 2, 3], x => x.toString())
// result: string[] (TS tự suy ra U = string)
```

---

## 🎯 Quick Quiz (15 phút)

**Question 1:**
```typescript
interface Product {
  id: number
  name: string
  price: number
  description: string
}

// Tạo type cho form update product (không có id, các field khác optional)
type UpdateProductForm = ?
```

<details>
<summary>Đáp án</summary>

```typescript
type UpdateProductForm = Partial<Omit<Product, 'id'>>
```
</details>

---

**Question 2:**
```typescript
// Tạo generic hook useArray
// Requirements:
// - Nhận initial array
// - Return: array, push, remove, clear functions
// - Generic type cho array items

function useArray<T>(...) {
  // TODO: Implement
}
```

<details>
<summary>Đáp án</summary>

```typescript
function useArray<T>(initialValue: T[]) {
  const [array, setArray] = useState<T[]>(initialValue)

  const push = (item: T) => setArray(prev => [...prev, item])
  const remove = (index: number) => setArray(prev => prev.filter((_, i) => i !== index))
  const clear = () => setArray([])

  return { array, push, remove, clear }
}
```
</details>

---

**Question 3:**
```typescript
// Fix type error:
interface ButtonProps {
  label: string
  onClick: () => void
}

interface IconButtonProps {
  icon: string
  // TODO: Extend tất cả props của Button + thêm icon
}
```

<details>
<summary>Đáp án</summary>

```typescript
interface IconButtonProps extends ButtonProps {
  icon: string
}

// Hoặc:
type IconButtonProps = ButtonProps & {
  icon: string
}
```
</details>

---

## 🚀 Mini Exercise (15 phút)

**Implement useLocalStorage Hook với TypeScript:**

```typescript
/**
 * YÊU CẦU:
 * 1. Generic type cho value
 * 2. Return như useState: [value, setValue]
 * 3. Sync với localStorage
 * 4. Handle JSON parse errors
 */

function useLocalStorage<T>(key: string, initialValue: T) {
  // TODO: Implement
}

// USAGE:
const [user, setUser] = useLocalStorage<User | null>('user', null)
const [count, setCount] = useLocalStorage<number>('count', 0)
```

<details>
<summary>Solution</summary>

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // State để store value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  // Wrap setState để sync với localStorage
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      // Hỗ trợ functional update
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
```
</details>

---

## ✅ Checklist Hoàn Thành

Sau session này, bạn phải:
- [ ] Hiểu generics và khi nào dùng
- [ ] Biết 4 utility types: Partial, Pick, Omit, Record
- [ ] Biết cách extend types/interfaces
- [ ] Làm được mini exercise useLocalStorage

**Nếu tất cả ✅ → Sẵn sàng cho Session 1.1.1!**

---

## 🎯 Next Step

Sau khi hoàn thành Session 0:
1. Nghỉ 10-15 phút
2. Copy `SESSION_START_FORM.md`
3. Điền thông tin cho Session 1.1.1: Props & State Typing
4. Paste vào chat mới và bắt đầu Phase 1!

---

**VERSION:** 1.0
**DATE:** 2025-12-25
