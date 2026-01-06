import { useState } from "react";

/**
 * Exercise 1: Lazy Initialization - SOLUTION
 */

// Hàm giả lập đọc từ localStorage (expensive operation)
function readFromStorage(): string[] {
  console.log("📦 Reading from localStorage...");
  const items = localStorage.getItem("todo-items");
  return items ? JSON.parse(items) : ["Default Item 1", "Default Item 2"];
}

// ============================================================
// VERSION A: Direct Initialization (BAD)
// ============================================================
export function DirectInitVersion() {
  // ❌ BAD: readFromStorage() chạy MỖI lần render
  // Dù React chỉ dùng kết quả cho lần đầu tiên
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
        Xem console - "Reading from localStorage" xuất hiện MỖI lần click!
      </p>
    </div>
  );
}

// ============================================================
// VERSION B: Lazy Initialization (GOOD)
// ============================================================
export function LazyInitVersion() {
  // ✅ GOOD: Truyền function, React chỉ gọi 1 lần
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
        Xem console - "Reading from localStorage" chỉ xuất hiện 1 lần!
      </p>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function LazyInitSolution() {
  return (
    <div>
      <h2>Exercise 1: Lazy Initialization - SOLUTION</h2>
      <p>
        Mở DevTools Console (F12) và click "Force Re-render" trên mỗi version.
      </p>
      <hr />

      <DirectInitVersion />
      <LazyInitVersion />

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#e8f5e9",
          borderLeft: "4px solid green",
        }}
      >
        <h4>Key Takeaways:</h4>
        <pre
          style={{
            background: "#333",
            color: "#fff",
            padding: "1rem",
            fontSize: "0.85rem",
          }}
        >
          {`
// ❌ Direct - chạy mỗi render
useState(expensiveFunction())

// ✅ Lazy - chỉ chạy 1 lần
useState(() => expensiveFunction())

Khi nào dùng Lazy Init:
- Đọc từ localStorage/sessionStorage
- Parse JSON
- Expensive calculations
- Complex object initialization
          `}
        </pre>
      </div>
    </div>
  );
}
