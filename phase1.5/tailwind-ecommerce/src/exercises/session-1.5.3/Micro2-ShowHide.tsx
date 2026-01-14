/**
 * Micro Exercise 2: Show/Hide Pattern (5 phút)
 *
 * MỤC TIÊU:
 * Tạo 2 buttons với visibility khác nhau:
 * - Button 1: Chỉ hiện trên MOBILE (< 768px)
 * - Button 2: Chỉ hiện trên DESKTOP (≥ 768px)
 *
 * HƯỚNG DẪN:
 * 1. Sử dụng "hidden" class để ẩn
 * 2. Sử dụng "block" hoặc "flex" để hiện
 * 3. Kết hợp với breakpoint prefix
 *
 * PATTERN:
 * - Hide mobile, show desktop: "hidden md:block"
 * - Show mobile, hide desktop: "block md:hidden"
 */

export default function Micro2ShowHide() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Micro 2: Show/Hide Pattern
        </h1>

        {/* Example: Navigation patterns */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Navigation Example</h2>

          <nav className="flex items-center justify-between border p-4 rounded">
            <span className="font-bold text-blue-600">Logo</span>

            {/* TODO: Mobile hamburger button - chỉ hiện trên mobile */}
            <button className="block md:hidden p-2 border rounded">
              {/* Thêm classes để ẩn trên md+ */}☰ Menu
            </button>

            {/* TODO: Desktop navigation - chỉ hiện từ md trở lên */}
            <div className="hidden md:flex gap-4">
              {/* Thêm classes để ẩn trên mobile, hiện từ md */}
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Products
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Contact
              </a>
            </div>
          </nav>
        </div>

        {/* TODO: Two buttons với opposite visibility */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Button Visibility</h2>

          <div className="space-y-4">
            {/* TODO: Button này chỉ hiện trên MOBILE */}
            <button className="block md:hidden w-full py-3 bg-green-500 text-white rounded-lg font-semibold">
              {/* Thêm: block md:hidden */}
              📱 Mobile Button (&lt; 768px)
            </button>

            {/* TODO: Button này chỉ hiện trên DESKTOP */}
            <button className="hidden md:block w-full py-3 bg-blue-500 text-white rounded-lg font-semibold">
              {/* Thêm: hidden md:block */}
              🖥️ Desktop Button (≥ 768px)
            </button>
          </div>
        </div>

        {/* BONUS: Different content for different screens */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Content Switching</h2>

          {/* TODO: Show compact version on mobile */}
          <div className="block md:hidden border p-4 rounded">
            {/* Thêm: block md:hidden */}
            <p className="text-center">📱 Compact mobile view</p>
          </div>

          {/* TODO: Show full version on desktop */}
          <div className=" hidden md:block border p-4 rounded">
            {/* Thêm: hidden md:block */}
            <p>
              🖥️ This is the full desktop version with more details and
              information that we don't want to show on smaller mobile screens.
            </p>
          </div>
        </div>

        {/* Current breakpoint indicator */}
        <div className="fixed bottom-4 right-4 bg-black text-white px-3 py-1 rounded text-sm">
          <span className="md:hidden">Mobile (&lt; 768px)</span>
          <span className="hidden md:inline">Desktop (≥ 768px)</span>
        </div>
      </div>
    </div>
  );
}

/**
 * PATTERN REFERENCE:
 *
 * 1. Hide on mobile, show on desktop:
 *    className="hidden md:block"
 *
 * 2. Show on mobile, hide on desktop:
 *    className="block md:hidden"
 *
 * 3. Hide on mobile, show as flex on desktop:
 *    className="hidden md:flex"
 *
 * 4. Different display types:
 *    - hidden md:block   → display: block on md+
 *    - hidden md:flex    → display: flex on md+
 *    - hidden md:inline  → display: inline on md+
 *    - hidden md:grid    → display: grid on md+
 */
