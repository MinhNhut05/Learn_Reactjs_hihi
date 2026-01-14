import { useState, useEffect } from "react";

/**
 * useLocalStorage - Custom hook để đồng bộ state với localStorage
 * 
 * Tự động:
 * - Load giá trị từ localStorage khi component mount
 * - Lưu giá trị vào localStorage khi state thay đổi
 * 
 * @param key - Key trong localStorage
 * @param initialValue - Giá trị mặc định nếu chưa có trong localStorage
 * @returns [value, setValue] - Tương tự useState
 * 
 * Ví dụ:
 * const [theme, setTheme] = useLocalStorage("theme", "light")
 * => Tự động load "theme" từ localStorage, nếu không có thì dùng "light"
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  
  // Lazy initialization - Hàm này chỉ chạy 1 lần khi component mount
  const [value, setValue] = useState<T>(() => {
    try {
      // Đọc giá trị từ localStorage
      const saved = localStorage.getItem(key);
      
      if (saved !== null) {
        // Parse JSON và trả về giá trị đã lưu
        return JSON.parse(saved) as T;
      }
      
      // Nếu không có giá trị trong localStorage, dùng initialValue
      return initialValue;
    } catch {
      // Nếu có lỗi (localStorage bị disable, JSON không hợp lệ...)
      console.error(`Error reading localStorage key "${key}"`);
      return initialValue;
    }
  });

  // Đồng bộ vào localStorage mỗi khi value hoặc key thay đổi
  useEffect(() => {
    try {
      // Chuyển value thành JSON và lưu vào localStorage
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Error writing to localStorage key "${key}"`);
    }
  }, [key, value]); // Dependencies: chạy lại khi key hoặc value đổi

  return [value, setValue];
}

/**
 * Luồng hoạt động:
 * 
 * 1. Component mount:
 *    - useState chạy initialization function
 *    - Đọc từ localStorage
 *    - Set state ban đầu
 * 
 * 2. Khi setValue được gọi:
 *    - State cập nhật
 *    - useEffect trigger
 *    - Lưu vào localStorage
 * 
 * 3. Component unmount:
 *    - Không có cleanup vì localStorage tồn tại vĩnh viễn
 */
