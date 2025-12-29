/**
 * ✅ SOLUTION: Custom useLocalStorage Hook
 */

import { useState } from "react";

// ============================================================
// SOLUTION: useLocalStorage Hook
// ============================================================

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // 1. Initialize state với lazy initialization
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Lấy từ localStorage
      const item = window.localStorage.getItem(key);

      // Parse và return nếu có, otherwise return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Nếu lỗi (parse error, localStorage disabled), return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 2. setValue function - sync với localStorage
  const setValue = (value: T) => {
    try {
      // Update state
      setStoredValue(value);

      // Sync với localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // localStorage full hoặc disabled
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // 3. Return tuple
  console.log(storedValue, setValue);
  return [storedValue, setValue];
}

// ============================================================
// DEMO COMPONENT
// ============================================================

interface User {
  name: string;
  email: string;
}

export default function UseLocalStorageDemo() {
  // Use hook với string type
  const [theme, setTheme] = useLocalStorage<string>("theme", "light");

  // Use hook với object type
  const [user, setUser] = useLocalStorage<User>("user", {
    name: "",
    email: "",
  });

  // Handlers
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h3>useLocalStorage Hook Demo</h3>

      {/* Theme Section */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        <h4>1. String Type - Theme</h4>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 16px",
            background: theme === "light" ? "#333" : "#fff",
            color: theme === "light" ? "#fff" : "#333",
            border: "1px solid #333",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Toggle to {theme === "light" ? "Dark" : "Light"}
        </button>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          💡 Refresh page để test persistence
        </p>
      </div>

      {/* User Section */}
      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        <h4>2. Object Type - User</h4>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={handleNameChange}
            placeholder="Enter name"
            style={{
              padding: "8px",
              width: "100%",
              maxWidth: "300px",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            value={user.email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            style={{
              padding: "8px",
              width: "100%",
              maxWidth: "300px",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            background: "#f9f9f9",
            borderRadius: "4px",
          }}
        >
          <strong>Current User Object:</strong>
          <pre style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          💡 Refresh page để test persistence
        </p>
      </div>

      {/* Instructions */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          background: "#f0f0f0",
          borderRadius: "4px",
        }}
      >
        <strong>🧪 Testing Checklist:</strong>
        <ul style={{ fontSize: "14px", marginTop: "5px" }}>
          <li>✅ Change theme → Should persist after refresh</li>
          <li>✅ Update user info → Should persist after refresh</li>
          <li>✅ Open DevTools → Application → Local Storage → Check values</li>
          <li>✅ TypeScript auto-complete works</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * 📝 GIẢI THÍCH IMPLEMENTATION:
 *
 * 1. **Generic Type <T>:**
 *    - Cho phép hook work với bất kỳ type nào
 *    - useLocalStorage<string>('theme', 'light') → T = string
 *    - useLocalStorage<User>('user', {...}) → T = User
 *
 * 2. **Lazy Initialization:**
 *    - useState(() => {...}) chỉ chạy 1 lần khi mount
 *    - Không chạy lại mỗi re-render (performance!)
 *
 * 3. **Try/Catch:**
 *    - localStorage.getItem() có thể fail (disabled)
 *    - JSON.parse() có thể fail (invalid JSON)
 *    - localStorage.setItem() có thể fail (quota exceeded)
 *    - Fallback to initialValue gracefully
 *
 * 4. **JSON.parse/stringify:**
 *    - localStorage chỉ lưu strings
 *    - Phải stringify objects/arrays → string
 *    - Phải parse strings → objects/arrays
 *
 * 5. **Type Safety:**
 *    - TypeScript knows exact type của storedValue
 *    - Auto-complete works: user.name, user.email
 *    - setValue only accepts correct type
 *
 * 💡 REAL-WORLD USE CASES:
 * - Theme persistence (light/dark mode)
 * - User preferences (language, timezone)
 * - Form data (auto-save drafts)
 * - Shopping cart items
 * - Recently viewed items
 * - Auth tokens (be careful với security!)
 */
