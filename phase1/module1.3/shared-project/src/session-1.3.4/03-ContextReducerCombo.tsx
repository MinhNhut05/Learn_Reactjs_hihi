/**
 * Exercise 3: Context + Reducer Combo - Todo App with Global State
 * Difficulty: Expert
 * Time: 30-40 minutes
 *
 * LEARNING GOALS:
 * - Ket hop Context va Reducer de quan ly global state
 * - Tach State va Dispatch contexts de optimize re-renders
 * - Tao custom hooks cho state va dispatch
 * - Hieu pattern "Mini Redux"
 *
 * SCENARIO:
 * Xay dung Todo App voi global state:
 * - Add, toggle, delete todos
 * - Filter: all, active, completed
 * - Bat ky component nao cung co the access/modify todos
 *
 * FILL-IN-THE-BLANK MODE:
 * - Dien vao cac cho ??? de hoan thanh code
 * - Moi cho can dien co <- hint de huong dan
 * - Xem Hints section o cuoi component neu can tro giup
 */

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

// ============================================================
// STEP 1: TYPE DEFINITIONS
// ============================================================

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";

// TODO: Dinh nghia TodoState interface
interface TodoState {
  todos: Todo[]; // <- Todo
  filter: FilterType; // <- FilterType
}

// ============================================================
// STEP 2: ACTION TYPES (Discriminated Union)
// Fill: Dinh nghia cac action types
// ============================================================

// TODO: Dinh nghia union type cho 5 actions
type TodoAction =
  | { type: "ADD_TODO"; payload: { id: string; text: string } } // <- ADD_TODO
  | { type: "TOGGLE_TODO"; payload: { id: string } } // <- id
  | { type: "DELETE_TODO"; payload: { id: string } } // <- DELETE_TODO
  | { type: "SET_FILTER"; payload: FilterType } // <- FilterType
  | { type: "CLEAR_COMPLETED" };

// ============================================================
// STEP 3: INITIAL STATE & REDUCER
// Fill: Hoan thanh reducer logic
// ============================================================

const initialState: TodoState = {
  todos: [
    { id: "1", text: "Learn useContext", completed: true },
    { id: "2", text: "Learn useReducer", completed: true },
    { id: "3", text: "Build Todo App", completed: false },
  ],
  filter: "all",
};

// TODO: Hoan thanh reducer function
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            text: action.payload.text, // <- text
            completed: false,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(
          (
            todo // <- map
          ) =>
            todo.id === action.payload.id
              ? { ...todo, completed: !todo.completed } // <- completed
              : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id), // <- filter
      };

    case "SET_FILTER":
      return {
        ...state, // <- ...state
        filter: action.payload,
      };

    case "CLEAR_COMPLETED":
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
// Fill: Tao 2 contexts
// ============================================================

// TODO: Tao context cho State
const TodoStateContext = createContext<TodoState | undefined>(undefined);
//                       ^createContext               ^undefined

// TODO: Tao context cho Dispatch
const TodoDispatchContext = createContext<Dispatch<TodoAction> | undefined>(
  undefined
);
//                                        ^Dispatch<TodoAction>

// ============================================================
// STEP 5: PROVIDER COMPONENT
// Fill: Hoan thanh Provider
// ============================================================

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  // TODO: Su dung useReducer
  const [state, dispatch] = useReducer(todoReducer, initialState);
  //                        ^useReducer  ^todoReducer  ^initialState

  // Tach thanh 2 Providers de optimize re-renders
  return (
    <TodoStateContext.Provider value={state}>
      {/* ^TodoStateContext */}
      <TodoDispatchContext.Provider value={dispatch}>
        {/*                                ^dispatch */}
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
    //  ^TodoStateContext
  );
}

// ============================================================
// STEP 6: CUSTOM HOOKS
// Fill: Tao 2 custom hooks
// ============================================================

// Hook de lay state
export function useTodoState(): TodoState {
  const context = useContext(TodoStateContext); // <- useContext
  if (context === undefined) {
    throw new Error("useTodoState must be used within TodoProvider");
  }
  return context;
}

// Hook de lay dispatch
export function useTodoDispatch(): Dispatch<TodoAction> {
  const context = useContext(TodoDispatchContext); // <- TodoDispatchContext
  if (context === undefined) {
    throw new Error("useTodoDispatch must be used within TodoProvider");
  }
  return context;
}

// ============================================================
// DEMO COMPONENTS (DONE)
// ============================================================

function AddTodoForm() {
  const dispatch = useTodoDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("todoText") as HTMLInputElement;
    const text = input.value.trim();

    if (!text) return;

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
  const { todos, filter } = useTodoState();
  const dispatch = useTodoDispatch();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
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

export default function ContextReducerComboExercise() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exercise 3: Context + Reducer Combo - Todo App</h2>

      <div
        style={{
          backgroundColor: "#fff3e0",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Instructions:</h4>
        <ol style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>Dinh nghia TodoState interface</li>
          <li>Dinh nghia Action union types</li>
          <li>Hoan thanh reducer function (5 cases)</li>
          <li>Tao 2 contexts (State & Dispatch)</li>
          <li>Hoan thanh TodoProvider</li>
          <li>Tao custom hooks</li>
        </ol>
      </div>

      {/* Wrap voi TodoProvider */}
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

      {/* Hints Section */}
      <details style={{ marginTop: "2rem" }}>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          Show Hints
        </summary>
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h4>Hints for each blank:</h4>
          <pre
            style={{
              backgroundColor: "#263238",
              color: "#aed581",
              padding: "1rem",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "0.85rem",
            }}
          >
            {`// STEP 1: State interface
interface TodoState {
  todos: Todo[];
  filter: FilterType;
}

// STEP 2: Action types
type TodoAction =
  | { type: "ADD_TODO"; payload: { id: string; text: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "SET_FILTER"; payload: FilterType }
  | { type: "CLEAR_COMPLETED" };

// STEP 3: Reducer
case "ADD_TODO":
  return { ...state, todos: [...state.todos, { ..., text: action.payload.text, ... }] };
case "TOGGLE_TODO":
  return { ...state, todos: state.todos.map(...) };  // map de update
case "DELETE_TODO":
  return { ...state, todos: state.todos.filter(...) };  // filter de xoa
case "SET_FILTER":
  return { ...state, filter: action.payload };

// STEP 4: Contexts
const TodoStateContext = createContext<TodoState | undefined>(undefined);
const TodoDispatchContext = createContext<Dispatch<TodoAction> | undefined>(undefined);

// STEP 5: Provider
const [state, dispatch] = useReducer(todoReducer, initialState);
<TodoStateContext.Provider value={state}>
  <TodoDispatchContext.Provider value={dispatch}>

// STEP 6: Custom hooks
const context = useContext(TodoStateContext);
const context = useContext(TodoDispatchContext);`}
          </pre>
        </div>
      </details>
    </div>
  );
}
