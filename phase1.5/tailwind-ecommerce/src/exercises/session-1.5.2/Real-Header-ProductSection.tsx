/**
 * REAL EXERCISE: E-commerce Header + Product Section (45 phút)
 *
 * CHỈ CẦN THÊM TAILWIND CLASSES VÀO className=""
 * ProductCard đã hoàn thiện - không cần sửa
 */

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 249.99,
    status: "sale" as const,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    category: "Wearables",
    price: 299.99,
    status: "new" as const,
  },
  {
    id: 3,
    name: "Leather Backpack",
    category: "Accessories",
    price: 129.99,
    status: "normal" as const,
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    category: "Home",
    price: 79.99,
    status: "normal" as const,
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 149.99,
    status: "sale" as const,
  },
  {
    id: 6,
    name: "Running Shoes",
    category: "Sports",
    price: 159.99,
    status: "soldOut" as const,
  },
];

const categories = [
  "All",
  "Electronics",
  "Wearables",
  "Accessories",
  "Home",
  "Sports",
];

export default function RealHeaderProductSection() {
  return (
    // Page container: min-h-screen bg-gray-100
    <div className="min-h-screen bg-gray-200">
      {/* ==================== HEADER ==================== */}
      {/* Header container: bg-white shadow-sm */}
      <header className="bg-white shadow-sm">
        {/* Header inner: flex items-center justify-between px-6 py-4 */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo wrapper: flex-none */}
          <div className="flex-none">
            {/* Logo text: text-2xl font-bold text-blue-600 */}
            <span className="text-2xl font-bold text-blue-600">ShopName</span>
          </div>

          {/* Search wrapper: flex-1 max-w-xl mx-8 */}
          <div className="flex-1 max-w-xl mx-8">
            {/* Search input: w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-blue-300 focus:right-2 focus:ring-blue-500"
            />
          </div>

          {/* Icons wrapper: flex-none flex items-center gap-4 */}
          <div className="flex-none flex items-center gap-4">
            {/* Icon button: p-2 rounded-full hover:bg-gray-100 */}
            <button className="">🛒</button>
            <button className="">👤</button>
          </div>
        </div>
      </header>

      {/* ==================== MAIN ==================== */}
      {/* Main container: flex p-6 gap-6 */}
      <main className="flex p-6 gap-6">
        {/* ==================== SIDEBAR ==================== */}
        {/* Sidebar: hidden lg:block flex-none w-64 bg-white rounded-lg shadow-sm p-6 h-fit */}
        <aside className="hidden lg:block flex-none w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
          {/* Section title: font-bold text-lg mb-4 text-gray-800 */}
          <h2 className=" font-bold text-lg mb-4 text-gray-800">Categories</h2>

          {/* Category list: space-y-2 */}
          <ul className="space-y-2">
            {categories.map((cat, index) => (
              <li key={cat}>
                {/*
                  Category button:
                  - Base: w-full text-left px-3 py-2 rounded-lg text-sm
                  - Active (index===0): bg-blue-50 text-blue-600 font-medium
                  - Normal: text-gray-600 hover:bg-gray-50
                */}
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    index === 0
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>

          {/* Price title: font-bold text-lg mt-8 mb-4 text-gray-800 */}
          <h2 className="font-bold text-lg mt-8 mb-4 text-gray-800">
            Price Range
          </h2>

          {/* Checkbox group: space-y-3 */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-600">Under $100</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-600">$100 - $200</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-600">Over $200</span>
            </label>
          </div>
        </aside>

        {/* ==================== PRODUCT SECTION ==================== */}
        {/* Product section: flex-1 */}
        <section className="flex-1">
          {/* Section header: flex items-center justify-between mb-6 */}
          <div className="flex items-center justify-between mb-6">
            {/* Title: text-2xl font-bold text-gray-800 */}
            <h1 className="text-2xl font-bold text-gray-800">
              Featured Products
            </h1>
            {/* Count: text-sm text-gray-500 */}
            <span className="text-sm text-gray-500">
              {products.length} products
            </span>
          </div>

          {/* Product grid: grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// ====== ProductCard - ĐÃ HOÀN THIỆN ======
function ProductCard({ product }: { product: (typeof products)[0] }) {
  const isSoldOut = product.status === "soldOut";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
        <span className="text-gray-400">Product Image</span>
        {product.status !== "normal" && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold text-white rounded
            ${product.status === "new" ? "bg-green-500" : ""}
            ${product.status === "sale" ? "bg-red-500" : ""}
            ${product.status === "soldOut" ? "bg-gray-500" : ""}
          `}
          >
            {product.status === "new" && "NEW"}
            {product.status === "sale" && "SALE"}
            {product.status === "soldOut" && "SOLD OUT"}
          </span>
        )}
      </div>
      <div className="p-4 space-y-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p
          className={`text-xl font-bold ${
            isSoldOut ? "text-gray-400" : "text-gray-900"
          }`}
        >
          ${product.price}
        </p>
        <button
          disabled={isSoldOut}
          className={`w-full py-2 rounded-lg font-semibold text-sm
            ${
              isSoldOut
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
          `}
        >
          {isSoldOut ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
