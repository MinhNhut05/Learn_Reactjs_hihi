/**
 * BÀI TẬP 1: TODO APP với TypeScript
 *
 * Kiến thức cần dùng:
 * - Session 1.1.1: Interface, Union Types, Generic <T>
 * - Session 1.1.2: ChangeEvent, FormEvent, MouseEvent
 * - Session 1.1.3: useLocalStorage hook
 * - Session 1.1.4: Partial, Pick
 *
 * Thời gian: 45-60 phút
 */

import { useState, FormEvent, ChangeEvent, MouseEvent, ReactNode } from "react";

// ============================================
// TODO 1: Define interface Todo
// ============================================
// Gợi ý: id, title, completed, priority ('low' | 'medium' | 'high'), createdAt

interface Todo {
  // YOUR CODE HERE
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createAt: Date;
}

// ============================================
// TODO 2: Define FilterType
// ============================================

type FilterType = "all" | "active" | "completed";
// YOUR CODE HERE: 'all' | 'active' | 'completed'

// ============================================
// TODO 3: Implement useLocalStorage hook
// ============================================
// Gợi ý: Generic hook với lazy initialization

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // YOUR CODE HERE
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(`Error reading localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error setting localStorage key "${key}":`, err);
    }
  };
  // 1. useState với lazy initialization từ localStorage
  // 2. setValue function sync với localStorage
  // 3. Return tuple [value, setValue]

  return [storedValue, setValue]; // Replace this
}

// ============================================
// TODO 4: TodoForm Component
// ============================================
// Props: onAdd callback

interface TodoFormProps {
  onAdd: (data: Pick<Todo, "title" | "priority">) => void;
}

function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTile] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");
  // handleSubmit với FormEvent<HTMLFormElement>
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // YOUR CODE HERE
    // 1. e.preventDefault()
    // 2. Validate title không empty
    // 3. Call onAdd với new todo
    // 4. Clear form
    e.preventDefault;
    if (title.trim() === "") return;
    onAdd({ title: title.trim(), priority });
    setTile("");
    setPriority("medium");
  };

  // handleTitleChange với ChangeEvent<HTMLInputElement>
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTile(e.target.value);
  };

  // handlePriorityChange với ChangeEvent<HTMLSelectElement>
  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Todo["priority"]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
      <div style={{ display: "flex", gap: "12px" }}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="What needs to be done?"
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />

        <select
          value={priority}
          onChange={handlePriorityChange}
          style={{
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "12px 24px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
    </form>
  );
}

// ============================================
// TODO 5: Generic TodoList Component
// ============================================

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
}

function List<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = "No items",
}: ListProps<T>) {
  // YOUR CODE HERE
  // 1. Check if empty, show emptyMessage
  // 2. Map items và render
  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af" }}>
        {emptyMessage}
      </div>
    );
  }
  return (
    <div>
      {items.map((item) => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

// ============================================
// TODO 6: TodoItem Component
// ============================================

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
    onToggle(todo.id);
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    // YOUR CODE HERE
    // Gợi ý: e.stopPropagation() để không trigger toggle
    e.stopPropagation;
    onDelete(todo.id);
  };

  // Priority colors
  const priorityColors = {
    low: "#4ade80",
    medium: "#fbbf24",
    high: "#f87171",
  };

  return (
    <div
      onClick={handleToggle}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        marginBottom: "8px",
        cursor: "pointer",
        backgroundColor: todo.completed ? "#f9fafb" : "white",
      }}
    >
      {/* Checkbox visual */}
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: `2px solid ${todo.completed ? "#10b981" : "#d1d5db"}`,
          backgroundColor: todo.completed ? "#10b981" : "transparent",
          marginRight: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {todo.completed && "✓"}
      </div>

      {/* Title - strikethrough if completed */}
      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#9ca3af" : "#1f2937",
        }}
      >
        {todo.title}
      </span>

      {/* Priority Badge */}
      <span
        style={{
          padding: "4px 12px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: "bold",
          backgroundColor: priorityColors[todo.priority],
          color: "white",
          marginRight: "12px",
        }}
      >
        {todo.priority}
      </span>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        style={{
          padding: "8px 16px",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
}

// ============================================
// TODO 7: TodoFilters Component
// ============================================

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

function TodoFilters({ currentFilter, onFilterChange }: TodoFiltersProps) {
  const filters: FilterType[] = ["all", "active", "completed"];

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => filter}
          style={{
            padding: "8px 20px",
            border: "none",
            borderRadius: "999px",
            cursor: "pointer",
            backgroundColor: currentFilter === filter ? "#3b82f6" : "#e5e7eb",
            color: currentFilter === filter ? "white" : "#374151",
            fontWeight: currentFilter === filter ? "bold" : "normal",
            textTransform: "capitalize",
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

// ============================================
// TODO 8: TodoStats Component
// ============================================

interface TodoStatsProps {
  todos: Todo[];
}

function TodoStats({ todos }: TodoStatsProps) {
  // YOUR CODE HERE
  // Hiển thị: X completed / Y total

  return null; // Replace this
}

// ============================================
// TODO 9: Main TodoApp Component
// ============================================

export default function TodoApp() {
  // 1. useLocalStorage cho todos
  // 2. useState cho filter

  // Add todo function
  const addTodo = (todoData: Pick<Todo, "title" | "priority">) => {
    // YOUR CODE HERE
    // Generate id, set completed = false, createdAt = new Date()
  };

  // Toggle todo function
  const toggleTodo = (id: string) => {
    // YOUR CODE HERE
  };

  // Delete todo function
  const deleteTodo = (id: string) => {
    // YOUR CODE HERE
  };

  // Filter todos based on current filter
  const filteredTodos: Todo[] = [];
  // YOUR CODE HERE

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Todo App</h1>

      {/* TodoForm */}

      {/* TodoFilters */}

      {/* TodoStats */}

      {/* List<Todo> với TodoItem */}
    </div>
  );
}

// ============================================
// BONUS CHALLENGES (sau khi hoàn thành main features)
// ============================================

/*
 * BONUS 1: Keyboard shortcuts trong TodoForm
 * - Enter để submit (đã có với form)
 * - Escape để clear input
 *
 * BONUS 2: Sort todos by priority
 * - Add SortControls component
 * - Sort: high > medium > low
 *
 * BONUS 3: Edit todo inline
 * - Double click để edit
 * - Enter để save, Escape để cancel
 */
