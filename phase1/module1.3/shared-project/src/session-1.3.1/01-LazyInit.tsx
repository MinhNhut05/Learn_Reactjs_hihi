import { useState } from "react";

/**
 * Exercise 1: Lazy Initialization
 *
 * MỤC TIÊU: Hiểu sự khác biệt giữa direct init và lazy init
 *
 * SCENARIO:
 * - Component đọc data từ localStorage
 * - So sánh 2 versions: direct init vs lazy init
 * - Quan sát console.log để thấy sự khác biệt
 *
 * HƯỚNG DẪN:
 * 1. Mở DevTools Console (F12)
 * 2. Quan sát logs khi component mount
 * 3. Click button "Force Re-render"
 * 4. Quan sát logs - version nào chạy lại?
 */

// Hàm giả lập đọc từ localStorage (expensive operation)
function readFromStorage(): string[] {
  console.log("📦 Reading from localStorage...");
  // Giả lập delay bằng heavy computation
  const items = localStorage.getItem("todo-items");
  return items ? JSON.parse(items) : ["Default Item 1", "Default Item 2"];
}

// ============================================================
// VERSION A: Direct Initialization (BAD)
// ============================================================
export function DirectInitVersion() {
  // ╔════════════════════════════════════════════════════════╗
  // ║  👉 YOUR CODE HERE                                     ║
  // ║  Khởi tạo state bằng DIRECT call: readFromStorage()    ║
  // ║  Syntax: useState(readFromStorage())                   ║
  // ╚════════════════════════════════════════════════════════╝
  const [items] = useState<string[]>(readFromStorage());

  const [renderCount, setRenderCount] = useState(0);

  return (
    <div style={{ padding: "1rem", border: "2px solid red", margin: "1rem" }}>
      <h3>🔴 Version A: Direct Init</h3>
      <p>
        <strong>Render count:</strong> {renderCount}
      </p>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <button onClick={() => setRenderCount((c) => c + 1)}>
        Force Re-render
      </button>
      <p style={{ fontSize: "0.8rem", color: "gray" }}>
        Xem console - "Reading from localStorage" có xuất hiện mỗi click không?
      </p>
    </div>
  );
}

// ============================================================
// VERSION B: Lazy Initialization (GOOD)
// ============================================================
export function LazyInitVersion() {
  // ╔════════════════════════════════════════════════════════╗
  // ║  👉 YOUR CODE HERE                                     ║
  // ║  Khởi tạo state bằng LAZY init: () => readFromStorage()║
  // ║  Syntax: useState(() => readFromStorage())             ║
  // ╚════════════════════════════════════════════════════════╝
  const [items] = useState<string[]>(() => readFromStorage());

  const [renderCount, setRenderCount] = useState(0);

  return (
    <div style={{ padding: "1rem", border: "2px solid green", margin: "1rem" }}>
      <h3>🟢 Version B: Lazy Init</h3>
      <p>
        <strong>Render count:</strong> {renderCount}
      </p>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <button onClick={() => setRenderCount((c) => c + 1)}>
        Force Re-render
      </button>
      <p style={{ fontSize: "0.8rem", color: "gray" }}>
        Xem console - "Reading from localStorage" có xuất hiện mỗi click không?
      </p>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT - Render cả 2 versions
// ============================================================
export default function LazyInitExercise() {
  return (
    <div>
      <h2>Exercise 1: Lazy Initialization</h2>
      <p>
        Mở DevTools Console (F12) và click "Force Re-render" trên mỗi version.
      </p>
      <p>
        <strong>Câu hỏi:</strong> Version nào gọi readFromStorage() mỗi lần
        render?
      </p>
      <hr />

      <DirectInitVersion />
      <LazyInitVersion />

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#f0f0f0",
        }}
      >
        <h4>Expected Behavior:</h4>
        <ul>
          <li>
            🔴 <strong>Direct Init:</strong> Log xuất hiện MỖI lần click
          </li>
          <li>
            🟢 <strong>Lazy Init:</strong> Log chỉ xuất hiện 1 lần (khi mount)
          </li>
        </ul>
      </div>
    </div>
  );
}
