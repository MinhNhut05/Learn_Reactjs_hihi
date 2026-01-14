import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type PropsWithChildren,
} from "react";
import type { Task, TaskAction } from "../types";
import { taskReducer, initialState } from "../reducers/taskReducer";

// Key để lưu tasks vào localStorage
const STORAGE_KEY = "task-manager-tasks";

// Type definition cho Context
interface TaskContextType {
  tasks: Task[]; // Danh sách tasks
  dispatch: React.Dispatch<TaskAction>; // Hàm dispatch actions
}

// Tạo Context với giá trị mặc định là null
const TaskContext = createContext<TaskContextType | null>(null);

/**
 * TaskProvider - Component bao bọc app để cung cấp task state
 *
 * Sử dụng:
 * - useReducer: quản lý state phức tạp (ADD, TOGGLE, DELETE...)
 * - useEffect: đồng bộ với localStorage
 */
export function TaskProvider({ children }: PropsWithChildren) {
  // useReducer quản lý tasks state với taskReducer
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  // Effect 1: Load tasks từ localStorage khi component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Task[];

        // Chuyển đổi string thành Date object (vì JSON không lưu được Date)
        const tasksWithDates = parsed.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }));

        // Dispatch action SET_TASKS để cập nhật state
        dispatch({ type: "SET_TASKS", tasks: tasksWithDates });
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
    }
  }, []); // [] = chỉ chạy 1 lần khi mount

  // Effect 2: Lưu tasks vào localStorage mỗi khi tasks thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]); // Chạy mỗi khi tasks thay đổi

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

/**
 * useTaskContext - Custom hook để sử dụng TaskContext
 *
 * Tự động kiểm tra xem component có được bao bọc bởi TaskProvider không
 * Nếu không => throw error với message rõ ràng
 */
export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }

  return context;
}

/**
 * Luồng hoạt động:
 *
 * 1. App khởi động:
 *    - TaskProvider mount
 *    - useReducer tạo state với initialState = []
 *    - useEffect 1 chạy, load từ localStorage
 *    - dispatch SET_TASKS
 *    - tasks state được cập nhật
 *
 * 2. User thêm task:
 *    - Component gọi dispatch({ type: "ADD_TASK", text: "..." })
 *    - taskReducer xử lý, trả về state mới
 *    - tasks state cập nhật
 *    - useEffect 2 trigger, lưu vào localStorage
 *
 * 3. Child components:
 *    - Gọi useTaskContext() để lấy { tasks, dispatch }
 *    - Hiển thị tasks hoặc dispatch actions
 */
