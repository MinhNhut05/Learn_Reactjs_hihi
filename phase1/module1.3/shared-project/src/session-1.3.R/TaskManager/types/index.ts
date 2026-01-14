// Task Manager Types

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type Filter = "all" | "active" | "completed";

// Action types for useReducer
export type TaskAction =
  | { type: "ADD_TASK"; text: string }
  | { type: "TOGGLE_TASK"; id: string }
  | { type: "DELETE_TASK"; id: string }
  | { type: "CLEAR_COMPLETED" }
  | { type: "SET_TASKS"; tasks: Task[] };

// Theme types
export type Theme = "light" | "dark";

// Stats type
export interface TaskStats {
  total: number;
  active: number;
  completed: number;
}
