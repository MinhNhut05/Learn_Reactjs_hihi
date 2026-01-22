// ============================================
// SESSION 2.2.1 - REAL EXERCISE: Todo Slice
// ============================================
// Mục tiêu: CRUD operations với Redux Toolkit
//
// TODO 1: Implement addTodo với prepare callback
// TODO 2: Implement toggleTodo
// TODO 3: Implement deleteTodo
// TODO 4: Implement clearCompleted
// ============================================

import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Types
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodosState {
  items: Todo[];
}

// Initial state với sample data
const initialState: TodosState = {
  items: [
    {
      id: nanoid(),
      text: "Learn Redux Toolkit",
      completed: false,
      createdAt: Date.now() - 3600000,
    },
    {
      id: nanoid(),
      text: "Understand createSlice",
      completed: true,
      createdAt: Date.now() - 1800000,
    },
    {
      id: nanoid(),
      text: "Build Counter App",
      completed: false,
      createdAt: Date.now(),
    },
  ],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // addTodo với prepare callback - generate id và createdAt
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
      },
      prepare: (text: string) => ({
        payload: {
          id: nanoid(),
          text,
          completed: false,
          createdAt: Date.now(),
        },
      }),
    },

    // Toggle completed status
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    // Delete todo by id
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },

    // Clear all completed todos
    clearCompleted: (state) => {
      state.items = state.items.filter((t) => !t.completed);
    },
  },
});

// Export actions
export const { addTodo, toggleTodo, deleteTodo, clearCompleted } =
  todosSlice.actions;

// Basic selectors
export const selectAllTodos = (state: RootState) => state.todos.items;

export default todosSlice.reducer;
