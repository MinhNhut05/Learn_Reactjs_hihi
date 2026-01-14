/**
 * MICRO EXERCISE 1: Custom Color (5 phut)
 *
 * MUC TIEU:
 * Them brand color (green) vao @theme trong index.css
 * Sau do su dung trong component nay
 *
 * YEU CAU:
 * 1. Mo file src/index.css
 * 2. Them @theme block voi brand colors (green palette)
 * 3. Su dung bg-brand-500, text-brand-600, etc. trong component nay
 *
 * BRAND COLORS (Green/Eco):
 * - brand-50:  #f0fdf4
 * - brand-100: #dcfce7
 * - brand-500: #22c55e (primary)
 * - brand-600: #16a34a (hover)
 * - brand-700: #15803d (active)
 * - brand-900: #14532d (text dark)
 *
 * EXPECTED OUTPUT:
 * - Card voi brand colors
 * - Button voi bg-brand-500 hover:bg-brand-600
 */

export default function Micro1CustomColor() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Micro 1: Custom Brand Color</h1>

      {/* TODO: Thay the blue bang brand color sau khi config @theme */}
      <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header - su dung brand color */}
        <div className="bg-brand-500 p-4">
          {/* TODO: Doi thanh bg-brand-500 */}
          <h2 className="text-white font-bold text-lg">Eco Fresh Store</h2>
          <p className="text-brand-100 text-sm">
            {/* TODO: Doi thanh text-brand-100 */}
            Sustainable Products
          </p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <p className="text-gray-600">
            Welcome to our eco-friendly store. All products are sustainably
            sourced.
          </p>

          {/* Badge */}
          <span className="inline-block bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-medium">
            {/* TODO: Doi thanh bg-brand-100 text-brand-700 */}
            100% Organic
          </span>

          {/* Button */}
          <button
            className="
              w-full py-2 px-4 rounded-lg font-medium
              bg-brand-500 text-white
              hover:bg-brand-600
              transition-colors
            "
            // TODO: Doi thanh bg-brand-500 hover:bg-brand-600
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-bold text-yellow-800 mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside text-yellow-700 space-y-1 text-sm">
          <li>Open src/index.css</li>
          <li>Add @theme block with brand colors</li>
          <li>Replace blue-* with brand-* in this component</li>
          <li>Verify colors change to green</li>
        </ol>
      </div>
    </div>
  );
}

/**
 * HUONG DAN CONFIG:
 *
 * Them vao src/index.css:
 *
 * ```css
 * @import "tailwindcss";
 *
 * @theme {
 *   --color-brand-50: #f0fdf4;
 *   --color-brand-100: #dcfce7;
 *   --color-brand-500: #22c55e;
 *   --color-brand-600: #16a34a;
 *   --color-brand-700: #15803d;
 *   --color-brand-900: #14532d;
 * }
 * ```
 *
 * Sau do thay the:
 * - bg-blue-500 -> bg-brand-500
 * - text-blue-100 -> text-brand-100
 * - bg-blue-100 text-blue-700 -> bg-brand-100 text-brand-700
 * - hover:bg-blue-600 -> hover:bg-brand-600
 */
