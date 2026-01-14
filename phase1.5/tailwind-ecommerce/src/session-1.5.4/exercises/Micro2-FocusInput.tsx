/**
 * MICRO EXERCISE 2: Focus Input
 * Session 1.5.4 - States & Interactivity
 *
 * MỤC TIÊU: Tạo input với focus ring
 *
 * YÊU CẦU:
 * 1. Khi focus: hiển thị ring xanh (focus:ring-2 focus:ring-blue-500)
 * 2. Border trong suốt khi focus (focus:border-transparent)
 * 3. Xóa outline mặc định (outline-none)
 * 4. BONUS: Border đậm hơn khi hover
 *
 * THỜI GIAN: 5 phút
 *
 * HINTS:
 * - outline-none (xóa browser outline)
 * - focus:ring-2 (ring width)
 * - focus:ring-{color} (ring color)
 * - focus:border-transparent
 * - transition
 */

export default function Micro2FocusInput() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">Micro 2: Focus Input</h2>

      <div className="space-y-4 max-w-md">
        <p className="text-gray-600">Thêm focus states cho input bên dưới:</p>

        {/* TODO: Thêm các classes sau:
            - outline-none (xóa browser default outline)
            - focus:ring-2 (ring width)
            - focus:ring-blue-500 (ring color)
            - focus:border-transparent (ẩn border khi focus)
            - transition (smooth)
            - hover:border-gray-400 (BONUS)
        */}
        <input
          type="text"
          placeholder="Click here to focus..."
          className=" outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200
            w-full px-4 py-3
            border border-gray-300 rounded-lg
          "
        />

        {/* Input thứ 2 để test tab navigation */}
        <input
          type="email"
          placeholder="Or tab here..."
          className="
            w-full px-4 py-3
            border border-gray-300 rounded-lg
            outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              focus:border-blue-500
              transition-all duration-200
          "
        />
      </div>

      {/* Mục tiêu */}
      <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200 max-w-md">
        <h3 className="font-semibold text-gray-700 mb-2">Expected Behavior:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✓ Ring xanh xuất hiện khi focus</li>
          <li>✓ Border ẩn đi khi focus (thay bằng ring)</li>
          <li>✓ Không có outline mặc định của browser</li>
          <li>✓ Có thể dùng Tab để di chuyển giữa inputs</li>
          <li>✓ (Bonus) Border đậm hơn khi hover</li>
        </ul>
      </div>

      {/* Tip */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-md">
        <h3 className="font-semibold text-blue-700 mb-1">
          💡 Accessibility Tip:
        </h3>
        <p className="text-sm text-blue-600">
          Luôn có visible focus indicator cho keyboard users! Ring pattern là
          cách tốt nhất để thay thế browser outline.
        </p>
      </div>
    </div>
  );
}
