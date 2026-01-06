// ============================================================
// Exercise 1: Lifecycle Logger
// ============================================================
// 🎯 Goal: Hiểu component lifecycle thông qua console.log
//
// Scenario:
// - Tạo component log ra khi mount/update/unmount
// - Parent component có toggle để show/hide child
// - Child component có counter để trigger updates
// ============================================================

import { useState, useEffect } from "react";

// ============================================================
// COMPONENT: LifecycleChild
// Component này sẽ log lifecycle events
// ============================================================
function LifecycleChild({ name }: { name: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`🟢 ${name} MOUNTED`);

    return () => console.log(`🔴 ${name} UNMOUNTED`);
  }, []);
  // ╔════════════════════════════════════════════════════════╗
  // ║  👉 YOUR CODE HERE - Effect 1: Mount/Unmount           ║
  // ║                                                         ║
  // ║  Tạo useEffect với empty deps []:                      ║
  // ║  - Log "🟢 {name} MOUNTED" khi mount                   ║
  // ║  - Return cleanup function log "🔴 {name} UNMOUNTED"  ║
  // ╚════════════════════════════════════════════════════════╝
  useEffect(() => {
    console.log(`🔄 ${name} count: ${count}`);
  }, [count]);
  // ╔════════════════════════════════════════════════════════╗
  // ║  👉 YOUR CODE HERE - Effect 2: Count Updates           ║
  // ║                                                         ║
  // ║  Tạo useEffect với deps [count]:                       ║
  // ║  - Log "🔄 {name} count: {count}"                      ║
  // ╚════════════════════════════════════════════════════════╝

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #3b82f6",
        borderRadius: "8px",
        marginTop: "10px",
      }}
    >
      <h3>{name}</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

// ============================================================
// COMPONENT: LifecycleLogger (Parent)
// ============================================================
export default function LifecycleLogger() {
  const [showChild, setShowChild] = useState(true);

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Lifecycle Logger</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        👀 Mở Console (F12) để xem lifecycle logs
      </p>

      <button
        onClick={() => setShowChild((prev) => !prev)}
        style={{
          padding: "10px 20px",
          backgroundColor: showChild ? "#ef4444" : "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {showChild ? "Hide Child (Unmount)" : "Show Child (Mount)"}
      </button>

      {showChild && <LifecycleChild name="MyComponent" />}

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
        }}
      >
        <h4>Expected Console Output:</h4>
        <pre style={{ fontSize: "12px", margin: 0 }}>
          {`// Khi mount:
🟢 MyComponent MOUNTED
🔄 MyComponent count: 0

// Khi click Increment:
🔄 MyComponent count: 1

// Khi click Hide Child:
🔴 MyComponent UNMOUNTED`}
        </pre>
      </div>
    </div>
  );
}
