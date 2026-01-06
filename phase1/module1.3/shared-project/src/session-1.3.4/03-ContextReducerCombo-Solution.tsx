/**
 * Exercise 3: Context + Reducer Combo - Todo App with Global State (SOLUTION)
 *
 * COMPLETED VERSION with explanations
 */

import { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";

// ============================================================
// STEP 1: TYPE DEFINITIONS
// ============================================================

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";

// TodoState chua tat ca state cua Todo app
interface TodoState {
  todos: Todo[];      // Danh sach todos
  filter: FilterType; // Filter hien tai
}

// ============================================================
// STEP 2: ACTION TYPES (Discriminated Union)
// ============================================================

// Discriminated Union cho type-safety
// Moi action co type khac nhau, TypeScript biet payload trong moi case
type TodoAction =
  | { type: "ADD_TODO"; payload: { id: string; text: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "SET_FILTER"; payload: FilterType }
  | { type: "CLEAR_COMPLETED" };

// ============================================================
// STEP 3: INITIAL STATE & REDUCER
// ============================================================

const initialState: TodoState = {
  todos: [
    { id: "1", text: "Learn useContext", completed: true },
    { id: "2", text: "Learn useReducer", completed: true },
    { id: "3", text: "Build Todo App", completed: false },
  ],
  filter: "all",
};

// Reducer function - pure, immutable
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      // Them todo moi vao cuoi array
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false, // Moi todo chua completed
          },
        ],
      };

    case "TOGGLE_TODO":
      // Tim todo theo id va toggle completed
      // Dung map de tao array moi voi todo duoc update
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed } // Toggle
            : todo // Giu nguyen
        ),
      };

    case "DELETE_TODO":
      // Xoa todo theo id
      // Dung filter de tao array moi khong co todo bi xoa
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case "SET_FILTER":
      // Update filter
      return {
        ...state,
        filter: action.payload,
      };

    case "CLEAR_COMPLETED":
      // Xoa tat ca todos da completed
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    default:
      return state;
  }
}

// ============================================================
// STEP 4: CREATE CONTEXTS (Separate State & Dispatch)
// ============================================================

// Tach State va Dispatch de optimize re-renders:
// - Components chi can dispatch se khong re-render khi state thay doi
// - Components chi can doc state se khong re-render khi khong can

const TodoStateContext = createContext<TodoState | undefined>(undefined);
const TodoDispatchContext = createContext<Dispatch<TodoAction> | undefined>(undefined);

// ============================================================
// STEP 5: PROVIDER COMPONENT
// ============================================================

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  // useReducer tra ve [state, dispatch]
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Wrap voi 2 Providers (nested)
  // Tat ca children co the access state hoac dispatch thong qua hooks
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// ============================================================
// STEP 6: CUSTOM HOOKS
// ============================================================

// Hook de lay state - chi dung khi can doc state
export function useTodoState(): TodoState {
  const context = useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error("useTodoState must be used within TodoProvider");
  }
  return context;
}

// Hook de lay dispatch - chi dung khi can gui actions
export function useTodoDispatch(): Dispatch<TodoAction> {
  const context = useContext(TodoDispatchContext);
  if (context === undefined) {
    throw new Error("useTodoDispatch must be used within TodoProvider");
  }
  return context;
}

// Optional: Combined hook cho convenience
export function useTodos() {
  return {
    state: useTodoState(),
    dispatch: useTodoDispatch(),
  };
}

// ============================================================
// DEMO COMPONENTS
// ============================================================

function AddTodoForm() {
  // Chi can dispatch - khong subscribe to state
  // Component nay SE KHONG re-render khi todos thay doi!
  const dispatch = useTodoDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("todoText") as HTMLInputElement;
    const text = input.value.trim();

    if (!text) return;

    // Dispatch action de them todo
    dispatch({
      type: "ADD_TODO",
      payload: { id: crypto.randomUUID(), text },
    });

    input.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.5rem",
        marginBottom: "1rem",
      }}
    >
      <input
        name="todoText"
        type="text"
        placeholder="Add new todo..."
        style={{
          flex: 1,
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontSize: "1rem",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </form>
  );
}

function FilterButtons() {
  // Can ca state (de biet filter hien tai) va dispatch (de doi filter)
  const { filter } = useTodoState();
  const dispatch = useTodoDispatch();

  const filters: FilterType[] = ["all", "active", "completed"];

  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => dispatch({ type: "SET_FILTER", payload: f })}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: filter === f ? "#2196f3" : "#e0e0e0",
            color: filter === f ? "#fff" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            textTransform: "capitalize",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

function TodoList() {
  // Can ca state (de hien thi todos) va dispatch (de toggle/delete)
  const { todos, filter } = useTodoState();
  const dispatch = useTodoDispatch();

  // Filter todos theo filter hien tai
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {filteredTodos.map((todo) => (
        <li
          key={todo.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            marginBottom: "0.5rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              dispatch({ type: "TOGGLE_TODO", payload: { id: todo.id } })
            }
            style={{ width: "20px", height: "20px" }}
          />
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#999" : "#333",
            }}
          >
            {todo.text}
          </span>
          <button
            onClick={() =>
              dispatch({ type: "DELETE_TODO", payload: { id: todo.id } })
            }
            style={{
              padding: "0.25rem 0.5rem",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </li>
      ))}
      {filteredTodos.length === 0 && (
        <li style={{ textAlign: "center", color: "#999", padding: "1rem" }}>
          No todos to show
        </li>
      )}
    </ul>
  );
}

function TodoStats() {
  // Chi can doc state va dispatch
  const { todos } = useTodoState();
  const dispatch = useTodoDispatch();

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#e8f5e9",
        borderRadius: "8px",
        marginTop: "1rem",
      }}
    >
      <div>
        <span style={{ marginRight: "1rem" }}>Total: {total}</span>
        <span style={{ marginRight: "1rem" }}>Active: {active}</span>
        <span>Completed: {completed}</span>
      </div>
      {completed > 0 && (
        <button
          onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ContextReducerComboSolution() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exercise 3: Context + Reducer Combo - Todo App (Solution)</h2>

      <div
        style={{
          backgroundColor: "#e8f5e9",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Key Concepts:</h4>
        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>
            <strong>Context + Reducer</strong> - Global state management pattern
          </li>
          <li>
            <strong>Separate Contexts</strong> - State va Dispatch tach rieng de optimize
          </li>
          <li>
            <strong>Custom Hooks</strong> - useTodoState, useTodoDispatch
          </li>
          <li>
            <strong>Mini Redux</strong> - Pattern tuong tu Redux nhung don gian hon
          </li>
        </ul>
      </div>

      {/* TodoProvider wrap tat ca components can access todos */}
      <TodoProvider>
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: "1.5rem",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <AddTodoForm />
          <FilterButtons />
          <TodoList />
          <TodoStats />
        </div>
      </TodoProvider>

      {/* Pattern Summary */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f3e5f5",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Pattern Summary:</h4>
        <pre
          style={{
            backgroundColor: "#263238",
            color: "#ce93d8",
            padding: "1rem",
            borderRadius: "8px",
            overflow: "auto",
            margin: 0,
            fontSize: "0.85rem",
          }}
        >
{`// 1. DEFINE Types (State, Actions)
interface State { /* ... */ }
type Action = /* ... */

// 2. CREATE Reducer
function reducer(state: State, action: Action): State { /* ... */ }

// 3. CREATE Contexts (separate state & dispatch)
const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

// 4. CREATE Provider
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

// 5. CREATE Custom Hooks
function useMyState() {
  const context = useContext(StateContext);
  if (!context) throw new Error("...");
  return context;
}

function useMyDispatch() {
  const context = useContext(DispatchContext);
  if (!context) throw new Error("...");
  return context;
}

// 6. USE in App
<Provider>
  <MyComponent />  {/* Can access state/dispatch bat ky dau */}
</Provider>`}
        </pre>
      </div>
    </div>
  );
}
