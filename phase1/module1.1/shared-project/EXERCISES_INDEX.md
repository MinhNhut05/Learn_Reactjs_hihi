# Module 1.1 - Exercises Index

> Danh sách tất cả exercises trong Module 1.1

---

## 📋 HƯỚNG DẪN SỬ DỤNG

### Cách chạy project:
```bash
cd phase1/module1.1/shared-project
npm install
npm run dev
```

### Cách làm exercises:
1. Mở file exercise trong `src/session-X.X.X/XX-Name.tsx`
2. Đọc requirements (comment đầu file)
3. Implement theo TODO comments
4. Test trong browser (http://localhost:5173)
5. Khi xong, nhắn "xong exX" cho AI review
6. So sánh với solution file (`XX-Name-Solution.tsx`) sau khi làm xong

### Cách switch giữa exercises:
- Mở `src/App.tsx`
- Comment/uncomment imports và JSX components
- Browser tự động reload

---

## 📚 SESSION 1.1.1: Props & State Typing

### Exercise 1: Button Component
**File:** `src/session-1.1.1/01-Button.tsx`
**Solution:** `src/session-1.1.1/01-Button-Solution.tsx`

**Concepts:**
- Interface cho Props
- Optional props với `?`
- Default values trong destructuring
- Union types (`'primary' | 'secondary' | 'danger'`)

**Requirements:**
- [ ] ButtonProps interface
- [ ] Required: label, variant, onClick
- [ ] Optional: size (default 'md'), disabled (default false)
- [ ] Dynamic className based on variant and size

---

### Exercise 2: Card Component
**File:** `src/session-1.1.1/02-Card.tsx`
**Solution:** `src/session-1.1.1/02-Card-Solution.tsx`

**Concepts:**
- ReactNode typing cho children
- Optional ReactNode props
- Conditional rendering
- ClassName merging

**Requirements:**
- [ ] CardProps interface
- [ ] Required: title, children (ReactNode)
- [ ] Optional: footer (ReactNode), className
- [ ] Render header, body, footer (if exists)

---

### Exercise 3: Generic List Component
**File:** `src/session-1.1.1/03-GenericList.tsx`
**Solution:** `src/session-1.1.1/03-GenericList-Solution.tsx`

**Concepts:**
- Generic components `<T>`
- Generic props interface `ListProps<T>`
- Type inference
- Reusable components

**Requirements:**
- [ ] ListProps<T> interface
- [ ] items: T[]
- [ ] renderItem: (item: T) => ReactNode
- [ ] keyExtractor: (item: T) => string | number
- [ ] Test với User, Product, string types

---

## 📚 SESSION 1.1.2: Event Handlers Typing

### Exercise 1: Login Form
**File:** `src/session-1.1.2/01-LoginForm.tsx`
**Solution:** `src/session-1.1.2/01-LoginForm-Solution.tsx`

**Concepts:**
- ChangeEvent<HTMLInputElement>
- FormEvent<HTMLFormElement>
- Event handler typing
- Form state management

**Requirements:**
- [ ] Email and password inputs
- [ ] Typed onChange handlers
- [ ] Typed onSubmit handler with preventDefault
- [ ] Form validation

---

### Exercise 2: Search Component
**File:** `src/session-1.1.2/02-SearchComponent.tsx`
**Solution:** `src/session-1.1.2/02-SearchComponent-Solution.tsx`

**Concepts:**
- ChangeEvent typing
- KeyboardEvent typing
- Custom callback props
- Debouncing (bonus)

**Requirements:**
- [ ] Search input with onChange
- [ ] Clear button with onClick
- [ ] Enter key to search (onKeyDown)
- [ ] onSearch callback prop

---

## 📚 SESSION 1.1.3: Hooks với TypeScript

### Exercise 1: useLocalStorage Hook
**File:** `src/session-1.1.3/01-useLocalStorage.tsx`
**Solution:** `src/session-1.1.3/01-useLocalStorage-Solution.tsx`

**Concepts:**
- Generic custom hooks
- useState with types
- JSON parsing with error handling

**Requirements:**
- [ ] useLocalStorage<T>(key, initialValue)
- [ ] Return [value, setValue] like useState
- [ ] Sync với localStorage
- [ ] Handle JSON parse errors

---

### Exercise 2: useDebounce Hook
**File:** `src/session-1.1.3/02-useDebounce.tsx`
**Solution:** `src/session-1.1.3/02-useDebounce-Solution.tsx`

**Concepts:**
- Generic hooks
- useEffect cleanup
- setTimeout typing

**Requirements:**
- [ ] useDebounce<T>(value, delay)
- [ ] Return debounced value
- [ ] Cleanup on unmount/value change

---

### Exercise 3: useFetch Hook
**File:** `src/session-1.1.3/03-useFetch.tsx`
**Solution:** `src/session-1.1.3/03-useFetch-Solution.tsx`

**Concepts:**
- Generic data fetching
- Loading/error states
- AbortController cleanup

**Requirements:**
- [ ] useFetch<T>(url)
- [ ] Return { data, loading, error }
- [ ] Handle cleanup with AbortController

---

## 📚 SESSION 1.1.4: Utility Types & Advanced

### Exercise 1: Form Builder
**File:** `src/session-1.1.4/01-FormBuilder.tsx`
**Solution:** `src/session-1.1.4/01-FormBuilder-Solution.tsx`

**Concepts:**
- Partial<T>
- Omit<T, K>
- Record<K, V>
- Utility types composition

**Requirements:**
- [ ] User interface
- [ ] CreateUserForm: Omit<User, 'id'>
- [ ] UpdateUserForm: Partial<Omit<User, 'id'>>
- [ ] UserFormErrors: Record<keyof User, string | undefined>

---

### Exercise 2: Props Extraction
**File:** `src/session-1.1.4/02-PropsExtraction.tsx`
**Solution:** `src/session-1.1.4/02-PropsExtraction-Solution.tsx`

**Concepts:**
- ComponentProps<typeof Component>
- Props extension
- Type inference from components

**Requirements:**
- [ ] Base Button component
- [ ] IconButton extends Button props
- [ ] Use ComponentProps utility

---

## 📊 PROGRESS TRACKING

### Session 1.1.1
- [ ] Exercise 1: Button Component
- [ ] Exercise 2: Card Component
- [ ] Exercise 3: Generic List Component

### Session 1.1.2
- [ ] Exercise 1: Login Form
- [ ] Exercise 2: Search Component

### Session 1.1.3
- [ ] Exercise 1: useLocalStorage Hook
- [ ] Exercise 2: useDebounce Hook
- [ ] Exercise 3: useFetch Hook

### Session 1.1.4
- [ ] Exercise 1: Form Builder
- [ ] Exercise 2: Props Extraction

---

## 💡 TIPS

### Khi bắt đầu exercise:
1. Đọc requirements trong comment đầu file
2. Đọc concepts trong `../session-X.X.X/01-concepts.md`
3. Implement theo TODO comments
4. Test trong browser

### Khi gặp khó khăn:
1. Đọc lại concepts.md
2. Check TypeScript errors trong terminal/browser
3. Nhắn AI hỏi hint (không xem solution ngay)

### Sau khi hoàn thành:
1. Nhắn "xong exX" cho AI review
2. Fix theo feedback
3. So sánh với solution file
4. Đọc solution để hiểu alternative approaches

---

## 🎯 NEXT STEPS

Sau khi hoàn thành Module 1.1:
- Module 1.2: React Mental Model
- Module 1.3: Hooks Deep Dive
- Phase 1 Final Project: Todo App

---

**Last Updated:** 2025-12-25
