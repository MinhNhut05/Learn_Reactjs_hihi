import { useState, useEffect } from "react";

/**
 * useDebounce - Custom hook để trì hoãn việc cập nhật giá trị
 * 
 * Ứng dụng: Khi người dùng gõ tìm kiếm, không search ngay mà đợi
 * họ gõ xong (delay) rồi mới search để giảm số lần gọi API/filter
 * 
 * @param value - Giá trị cần debounce
 * @param delay - Thời gian trì hoãn (ms)
 * @returns Giá trị đã được debounced
 * 
 * Ví dụ:
 * const searchQuery = "hello"
 * const debouncedQuery = useDebounce(searchQuery, 300)
 * => debouncedQuery sẽ cập nhật thành "hello" sau 300ms
 */
export function useDebounce<T>(value: T, delay: number): T {
  // State lưu giá trị đã debounced
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Tạo timer để cập nhật giá trị sau {delay} ms
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: Hủy timer cũ khi value thay đổi
    // Điều này đảm bảo chỉ timer cuối cùng được thực thi
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]); // Chạy lại khi value hoặc delay thay đổi

  return debouncedValue;
}

/**
 * Luồng hoạt động:
 * 
 * 1. User gõ "h" => useEffect chạy, tạo timer 300ms
 * 2. User gõ "e" (trước 300ms) => cleanup hủy timer cũ, tạo timer mới 300ms
 * 3. User gõ "l" => cleanup hủy timer cũ, tạo timer mới 300ms
 * 4. User dừng gõ => sau 300ms, timer chạy => debouncedValue = "hel"
 */
