/**
 * Exercise 2: Custom Hook Basics
 * Difficulty: Hard
 *
 * MỤC TIÊU HỌC:
 * - Tạo custom hooks
 * - Naming convention: use*
 * - Return patterns: tuple vs object
 * - TypeScript generics
 *
 * HƯỚNG DẪN:
 * 1. Implement useToggle hook (Part A)
 * 2. Implement useLocalStorage hook (Part B)
 * 3. Test bằng demo UI bên dưới
 */

import { useState, useEffect, useCallback } from "react";

// =============================================================================
// PART A: useToggle Hook
// TODO: Implement custom hook để toggle boolean
// =============================================================================

/**
 * useToggle - Hook để toggle boolean value
 *
 * Requirements:
 * - Nhận initialValue (mặc định false)
 * - Return object với: value, toggle, setTrue, setFalse
 * - Dùng useCallback cho toggle functions
 */
function useToggle(initialValue = false) {
  // TODO: Implement hook
  // 1. Tạo state cho value
  // 2. Tạo toggle function với useCallback
  // 3. Tạo setTrue và setFalse functions
  // 4. Return object

  const [value, setValue] = useState(initialValue);

  // TODO: Thêm useCallback để stable reference
  const toggle = () => setValue((v) => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  // TODO: Return đúng format
  return {
    value,
    toggle,
    setTrue,
    setFalse,
  };
}

// =============================================================================
// PART B: useLocalStorage Hook
// TODO: Implement custom hook với TypeScript generics
// =============================================================================

/**
 * useLocalStorage - Hook để persist state vào localStorage
 *
 * Requirements:
 * - Generic type <T> cho flexibility
 * - Lazy initialization đọc từ localStorage
 * - Sync to localStorage khi value thay đổi
 * - Error handling cho JSON parse
 * - Return tuple [value, setValue] như useState
 *
 */

function useLocalStorage<T>(key: string, initialValue: T) {
  // TODO: Implement hook
  // 1. Lazy initialization với useState callback
  // 2. useEffect để sync to localStorage
  // 3. Return tuple với "as const"

  // Lazy initialization - chỉ đọc localStorage 1 lần
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  // TODO: Thêm useEffect để sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing localStorage:", error);
    }
  }, [key, storedValue]);

  // TODO: Return với "as const" để TypeScript infer đúng tuple type
  return [storedValue, setStoredValue] as const;
}

// =============================================================================
// DEMO COMPONENT
// =============================================================================

interface UserSettings {
  theme: "light" | "dark";
  fontSize: number;
  notifications: boolean;
}

export default function CustomHookBasics() {
  // Sử dụng useToggle
  const modal = useToggle(false);
  const sidebar = useToggle(true);

  // Sử dụng useLocalStorage
  const [name, setName] = useLocalStorage<string>("demo-name", "");
  const [settings, setSettings] = useLocalStorage<UserSettings>(
    "demo-settings",
    {
      theme: "light",
      fontSize: 16,
      notifications: true,
    }
  );

  // Handler để update settings
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
      <h2>Exercise 2: Custom Hook Basics</h2>
      <p>
        <strong>Mục tiêu:</strong> Implement useToggle và useLocalStorage hooks
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

        {/* Modal toggle */}
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

        {/* Sidebar toggle */}
        <div>
          <strong>Sidebar:</strong> {sidebar.value ? "Visible ✅" : "Hidden ❌"}
          <div style={{ marginTop: "0.5rem" }}>
            <button onClick={sidebar.toggle}>Toggle Sidebar</button>
          </div>
        </div>

        {/* Show modal if open */}
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

        {/* Name input */}
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

        {/* Settings */}
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

        {/* Clear storage */}
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

      {/* Hints */}
      <details>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          💡 Hints (click to expand)
        </summary>
        <div
          style={{
            background: settings.theme === "dark" ? "#555" : "#f5f5f5",
            padding: "1rem",
            marginTop: "0.5rem",
            borderRadius: "4px",
          }}
        >
          <h4>Part A - useToggle improvements:</h4>
          <pre>{`const toggle = useCallback(() => setValue((v) => !v), []);
const setTrue = useCallback(() => setValue(true), []);
const setFalse = useCallback(() => setValue(false), []);`}</pre>

          <h4>Part B - useLocalStorage key points:</h4>
          <ul>
            <li>
              Lazy init: <code>{`useState(() => { ... })`}</code>
            </li>
            <li>
              Sync:{" "}
              <code>{`useEffect(() => { ... }, [key, storedValue])`}</code>
            </li>
            <li>
              Return: <code>{`[value, setValue] as const`}</code>
            </li>
          </ul>
        </div>
      </details>
    </div>
  );
}
