/**
 * Real Exercise: Responsive E-commerce Homepage (45 phút)
 *
 * MỤC TIÊU:
 * Tạo layout E-commerce hoàn chỉnh với 3 breakpoints:
 *
 * MOBILE (< 768px):
 * ┌────────────────────────┐
 * │ Logo        [☰] [🛒]  │  Header với hamburger
 * ├────────────────────────┤
 * │ [Filter Button]        │  Button mở filter
 * ├────────────────────────┤
 * │ ┌──────────────────┐   │
 * │ │    Product 1     │   │  1 column grid
 * │ └──────────────────┘   │
 * │ ┌──────────────────┐   │
 * │ │    Product 2     │   │
 * │ └──────────────────┘   │
 * └────────────────────────┘
 *
 * TABLET (768px - 1023px):
 * ┌────────────────────────────────────┐
 * │ Logo    [Search...]    [🛒] [👤]  │  Full header
 * ├────────────────────────────────────┤
 * │ [Filter Button]                    │
 * ├────────────────────────────────────┤
 * │ ┌─────────┐ ┌─────────┐           │
 * │ │Product 1│ │Product 2│           │  2 column grid
 * │ └─────────┘ └─────────┘           │
 * │ ┌─────────┐ ┌─────────┐           │
 * │ │Product 3│ │Product 4│           │
 * │ └─────────┘ └─────────┘           │
 * └────────────────────────────────────┘
 *
 * DESKTOP (≥ 1024px):
 * ┌───────────────────────────────────────────────────┐
 * │ Logo       [Search...]              [🛒] [👤]    │
 * ├───────────────────────────────────────────────────┤
 * │           Home | Products | Categories | Deals    │
 * ├──────────┬────────────────────────────────────────┤
 * │          │ ┌───────┐ ┌───────┐ ┌───────┐         │
 * │ FILTERS  │ │Prod 1 │ │Prod 2 │ │Prod 3 │         │  Sidebar + 3 col
 * │          │ └───────┘ └───────┘ └───────┘         │
 * │ Category │ ┌───────┐ ┌───────┐ ┌───────┐         │
 * │ Price    │ │Prod 4 │ │Prod 5 │ │Prod 6 │         │
 * │ Rating   │ └───────┘ └───────┘ └───────┘         │
 * └──────────┴────────────────────────────────────────┘
 */

// Sample data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 299.99,
    category: "Electronics",
  },
  { id: 2, name: "Smart Watch", price: 199.99, category: "Wearables" },
  { id: 3, name: "Laptop Stand", price: 49.99, category: "Accessories" },
  { id: 4, name: "USB-C Hub", price: 79.99, category: "Accessories" },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 149.99,
    category: "Electronics",
  },
  { id: 6, name: "Webcam HD", price: 89.99, category: "Electronics" },
];

export default function RealResponsiveHomepage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* TODO: Header Component */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* TODO: Mobile filter button - chỉ hiện trên mobile/tablet */}
        <div className="mb-4">
          <button className="w-full py-2 lg:hidden border border-gray-300 rounded-lg bg-white flex items-center justify-center gap-2">
            {/* Thêm: block lg:hidden */}
            <span>🔍</span>
            <span>Filters</span>
          </button>
        </div>

        {/* TODO: Layout container - Sidebar + Products */}
        {/* Desktop: flex với sidebar bên trái */}
        <div className="flex gap-6">
          {/* TODO: Sidebar - chỉ hiện trên lg+ */}
          <FilterSidebar />

          {/* TODO: Products Grid */}
          {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Thêm responsive grid-cols */}
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Breakpoint indicator */}
      <div className="fixed bottom-4 right-4 bg-black text-white px-3 py-1 rounded text-sm z-50">
        <span className="md:hidden">Mobile</span>
        <span className="hidden md:inline lg:hidden">Tablet</span>
        <span className="hidden lg:inline">Desktop</span>
      </div>
    </div>
  );
}

function Header() {
  return (
    // TODO: Responsive header
    <header className="bg-white shadow-sm sticky top-0 z-10">
      {/* Main Header Row */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-blue-600">
          ShopName
        </a>

        {/* TODO: Search bar - ẩn trên mobile, hiện từ md */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          {/* Thêm: hidden md:block */}
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* TODO: Hamburger - chỉ hiện trên mobile */}
          <button className="lg:hidden p-2 rounded">
            {/* Thêm: block lg:hidden */}☰
          </button>

          {/* Cart button */}
          <button className="p-2 rounded relative">
            🛒
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* TODO: User button - ẩn trên mobile */}
          <button className="hidden md:block p-2 rounded">
            {/* Thêm: hidden md:block */}
            👤
          </button>
        </div>
      </div>

      {/* TODO: Navigation - ẩn trên mobile/tablet, hiện từ lg */}
      <nav className="hidden lg:block border-t border-gray-100">
        {/* Thêm: hidden lg:block */}
        <div className="flex justify-center gap-8 px-4 py-3">
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Products
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Categories
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Deals
          </a>
        </div>
      </nav>
    </header>
  );
}

function FilterSidebar() {
  return (
    // TODO: Ẩn trên mobile/tablet, hiện từ lg
    <aside className="hidden lg:block w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
      {/* Thêm: hidden lg:block */}
      <h2 className=" font-bold text-lg mb-4">Filters</h2>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Category</h3>
        <ul className="space-y-2">
          {["All", "Electronics", "Wearables", "Accessories"].map((cat) => (
            <li key={cat}>
              <button className="text-gray-600 hover:text-blue-600">
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="space-y-2">
          {["Under $50", "$50 - $100", "$100 - $200", "Over $200"].map(
            (range) => (
              <label key={range} className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-600">{range}</span>
              </label>
            )
          )}
        </div>
      </div>

      <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-600">
        Clear Filters
      </button>
    </aside>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Image */}
      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-3xl">📦</span>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase">{product.category}</p>
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * CHECKLIST:
 *
 * HEADER:
 * □ Search bar: hidden md:block
 * □ Hamburger: block lg:hidden
 * □ User icon: hidden md:block
 * □ Navigation: hidden lg:block
 *
 * LAYOUT:
 * □ Filter button: block lg:hidden
 * □ Sidebar: hidden lg:block
 * □ Products grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
 *
 * SPACING:
 * □ Container padding: px-4 md:px-6 lg:px-8
 * □ Gap between items: gap-4 md:gap-6
 */
