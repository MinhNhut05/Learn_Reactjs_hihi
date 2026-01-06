/**
 * Exercise 3: useCallback
 * Difficulty: Hard
 *
 * LEARNING GOALS:
 * - Hieu useCallback syntax: useCallback(fn, deps)
 * - Combine useCallback voi React.memo
 * - Hieu dependencies array
 * - Biet khi nao CAN va KHONG CAN dung useCallback
 *
 * HUONG DAN: Dien vao cac cho ??? de hoan thanh code
 * Moi cho co hint (<-) de huong dan
 */

import { useState, useCallback, memo } from "react";

// ========================================
// CHILD COMPONENTS (Memoized)
// ========================================

interface ButtonProps {
  onClick: () => void;
  label: string;
}

// TODO 1: Wrap component voi React.memo de memoize
// Hint: memo(function Component(...) { ... })
const ActionButton = memo(function ActionButton({
  onClick,
  label,
}: ButtonProps) {
  // <- memo
  // Log de thay khi nao component re-render
  console.log(`[ActionButton] "${label}" rendered`);

  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.75rem 1.5rem",
        margin: "0.25rem",
        border: "2px solid #9C27B0",
        borderRadius: "8px",
        background: "white",
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      {label}
    </button>
  );
});

interface DisplayProps {
  value: number;
  title: string;
}

// Da memoized san
const ValueDisplay = memo(function ValueDisplay({
  value,
  title,
}: DisplayProps) {
  console.log(`[ValueDisplay] "${title}" rendered`);

  return (
    <div
      style={{
        padding: "1rem",
        border: "2px solid #4CAF50",
        borderRadius: "8px",
        textAlign: "center",
        minWidth: "120px",
      }}
    >
      <h4 style={{ margin: "0 0 0.5rem 0" }}>{title}</h4>
      <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>{value}</p>
    </div>
  );
});

// ========================================
// MAIN COMPONENT
// ========================================

export default function UseCallbackExercise() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(2);
  const [otherState, setOtherState] = useState(0);

  // TODO 2: Memoize increment function voi useCallback
  // Hint: useCallback(() => { ... }, [])
  // Luu y: Dung functional update de khong can count trong deps
  const handleIncrement = useCallback(() => {
    // <- useCallback
    setCount((c) => c + 1);
  }, []); // <- [] - khong can dependencies vi dung functional update

  // TODO 3: Memoize decrement function
  // Hint: tuong tu increment
  const handleDecrement = useCallback(() => {
    // <- useCallback
    setCount((c) => c - 1);
  }, []); // <- []

  // TODO 4: Memoize reset function
  const handleReset = useCallback(() => {
    // <- useCallback
    setCount(0);
  }, []); // <- []

  // TODO 5: Memoize function co dependency
  // Hint: useCallback(() => { ... }, [multiplier])
  // Function nay phu thuoc vao multiplier
  const handleMultiply = useCallback(() => {
    // <- useCallback
    setCount((c) => c * multiplier);
  }, [multiplier]); // <- [multiplier] - can dependency vi dung multiplier

  // KHONG memoize - de demo su khac biet
  // Moi lan parent re-render, function nay tao moi -> child re-render
  const handleDouble = () => {
    setCount((c) => c * 2);
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="exercise-container">
      <h2>Exercise 3: useCallback</h2>

      <p style={{ color: "#666", marginBottom: "1rem" }}>
        Mo DevTools Console (F12) de xem render logs
      </p>

      {/* Display Section */}
      <section
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <ValueDisplay value={count} title="Count" />
        <ValueDisplay value={count * multiplier} title={`x${multiplier}`} />
      </section>

      {/* Control Section */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
        }}
      >
        <h3>Controls (Memoized Callbacks)</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* TODO 6: Pass memoized callbacks to ActionButton */}
          <ActionButton onClick={handleDecrement} label="-1" />{" "}
          {/* <- handleDecrement */}
          <ActionButton onClick={handleIncrement} label="+1" />{" "}
          {/* <- handleIncrement */}
          <ActionButton onClick={handleReset} label="Reset" />{" "}
          {/* <- handleReset */}
          <ActionButton
            onClick={handleMultiply}
            label={`x${multiplier}`}
          />{" "}
          {/* <- handleMultiply */}
        </div>
        <p
          style={{
            color: "#666",
            fontSize: "0.9rem",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          Cac button tren dung useCallback - chi re-render khi callback thay doi
        </p>
      </section>

      {/* Non-memoized Section */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #f44336",
        }}
      >
        <h3>Non-Memoized Callback (Demo)</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ActionButton onClick={handleDouble} label="x2 (no memo)" />
        </div>
        <p
          style={{
            color: "#f44336",
            fontSize: "0.9rem",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          Button nay re-render MOI LAN parent re-render vi callback khong
          memoized
        </p>
      </section>

      {/* Multiplier Control */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #2196F3",
        }}
      >
        <h3>Multiplier Control</h3>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>Multiplier:</span>
          <button onClick={() => setMultiplier((m) => Math.max(1, m - 1))}>
            -
          </button>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              minWidth: "40px",
              textAlign: "center",
            }}
          >
            {multiplier}
          </span>
          <button onClick={() => setMultiplier((m) => m + 1)}>+</button>
        </div>
        <p
          style={{
            color: "#666",
            fontSize: "0.9rem",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          Thay doi multiplier se khien handleMultiply callback thay doi
          (re-create)
        </p>
      </section>

      {/* Trigger Re-render Button */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #FF9800",
        }}
      >
        <h3>Force Re-render Test</h3>
        <button
          onClick={() => setOtherState((s) => s + 1)}
          style={{
            padding: "1rem 2rem",
            background: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Trigger Re-render ({otherState})
        </button>
        <p
          style={{
            color: "#666",
            fontSize: "0.9rem",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          Click de trigger parent re-render va xem console log nao xuat hien
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
            <strong>React.memo:</strong>{" "}
            <code>memo(function Component() {"{ ... }"})</code>
          </li>
          <li>
            <strong>useCallback syntax:</strong>{" "}
            <code>useCallback(() {"{ ... }"}, [deps])</code>
          </li>
          <li>
            <strong>Empty deps []:</strong> Function khong bao gio thay doi
          </li>
          <li>
            <strong>Voi deps [x]:</strong> Function thay doi khi x thay doi
          </li>
          <li>
            <strong>Functional update:</strong>{" "}
            <code>setCount(c =&gt; c + 1)</code> - khong can count trong deps
          </li>
          <li>
            <strong>Kiem tra:</strong> Mo Console, click button va xem log nao
            xuat hien
          </li>
        </ul>

        <h4 style={{ marginTop: "1rem" }}>Expected Behavior:</h4>
        <ul>
          <li>
            Click "+1" / "-1" / "Reset" / "x{multiplier}" - CHI ActionButton
            tuong ung render
          </li>
          <li>
            Click "x2 (no memo)" - Button nay LUON re-render khi parent
            re-render
          </li>
          <li>
            Click "Trigger Re-render" - CHI button "x2 (no memo)" re-render
          </li>
          <li>Thay doi multiplier - Button "x{multiplier}" se re-render</li>
        </ul>
      </section>
    </div>
  );
}
