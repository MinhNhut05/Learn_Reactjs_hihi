import { TaskManager } from "./TaskManager/TaskManager";

/**
 * ReviewWrapper - Wrapper cho Task Manager với thông tin hoàn thành
 *
 * Hiển thị:
 * - Banner chúc mừng hoàn thành
 * - TaskManager app
 */
export function ReviewWrapper() {
  return (
    <div>
      {/* Completion Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
          color: "white",
          padding: "1.5rem",
          textAlign: "center",
          marginBottom: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.8rem" }}>
          🎉 Chúc mừng! Bạn đã hoàn thành Task Manager!
        </h2>
        <p style={{ margin: 0, fontSize: "1.1rem", opacity: 0.9 }}>
          Bạn đã áp dụng thành công tất cả hooks trong React Module 1.3
        </p>
      </div>

      {/* Your Task Manager App */}
      <TaskManager />

      {/* Summary */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          background: "#e8f5e9",
          borderRadius: "8px",
          border: "2px solid #4caf50",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#2e7d32" }}>✅ Checklist hoàn thành:</h3>
        <ul style={{ color: "#2e7d32", lineHeight: "1.8" }}>
          <li>✅ types/index.ts - Task, Filter, Theme, TaskAction, TaskStats</li>
          <li>✅ taskReducer.ts - ADD, TOGGLE, DELETE, CLEAR, SET actions</li>
          <li>✅ useLocalStorage hook - Sync state với localStorage</li>
          <li>✅ useDebounce hook - Trì hoãn search input</li>
          <li>✅ useTaskStats hook - Tính toán thống kê</li>
          <li>✅ TaskContext - Context + useReducer + localStorage</li>
          <li>✅ ThemeContext - Theme management với localStorage</li>
          <li>✅ TaskItem - Component với React.memo</li>
          <li>✅ TaskForm - useState + useRef + dispatch</li>
          <li>✅ TaskFilter - Controlled buttons</li>
          <li>✅ TaskSearch - Controlled input</li>
          <li>✅ TaskList - useMemo + useCallback optimization</li>
          <li>✅ TaskStats - Display statistics</li>
          <li>✅ ThemeToggle - Theme switcher</li>
          <li>✅ TaskManager - Wire everything together</li>
        </ul>

        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#fff",
            borderRadius: "4px",
          }}
        >
          <strong style={{ color: "#1976d2" }}>🎯 Hooks đã sử dụng:</strong>
          <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem", color: "#333" }}>
            <li>useState - Form inputs, filter, search state</li>
            <li>useEffect - localStorage sync, debounce cleanup</li>
            <li>useRef - Input focus management</li>
            <li>useCallback - Memoized event handlers</li>
            <li>useMemo - Filtered tasks calculation</li>
            <li>useContext - Global state sharing</li>
            <li>useReducer - Complex state management</li>
            <li>Custom Hooks - useDebounce, useLocalStorage, useTaskStats</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
