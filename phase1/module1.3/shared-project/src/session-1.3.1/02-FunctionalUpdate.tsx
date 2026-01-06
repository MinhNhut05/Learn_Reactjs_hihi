import { useState } from "react";

/**
 * Exercise 2: Functional Updates
 *
 * MỤC TIÊU: Hiểu stale closure problem và cách giải quyết
 *
 * SCENARIO:
 * - Counter với button "Increment 3 times"
 * - 1 click sẽ gọi setCount 3 lần
 * - So sánh direct update vs functional update
 *
 * HƯỚNG DẪN:
 * 1. Quan sát behavior của mỗi version
 * 2. Version A sử dụng direct update: setCount(count + 1)
 * 3. Version B sử dụng functional update: setCount(prev => prev + 1)
 */

// ============================================================
// VERSION A: Direct Update (WRONG - Stale Closure)
// ============================================================
export function DirectUpdateVersion() {
  const [count, setCount] = useState(0);

  const incrementThreeTimes = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // ╔════════════════════════════════════════════════════════╗
    // ║  👉 YOUR CODE HERE                                     ║
    // ║  Gọi setCount(count + 1) ba lần liên tiếp              ║
    // ║  Đây là cách SAI - để thấy stale closure problem       ║
    // ╚════════════════════════════════════════════════════════╝
  };

  return (
    <div style={{ padding: "1rem", border: "2px solid red", margin: "1rem" }}>
      <h3>🔴 Version A: Direct Update</h3>
      <p style={{ fontSize: "2rem" }}>Count: {count}</p>
      <button onClick={incrementThreeTimes} style={{ padding: "0.5rem 1rem" }}>
        Increment 3 times
      </button>
      <button
        onClick={() => setCount(0)}
        style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
      >
        Reset
      </button>
      <p style={{ fontSize: "0.8rem", color: "gray" }}>
        Kỳ vọng: tăng 3, thực tế: tăng ???
      </p>
    </div>
  );
}

// ============================================================
// VERSION B: Functional Update (CORRECT)
// ============================================================
export function FunctionalUpdateVersion() {
  const [count, setCount] = useState(0);

  const incrementThreeTimes = () => {
    // ╔════════════════════════════════════════════════════════╗
    // ║  👉 YOUR CODE HERE                                     ║
    // ║  Gọi setCount(prev => prev + 1) ba lần liên tiếp       ║
    // ║  Đây là cách ĐÚNG - giải quyết stale closure           ║
    // ╚════════════════════════════════════════════════════════╝
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "1rem", border: "2px solid green", margin: "1rem" }}>
      <h3>🟢 Version B: Functional Update</h3>
      <p style={{ fontSize: "2rem" }}>Count: {count}</p>
      <button onClick={incrementThreeTimes} style={{ padding: "0.5rem 1rem" }}>
        Increment 3 times
      </button>
      <button
        onClick={() => setCount(0)}
        style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
      >
        Reset
      </button>
      <p style={{ fontSize: "0.8rem", color: "gray" }}>
        Kỳ vọng: tăng 3, thực tế: tăng ???
      </p>
    </div>
  );
}

// ============================================================
// BONUS: setTimeout Demonstration
// ============================================================
export function DelayedUpdateDemo() {
  const [count, setCount] = useState(0);

  const delayedIncrement = () => {
    // Sau 2 giây, giá trị count đã bị stale
    setTimeout(() => {
      // ╔════════════════════════════════════════════════════════╗
      // ║  THAY ĐỔI DÒNG DƯỚI ĐÂY:                                ║
      // ║  - Thử: setCount(count + 1)  → stale closure           ║
      // ║  - Thử: setCount(prev => prev + 1) → luôn đúng         ║
      // ╚════════════════════════════════════════════════════════╝
      // setCount(count + 1);
      setCount((c) => c + 1);
    }, 2000);
  };

  return (
    <div style={{ padding: "1rem", border: "2px solid blue", margin: "1rem" }}>
      <h3>🔵 Bonus: setTimeout Demo</h3>
      <p style={{ fontSize: "2rem" }}>Count: {count}</p>
      <button onClick={delayedIncrement} style={{ padding: "0.5rem 1rem" }}>
        Increment after 2s
      </button>
      <button
        onClick={() => setCount((c) => c + 1)}
        style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
      >
        Increment now
      </button>
      <button
        onClick={() => setCount(0)}
        style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
      >
        Reset
      </button>
      <p style={{ fontSize: "0.8rem", color: "gray" }}>
        Thử: Click "Increment after 2s", rồi nhanh chóng click "Increment now"
        vài lần. Sau 2 giây, count có đúng không?
      </p>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FunctionalUpdateExercise() {
  return (
    <div>
      <h2>Exercise 2: Functional Updates</h2>
      <p>Click "Increment 3 times" và quan sát kết quả của mỗi version.</p>
      <hr />

      <DirectUpdateVersion />
      <FunctionalUpdateVersion />
      <DelayedUpdateDemo />

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
            🔴 <strong>Direct Update:</strong> Tăng 1 mỗi click (sai)
          </li>
          <li>
            🟢 <strong>Functional Update:</strong> Tăng 3 mỗi click (đúng)
          </li>
          <li>
            🔵 <strong>setTimeout:</strong> Direct bị stale, Functional luôn
            đúng
          </li>
        </ul>

        <h4>Giải thích:</h4>
        <pre
          style={{
            background: "#333",
            color: "#fff",
            padding: "1rem",
            fontSize: "0.85rem",
          }}
        >
          {`
Direct: setCount(count + 1) x3
  → count luôn là 0 (stale closure)
  → setCount(0 + 1), setCount(0 + 1), setCount(0 + 1)
  → Final: 1

Functional: setCount(prev => prev + 1) x3
  → React xử lý: fn(0)=1, fn(1)=2, fn(2)=3
  → Final: 3
          `}
        </pre>
      </div>
    </div>
  );
}
