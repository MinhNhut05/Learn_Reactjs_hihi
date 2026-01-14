/**
 * MINI EXERCISE: Product Grid Layout (15 phút)
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

export default function MiniProductGrid() {
  return (
    // Container: p-6 bg-gray-100 min-h-screen
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header wrapper: mb-8 */}
      <div className="mb-8">
        {/* Title: text-3xl font-bold text-gray-800 */}
        <h1 className="text-3xl font-bold text-teal-600">Featured Products</h1>
        {/* Subtitle: text-gray-500 mt-2 */}
        <p className="text-gray-500 mt-2">Discover our best-selling items</p>
      </div>

      {/* Product Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 */}
      <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
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
            className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded
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
                : "bg-blue-600 text-white"
            }
          `}
        >
          {isSoldOut ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
