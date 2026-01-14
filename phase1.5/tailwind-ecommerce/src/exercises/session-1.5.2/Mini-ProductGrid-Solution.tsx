/**
 * MINI EXERCISE: Product Grid Layout - SOLUTION
 */

// Sample products data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    description: 'Premium sound quality',
    originalPrice: 349.99,
    currentPrice: 249.99,
    rating: 4.5,
    reviewCount: 128,
    status: 'sale' as const,
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    category: 'Wearables',
    originalPrice: 299.99,
    currentPrice: 299.99,
    rating: 4.8,
    reviewCount: 256,
    status: 'new' as const,
  },
  {
    id: 3,
    name: 'Leather Backpack',
    category: 'Accessories',
    originalPrice: 129.99,
    currentPrice: 129.99,
    rating: 4.2,
    reviewCount: 64,
    status: 'normal' as const,
  },
  {
    id: 4,
    name: 'Desk Lamp',
    category: 'Home & Office',
    originalPrice: 79.99,
    currentPrice: 79.99,
    rating: 4.0,
    reviewCount: 42,
    status: 'normal' as const,
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    originalPrice: 199.99,
    currentPrice: 149.99,
    rating: 4.6,
    reviewCount: 89,
    status: 'sale' as const,
  },
  {
    id: 6,
    name: 'Running Shoes',
    category: 'Sports',
    originalPrice: 159.99,
    currentPrice: 159.99,
    rating: 4.4,
    reviewCount: 112,
    status: 'soldOut' as const,
  },
]

export default function MiniProductGridSolution() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Section header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Featured Products</h1>
        <p className="text-gray-500 mt-2">Discover our best-selling items</p>
      </div>

      {/* Responsive Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

// ProductCard Component
interface Product {
  id: number
  name: string
  category: string
  description?: string
  originalPrice: number
  currentPrice: number
  rating: number
  reviewCount: number
  status: 'new' | 'sale' | 'soldOut' | 'normal'
}

function ProductCard({ product }: { product: Product }) {
  const isOnSale = product.status === 'sale'
  const isSoldOut = product.status === 'soldOut'
  const discountPercent = isOnSale
    ? Math.round((1 - product.currentPrice / product.originalPrice) * 100)
    : 0

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Section - relative for badge positioning */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
        <span className="text-gray-400">Product Image</span>

        {/* Status Badge - absolute positioned */}
        {product.status !== 'normal' && (
          <span
            className={`
              absolute top-2 left-2
              px-2 py-1 text-xs font-bold text-white rounded
              ${product.status === 'new' ? 'bg-green-500' : ''}
              ${product.status === 'sale' ? 'bg-red-500' : ''}
              ${product.status === 'soldOut' ? 'bg-gray-500' : ''}
            `}
          >
            {product.status === 'new' && 'NEW'}
            {product.status === 'sale' && `-${discountPercent}%`}
            {product.status === 'soldOut' && 'SOLD OUT'}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 leading-tight">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-500">{product.description}</p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm ${
                  star <= product.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xl font-bold ${
              isSoldOut ? 'text-gray-400' : 'text-gray-900'
            }`}
          >
            ${product.currentPrice.toFixed(2)}
          </span>
          {isOnSale && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={isSoldOut}
          className={`
            w-full py-2 px-4 rounded-lg font-semibold text-sm
            ${isSoldOut
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white'
            }
          `}
        >
          {isSoldOut ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

/**
 * GIẢI THÍCH CHI TIẾT:
 *
 * === RESPONSIVE GRID ===
 * grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
 *
 * Breakdown:
 * - grid: Tạo grid container
 * - grid-cols-1: Default (mobile) = 1 cột
 * - md:grid-cols-2: Từ 768px = 2 cột
 * - lg:grid-cols-3: Từ 1024px = 3 cột
 * - gap-6: Khoảng cách 1.5rem (24px) giữa cards
 *
 * === TAILWIND BREAKPOINTS ===
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 * - 2xl: 1536px
 *
 * === BADGE POSITIONING ===
 * Parent: relative
 * Badge: absolute top-2 left-2
 *
 * - relative trên parent tạo positioning context
 * - absolute trên badge đặt nó tương đối với parent
 * - top-2 left-2 = 0.5rem từ top và left
 *
 * === RESPONSIVE BEHAVIOR ===
 *
 * Mobile (< 768px):
 * [Card 1]
 * [Card 2]
 * [Card 3]
 * ...
 *
 * Tablet (768px - 1023px):
 * [Card 1] [Card 2]
 * [Card 3] [Card 4]
 * ...
 *
 * Desktop (≥ 1024px):
 * [Card 1] [Card 2] [Card 3]
 * [Card 4] [Card 5] [Card 6]
 *
 * === ALTERNATIVE PATTERNS ===
 *
 * // 4 columns on xl
 * grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
 *
 * // Auto-fit (tự động số cột dựa trên min-width)
 * grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
 */
