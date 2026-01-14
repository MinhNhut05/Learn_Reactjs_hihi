import { useMemo, useCallback } from "react";
import type { Filter } from "../types";
import { useTaskContext } from "../context/TaskContext";
import { TaskItem } from "./TaskItem";

/**
 * TaskList - Component hiển thị danh sách tasks
 * 
 * Props:
 * - filter: "all" | "active" | "completed"
 * - searchQuery: chuỗi tìm kiếm (đã debounced)
 * 
 * Tối ưu:
 * - useMemo: cache kết quả filter để tránh tính lại
 * - useCallback: memoize handlers để tránh TaskItem re-render
 */

interface TaskListProps {
  filter: Filter;
  searchQuery: string;
}

export function TaskList({ filter, searchQuery }: TaskListProps) {
  // Lấy tasks và dispatch từ Context
  const { tasks, dispatch } = useTaskContext();

  /**
   * useMemo - Tính toán filtered tasks
   * 
   * Chỉ tính lại khi tasks, filter, hoặc searchQuery thay đổi
   * Nếu chỉ theme thay đổi => dùng kết quả đã cache
   * 
   * Các bước filter:
   * 1. Filter theo status (all/active/completed)
   * 2. Filter theo search query
   */
  const filteredTasks = useMemo(() => {
    return tasks
      // Bước 1: Filter theo filter (all/active/completed)
      .filter((task) => {
        switch (filter) {
          case "active":
            return !task.completed; // Chỉ lấy task chưa hoàn thành
          case "completed":
            return task.completed;  // Chỉ lấy task đã hoàn thành
          default:
            return true;           // "all" - lấy tất cả
        }
      })
      // Bước 2: Filter theo search query
      .filter((task) =>
        // So sánh không phân biệt hoa thường
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [tasks, filter, searchQuery]); // Dependencies

  /**
   * useCallback - Memoize handler functions
   * 
   * Tại sao cần?
   * - TaskItem được wrap bởi React.memo
   * - Nếu onToggle thay đổi => TaskItem re-render
   * - useCallback giữ nguyên function reference
   * - => TaskItem không re-render không cần thiết
   */
  const handleToggle = useCallback(
    (id: string) => {
      dispatch({ type: "TOGGLE_TASK", id });
    },
    [dispatch] // Chỉ tạo lại function nếu dispatch thay đổi
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch({ type: "DELETE_TASK", id });
    },
    [dispatch]
  );

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "4px",
        marginTop: "1rem",
      }}
    >
      {filteredTasks.length === 0 ? (
        // Hiển thị message khi không có task
        <div style={{ padding: "2rem", textAlign: "center", color: "#999" }}>
          No tasks found
        </div>
      ) : (
        // Map qua filteredTasks và render TaskItem
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle} // Truyền memoized handler
            onDelete={handleDelete} // Truyền memoized handler
          />
        ))
      )}
    </div>
  );
}

/**
 * Tổng kết về Performance Optimization:
 * 
 * 1. useMemo cho filteredTasks:
 *    - Tránh filter lại khi component re-render vì lý do khác
 *    - Chỉ filter khi tasks/filter/searchQuery thay đổi
 * 
 * 2. useCallback cho handlers:
 *    - Giữ nguyên function reference
 *    - Kết hợp với React.memo ở TaskItem
 *    - => TaskItem không re-render khi parent re-render
 * 
 * 3. React.memo ở TaskItem:
 *    - Chỉ re-render khi props thực sự thay đổi
 *    - Kết hợp với useCallback để tối ưu tối đa
 */
