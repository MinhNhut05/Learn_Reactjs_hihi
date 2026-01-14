/**
 * REAL EXERCISE: E-commerce Header + Product Section - SOLUTION
 */

// Sample products
const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 249.99, originalPrice: 349.99, status: 'sale' as const },
  { id: 2, name: 'Smart Watch Pro', category: 'Wearables', price: 299.99, originalPrice: 299.99, status: 'new' as const },
  { id: 3, name: 'Leather Backpack', category: 'Accessories', price: 129.99, originalPrice: 129.99, status: 'normal' as const },
  { id: 4, name: 'Minimalist Desk Lamp', category: 'Home', price: 79.99, originalPrice: 79.99, status: 'normal' as const },
  { id: 5, name: 'Bluetooth Speaker', category: 'Electronics', price: 149.99, originalPrice: 199.99, status: 'sale' as const },
  { id: 6, name: 'Running Shoes', category: 'Sports', price: 159.99, originalPrice: 159.99, status: 'soldOut' as const },
]

const categories = ['All', 'Electronics', 'Wearables', 'Accessories', 'Home', 'Sports']

export default function RealHeaderProductSectionSolution() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <Header />

      {/* ============================================ */}
      {/* MAIN CONTENT - Sidebar + Products */}
      {/* ============================================ */}
      <main className="flex p-6 gap-6">
        {/* Filter Sidebar - Desktop only */}
        <FilterSidebar categories={categories} />

        {/* Product Section */}
        <ProductSection products={products} />
      </main>
    </div>
  )
}

// ============================================
// HEADER COMPONENT
// ============================================
function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo - flex-none (fixed width) */}
        <div className="flex-none">
          <span className="text-2xl font-bold text-blue-600">ShopName</span>
        </div>

        {/* Search Bar - flex-1 (takes remaining space) */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {/* Search icon */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Icons - flex-none (fixed width) */}
        <div className="flex-none flex items-center gap-4">
          {/* Cart */}
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <span className="text-xl">🛒</span>
            {/* Cart badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User */}
          <button className="p-2 rounded-full hover:bg-gray-100">
            <span className="text-xl">👤</span>
          </button>
        </div>
      </div>

      {/* Navigation Links - Optional */}
      <nav className="border-t border-gray-100">
        <div className="flex justify-center gap-8 px-6 py-3">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Products
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Categories
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Deals
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            About
          </a>
        </div>
      </nav>
    </header>
  )
}

// ============================================
// FILTER SIDEBAR COMPONENT
// ============================================
function FilterSidebar({ categories }: { categories: string[] }) {
  return (
    <aside className="hidden lg:block flex-none w-64 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-32">
      {/* Categories */}
      <div>
        <h2 className="font-bold text-lg mb-4 text-gray-800">Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat, index) => (
            <li key={cat}>
              <button
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-sm
                  ${index === 0
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="mt-8">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Price Range</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Under $100</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">$100 - $200</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">$200 - $300</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Over $300</span>
          </label>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mt-8">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Rating</h2>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-500 ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}

// ============================================
// PRODUCT SECTION COMPONENT
// ============================================
interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number
  status: 'new' | 'sale' | 'soldOut' | 'normal'
}

function ProductSection({ products }: { products: Product[] }) {
  return (
    <section className="flex-1">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Featured Products</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{products.length} products</span>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* Product Grid - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

// ============================================
// PRODUCT CARD COMPONENT
// ============================================
function ProductCard({ product }: { product: Product }) {
  const isOnSale = product.status === 'sale'
  const isSoldOut = product.status === 'soldOut'
  const discountPercent = isOnSale
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
        <span className="text-gray-400">Product Image</span>

        {/* Badge */}
        {product.status !== 'normal' && (
          <span
            className={`
              absolute top-3 left-3
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

      {/* Content */}
      <div className="p-4 space-y-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-900">{product.name}</h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className={`text-xl font-bold ${isSoldOut ? 'text-gray-400' : 'text-gray-900'}`}>
            ${product.price.toFixed(2)}
          </span>
          {isOnSale && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Button */}
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

/**
 * GIẢI THÍCH CHI TIẾT:
 *
 * === HEADER LAYOUT ===
 * flex items-center justify-between
 *
 * Structure:
 * [Logo (flex-none)] [Search (flex-1)] [Icons (flex-none)]
 *
 * - flex-none: Không grow/shrink, giữ kích thước gốc
 * - flex-1: Chiếm toàn bộ không gian còn lại
 * - max-w-xl: Giới hạn max-width của search bar
 * - mx-8: Margin horizontal để tạo khoảng cách
 *
 * === SIDEBAR LAYOUT ===
 * flex (parent) với:
 * - Sidebar: hidden lg:block flex-none w-64
 * - Content: flex-1
 *
 * - hidden lg:block: Ẩn trên mobile, hiện từ lg (1024px)
 * - flex-none w-64: Width cố định 256px, không co giãn
 * - flex-1: Content chiếm phần còn lại
 *
 * === PRODUCT GRID ===
 * grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6
 *
 * Responsive behavior:
 * - Mobile: 1 column
 * - md (768px): 2 columns
 * - xl (1280px): 3 columns
 *
 * Note: Dùng xl thay vì lg vì sidebar đã chiếm 256px,
 * cần viewport lớn hơn để có đủ không gian cho 3 columns
 *
 * === STICKY POSITIONING ===
 * - Header: sticky top-0 z-10
 * - Sidebar: sticky top-32 (dưới header)
 *
 * === PATTERNS USED ===
 * 1. Navbar: flex justify-between items-center
 * 2. Flexible middle: flex-none | flex-1 | flex-none
 * 3. Sidebar layout: flex với flex-none sidebar + flex-1 content
 * 4. Responsive grid: grid-cols với breakpoints
 * 5. Desktop-only: hidden lg:block
 *
 * === COMPONENT SEPARATION ===
 * Đã tách thành các components riêng:
 * - Header: Navigation
 * - FilterSidebar: Filter options
 * - ProductSection: Grid + sorting
 * - ProductCard: Individual product
 *
 * Điều này giúp:
 * - Code dễ đọc và maintain
 * - Có thể reuse components
 * - Dễ dàng mở rộng (thêm state, props)
 */
