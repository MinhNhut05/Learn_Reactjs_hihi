/**
 * MINI EXERCISE: Toggle với Render Props
 * ======================================
 *
 * YÊU CẦU:
 * 1. Tạo Toggle component sử dụng Render Props pattern
 * 2. Cung cấp: on (boolean), toggle (function), setOn (function)
 * 3. Type đầy đủ với TypeScript
 * 4. BONUS: Controlled mode (on prop từ bên ngoài)
 *
 * CÁCH SỬ DỤNG MONG MUỐN:
 *
 * <Toggle>
 *   {({ on, toggle, setOn }) => (
 *     <div>
 *       <p>Toggle is: {on ? "ON" : "OFF"}</p>
 *       <button onClick={toggle}>Toggle</button>
 *       <button onClick={() => setOn(true)}>Turn On</button>
 *       <button onClick={() => setOn(false)}>Turn Off</button>
 *     </div>
 *   )}
 * </Toggle>
 *
 * CONTROLLED MODE:
 *
 * const [isOn, setIsOn] = useState(false);
 *
 * <Toggle on={isOn} onChange={setIsOn}>
 *   {({ on, toggle }) => (...)}
 * </Toggle>
 */

import { ReactNode, useCallback, useState } from "react";

// ============================================
// BƯỚC 1: ĐỊNH NGHĨA TYPES
// ============================================

/**
 * TODO: Định nghĩa ToggleState
 *
 * HINTS:
 * - on: boolean - trạng thái hiện tại
 * - toggle: () => void - đảo trạng thái
 * - setOn: (value: boolean) => void - set trạng thái cụ thể
 */
interface ToggleState {
  on: Boolean;
  toggle: () => void;
  setOn: (value: boolean) => void;
  // TODO: Thêm properties ở đây
}

/**
 * TODO: Định nghĩa ToggleProps
 *
 * HINTS:
 * - children: function nhận ToggleState, return ReactNode
 * - BONUS: on?: boolean (controlled mode)
 * - BONUS: onChange?: (value: boolean) => void (callback khi thay đổi)
 * - BONUS: defaultOn?: boolean (giá trị mặc định)
 */
interface ToggleProps {
  // TODO: Thêm properties ở đây
  children: (state: ToggleState) => ReactNode;
  on?: boolean;
  onChange?: (value: boolean) => void;
  defaultOn?: boolean;
}

// ============================================
// BƯỚC 2: IMPLEMENT TOGGLE COMPONENT
// ============================================

/**
 * TODO: Implement Toggle component
 *
 * HINTS:
 * - Sử dụng useState để quản lý on state
 * - Tạo toggle function để đảo state
 * - Tạo setOn function để set state cụ thể
 * - GỌI children như function, truyền ToggleState vào
 *
 * BONUS (Controlled Mode):
 * - Check xem có on prop không
 * - Nếu có: dùng on prop thay vì internal state
 * - Nếu có onChange: gọi onChange khi thay đổi
 */
export function Toggle({
  children,
  defaultOn = false,
  on: controlledOn,
  onChange,
}: ToggleProps) {
  // TODO: Implement ở đây
  const [internalOn, setInternalOn] = useState(defaultOn);
  const isControlled = controlledOn !== undefined;
  const on = isControlled ? controlledOn : internalOn;

  const setOn = useCallback(
    (value: boolean) => {
      onChange?.(value);
      if (!isControlled) {
        setInternalOn(value);
      }
    },
    [isControlled, onChange],
  );
  const toggle = useCallback(() => {
    setOn(!on);
  }, [on, setOn]);

  return children({ on, toggle, setOn });
}

// ============================================
// BƯỚC 3: TEST COMPONENT
// ============================================

/**
 * Component để test Toggle
 *
 * Uncomment sau khi implement Toggle
 */
export function ToggleDemo() {
  return (
    <div>
      <h2>Toggle Demo</h2>
      {/* Basic Usage */}
      TODO: Uncomment sau khi implement
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

export default Toggle;
