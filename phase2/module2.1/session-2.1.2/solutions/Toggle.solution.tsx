/**
 * MINI EXERCISE SOLUTION: Toggle với Render Props
 * ================================================
 *
 * ĐÂY LÀ SOLUTION ĐẦY ĐỦ
 * Bạn nên thử tự làm trước khi xem solution này!
 */

import { ReactNode, useState, useCallback } from "react";

// ============================================
// BƯỚC 1: ĐỊNH NGHĨA TYPES
// ============================================

/**
 * ToggleState: Data và methods mà children nhận được
 *
 * GIẢI THÍCH:
 * - on: Trạng thái hiện tại (boolean)
 * - toggle: Function đảo trạng thái
 * - setOn: Function set trạng thái cụ thể
 */
interface ToggleState {
  on: boolean;
  toggle: () => void;
  setOn: (value: boolean) => void;
}

/**
 * ToggleProps: Props của Toggle component
 *
 * GIẢI THÍCH:
 * - children: Render prop function
 * - defaultOn: Giá trị mặc định (uncontrolled mode)
 * - on: Giá trị controlled từ bên ngoài
 * - onChange: Callback khi state thay đổi
 *
 * CONTROLLED VS UNCONTROLLED:
 * - Uncontrolled: Toggle tự quản lý state (dùng defaultOn)
 * - Controlled: Parent quản lý state (dùng on + onChange)
 */
interface ToggleProps {
  children: (state: ToggleState) => ReactNode;
  defaultOn?: boolean;
  on?: boolean;
  onChange?: (value: boolean) => void;
}

// ============================================
// BƯỚC 2: IMPLEMENT TOGGLE COMPONENT
// ============================================

export function Toggle({
  children,
  defaultOn = false,
  on: controlledOn,
  onChange,
}: ToggleProps) {
  // ============================================
  // INTERNAL STATE (cho uncontrolled mode)
  // ============================================
  const [internalOn, setInternalOn] = useState(defaultOn);

  // ============================================
  // DETERMINE: CONTROLLED VS UNCONTROLLED
  // ============================================
  /**
   * isControlled: Check xem có on prop không
   * - Nếu có on prop: Controlled mode (parent quản lý)
   * - Nếu không có: Uncontrolled mode (Toggle tự quản lý)
   */
  const isControlled = controlledOn !== undefined;

  /**
   * on: Giá trị thực tế sử dụng
   * - Controlled: Dùng controlledOn từ props
   * - Uncontrolled: Dùng internalOn từ state
   */
  const on = isControlled ? controlledOn : internalOn;

  // ============================================
  // CALLBACKS
  // ============================================

  /**
   * setOn: Set trạng thái cụ thể
   *
   * FLOW:
   * 1. Gọi onChange callback nếu có (cho cả 2 modes)
   * 2. Nếu uncontrolled: Update internal state
   */
  const setOn = useCallback(
    (value: boolean) => {
      // Luôn gọi onChange nếu có
      onChange?.(value);

      // Chỉ update internal state nếu uncontrolled
      if (!isControlled) {
        setInternalOn(value);
      }
    },
    [isControlled, onChange]
  );

  /**
   * toggle: Đảo trạng thái
   *
   * Gọi setOn với giá trị ngược lại
   */
  const toggle = useCallback(() => {
    setOn(!on);
  }, [on, setOn]);

  // ============================================
  // RENDER: GỌI children NHƯ FUNCTION
  // ============================================

  /**
   * Truyền state object vào children function
   * Children sẽ quyết định render gì với state này
   */
  const state: ToggleState = {
    on,
    toggle,
    setOn,
  };

  return <>{children(state)}</>;
}

// ============================================
// BƯỚC 3: DEMO COMPONENTS
// ============================================

/**
 * Demo 1: Basic Uncontrolled Usage
 */
export function ToggleBasicDemo() {
  return (
    <div style={{ padding: "16px" }}>
      <h3>Basic Toggle (Uncontrolled)</h3>

      <Toggle>
        {({ on, toggle, setOn }) => (
          <div
            style={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <p>
              Toggle is: <strong>{on ? "ON" : "OFF"}</strong>
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={toggle}>Toggle</button>
              <button onClick={() => setOn(true)}>Turn On</button>
              <button onClick={() => setOn(false)}>Turn Off</button>
            </div>
          </div>
        )}
      </Toggle>
    </div>
  );
}

/**
 * Demo 2: Với defaultOn
 */
export function ToggleWithDefaultDemo() {
  return (
    <div style={{ padding: "16px" }}>
      <h3>Toggle with defaultOn=true</h3>

      <Toggle defaultOn={true}>
        {({ on, toggle }) => (
          <div
            style={{
              padding: "16px",
              backgroundColor: on ? "#d4edda" : "#f8d7da",
              borderRadius: "8px",
            }}
          >
            <p>Feature is {on ? "ENABLED" : "DISABLED"}</p>
            <button onClick={toggle}>{on ? "Disable" : "Enable"}</button>
          </div>
        )}
      </Toggle>
    </div>
  );
}

/**
 * Demo 3: Controlled Mode
 */
export function ToggleControlledDemo() {
  // Parent controls the state
  const [isOn, setIsOn] = useState(false);

  return (
    <div style={{ padding: "16px" }}>
      <h3>Controlled Toggle</h3>

      <p>Parent state: {isOn ? "ON" : "OFF"}</p>

      <Toggle on={isOn} onChange={setIsOn}>
        {({ on, toggle }) => (
          <div
            style={{
              padding: "16px",
              border: "2px solid",
              borderColor: on ? "green" : "red",
              borderRadius: "8px",
            }}
          >
            <p>Child sees: {on ? "ON" : "OFF"}</p>
            <button onClick={toggle}>Toggle from Child</button>
          </div>
        )}
      </Toggle>

      <button onClick={() => setIsOn(!isOn)} style={{ marginTop: "8px" }}>
        Toggle from Parent
      </button>
    </div>
  );
}

/**
 * Demo 4: Multiple Toggles với khác UI
 *
 * ĐÂY LÀ SỨC MẠNH CỦA RENDER PROPS:
 * - Cùng 1 Toggle component
 * - Nhưng render hoàn toàn khác nhau!
 */
export function ToggleMultipleDemo() {
  return (
    <div style={{ padding: "16px" }}>
      <h3>Multiple Toggles, Different UI</h3>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {/* Toggle 1: Switch style */}
        <Toggle>
          {({ on, toggle }) => (
            <div
              onClick={toggle}
              style={{
                width: "60px",
                height: "30px",
                backgroundColor: on ? "#4CAF50" : "#ccc",
                borderRadius: "15px",
                position: "relative",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "2px",
                  left: on ? "32px" : "2px",
                  transition: "left 0.3s",
                }}
              />
            </div>
          )}
        </Toggle>

        {/* Toggle 2: Checkbox style */}
        <Toggle>
          {({ on, toggle }) => (
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input type="checkbox" checked={on} onChange={toggle} />
              <span>{on ? "Checked" : "Unchecked"}</span>
            </label>
          )}
        </Toggle>

        {/* Toggle 3: Button style */}
        <Toggle>
          {({ on, toggle }) => (
            <button
              onClick={toggle}
              style={{
                padding: "8px 16px",
                backgroundColor: on ? "#2196F3" : "#9E9E9E",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {on ? "Active" : "Inactive"}
            </button>
          )}
        </Toggle>
      </div>
    </div>
  );
}

/**
 * Full Demo Component
 */
export function ToggleDemo() {
  return (
    <div>
      <h2>Toggle Render Props Demo</h2>
      <ToggleBasicDemo />
      <ToggleWithDefaultDemo />
      <ToggleControlledDemo />
      <ToggleMultipleDemo />
    </div>
  );
}

export default Toggle;
