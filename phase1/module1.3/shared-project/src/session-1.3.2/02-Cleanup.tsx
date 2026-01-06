/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                     EXERCISE 2: CLEANUP FUNCTIONS                        ║
 * ║                         Difficulty: ⭐⭐⭐ (Hard)                         ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * LEARNING GOALS:
 * - Hiểu cleanup function syntax: return () => {...}
 * - Khi nào cleanup runs
 * - Tránh memory leaks
 *
 * HƯỚNG DẪN: Điền vào các chỗ ??? để hoàn thành code
 */

import { useState, useEffect } from "react";

// ============================================================================
//                          PART A: MOUSE TRACKER
// ============================================================================

interface MousePosition {
  x: number;
  y: number;
}

export function MouseTracker() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  // ════════════════════════════════════════════════════════════════
  // useEffect với event listener + cleanup
  // Điền vào các chỗ ??? để hoàn thành
  // ════════════════════════════════════════════════════════════════

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 👈 Type của mouse event
      setMousePosition({ x: e.clientX, y: e.clientY }); // 👈 Thuộc tính x, y của event
    };

    console.log("✅ MouseTracker: Adding listener");
    window.addEventListener("mousemove", handleMouseMove); // 👈 Thêm event listener

    return () => {
      console.log("🧹 MouseTracker: Removing listener");
      window.removeEventListener("mousemove", handleMouseMove); // 👈 Xóa event listener
    };
  }, []); // 👈 Dependencies - chạy 1 lần khi mount

  return (
    <div style={trackerStyle}>
      <h3>🖱️ Mouse Tracker</h3>
      <p style={{ fontSize: "1.5rem" }}>
        X: <strong>{mousePosition.x}</strong>
      </p>
      <p style={{ fontSize: "1.5rem" }}>
        Y: <strong>{mousePosition.y}</strong>
      </p>
      <p style={{ fontSize: "0.8rem", color: "#666" }}>Move your mouse!</p>
    </div>
  );
}

// ============================================================================
//                             PART B: TIMER
// ============================================================================

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // ════════════════════════════════════════════════════════════════
  // useEffect với interval + cleanup
  // Điền vào các chỗ ??? để hoàn thành
  // ════════════════════════════════════════════════════════════════

  useEffect(() => {
    if (!isRunning) return; // 👈 Early return khi không chạy

    console.log("⏱️ Timer: Starting interval");
    const intervalId = setInterval(() => {
      // 👈 Hàm tạo interval
      setSeconds((prev) => prev + 1); // 👈 Functional update
    }, 1000); // 👈 Thời gian (ms)

    return () => {
      console.log("🧹 Timer: Clearing interval");
      clearInterval(intervalId); // 👈 Hàm clear interval
    };
  }, [isRunning]); // 👈 Dependency - effect chạy lại khi biến này thay đổi

  // ════════════════════════════════════════════════════════════════
  // HANDLERS (ĐÃ VIẾT SẴN)
  // ════════════════════════════════════════════════════════════════

  const handleStart = () => {
    console.log("▶️ Start clicked");
    setIsRunning(true);
  };

  const handleStop = () => {
    console.log("⏸️ Stop clicked");
    setIsRunning(false);
  };

  const handleReset = () => {
    console.log("🔄 Reset clicked");
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div style={timerStyle}>
      <h3>⏱️ Timer</h3>
      <div style={{ fontSize: "3rem", fontFamily: "monospace" }}>
        {formatTime(seconds)}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
        <button
          onClick={handleStart}
          disabled={isRunning}
          style={{ ...buttonStyle, opacity: isRunning ? 0.5 : 1 }}
        >
          ▶️ Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          style={{ ...buttonStyle, opacity: !isRunning ? 0.5 : 1 }}
        >
          ⏸️ Stop
        </button>
        <button onClick={handleReset} style={buttonStyle}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

// ============================================================================
//                           MAIN COMPONENT
// ============================================================================

export function CleanupExercise() {
  const [showMouseTracker, setShowMouseTracker] = useState(true);
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Exercise 2: Cleanup Functions</h2>

      {/* Toggle Controls */}
      <div style={controlsStyle}>
        <label style={labelStyle}>
          <input
            type="checkbox"
            checked={showMouseTracker}
            onChange={(e) => setShowMouseTracker(e.target.checked)}
          />
          Show Mouse Tracker
        </label>
        <label style={labelStyle}>
          <input
            type="checkbox"
            checked={showTimer}
            onChange={(e) => setShowTimer(e.target.checked)}
          />
          Show Timer
        </label>
      </div>

      {/* Instructions */}
      <div style={instructionStyle}>
        <h3>📋 How to Test:</h3>
        <ol>
          <li>Điền vào các chỗ ??? trong MouseTracker và Timer</li>
          <li>Mở DevTools Console (F12)</li>
          <li>Uncheck "Show Mouse Tracker" → xem cleanup log</li>
          <li>Làm tương tự với Timer</li>
        </ol>

        <h3>💡 Hints:</h3>
        <ul style={{ textAlign: "left" }}>
          <li>
            Mouse event type: <code>MouseEvent</code>
          </li>
          <li>
            Position props: <code>clientX</code>, <code>clientY</code>
          </li>
          <li>
            Add listener: <code>addEventListener</code>
          </li>
          <li>
            Interval: <code>setInterval</code>, <code>clearInterval</code>
          </li>
        </ul>
      </div>

      {/* Components */}
      <div style={componentsContainerStyle}>
        {showMouseTracker ? (
          <MouseTracker />
        ) : (
          <div style={placeholderStyle}>Mouse Tracker unmounted</div>
        )}

        {showTimer ? (
          <Timer />
        ) : (
          <div style={placeholderStyle}>Timer unmounted</div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Helper Functions
// ============================================================

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// ============================================================
// Styles
// ============================================================

const controlsStyle: React.CSSProperties = {
  display: "flex",
  gap: "2rem",
  marginBottom: "1rem",
  padding: "1rem",
  background: "#e3f2fd",
  borderRadius: "8px",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "pointer",
  fontSize: "1.1rem",
};

const instructionStyle: React.CSSProperties = {
  padding: "1rem",
  background: "#e8f5e9",
  borderRadius: "8px",
  marginBottom: "1rem",
  textAlign: "left",
};

const componentsContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

const trackerStyle: React.CSSProperties = {
  padding: "1rem",
  background: "#e8f5e9",
  borderRadius: "8px",
  textAlign: "center",
};

const timerStyle: React.CSSProperties = {
  padding: "1rem",
  background: "#fce4ec",
  borderRadius: "8px",
  textAlign: "center",
};

const placeholderStyle: React.CSSProperties = {
  padding: "2rem",
  background: "#f5f5f5",
  borderRadius: "8px",
  textAlign: "center",
  color: "#999",
  fontStyle: "italic",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  cursor: "pointer",
  border: "1px solid #ccc",
  borderRadius: "4px",
  background: "#fff",
};

export default CleanupExercise;
