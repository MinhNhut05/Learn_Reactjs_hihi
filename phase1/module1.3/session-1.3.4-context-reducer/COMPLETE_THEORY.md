# SESSION 1.3.4: useContext & useReducer - COMPLETE THEORY

---

## MỤC LỤC

1. [Giới thiệu - Tại sao cần Context & Reducer?](#1-giới-thiệu)
2. [PART 1: useContext Deep Dive](#2-usecontext-deep-dive)
3. [PART 2: useReducer Deep Dive](#3-usereducer-deep-dive)
4. [PART 3: Context + Reducer Combo Pattern](#4-context--reducer-combo)
5. [Khi nào dùng gì?](#5-khi-nào-dùng-gì)
6. [Common Mistakes & Fixes](#6-common-mistakes--fixes)
7. [Best Practices Checklist](#7-best-practices-checklist)

---

## 1. GIỚI THIỆU

### Vấn đề: Prop Drilling Hell

```tsx
// ❌ Prop Drilling - truyền props qua nhiều tầng
function App() {
  const [user, setUser] = useState({ name: "John", role: "admin" });
  return <Layout user={user} setUser={setUser} />;
}

function Layout({ user, setUser }) {
  return <Sidebar user={user} setUser={setUser} />;
}

function Sidebar({ user, setUser }) {
  return <UserProfile user={user} setUser={setUser} />;
}

function UserProfile({ user, setUser }) {
  // Cuối cùng mới dùng được user!
  return <p>Hello, {user.name}</p>;
}
```

**Vấn đề:**
- Components trung gian (Layout, Sidebar) phải nhận props mà không dùng
- Refactor khó khăn - thêm 1 prop phải sửa tất cả components
- Code khó đọc, khó maintain

### Giải pháp: useContext

```tsx
// ✅ Với Context - component nào cần thì dùng
function App() {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
}

function Layout() {
  return <Sidebar />;  // Không cần pass props
}

function Sidebar() {
  return <UserProfile />;  // Không cần pass props
}

function UserProfile() {
  const { user } = useUser();  // Lấy trực tiếp từ context
  return <p>Hello, {user.name}</p>;
}
```

### Vấn đề: Complex State Logic

```tsx
// ❌ useState với state phức tạp
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Nhiều handlers riêng lẻ, khó quản lý
  const addTodo = () => { /* ... */ };
  const toggleTodo = () => { /* ... */ };
  const deleteTodo = () => { /* ... */ };
  const setFilterAll = () => { /* ... */ };
  // ...
}
```

### Giải pháp: useReducer

```tsx
// ✅ Với Reducer - tập trung logic vào 1 nơi
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO": // ...
    case "TOGGLE_TODO": // ...
    case "DELETE_TODO": // ...
    case "SET_FILTER": // ...
    default: return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  // Chỉ cần dispatch actions, logic tập trung trong reducer
}
```

---

## 2. useContext DEEP DIVE

### 2.1 Context là gì?

Context cung cấp cách **share data giữa các components** mà không cần truyền props qua từng level của component tree.

**Use cases điển hình:**
- Theme (light/dark mode)
- User authentication
- Language/Locale settings
- Feature flags
- Shopping cart

### 2.2 Ba bước cơ bản

```tsx
import { createContext, useContext, useState, ReactNode } from "react";

// ========================================
// STEP 1: CREATE - Tạo Context
// ========================================
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// undefined là giá trị mặc định khi không có Provider
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ========================================
// STEP 2: PROVIDE - Tạo Provider component
// ========================================
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Provider "provides" value cho tất cả descendants
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ========================================
// STEP 3: CONSUME - Sử dụng context
// ========================================

// Option A: useContext trực tiếp (không recommended)
function ButtonA() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Must be inside ThemeProvider");
  return <button>{context.theme}</button>;
}

// Option B: Custom Hook (RECOMMENDED)
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

function ButtonB() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

### 2.3 Tại sao cần Custom Hook?

```tsx
// ❌ Không có custom hook - phải check undefined mỗi lần
function ComponentA() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("...");
  // Mỗi component phải check
}

function ComponentB() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("...");
  // Lặp lại code
}

// ✅ Với custom hook - check 1 lần, dùng nhiều nơi
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

function ComponentA() {
  const { theme } = useTheme();  // Clean, safe
}

function ComponentB() {
  const { theme } = useTheme();  // Clean, safe
}
```

**Lợi ích của Custom Hook:**
1. **DRY** - không lặp error check
2. **Type-safe** - TypeScript biết context không phải undefined
3. **Readable** - `useTheme()` rõ ràng hơn `useContext(ThemeContext)`
4. **Refactorable** - đổi implementation không ảnh hưởng consumers

### 2.4 Default Value vs Undefined

```tsx
// Option 1: Default value (không cần check)
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},  // No-op function
});

// Pros: Không cần check undefined
// Cons: Có thể dùng nhầm mà không biết thiếu Provider
//       toggleTheme() sẽ không làm gì - bug khó tìm!

// Option 2: Undefined với error check (RECOMMENDED)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// Pros: Fail fast - biết ngay khi thiếu Provider
// Cons: Phải tạo custom hook (nhưng nên làm anyway)
```

### 2.5 Real-world Example: Authentication Context

```tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Verify token with server
          const response = await fetch("/api/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Login failed");

      const { token, user: userData } = await response.json();
      localStorage.setItem("token", token);
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Usage in components
function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Hello, {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <>{children}</>;
}
```

### 2.6 Multiple Contexts

Có thể dùng nhiều contexts cùng lúc:

```tsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <MainContent />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// Component sử dụng nhiều contexts
function Header() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <header className={theme}>
      <span>{user?.name}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </header>
  );
}
```

---

## 3. useReducer DEEP DIVE

### 3.1 Reducer là gì?

Reducer là một **pure function** nhận vào state hiện tại và một action, trả về state mới.

```tsx
// Reducer signature
(state, action) => newState
```

**Đặc điểm của Reducer:**
- **Pure function** - không side effects
- **Immutable** - không mutate state, return state mới
- **Predictable** - cùng input luôn cho cùng output
- **Centralized** - tất cả state logic ở một nơi

### 3.2 Syntax cơ bản

```tsx
import { useReducer } from "react";

// 1. Define State type
interface CounterState {
  count: number;
}

// 2. Define Action types (discriminated union)
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET"; payload: number };

// 3. Initial state
const initialState: CounterState = { count: 0 };

// 4. Reducer function
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return initialState;
    case "SET":
      return { count: action.payload };
    default:
      // TypeScript đảm bảo không bao giờ đến đây
      return state;
  }
}

// 5. Use in component
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "SET", payload: 100 })}>
        Set to 100
      </button>
    </div>
  );
}
```

### 3.3 TypeScript cho Actions - Discriminated Unions

```tsx
// ❌ Không type-safe
type Action = {
  type: string;
  payload?: any;  // any = không safe
};

// ✅ Type-safe với Discriminated Unions
type TodoAction =
  | { type: "ADD_TODO"; payload: { id: string; text: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "SET_FILTER"; payload: "all" | "active" | "completed" };

// TypeScript tự biết payload type trong mỗi case
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      // TypeScript biết action.payload là { id: string; text: string }
      return {
        ...state,
        todos: [...state.todos, {
          id: action.payload.id,
          text: action.payload.text,  // ✅ Type-safe
          completed: false
        }],
      };
    case "TOGGLE_TODO":
      // TypeScript biết action.payload là { id: string }
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id  // ✅ Type-safe
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    // ...
  }
}
```

### 3.4 Immutability - Không bao giờ mutate!

```tsx
// ❌ WRONG - Mutating state
function badReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      state.todos.push(action.payload);  // MUTATION!
      return state;  // Same reference = React không detect change
    case "TOGGLE_TODO":
      const todo = state.todos.find(t => t.id === action.payload.id);
      todo.completed = !todo.completed;  // MUTATION!
      return state;
  }
}

// ✅ CORRECT - Always return new objects
function goodReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],  // New array
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>  // New array
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }  // New object
            : todo
        ),
      };
  }
}
```

**Cách update immutable:**

```tsx
// Add to array
return { ...state, items: [...state.items, newItem] };

// Remove from array
return { ...state, items: state.items.filter(item => item.id !== id) };

// Update item in array
return {
  ...state,
  items: state.items.map(item =>
    item.id === id ? { ...item, ...updates } : item
  )
};

// Update nested object
return {
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: newCity,
    },
  },
};
```

### 3.5 Lazy Initialization

Giống `useState`, có thể dùng function để tính initial state:

```tsx
// Useful khi initial state tính toán phức tạp
function init(initialCount: number): CounterState {
  // Có thể đọc từ localStorage, tính toán, etc.
  return {
    count: initialCount,
    history: [],
    lastUpdated: new Date(),
  };
}

function Counter({ initialCount }: { initialCount: number }) {
  // Third argument là init function
  const [state, dispatch] = useReducer(counterReducer, initialCount, init);
  //                                                   ^initial arg  ^init function
}
```

### 3.6 useState vs useReducer - Khi nào dùng gì?

```tsx
// ✅ useState: State đơn giản, independent
function SimpleForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
}

// ✅ useReducer: Complex state, related updates
function ComplexForm() {
  const [state, dispatch] = useReducer(formReducer, {
    values: { name: "", email: "", password: "" },
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: false,
  });

  // Single dispatch instead of multiple setters
  dispatch({ type: "SET_FIELD", field: "name", value: "John" });
  dispatch({ type: "VALIDATE_FORM" });
  dispatch({ type: "SUBMIT_START" });
}
```

| Tiêu chí | useState | useReducer |
|----------|----------|------------|
| State đơn giản (boolean, string, number) | ✅ Best | ❌ Overkill |
| State phức tạp (object với nhiều fields) | ❌ Messy | ✅ Best |
| State updates độc lập | ✅ Simple | ❌ Unnecessary |
| State updates liên quan nhau | ❌ Error-prone | ✅ Centralized |
| Cần debug/test logic | ❌ Scattered | ✅ Pure function, easy test |
| Next state phụ thuộc previous | OK | ✅ Clear pattern |

---

## 4. CONTEXT + REDUCER COMBO

### 4.1 Tại sao kết hợp?

```
Context alone:     Share state, nhưng logic phân tán
Reducer alone:     Centralized logic, nhưng local state

Context + Reducer: Share state + Centralized logic = Mini Redux
```

### 4.2 Basic Pattern

```tsx
import { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";

// ========================================
// 1. TYPES
// ========================================
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: "all" | "active" | "completed";
}

type TodoAction =
  | { type: "ADD_TODO"; payload: { id: string; text: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "SET_FILTER"; payload: "all" | "active" | "completed" };

// ========================================
// 2. INITIAL STATE & REDUCER
// ========================================
const initialState: TodoState = {
  todos: [],
  filter: "all",
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: action.payload.id, text: action.payload.text, completed: false },
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

// ========================================
// 3. CONTEXTS (Separate state & dispatch)
// ========================================
const TodoStateContext = createContext<TodoState | undefined>(undefined);
const TodoDispatchContext = createContext<Dispatch<TodoAction> | undefined>(undefined);

// ========================================
// 4. PROVIDER
// ========================================
export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// ========================================
// 5. CUSTOM HOOKS
// ========================================
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error("useTodoState must be used within TodoProvider");
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (context === undefined) {
    throw new Error("useTodoDispatch must be used within TodoProvider");
  }
  return context;
}

// Combined hook for convenience
export function useTodos() {
  return {
    state: useTodoState(),
    dispatch: useTodoDispatch(),
  };
}
```

### 4.3 Tại sao tách State và Dispatch Context?

```tsx
// ❌ Single Context - TẤT CẢ consumers re-render khi state thay đổi
const TodoContext = createContext<{
  state: TodoState;
  dispatch: Dispatch<TodoAction>;
} | undefined>(undefined);

function AddTodoButton() {
  const { dispatch } = useContext(TodoContext);  // Chỉ cần dispatch
  // Nhưng vẫn re-render khi state thay đổi!
}

// ✅ Separate Contexts - Chỉ re-render khi cần
function AddTodoButton() {
  const dispatch = useTodoDispatch();  // Không subscribe to state
  // KHÔNG re-render khi todos thay đổi!

  const handleAdd = () => {
    dispatch({ type: "ADD_TODO", payload: { id: "1", text: "New" } });
  };
}

function TodoCount() {
  const { todos } = useTodoState();  // Subscribe to state
  // Re-render khi todos thay đổi (expected)
  return <span>{todos.length} items</span>;
}
```

### 4.4 Usage in Components

```tsx
// Root - wrap với Provider
function App() {
  return (
    <TodoProvider>
      <div className="app">
        <AddTodoForm />
        <FilterButtons />
        <TodoList />
        <TodoStats />
      </div>
    </TodoProvider>
  );
}

// Component sử dụng dispatch
function AddTodoForm() {
  const dispatch = useTodoDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch({
      type: "ADD_TODO",
      payload: { id: crypto.randomUUID(), text: text.trim() },
    });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
}

// Component sử dụng state
function TodoList() {
  const { todos, filter } = useTodoState();
  const dispatch = useTodoDispatch();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              dispatch({ type: "TOGGLE_TODO", payload: { id: todo.id } })
            }
          />
          <span style={{
            textDecoration: todo.completed ? "line-through" : "none"
          }}>
            {todo.text}
          </span>
          <button
            onClick={() =>
              dispatch({ type: "DELETE_TODO", payload: { id: todo.id } })
            }
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

// Component sử dụng dispatch cho filter
function FilterButtons() {
  const { filter } = useTodoState();
  const dispatch = useTodoDispatch();

  return (
    <div>
      {(["all", "active", "completed"] as const).map((f) => (
        <button
          key={f}
          onClick={() => dispatch({ type: "SET_FILTER", payload: f })}
          style={{ fontWeight: filter === f ? "bold" : "normal" }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
```

### 4.5 Action Creators (Optional Pattern)

Để tránh typo và reuse logic:

```tsx
// Action creators
const todoActions = {
  addTodo: (text: string): TodoAction => ({
    type: "ADD_TODO",
    payload: { id: crypto.randomUUID(), text },
  }),
  toggleTodo: (id: string): TodoAction => ({
    type: "TOGGLE_TODO",
    payload: { id },
  }),
  deleteTodo: (id: string): TodoAction => ({
    type: "DELETE_TODO",
    payload: { id },
  }),
  setFilter: (filter: "all" | "active" | "completed"): TodoAction => ({
    type: "SET_FILTER",
    payload: filter,
  }),
};

// Usage
function AddTodoForm() {
  const dispatch = useTodoDispatch();

  const handleAdd = (text: string) => {
    dispatch(todoActions.addTodo(text));
  };
}
```

---

## 5. KHI NÀO DÙNG GÌ?

### Decision Tree

```
Cần share state giữa nhiều components?
├── NO → useState/useReducer local
└── YES → Có prop drilling? (>2 levels)
    ├── NO → Props là OK
    └── YES → useContext
        └── State logic phức tạp?
            ├── NO → Context + useState
            └── YES → Context + useReducer
```

### So sánh các patterns

| Pattern | Use Case | Ví dụ |
|---------|----------|-------|
| `useState` | State đơn giản, local | Form inputs, toggles |
| `useReducer` | Complex state, local | Form validation, wizard steps |
| `Context + useState` | Simple shared state | Theme, Locale |
| `Context + useReducer` | Complex shared state | Auth, Shopping cart, Todo app |
| Redux/Zustand | App-wide, nhiều features | Large apps, team development |

### Khi KHÔNG dùng Context

```tsx
// ❌ Dùng Context cho mọi thứ
const CounterContext = createContext(0);  // Overkill!

// ✅ Props vẫn OK cho parent-child đơn giản
function Parent() {
  const [count, setCount] = useState(0);
  return <Child count={count} onIncrement={() => setCount(c => c + 1)} />;
}
```

### Khi KHÔNG dùng useReducer

```tsx
// ❌ useReducer cho state đơn giản
const [state, dispatch] = useReducer(
  (state, action) => {
    switch (action.type) {
      case "TOGGLE": return !state;
      default: return state;
    }
  },
  false
);
// Quá phức tạp cho một boolean!

// ✅ useState đủ rồi
const [isOpen, setIsOpen] = useState(false);
```

---

## 6. COMMON MISTAKES & FIXES

### Mistake 1: Quên Provider

```tsx
// ❌ Error: useTheme must be used within ThemeProvider
function App() {
  return <ThemedButton />;  // Thiếu Provider!
}

// ✅ Wrap với Provider
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### Mistake 2: Mutate State trong Reducer

```tsx
// ❌ MUTATION - React không detect change
case "ADD_TODO":
  state.todos.push(action.payload);  // Mutate!
  return state;  // Same reference

// ✅ Return new object
case "ADD_TODO":
  return {
    ...state,
    todos: [...state.todos, action.payload],
  };
```

### Mistake 3: Quên return trong Reducer

```tsx
// ❌ Missing return - returns undefined
case "INCREMENT":
  state.count + 1;  // Expression, không phải return!

// ✅ Return new state
case "INCREMENT":
  return { ...state, count: state.count + 1 };
```

### Mistake 4: Object mới mỗi render trong Provider

```tsx
// ❌ Tạo object mới mỗi render -> tất cả consumers re-render
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* Object mới mỗi render! */}
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ Option 1: useMemo
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ Option 2: Tách State và Dispatch contexts (recommended)
// Như đã show ở phần Context + Reducer
```

### Mistake 5: Dispatch trong Render

```tsx
// ❌ Infinite loop!
function TodoList() {
  const { todos } = useTodoState();
  const dispatch = useTodoDispatch();

  dispatch({ type: "SET_FILTER", payload: "all" });  // Dispatch trong render!
  // -> state change -> re-render -> dispatch -> state change -> ...

  return <div>...</div>;
}

// ✅ Dispatch trong event handlers hoặc useEffect
function TodoList() {
  const dispatch = useTodoDispatch();

  // In event handler
  const handleClick = () => {
    dispatch({ type: "SET_FILTER", payload: "all" });
  };

  // Or in useEffect (with proper deps)
  useEffect(() => {
    dispatch({ type: "SET_FILTER", payload: "all" });
  }, []);  // Empty deps = chỉ chạy một lần

  return <button onClick={handleClick}>Reset filter</button>;
}
```

### Mistake 6: Sai Action Type

```tsx
// ❌ Typo - không báo lỗi với string
dispatch({ type: "ADD_TODOO", payload: text });  // Typo!

// ✅ TypeScript với union types báo lỗi ngay
type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string };

dispatch({ type: "ADD_TODOO", payload: text });
//              ^^^^^^^^^^^^ Error: Type '"ADD_TODOO"' is not assignable

// ✅ Hoặc dùng constants
const ActionTypes = {
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
} as const;

dispatch({ type: ActionTypes.ADD_TODO, payload: text });
```

---

## 7. BEST PRACTICES CHECKLIST

### useContext Checklist

- [ ] Luôn dùng `undefined` làm default value
- [ ] Tạo custom hook với error check
- [ ] Đặt tên hook có prefix `use` (useTheme, useAuth, useTodos)
- [ ] Export Provider và custom hook, không export Context trực tiếp
- [ ] Đặt Provider gần với nơi cần nhất (không nhất thiết ở root)
- [ ] Tách state và dispatch context nếu cần optimize re-renders

### useReducer Checklist

- [ ] Định nghĩa State type rõ ràng
- [ ] Dùng Discriminated Union cho Action types
- [ ] Reducer phải pure - không side effects
- [ ] KHÔNG BAO GIỜ mutate state
- [ ] Luôn return new object
- [ ] Handle default case (return state)
- [ ] Test reducer function riêng biệt

### Context + Reducer Combo Checklist

- [ ] Tách thành 2 contexts: State và Dispatch
- [ ] Tạo 2 custom hooks: useXxxState và useXxxDispatch
- [ ] Cân nhắc tạo combined hook cho convenience
- [ ] Đặt tất cả trong một file hoặc folder riêng
- [ ] Export: Provider, custom hooks, types, actions (nếu có)

---

## TÓM TẮT

```
useContext:
- Giải quyết prop drilling
- 3 bước: Create → Provide → Consume
- Luôn dùng custom hook với error check
- Use cases: Theme, Auth, Language, Preferences

useReducer:
- Quản lý complex state
- Pattern: (state, action) => newState
- TypeScript: Discriminated unions cho actions
- Immutable: Luôn return new object

Context + Reducer:
- Combine để có global state management
- Tách State và Dispatch contexts
- Pattern tương tự Redux nhưng đơn giản hơn
- Tốt cho: Auth system, Shopping cart, Todo app
```

---

**TIME TO PRACTICE!**

Chuyển sang các bài tập để thực hành những gì đã học.
