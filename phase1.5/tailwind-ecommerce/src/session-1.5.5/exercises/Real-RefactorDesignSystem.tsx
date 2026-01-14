/**
 * REAL EXERCISE: Refactor E-commerce voi Design System (45 phut)
 *
 * MUC TIEU:
 * Ap dung design system da tao vao cac components cua E-commerce project:
 * - ProductCard.tsx
 * - Header.tsx
 * - Button.tsx
 * - Input.tsx
 *
 * YEU CAU:
 *
 * 1. REFACTOR ProductCard.tsx:
 *    - Thay blue-* bang brand-* colors
 *    - Su dung .btn-primary cho Add to Cart button
 *    - Dam bao hover states van hoat dong
 *
 * 2. REFACTOR Header.tsx:
 *    - Thay blue-* bang brand-* colors
 *    - Su dung .input-field cho search bar
 *    - Update nav links colors
 *
 * 3. REFACTOR Button.tsx:
 *    - Thay blue-* bang brand-* colors
 *    - Hoac tao variant mapping sang brand colors
 *
 * 4. REFACTOR Input.tsx:
 *    - Thay blue-* bang brand-* colors
 *    - Su dung .input-field class
 *
 * LUU Y:
 * - KHONG tao file moi, chi REFACTOR files hien co
 * - Dam bao tat ca chuc nang van hoat dong sau refactor
 * - Test hover, focus, disabled states
 */

import { useState } from "react";

// Mock Product data
const mockProducts = [
  {
    id: 1,
    name: "Organic Green Tea",
    category: "Beverages",
    description: "Premium organic green tea from sustainable farms",
    originalPrice: 24.99,
    currentPrice: 19.99,
    rating: 4.5,
    reviewCount: 128,
    status: "sale" as const,
  },
  {
    id: 2,
    name: "Bamboo Water Bottle",
    category: "Eco Living",
    description: "Reusable bamboo water bottle, 750ml capacity",
    originalPrice: 35.0,
    currentPrice: 35.0,
    rating: 5,
    reviewCount: 89,
    status: "new" as const,
  },
  {
    id: 3,
    name: "Natural Face Cream",
    category: "Beauty",
    description: "Organic face cream with aloe vera",
    originalPrice: 45.0,
    currentPrice: 45.0,
    rating: 4,
    reviewCount: 56,
    status: "normal" as const,
  },
];

export default function RealRefactorDesignSystem() {
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Should use design system */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo - TODO: Change to brand color */}
          <h1 className="text-2xl font-bold text-brand-600">
            {/* TODO: text-brand-600 */}
            Eco Shop
          </h1>

          {/* Search - TODO: Use input-field class */}
          <div className="flex-1 max-w-md mx-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="
                input-field
              "
              // TODO: Thay bang className="input-field"
            />
          </div>

          {/* Cart */}
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <span className="text-xl">🛒</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard
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
              {/* TODO: Use input-field class */}
              <input
                type="email"
                placeholder="your@email.com"
                className="input-field
                "
              />
              {/* TODO: Use btn-primary class */}
              <button
                type="submit"
                className="
                 btn-primary
                "
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Refactor Checklist */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
        <h4 className="font-bold text-gray-900 mb-2">Refactor Checklist</h4>
        <ul className="text-sm space-y-1">
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Logo: text-blue-600 → text-brand-600</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Search: inline → input-field</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Cards: blue-* → brand-*</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Buttons: inline → btn-primary</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Newsletter: same updates</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Product Card Component (simplified for exercise)
function ProductCard({
  product,
  onAddToCart,
}: {
  product: (typeof mockProducts)[0];
  onAddToCart: () => void;
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isOnSale = product.status === "sale";
  const discountPercent = isOnSale
    ? Math.round((1 - product.currentPrice / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-gray-400">Product Image</span>

        {/* Status Badge */}
        {product.status !== "normal" && (
          <span
            className={`
              absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded
              ${product.status === "new" ? "bg-green-500" : ""}
              ${product.status === "sale" ? "bg-red-500" : ""}
            `}
          >
            {product.status === "new" ? "NEW" : `-${discountPercent}%`}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`
            absolute top-2 right-2 w-8 h-8 rounded-full
            flex items-center justify-center transition-all
            ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
            }
          `}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.category}
        </p>

        {/* TODO: Change to brand color */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
          {/* TODO: group-hover:text-brand-600 */}
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
                  star <= product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
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

        {/* Add to Cart - TODO: Use btn-primary class */}
        <button
          onClick={onAddToCart}
          className="
           btn-primary
          "
          // TODO: Thay bang className="btn-primary w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/**
 * REFACTOR STEPS:
 *
 * 1. COLORS:
 *    - text-blue-600 → text-brand-600
 *    - bg-blue-500 → bg-brand-500
 *    - bg-blue-600 → bg-brand-600
 *    - hover:bg-blue-600 → hover:bg-brand-600
 *    - hover:bg-blue-700 → hover:bg-brand-700
 *    - focus:ring-blue-500 → focus:ring-brand-500
 *    - group-hover:text-blue-600 → group-hover:text-brand-600
 *
 * 2. COMPONENT CLASSES:
 *    - Search input → className="input-field"
 *    - Subscribe button → className="btn-primary"
 *    - Add to Cart → className="btn-primary w-full"
 *
 * 3. TEST:
 *    - Hover states work
 *    - Focus rings show brand color
 *    - Buttons look consistent
 *    - All green (brand) color throughout
 *
 * BONUS:
 *    - Add dark mode support
 *    - Update real component files
 */
