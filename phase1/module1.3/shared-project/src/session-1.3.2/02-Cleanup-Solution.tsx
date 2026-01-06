/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                     EXERCISE 2: CLEANUP FUNCTIONS                        ║
 * ║                              ✅ SOLUTION                                 ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

// ✅ TODO 0: Import React hooks
import { useState, useEffect } from "react";

// ============================================================================
//                          PART A: MOUSE TRACKER
// ============================================================================

interface MousePosition {
  x: number;
  y: number;
}

export function MouseTrackerSolution() {
  // ✅ TODO 1: Declare mousePosition state
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  // ✅ TODO 2, 3, 4: Effect with event listener and cleanup
  useEffect(() => {
    // Handler defined INSIDE useEffect
    // This ensures we have the same function reference for add/remove
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      // Commented out to avoid console spam - uncomment to debug
      // console.log("🖱️ Mouse moved:", e.clientX, e.clientY);
    };

    // ✅ TODO 3: Setup - Add event listener
    console.log("✅ MouseTracker: Adding listener");
    window.addEventListener("mousemove", handleMouseMove);

    // ✅ TODO 4: Cleanup - Remove event listener
    return () => {
      console.log("🧹 MouseTracker: Removing listener");
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty deps = run once on mount, cleanup on unmount

  // 📝 KEY POINTS:
  // 1. handleMouseMove defined INSIDE useEffect so it's the same reference
  //    for both addEventListener and removeEventListener
  // 2. Empty [] means: setup on mount, cleanup on unmount
  // 3. If we had [someValue] in deps:
  //    - Old cleanup runs BEFORE new effect
  //    - Prevents duplicate listeners

  // ✅ TODO 5: Render UI
  return (
    <div style={trackerStyle}>
      <h3>🖱️ Mouse Tracker ✅</h3>
      <p style={{ fontSize: "1.5rem" }}>
        X: <strong>{mousePosition.x}</strong>
      </p>
      <p style={{ fontSize: "1.5rem" }}>
        Y: <strong>{mousePosition.y}</strong>
      </p>
      <p style={{ fontSize: "0.8rem", color: "#666" }}>Move your mouse around!</p>
    </div>
  );
}

// ============================================================================
//                             PART B: TIMER
// ============================================================================

export function TimerSolution() {
  // ✅ TODO 6: Declare states
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // ✅ TODO 7 & 8: Effect with interval and cleanup
  useEffect(() => {
    // Early return if not running - no interval needed
    if (!isRunning) {
      return;
    }

    // Setup interval
    console.log("⏱️ Timer: Starting interval");
    const intervalId = setInterval(() => {
      // ✅ Functional update to avoid stale closure!
      // If we used setSeconds(seconds + 1), seconds would always be 0
      // because it's captured from the closure when effect runs
      setSeconds((prev) => prev + 1);
    }, 1000);

    // ✅ TODO 8: Cleanup
    return () => {
      console.log("🧹 Timer: Clearing interval");
      clearInterval(intervalId);
    };
  }, [isRunning]); // Re-run when isRunning changes

  // 📝 WHY THIS WORKS:
  // 1. When isRunning becomes true: effect runs, interval starts
  // 2. When isRunning becomes false: cleanup runs, interval clears
  // 3. When component unmounts: cleanup runs, interval clears
  // 4. Functional update (prev => prev + 1) avoids stale closure

  // ✅ TODO 9: Start handler
  const handleStart = () => {
    console.log("▶️ Start clicked");
    setIsRunning(true);
  };

  // ✅ TODO 10: Stop handler
  const handleStop = () => {
    console.log("⏸️ Stop clicked");
    setIsRunning(false);
  };

  // ✅ TODO 11: Reset handler
  const handleReset = () => {
    console.log("🔄 Reset clicked");
    setIsRunning(false);
    setSeconds(0);
  };

  // ✅ TODO 12: Render UI
  return (
    <div style={timerStyle}>
      <h3>⏱️ Timer ✅</h3>
      <div style={{ fontSize: "3rem", fontFamily: "monospace" }}>
        {formatTime(seconds)}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
        <button
          onClick={handleStart}
          disabled={isRunning}
          style={{
            ...buttonStyle,
            opacity: isRunning ? 0.5 : 1,
          }}
        >
          ▶️ Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          style={{
            ...buttonStyle,
            opacity: !isRunning ? 0.5 : 1,
          }}
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

export function CleanupExerciseSolution() {
  const [showMouseTracker, setShowMouseTracker] = useState(true);
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Exercise 2: Cleanup Functions ✅</h2>

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
        <h3>📋 Cleanup Flow Explained:</h3>
        <div style={analysisStyle}>
          <p>
            <strong>Mount:</strong>
          </p>
          <pre style={codeStyle}>Render → DOM Update → Effect (setup)</pre>

          <p>
            <strong>Update (when deps change):</strong>
          </p>
          <pre style={codeStyle}>
            Render → DOM Update → Cleanup (old) → Effect (new)
          </pre>

          <p>
            <strong>Unmount:</strong>
          </p>
          <pre style={codeStyle}>Cleanup runs → Component removed</pre>
        </div>

        <h3>💡 Key Takeaways:</h3>
        <ul>
          <li>
            <strong>Always cleanup</strong> event listeners, timers, subscriptions
          </li>
          <li>
            <strong>Functional updates</strong> (prev =&gt; ...) avoid stale closures
          </li>
          <li>
            <strong>Same function reference</strong> for add/remove listener
          </li>
          <li>
            <strong>Cleanup runs</strong> before new effect AND on unmount
          </li>
        </ul>
      </div>

      {/* Components with conditional rendering */}
      <div style={componentsContainerStyle}>
        {showMouseTracker ? (
          <MouseTrackerSolution />
        ) : (
          <div style={placeholderStyle}>Mouse Tracker unmounted</div>
        )}

        {showTimer ? (
          <TimerSolution />
        ) : (
          <div style={placeholderStyle}>Timer unmounted</div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
//                             HELPER FUNCTIONS
// ============================================================================

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// ============================================================================
//                                STYLES
// ============================================================================

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
};

const analysisStyle: React.CSSProperties = {
  background: "#f5f5f5",
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

export default CleanupExerciseSolution;
