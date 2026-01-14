import type { Filter } from "../types";

/**
 * TaskFilter - Component để chọn filter (All/Active/Completed)
 * 
 * Props:
 * - currentFilter: filter hiện tại
 * - onFilterChange: callback khi click button
 * 
 * Hiển thị 3 buttons:
 * - All: hiển thị tất cả tasks
 * - Active: chỉ hiển thị tasks chưa hoàn thành
 * - Completed: chỉ hiển thị tasks đã hoàn thành
 */

interface TaskFilterProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  // Mảng các filter options
  const filters: Filter[] = ["all", "active", "completed"];
  
  // Object map filter value sang label hiển thị
  const labels: Record<Filter, string> = {
    all: "All",
    active: "Active",
    completed: "Completed",
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
      {/* Map qua mảng filters để render buttons */}
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)} // Gọi callback khi click
          style={{
            padding: "0.5rem 1rem",
            // Nếu là filter hiện tại => highlight màu xanh
            background: currentFilter === filter ? "#2196F3" : "#fff",
            color: currentFilter === filter ? "#fff" : "#000",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.2s", // Smooth transition khi hover
          }}
        >
          {labels[filter]} {/* Hiển thị label */}
        </button>
      ))}
    </div>
  );
}
