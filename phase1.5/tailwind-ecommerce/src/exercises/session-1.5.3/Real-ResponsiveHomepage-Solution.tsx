/**
 * Real Exercise: Responsive E-commerce Homepage - SOLUTION
 *
 * Complete responsive layout with:
 * - Mobile: Hamburger menu, 1 column products, filter button
 * - Tablet: Full header, 2 column products, filter button
 * - Desktop: Full header + nav, sidebar, 3 column products
 */

// Sample data
const products = [
  { id: 1, name: 'Wireless Headphones', price: 299.99, category: 'Electronics' },
  { id: 2, name: 'Smart Watch', price: 199.99, category: 'Wearables' },
  { id: 3, name: 'Laptop Stand', price: 49.99, category: 'Accessories' },
  { id: 4, name: 'USB-C Hub', price: 79.99, category: 'Accessories' },
  { id: 5, name: 'Mechanical Keyboard', price: 149.99, category: 'Electronics' },
  { id: 6, name: 'Webcam HD', price: 89.99, category: 'Electronics' },
]

export default function RealResponsiveHomepageSolution() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* SOLUTION: Mobile filter button - visible on mobile/tablet only */}
        <div className="block lg:hidden mb-4">
          <button className="w-full py-3 border border-gray-300 rounded-lg bg-white flex items-center justify-center gap-2 font-medium">
            <span>🔍</span>
            <span>Show Filters</span>
          </button>
        </div>

        {/* SOLUTION: Layout with sidebar on desktop */}
        <div className="flex gap-6">
          {/* Sidebar - desktop only */}
          <FilterSidebar />

          {/* Products Grid */}
          <div className="flex-1">
            {/* Page title */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                All Products
              </h1>
              <span className="text-sm text-gray-500">
                {products.length} products
              </span>
            </div>

            {/* SOLUTION: Responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Breakpoint indicator */}
      <div className="fixed bottom-4 right-4 bg-black text-white px-3 py-1 rounded text-sm z-50">
        <span className="md:hidden">Mobile (1 col)</span>
        <span className="hidden md:inline lg:hidden">Tablet (2 cols)</span>
        <span className="hidden lg:inline">Desktop (sidebar + 3 cols)</span>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      {/* Main Header Row */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        {/* Logo */}
        <a href="/" className="flex-none text-xl md:text-2xl font-bold text-blue-600">
          ShopName
        </a>

        {/* SOLUTION: Search bar - hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex-none flex items-center gap-2 md:gap-4">
          {/* SOLUTION: Hamburger - mobile/tablet only */}
          <button className="block lg:hidden p-2 rounded hover:bg-gray-100">
            <span className="text-xl">☰</span>
          </button>

          {/* Cart button - always visible */}
          <button className="p-2 rounded hover:bg-gray-100 relative">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* SOLUTION: User button - hidden on mobile */}
          <button className="hidden md:block p-2 rounded hover:bg-gray-100">
            <span className="text-xl">👤</span>
          </button>
        </div>
      </div>

      {/* SOLUTION: Navigation - desktop only */}
      <nav className="hidden lg:block border-t border-gray-100">
        <div className="flex justify-center gap-8 px-4 py-3">
          <NavLink href="#">Home</NavLink>
          <NavLink href="#">Products</NavLink>
          <NavLink href="#">Categories</NavLink>
          <NavLink href="#">Deals</NavLink>
          <NavLink href="#">About</NavLink>
        </div>
      </nav>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
    >
      {children}
    </a>
  )
}

function FilterSidebar() {
  return (
    // SOLUTION: Hidden on mobile/tablet, visible on lg+
    <aside className="hidden lg:block flex-none w-64 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24">
      <h2 className="font-bold text-lg mb-4 text-gray-800">Filters</h2>

      {/* Categories */}
      <section className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
        <ul className="space-y-2">
          {['All', 'Electronics', 'Wearables', 'Accessories'].map((cat, index) => (
            <li key={cat}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  index === 0
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Price Range */}
      <section className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Price Range</h3>
        <div className="space-y-3">
          {['Under $50', '$50 - $100', '$100 - $200', 'Over $200'].map((range) => (
            <label key={range} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm text-gray-600">{range}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Rating */}
      <section className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
              />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-500 ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </section>

      <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
        Clear Filters
      </button>
    </aside>
  )
}

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="h-40 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-4xl">📦</span>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-900 mt-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * RESPONSIVE BREAKDOWN:
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │                    MOBILE (< 768px)                         │
 * ├─────────────────────────────────────────────────────────────┤
 * │ Header: Logo + Hamburger + Cart                             │
 * │ Search: HIDDEN                                              │
 * │ Navigation: HIDDEN                                          │
 * │ Filter button: VISIBLE                                      │
 * │ Sidebar: HIDDEN                                             │
 * │ Products: 1 column (grid-cols-1)                            │
 * └─────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │                  TABLET (768px - 1023px)                    │
 * ├─────────────────────────────────────────────────────────────┤
 * │ Header: Logo + Search + Hamburger + Cart + User             │
 * │ Search: VISIBLE (md:block)                                  │
 * │ Navigation: HIDDEN                                          │
 * │ Filter button: VISIBLE                                      │
 * │ Sidebar: HIDDEN                                             │
 * │ Products: 2 columns (md:grid-cols-2)                        │
 * └─────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │                    DESKTOP (≥ 1024px)                       │
 * ├─────────────────────────────────────────────────────────────┤
 * │ Header: Logo + Search + Cart + User                         │
 * │ Hamburger: HIDDEN (lg:hidden)                               │
 * │ Navigation: VISIBLE (lg:block)                              │
 * │ Filter button: HIDDEN (lg:hidden)                           │
 * │ Sidebar: VISIBLE (lg:block)                                 │
 * │ Products: 3 columns (lg:grid-cols-3)                        │
 * └─────────────────────────────────────────────────────────────┘
 *
 *
 * KEY PATTERNS USED:
 *
 * 1. Show/Hide:
 *    - hidden md:block    → show from tablet
 *    - hidden lg:block    → show from desktop
 *    - block lg:hidden    → hide from desktop
 *
 * 2. Responsive Grid:
 *    grid-cols-1 md:grid-cols-2 lg:grid-cols-3
 *
 * 3. Responsive Spacing:
 *    px-4 sm:px-6 lg:px-8
 *    gap-4 md:gap-6
 *
 * 4. Responsive Sizing:
 *    text-xl md:text-2xl
 *    h-40 md:h-48
 */
