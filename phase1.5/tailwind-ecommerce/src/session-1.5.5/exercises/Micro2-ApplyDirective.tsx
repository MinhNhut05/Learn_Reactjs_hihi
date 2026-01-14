/**
 * MICRO EXERCISE 2: @apply Directive (5 phut)
 *
 * MUC TIEU:
 * Tao .btn-primary class voi @apply trong CSS
 * Sau do su dung class do thay vi inline Tailwind
 *
 * YEU CAU:
 * 1. Tao file src/styles/components.css
 * 2. Them .btn-primary voi @layer components va @apply
 * 3. Import vao index.css
 * 4. Thay the inline classes bang .btn-primary
 *
 * BTN-PRIMARY BAO GOM:
 * - px-4 py-2
 * - bg-brand-500 text-white
 * - rounded-lg font-medium
 * - hover:bg-brand-600
 * - focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
 * - transition-colors
 */

export default function Micro2ApplyDirective() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Micro 2: @apply Directive</h1>

      <div className="space-y-6">
        {/* TRUOC: Inline Tailwind classes (qua dai!) */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-3">
            BEFORE: Inline Classes (too long!)
          </h3>
          <button
            className="
              px-4 py-2
              bg-brand-500 text-white
              rounded-lg font-medium
              hover:bg-brand-600
              focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
              transition-colors
            "
          >
            Add to Cart
          </button>
          <code className="block mt-2 text-xs text-gray-500 bg-gray-100 p-2 rounded">
            className="px-4 py-2 bg-brand-500 text-white rounded-lg font-medium
            hover:bg-brand-600 focus:ring-2 focus:ring-brand-500..."
          </code>
        </div>

        {/* SAU: Su dung .btn-primary */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-3">
            AFTER: Using .btn-primary class
          </h3>

          {/* TODO: Sau khi tao .btn-primary, thay the inline classes */}
          <button
            className="btn-primary"
            // TODO: Doi thanh className="btn-primary"
          >
            Add to Cart
          </button>
          <code className="block mt-2 text-xs text-green-600 bg-green-50 p-2 rounded">
            className="btn-primary" (much cleaner!)
          </code>
        </div>

        {/* Multiple buttons */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-3">
            Multiple Buttons (same class)
          </h3>
          <div className="flex gap-3">
            {/* TODO: Thay tat ca thanh btn-primary */}
            <button className="btn-primary">Buy Now</button>
            <button className="btn-primary">Subscribe</button>
            <button className="btn-primary">Contact</button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-bold text-yellow-800 mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside text-yellow-700 space-y-1 text-sm">
          <li>Create src/styles/components.css</li>
          <li>Add @layer components with .btn-primary using @apply</li>
          <li>Import in index.css: @import "./styles/components.css";</li>
          <li>Replace inline classes with className="btn-primary"</li>
        </ol>
      </div>
    </div>
  );
}

/**
 * HUONG DAN:
 *
 * Tao file src/styles/components.css:
 *
 * ```css
 * @layer components {
 *   .btn-primary {
 *     @apply
 *       px-4 py-2
 *       bg-brand-500 text-white
 *       rounded-lg font-medium
 *       hover:bg-brand-600
 *       focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
 *       transition-colors;
 *   }
 * }
 * ```
 *
 * Them vao src/index.css (sau @import "tailwindcss"):
 *
 * ```css
 * @import "./styles/components.css";
 * ```
 *
 * Sau do thay the:
 * - className="px-4 py-2 bg-brand-500..." -> className="btn-primary"
 */
