/**
 * ProductGrid Component - Session 1.5.2
 *
 * Responsive grid layout cho hiển thị products.
 * Sử dụng ProductCard component.
 *
 * Sẽ được responsive hóa đầy đủ ở Session 1.5.3
 */

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

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
}

export default function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  // Grid column classes based on prop
  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={`grid ${gridColsClass[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

// ProductCard Component
function ProductCard({ product }: { product: Product }) {
  const isOnSale = product.status === 'sale'
  const isSoldOut = product.status === 'soldOut'
  const discountPercent = isOnSale
    ? Math.round((1 - product.currentPrice / product.originalPrice) * 100)
    : 0

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Product Image</span>

        {/* Status Badge */}
        {product.status !== 'normal' && (
          <StatusBadge status={product.status} discountPercent={discountPercent} />
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-500 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2">
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
          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className={`text-xl font-bold ${isSoldOut ? 'text-gray-400' : 'text-gray-900'}`}>
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
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }
          `}
        >
          {isSoldOut ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

// Status Badge Component
function StatusBadge({
  status,
  discountPercent,
}: {
  status: 'new' | 'sale' | 'soldOut' | 'normal'
  discountPercent?: number
}) {
  const badgeStyles = {
    new: 'bg-green-500',
    sale: 'bg-red-500',
    soldOut: 'bg-gray-500',
    normal: '',
  }

  const badgeText = {
    new: 'NEW',
    sale: `-${discountPercent}%`,
    soldOut: 'SOLD OUT',
    normal: '',
  }

  return (
    <span
      className={`
        absolute top-2 left-2
        px-2 py-1
        text-xs font-bold text-white
        rounded
        ${badgeStyles[status]}
      `}
    >
      {badgeText[status]}
    </span>
  )
}

/**
 * GRID LAYOUT ANALYSIS:
 *
 * Responsive pattern: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
 *
 * Mobile (< 768px):
 * ┌─────────────┐
 * │   Card 1    │
 * ├─────────────┤
 * │   Card 2    │
 * ├─────────────┤
 * │   Card 3    │
 * └─────────────┘
 *
 * Tablet (768px - 1023px):
 * ┌──────────┬──────────┐
 * │  Card 1  │  Card 2  │
 * ├──────────┼──────────┤
 * │  Card 3  │  Card 4  │
 * └──────────┴──────────┘
 *
 * Desktop (≥ 1024px):
 * ┌────────┬────────┬────────┐
 * │ Card 1 │ Card 2 │ Card 3 │
 * ├────────┼────────┼────────┤
 * │ Card 4 │ Card 5 │ Card 6 │
 * └────────┴────────┴────────┘
 *
 * Gap: gap-6 = 1.5rem = 24px
 */
