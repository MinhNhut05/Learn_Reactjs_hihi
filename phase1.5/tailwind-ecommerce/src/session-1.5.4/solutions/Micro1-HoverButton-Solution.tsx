/**
 * MICRO EXERCISE 1: Hover Button - SOLUTION
 * Session 1.5.4 - States & Interactivity
 */

export default function Micro1HoverButtonSolution() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">
        Micro 1: Hover Button - Solution
      </h2>

      <div className="space-y-6">
        {/* Basic Solution */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Basic Solution:</p>
          <button
            className="
              bg-blue-500 text-white
              px-6 py-3 rounded-lg font-medium
              hover:bg-blue-600
              active:scale-95
              transition-all duration-200
            "
          >
            Hover Me (Basic)
          </button>
        </div>

        {/* With Shadow Bonus */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">With Shadow (Bonus):</p>
          <button
            className="
              bg-blue-500 text-white
              px-6 py-3 rounded-lg font-medium
              hover:bg-blue-600
              hover:shadow-lg
              hover:-translate-y-0.5
              active:scale-95
              active:shadow-md
              transition-all duration-200
            "
          >
            Hover Me (With Shadow)
          </button>
        </div>

        {/* Full Featured */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Full Featured:</p>
          <button
            className="
              bg-blue-500 text-white
              px-6 py-3 rounded-lg font-medium
              hover:bg-blue-600
              hover:shadow-lg
              hover:-translate-y-0.5
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              active:scale-95
              active:bg-blue-700
              transition-all duration-200
            "
          >
            Hover Me (Full)
          </button>
        </div>
      </div>

      {/* Explanation */}
      <div className="max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Classes Breakdown:</h3>
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">hover:bg-blue-600</code>
            <span className="text-gray-600">- Màu đậm hơn khi hover</span>
          </div>
          <div className="flex gap-2">
            <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">active:scale-95</code>
            <span className="text-gray-600">- Thu nhỏ 5% khi click</span>
          </div>
          <div className="flex gap-2">
            <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">transition-all duration-200</code>
            <span className="text-gray-600">- Smooth 200ms transition</span>
          </div>
          <div className="flex gap-2">
            <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">hover:shadow-lg</code>
            <span className="text-gray-600">- Shadow khi hover (bonus)</span>
          </div>
          <div className="flex gap-2">
            <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">hover:-translate-y-0.5</code>
            <span className="text-gray-600">- Nâng lên 2px (bonus)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
