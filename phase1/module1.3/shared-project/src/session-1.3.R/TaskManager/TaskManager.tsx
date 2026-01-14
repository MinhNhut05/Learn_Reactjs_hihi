import { useState } from "react";
import type { Filter } from "./types";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import { useDebounce } from "./hooks/useDebounce";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { TaskFilter } from "./components/TaskFilter";
import { TaskSearch } from "./components/TaskSearch";
import { TaskStats } from "./components/TaskStats";
import { ThemeToggle } from "./components/ThemeToggle";

/**
 * TaskManagerContent - Component chính chứa UI
 * 
 * Component này phải nằm BÊN TRONG ThemeProvider và TaskProvider
 * để có thể sử dụng useThemeContext và useTaskContext
 */
function TaskManagerContent() {
  // State quản lý filter hiện tại (all/active/completed)
  const [filter, setFilter] = useState<Filter>("all");
  
  // State quản lý search query (giá trị từ TaskSearch)
  const [searchQuery, setSearchQuery] = useState("");
  
  // Debounce search query - chỉ search sau khi user ngừng gõ 300ms
  // Tránh filter lại quá nhiều lần khi đang gõ
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  // Lấy theme từ Context để apply styles
  const { theme } = useThemeContext();

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
        // Background và color thay đổi theo theme
        background: theme === "dark" ? "#1a1a2e" : "#fff",
        color: theme === "dark" ? "#eee" : "#333",
        minHeight: "100vh",
        transition: "all 0.3s", // Smooth transition khi đổi theme
      }}
    >
      {/* Header với title và ThemeToggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ margin: 0 }}>📝 Task Manager</h1>
        <ThemeToggle />
      </div>

      {/* Thống kê tasks */}
      <TaskStats />
      
      {/* Form thêm task mới */}
      <TaskForm />

      {/* Search và Filter */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Search input - truyền setSearchQuery làm callback */}
        <TaskSearch onSearch={setSearchQuery} />
        
        {/* Filter buttons - truyền filter và setFilter */}
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
      </div>

      {/* 
        Danh sách tasks 
        - Truyền filter để lọc theo status
        - Truyền debouncedSearch (không phải searchQuery)
          => Chỉ filter khi user ngừng gõ 300ms
      */}
      <TaskList filter={filter} searchQuery={debouncedSearch} />

      {/* Info box hiển thị các hooks đã dùng */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: theme === "dark" ? "#16213e" : "#e3f2fd",
          borderRadius: "4px",
          fontSize: "0.9rem",
        }}
      >
        <strong>Hooks Used:</strong>
        <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
          <li>useState - Form input, filter, search</li>
          <li>useEffect - localStorage sync, debounce</li>
          <li>useRef - Input focus</li>
          <li>useCallback - TaskList handlers</li>
          <li>useMemo - Filtered tasks, stats</li>
          <li>useContext - Task & Theme state</li>
          <li>useReducer - Task state management</li>
          <li>Custom Hooks - useDebounce, useTaskStats</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * TaskManager - Component root của app
 * 
 * Cấu trúc Providers:
 * 1. ThemeProvider - cung cấp theme state cho toàn bộ app
 * 2. TaskProvider - cung cấp tasks state cho toàn bộ app
 * 3. TaskManagerContent - component chính sử dụng các contexts
 * 
 * Thứ tự Provider quan trọng:
 * - ThemeProvider bên ngoài vì TaskProvider cũng có thể cần theme
 * - TaskProvider bên trong vì chỉ task-related components cần
 */
export function TaskManager() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <TaskManagerContent />
      </TaskProvider>
    </ThemeProvider>
  );
}

/**
 * Tổng quan về luồng dữ liệu:
 * 
 * 1. User nhập task vào TaskForm
 *    => dispatch ADD_TASK
 *    => TaskContext cập nhật tasks
 *    => localStorage sync
 *    => TaskList, TaskStats re-render
 * 
 * 2. User gõ search query
 *    => setSearchQuery cập nhật
 *    => useDebounce chờ 300ms
 *    => debouncedSearch cập nhật
 *    => TaskList filter lại
 * 
 * 3. User click filter button
 *    => setFilter cập nhật
 *    => TaskList filter lại
 * 
 * 4. User toggle theme
 *    => toggleTheme gọi
 *    => ThemeContext cập nhật
 *    => Tất cả components re-render với theme mới
 */
