/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                     EXERCISE 1: useEffect BASICS                         ║
 * ║                              ✅ SOLUTION                                 ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

// ✅ TODO 0: Import React hooks
import { useState, useEffect } from "react";

export function EffectBasicsSolution() {
  // ✅ TODO 1: Declare count state
  const [count, setCount] = useState<number>(0);

  // ✅ TODO 2: Effect với dependencies [count]
  // Chạy khi mount VÀ mỗi khi count thay đổi
  useEffect(() => {
    console.log("🔢 [count] Effect: count =", count);
  }, [count]);
  // 📝 Explanation:
  // - [count] = effect này "subscribe" to count
  // - Khi count thay đổi → effect runs lại
  // - Cũng chạy lần đầu khi mount

  // ✅ TODO 3: Effect với dependencies [] (empty array)
  // Chạy CHỈ 1 LẦN khi component mount
  useEffect(() => {
    console.log("🚀 [] Effect: Component mounted!");
  }, []);
  // 📝 Explanation:
  // - [] = empty dependencies = không có gì để theo dõi
  // - Chỉ chạy 1 lần duy nhất khi mount
  // - Perfect cho: initial API calls, one-time setup

  // ✅ TODO 4: Effect KHÔNG có dependencies array
  // ⚠️ Chạy MỖI lần render - CAREFUL!
  useEffect(() => {
    console.log("⚠️ No deps Effect: Runs every render");
  });
  // 📝 Explanation:
  // - Không có dependencies array = chạy sau MỖI render
  // - Usually a bug! Nếu effect này gọi setState → infinite loop!
  // - Dùng rất hiếm, chỉ khi thực sự cần track every render

  // ✅ TODO 5: Increment handler
  const handleIncrement = () => {
    console.log("➕ Increment clicked");
    setCount((prev) => prev + 1);
    // 📝 Functional update: (prev => prev + 1)
    // - Luôn dùng prev value thay vì count trực tiếp
    // - Tránh stale closure issues
  };

  // ✅ TODO 6: Reset handler
  const handleReset = () => {
    console.log("🔄 Reset clicked");
    setCount(0);
  };

  // Log render để track re-renders
  console.log("📦 Component rendering, count =", count);

  // ✅ TODO 7: Render UI
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Exercise 1: useEffect Basics ✅</h2>

      <div style={{ fontSize: "3rem", margin: "1rem 0" }}>Count: {count}</div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={handleIncrement} style={buttonStyle}>
          ➕ Increment
        </button>
        <button onClick={handleReset} style={buttonStyle}>
          🔄 Reset
        </button>
      </div>

      <div style={instructionStyle}>
        <h3>📋 Instructions:</h3>
        <ol>
          <li>Mở DevTools Console (F12)</li>
          <li>Click "Increment" vài lần</li>
          <li>Quan sát console logs</li>
          <li>Click "Reset" và quan sát lại</li>
        </ol>

        <h3>🔍 Console Output Analysis:</h3>
        <div style={analysisStyle}>
          <p>
            <strong>On Mount (lần đầu):</strong>
          </p>
          <pre style={codeStyle}>
            📦 Component rendering, count = 0{"\n"}
            🔢 [count] Effect: count = 0{"\n"}
            🚀 [] Effect: Component mounted!{"\n"}
            ⚠️ No deps Effect: Runs every render
          </pre>

          <p>
            <strong>After clicking Increment:</strong>
          </p>
          <pre style={codeStyle}>
            ➕ Increment clicked{"\n"}
            📦 Component rendering, count = 1{"\n"}
            🔢 [count] Effect: count = 1{"\n"}
            ⚠️ No deps Effect: Runs every render{"\n"}
            {"\n"}
            {/* 🚀 [] Effect KHÔNG chạy lại! */}
          </pre>
        </div>

        <h3>💡 Key Takeaways:</h3>
        <ul>
          <li>
            <code>[]</code>: Chạy 1 lần - perfect cho initial setup
          </li>
          <li>
            <code>[count]</code>: Chạy khi count thay đổi - react to changes
          </li>
          <li>
            <code>No deps</code>: Chạy mỗi render - usually a bug!
          </li>
        </ul>
      </div>
    </div>
  );
}

// Styles
const buttonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  cursor: "pointer",
  border: "2px solid #333",
  borderRadius: "8px",
  background: "#fff",
};

const instructionStyle: React.CSSProperties = {
  marginTop: "2rem",
  padding: "1rem",
  background: "#f5f5f5",
  borderRadius: "8px",
  textAlign: "left",
};

const analysisStyle: React.CSSProperties = {
  background: "#e8e8e8",
  padding: "1rem",
  borderRadius: "4px",
  marginTop: "1rem",
};

const codeStyle: React.CSSProperties = {
  background: "#2d2d2d",
  color: "#f8f8f2",
  padding: "0.5rem",
  borderRadius: "4px",
  fontSize: "0.85rem",
  overflow: "auto",
};

export default EffectBasicsSolution;
