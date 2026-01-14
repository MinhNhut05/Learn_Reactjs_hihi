import { useTaskContext } from "../context/TaskContext";
import { useTaskStats } from "../hooks/useTaskStats";

/**
 * TaskStats - Component hiển thị thống kê tasks
 * 
 * Hiển thị:
 * - Total: tổng số tasks
 * - Active: số tasks chưa hoàn thành
 * - Completed: số tasks đã hoàn thành
 * 
 * Hooks sử dụng:
 * - useTaskContext: lấy danh sách tasks
 * - useTaskStats: tính toán thống kê (custom hook)
 */

export function TaskStats() {
  // Lấy tasks từ Context
  const { tasks } = useTaskContext();
  
  // Tính toán stats bằng custom hook
  // Hook này sử dụng useMemo để tối ưu
  const stats = useTaskStats(tasks);

  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        padding: "1rem",
        background: "#f5f5f5",
        borderRadius: "4px",
        marginBottom: "1rem",
      }}
    >
      {/* Total tasks */}
      <div>
        <strong>Total:</strong> {stats.total}
      </div>
      
      {/* Active tasks - màu xanh */}
      <div style={{ color: "#2196F3" }}>
        <strong>Active:</strong> {stats.active}
      </div>
      
      {/* Completed tasks - màu xanh lá */}
      <div style={{ color: "#4CAF50" }}>
        <strong>Completed:</strong> {stats.completed}
      </div>
    </div>
  );
}

/**
 * Tại sao tách ra custom hook?
 * 
 * Lợi ích:
 * 1. Separation of Concerns:
 *    - Logic tính toán ở hook
 *    - UI ở component
 * 
 * 2. Reusability:
 *    - Có thể dùng lại ở component khác
 *    - Dễ test
 * 
 * 3. Performance:
 *    - useMemo trong hook tối ưu tính toán
 *    - Chỉ tính lại khi tasks thay đổi
 */
