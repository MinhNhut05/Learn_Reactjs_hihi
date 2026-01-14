/**
 * SOLUTION - Micro 2: @apply Directive
 *
 * Sau khi tao .btn-primary trong components.css,
 * component nay su dung class do thay vi inline styles
 */

export default function Micro2ApplyDirectiveSolution() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Micro 2: @apply Directive - SOLUTION</h1>

      <div className="space-y-6">
        {/* TRUOC: Inline Tailwind classes */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-3">
            BEFORE: Inline Classes (for reference)
          </h3>
          <code className="block text-xs text-gray-500 bg-gray-100 p-2 rounded">
            className="px-4 py-2 bg-brand-500 text-white rounded-lg font-medium
            hover:bg-brand-600 focus:ring-2 focus:ring-brand-500..."
          </code>
        </div>

        {/* SAU: Su dung .btn-primary */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-3">
            AFTER: Using .btn-primary class
          </h3>

          {/* Su dung class tu components.css */}
          <button className="btn-primary">
            Add to Cart
          </button>
          <code className="block mt-2 text-xs text-green-600 bg-green-50 p-2 rounded">
            className="btn-primary" (much cleaner!)
          </code>
        </div>

        {/* Multiple buttons - tat ca dung cung class */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-3">
            Multiple Buttons (same class)
          </h3>
          <div className="flex gap-3">
            <button className="btn-primary">Buy Now</button>
            <button className="btn-primary">Subscribe</button>
            <button className="btn-primary">Contact</button>
          </div>
        </div>

        {/* All button variants */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-3">
            All Button Variants
          </h3>
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary">Primary</button>
            <button className="btn-secondary">Secondary</button>
            <button className="btn-outline">Outline</button>
            <button className="btn-ghost">Ghost</button>
            <button className="btn-danger">Danger</button>
          </div>
        </div>
      </div>

      {/* Success message */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-bold text-green-800 mb-2">Success!</h3>
        <p className="text-green-700 text-sm">
          Buttons now use @apply classes from components.css.
        </p>
      </div>
    </div>
  )
}

/**
 * COMPONENTS.CSS CONTENT:
 *
 * @layer components {
 *   .btn {
 *     @apply
 *       inline-flex items-center justify-center
 *       px-4 py-2
 *       rounded-lg font-medium
 *       transition-all duration-200
 *       focus:outline-none focus:ring-2 focus:ring-offset-2
 *       disabled:opacity-50 disabled:cursor-not-allowed;
 *   }
 *
 *   .btn-primary {
 *     @apply btn
 *       bg-brand-500 text-white
 *       hover:bg-brand-600 hover:shadow-md
 *       focus:ring-brand-500
 *       active:bg-brand-700;
 *   }
 *
 *   .btn-secondary {
 *     @apply btn
 *       bg-gray-100 text-gray-900
 *       hover:bg-gray-200
 *       focus:ring-gray-500;
 *   }
 *
 *   .btn-outline {
 *     @apply btn
 *       bg-transparent text-brand-600
 *       border-2 border-brand-500
 *       hover:bg-brand-50
 *       focus:ring-brand-500;
 *   }
 * }
 *
 * INDEX.CSS:
 * @import "./styles/components.css";
 */
