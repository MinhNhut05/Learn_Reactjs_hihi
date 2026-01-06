# Session 1.3.1: useState Advanced

## Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Lazy Initialization](#2-lazy-initialization)
3. [Functional Updates](#3-functional-updates)
4. [Object State Updates](#4-object-state-updates)
5. [Multiple States vs Single Object](#5-multiple-states-vs-single-object)
6. [Tổng kết](#6-tổng-kết)

---

## 1. Giới thiệu

Ở session 1.1.3, bạn đã học cơ bản về `useState`. Bây giờ, chúng ta sẽ đi sâu vào các patterns nâng cao mà React developers cần nắm vững.

### Những gì bạn đã biết:
```tsx
const [count, setCount] = useState(0);
const [name, setName] = useState("");
```

### Những gì bạn sẽ học:
- **Lazy initialization** - Tối ưu performance cho expensive initial values
- **Functional updates** - Giải quyết stale closure problem
- **Object state** - Immutable update patterns
- **State structure** - Khi nào tách, khi nào gộp

---

## 2. Lazy Initialization

### 2.1 Vấn đề: Expensive Initial Value

```tsx
// ❌ BAD: Chạy MỖI lần render
function ExpensiveComponent() {
  const [data, setData] = useState(expensiveCalculation());
  // expensiveCalculation() được gọi mỗi lần component render
  // Dù giá trị chỉ dùng cho lần mount đầu tiên!

  return <div>{data}</div>;
}
```

**Tại sao lại bad?**
- `expensiveCalculation()` chạy MỖI lần render
- React chỉ dùng kết quả cho lần render ĐẦU TIÊN
- Những lần render sau: tính toán rồi... bỏ đi!

### 2.2 Giải pháp: Lazy Initializer Function

```tsx
// ✅ GOOD: Chỉ chạy 1 lần khi mount
function OptimizedComponent() {
  const [data, setData] = useState(() => expensiveCalculation());
  // Truyền function thay vì value
  // React chỉ gọi function này MỘT LẦN DUY NHẤT

  return <div>{data}</div>;
}
```

### 2.3 Khi nào cần Lazy Initialization?

| Cần dùng | Không cần |
|----------|-----------|
| Đọc từ localStorage | Primitive values: `0`, `""`, `true` |
| Parse JSON lớn | Simple objects: `{ x: 0, y: 0 }` |
| Expensive calculations | Values đã có sẵn |
| Khởi tạo từ props phức tạp | Array literals: `[]` |

### 2.4 Ví dụ thực tế: localStorage

```tsx
// ❌ Chạy JSON.parse mỗi render
function BadThemeProvider() {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem('theme') || '{}')
  );
}

// ✅ Chỉ parse 1 lần
function GoodThemeProvider() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : { mode: 'light' };
  });
}
```

### 2.5 Kiểm chứng bằng console.log

```tsx
function TestLazyInit() {
  // Thêm console.log để thấy sự khác biệt

  // Version A - Direct
  const [valueA, setValueA] = useState(
    (() => {
      console.log('🔴 Direct: calculating...');
      return Math.random();
    })()  // IIFE - chạy ngay
  );

  // Version B - Lazy
  const [valueB, setValueB] = useState(() => {
    console.log('🟢 Lazy: calculating...');
    return Math.random();
  });  // Không có () ở cuối - React gọi

  const [trigger, setTrigger] = useState(0);

  return (
    <div>
      <p>Value A: {valueA}</p>
      <p>Value B: {valueB}</p>
      <button onClick={() => setTrigger(t => t + 1)}>
        Re-render (trigger: {trigger})
      </button>
    </div>
  );
}
```

**Kết quả console:**
- Mount: Cả 2 log đều xuất hiện
- Click button (re-render): Chỉ "🔴 Direct" xuất hiện!

### 2.6 Mental Model

```
useState(value)        → value được EVALUATE mỗi render
useState(() => value)  → function chỉ được CALL lần đầu

Giống như:
- Direct: "Đây là 5 quả táo" - đếm mỗi lần nói
- Lazy: "Khi cần thì đếm táo" - chỉ đếm lần đầu
```

---

## 3. Functional Updates

### 3.1 Vấn đề: Stale Closure

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // ❌ BAD: count bị "đóng băng" (stale closure)
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Kết quả: 1 (không phải 3!)
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

**Tại sao chỉ tăng 1?**

```
Click khi count = 0:
- setCount(0 + 1) → queue: 1
- setCount(0 + 1) → queue: 1  (count vẫn là 0!)
- setCount(0 + 1) → queue: 1  (count vẫn là 0!)

React batches updates → final value: 1
```

### 3.2 Giải pháp: Functional Update

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // ✅ GOOD: Sử dụng previous state
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // Kết quả: 3 ✓
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

**Cách React xử lý:**
```
Click khi count = 0:
- setCount(prev => prev + 1) → queue: fn1
- setCount(prev => prev + 1) → queue: fn1, fn2
- setCount(prev => prev + 1) → queue: fn1, fn2, fn3

React processes queue:
- fn1(0) → 1
- fn2(1) → 2
- fn3(2) → 3

Final value: 3 ✓
```

### 3.3 Khi nào cần Functional Updates?

| Cần dùng | Không cần |
|----------|-----------|
| State mới phụ thuộc state cũ | State mới độc lập |
| Nhiều updates trong 1 event | Replace hoàn toàn |
| Async callbacks (setTimeout) | Direct value assignment |
| Event handlers phức tạp | Simple toggle |

**Ví dụ cụ thể:**

```tsx
// ❌ Không cần functional update
setName("John");           // Không phụ thuộc prev
setVisible(false);         // Replace hoàn toàn
setItems(newItems);        // Array mới

// ✅ Cần functional update
setCount(prev => prev + 1);     // Phụ thuộc prev
setItems(prev => [...prev, newItem]);  // Dựa trên prev
setTodos(prev => prev.filter(t => t.id !== id));
```

### 3.4 Stale Closure trong setTimeout

```tsx
function DelayedCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      // ❌ BAD: count bị stale sau 1 giây
      setCount(count + 1);
    }, 1000);

    setTimeout(() => {
      // ✅ GOOD: Luôn dùng latest state
      setCount(prev => prev + 1);
    }, 1000);
  };
}
```

### 3.5 Mental Model

```
setCount(count + 1)     → "Đặt count thành 0 + 1"
setCount(prev => prev + 1)  → "Lấy giá trị hiện tại, cộng 1"

Closure "chụp ảnh" biến tại thời điểm tạo function.
Functional update "hỏi React" giá trị mới nhất.
```

---

## 4. Object State Updates

### 4.1 Quy tắc vàng: NEVER Mutate!

```tsx
// ❌ WRONG: Mutation
const [user, setUser] = useState({ name: 'John', age: 25 });

const updateAge = () => {
  user.age = 26;        // Mutate object
  setUser(user);        // Same reference → React không re-render!
};

// ✅ RIGHT: Create new object
const updateAge = () => {
  setUser({ ...user, age: 26 });  // New object với age mới
};
```

**Tại sao mutation không hoạt động?**
```
React so sánh: prevState === newState
- Mutation: same object → true → không re-render
- New object: different reference → false → re-render
```

### 4.2 Spread Operator Pattern

```tsx
interface User {
  name: string;
  age: number;
  email: string;
}

const [user, setUser] = useState<User>({
  name: 'John',
  age: 25,
  email: 'john@example.com'
});

// Update 1 field
setUser({ ...user, age: 26 });

// Update nhiều fields
setUser({ ...user, age: 26, email: 'new@example.com' });

// Kết hợp functional update
setUser(prev => ({ ...prev, age: prev.age + 1 }));
```

### 4.3 Nested Object Updates

```tsx
interface Profile {
  name: string;
  address: {
    city: string;
    country: string;
  };
}

const [profile, setProfile] = useState<Profile>({
  name: 'John',
  address: {
    city: 'New York',
    country: 'USA'
  }
});

// ❌ WRONG: Chỉ spread level 1
setProfile({ ...profile, address: { city: 'LA' } });
// address.country bị mất!

// ✅ RIGHT: Spread cả nested object
setProfile({
  ...profile,
  address: {
    ...profile.address,
    city: 'LA'
  }
});
```

### 4.4 Array trong Object

```tsx
interface TodoList {
  title: string;
  items: string[];
}

const [list, setList] = useState<TodoList>({
  title: 'My List',
  items: ['Item 1', 'Item 2']
});

// Thêm item
setList(prev => ({
  ...prev,
  items: [...prev.items, 'Item 3']
}));

// Xóa item
setList(prev => ({
  ...prev,
  items: prev.items.filter(item => item !== 'Item 1')
}));

// Update item
setList(prev => ({
  ...prev,
  items: prev.items.map(item =>
    item === 'Item 1' ? 'Updated Item' : item
  )
}));
```

### 4.5 TypeScript với Object State

```tsx
// Type cho form
interface FormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const [form, setForm] = useState<FormData>({
  username: '',
  password: '',
  rememberMe: false
});

// Generic handler
const handleChange = (field: keyof FormData, value: FormData[typeof field]) => {
  setForm(prev => ({ ...prev, [field]: value }));
};

// Hoặc event-based
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type, checked } = e.target;
  setForm(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};
```

---

## 5. Multiple States vs Single Object

### 5.1 Khi nào tách riêng?

```tsx
// ✅ Tách riêng khi: Các state KHÔNG liên quan
function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
}
```

**Lợi ích:**
- Mỗi state độc lập, dễ update
- Không cần spread operator
- TypeScript inference tốt hơn

### 5.2 Khi nào gộp chung?

```tsx
// ✅ Gộp chung khi: Các state THAY ĐỔI CÙNG NHAU
interface Position {
  x: number;
  y: number;
}

function Draggable() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const handleMove = (dx: number, dy: number) => {
    // x và y luôn thay đổi cùng lúc
    setPosition(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
  };
}
```

### 5.3 Decision Framework

```
Câu hỏi 1: Các giá trị có thay đổi cùng nhau không?
  - CÓ → Gộp chung
  - KHÔNG → Tách riêng

Câu hỏi 2: Có bao nhiêu fields?
  - < 3 fields: Tách riêng OK
  - >= 3 fields liên quan: Xem xét gộp

Câu hỏi 3: Có nested structure không?
  - CÓ nested: Cân nhắc useReducer thay vì useState
```

### 5.4 Ví dụ thực tế

```tsx
// ❌ Quá nhiều states tách riêng
function BadForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  // 6 setters riêng lẻ - khó quản lý!
}

// ✅ Gộp thành object
function GoodForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });

  const updateField = <K extends keyof typeof formData>(
    field: K,
    value: typeof formData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
}

// ✅ Hoặc chia thành nhóm logic
function BetterForm() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: ''
  });

  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: ''
  });

  const [addressInfo, setAddressInfo] = useState({
    address: '',
    city: ''
  });
}
```

---

## 6. Tổng kết

### 6.1 Quick Reference

| Pattern | Khi nào dùng | Syntax |
|---------|-------------|--------|
| Lazy Init | Expensive initial value | `useState(() => ...)` |
| Functional Update | State phụ thuộc prev | `setState(prev => ...)` |
| Object Spread | Update object fields | `{ ...obj, field: newValue }` |
| Multiple States | Unrelated values | Nhiều `useState` calls |
| Single Object | Related values | Một `useState` với object |

### 6.2 Common Mistakes

```tsx
// ❌ Mistake 1: Không dùng lazy init cho expensive ops
useState(localStorage.getItem('key'));
// ✅ Fix
useState(() => localStorage.getItem('key'));

// ❌ Mistake 2: Direct update khi cần functional
setCount(count + 1); setCount(count + 1);
// ✅ Fix
setCount(c => c + 1); setCount(c => c + 1);

// ❌ Mistake 3: Mutate object
user.name = 'New'; setUser(user);
// ✅ Fix
setUser({ ...user, name: 'New' });

// ❌ Mistake 4: Quên spread nested
setProfile({ ...profile, address: { city: 'LA' } });
// ✅ Fix
setProfile({ ...profile, address: { ...profile.address, city: 'LA' } });
```

### 6.3 Checklist trước khi code

- [ ] Initial value có expensive không? → Lazy init
- [ ] State mới phụ thuộc state cũ? → Functional update
- [ ] Update object? → Spread, không mutate
- [ ] Nested object? → Spread từng level
- [ ] Nhiều states liên quan? → Xem xét gộp hoặc useReducer

---

## Tiếp theo

Sau khi nắm vững session này, bạn đã sẵn sàng cho:
- **Session 1.3.2:** useEffect Mastery - Dependencies, cleanup, patterns
- **Session 1.3.3:** useRef & useCallback - References và memoization
- **Session 1.3.4:** Custom Hooks - Tạo hooks riêng
