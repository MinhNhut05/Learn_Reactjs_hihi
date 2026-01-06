/**
 * Exercise 2: useRef Advanced - SOLUTION
 *
 * LEARNING GOALS (Da hoan thanh):
 * ✅ Luu previous value voi useRef
 * ✅ Luu mutable values (interval ID) khong trigger re-render
 * ✅ Hieu su khac biet useRef vs useState
 * ✅ Cleanup interval trong useEffect
 */

import { useState, useRef, useEffect } from "react";

export default function UseRefAdvancedSolution() {
  // ========================================
  // PART A: Previous Value Tracker
  // ========================================
  const [count, setCount] = useState(0);

  /**
   * SOLUTION 1: Tao ref de luu previous value
   *
   * useRef<number | undefined>(undefined)
   * - Type: number | undefined vi lan dau chua co previous value
   * - Initial: undefined
   * - Tai sao dung ref? Vi thay doi previous value KHONG can re-render
   */
  const prevCountRef = useRef<number | undefined>(undefined);

  // Update prevCountRef sau moi render
  useEffect(() => {
    /**
     * SOLUTION 2: Luu count hien tai vao ref.current
     *
     * prevCountRef.current = count
     * - useEffect chay SAU render
     * - Nen lan render tiep theo, prevCountRef.current la gia tri cu
     *
     * Flow:
     * 1. Render: count = 0, prevCountRef.current = undefined
     * 2. useEffect: prevCountRef.current = 0
     * 3. Click +1
     * 4. Render: count = 1, prevCountRef.current = 0 (still!)
     * 5. useEffect: prevCountRef.current = 1
     */
    prevCountRef.current = count;
  }, [count]);

  // ========================================
  // PART B: Timer with useRef
  // ========================================
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  /**
   * SOLUTION 3: Tao ref de luu interval ID
   *
   * useRef<number | null>(null)
   * - Type: number | null
   *   - number: setInterval tra ve number (ID cua interval)
   *   - null: khi chua co interval
   * - Tai sao dung ref thay vi state?
   *   - intervalId chi la internal value
   *   - Thay doi intervalId KHONG can update UI
   *   - Dung state se gay re-render khong can thiet
   */
  const intervalRef = useRef<number | null>(null);

  const startTimer = () => {
    if (isRunning) return; // Tranh tao nhieu interval

    setIsRunning(true);

    /**
     * SOLUTION 4: Luu interval ID vao ref.current
     *
     * intervalRef.current = window.setInterval(...)
     * - setInterval tra ve ID de co the clearInterval sau
     * - Luu vao ref.current de access trong stopTimer va cleanup
     * - window.setInterval thay vi setInterval de TypeScript hieu type
     */
    intervalRef.current = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };

  const stopTimer = () => {
    /**
     * SOLUTION 5: Check va clear interval
     *
     * if (intervalRef.current !== null)
     * - Check de dam bao co interval dang chay
     * - clearInterval(intervalRef.current) de dung interval
     * - intervalRef.current = null de reset
     */
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
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
      /**
       * SOLUTION 6: Clear interval trong cleanup
       *
       * - Khi component unmount, can clear interval
       * - Neu khong, interval van chay -> memory leak
       * - Cleanup function chay khi:
       *   1. Component unmount
       *   2. Truoc khi effect chay lai (neu co deps thay doi)
       */
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // ========================================
  // PART C: Render Count (Demo - ref khong trigger re-render)
  // ========================================
  const renderCountRef = useRef(0);

  /**
   * Demo: Tang render count moi lan component render
   *
   * renderCountRef.current += 1
   * - Thay doi ref.current KHONG trigger re-render
   * - Gia tri nay chi update khi component render vi ly do khac
   *   (vd: state thay doi)
   * - Neu dung useState, moi lan tang se trigger render -> infinite loop!
   */
  renderCountRef.current += 1;

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="exercise-container">
      <h2>Exercise 2: useRef Advanced - SOLUTION</h2>

      {/* Part A: Previous Value */}
      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #4CAF50" }}>
        <h3>Part A: Previous Value Tracker ✅</h3>
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
        <p style={{ color: "#4CAF50", fontSize: "0.9rem", marginTop: "0.5rem" }}>
          ✅ Previous value cap nhat SAU khi render (trong useEffect)
        </p>
      </section>

      {/* Part B: Timer */}
      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #4CAF50" }}>
        <h3>Part B: Timer with useRef ✅</h3>
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
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
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
        <p style={{ color: "#4CAF50", fontSize: "0.9rem", marginTop: "1rem", textAlign: "center" }}>
          ✅ intervalId luu trong useRef - KHONG trigger re-render khi luu
        </p>
      </section>

      {/* Part C: Render Count Demo */}
      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #9C27B0" }}>
        <h3>Part C: Render Count (Demo) ✅</h3>
        <p>
          Component has rendered <strong>{renderCountRef.current}</strong> times
        </p>
        <p style={{ color: "#9C27B0", fontSize: "0.9rem" }}>
          ✅ renderCountRef.current tang moi render nhung khong TU trigger re-render
        </p>
      </section>

      {/* Key Takeaways */}
      <section
        style={{
          padding: "1rem",
          background: "#e3f2fd",
          borderRadius: "8px",
          marginTop: "2rem",
        }}
      >
        <h3>Key Takeaways:</h3>
        <ol>
          <li>
            <strong>Previous value pattern:</strong> Update ref trong useEffect sau moi render
          </li>
          <li>
            <strong>Timer IDs:</strong> Luu trong ref, khong phai state (khong can re-render)
          </li>
          <li>
            <strong>Cleanup:</strong> Luon clear interval/timeout trong useEffect cleanup
          </li>
          <li>
            <strong>useRef vs useState:</strong>
            <ul>
              <li>useState: Gia tri can hien thi tren UI</li>
              <li>useRef: Gia tri noi bo, khong anh huong UI</li>
            </ul>
          </li>
        </ol>
      </section>
    </div>
  );
}
