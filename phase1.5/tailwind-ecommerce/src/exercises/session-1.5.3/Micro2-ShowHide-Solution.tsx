/**
 * Micro Exercise 2: Show/Hide Pattern - SOLUTION
 *
 * Demonstrates show/hide patterns for responsive design.
 */

export default function Micro2ShowHideSolution() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Micro 2: Show/Hide Pattern - Solution
        </h1>

        {/* SOLUTION: Navigation patterns */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Navigation Example</h2>

          <nav className="flex items-center justify-between border p-4 rounded">
            <span className="font-bold text-blue-600">Logo</span>

            {/* SOLUTION: Mobile hamburger - visible only on mobile */}
            <button className="block md:hidden p-2 border rounded">
              ☰ Menu
            </button>

            {/* SOLUTION: Desktop navigation - hidden on mobile, flex on md+ */}
            <div className="hidden md:flex gap-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Products</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
            </div>
          </nav>
        </div>

        {/* SOLUTION: Two buttons với opposite visibility */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Button Visibility</h2>

          <div className="space-y-4">
            {/* SOLUTION: Mobile only button */}
            <button className="block md:hidden w-full py-3 bg-green-500 text-white rounded-lg font-semibold">
              📱 Mobile Button (&lt; 768px)
            </button>

            {/* SOLUTION: Desktop only button */}
            <button className="hidden md:block w-full py-3 bg-blue-500 text-white rounded-lg font-semibold">
              🖥️ Desktop Button (≥ 768px)
            </button>
          </div>
        </div>

        {/* SOLUTION: Different content for different screens */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Content Switching</h2>

          {/* SOLUTION: Compact mobile version */}
          <div className="block md:hidden border p-4 rounded">
            <p className="text-center">📱 Compact mobile view</p>
          </div>

          {/* SOLUTION: Full desktop version */}
          <div className="hidden md:block border p-4 rounded">
            <p>🖥️ This is the full desktop version with more details and information
               that we don't want to show on smaller mobile screens.</p>
          </div>
        </div>

        {/* Current breakpoint indicator */}
        <div className="fixed bottom-4 right-4 bg-black text-white px-3 py-1 rounded text-sm">
          <span className="md:hidden">Mobile (&lt; 768px)</span>
          <span className="hidden md:inline">Desktop (≥ 768px)</span>
        </div>
      </div>
    </div>
  )
}

/**
 * KEY TAKEAWAYS:
 *
 * 1. Show/Hide pattern basics:
 *    - "hidden" class = display: none
 *    - "block", "flex", "grid" = show element
 *
 * 2. Mobile only (hide on md+):
 *    className="block md:hidden"
 *    ↑ shown by default, hidden from 768px+
 *
 * 3. Desktop only (show on md+):
 *    className="hidden md:block"
 *    ↑ hidden by default, shown from 768px+
 *
 * 4. Common navigation pattern:
 *    - Hamburger button: block md:hidden (or lg:hidden)
 *    - Full nav: hidden md:flex (or lg:flex)
 *
 * 5. Use appropriate display type:
 *    - md:block for single elements
 *    - md:flex for flex containers
 *    - md:grid for grid containers
 *    - md:inline for inline elements
 *
 * 6. IMPORTANT: Always set base style!
 *    ❌ className="md:block" → hidden on mobile (no base)
 *    ✅ className="hidden md:block" → explicitly hidden, then shown
 */
