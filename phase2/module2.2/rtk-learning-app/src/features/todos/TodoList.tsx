// ============================================
// SESSION 2.2.1 - TodoList Component
// ============================================

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clearCompleted } from './todosSlice';
import { selectFilteredTodos, selectActiveCount, selectCompletedCount } from './selectors';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import FilterButtons from './FilterButtons';

export default function TodoList() {
  const filteredTodos = useAppSelector(selectFilteredTodos);
  const activeCount = useAppSelector(selectActiveCount);
  const completedCount = useAppSelector(selectCompletedCount);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span>📝</span> Todo App
      </h2>

      {/* Add Todo Form */}
      <div className="mb-6">
        <AddTodo />
      </div>

      {/* Todo Items */}
      <div className="space-y-3 mb-6">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No todos to show</p>
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">
          {activeCount} item{activeCount !== 1 ? 's' : ''} left
        </span>

        <FilterButtons />

        {completedCount > 0 && (
          <button
            onClick={() => dispatch(clearCompleted())}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}
