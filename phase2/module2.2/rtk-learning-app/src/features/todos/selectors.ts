// ============================================
// SESSION 2.2.1 - Memoized Selectors
// ============================================
// Sử dụng createSelector để tránh unnecessary re-renders

import { createSelector } from '@reduxjs/toolkit';
import { selectAllTodos } from './todosSlice';
import { selectFilter } from './filterSlice';

// Memoized selector - chỉ recalculate khi todos hoặc filter thay đổi
export const selectFilteredTodos = createSelector(
  [selectAllTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }
);

// Count active todos
export const selectActiveCount = createSelector([selectAllTodos], (todos) =>
  todos.filter((t) => !t.completed).length
);

// Count completed todos
export const selectCompletedCount = createSelector([selectAllTodos], (todos) =>
  todos.filter((t) => t.completed).length
);
