import type { Task, TaskAction } from "../types";

// State ban đầu là mảng rỗng
export const initialState: Task[] = [];

/**
 * taskReducer - Quản lý state của danh sách tasks
 * 
 * Reducer là một pure function nhận vào:
 * - state hiện tại
 * - action (hành động cần thực hiện)
 * 
 * Và trả về state mới
 */
export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "ADD_TASK":
      // Thêm task mới vào cuối mảng
      // crypto.randomUUID() tạo ID ngẫu nhiên duy nhất
      return [
        ...state, // Giữ nguyên các task cũ
        {
          id: crypto.randomUUID(), // Tạo ID duy nhất
          text: action.text, // Nội dung task từ action
          completed: false, // Mặc định chưa hoàn thành
          createdAt: new Date(), // Thời gian tạo
        },
      ];

    case "TOGGLE_TASK":
      // Đảo trạng thái completed của task có id trùng khớp
      return state.map((task) =>
        task.id === action.id 
          ? { ...task, completed: !task.completed } // Đảo trạng thái
          : task // Giữ nguyên các task khác
      );

    case "DELETE_TASK":
      // Lọc bỏ task có id trùng khớp
      return state.filter((task) => task.id !== action.id);

    case "CLEAR_COMPLETED":
      // Xóa tất cả task đã hoàn thành
      return state.filter((task) => !task.completed);

    case "SET_TASKS":
      // Gán lại toàn bộ danh sách tasks (dùng khi load từ localStorage)
      return action.tasks;

    default:
      // Nếu action không khớp, trả về state cũ
      return state;
  }
}
