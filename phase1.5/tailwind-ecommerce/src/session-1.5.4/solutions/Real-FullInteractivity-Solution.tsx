/**
 * REAL EXERCISE: E-commerce với Full Interactivity - SOLUTION
 * Session 1.5.4 - States & Interactivity
 */

import { useState } from "react";

// Sample Products Data
const products = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    category: "Electronics",
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.5,
    status: "sale" as const,
  },
  {
    id: 2,
    name: "Smart Fitness Watch Pro",
    category: "Wearables",
    price: 299.99,
    rating: 4.8,
    status: "new" as const,
  },
  {
    id: 3,
    name: "Vintage Leather Backpack",
    category: "Accessories",
    price: 129.99,
    rating: 4.2,
    status: "normal" as const,
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    category: "Home & Office",
    price: 79.99,
    rating: 4.0,
    status: "normal" as const,
  },
];

export default function RealFullInteractivitySolution() {
  const [cartCount, setCartCount] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ==================== HEADER WITH FULL INTERACTIVITY ==================== */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo với hover effect */}
          <a
            href="#"
            className="
              text-2xl font-bold text-blue-600
              hover:text-blue-700
              transition-colors duration-200
            "
          >
            ShopName
          </a>

          {/* Search với focus states */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="
                  w-full px-4 py-2 pl-10
                  border border-gray-300 rounded-lg
                  outline-none
                  hover:border-gray-400
                  focus:border-transparent
                  focus:ring-2 focus:ring-blue-500
                  focus:shadow-md
                  transition-all duration-200
                "
              />
              <span
                className={`
                  absolute left-3 top-1/2 -translate-y-1/2
                  transition-colors duration-200
                  ${isSearchFocused ? "text-blue-500" : "text-gray-400"}
                `}
              >
                🔍
              </span>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Cart với hover và animation */}
            <button
              className="
                relative p-2 rounded-full
                hover:bg-gray-100
                active:scale-95
                transition-all duration-150
                group
              "
            >
              <span className="text-xl group-hover:scale-110 inline-block transition-transform">
                🛒
              </span>
              {cartCount > 0 && (
                <span
                  className="
                    absolute -top-1 -right-1
                    bg-red-500 text-white text-xs
                    w-5 h-5 rounded-full
                    flex items-center justify-center
                    animate-pulse
                  "
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* User với Dropdown - Group hover pattern */}
            <div className="relative group">
              <button
                className="
                  flex items-center gap-1 p-2 rounded-full
                  hover:bg-gray-100
                  transition-all duration-150
                "
              >
                <span className="text-xl">👤</span>
                <span
                  className="
                    text-xs text-gray-400
                    group-hover:rotate-180
                    transition-transform duration-200
                  "
                >
                  ▼
                </span>
              </button>

              {/* Dropdown Menu */}
              <div
                className="
                  absolute top-full right-0 mt-1
                  w-48 bg-white rounded-lg shadow-lg border border-gray-100
                  opacity-0 invisible translate-y-2
                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  transition-all duration-200
                  z-30
                "
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    Hello, User
                  </p>
                  <p className="text-xs text-gray-500">View your account</p>
                </div>
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    My Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    Orders
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    Wishlist
                  </a>
                </div>
                <div className="border-t border-gray-100 py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation với animated underline */}
        <nav className="border-t border-gray-100">
          <div className="flex justify-center gap-8 px-6 py-3 max-w-7xl mx-auto">
            <NavLink href="#" isActive>
              Home
            </NavLink>
            <NavLink href="#">Products</NavLink>
            <NavLink href="#">Categories</NavLink>
            <NavLink href="#" highlight>
              Deals
            </NavLink>
            <NavLink href="#">About</NavLink>
          </div>
        </nav>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Products
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      {/* Footer Note */}
      <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
        Session 1.5.4 - States & Interactivity Solution
      </footer>
    </div>
  );
}

// ==================== NAV LINK COMPONENT ====================
function NavLink({
  href,
  children,
  isActive = false,
  highlight = false,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  highlight?: boolean;
}) {
  return (
    <a
      href={href}
      className={`
        relative text-sm font-medium
        transition-colors duration-200
        group
        ${
          isActive
            ? "text-blue-600"
            : highlight
            ? "text-red-500 hover:text-red-600"
            : "text-gray-600 hover:text-blue-600"
        }
      `}
    >
      {children}
      <span
        className={`
          absolute bottom-0 left-0 w-full h-0.5
          bg-current
          transform origin-left
          transition-transform duration-200
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </a>
  );
}

// ==================== PRODUCT CARD COMPONENT ====================
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  status: "new" | "sale" | "soldOut" | "normal";
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: () => void;
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const isOnSale = product.status === "sale";
  const discountPercent =
    isOnSale && product.originalPrice
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

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
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {/* Product Image với group-hover scale */}
        <div
          className="
            w-full h-full bg-gradient-to-br from-gray-100 to-gray-300
            flex items-center justify-center
            group-hover:scale-105
            transition-transform duration-500 ease-out
          "
        >
          <span className="text-gray-400">Product Image</span>
        </div>

        {/* Dark Overlay */}
        <div
          className="
            absolute inset-0 bg-black/20
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        />

        {/* Status Badge */}
        {product.status !== "normal" && (
          <span
            className={`
              absolute top-2 left-2 px-2 py-1
              text-xs font-bold text-white rounded
              ${product.status === "new" ? "bg-green-500" : "bg-red-500"}
            `}
          >
            {product.status === "new" ? "NEW" : `-${discountPercent}%`}
          </span>
        )}

        {/* Quick View Button - hiện khi hover */}
        <button
          className="
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm
            opacity-0 group-hover:opacity-100
            translate-y-4 group-hover:translate-y-0
            transition-all duration-300
            hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          Quick View
        </button>

        {/* Wishlist Heart - toggle styling */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className={`
            absolute top-2 right-2 w-8 h-8 rounded-full
            flex items-center justify-center
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-red-500
            ${
              isWishlisted
                ? "bg-red-500 text-white scale-110"
                : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500 hover:scale-105"
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

        {/* Title với group-hover color change */}
        <h3
          className="
            text-lg font-semibold text-gray-900 leading-tight
            group-hover:text-blue-600
            transition-colors duration-200
          "
        >
          {product.name}
        </h3>

        {/* Rating với hover scale */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`
                transition-transform hover:scale-125
                ${star <= product.rating ? "text-yellow-400" : "text-gray-300"}
              `}
            >
              ★
            </span>
          ))}
          <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button với full states */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="
            w-full py-2.5 px-4 rounded-lg font-semibold text-sm
            bg-blue-600 text-white
            hover:bg-blue-700 hover:shadow-md
            active:scale-95 active:bg-blue-800
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            transition-all duration-200
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/**
 * PATTERNS SUMMARY:
 *
 * 1. FOCUS STATES (Search):
 *    - outline-none focus:ring-2 focus:ring-blue-500
 *    - focus:border-transparent focus:shadow-md
 *    - Icon color change with useState
 *
 * 2. GROUP HOVER (Dropdown, Card):
 *    - Parent: class="group"
 *    - Children: group-hover:opacity-100, group-hover:scale-105
 *
 * 3. HOVER STATES:
 *    - Buttons: hover:bg-{color}
 *    - Cards: hover:shadow-xl hover:-translate-y-1
 *    - Links: hover:text-{color}
 *
 * 4. ACTIVE STATES:
 *    - Buttons: active:scale-95
 *
 * 5. TRANSITIONS:
 *    - All interactive elements
 *    - duration-150/200/300 based on element size
 *
 * 6. ANIMATED UNDERLINE:
 *    - scale-x-0 → group-hover:scale-x-100
 *    - origin-left
 *
 * 7. TOGGLE STATES:
 *    - Wishlist heart với useState
 *    - Conditional styling based on state
 *
 * 8. ANIMATIONS:
 *    - Cart badge: animate-pulse
 */
