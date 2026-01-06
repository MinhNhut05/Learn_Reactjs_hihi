// ============================================================
// Exercise 2: Timer with Cleanup
// ============================================================
// 🎯 Goal: Tạo countdown timer với proper cleanup
//
// Scenario:
// - Countdown từ 10 xuống 0
// - Start/Stop để control timer
// - Reset để đặt lại về 10
// - Auto cleanup khi component unmount
// ============================================================

import { useState, useEffect } from "react";

const INITIAL_TIME = 9;

export default function Timer() {
  const [seconds, setSeconds] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    console.log("dang chay");
    if (!isRunning || seconds <= 0) return;
    const intervalID = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning, seconds]);
  // ╔════════════════════════════════════════════════════════╗
  // ║  👉 YOUR CODE HERE - Timer Effect                       ║
  // ║                                                         ║
  // ║  Tạo useEffect:                                        ║
  // ║  1. Nếu !isRunning hoặc seconds <= 0, return early    ║
  // ║  2. Tạo interval chạy mỗi 1000ms                       ║
  // ║     - Giảm seconds đi 1                                ║
  // ║  3. Return cleanup function để clearInterval          ║
  // ║  4. Dependencies: [isRunning, seconds]                 ║
  // ║                                                         ║
  // ║  Hint: setSeconds(s => s - 1)                          ║
  // ╚════════════════════════════════════════════════════════╝
  useEffect(() => {
    if (seconds === 0) {
      setSeconds(INITIAL_TIME);
    }
  }, [seconds]);
  // ╔════════════════════════════════════════════════════════╗
  // ║  👉 YOUR CODE HERE - Auto stop when reaches 0          ║
  // ║                                                         ║
  // ║  Tạo useEffect để stop timer khi seconds === 0:        ║
  // ║  - Nếu seconds === 0, setIsRunning(false)              ║
  // ║  - Dependencies: [seconds]                             ║
  // ╚════════════════════════════════════════════════════════╝

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(INITIAL_TIME);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2>Countdown Timer</h2>

      <div
        style={{
          fontSize: "72px",
          fontWeight: "bold",
          color: seconds <= 3 ? "#ef4444" : "#3b82f6",
          margin: "30px 0",
        }}
      >
        {seconds}
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={handleStartStop}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: isRunning ? "#f59e0b" : "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {isRunning ? "Stop" : "Start"}
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#6b7280",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#fef3c7",
          borderRadius: "8px",
          textAlign: "left",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>⚠️ Test Cleanup:</h4>
        <ol style={{ margin: 0, paddingLeft: "20px", fontSize: "14px" }}>
          <li>Start timer</li>
          <li>Navigate away hoặc toggle component visibility</li>
          <li>
            Check console - không có errors về updating unmounted component
          </li>
        </ol>
      </div>
    </div>
  );
}
