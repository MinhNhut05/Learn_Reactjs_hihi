// 01-RenderCounter-Solution.tsx

import { useState, useRef, useEffect } from "react";

/**
 * SOLUTION: Exercise 1 - Render Counter
 *
 * Đây là solution hoàn chỉnh để reference.
 * Hãy tự làm exercise trước khi xem solution!
 */

function RenderCounterSolution() {
  // State cho count - thay đổi sẽ trigger re-render
  const [count, setCount] = useState(0);

  // Ref để đếm renders - KHÔNG trigger re-render khi thay đổi
  const renderCount = useRef(0);

  // useEffect chạy sau MỖI render (không có dependency array)
  useEffect(() => {
    renderCount.current += 1;
    console.log(`🔄 Component rendered! Total renders: ${renderCount.current}`);
  }); // Không có [] = chạy sau mọi render

  // Handler tăng count → trigger re-render
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    console.log("📍 handleIncrement called");
  };

  // Handler không thay đổi state → KHÔNG trigger re-render
  const handleDoNothing = () => {
    console.log("📍 handleDoNothing called - No state change, no re-render!");
  };

  // Log trong component body - cũng chạy mỗi render
  console.log("🔵 Rendering RenderCounterSolution component...");

  return (
    <div className="section">
      <h2 className="section-title">Exercise 1: Render Counter (Solution)</h2>

      <div className="card">
        <div className="card-body">
          <p>
            <strong>Render Count:</strong>{" "}
            <span className="render-count">{renderCount.current}</span>
          </p>

          <p className="mt-10">
            <strong>Current Count:</strong>{" "}
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              {count}
            </span>
          </p>

          <div className="flex gap-10 mt-20">
            <button className="btn btn-primary" onClick={handleIncrement}>
              Increment Count
            </button>

            <button className="btn btn-secondary" onClick={handleDoNothing}>
              Do Nothing
            </button>
          </div>
        </div>

        <div className="card-footer">
          <strong>Mở Console (F12)</strong> để xem log mỗi lần render
        </div>
      </div>

      {/* Explanation box */}
      <div
        className="card"
        style={{ marginTop: "20px", background: "#e8f5e9" }}
      >
        <div className="card-body">
          <h4>✅ Giải thích Solution:</h4>
          <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
            <li>
              <code>useRef(0)</code> - Không trigger re-render khi thay đổi
            </li>
            <li>
              <code>useEffect</code> không có <code>[]</code> - Chạy sau mọi
              render
            </li>
            <li>
              <code>setCount</code> - Trigger re-render
            </li>
            <li>
              <code>console.log</code> trong handler - Không trigger re-render
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RenderCounterSolution;
