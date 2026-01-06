import { useState } from "react";

/**
 * Exercise 2: Functional Updates - SOLUTION
 */

// ============================================================
// VERSION A: Direct Update (WRONG - Stale Closure)
// ============================================================
export function DirectUpdateVersion() {
  const [count, setCount] = useState(0);

  const incrementThreeTimes = () => {
    // ❌ WRONG: count bị "đóng băng" tại giá trị hiện tại
    // Cả 3 lần setState đều dùng cùng 1 giá trị count
    setCount(count + 1); // count = 0 → queue: 1
    setCount(count + 1); // count = 0 → queue: 1
    setCount(count + 1); // count = 0 → queue: 1
    // React batches → final value: 1 (không phải 3!)
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
        Kết quả: Chỉ tăng 1 (không đúng!)
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
    // ✅ CORRECT: Sử dụng prev để lấy giá trị mới nhất
    setCount((prev) => prev + 1); // fn(0) → 1
    setCount((prev) => prev + 1); // fn(1) → 2
    setCount((prev) => prev + 1); // fn(2) → 3
    // React xử lý tuần tự → final value: 3 ✓
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
        Kết quả: Tăng 3 (đúng!)
      </p>
    </div>
  );
}

// ============================================================
// BONUS: setTimeout Demonstration
// ============================================================
export function DelayedUpdateDemo() {
  const [count, setCount] = useState(0);

  const delayedIncrementDirect = () => {
    setTimeout(() => {
      // ❌ Stale closure: count bị "đóng băng" tại giá trị khi click
      setCount(count + 1);
    }, 2000);
  };

  const delayedIncrementFunctional = () => {
    setTimeout(() => {
      // ✅ Luôn dùng giá trị mới nhất từ React
      setCount((prev) => prev + 1);
    }, 2000);
  };

  return (
    <div style={{ padding: "1rem", border: "2px solid blue", margin: "1rem" }}>
      <h3>🔵 Bonus: setTimeout Demo</h3>
      <p style={{ fontSize: "2rem" }}>Count: {count}</p>
      <div>
        <button
          onClick={delayedIncrementDirect}
          style={{ padding: "0.5rem 1rem", background: "#ffcdd2" }}
        >
          Delayed +1 (Direct)
        </button>
        <button
          onClick={delayedIncrementFunctional}
          style={{
            marginLeft: "1rem",
            padding: "0.5rem 1rem",
            background: "#c8e6c9",
          }}
        >
          Delayed +1 (Functional)
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
      </div>
      <p style={{ fontSize: "0.8rem", color: "gray", marginTop: "1rem" }}>
        Thử nghiệm: Click "Delayed +1 (Direct)", sau đó nhanh chóng click
        "Increment now" vài lần trước khi 2 giây trôi qua. Direct version sẽ
        overwrite!
      </p>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FunctionalUpdateSolution() {
  return (
    <div>
      <h2>Exercise 2: Functional Updates - SOLUTION</h2>
      <p>Click "Increment 3 times" và quan sát kết quả của mỗi version.</p>
      <hr />

      <DirectUpdateVersion />
      <FunctionalUpdateVersion />
      <DelayedUpdateDemo />

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
// ❌ Direct Update - Stale Closure
const incrementThreeTimes = () => {
  setCount(count + 1);  // count = 0
  setCount(count + 1);  // count = 0 (still!)
  setCount(count + 1);  // count = 0 (still!)
  // Final: 1
};

// ✅ Functional Update - Always Fresh
const incrementThreeTimes = () => {
  setCount(prev => prev + 1);  // 0 → 1
  setCount(prev => prev + 1);  // 1 → 2
  setCount(prev => prev + 1);  // 2 → 3
  // Final: 3
};

Khi nào dùng Functional Update:
- State mới phụ thuộc state cũ
- Nhiều setState trong 1 event
- setTimeout/setInterval
- Event handlers phức tạp
          `}
        </pre>

        <h4>Mental Model:</h4>
        <pre
          style={{
            background: "#fff3e0",
            padding: "1rem",
            fontSize: "0.85rem",
          }}
        >
          {`
setCount(count + 1)         → "Đặt count = 0 + 1"
setCount(prev => prev + 1)  → "Lấy giá trị mới nhất, cộng 1"

Closure "chụp ảnh" biến tại thời điểm tạo function.
Functional update "hỏi React" giá trị hiện tại.
          `}
        </pre>
      </div>
    </div>
  );
}
