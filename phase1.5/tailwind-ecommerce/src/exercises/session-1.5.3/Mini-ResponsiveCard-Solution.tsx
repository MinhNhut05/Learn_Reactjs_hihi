/**
 * Mini Exercise: Responsive ProductCard - SOLUTION
 *
 * Card layout changes based on screen size:
 * - Mobile: Vertical (image on top)
 * - Desktop: Horizontal (image on left)
 */

interface Product {
  id: number
  name: string
  description: string
  price: number
  image?: string
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling headphones with 30-hour battery life.',
    price: 299.99,
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Track your fitness, receive notifications, and more.',
    price: 199.99,
  },
  {
    id: 3,
    name: 'Portable Speaker',
    description: 'Waterproof Bluetooth speaker with amazing sound quality.',
    price: 79.99,
  },
]

export default function MiniResponsiveCardSolution() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Mini Exercise: Responsive ProductCard - Solution
        </h1>

        <div className="space-y-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Breakpoint indicator */}
        <div className="fixed bottom-4 right-4 bg-black text-white px-3 py-1 rounded text-sm">
          <span className="md:hidden">Mobile (flex-col)</span>
          <span className="hidden md:inline">Desktop (flex-row)</span>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    // SOLUTION: Responsive flex direction
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      {/* SOLUTION: Responsive sizing */}
      <div className="
        w-full md:w-48 lg:w-64
        h-48 md:h-auto
        shrink-0
        bg-gradient-to-br from-blue-100 to-blue-200
        flex items-center justify-center
      ">
        <span className="text-4xl md:text-5xl">📦</span>
      </div>

      {/* Content Section */}
      {/* SOLUTION: Responsive padding */}
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
        <div>
          {/* SOLUTION: Responsive text sizes */}
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-600">
            {product.description}
          </p>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-4 md:mt-6">
          <span className="text-lg md:text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button className="
            px-4 py-2
            md:px-6 md:py-2
            bg-blue-600 text-white
            rounded-lg font-semibold
            hover:bg-blue-700
            text-sm md:text-base
          ">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * KEY TAKEAWAYS:
 *
 * 1. FLEX DIRECTION SWITCHING:
 *    flex flex-col md:flex-row
 *    - Mobile: items stack vertically
 *    - Desktop: items align horizontally
 *
 * 2. IMAGE RESPONSIVE SIZING:
 *    w-full md:w-48 lg:w-64   → width changes per breakpoint
 *    h-48 md:h-auto           → fixed height mobile, auto desktop
 *    shrink-0                 → prevents image from shrinking
 *
 * 3. PADDING SCALING:
 *    p-4 md:p-6               → more padding on larger screens
 *
 * 4. TEXT SIZE SCALING:
 *    text-lg md:text-xl       → larger text on desktop
 *    text-sm md:text-base
 *
 * 5. SPACING SCALING:
 *    mt-1 md:mt-2             → more margin on desktop
 *    mt-4 md:mt-6
 *
 * VISUAL RESULT:
 *
 * Mobile (< 768px):
 * ┌──────────────────────────┐
 * │         [📦]             │  h-48, w-full
 * ├──────────────────────────┤
 * │ Wireless Headphones      │
 * │ Premium noise-canceling  │
 * │ headphones...            │
 * │                          │
 * │ $299.99    [Add to Cart] │
 * └──────────────────────────┘
 *
 * Desktop (≥ 768px):
 * ┌────────────┬─────────────────────────────────┐
 * │            │ Wireless Headphones             │
 * │    [📦]    │ Premium noise-canceling         │
 * │            │ headphones with 30-hour...      │
 * │   w-48     │                                 │
 * │            │ $299.99          [Add to Cart]  │
 * └────────────┴─────────────────────────────────┘
 */
