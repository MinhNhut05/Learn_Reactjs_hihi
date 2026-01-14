/**
 * MICRO EXERCISE 2: Focus Input - SOLUTION
 * Session 1.5.4 - States & Interactivity
 */

export default function Micro2FocusInputSolution() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">
        Micro 2: Focus Input - Solution
      </h2>

      <div className="space-y-6 max-w-md">
        {/* Basic Solution */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Basic Solution:</p>
          <input
            type="text"
            placeholder="Click here to focus..."
            className="
              w-full px-4 py-3
              border border-gray-300 rounded-lg
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              transition-all duration-200
            "
          />
        </div>

        {/* With Hover Bonus */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">With Hover (Bonus):</p>
          <input
            type="email"
            placeholder="Email with hover..."
            className="
              w-full px-4 py-3
              border border-gray-300 rounded-lg
              outline-none
              hover:border-gray-400
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              transition-all duration-200
            "
          />
        </div>

        {/* Full Featured with Shadow */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Full Featured:</p>
          <input
            type="text"
            placeholder="Full featured input..."
            className="
              w-full px-4 py-3
              border border-gray-300 rounded-lg
              outline-none
              hover:border-gray-400
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              focus:shadow-md
              transition-all duration-200
              placeholder:text-gray-400
            "
          />
        </div>

        {/* With Ring Offset */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">With Ring Offset:</p>
          <input
            type="text"
            placeholder="Ring with offset..."
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
      </div>

      {/* Explanation */}
      <div className="max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Classes Breakdown:</h3>
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">outline-none</code>
            <span className="text-gray-600">- Xóa browser outline mặc định</span>
          </div>
          <div className="flex gap-2">
            <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">focus:ring-2</code>
            <span className="text-gray-600">- Ring width 2px</span>
          </div>
          <div className="flex gap-2">
            <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">focus:ring-blue-500</code>
            <span className="text-gray-600">- Ring color xanh</span>
          </div>
          <div className="flex gap-2">
            <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">focus:border-transparent</code>
            <span className="text-gray-600">- Ẩn border khi focus</span>
          </div>
          <div className="flex gap-2">
            <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">hover:border-gray-400</code>
            <span className="text-gray-600">- Border đậm hơn khi hover</span>
          </div>
          <div className="flex gap-2">
            <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">focus:ring-offset-2</code>
            <span className="text-gray-600">- Khoảng cách giữa ring và element</span>
          </div>
        </div>
      </div>

      {/* Accessibility Note */}
      <div className="max-w-md p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-700 mb-1">✓ Accessibility:</h3>
        <p className="text-sm text-green-600">
          Ring pattern giúp keyboard users thấy rõ element đang focus,
          thay thế browser outline nhưng vẫn đảm bảo accessibility.
        </p>
      </div>
    </div>
  )
}
