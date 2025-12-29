// 03-TodoOptimize.tsx

import { useState, useRef, useEffect, memo, useCallback } from 'react'

/**
 * EXERCISE 3: Todo App với Optimization
 *
 * 🎯 MỤC TIÊU:
 * Áp dụng React.memo và useCallback để optimize performance.
 *
 * 📋 YÊU CẦU:
 *
 * 1. TODO APP (Parent):
 *    - State `todos`: array of Todo objects
 *    - State `inputValue`: string cho input field
 *    - Render count tracker
 *    - Input + Button để add todo
 *    - Render TodoList component
 *
 * 2. TODO LIST COMPONENT:
 *    - Props: todos array, onDelete function
 *    - Render danh sách TodoItem
 *    - Render count tracker
 *    - **WRAP với React.memo**
 *
 * 3. TODO ITEM COMPONENT:
 *    - Props: todo object, onDelete function
 *    - Hiển thị todo text + delete button
 *    - Render count tracker
 *    - **WRAP với React.memo**
 *
 * 4. OPTIMIZATION:
 *    - Dùng useCallback cho onDelete function trong Parent
 *    - Quan sát: typing → chỉ Parent re-render
 *    - TodoList và TodoItem KHÔNG re-render khi typing
 *
 * 🔍 QUAN SÁT:
 * - Typing trong input → CHỈ Parent re-render
 * - TodoList và TodoItem giữ nguyên render count
 * - Add/Delete todo → TodoList re-render (expected)
 *
 * 💡 GỢI Ý:
 * - memo(Component) để wrap component
 * - useCallback(() => {...}, [deps]) để stable function
 * - onDelete cần dùng functional update: setTodos(prev => ...)
 */

// ===== TYPES =====
interface Todo {
  id: number
  text: string
  completed: boolean
}

// ===== PARENT: TODO APP =====
function TodoOptimize() {
  // TODO 1: State cho todos array
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React.memo', completed: false },
    { id: 2, text: 'Learn useCallback', completed: false },
  ])

  // TODO 2: State cho input value
  const [inputValue, setInputValue] = useState('')

  // TODO 3: Ref để đếm renders
  const renderCount = useRef(0)

  // TODO 4: useEffect để log và đếm renders
  useEffect(() => {
    renderCount.current += 1
    console.log('📱 TodoApp rendered!')
  })

  // TODO 5: Handler để add todo
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }
      setTodos(prev => [...prev, newTodo])
      setInputValue('')
    }
  }

  // TODO 6: Handler để delete todo - DÙNG useCallback!
  // ❌ Không có useCallback - function mới mỗi render
  // const handleDeleteTodo = (id: number) => {
  //   setTodos(prev => prev.filter(todo => todo.id !== id))
  // }

  // ✅ Có useCallback - function stable
  const handleDeleteTodo = useCallback((id: number) => {
    console.log('🗑️ Deleting todo:', id)
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, []) // Empty deps vì dùng functional update

  // TODO 7: Handler cho input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // TODO 8: Handler cho Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  // Tạm để tránh warning - xóa khi implement
  void memo
  void useCallback

  return (
    <div className="section">
      <h2 className="section-title">Exercise 3: Todo App với Optimization</h2>

      {/* Parent render count */}
      <div className="component-box parent">
        <span className="component-label">📱 TodoApp (Parent)</span>

        <p className="mb-20">
          <strong>Parent Render Count:</strong>{' '}
          <span className="render-count">
            {renderCount.current}
          </span>
        </p>

        {/* Input section */}
        <div className="flex gap-10 mb-20">
          {/* TODO 9: Input field */}
          <input
            type="text"
            className="form-input"
            placeholder="Enter a new todo..."
            style={{ flex: 1 }}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          {/* TODO 10: Add button */}
          <button
            className="btn btn-success"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>

        {/* TODO 11: Render TodoList với props */}
        {/* Thay thế placeholder bằng: <TodoList todos={todos} onDelete={handleDeleteTodo} /> */}
        <TodoList todos={todos} onDelete={handleDeleteTodo} />
      </div>

      {/* Observation box */}
      <div className="card" style={{ marginTop: '20px', background: '#d4edda' }}>
        <div className="card-body">
          <h4>✅ Kết quả mong đợi sau khi optimize:</h4>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>Typing trong input → <strong>CHỈ Parent</strong> render count tăng</li>
            <li>TodoList và TodoItem render count <strong>KHÔNG đổi</strong></li>
            <li>Add todo → TodoList re-render (expected)</li>
            <li>Delete todo → TodoList re-render (expected)</li>
          </ul>
        </div>
      </div>

      {/* Tips box */}
      <div className="card" style={{ marginTop: '20px', background: '#e2e3ff' }}>
        <div className="card-body">
          <h4>💡 Tips để Optimize:</h4>
          <ol style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>Wrap <code>TodoList</code> với <code>React.memo</code></li>
            <li>Wrap <code>TodoItem</code> với <code>React.memo</code></li>
            <li>Dùng <code>useCallback</code> cho <code>handleDeleteTodo</code></li>
            <li>Dùng functional update trong setTodos để tránh dependency</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

// ===== TODO LIST COMPONENT =====
// TODO 12: Wrap với React.memo
// Thay: function TodoList(...) → const TodoList = memo(function TodoList(...))

interface TodoListProps {
  todos: Todo[]
  onDelete: (id: number) => void
}

// ❌ Chưa optimize - re-render mỗi khi parent re-render
function TodoList({ todos, onDelete }: TodoListProps) {
// ✅ Đã optimize - chỉ re-render khi props thay đổi
// const TodoList = memo(function TodoList({ todos, onDelete }: TodoListProps) {

  // TODO 13: Ref và useEffect để đếm renders
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current += 1
    console.log('📋 TodoList rendered!')
  })

  return (
    <div className="component-box child" style={{ marginTop: '20px' }}>
      <span className="component-label">📋 TodoList</span>

      <p className="mb-10">
        <strong>TodoList Render Count:</strong>{' '}
        <span className="render-count">
          {renderCount.current}
        </span>
      </p>

      {todos.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          No todos yet. Add one above!
        </p>
      ) : (
        <div className="list">
          {todos.map(todo => (
            // TODO 14: Render TodoItem với props
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
// }) // ← Uncomment khi dùng memo

// ===== TODO ITEM COMPONENT =====
// TODO 15: Wrap với React.memo

interface TodoItemProps {
  todo: Todo
  onDelete: (id: number) => void
}

// ❌ Chưa optimize
function TodoItem({ todo, onDelete }: TodoItemProps) {
// ✅ Đã optimize
// const TodoItem = memo(function TodoItem({ todo, onDelete }: TodoItemProps) {

  // TODO 16: Ref và useEffect để đếm renders
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current += 1
    console.log(`📝 TodoItem "${todo.text}" rendered!`)
  })

  return (
    <div className="todo-item">
      <span className="todo-text">{todo.text}</span>

      {/* Render count badge */}
      <span
        className="badge badge-primary"
        style={{ marginRight: '10px' }}
      >
        renders: {renderCount.current}
      </span>

      {/* TODO 17: Delete button */}
      <button
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        title="Delete todo"
      >
        ×
      </button>
    </div>
  )
}
// }) // ← Uncomment khi dùng memo

export default TodoOptimize
