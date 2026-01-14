# Task Manager - Flow Coding Guide

> File này hướng dẫn bạn code theo **tư duy của developer thật**.
> Mỗi bước giải thích: **Làm gì? Tại sao? Làm như thế nào?**

---

## Tổng quan: Dependency Graph

```
                    ┌─────────────────┐
                    │   types/index   │  ← Bắt đầu từ đây
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
      ┌──────────────┐ ┌──────────┐ ┌─────────────┐
      │ taskReducer  │ │  Hooks   │ │  Contexts   │
      └──────┬───────┘ └────┬─────┘ └──────┬──────┘
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                    ┌──────────────┐
                    │  Components  │
                    └──────┬───────┘
                           ▼
                    ┌──────────────┐
                    │ TaskManager  │  ← Kết thúc ở đây
                    └──────────────┘
```

**Quy tắc vàng:** Code từ dưới lên (bottom-up) - file nào KHÔNG phụ thuộc file khác thì làm trước.

---

## PHASE 1: Foundation (Nền tảng)

### Step 1.1: Types - Định nghĩa dữ liệu

**File:** `types/index.ts`

**Tại sao làm đầu tiên?**
- Mọi file khác đều import types từ đây
- Nếu types sai, tất cả đều sai
- TypeScript sẽ giúp bạn catch lỗi sớm

**Làm gì?**
```typescript
// 1. Task type - đại diện cho 1 task
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

// 2. Filter type - các trạng thái filter
export type Filter = "all" | "active" | "completed";

// 3. Theme type - light/dark mode
export type Theme = "light" | "dark";

// 4. TaskAction type - các action cho reducer
export type TaskAction =
  | { type: "ADD_TASK"; text: string }
  | { type: "TOGGLE_TASK"; id: string }
  | { type: "DELETE_TASK"; id: string }
  | { type: "CLEAR_COMPLETED" }
  | { type: "SET_TASKS"; tasks: Task[] };

// 5. TaskStats type - thống kê
export interface TaskStats {
  total: number;
  active: number;
  completed: number;
}
```

**Kiểm tra:** File này KHÔNG import gì từ project → OK để làm đầu tiên.

**Checklist:**
- [ ] Định nghĩa Task interface
- [ ] Định nghĩa Filter type
- [ ] Định nghĩa Theme type
- [ ] Định nghĩa TaskAction union type
- [ ] Định nghĩa TaskStats interface

---

### Step 1.2: Reducer - Logic xử lý state

**File:** `reducers/taskReducer.ts`

**Tại sao làm sau types?**
- Reducer cần import `Task` và `TaskAction` từ types
- Reducer là "não" của app - xử lý mọi thay đổi state
- Context sẽ dùng reducer này

**Tư duy:**
```
User click "Add Task"
  → dispatch({ type: "ADD_TASK", text: "..." })
  → reducer nhận action
  → reducer trả về state mới
  → UI re-render
```

**Làm gì?**
```typescript
import type { Task, TaskAction } from "../types";

export const initialState: Task[] = [];

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "ADD_TASK":
      // Tạo task mới, thêm vào đầu array
      return [
        {
          id: crypto.randomUUID(), // hoặc Date.now().toString()
          text: action.text,
          completed: false,
          createdAt: Date.now(),
        },
        ...state,
      ];

    case "TOGGLE_TASK":
      // Map qua array, toggle task có id matching
      return state.map((task) =>
        task.id === action.id
          ? { ...task, completed: !task.completed }
          : task
      );

    case "DELETE_TASK":
      // Filter bỏ task có id matching
      return state.filter((task) => task.id !== action.id);

    case "CLEAR_COMPLETED":
      // Giữ lại những task chưa completed
      return state.filter((task) => !task.completed);

    case "SET_TASKS":
      // Replace toàn bộ (dùng khi load từ localStorage)
      return action.tasks;

    default:
      return state;
  }
}
```

**Lưu ý quan trọng:**
- LUÔN return array MỚI (immutable)
- KHÔNG mutate state trực tiếp
- Mỗi case phải return, không được quên

**Checklist:**
- [ ] Import types
- [ ] Implement ADD_TASK (tạo id unique, thêm vào array)
- [ ] Implement TOGGLE_TASK (map + toggle)
- [ ] Implement DELETE_TASK (filter)
- [ ] Implement CLEAR_COMPLETED (filter)
- [ ] Implement SET_TASKS (replace all)

---

## PHASE 2: Custom Hooks

### Step 2.1: useLocalStorage - Lưu data vào browser

**File:** `hooks/useLocalStorage.ts`

**Tại sao làm hook này?**
- Tasks cần được lưu lại khi refresh trang
- Theme preference cũng cần lưu
- Tách logic localStorage ra hook riêng → reusable

**Tư duy:**
```
Component mount → đọc từ localStorage → set state
State thay đổi → ghi vào localStorage
```

**Làm gì?**
```typescript
import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Lazy init: chỉ đọc localStorage 1 lần khi mount
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Sync to localStorage khi value thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore errors (quota exceeded, etc.)
    }
  }, [key, value]);

  return [value, setValue];
}
```

**Checklist:**
- [ ] Lazy initialization với useState(() => ...)
- [ ] Try/catch khi parse JSON
- [ ] useEffect sync to localStorage
- [ ] Return tuple [value, setValue]

---

### Step 2.2: useDebounce - Delay search input

**File:** `hooks/useDebounce.ts`

**Tại sao cần hook này?**
- Khi user gõ search, không muốn filter mỗi keystroke
- Chờ user ngừng gõ 300ms rồi mới filter
- Tránh re-render liên tục, tốt cho performance

**Tư duy:**
```
User gõ "a" → chờ...
User gõ "ab" → reset timer, chờ lại...
User ngừng 300ms → OK, cập nhật debounced value
```

**Làm gì?**
```typescript
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set timeout để update sau delay
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clear timeout nếu value thay đổi trước khi timeout
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}
```

**Checklist:**
- [ ] useState cho debounced value
- [ ] useEffect với setTimeout
- [ ] Cleanup function clear timeout
- [ ] Dependencies: [value, delay]

---

### Step 2.3: useTaskStats - Tính thống kê

**File:** `hooks/useTaskStats.ts`

**Tại sao cần hook này?**
- Hiển thị "3 active, 2 completed" ở footer
- Tính toán từ tasks array
- useMemo để tránh tính lại mỗi render

**Làm gì?**
```typescript
import { useMemo } from "react";
import type { Task, TaskStats } from "../types";

export function useTaskStats(tasks: Task[]): TaskStats {
  return useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    return {
      total: tasks.length,
      active: tasks.length - completed,
      completed,
    };
  }, [tasks]);
}
```

**Checklist:**
- [ ] Import useMemo
- [ ] Wrap calculation trong useMemo
- [ ] Dependency array: [tasks]
- [ ] Return TaskStats object

---

## PHASE 3: Contexts

### Step 3.1: TaskContext - Chia sẻ tasks state

**File:** `context/TaskContext.tsx`

**Tại sao cần Context?**
- Nhiều components cần access tasks: TaskList, TaskStats, TaskForm
- Không muốn prop drilling (truyền props qua nhiều level)
- Context = global state cho component tree

**Tư duy:**
```
TaskProvider (wrap app)
  └── TaskForm (cần dispatch)
  └── TaskList (cần tasks)
  └── TaskStats (cần tasks)

Tất cả đều useTaskContext() để lấy { tasks, dispatch }
```

**Làm gì?**
```typescript
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type PropsWithChildren,
} from "react";
import type { Task, TaskAction } from "../types";
import { taskReducer, initialState } from "../reducers/taskReducer";

const STORAGE_KEY = "task-manager-tasks";

interface TaskContextType {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: PropsWithChildren) {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        dispatch({ type: "SET_TASKS", tasks: JSON.parse(saved) });
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }
  return context;
}
```

**Checklist:**
- [ ] Tạo context với createContext
- [ ] TaskProvider component với useReducer
- [ ] Load từ localStorage khi mount
- [ ] Save vào localStorage khi tasks thay đổi
- [ ] Custom hook useTaskContext với error handling

---

### Step 3.2: ThemeContext - Dark/Light mode

**File:** `context/ThemeContext.tsx`

**Tại sao tách riêng?**
- Theme và Tasks là 2 concerns khác nhau
- Single Responsibility Principle
- Dễ maintain, dễ test

**Làm gì?**
```typescript
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type PropsWithChildren,
} from "react";
import type { Theme } from "../types";

const STORAGE_KEY = "task-manager-theme";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
      // Check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
      return "light";
    } catch {
      return "light";
    }
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
```

**Checklist:**
- [ ] Lazy init từ localStorage + system preference
- [ ] toggleTheme với useCallback (memoized)
- [ ] useEffect sync to localStorage
- [ ] Custom hook với error handling

---

## PHASE 4: Components (Bottom-up)

### Step 4.1: TaskItem - Component nhỏ nhất

**File:** `components/TaskItem.tsx`

**Tại sao làm đầu tiên?**
- Không phụ thuộc component khác
- TaskList sẽ render nhiều TaskItem
- Cần React.memo để optimize

**Làm gì?**
```typescript
import { memo } from "react";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskItemComponent({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "0.75rem" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span
        style={{
          flex: 1,
          marginLeft: "0.5rem",
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "#999" : "inherit",
        }}
      >
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

// React.memo: chỉ re-render khi props thay đổi
export const TaskItem = memo(TaskItemComponent);
```

**Tại sao dùng memo?**
- Khi 1 task thay đổi, chỉ TaskItem đó re-render
- Các TaskItem khác giữ nguyên (props không đổi)
- Performance boost khi có nhiều tasks

**Checklist:**
- [ ] Nhận props: task, onToggle, onDelete
- [ ] Checkbox toggle completed
- [ ] Text với strikethrough khi completed
- [ ] Delete button
- [ ] Wrap với React.memo

---

### Step 4.2: TaskForm - Thêm task mới

**File:** `components/TaskForm.tsx`

**Làm gì?**
```typescript
import { useState, useRef, type FormEvent } from "react";
import { useTaskContext } from "../context/TaskContext";

export function TaskForm() {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useTaskContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({ type: "ADD_TASK", text: trimmed });
    setText("");
    inputRef.current?.focus(); // Focus lại input sau khi add
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
```

**Hooks sử dụng:**
- useState: quản lý input value
- useRef: focus input sau khi submit
- useContext (qua useTaskContext): lấy dispatch

**Checklist:**
- [ ] useState cho input text
- [ ] useRef cho input element
- [ ] useTaskContext để lấy dispatch
- [ ] handleSubmit: validate, dispatch, clear, focus

---

### Step 4.3: TaskFilter - Filter buttons

**File:** `components/TaskFilter.tsx`

```typescript
import type { Filter } from "../types";

interface TaskFilterProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  const filters: Filter[] = ["all", "active", "completed"];

  return (
    <div>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          style={{
            background: currentFilter === filter ? "#2196F3" : "#fff",
            color: currentFilter === filter ? "#fff" : "#000",
          }}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}
```

**Checklist:**
- [ ] Nhận currentFilter và onFilterChange props
- [ ] Render 3 buttons
- [ ] Highlight button active
- [ ] Call onFilterChange khi click

---

### Step 4.4: TaskSearch - Search input

**File:** `components/TaskSearch.tsx`

```typescript
import { useState } from "react";

interface TaskSearchProps {
  onSearch: (query: string) => void;
}

export function TaskSearch({ onSearch }: TaskSearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Parent sẽ debounce
  };

  return (
    <input
      value={query}
      onChange={handleChange}
      placeholder="Search tasks..."
    />
  );
}
```

---

### Step 4.5: TaskList - Render danh sách

**File:** `components/TaskList.tsx`

```typescript
import { useMemo, useCallback } from "react";
import type { Filter } from "../types";
import { useTaskContext } from "../context/TaskContext";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  filter: Filter;
  searchQuery: string;
}

export function TaskList({ filter, searchQuery }: TaskListProps) {
  const { tasks, dispatch } = useTaskContext();

  // Memoize: chỉ tính lại khi dependencies thay đổi
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
      })
      .filter((task) =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [tasks, filter, searchQuery]);

  // Memoize handlers: TaskItem dùng memo, cần stable references
  const handleToggle = useCallback(
    (id: string) => dispatch({ type: "TOGGLE_TASK", id }),
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: string) => dispatch({ type: "DELETE_TASK", id }),
    [dispatch]
  );

  return (
    <div>
      {filteredTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
```

**Tại sao useMemo và useCallback?**
- `useMemo`: filter là expensive operation, không muốn chạy mỗi render
- `useCallback`: TaskItem dùng memo, nếu handler thay đổi reference thì memo vô nghĩa

**Checklist:**
- [ ] useTaskContext lấy tasks và dispatch
- [ ] useMemo cho filteredTasks
- [ ] useCallback cho handleToggle và handleDelete
- [ ] Render TaskItem với key={task.id}

---

### Step 4.6: TaskStats - Hiển thị thống kê

**File:** `components/TaskStats.tsx`

```typescript
import { useTaskContext } from "../context/TaskContext";
import { useTaskStats } from "../hooks/useTaskStats";

export function TaskStats() {
  const { tasks, dispatch } = useTaskContext();
  const stats = useTaskStats(tasks);

  return (
    <div>
      <span>{stats.active} items left</span>
      {stats.completed > 0 && (
        <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
          Clear completed ({stats.completed})
        </button>
      )}
    </div>
  );
}
```

---

### Step 4.7: ThemeToggle - Nút đổi theme

**File:** `components/ThemeToggle.tsx`

```typescript
import { useThemeContext } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
```

---

## PHASE 5: Wire Everything Together

### Step 5.1: TaskManager - Main Component

**File:** `TaskManager.tsx`

**Đây là bước cuối cùng!**

```typescript
import { useState } from "react";
import type { Filter } from "./types";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";
import { useDebounce } from "./hooks/useDebounce";
import { TaskForm } from "./components/TaskForm";
import { TaskFilter } from "./components/TaskFilter";
import { TaskSearch } from "./components/TaskSearch";
import { TaskList } from "./components/TaskList";
import { TaskStats } from "./components/TaskStats";
import { ThemeToggle } from "./components/ThemeToggle";

function TaskManagerContent() {
  const { theme } = useThemeContext();
  const [filter, setFilter] = useState<Filter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const bgColor = theme === "dark" ? "#1a1a1a" : "#fff";
  const textColor = theme === "dark" ? "#fff" : "#000";

  return (
    <div style={{ background: bgColor, color: textColor, padding: "2rem" }}>
      <header>
        <h1>Task Manager</h1>
        <ThemeToggle />
      </header>

      <TaskForm />

      <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
        <TaskSearch onSearch={setSearchQuery} />
      </div>

      <TaskList filter={filter} searchQuery={debouncedSearch} />

      <TaskStats />
    </div>
  );
}

export function TaskManager() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <TaskManagerContent />
      </TaskProvider>
    </ThemeProvider>
  );
}
```

**Tại sao tách TaskManagerContent?**
- useThemeContext cần được gọi TRONG ThemeProvider
- Nếu gọi ở TaskManager (ngoài Provider) sẽ lỗi
- Pattern: Wrapper component + Content component

---

## Summary Checklist

```
PHASE 1: Foundation
[ ] types/index.ts - Task, Filter, Theme, TaskAction, TaskStats
[ ] reducers/taskReducer.ts - 5 action types

PHASE 2: Custom Hooks
[ ] hooks/useLocalStorage.ts - lazy init + sync
[ ] hooks/useDebounce.ts - setTimeout + cleanup
[ ] hooks/useTaskStats.ts - useMemo calculation

PHASE 3: Contexts
[ ] context/TaskContext.tsx - useReducer + localStorage
[ ] context/ThemeContext.tsx - useState + localStorage

PHASE 4: Components
[ ] components/TaskItem.tsx - memo + props
[ ] components/TaskForm.tsx - useState + useRef + dispatch
[ ] components/TaskFilter.tsx - controlled buttons
[ ] components/TaskSearch.tsx - controlled input
[ ] components/TaskList.tsx - useMemo + useCallback
[ ] components/TaskStats.tsx - custom hook
[ ] components/ThemeToggle.tsx - context consumer

PHASE 5: Main
[ ] TaskManager.tsx - wire everything together
```

---

## Tips

1. **Test từng bước:** Sau mỗi file, check xem có lỗi TypeScript không
2. **Console.log:** Thêm log để debug khi cần
3. **So sánh Solution:** Mở file *-Solution.tsx bên cạnh để tham khảo
4. **Đừng copy paste:** Gõ tay để nhớ lâu hơn

**Good luck! 🚀**
