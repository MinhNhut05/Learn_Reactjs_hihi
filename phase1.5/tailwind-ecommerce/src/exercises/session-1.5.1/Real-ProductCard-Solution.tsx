/**
 * REAL EXERCISE: Product Card E-commerce - SOLUTION
 */

interface Product {
  id: number
  name: string
  category: string
  description?: string
  image?: string
  originalPrice: number
  currentPrice: number
  rating: number
  reviewCount: number
  status: 'new' | 'sale' | 'soldOut' | 'normal'
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Electronics',
    description: 'Premium sound quality with 30-hour battery life',
    originalPrice: 349.99,
    currentPrice: 249.99,
    rating: 4.5,
    reviewCount: 128,
    status: 'sale',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch Pro',
    category: 'Wearables',
    description: 'Track your health and fitness goals',
    originalPrice: 299.99,
    currentPrice: 299.99,
    rating: 4.8,
    reviewCount: 256,
    status: 'new',
  },
  {
    id: 3,
    name: 'Vintage Leather Backpack',
    category: 'Accessories',
    originalPrice: 129.99,
    currentPrice: 129.99,
    rating: 4.2,
    reviewCount: 64,
    status: 'soldOut',
  },
  {
    id: 4,
    name: 'Minimalist Desk Lamp',
    category: 'Home & Office',
    description: 'Modern design with adjustable brightness',
    originalPrice: 79.99,
    currentPrice: 79.99,
    rating: 4.0,
    reviewCount: 42,
    status: 'normal',
  },
]

interface ProductCardProps {
  product: Product
}

export default function RealProductCardSolution() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Product Cards - Solution</h2>

      {/* Grid layout for multiple cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product }: ProductCardProps) {
  const isOnSale = product.status === 'sale'
  const isSoldOut = product.status === 'soldOut'
  const discountPercent = isOnSale
    ? Math.round((1 - product.currentPrice / product.originalPrice) * 100)
    : 0

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-200">
        {/* Placeholder image */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
          <span className="text-gray-400 text-sm">Product Image</span>
        </div>

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
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price Section */}
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

// Status Badge Component
interface StatusBadgeProps {
  status: 'new' | 'sale' | 'soldOut' | 'normal'
  discountPercent?: number
}

function StatusBadge({ status, discountPercent }: StatusBadgeProps) {
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

// Star Rating Helper
function renderStars(rating: number) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <>
      {/* Full stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-sm">
            ★
          </span>
        ))}

      {/* Half star */}
      {hasHalfStar && (
        <span className="text-yellow-400 text-sm">★</span>
      )}

      {/* Empty stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-sm">
            ★
          </span>
        ))}
    </>
  )
}

/**
 * GIẢI THÍCH CHI TIẾT:
 *
 * === CARD CONTAINER ===
 * - bg-white: background trắng
 * - rounded-lg: góc bo tròn
 * - shadow-md: shadow tạo depth
 * - overflow-hidden: ẩn phần tràn (cho image rounded corners)
 * - max-w-sm: giới hạn max-width cho card
 *
 * === IMAGE SECTION ===
 * - relative: cho phép position absolute của badge
 * - h-48: chiều cao cố định 12rem
 * - bg-gray-200: fallback background nếu không có image
 *
 * === STATUS BADGE ===
 * - absolute top-2 left-2: vị trí góc trên trái
 * - px-2 py-1: padding nhỏ gọn
 * - text-xs font-bold: nhỏ nhưng đọc được
 * - text-white: contrast tốt trên màu nền
 * - rounded: góc bo nhẹ
 * - Màu theo status: green (new), red (sale), gray (soldOut)
 *
 * === CONTENT SECTION ===
 * - p-4: padding đều
 * - space-y-3: khoảng cách giữa các elements
 *
 * === CATEGORY ===
 * - text-xs: nhỏ nhất
 * - text-gray-400: màu nhạt
 * - uppercase tracking-wide: style label
 *
 * === PRODUCT NAME ===
 * - text-lg: vừa phải, không quá lớn trong card
 * - font-semibold: semi-bold đủ nổi bật
 * - text-gray-900: màu đậm nhất
 * - leading-tight: line-height tight cho heading
 *
 * === DESCRIPTION ===
 * - text-sm: nhỏ hơn title
 * - text-gray-500: màu trung tính
 * - leading-relaxed: dễ đọc
 *
 * === RATING ===
 * - flex items-center gap-2: align stars và text
 * - text-yellow-400: màu vàng cho filled stars
 * - text-gray-300: màu xám cho empty stars
 *
 * === PRICE ===
 * - text-xl font-bold: nổi bật
 * - line-through text-gray-400: style cho giá gốc
 *
 * === BUTTON ===
 * - w-full: full width
 * - py-2 px-4: padding chuẩn cho button
 * - rounded-lg: bo góc
 * - font-semibold: dễ đọc
 * - Conditional styles cho disabled state
 *
 * === PATTERNS USED ===
 * 1. Card pattern: image + content stacked
 * 2. Badge overlay: absolute positioning
 * 3. Typography hierarchy: category < description < name < price
 * 4. Color semantics: green=new, red=sale, gray=inactive
 * 5. Disabled state: lighter colors + cursor change
 */
