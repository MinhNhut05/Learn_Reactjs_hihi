/**
 * Micro Exercise 1: Responsive Text - SOLUTION
 *
 * Demonstrates responsive typography using Tailwind breakpoints.
 */

export default function Micro1ResponsiveTextSolution() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Micro 1: Responsive Text - Solution
        </h1>

        {/* SOLUTION: Responsive heading */}
        {/* Mobile: text-xl, Tablet: text-2xl, Desktop: text-4xl */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-900">
            Welcome to Our Store
          </h2>
          <p className="mt-2 text-gray-600">
            Resize browser để xem text size thay đổi
          </p>
        </div>

        {/* SOLUTION: Responsive subtitle */}
        {/* Mobile: text-sm, Tablet: text-base, Desktop: text-lg */}
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm md:text-base lg:text-lg text-gray-600">
            This is a subtitle that should scale with screen size
          </p>
        </div>

        {/* SOLUTION: Responsive paragraph với line-height */}
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm md:text-base leading-relaxed md:leading-loose text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

        {/* Current breakpoint indicator */}
        <div className="fixed bottom-4 right-4 bg-black text-white px-3 py-1 rounded text-sm">
          <span className="sm:hidden">Mobile</span>
          <span className="hidden sm:inline md:hidden">SM (640px+)</span>
          <span className="hidden md:inline lg:hidden">MD (768px+)</span>
          <span className="hidden lg:inline xl:hidden">LG (1024px+)</span>
          <span className="hidden xl:inline">XL (1280px+)</span>
        </div>
      </div>
    </div>
  )
}

/**
 * KEY TAKEAWAYS:
 *
 * 1. Mobile-first approach:
 *    - Base class (no prefix) = mobile styles
 *    - Add breakpoint prefixes for larger screens
 *
 * 2. Pattern: "base md:medium lg:large"
 *    text-xl md:text-2xl lg:text-4xl
 *    ↑         ↑           ↑
 *    0px+      768px+      1024px+
 *
 * 3. Không cần dùng tất cả breakpoints
 *    - Thường chỉ cần 2-3 breakpoints
 *    - Thêm khi thực sự cần thiết
 *
 * 4. Line-height cũng có thể responsive:
 *    leading-relaxed md:leading-loose
 */
