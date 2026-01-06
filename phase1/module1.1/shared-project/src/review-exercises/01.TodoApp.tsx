import { useState, FormEvent, ChangeEvent, MouseEvent, ReactNode } from "react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

type FilterType = "all" | "active" | "completed";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

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

interface TodoFormProps {
  onAdd: (data: Pick<Todo, "title" | "priority">) => void;
}

function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === "") return;

    onAdd({ title: title.trim(), priority });
    setTitle("");
    setPriority("medium");
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

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
            fontSize: "16px",
          }}
        >
          Add
        </button>
      </div>
    </form>
  );
}

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
    e.stopPropagation();
    onDelete(todo.id);
  };

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
        transition: "background-color 0.2s",
      }}
    >
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

      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#9ca3af" : "#1f2937",
        }}
      >
        {todo.title}
      </span>

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
          onClick={() => onFilterChange(filter)}
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

interface TodoStatsProps {
  todos: Todo[];
}

function TodoStats({ todos }: TodoStatsProps) {
  const completed = todos.filter((t) => t.completed).length;
  const total = todos.length;

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f3f4f6",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <span style={{ fontWeight: "bold", color: "#10b981" }}>{completed}</span>
      <span style={{ color: "#6b7280" }}> completed / </span>
      <span style={{ fontWeight: "bold", color: "#3b82f6" }}>{total}</span>
      <span style={{ color: "#6b7280" }}> total</span>
    </div>
  );
}

export default function TodoApp1() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = (data: Pick<Todo, "title" | "priority">) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: data.title,
      priority: data.priority,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "24px", color: "#1f2937" }}>Todo App</h1>

      <TodoForm onAdd={addTodo} />

      <TodoFilters currentFilter={filter} onFilterChange={setFilter} />

      <TodoStats todos={todos} />

      <List<Todo>
        items={filteredTodos}
        keyExtractor={(todo) => todo.id}
        renderItem={(todo) => (
          <TodoItem todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
        emptyMessage={
          filter === "all"
            ? "No todos yet. Add one above!"
            : `No ${filter} todos`
        }
      />
    </div>
  );
}
