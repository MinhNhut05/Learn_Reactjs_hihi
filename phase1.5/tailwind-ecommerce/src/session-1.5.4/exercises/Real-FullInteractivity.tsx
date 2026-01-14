/**
 * REAL EXERCISE: E-commerce với Full Interactivity
 * Session 1.5.4 - States & Interactivity
 *
 * MỤC TIÊU: Hoàn thiện trang E-commerce với đầy đủ interactive states
 *
 * YÊU CẦU:
 *
 * HEADER:
 * 1. Search input với focus states (ring, transition)
 * 2. User icon với dropdown menu (group hover pattern)
 * 3. Cart icon với hover scale effect
 *
 * PRODUCT CARDS:
 * 4. Card lift on hover
 * 5. Image zoom on card hover (group pattern)
 * 6. "Quick View" button hiện khi hover card
 * 7. Wishlist heart toggle on click
 * 8. Add to Cart button với full states
 *
 * BONUS:
 * 9. Dark mode toggle (optional)
 *
 * THỜI GIAN: 45 phút
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

export default function RealFullInteractivity() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ==================== HEADER ==================== */}
      {/*
        TODO: Thêm interactive states cho Header:
        1. Search input: focus:ring-2 focus:ring-blue-500
        2. User icon: group hover để show dropdown
        3. Cart: hover scale effect
      */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="#"
            className="
              text-2xl font-bold text-blue-600
            "
          >
            ShopName
          </a>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-8">
            <input
              type="text"
              placeholder="Search products..."
              className="
                w-full px-4 py-2 pl-10
                border border-gray-300 rounded-lg
                outline-none
                focus:ring-2
                focus:ring-accent-500
                focus:ring-offset-2
                focus:border-accent-500
                transition-all duration-100
              "
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              className="group relative p-2 rounded-full hover:bg-gray-100
                active:scale-95 transition-all duration-150"
            >
              <span className="text-xl group-hover:scale-90 inline-block transition-transform">
                🛒
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User with Dropdown */}
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
              {/* TODO: Dropdown menu - sử dụng group hover pattern */}
              <div
                className="absolute top-full right-0 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  transition-all duration-200"
              >
                Dropdown content here
              </div>
            </div>
          </div>
        </div>
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
    </div>
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
    /*
      TODO: Hoàn thiện ProductCard với:

      1. CARD: Thêm class "group" và hover effects:
         - hover:shadow-xl
         - hover:-translate-y-1
         - transition-all duration-300

      2. IMAGE: Group hover scale:
         - group-hover:scale-105
         - transition-transform duration-300

      3. QUICK VIEW BUTTON: Hiện khi hover:
         - opacity-0 group-hover:opacity-100
         - translate-y-4 group-hover:translate-y-0
         - transition-all duration-300

      4. WISHLIST HEART: Toggle state
         - Thay đổi style khi isWishlisted

      5. ADD TO CART: Hover và active states
         - hover:bg-blue-700
         - active:scale-95
    */
    <div
      className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-150
        bg-white rounded-xl shadow-md overflow-hidden
      "
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {/* Product Image */}
        <div
          className=" group-hover:scale-105 transition-transform duration-200
            w-full h-full bg-gradient-to-br from-gray-100 to-gray-300
            flex items-center justify-center
          "
        >
          <span className="text-gray-400">Product Image</span>
        </div>

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

        {/* Quick View Button - TODO: Show on hover */}
        <button
          className=" group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm
            opacity-0
          "
        >
          Quick View
        </button>

        {/* Wishlist Heart - TODO: Toggle styling */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`
            absolute top-2 right-2 w-8 h-8 rounded-full
            flex items-center justify-center
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-red-500
            ${isWishlisted ? "bg-red-500 text-white" : "bg-white text-gray-600"}
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

        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={
                star <= product.rating ? "text-yellow-400" : "text-gray-300"
              }
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

        {/* Add to Cart Button - TODO: Add hover/active states */}
        <button
          onClick={onAddToCart}
          className="
          group-hover:bg-accent-500 transition-all duration-200 active:scale-95
            w-full py-2.5 px-4 rounded-lg font-semibold text-sm
            bg-blue-600 text-white
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/**
 * CHECKLIST:
 *
 * HEADER:
 * ☐ Search input có focus ring
 * ☐ Cart icon có hover effect
 * ☐ User dropdown hiện khi hover (group pattern)
 *
 * PRODUCT CARDS:
 * ☐ Card có class "group"
 * ☐ Card nâng lên khi hover
 * ☐ Shadow lớn hơn khi hover
 * ☐ Image zoom khi hover card
 * ☐ Quick View button hiện khi hover
 * ☐ Wishlist heart toggle được
 * ☐ Add to Cart có hover/active states
 * ☐ Tất cả có transitions smooth
 *
 * BONUS:
 * ☐ Dark mode toggle
 */
