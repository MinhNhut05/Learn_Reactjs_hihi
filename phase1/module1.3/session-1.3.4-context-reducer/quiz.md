# SESSION 1.3.4 QUIZ - useContext & useReducer

**Pass Score:** >= 8/10
**Time:** 20-30 phút

---

## Câu 1: createContext Default Value

Khi tạo context với `createContext<ThemeContextType | undefined>(undefined)`, điều gì xảy ra nếu dùng `useContext(ThemeContext)` mà không có Provider bao bọc?

- A) Trả về object rỗng `{}`
- B) Trả về `undefined`
- C) Throw error ngay lập tức
- D) Trả về giá trị mặc định của ThemeContextType

<details>
<summary>Đáp án</summary>

**B) Trả về `undefined`**

`createContext(defaultValue)` trả về default value khi không có Provider. Vì default là `undefined`, nên `useContext` sẽ trả về `undefined`. Đó là lý do cần check trong custom hook và throw error thủ công.

</details>

---

## Câu 2: Custom Hook Pattern

Tại sao nên tạo custom hook (như `useTheme()`) thay vì dùng `useContext(ThemeContext)` trực tiếp?

- A) Custom hook chạy nhanh hơn
- B) Encapsulate error check, type-safe, DRY code
- C) Context bắt buộc phải có custom hook
- D) Custom hook giúp re-render ít hơn

<details>
<summary>Đáp án</summary>

**B) Encapsulate error check, type-safe, DRY code**

Custom hook:
- Encapsulate undefined check ở một nơi
- Type-safe: TypeScript biết context không undefined sau check
- DRY: không lặp lại error check ở mỗi component
- Readable: `useTheme()` rõ ràng hơn `useContext(ThemeContext)`

</details>

---

## Câu 3: Reducer Function

Điều nào sau đây đúng về reducer function?

- A) Reducer là async function, có thể fetch data
- B) Reducer có thể mutate state trực tiếp
- C) Reducer là pure function, luôn return new state object
- D) Reducer chỉ xử lý được một action type

<details>
<summary>Đáp án</summary>

**C) Reducer là pure function, luôn return new state object**

Reducer phải là pure function:
- Không side effects (không fetch, không mutate, không random)
- Cùng input luôn cho cùng output
- Luôn return new object (immutable)

</details>

---

## Câu 4: Action Types với TypeScript

Cho code:
```tsx
type Action =
  | { type: "INCREMENT" }
  | { type: "SET"; payload: number };
```

Trong reducer, khi `case "SET":`, TypeScript biết gì về `action.payload`?

- A) Không biết gì, cần type assertion
- B) Biết `action.payload` là `number`
- C) Biết `action.payload` là `any`
- D) TypeScript báo lỗi vì payload không tồn tại

<details>
<summary>Đáp án</summary>

**B) Biết `action.payload` là `number`**

Discriminated Union: Khi `action.type === "SET"`, TypeScript narrow down type và biết chính xác `action.payload` là `number`. Đây là type-safety quan trọng của pattern này.

</details>

---

## Câu 5: Immutability Bug

Đoạn code sau có bug gì?

```tsx
case "ADD_TODO":
  state.todos.push(action.payload);
  return state;
```

- A) Không có bug
- B) Mutation - `push` thay đổi array gốc
- C) Thiếu payload type
- D) Cần return `{ ...state }`

<details>
<summary>Đáp án</summary>

**B) Mutation - `push` thay đổi array gốc**

`array.push()` mutate array gốc. Dù return state, React không detect change vì reference giống nhau. Cách đúng:

```tsx
case "ADD_TODO":
  return {
    ...state,
    todos: [...state.todos, action.payload]
  };
```

</details>

---

## Câu 6: useReducer vs useState

Khi nào nên dùng `useReducer` thay vì `useState`?

- A) Luôn luôn - useReducer tốt hơn useState
- B) Khi state là primitive (string, number, boolean)
- C) Khi state complex, nhiều related updates
- D) Khi chỉ có 1 component dùng state

<details>
<summary>Đáp án</summary>

**C) Khi state complex, nhiều related updates**

useReducer phù hợp khi:
- State là object với nhiều fields
- State updates liên quan nhau (ví dụ: update cả todos và filter)
- Logic phức tạp cần centralize
- Cần dễ test và debug

useState đủ cho: primitives, độc lập, đơn giản.

</details>

---

## Câu 7: Provider Value Trap

Đoạn code sau có vấn đề gì về performance?

```tsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

- A) Không có vấn đề gì
- B) Object mới tạo mỗi render, gây re-render tất cả consumers
- C) setTheme không nên trong value
- D) children không render được

<details>
<summary>Đáp án</summary>

**B) Object mới tạo mỗi render, gây re-render tất cả consumers**

`{ theme, setTheme }` tạo object mới mỗi render. Tất cả consumers nhận reference mới → re-render. Fix bằng:

1. `useMemo`:
```tsx
const value = useMemo(() => ({ theme, setTheme }), [theme]);
```

2. Tách State và Dispatch contexts (như Exercise 3).

</details>

---

## Câu 8: Separate Contexts

Tại sao trong Context + Reducer pattern, ta tách thành StateContext và DispatchContext?

- A) Bắt buộc phải tách theo React rules
- B) Code dễ đọc hơn
- C) Components chỉ cần dispatch sẽ không re-render khi state thay đổi
- D) Để có thể dùng nhiều reducers

<details>
<summary>Đáp án</summary>

**C) Components chỉ cần dispatch sẽ không re-render khi state thay đổi**

Ví dụ `AddTodoForm` chỉ cần `dispatch` để add todo. Nếu dùng chung context, nó sẽ re-render mỗi khi todos thay đổi (không cần thiết).

Tách contexts:
- `useTodoState()` → subscribe to state changes
- `useTodoDispatch()` → chỉ lấy dispatch, không re-render khi state đổi

</details>

---

## Câu 9: Dispatch trong Render

Đoạn code sau gây ra vấn đề gì?

```tsx
function TodoList() {
  const dispatch = useTodoDispatch();
  dispatch({ type: "SET_FILTER", payload: "all" });

  return <div>...</div>;
}
```

- A) Không có vấn đề
- B) Infinite loop
- C) dispatch undefined
- D) Filter không update

<details>
<summary>Đáp án</summary>

**B) Infinite loop**

Dispatch trong render body:
1. Component render
2. Dispatch → state change
3. State change → re-render
4. Re-render → dispatch lại
5. Lặp vô hạn!

Fix: Dispatch trong event handler hoặc useEffect:
```tsx
useEffect(() => {
  dispatch({ type: "SET_FILTER", payload: "all" });
}, []); // Chỉ chạy 1 lần
```

</details>

---

## Câu 10: Context + Reducer Sử Dụng

Cho architecture sau, đâu là cách sử dụng đúng?

```tsx
// App.tsx
<TodoProvider>
  <Header />
  <TodoList />
  <Footer />
</TodoProvider>
```

- A) Chỉ TodoList có thể dùng useTodoState
- B) Bất kỳ component nào trong TodoProvider đều có thể dùng hooks
- C) Phải truyền props từ TodoProvider xuống
- D) Header và Footer không access được todos

<details>
<summary>Đáp án</summary>

**B) Bất kỳ component nào trong TodoProvider đều có thể dùng hooks**

Đây chính là lợi ích của Context:
- Header, TodoList, Footer đều có thể dùng `useTodoState()` và `useTodoDispatch()`
- Không cần prop drilling
- Component ở bất kỳ level nào trong tree đều access được

</details>

---

## TỔNG KẾT ĐIỂM

| Điểm | Đánh giá |
|------|----------|
| 10/10 | Xuất sắc! Ready cho advanced patterns |
| 8-9/10 | Tốt! Hiểu rõ core concepts |
| 6-7/10 | OK, cần review lại theory |
| < 6/10 | Cần đọc lại COMPLETE_THEORY.md |

---

## SAU KHI HOÀN THÀNH

Nếu đạt >= 8/10:
1. ✅ Session 1.3.4 completed
2. Tiếp tục Session 1.3.5: useMemo & Custom Hooks

Nếu < 8/10:
1. Đọc lại COMPLETE_THEORY.md
2. Làm lại exercises
3. Quiz lại sau 30 phút
