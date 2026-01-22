/**
 * SESSION 2.1.2 - RENDER PROPS PATTERN
 * ====================================
 *
 * MouseTracker: Component chia sẻ vị trí chuột qua Render Props
 *
 * GIẢI THÍCH PATTERN:
 * - Component này QUẢN LÝ state (vị trí chuột)
 * - Nhưng KHÔNG QUYẾT ĐỊNH cách render
 * - Thay vào đó, nó GỌI children như function và truyền data
 * - Component sử dụng sẽ QUYẾT ĐỊNH cách render data đó
 */

import { useState, useEffect, ReactNode } from "react";

// ============================================
// BƯỚC 1: ĐỊNH NGHĨA TYPES
// ============================================

/**
 * Position: Vị trí chuột
 * - x: Tọa độ ngang (từ trái sang phải)
 * - y: Tọa độ dọc (từ trên xuống dưới)
 */
interface Position {
  x: number;
  y: number;
}

/**
 * MouseTrackerProps: Props của MouseTracker
 *
 * KEY INSIGHT: children không phải ReactNode thông thường!
 * - Thay vì children: ReactNode (như <div>Hello</div>)
 * - Nó là một FUNCTION: (position: Position) => ReactNode
 *
 * Điều này cho phép:
 * - MouseTracker truyền data (position) xuống
 * - Component cha quyết định render gì với data đó
 */
interface MouseTrackerProps {
  children: (position: Position) => ReactNode;
}

// ============================================
// BƯỚC 2: COMPONENT IMPLEMENTATION
// ============================================

export function MouseTracker({ children }: MouseTrackerProps) {
  // State quản lý vị trí chuột
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    // Handler cập nhật vị trí khi chuột di chuyển
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX, // Vị trí X của chuột trong viewport
        y: event.clientY, // Vị trí Y của chuột trong viewport
      });
    };

    // Đăng ký event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup: Gỡ bỏ event listener khi component unmount
    // QUAN TRỌNG: Tránh memory leak!
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty deps = chỉ chạy 1 lần khi mount

  // ============================================
  // KEY POINT: GỌI children NHƯ FUNCTION
  // ============================================
  // - children KHÔNG phải là JSX elements
  // - children LÀ một function
  // - Chúng ta GỌI nó và truyền position vào
  // - Function đó sẽ return ReactNode để render

  return <>{children(position)}</>;
}

// ============================================
// BƯỚC 3: CÁCH SỬ DỤNG
// ============================================

/**
 * VÍ DỤ SỬ DỤNG 1: Hiển thị text đơn giản
 *
 * <MouseTracker>
 *   {({ x, y }) => (
 *     <p>Mouse at: {x}, {y}</p>
 *   )}
 * </MouseTracker>
 *
 * GIẢI THÍCH FLOW:
 * 1. MouseTracker quản lý position state
 * 2. Khi mouse move, position cập nhật
 * 3. MouseTracker gọi children(position)
 * 4. Function ({ x, y }) => (...) được gọi với position mới
 * 5. Return <p>Mouse at: {x}, {y}</p>
 * 6. UI được re-render với vị trí mới
 */

/**
 * VÍ DỤ SỬ DỤNG 2: Vẽ element theo vị trí chuột
 *
 * <MouseTracker>
 *   {({ x, y }) => (
 *     <div
 *       style={{
 *         position: 'fixed',
 *         left: x,
 *         top: y,
 *         width: 20,
 *         height: 20,
 *         borderRadius: '50%',
 *         backgroundColor: 'red',
 *         transform: 'translate(-50%, -50%)',
 *       }}
 *     />
 *   )}
 * </MouseTracker>
 *
 * GIẢI THÍCH:
 * - Cùng 1 MouseTracker
 * - Nhưng render khác hoàn toàn
 * - Đây chính là sức mạnh của Render Props!
 */

// ============================================
// BONUS: VARIANT VỚI render PROP THAY VÌ children
// ============================================

interface MouseTrackerWithRenderPropProps {
  // Dùng "render" thay vì "children"
  // Cả hai cách đều hợp lệ, tùy preference
  render: (position: Position) => ReactNode;
}

export function MouseTrackerWithRenderProp({
  render,
}: MouseTrackerWithRenderPropProps) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Gọi render prop thay vì children
  return <>{render(position)}</>;
}

/**
 * USAGE VỚI render PROP:
 *
 * <MouseTrackerWithRenderProp
 *   render={({ x, y }) => (
 *     <p>Position: {x}, {y}</p>
 *   )}
 * />
 *
 * SO SÁNH:
 * - children: Cú pháp ngắn gọn hơn, tự nhiên hơn
 * - render prop: Explicit hơn, dễ hiểu với người mới
 */

export default MouseTracker;
