/**
 * ProductCard Component - Session 1.5.5 (Design System Version)
 *
 * Product card với đầy đủ hover effects:
 * - Card: lift on hover, shadow increase
 * - Image: scale on hover (group pattern)
 * - Quick View button: appear on hover
 * - Wishlist heart: toggle on click
 * - Add to Cart: full button states
 * - Smooth transitions everywhere
 *
 * UPDATE 1.5.5: Sử dụng brand colors (green) từ design system
 * - blue-* → brand-*
 * - Consistent với toàn bộ E-commerce project
 */

import { useState } from 'react'

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

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
  onAddToCart?: (product: Product) => void
  onToggleWishlist?: (product: Product, isWishlisted: boolean) => void
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const isOnSale = product.status === 'sale'
  const isSoldOut = product.status === 'soldOut'
  const discountPercent = isOnSale
    ? Math.round((1 - product.currentPrice / product.originalPrice) * 100)
    : 0

  const handleWishlistToggle = () => {
    const newValue = !isWishlisted
    setIsWishlisted(newValue)
    onToggleWishlist?.(product, newValue)
  }

  const handleQuickView = () => {
    onQuickView?.(product)
  }

  const handleAddToCart = () => {
    if (!isSoldOut) {
      onAddToCart?.(product)
    }
  }

  return (
    <div
      className="
        group
        bg-white rounded-xl shadow-md overflow-hidden
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 ease-out
        cursor-pointer
      "
    >
      {/* Image Section - với overlay và quick view */}
      <div className="relative h-48 overflow-hidden">
        {/* Product Image - scales on card hover */}
        <div
          className="
            w-full h-full bg-gradient-to-br from-gray-100 to-gray-300
            flex items-center justify-center
            group-hover:scale-105
            transition-transform duration-500 ease-out
          "
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">Product Image</span>
          )}
        </div>

        {/* Dark Overlay - appears on hover */}
        <div
          className="
            absolute inset-0 bg-black/20
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        />

        {/* Quick View Button - appears on hover */}
        <button
          onClick={handleQuickView}
          className="
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm
            opacity-0 group-hover:opacity-100
            translate-y-4 group-hover:translate-y-0
            transition-all duration-300
            hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-brand-500
          "
        >
          Quick View
        </button>

        {/* Status Badge */}
        {product.status !== 'normal' && (
          <StatusBadge status={product.status} discountPercent={discountPercent} />
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          className={`
            absolute top-2 right-2
            w-8 h-8 rounded-full
            flex items-center justify-center
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-red-500
            ${isWishlisted
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }
          `}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Product Name - color change on hover */}
        <h3
          className="
            text-lg font-semibold text-gray-900 leading-tight
            group-hover:text-brand-600
            transition-colors duration-200
          "
        >
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm transition-transform hover:scale-125 ${
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

        {/* Add to Cart Button - full interactive states */}
        <button
          onClick={handleAddToCart}
          disabled={isSoldOut}
          className={`
            w-full py-2.5 px-4 rounded-lg font-semibold text-sm
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${isSoldOut
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : `
                  bg-brand-500 text-white
                  hover:bg-brand-600 hover:shadow-md
                  active:scale-95 active:bg-brand-700
                  focus:ring-brand-500
                `
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
  const badgeConfig = {
    new: { bg: 'bg-green-500', text: 'NEW' },
    sale: { bg: 'bg-red-500', text: `-${discountPercent}%` },
    soldOut: { bg: 'bg-gray-500', text: 'SOLD OUT' },
    normal: { bg: '', text: '' },
  }

  const { bg, text } = badgeConfig[status]

  return (
    <span
      className={`
        absolute top-2 left-2
        px-2 py-1
        text-xs font-bold text-white
        rounded
        ${bg}
      `}
    >
      {text}
    </span>
  )
}

/**
 * INTERACTIVE PATTERNS USED:
 *
 * 1. GROUP PATTERN:
 *    - Card có class "group"
 *    - Image: group-hover:scale-105
 *    - Quick View: opacity-0 group-hover:opacity-100
 *    - Title: group-hover:text-blue-600
 *    - Overlay: opacity-0 group-hover:opacity-100
 *
 * 2. HOVER STATES:
 *    - Card: hover:shadow-xl hover:-translate-y-1
 *    - Quick View button: hover:bg-gray-100
 *    - Heart: hover:text-red-500
 *    - Add to Cart: hover:bg-blue-700 hover:shadow-md
 *
 * 3. ACTIVE STATES:
 *    - Add to Cart: active:scale-95 active:bg-blue-800
 *
 * 4. FOCUS STATES:
 *    - Buttons: focus:outline-none focus:ring-2
 *
 * 5. TRANSITIONS:
 *    - Card: transition-all duration-300
 *    - Image: transition-transform duration-500
 *    - Quick View: transition-all duration-300
 *    - Title: transition-colors duration-200
 *    - Button: transition-all duration-200
 *
 * 6. CONDITIONAL STYLING:
 *    - Wishlist heart: thay đổi style khi isWishlisted
 *    - Add to Cart: disabled state khi soldOut
 */
