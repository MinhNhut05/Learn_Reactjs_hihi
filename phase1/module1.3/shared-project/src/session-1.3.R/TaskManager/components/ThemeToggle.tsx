import { useThemeContext } from "../context/ThemeContext";

/**
 * ThemeToggle - Component toggle giữa light và dark mode
 * 
 * Hiển thị:
 * - Button với icon và text thay đổi theo theme
 * - Click để chuyển đổi theme
 * 
 * Hooks sử dụng:
 * - useThemeContext: lấy theme và toggleTheme function
 */

export function ThemeToggle() {
  // Lấy theme hiện tại và hàm toggle từ Context
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme} // Gọi toggleTheme khi click
      style={{
        padding: "0.5rem 1rem",
        // Đổi màu background theo theme
        background: theme === "dark" ? "#333" : "#fff",
        // Đổi màu text theo theme
        color: theme === "dark" ? "#fff" : "#333",
        border: "1px solid #ddd",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all 0.2s", // Smooth transition
      }}
    >
      {/* Hiển thị icon và text khác nhau theo theme */}
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

/**
 * Cách hoạt động:
 * 
 * 1. User click button
 * 2. toggleTheme được gọi
 * 3. ThemeContext cập nhật theme state
 * 4. Tất cả components sử dụng useThemeContext re-render
 * 5. UI cập nhật theo theme mới
 * 6. Theme được lưu vào localStorage (trong ThemeContext)
 */
