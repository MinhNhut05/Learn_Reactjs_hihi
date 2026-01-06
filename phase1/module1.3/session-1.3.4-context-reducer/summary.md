# SESSION 1.3.4 SUMMARY - useContext & useReducer

---

## KNOWLEDGE CHECKLIST

### useContext Fundamentals

- [ ] Hiểu `createContext<Type>(defaultValue)` syntax
- [ ] Biết tại sao dùng `undefined` làm default value
- [ ] Biết cách tạo Provider component với `value` prop
- [ ] Biết cách consume context với `useContext(Context)`
- [ ] Hiểu tại sao cần custom hook với error check
- [ ] Biết pattern: Create → Provide → Consume

### useContext Use Cases

- [ ] Theme (light/dark mode)
- [ ] Authentication state
- [ ] Language/Locale settings
- [ ] User preferences
- [ ] Shopping cart
- [ ] Feature flags

### useReducer Fundamentals

- [ ] Hiểu reducer pattern: `(state, action) => newState`
- [ ] Biết syntax: `useReducer(reducer, initialState)`
- [ ] Hiểu `dispatch` function và cách gọi actions
- [ ] Biết cách viết reducer với `switch/case`
- [ ] Hiểu `default` case trả về state không đổi

### TypeScript cho Actions

- [ ] Biết dùng Discriminated Union cho action types
- [ ] Hiểu TypeScript narrowing trong switch case
- [ ] Biết cách define payload types cho từng action

### Immutability Rules

- [ ] KHÔNG BAO GIỜ mutate state trong reducer
- [ ] Luôn return new object: `{ ...state, ... }`
- [ ] Dùng `[...array]` để tạo array mới
- [ ] Dùng `.map()` để update item trong array
- [ ] Dùng `.filter()` để remove item từ array

### Context + Reducer Pattern

- [ ] Hiểu tại sao kết hợp Context và Reducer
- [ ] Biết cách tách State và Dispatch contexts
- [ ] Biết tạo custom hooks: useXxxState, useXxxDispatch
- [ ] Hiểu lợi ích performance của việc tách contexts
- [ ] Biết pattern "Mini Redux"

### Khi nào dùng gì?

- [ ] `useState` → state đơn giản, local
- [ ] `useReducer` → complex state, local
- [ ] `Context + useState` → simple shared state
- [ ] `Context + useReducer` → complex shared state

---

## QUICK REFERENCE

### useContext Pattern

```tsx
// 1. CREATE
const MyContext = createContext<Type | undefined>(undefined);

// 2. PROVIDE
function Provider({ children }) {
  const [value, setValue] = useState(initial);
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

// 3. CONSUME (custom hook)
function useMyContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within Provider");
  }
  return context;
}
```

### useReducer Pattern

```tsx
// 1. Types
interface State { count: number }
type Action =
  | { type: "INCREMENT" }
  | { type: "SET"; payload: number };

// 2. Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    case "SET": return { count: action.payload };
    default: return state;
  }
}

// 3. Use
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "INCREMENT" });
```

### Context + Reducer Pattern

```tsx
// Separate contexts
const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

// Provider
function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Custom hooks
function useMyState() { return useContext(StateContext); }
function useMyDispatch() { return useContext(DispatchContext); }
```

---

## COMMON MISTAKES TO AVOID

| Mistake | Fix |
|---------|-----|
| Quên wrap với Provider | Luôn check component hierarchy |
| Mutate state trong reducer | Luôn return new object |
| Quên return trong reducer case | Mỗi case phải có return |
| Object mới mỗi render trong Provider value | useMemo hoặc tách contexts |
| Dispatch trong render body | Dispatch trong event handler hoặc useEffect |
| Dùng Context cho parent-child đơn giản | Props vẫn OK cho trường hợp đơn giản |
| Dùng useReducer cho boolean/string đơn giản | useState đủ cho primitive |

---

## EXERCISES COMPLETED

- [x] Exercise 1: useContext Basics - Theme System
- [x] Exercise 2: useReducer Basics - Counter with Actions
- [x] Exercise 3: Context + Reducer Combo - Todo App

---

## SESSION COMPLETION

**Prerequisites completed:**
- [x] Session 1.3.1: useState Advanced
- [x] Session 1.3.2: useEffect Mastery
- [x] Session 1.3.3: useRef & useCallback
- [x] Session 1.3.4: useContext & useReducer (Current)

**Next Session:** 1.3.5 - useMemo & Custom Hooks

---

## KEY TAKEAWAYS

1. **useContext giải quyết prop drilling** - share state mà không truyền props qua nhiều levels

2. **useReducer centralize state logic** - tất cả state updates ở một nơi, dễ test và debug

3. **Context + Reducer = Mini Redux** - pattern mạnh mẽ cho global state management

4. **Tách State và Dispatch contexts** - optimize performance bằng cách chỉ subscribe những gì cần

5. **Custom hooks là best practice** - encapsulate error check, type-safe, DRY code

6. **Immutability là bắt buộc** - không bao giờ mutate state, luôn return new object

---

**Session 1.3.4 Complete!** 🎉
