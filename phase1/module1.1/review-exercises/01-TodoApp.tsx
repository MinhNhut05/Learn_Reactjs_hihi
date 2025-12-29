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

import { useState, FormEvent, ChangeEvent, MouseEvent, ReactNode } from 'react'

// ============================================
// TODO 1: Define interface Todo
// ============================================
// Gợi ý: id, title, completed, priority ('low' | 'medium' | 'high'), createdAt

interface Todo {
  // YOUR CODE HERE
}

// ============================================
// TODO 2: Define FilterType
// ============================================

type FilterType = '' // YOUR CODE HERE: 'all' | 'active' | 'completed'

// ============================================
// TODO 3: Implement useLocalStorage hook
// ============================================
// Gợi ý: Generic hook với lazy initialization

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // YOUR CODE HERE

  // 1. useState với lazy initialization từ localStorage
  // 2. setValue function sync với localStorage
  // 3. Return tuple [value, setValue]

  return [initialValue, () => {}] // Replace this
}

// ============================================
// TODO 4: TodoForm Component
// ============================================
// Props: onAdd callback

interface TodoFormProps {
  // YOUR CODE HERE
}

function TodoForm({ onAdd }: TodoFormProps) {
  // State cho title và priority

  // handleSubmit với FormEvent<HTMLFormElement>
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // YOUR CODE HERE
    // 1. e.preventDefault()
    // 2. Validate title không empty
    // 3. Call onAdd với new todo
    // 4. Clear form
  }

  // handleTitleChange với ChangeEvent<HTMLInputElement>
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // YOUR CODE HERE
  }

  // handlePriorityChange với ChangeEvent<HTMLSelectElement>
  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // YOUR CODE HERE
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* YOUR JSX HERE */}
      {/* Input for title */}
      {/* Select for priority: low, medium, high */}
      {/* Submit button */}
    </form>
  )
}

// ============================================
// TODO 5: Generic TodoList Component
// ============================================

interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
  emptyMessage?: string
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage = 'No items' }: ListProps<T>) {
  // YOUR CODE HERE
  // 1. Check if empty, show emptyMessage
  // 2. Map items và render

  return null // Replace this
}

// ============================================
// TODO 6: TodoItem Component
// ============================================

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
    // YOUR CODE HERE
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    // YOUR CODE HERE
    // Gợi ý: e.stopPropagation() để không trigger toggle
  }

  // Priority colors
  const priorityColors = {
    low: '#4ade80',
    medium: '#fbbf24',
    high: '#f87171'
  }

  return (
    <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
      {/* YOUR JSX HERE */}
      {/* Checkbox hoặc visual indicator cho completed */}
      {/* Title với line-through nếu completed */}
      {/* Priority badge */}
      {/* Delete button */}
    </div>
  )
}

// ============================================
// TODO 7: TodoFilters Component
// ============================================

interface TodoFiltersProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

function TodoFilters({ currentFilter, onFilterChange }: TodoFiltersProps) {
  // YOUR CODE HERE
  // 3 buttons: All, Active, Completed

  return null // Replace this
}

// ============================================
// TODO 8: TodoStats Component
// ============================================

interface TodoStatsProps {
  todos: Todo[]
}

function TodoStats({ todos }: TodoStatsProps) {
  // YOUR CODE HERE
  // Hiển thị: X completed / Y total

  return null // Replace this
}

// ============================================
// TODO 9: Main TodoApp Component
// ============================================

export default function TodoApp() {
  // 1. useLocalStorage cho todos
  // 2. useState cho filter

  // Add todo function
  const addTodo = (todoData: Pick<Todo, 'title' | 'priority'>) => {
    // YOUR CODE HERE
    // Generate id, set completed = false, createdAt = new Date()
  }

  // Toggle todo function
  const toggleTodo = (id: string) => {
    // YOUR CODE HERE
  }

  // Delete todo function
  const deleteTodo = (id: string) => {
    // YOUR CODE HERE
  }

  // Filter todos based on current filter
  const filteredTodos: Todo[] = []
  // YOUR CODE HERE

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo App</h1>

      {/* TodoForm */}

      {/* TodoFilters */}

      {/* TodoStats */}

      {/* List<Todo> với TodoItem */}
    </div>
  )
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
