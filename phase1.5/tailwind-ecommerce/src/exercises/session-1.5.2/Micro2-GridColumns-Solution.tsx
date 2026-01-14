/**
 * MICRO EXERCISE 2: Grid Columns - SOLUTION
 */

export default function Micro2GridColumnsSolution() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Grid Columns Demo</h2>

      {/* Grid container: 3 equal columns with gap */}
      <div className="grid grid-cols-3 gap-4">
        {/* Column 1 - Red */}
        <div className="bg-red-500 p-8 text-white text-center rounded-lg font-semibold">
          Column 1
        </div>

        {/* Column 2 - Green */}
        <div className="bg-green-500 p-8 text-white text-center rounded-lg font-semibold">
          Column 2
        </div>

        {/* Column 3 - Blue */}
        <div className="bg-blue-500 p-8 text-white text-center rounded-lg font-semibold">
          Column 3
        </div>
      </div>

      {/* Bonus: More columns demo */}
      <h3 className="text-xl font-bold mt-8 mb-4">
        Bonus: 4 Columns with different gaps
      </h3>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-purple-500 p-6 text-white text-center rounded-lg">
          1
        </div>
        <div className="bg-pink-500 p-6 text-white text-center rounded-lg">
          2
        </div>
        <div className="bg-indigo-500 p-6 text-white text-center rounded-lg">
          3
        </div>
        <div className="bg-cyan-500 p-6 text-white text-center rounded-lg">
          4
        </div>
      </div>

      {/* Bonus: Grid with span */}
      <h3 className="text-xl font-bold mt-8 mb-4">Bonus: Column Span</h3>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 bg-orange-500 p-6 text-white text-center rounded-lg">
          Spans 2 columns
        </div>
        <div className=" col-span-2 bg-teal-500 p-6 text-white text-center rounded-lg">
          3
        </div>
        <div className="bg-amber-500 p-6 text-white text-center rounded-lg">
          4
        </div>
      </div>
    </div>
  );
}

/**
 * GIẢI THÍCH CHI TIẾT:
 *
 * === GRID CONTAINER ===
 * - grid: display: grid - tạo grid container
 * - grid-cols-3: grid-template-columns: repeat(3, minmax(0, 1fr))
 *   -> 3 cột đều nhau, mỗi cột chiếm 1 phần (1fr)
 * - gap-4: gap: 1rem - khoảng cách đều giữa rows và columns
 *
 * === GRID ITEMS ===
 * - Mặc định mỗi item chiếm 1 cell
 * - col-span-2: item chiếm 2 columns
 * - col-span-full: item chiếm toàn bộ row
 *
 * === BOX STYLING ===
 * - bg-{color}-500: Background color
 * - p-8: padding: 2rem (32px)
 * - text-white: màu chữ trắng
 * - text-center: căn giữa text
 * - rounded-lg: border-radius: 0.5rem (8px)
 * - font-semibold: font-weight: 600
 *
 * === KEY POINTS ===
 * 1. PHẢI có "grid" class trước khi dùng grid-cols-*
 * 2. gap-* chỉ hoạt động với grid hoặc flex
 * 3. grid-cols-{n} tạo n cột đều nhau (equal width)
 *
 * === COMMON GRID PATTERNS ===
 *
 * // 12-column system (like Bootstrap)
 * <div className="grid grid-cols-12 gap-4">
 *   <div className="col-span-4">Sidebar</div>
 *   <div className="col-span-8">Content</div>
 * </div>
 *
 * // Auto-fit responsive grid
 * <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
 *
 * // Different gap for x and y
 * <div className="grid grid-cols-3 gap-x-4 gap-y-8">
 */
