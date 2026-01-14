import { useState, useRef, type FormEvent } from "react";
import { useTaskContext } from "../context/TaskContext";

/**
 * TaskForm - Component để thêm task mới
 * 
 * Chức năng:
 * - Input để nhập task
 * - Button để submit
 * - Tự động focus vào input sau khi thêm task
 * 
 * Hooks sử dụng:
 * - useState: quản lý giá trị input
 * - useRef: tham chiếu đến DOM element (input)
 * - useContext: lấy dispatch từ TaskContext
 */
export function TaskForm() {
  // State lưu giá trị người dùng đang gõ
  const [text, setText] = useState("");

  // Ref để tham chiếu đến input element
  // Dùng để focus vào input sau khi submit
  const inputRef = useRef<HTMLInputElement>(null);

  // Lấy dispatch từ TaskContext để dispatch actions
  const { dispatch } = useTaskContext();

  /**
   * Xử lý khi submit form
   * 1. Ngăn reload trang (preventDefault)
   * 2. Kiểm tra input không rỗng
   * 3. Dispatch action ADD_TASK
   * 4. Clear input
   * 5. Focus lại input để tiếp tục nhập
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Ngăn reload trang

    // Trim để loại bỏ khoảng trắng thừa
    const trimmedText = text.trim();
    
    // Nếu rỗng thì không làm gì
    if (!trimmedText) return;

    // Dispatch action để thêm task mới vào state
    dispatch({ type: "ADD_TASK", text: trimmedText });
    
    // Clear input
    setText("");
    
    // Focus vào input (optional chaining vì ref có thể null)
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      {/* Input với ref để có thể focus */}
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus // Tự động focus khi component mount
        style={{
          padding: "0.75rem",
          fontSize: "1rem",
          border: "1px solid #ddd",
          borderRadius: "4px",
          width: "300px",
          marginRight: "0.5rem",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>
    </form>
  );
}
