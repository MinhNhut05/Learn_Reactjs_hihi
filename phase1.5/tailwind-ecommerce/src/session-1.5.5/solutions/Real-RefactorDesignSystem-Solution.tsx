/**
 * SOLUTION - Real: Refactor E-commerce voi Design System
 *
 * E-commerce page da duoc refactor:
 * - Tat ca blue-* → brand-*
 * - Buttons dung .btn-primary, .btn-outline
 * - Inputs dung .input-field
 * - Consistent green theme throughout
 */

import { useState } from 'react'

const mockProducts = [
  {
    id: 1,
    name: 'Organic Green Tea',
    category: 'Beverages',
    description: 'Premium organic green tea from sustainable farms',
    originalPrice: 24.99,
    currentPrice: 19.99,
    rating: 4.5,
    reviewCount: 128,
    status: 'sale' as const,
  },
  {
    id: 2,
    name: 'Bamboo Water Bottle',
    category: 'Eco Living',
    description: 'Reusable bamboo water bottle, 750ml capacity',
    originalPrice: 35.00,
    currentPrice: 35.00,
    rating: 5,
    reviewCount: 89,
    status: 'new' as const,
  },
  {
    id: 3,
    name: 'Natural Face Cream',
    category: 'Beauty',
    description: 'Organic face cream with aloe vera',
    originalPrice: 45.00,
    currentPrice: 45.00,
    rating: 4,
    reviewCount: 56,
    status: 'normal' as const,
  },
]

export default function RealRefactorDesignSystemSolution() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Using design system */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo - brand color */}
          <h1 className="text-2xl font-bold text-brand-600">
            Eco Shop
          </h1>

          {/* Search - using input-field class */}
          <div className="flex-1 max-w-md mx-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="input-field"
            />
          </div>

          {/* Cart */}
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <span className="text-xl">🛒</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCardSolution
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product.id)}
            />
          ))}
        </div>

        {/* Newsletter Section */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Join Our Newsletter
            </h3>
            <p className="text-gray-600 mb-6">
              Get updates on new eco-friendly products and special offers
            </p>

            <form className="flex gap-3">
              {/* Input using design system class */}
              <input
                type="email"
                placeholder="your@email.com"
                className="input-field"
              />
              {/* Button using design system class */}
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Success Indicator */}
      <div className="fixed bottom-4 right-4 bg-green-50 border border-green-200 p-4 rounded-lg shadow-lg max-w-xs">
        <h4 className="font-bold text-green-800 mb-2">✓ Design System Applied</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>✓ Logo: text-brand-600</li>
          <li>✓ Search: input-field class</li>
          <li>✓ Cards: brand colors</li>
          <li>✓ Buttons: btn-primary</li>
          <li>✓ Newsletter: design system</li>
        </ul>
      </div>
    </div>
  )
}

// Product Card Component - Refactored with design system
function ProductCardSolution({
  product,
  onAddToCart,
}: {
  product: typeof mockProducts[0]
  onAddToCart: () => void
}) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const isOnSale = product.status === 'sale'
  const discountPercent = isOnSale
    ? Math.round((1 - product.currentPrice / product.originalPrice) * 100)
    : 0

  return (
    <div className="card-interactive">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group">
        <span className="text-gray-400">Product Image</span>

        {/* Status Badge using brand colors */}
        {product.status !== 'normal' && (
          <span
            className={`
              absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded
              ${product.status === 'new' ? 'bg-brand-500' : 'bg-error'}
            `}
          >
            {product.status === 'new' ? 'NEW' : `-${discountPercent}%`}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`
            absolute top-2 right-2 w-8 h-8 rounded-full
            flex items-center justify-center transition-all
            ${isWishlisted
              ? 'bg-error text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-error'
            }
          `}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Content */}
      <div className="card-body space-y-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Title with brand color on hover */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm ${
                  star <= product.rating ? 'text-warning' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            ${product.currentPrice.toFixed(2)}
          </span>
          {isOnSale && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart - using btn-primary */}
        <button onClick={onAddToCart} className="btn-primary w-full">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

/**
 * REFACTOR SUMMARY:
 *
 * 1. COLORS CHANGED:
 *    - text-blue-600 → text-brand-600
 *    - bg-blue-500 → bg-brand-500
 *    - focus:ring-blue-500 → focus:ring-brand-500
 *    - hover:bg-blue-600 → hover:bg-brand-600
 *    - group-hover:text-blue-600 → group-hover:text-brand-600
 *
 * 2. CLASSES USED:
 *    - input-field for search and email inputs
 *    - btn-primary for submit buttons
 *    - card-interactive for product cards
 *    - card-body for card content
 *
 * 3. SEMANTIC COLORS:
 *    - bg-error for sale badge and wishlist
 *    - bg-brand-500 for NEW badge
 *    - text-warning for star ratings
 *
 * 4. BENEFITS:
 *    - Consistent look throughout
 *    - Easy to change brand color
 *    - Cleaner, shorter class names
 *    - Maintainable design system
 */
