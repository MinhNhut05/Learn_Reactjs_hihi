import { useState } from "react";

/**
 * TaskSearch - Component tìm kiếm tasks
 * 
 * Props:
 * - onSearch: callback được gọi mỗi khi input thay đổi
 * 
 * Luồng hoạt động:
 * 1. User gõ vào input
 * 2. onChange trigger handleChange
 * 3. Cập nhật local state (query)
 * 4. Gọi onSearch với giá trị mới
 * 5. Parent component (TaskManager) nhận giá trị
 * 6. useDebounce trong parent sẽ debounce giá trị này
 */

interface TaskSearchProps {
  onSearch: (query: string) => void;
}

export function TaskSearch({ onSearch }: TaskSearchProps) {
  // State local để quản lý giá trị input
  const [query, setQuery] = useState("");

  /**
   * Handler khi input thay đổi
   * - Cập nhật local state
   * - Gọi callback để thông báo parent
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);      // Cập nhật local state
    onSearch(value);      // Gọi callback để parent biết
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search tasks..."
      style={{
        padding: "0.5rem",
        fontSize: "1rem",
        border: "1px solid #ddd",
        borderRadius: "4px",
        width: "200px",
      }}
    />
  );
}

/**
 * Tại sao cần local state?
 * 
 * Không dùng local state:
 * - Chỉ gọi onSearch(e.target.value)
 * - Input không có value => uncontrolled
 * - Khó kiểm soát, dễ bug
 * 
 * Dùng local state:
 * - Input có value => controlled component
 * - Dễ quản lý, validate
 * - Có thể clear input từ parent nếu cần
 */
