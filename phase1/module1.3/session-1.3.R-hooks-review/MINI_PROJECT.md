# 🚀 Mini Project: Task Manager App

## Overview

Build một Task Manager app sử dụng **TẤT CẢ hooks** đã học trong Module 1.3.

**Time Estimate:** 2-3 giờ

---

## Features Required

### Core Features

1. ➕ Add tasks (text input)
2. ✅ Toggle task completion
3. 🗑️ Delete tasks
4. 🔍 Filter tasks (All/Active/Completed)
5. 🔎 Search tasks (with debounce)
6. 🌓 Theme toggle (Light/Dark)
7. 💾 Persist to localStorage

---

## Technical Requirements - Hooks Usage

| Requirement                   | Hook          | Location                     |
| ----------------------------- | ------------- | ---------------------------- |
| Local input state             | `useState`    | TaskForm, TaskSearch         |
| Persist to localStorage       | `useEffect`   | useLocalStorage hook         |
| Focus input after add         | `useRef`      | TaskForm                     |
| Memoize handlers for TaskItem | `useCallback` | TaskList                     |
| Filter + search calculation   | `useMemo`     | TaskList                     |
| Theme state sharing           | `useContext`  | ThemeContext                 |
| Task state management         | `useReducer`  | TaskContext                  |
| Reusable logic                | Custom Hooks  | useLocalStorage, useDebounce |

---

## Project Structure

```
session-1.3.R/
└── TaskManager/
    ├── types/
    │   └── index.ts           # Task, Filter, Action types
    │
    ├── reducers/
    │   └── taskReducer.ts     # Task state reducer
    │
    ├── context/
    │   ├── TaskContext.tsx    # Tasks + dispatch provider
    │   └── ThemeContext.tsx   # Theme + toggle provider
    │
    ├── hooks/
    │   ├── useLocalStorage.ts # Persist to storage
    │   ├── useDebounce.ts     # Delay value updates
    │   └── useTaskStats.ts    # Calculate stats
    │
    ├── components/
    │   ├── TaskForm.tsx       # Add new task
    │   ├── TaskList.tsx       # List container with filter
    │   ├── TaskItem.tsx       # Single task (React.memo!)
    │   ├── TaskFilter.tsx     # Filter buttons
    │   ├── TaskSearch.tsx     # Search input
    │   ├── TaskStats.tsx      # Show stats
    │   └── ThemeToggle.tsx    # Theme switcher
    │
    └── TaskManager.tsx        # Main component
```

---

## Step-by-Step Guide

### ⏱️ Step 1: Types & Reducer (20 phút)

**File:** `types/index.ts`

```tsx
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type Filter = "all" | "active" | "completed";

export type TaskAction =
  | { type: "ADD_TASK"; text: string }
  | { type: "TOGGLE_TASK"; id: string }
  | { type: "DELETE_TASK"; id: string }
  | { type: "CLEAR_COMPLETED" }
  | { type: "SET_TASKS"; tasks: Task[] };
```

**File:** `reducers/taskReducer.ts`

- Handle all action types
- Generate unique ID for new tasks
- Return new state (immutable!)

---

### ⏱️ Step 2: Custom Hooks (30 phút)

**`useLocalStorage<T>(key, initialValue)`**

- `useState` với lazy init từ localStorage
- `useEffect` để sync với localStorage

**`useDebounce<T>(value, delay)`**

- `useState` cho debounced value
- `useEffect` với setTimeout/clearTimeout

**`useTaskStats(tasks)`**

- `useMemo` để calculate total, active, completed

---

### ⏱️ Step 3: Contexts (30 phút)

**`TaskContext`**

- `useReducer` cho task state
- `useLocalStorage` để persist
- Provide `{ tasks, dispatch }`

**`ThemeContext`**

- `useState` cho theme
- `useLocalStorage` để persist
- `useCallback` cho toggle function
- Provide `{ theme, toggleTheme }`

---

### ⏱️ Step 4: Components (60 phút)

**Build order (bottom-up):**

1. **TaskItem** (React.memo!)

   - Props: task, onToggle, onDelete
   - Display task với checkbox và delete button

2. **TaskForm**

   - `useState` cho input
   - `useRef` để focus sau khi add
   - `useContext(TaskContext)` để dispatch

3. **TaskFilter**

   - Props: currentFilter, onFilterChange
   - 3 buttons: All, Active, Completed

4. **TaskSearch**

   - `useState` cho search input
   - Props: onSearch

5. **TaskList**

   - `useContext(TaskContext)` cho tasks
   - `useState` cho filter
   - `useMemo` cho filtered + searched tasks
   - `useCallback` cho handlers (pass to TaskItem)

6. **TaskStats**

   - `useContext(TaskContext)` cho tasks
   - `useTaskStats` custom hook

7. **ThemeToggle**
   - `useContext(ThemeContext)`
   - Button to toggle

---

### ⏱️ Step 5: Integration (30 phút)

**TaskManager.tsx**

```tsx
<ThemeProvider>
  <TaskProvider>
    <div className={theme}>
      <h1>Task Manager</h1>
      <ThemeToggle />
      <TaskStats />
      <TaskForm />
      <TaskSearch />
      <TaskFilter />
      <TaskList />
    </div>
  </TaskProvider>
</ThemeProvider>
```

---

## Hooks Checklist

Khi hoàn thành, verify bạn đã dùng:

- [ ] `useState` - TaskForm input, TaskSearch input, filter state
- [ ] `useEffect` - useLocalStorage sync, useDebounce timeout
- [ ] `useRef` - TaskForm input focus
- [ ] `useCallback` - TaskList handlers for TaskItem
- [ ] `useMemo` - TaskList filtered tasks, useTaskStats
- [ ] `useContext` - Components consume TaskContext, ThemeContext
- [ ] `useReducer` - TaskContext state management
- [ ] Custom Hooks - useLocalStorage, useDebounce, useTaskStats
- [ ] `React.memo` - TaskItem optimization

---

## Tips

1. **Start simple**: Get basic add/toggle/delete working first
2. **Add features incrementally**: Filter → Search → Theme → Persist
3. **Check console**: No warnings about missing deps
4. **Test performance**: Open React DevTools Profiler
5. **Reference solution**: Xem `*-Solution.tsx` files nếu stuck
