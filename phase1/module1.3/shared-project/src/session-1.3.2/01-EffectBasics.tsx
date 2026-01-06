/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                     EXERCISE 1: useEffect BASICS                         ║
 * ║                         Difficulty: ⭐⭐ (Medium)                         ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * LEARNING GOALS:
 * - Hiểu sự khác biệt giữa 3 loại dependencies
 * - Quan sát khi nào effect chạy
 *
 * HƯỚNG DẪN: Điền vào các chỗ ??? để hoàn thành code
 */

import { useState, useEffect } from "react";

export function EffectBasics() {
  const [count, setCount] = useState(0);

  // ════════════════════════════════════════════════════════════════
  // EFFECT 1: Chạy khi count thay đổi
  // Điền vào ??? để effect theo dõi count
  // ════════════════════════════════════════════════════════════════

  useEffect(() => {
    console.log("🔢 [count] Effect: count =", count); // 👈 Điền biến cần log
  }, [count]); // 👈 Điền dependency

  // ════════════════════════════════════════════════════════════════
  // EFFECT 2: Chạy CHỈ 1 LẦN khi mount
  // Điền vào ??? - dependencies array rỗng là gì?
  // ════════════════════════════════════════════════════════════════

  useEffect(() => {
    console.log("🚀 [] Effect: Component mounted!");
  }, []); // 👈 Điền array rỗng

  // ════════════════════════════════════════════════════════════════
  // EFFECT 3: Chạy MỖI render (⚠️ dangerous!)
  // Bỏ hoàn toàn dependency array
  // ════════════════════════════════════════════════════════════════

  useEffect(() => {
    console.log("⚠️ No deps Effect: Every render");
  }); // 👈 Xóa phần này hoàn toàn (không có dependency array)

  console.log("📦 Component rendering, count =", count);

  // ════════════════════════════════════════════════════════════════
  // HANDLERS (ĐÃ VIẾT SẴN)
  // ════════════════════════════════════════════════════════════════

  const handleIncrement = () => {
    console.log("➕ Increment clicked");
    setCount((prev) => prev + 1);
  };

  const handleReset = () => {
    console.log("🔄 Reset clicked");
    setCount(0);
  };

  // ════════════════════════════════════════════════════════════════
  // UI (ĐÃ VIẾT SẴN)
  // ════════════════════════════════════════════════════════════════

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Exercise 1: useEffect Basics</h2>

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
          <li>Điền vào các chỗ ??? trong code</li>
          <li>Mở DevTools Console (F12)</li>
          <li>Click "Increment" vài lần</li>
          <li>Quan sát sự khác biệt giữa 3 effects</li>
        </ol>

        <h3>🔍 Expected:</h3>
        <ul style={{ textAlign: "left" }}>
          <li>
            <code>[count]</code>: Chạy khi count thay đổi
          </li>
          <li>
            <code>[]</code>: Chạy 1 lần duy nhất
          </li>
          <li>
            <code>No deps</code>: Chạy mỗi render
          </li>
        </ul>
      </div>
    </div>
  );
}

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

export default EffectBasics;
