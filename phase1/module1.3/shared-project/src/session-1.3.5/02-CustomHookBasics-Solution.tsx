/**
 * Exercise 2: Custom Hook Basics - SOLUTION
 *
 * Đã điền đầy đủ các chỗ trống với giải thích
 */

import { useState, useEffect, useCallback } from "react";

// =============================================================================
// PART A: useToggle Hook - SOLUTION
// =============================================================================

/**
 * useToggle - Custom hook để toggle boolean value
 *
 * Return object pattern vì có nhiều hơn 2 values
 * Object cho phép user chỉ destructure những gì cần
 */
function useToggle(initialValue = false) {
  // State quản lý boolean value
  const [value, setValue] = useState(initialValue);

  // useCallback để stable reference - không tạo function mới mỗi render
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  // Object return pattern - user có thể:
  // const { value } = useToggle()  -- chỉ lấy value
  // const { toggle } = useToggle() -- chỉ lấy toggle
  return {
    value,
    toggle,
    setTrue,
    setFalse,
  };
}

// =============================================================================
// PART B: useLocalStorage Hook - SOLUTION
// =============================================================================

/**
 * useLocalStorage - Custom hook để persist state vào localStorage
 *
 * Generic <T> cho phép dùng với mọi type:
 * - useLocalStorage<string>("key", "default")
 * - useLocalStorage<number>("count", 0)
 * - useLocalStorage<User>("user", null)
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  // Lazy initialization: callback chỉ chạy 1 lần khi mount
  // Tránh đọc localStorage mỗi render
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      // Nếu có data trong localStorage → parse và return
      // Nếu không → dùng initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // localStorage không available hoặc parse lỗi
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  // Sync to localStorage mỗi khi storedValue hoặc key thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing localStorage:", error);
    }
  }, [key, storedValue]); // Dependencies: key và storedValue

  // Return tuple pattern như useState
  // "as const" để TypeScript preserve tuple type [T, SetStateAction<T>]
  // Không có "as const" → type là (T | SetStateAction<T>)[] → lỗi khi gọi
  return [storedValue, setStoredValue] as const;
}

// =============================================================================
// DEMO COMPONENT - SOLUTION
// =============================================================================

interface UserSettings {
  theme: "light" | "dark";
  fontSize: number;
  notifications: boolean;
}

export default function CustomHookBasicsSolution() {
  // Sử dụng useToggle - object destructuring
  const modal = useToggle(false);
  const sidebar = useToggle(true);

  // Sử dụng useLocalStorage với generics
  const [name, setName] = useLocalStorage<string>("demo-name", "");
  const [settings, setSettings] = useLocalStorage<UserSettings>(
    "demo-settings",
    {
      theme: "light",
      fontSize: 16,
      notifications: true,
    }
  );

  // Handler để update settings - functional update pattern
  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const toggleNotifications = () => {
    setSettings((prev) => ({
      ...prev,
      notifications: !prev.notifications,
    }));
  };

  return (
    <div
      style={{
        padding: "1rem",
        background: settings.theme === "dark" ? "#333" : "#fff",
        color: settings.theme === "dark" ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      <h2>Exercise 2: Custom Hook Basics - SOLUTION ✅</h2>
      <p>
        <strong>Mục tiêu:</strong> Tạo useToggle và useLocalStorage hooks
      </p>

      {/* Part A Demo: useToggle */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h3>Part A: useToggle Hook</h3>

        <div style={{ marginBottom: "1rem" }}>
          <strong>Modal:</strong> {modal.value ? "Open ✅" : "Closed ❌"}
          <div style={{ marginTop: "0.5rem" }}>
            <button onClick={modal.toggle} style={{ marginRight: "0.5rem" }}>
              Toggle
            </button>
            <button onClick={modal.setTrue} style={{ marginRight: "0.5rem" }}>
              Open
            </button>
            <button onClick={modal.setFalse}>Close</button>
          </div>
        </div>

        <div>
          <strong>Sidebar:</strong> {sidebar.value ? "Visible ✅" : "Hidden ❌"}
          <div style={{ marginTop: "0.5rem" }}>
            <button onClick={sidebar.toggle}>Toggle Sidebar</button>
          </div>
        </div>

        {modal.value && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#e3f2fd",
              borderRadius: "8px",
              color: "#000",
            }}
          >
            <h4>Modal Content</h4>
            <p>This is the modal! Click Close to hide.</p>
            <button onClick={modal.setFalse}>Close Modal</button>
          </div>
        )}
      </section>

      {/* Part B Demo: useLocalStorage */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h3>Part B: useLocalStorage Hook</h3>
        <p>
          <small>💡 Refresh page - data sẽ được giữ nguyên!</small>
        </p>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            <strong>Name:</strong>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                marginLeft: "0.5rem",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              placeholder="Enter your name"
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <strong>Settings:</strong>
          <pre
            style={{
              background: settings.theme === "dark" ? "#555" : "#f5f5f5",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(settings, null, 2)}
          </pre>

          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <button onClick={toggleTheme}>
              Toggle Theme ({settings.theme})
            </button>
            <button onClick={toggleNotifications}>
              Notifications: {settings.notifications ? "ON" : "OFF"}
            </button>
            <button
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  fontSize: prev.fontSize + 2,
                }))
              }
            >
              Increase Font ({settings.fontSize}px)
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("demo-name");
            localStorage.removeItem("demo-settings");
            window.location.reload();
          }}
          style={{ background: "#f44336", color: "white" }}
        >
          Clear LocalStorage & Reload
        </button>
      </section>

      {/* Key takeaways */}
      <div
        style={{
          padding: "1rem",
          background: settings.theme === "dark" ? "#2e7d32" : "#e8f5e9",
          borderRadius: "4px",
        }}
      >
        <h4>📝 Key Takeaways:</h4>
        <ol>
          <li>
            <strong>useToggle:</strong> Object return cho nhiều actions (toggle,
            setTrue, setFalse)
          </li>
          <li>
            <strong>useLocalStorage:</strong> Tuple return như useState, generic
            cho type safety
          </li>
          <li>
            <strong>Lazy init:</strong> Callback trong useState chỉ chạy 1 lần
          </li>
          <li>
            <strong>as const:</strong> Preserve tuple type cho TypeScript
          </li>
          <li>
            <strong>useCallback:</strong> Stable function reference cho
            performance
          </li>
        </ol>
      </div>
    </div>
  );
}
