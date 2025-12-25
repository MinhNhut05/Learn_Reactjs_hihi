# Exercise 1: Button Component

## 🎯 Requirements

Tạo một Button component với TypeScript types:

- [ ] Props:
  - `label`: string (required)
  - `variant`: 'primary' | 'secondary' | 'danger' (required)
  - `size`: 'sm' | 'md' | 'lg' (optional, default 'md')
  - `onClick`: click handler (required)
  - `disabled`: boolean (optional, default false)

- [ ] Render button với:
  - Text từ label
  - ClassName dựa vào variant và size
  - Click handler
  - Disabled state

- [ ] TypeScript:
  - Không có type errors
  - Props phải có proper types
  - onClick phải type đúng event handler

## 📋 Acceptance Criteria

✅ Component compile không lỗi TypeScript
✅ Có thể dùng: `<Button label="Click" variant="primary" onClick={() => {}} />`
✅ Size có default value 'md'
✅ Disabled có default value false

## 💡 Hints (đọc nếu bí)

<details>
<summary>Hint 1: Props type</summary>

Dùng `interface` để define ButtonProps với tất cả fields.
Optional props dùng `?` sau tên field.

```typescript
interface ButtonProps {
  label: string
  variant: // ...
  // ...
}
```
</details>

<details>
<summary>Hint 2: Click handler type</summary>

onClick type là: `() => void` cho simple handler
hoặc `(event: React.MouseEvent<HTMLButtonElement>) => void` nếu cần event

</details>

<details>
<summary>Hint 3: Default values</summary>

Default values trong destructuring:

```typescript
function Button({ size = 'md', disabled = false, ...otherProps }: ButtonProps) {
  // ...
}
```
</details>

## 🚀 Getting Started

Code trong file `src/App.tsx`.

Bạn có thể test component bằng cách dùng nó trong App:

```typescript
function App() {
  return (
    <div>
      <Button label="Primary" variant="primary" onClick={() => alert('Clicked!')} />
      <Button label="Small" variant="secondary" size="sm" onClick={() => {}} />
      <Button label="Disabled" variant="danger" onClick={() => {}} disabled />
    </div>
  )
}
```
