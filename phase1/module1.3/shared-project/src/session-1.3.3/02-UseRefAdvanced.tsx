/**
 * Exercise 2: useRef Advanced
 * Difficulty: Hard
 *
 * LEARNING GOALS:
 * - Luu previous value voi useRef
 * - Luu mutable values (interval ID) khong trigger re-render
 * - Hieu su khac biet useRef vs useState
 * - Cleanup interval trong useEffect
 *
 * HUONG DAN: Dien vao cac cho ??? de hoan thanh code
 * Moi cho co hint (<-) de huong dan
 */

import { useState, useRef, useEffect } from "react";

export default function UseRefAdvanced() {
  // ========================================
  // PART A: Previous Value Tracker
  // ========================================
  const [count, setCount] = useState(0);

  // TODO 1: Tao ref de luu previous value
  // Hint: useRef<number | undefined>(undefined)
  const prevCountRef = useRef<number | undefined>(undefined); // <- useRef<number | undefined>(undefined)

  // Update prevCountRef sau moi render
  useEffect(() => {
    // TODO 2: Luu count hien tai vao ref.current
    // Hint: prevCountRef.current = count
    prevCountRef.current = count; // <- prevCountRef.current = count
  }, [count]);

  // ========================================
  // PART B: Timer with useRef
  // ========================================
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // TODO 3: Tao ref de luu interval ID
  // Hint: useRef<number | null>(null) - dung number vi setInterval tra ve number
  const intervalRef = useRef<number | null>(null); // <- useRef<number | null>(null)

  const startTimer = () => {
    if (isRunning) return; // Tranh tao nhieu interval

    setIsRunning(true);

    // TODO 4: Luu interval ID vao ref.current
    // Hint: intervalRef.current = window.setInterval(...)
    intervalRef.current = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000); // <- intervalRef.current = window.setInterval(...)
  };

  const stopTimer = () => {
    // TODO 5: Check va clear interval
    // Hint: if (intervalRef.current !== null) { clearInterval(intervalRef.current); }
    if (intervalRef.current !== null) {
      // <- intervalRef.current !== null
      clearInterval(intervalRef.current);
      intervalRef.current = null; // <- intervalRef.current = null
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      // TODO 6: Clear interval trong cleanup
      // Hint: if (intervalRef.current !== null) clearInterval(intervalRef.current)
      if (intervalRef.current !== null) {
        // <- intervalRef.current !== null
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // ========================================
  // PART C: Render Count (Demo - ref khong trigger re-render)
  // ========================================
  const renderCountRef = useRef(0);

  // Tang render count moi lan component render
  // Luu y: Thay doi ref.current KHONG trigger re-render
  renderCountRef.current += 1;

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="exercise-container">
      <h2>Exercise 2: useRef Advanced</h2>

      {/* Part A: Previous Value */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
        }}
      >
        <h3>Part A: Previous Value Tracker</h3>
        <div style={{ marginBottom: "1rem" }}>
          <p>
            <strong>Current count:</strong> {count}
          </p>
          <p>
            <strong>Previous count:</strong>{" "}
            {prevCountRef.current !== undefined ? prevCountRef.current : "N/A"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setCount((c) => c + 1)}>+1</button>
          <button onClick={() => setCount((c) => c - 1)}>-1</button>
          <button onClick={() => setCount((c) => c + 5)}>+5</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>
        <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "0.5rem" }}>
          Previous value cap nhat SAU khi render (trong useEffect)
        </p>
      </section>

      {/* Part B: Timer */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
        }}
      >
        <h3>Part B: Timer with useRef</h3>
        <div
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "1rem",
            fontFamily: "monospace",
          }}
        >
          {String(Math.floor(seconds / 60)).padStart(2, "0")}:
          {String(seconds % 60).padStart(2, "0")}
        </div>
        <div
          style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}
        >
          <button
            onClick={startTimer}
            disabled={isRunning}
            style={{
              padding: "0.5rem 1.5rem",
              background: isRunning ? "#ccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isRunning ? "not-allowed" : "pointer",
            }}
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            disabled={!isRunning}
            style={{
              padding: "0.5rem 1.5rem",
              background: !isRunning ? "#ccc" : "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: !isRunning ? "not-allowed" : "pointer",
            }}
          >
            Stop
          </button>
          <button
            onClick={resetTimer}
            style={{
              padding: "0.5rem 1.5rem",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
        <p
          style={{
            color: "#666",
            fontSize: "0.9rem",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          intervalId luu trong useRef - KHONG trigger re-render khi luu
        </p>
      </section>

      {/* Part C: Render Count Demo */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #9C27B0",
        }}
      >
        <h3>Part C: Render Count (Demo)</h3>
        <p>
          Component has rendered <strong>{renderCountRef.current}</strong> times
        </p>
        <p style={{ color: "#666", fontSize: "0.9rem" }}>
          renderCountRef.current tang moi render nhung khong TU trigger
          re-render
        </p>
      </section>

      {/* Hints Section */}
      <section
        style={{
          padding: "1rem",
          background: "#e8f5e9",
          borderRadius: "8px",
          marginTop: "2rem",
        }}
      >
        <h3>Hints:</h3>
        <ul>
          <li>
            <strong>Previous value ref:</strong>{" "}
            <code>useRef&lt;number | undefined&gt;(undefined)</code>
          </li>
          <li>
            <strong>Update trong useEffect:</strong>{" "}
            <code>prevRef.current = currentValue</code>
          </li>
          <li>
            <strong>Interval ID ref:</strong>{" "}
            <code>useRef&lt;number | null&gt;(null)</code>
          </li>
          <li>
            <strong>Save interval:</strong>{" "}
            <code>intervalRef.current = window.setInterval(...)</code>
          </li>
          <li>
            <strong>Clear interval:</strong>{" "}
            <code>
              if (intervalRef.current !== null)
              clearInterval(intervalRef.current)
            </code>
          </li>
          <li>
            <strong>Cleanup:</strong> uon
          </li>
        </ul>
      </section>
    </div>
  );
}
