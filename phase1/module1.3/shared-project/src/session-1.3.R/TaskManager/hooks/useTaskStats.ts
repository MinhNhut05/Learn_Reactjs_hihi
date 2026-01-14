import { useMemo } from "react";
import type { Task, TaskStats } from "../types";

/**
 * useTaskStats - Custom hook tính toán thống kê tasks
 * 
 * Sử dụng useMemo để tránh tính toán lại không cần thiết
 * Chỉ tính lại khi danh sách tasks thay đổi
 * 
 * @param tasks - Danh sách tasks
 * @returns Đối tượng chứa thống kê: total, active, completed
 */
export function useTaskStats(tasks: Task[]): TaskStats {
  // useMemo lưu kết quả tính toán và chỉ tính lại khi tasks thay đổi
  const stats = useMemo<TaskStats>(() => {
    // Đếm số task đã hoàn thành
    const completed = tasks.filter((task) => task.completed).length;
    
    // Số task chưa hoàn thành = tổng - đã hoàn thành
    const active = tasks.length - completed;

    return {
      total: tasks.length,      // Tổng số task
      active,                   // Số task đang active
      completed,                // Số task đã hoàn thành
    };
  }, [tasks]); // Dependency: chỉ tính lại khi tasks thay đổi

  return stats;
}

/**
 * Tại sao dùng useMemo?
 * 
 * Không dùng useMemo:
 * - Mỗi lần TaskStats component re-render
 * - Filter + tính toán lại stats
 * - Tốn performance nếu có nhiều tasks
 * 
 * Dùng useMemo:
 * - Chỉ tính lại khi tasks thực sự thay đổi
 * - Nếu chỉ theme thay đổi => dùng kết quả đã cache
 * - Performance tốt hơn
 */
