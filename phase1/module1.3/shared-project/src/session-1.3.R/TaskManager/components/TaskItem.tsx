import { memo } from "react";
import type { Task } from "../types";

/**
 * TaskItem - Component hiển thị 1 task
 * 
 * Props:
 * - task: object chứa thông tin task
 * - onToggle: callback khi click checkbox
 * - onDelete: callback khi click delete
 * 
 * Tối ưu:
 * - Sử dụng React.memo để tránh re-render không cần thiết
 * - Chỉ re-render khi task, onToggle, hoặc onDelete thay đổi
 */

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskItemComponent({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0.75rem",
        borderBottom: "1px solid #eee",
        gap: "1rem",
      }}
    >
      {/* Checkbox để toggle completed status */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)} // Gọi callback với id
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
      />

      {/* Text với style thay đổi theo trạng thái completed */}
      <span
        style={{
          flex: 1,
          // Nếu completed => gạch ngang
          textDecoration: task.completed ? "line-through" : "none",
          // Nếu completed => màu xám
          color: task.completed ? "#999" : "inherit",
        }}
      >
        {task.text}
      </span>

      {/* Button xóa task */}
      <button
        onClick={() => onDelete(task.id)} // Gọi callback với id
        style={{
          padding: "0.25rem 0.5rem",
          background: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
}

/**
 * React.memo - HOC (Higher Order Component)
 * 
 * Chức năng:
 * - So sánh props cũ và mới (shallow comparison)
 * - Nếu props không đổi => không re-render
 * - Tối ưu performance khi có nhiều TaskItem
 * 
 * Ví dụ:
 * - TaskList re-render vì theme thay đổi
 * - Nhưng tasks không đổi
 * - => TaskItem không re-render (nhờ memo)
 */
export const TaskItem = memo(TaskItemComponent);
