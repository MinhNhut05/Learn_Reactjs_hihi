/**
 * Exercise 3: useCallback - SOLUTION
 *
 * LEARNING GOALS (Da hoan thanh):
 * ✅ Hieu useCallback syntax: useCallback(fn, deps)
 * ✅ Combine useCallback voi React.memo
 * ✅ Hieu dependencies array
 * ✅ Biet khi nao CAN va KHONG CAN dung useCallback
 */

import { useState, useCallback, memo } from "react";

// ========================================
// CHILD COMPONENTS (Memoized)
// ========================================

interface ButtonProps {
  onClick: () => void;
  label: string;
}

/**
 * SOLUTION 1: Wrap component voi React.memo de memoize
 *
 * memo(function Component(...) { ... })
 * - React.memo la HOC (Higher Order Component)
 * - Memoize component - chi re-render khi props thay doi
 * - Ket hop voi useCallback de toi uu hieu nang
 */
const ActionButton = memo(function ActionButton({
  onClick,
  label,
}: ButtonProps) {
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

export default function UseCallbackSolution() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(3);
  const [otherState, setOtherState] = useState(0);

  /**
   * SOLUTION 2: Memoize increment function voi useCallback
   *
   * useCallback(() => { setCount(c => c + 1) }, [])
   * - useCallback(fn, deps) - memoize function
   * - Function chi duoc tao lai khi dependencies thay doi
   * - [] = empty deps = function khong bao gio thay doi
   *
   * TAI SAO KHONG CAN count TRONG DEPS?
   * - setCount(c => c + 1) dung functional update
   * - c la gia tri hien tai, khong phai closure
   * - Nen khong can count trong dependencies
   */
  const handleIncrement = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  /**
   * SOLUTION 3: Memoize decrement function
   * Tuong tu increment - dung functional update
   */
  const handleDecrement = useCallback(() => {
    setCount((c) => c - 1);
  }, []);

  /**
   * SOLUTION 4: Memoize reset function
   * setCount(0) khong can current value nen khong can deps
   */
  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  /**
   * SOLUTION 5: Memoize function co dependency
   *
   * useCallback(() => { setCount(c => c * multiplier) }, [multiplier])
   * - Function su dung multiplier (closure)
   * - Khi multiplier thay doi, function PHAI duoc tao lai
   * - Neu khong, function se dung gia tri multiplier cu (stale closure)
   *
   * LUU Y: setCount(c => c * multiplier) van can multiplier trong deps
   * vi multiplier la bien ben ngoai, khong phai tham so cua callback
   */
  const handleMultiply = useCallback(() => {
    setCount((c) => c * multiplier);
  }, [multiplier]);

  /**
   * KHONG memoize - de demo su khac biet
   *
   * Moi lan parent re-render:
   * - handleDouble duoc tao moi
   * - handleDouble !== handleDouble (reference thay doi)
   * - ActionButton nhan props moi
   * - Nen ActionButton re-render (du dung React.memo)
   */
  const handleDouble = () => {
    setCount((c) => c * 2);
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="exercise-container">
      <h2>Exercise 3: useCallback - SOLUTION</h2>

      <p style={{ color: "#4CAF50", marginBottom: "1rem" }}>
        ✅ Mo DevTools Console (F12) de xem render logs
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
          border: "1px solid #4CAF50",
        }}
      >
        <h3>Controls (Memoized Callbacks) ✅</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/**
           * SOLUTION 6: Pass memoized callbacks to ActionButton
           *
           * onClick={handleDecrement} - pass memoized function
           * Vi function khong thay doi, ActionButton khong re-render
           * khi parent re-render (tru khi count thay doi -> ValueDisplay re-render)
           */}
          <ActionButton onClick={handleDecrement} label="-1" />
          <ActionButton onClick={handleIncrement} label="+1" />
          <ActionButton onClick={handleReset} label="Reset" />
          <ActionButton onClick={handleMultiply} label={`x${multiplier}`} />
        </div>
        <p
          style={{
            color: "#4CAF50",
            fontSize: "0.9rem",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          ✅ Cac button tren dung useCallback - chi re-render khi callback thay
          doi
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
          ❌ Button nay re-render MOI LAN parent re-render vi callback khong
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
            color: "#2196F3",
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
            color: "#FF9800",
            fontSize: "0.9rem",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          Click de trigger parent re-render va xem console log nao xuat hien
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
            <strong>useCallback syntax:</strong>{" "}
            <code>useCallback(fn, deps)</code>
          </li>
          <li>
            <strong>React.memo:</strong> <code>memo(Component)</code> - memoize
            component
          </li>
          <li>
            <strong>Ket hop:</strong> useCallback + React.memo = toi uu hieu
            nang
          </li>
          <li>
            <strong>Dependencies:</strong>
            <ul>
              <li>[] = function khong bao gio thay doi</li>
              <li>[x] = function thay doi khi x thay doi</li>
            </ul>
          </li>
          <li>
            <strong>Functional update:</strong>{" "}
            <code>setCount(c =&gt; c + 1)</code> - khong can count trong deps
          </li>
          <li>
            <strong>Chi dung khi:</strong> Pass callback to memoized child
            component
          </li>
        </ol>

        <h4 style={{ marginTop: "1rem", color: "#f44336" }}>
          Khi NAO khong can useCallback:
        </h4>
        <ul>
          <li>Callback khong pass to child component</li>
          <li>Child component khong dung React.memo</li>
          {/* <li>Inline handlers don gian (e.g., onClick={() =&gt; setValue(x)})</li> */}
        </ul>
      </section>
    </div>
  );
}
