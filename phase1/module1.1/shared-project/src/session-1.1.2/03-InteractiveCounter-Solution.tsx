// ✅ SOLUTION: Interactive Counter với Global Keyboard Events

import { MouseEvent, useEffect, useState } from "react";

function InteractiveCounterSolution() {
  // State
  const [count, setCount] = useState<number>(0);

  // Button click handlers
  const handleIncrement = (e: MouseEvent<HTMLButtonElement>) => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = (e: MouseEvent<HTMLButtonElement>) => {
    setCount((prev) => prev - 1);
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    setCount(0);
  };

  // Global keyboard shortcuts
  useEffect(() => {
    // IMPORTANT: KeyboardEvent là NATIVE DOM type, không import từ React
    const handleKeyDown = (e: KeyboardEvent) => {
      // Basic shortcuts
      if (e.key === "+" || e.key === "=") {
        setCount((prev) => prev + 1);
      }

      if (e.key === "-" || e.key === "_") {
        setCount((prev) => prev - 1);
      }

      if (e.key === "r" || e.key === "R") {
        setCount(0);
      }

      // Bonus: Advanced shortcuts với modifiers
      if (e.ctrlKey && e.key === "ArrowUp") {
        e.preventDefault(); // Prevent page scroll
        setCount((prev) => prev + 10);
      }

      if (e.ctrlKey && e.key === "ArrowDown") {
        e.preventDefault(); // Prevent page scroll
        setCount((prev) => prev - 10);
      }
    };

    // Add global event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function - QUAN TRỌNG!
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty deps - chỉ setup 1 lần

  return (
    <div className="interactive-counter">
      <h2>Interactive Counter (Solution)</h2>

      {/* Count display */}
      <div
        className="count-display"
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          margin: "20px 0",
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        {count}
      </div>

      {/* Buttons */}
      <div
        className="buttons"
        style={{ display: "flex", gap: "10px", justifyContent: "center" }}
      >
        <button
          onClick={handleIncrement}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          + Increment
        </button>

        <button
          onClick={handleDecrement}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          - Decrement
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Reset
        </button>
      </div>

      {/* Shortcuts info */}
      <div style={{ marginTop: "30px", fontSize: "12px", color: "#666" }}>
        <h3>Keyboard Shortcuts:</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            <kbd
              style={{
                padding: "2px 6px",
                backgroundColor: "#eee",
                borderRadius: "3px",
              }}
            >
              +
            </kbd>
            {" or "}
            <kbd
              style={{
                padding: "2px 6px",
                backgroundColor: "#eee",
                borderRadius: "3px",
              }}
            >
              =
            </kbd>
            {" - Increment (+1)"}
          </li>
          <li>
            <kbd
              style={{
                padding: "2px 6px",
                backgroundColor: "#eee",
                borderRadius: "3px",
              }}
            >
              -
            </kbd>
            {" - Decrement (-1)"}
          </li>
          <li>
            <kbd
              style={{
                padding: "2px 6px",
                backgroundColor: "#eee",
                borderRadius: "3px",
              }}
            >
              r
            </kbd>
            {" or "}
            <kbd
              style={{
                padding: "2px 6px",
                backgroundColor: "#eee",
                borderRadius: "3px",
              }}
            >
              R
            </kbd>
            {" - Reset to 0"}
          </li>
          <li>
            <kbd
              style={{
                padding: "2px 6px",
                backgroundColor: "#eee",
                borderRadius: "3px",
              }}
            >
              Ctrl
            </kbd>
            {" + "}
            <kbd
              style={{
                padding: "2px 6px",
                backgroundColor: "#eee",
                borderRadius: "3px",
              }}
            >
              ↑
            </kbd>
            {" - Increment by 10"}
          </li>
          <li>
            <kbd
              style={{
                padding: "2px 6px",
                backgroundColor: "#eee",
                borderRadius: "3px",
              }}
            >
              Ctrl
            </kbd>
            {" + "}
            <kbd
              style={{
                padding: "2px 6px",
                backgroundColor: "#eee",
                borderRadius: "3px",
              }}
            >
              ↓
            </kbd>
            {" - Decrement by 10"}
          </li>
        </ul>

        <p>
          <strong>Try:</strong>
        </p>
        <ul>
          <li>Click buttons to change count</li>
          <li>Press + or = to increment</li>
          <li>Press - to decrement</li>
          <li>Press r to reset</li>
          <li>Press Ctrl + Arrow keys for +/-10</li>
        </ul>
      </div>
    </div>
  );
}

export default InteractiveCounterSolution;
