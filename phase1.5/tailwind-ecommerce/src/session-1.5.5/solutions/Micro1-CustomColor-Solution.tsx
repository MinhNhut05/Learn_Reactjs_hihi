/**
 * SOLUTION - Micro 1: Custom Color
 *
 * Sau khi config @theme trong index.css, component nay
 * su dung brand colors thay vi blue colors
 */

export default function Micro1CustomColorSolution() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Micro 1: Custom Brand Color - SOLUTION</h1>

      {/* Su dung brand colors tu @theme */}
      <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header - su dung brand color */}
        <div className="bg-brand-500 p-4">
          <h2 className="text-white font-bold text-lg">Eco Fresh Store</h2>
          <p className="text-brand-100 text-sm">
            Sustainable Products
          </p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <p className="text-gray-600">
            Welcome to our eco-friendly store. All products are sustainably sourced.
          </p>

          {/* Badge */}
          <span className="inline-block bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-medium">
            100% Organic
          </span>

          {/* Button */}
          <button className="w-full py-2 px-4 rounded-lg font-medium bg-brand-500 text-white hover:bg-brand-600 transition-colors">
            Shop Now
          </button>
        </div>
      </div>

      {/* Success message */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-bold text-green-800 mb-2">Success!</h3>
        <p className="text-green-700 text-sm">
          Brand colors are now using the green palette from @theme.
        </p>
      </div>
    </div>
  )
}

/**
 * KEY CHANGES:
 *
 * 1. bg-blue-500 → bg-brand-500
 * 2. text-blue-100 → text-brand-100
 * 3. bg-blue-100 text-blue-700 → bg-brand-100 text-brand-700
 * 4. hover:bg-blue-600 → hover:bg-brand-600
 *
 * CONFIG ADDED TO index.css:
 *
 * @theme {
 *   --color-brand-50: #f0fdf4;
 *   --color-brand-100: #dcfce7;
 *   --color-brand-500: #22c55e;
 *   --color-brand-600: #16a34a;
 *   --color-brand-700: #15803d;
 *   --color-brand-900: #14532d;
 * }
 */
