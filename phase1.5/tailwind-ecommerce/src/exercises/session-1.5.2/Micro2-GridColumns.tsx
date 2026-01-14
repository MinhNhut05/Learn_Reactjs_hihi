/**
 * MICRO EXERCISE 2: Grid Columns (5 phút)
 *
 * CHỈ CẦN THÊM TAILWIND CLASSES VÀO className=""
 */

export default function Micro2GridColumns() {
  return (
    // Wrapper: p-8
    <div className="p-8">
      {/* Title: text-2xl font-bold mb-6 */}
      <h2 className="text-2xl font-bold mb-6">Grid Columns Demo</h2>

      {/* Grid container: grid grid-cols-3 gap-4 */}
      <div className="grid grid-cols-3 gap-4">
        {/* Column 1: bg-red-500 p-8 text-white text-center rounded-lg font-semibold */}
        <div className="bg-red-500 p-8 text-white text-center rounded-lg font-semibold">
          Column 1
        </div>

        {/* Column 2: bg-green-500 p-8 text-white text-center rounded-lg font-semibold */}
        <div className="bg-green-500 p-8 text-white text-center rounded-lg font-semibold">
          Column 2
        </div>

        {/* Column 3: bg-blue-500 p-8 text-white text-center rounded-lg font-semibold */}
        <div className="bg-blue-500 p-8 text-white text-center rounded-lg font-semibold">
          Column 3
        </div>
      </div>
    </div>
  );
}
