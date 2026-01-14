/**
 * MICRO EXERCISE 1: Hover Button
 * Session 1.5.4 - States & Interactivity
 *
 * MỤC TIÊU: Tạo button với hover và active states
 *
 * YÊU CẦU:
 * 1. Background đổi màu khi hover (từ blue-500 → blue-600)
 * 2. Button thu nhỏ khi click (active:scale-95)
 * 3. Thêm transition để smooth
 * 4. BONUS: Thêm shadow khi hover
 *
 * THỜI GIAN: 5 phút
 *
 * HINTS:
 * - hover:bg-{color}
 * - active:scale-{value}
 * - transition / transition-all
 * - hover:shadow-{size}
 */

export default function Micro1HoverButton() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">
        Micro 1: Hover Button
      </h2>

      <div className="space-y-4">
        <p className="text-gray-600">
          Thêm hover và active states cho button bên dưới:
        </p>

        {/* TODO: Thêm các classes sau:
            - hover:bg-blue-600 (đổi màu khi hover)
            - active:scale-95 (thu nhỏ khi click)
            - transition (smooth animation)
            - hover:shadow-md (BONUS: thêm shadow)
        */}
        <button
          className=" hover:bg-blue-600 active:scale-95 transition-all duration-200 hover:shadow-md               hover:-translate-y-0.5
            bg-blue-500 text-white
            px-6 py-3 rounded-lg font-medium
          "
        >
          Hover Me
        </button>
      </div>

      {/* Mục tiêu */}
      <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-2">Expected Behavior:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✓ Background đổi màu khi di chuột vào</li>
          <li>✓ Button thu nhỏ một chút khi click</li>
          <li>✓ Transition mượt mà giữa các states</li>
          <li>✓ (Bonus) Shadow xuất hiện khi hover</li>
        </ul>
      </div>
    </div>
  );
}
