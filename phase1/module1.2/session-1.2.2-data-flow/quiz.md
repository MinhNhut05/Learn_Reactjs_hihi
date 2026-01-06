# Quiz - Session 1.2.2: One-way Data Flow

## Hướng dẫn
- Trả lời các câu hỏi dưới đây
- Mỗi câu có 1 đáp án đúng
- Đáp án ở cuối file

---

## Câu 1: One-way Data Flow

Trong React, "one-way data flow" có nghĩa là gì?

A) Data có thể chảy cả 2 chiều giữa parent và children
B) Data chảy từ parent xuống children qua props, events chảy lên qua callbacks
C) Data chỉ có thể đọc, không thể thay đổi
D) Mỗi component chỉ có thể có 1 child

---

## Câu 2: Lifting State Up

Khi nào bạn cần "lift state up"?

A) Khi state quá lớn
B) Khi 2 siblings cần share và sync cùng một data
C) Khi component có quá nhiều re-renders
D) Khi muốn tối ưu performance

---

## Câu 3: Single Source of Truth

"Single source of truth" trong React có nghĩa là:

A) Chỉ có 1 file chứa tất cả state
B) Mỗi piece of data chỉ được quản lý ở 1 nơi duy nhất
C) Chỉ dùng 1 useState trong toàn app
D) State không thể thay đổi

---

## Câu 4: Derived Value

Đoạn code nào thể hiện đúng "derived value"?

```tsx
// Option A
const [celsius, setCelsius] = useState(0)
const [fahrenheit, setFahrenheit] = useState(32)

// Option B
const [celsius, setCelsius] = useState(0)
const fahrenheit = (celsius * 9/5) + 32

// Option C
const fahrenheit = 32
const celsius = (fahrenheit - 32) * 5/9

// Option D
const [temperature, setTemperature] = useState({ celsius: 0, fahrenheit: 32 })
```

A) Option A
B) Option B
C) Option C
D) Option D

---

## Câu 5: Props Drilling

Props drilling trở thành vấn đề khi:

A) Props pass qua 1-2 levels
B) Props pass qua nhiều levels mà middle components không sử dụng
C) Props có kiểu dữ liệu phức tạp
D) Props là callback functions

---

## Câu 6: Component Composition

`children` prop trong React là gì?

A) Array chứa tên các child components
B) Số lượng children của component
C) Nội dung được truyền giữa opening và closing tags
D) Reference đến parent component

---

## Câu 7: Compound Components

Compound components pattern được dùng để:

A) Tạo components chạy nhanh hơn
B) Tạo API linh hoạt với các sub-components liên quan
C) Giảm số lượng components
D) Tránh sử dụng props

---

## Câu 8: Controlled vs Uncontrolled

Component nào là "controlled component"?

```tsx
// Component A
function InputA() {
  const [value, setValue] = useState('')
  return <input value={value} onChange={e => setValue(e.target.value)} />
}

// Component B
function InputB({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />
}
```

A) Chỉ Component A
B) Chỉ Component B
C) Cả A và B đều là controlled
D) Không có component nào là controlled

---

## Câu 9: Composition vs Props

So sánh 2 cách dưới đây:

```tsx
// Cách 1
<Card title="Hello" body="Content" footer="Action" />

// Cách 2
<Card>
  <Card.Header>Hello</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Action</Card.Footer>
</Card>
```

Ưu điểm của Cách 2 là gì?

A) Performance tốt hơn
B) Ít code hơn
C) Linh hoạt hơn - có thể truyền bất kỳ JSX nào vào mỗi phần
D) Dễ học hơn

---

## Câu 10: Best Practice

Đâu là anti-pattern khi làm việc với shared state?

A) Lift state lên shared ancestor
B) Dùng useEffect để sync local state với props
C) Pass callbacks xuống children
D) Dùng derived values thay vì duplicate state

---

# Đáp án

1. **B** - Data chảy xuống qua props, events chảy lên qua callbacks
2. **B** - Khi siblings cần share và sync cùng data
3. **B** - Mỗi piece of data chỉ được quản lý ở 1 nơi
4. **B** - fahrenheit được tính từ celsius, không cần state riêng
5. **B** - Props pass qua nhiều levels mà middle components không dùng
6. **C** - Nội dung giữa opening và closing tags
7. **B** - Tạo API linh hoạt với sub-components liên quan
8. **C** - Cả 2 đều controlled (value controlled bởi state hoặc props)
9. **C** - Linh hoạt hơn với JSX content
10. **B** - useEffect để sync là anti-pattern, nên lift state up

---

## Tự đánh giá

- 9-10 đúng: Xuất sắc! Sẵn sàng cho session tiếp theo
- 7-8 đúng: Tốt! Xem lại các câu sai
- 5-6 đúng: Cần ôn lại theory
- < 5 đúng: Đọc lại COMPLETE_THEORY.md
