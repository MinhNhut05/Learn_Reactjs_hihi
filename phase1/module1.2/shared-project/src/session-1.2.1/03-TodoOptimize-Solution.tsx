// 03-TodoOptimize-Solution.tsx

import { useState, useRef, useEffect, memo, useCallback } from 'react'

/**
 * SOLUTION: Exercise 3 - Todo App với Optimization
 *
 * Đây là solution hoàn chỉnh với React.memo và useCallback.
 * Hãy tự làm exercise trước khi xem solution!
 *
 * KEY POINTS:
 * 1. TodoList wrapped với React.memo
 * 2. TodoItem wrapped với React.memo
 * 3. handleDeleteTodo dùng useCallback với empty deps
 * 4. Functional update trong setTodos để tránh stale closure
 */

// ===== TYPES =====
interface Todo {
  id: number
  text: string
  completed: boolean
}

// ===== PARENT: TODO APP =====
function TodoOptimizeSolution() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React.memo', completed: false },
    { id: 2, text: 'Learn useCallback', completed: false },
  ])
  const [inputValue, setInputValue] = useState('')
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log('📱 TodoApp rendered!')
  })

  // Add todo handler
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      }
      setTodos(prev => [...prev, newTodo])
      setInputValue('')
    }
  }

  // Delete todo handler - STABLE với useCallback!
  // Dùng functional update (prev =>) để tránh cần todos trong deps
  const handleDeleteTodo = useCallback((id: number) => {
    console.log('🗑️ handleDeleteTodo called for id:', id)
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, []) // Empty deps vì dùng functional update

  // Input change handler - không cần useCallback vì không pass xuống memo component
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // Enter key handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  console.log('🔵 Rendering TodoApp...')

  return (
    <div className="section">
      <h2 className="section-title">Exercise 3: Todo App với Optimization (Solution)</h2>

      {/* Parent render count */}
      <div className="component-box parent">
        <span className="component-label">📱 TodoApp (Parent)</span>

        <p className="mb-20">
          <strong>Parent Render Count:</strong>{' '}
          <span className="render-count">{renderCount.current}</span>
        </p>

        {/* Input section */}
        <div className="flex gap-10 mb-20">
          <input
            type="text"
            className="form-input"
            placeholder="Enter a new todo..."
            style={{ flex: 1 }}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-success" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>

        {/* Memoized TodoList */}
        <TodoList todos={todos} onDelete={handleDeleteTodo} />
      </div>

      {/* Explanation box */}
      <div className="card" style={{ marginTop: '20px', background: '#d4edda' }}>
        <div className="card-body">
          <h4>✅ Optimization Applied:</h4>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>
              <code>TodoList</code> wrapped với <code>React.memo</code>
            </li>
            <li>
              <code>TodoItem</code> wrapped với <code>React.memo</code>
            </li>
            <li>
              <code>handleDeleteTodo</code> dùng <code>useCallback</code> với empty deps
            </li>
            <li>
              Functional update <code>setTodos(prev =&gt; ...)</code> để tránh stale closure
            </li>
          </ul>
        </div>
      </div>

      {/* Test instructions */}
      <div className="card" style={{ marginTop: '20px', background: '#e3f2fd' }}>
        <div className="card-body">
          <h4>🧪 Cách test optimization:</h4>
          <ol style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>Gõ text trong input → Chỉ Parent render count tăng</li>
            <li>TodoList và TodoItem render counts <strong>KHÔNG đổi</strong></li>
            <li>Add todo → TodoList re-render (expected)</li>
            <li>Delete todo → TodoList re-render (expected)</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

// ===== MEMOIZED TODO LIST COMPONENT =====
interface TodoListProps {
  todos: Todo[]
  onDelete: (id: number) => void
}

const TodoList = memo(function TodoList({ todos, onDelete }: TodoListProps) {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log('📋 TodoList rendered!')
  })

  console.log('🟢 Rendering TodoList...')

  return (
    <div className="component-box child" style={{ marginTop: '20px' }}>
      <span className="component-label">📋 TodoList (memoized)</span>

      <p className="mb-10">
        <strong>TodoList Render Count:</strong>{' '}
        <span className="render-count">{renderCount.current}</span>
      </p>

      {todos.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          No todos yet. Add one above!
        </p>
      ) : (
        <div className="list">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
})

// ===== MEMOIZED TODO ITEM COMPONENT =====
interface TodoItemProps {
  todo: Todo
  onDelete: (id: number) => void
}

const TodoItem = memo(function TodoItem({ todo, onDelete }: TodoItemProps) {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log(`📝 TodoItem "${todo.text}" rendered!`)
  })

  return (
    <div className="todo-item">
      <span className="todo-text">{todo.text}</span>

      {/* Render count badge */}
      <span className="badge badge-primary" style={{ marginRight: '10px' }}>
        renders: {renderCount.current}
      </span>

      <button
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        title="Delete todo"
      >
        ×
      </button>
    </div>
  )
})

export default TodoOptimizeSolution
