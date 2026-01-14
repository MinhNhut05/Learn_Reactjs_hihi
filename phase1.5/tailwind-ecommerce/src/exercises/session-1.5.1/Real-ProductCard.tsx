/**
 * REAL EXERCISE: Product Card E-commerce (45-60 phút)
 *
 * CLASSES CẦN DÙNG:
 *
 * Card container: bg-white rounded-lg shadow-md overflow-hidden max-w-sm
 * Image section: relative h-48 bg-gray-200
 * Image placeholder: w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300
 * Badge: absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded
 *   - NEW: bg-green-500
 *   - SALE: bg-red-500
 *   - SOLD OUT: bg-gray-500
 * Content section: p-4 space-y-3
 * Category: text-xs text-gray-400 uppercase tracking-wide
 * Product name: text-lg font-semibold text-gray-900 leading-tight
 * Description: text-sm text-gray-500 leading-relaxed
 * Rating container: flex items-center gap-2
 * Stars: text-yellow-400 text-sm (filled), text-gray-300 text-sm (empty)
 * Rating text: text-sm text-gray-500
 * Price container: flex items-center gap-2
 * Current price: text-xl font-bold text-gray-900
 * Original price (sale): text-sm text-gray-400 line-through
 * Button: w-full py-2 px-4 rounded-lg font-semibold text-sm
 *   - Normal: bg-blue-600 text-white
 *   - Disabled: bg-gray-300 text-gray-500 cursor-not-allowed
 */



interface Product {
  id: number;
  name: string;
  category: string;
  description?: string;
  originalPrice: number;
  currentPrice: number;
  rating: number;
  reviewCount: number;
  status: "new" | "sale" | "soldOut" | "normal";
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    category: "Electronics",
    description: "Premium sound quality with 30-hour battery life",
    originalPrice: 349.99,
    currentPrice: 249.99,
    rating: 4.5,
    reviewCount: 128,
    status: "sale",
  },
  {
    id: 2,
    name: "Smart Fitness Watch Pro",
    category: "Wearables",
    description: "Track your health and fitness goals",
    originalPrice: 299.99,
    currentPrice: 299.99,
    rating: 4.8,
    reviewCount: 256,
    status: "new",
  },
  {
    id: 3,
    name: "Vintage Leather Backpack",
    category: "Accessories",
    originalPrice: 129.99,
    currentPrice: 129.99,
    rating: 4.2,
    reviewCount: 64,
    status: "soldOut",
  },
  {
    id: 4,
    name: "minh nhut",
    category: "next",
    originalPrice: 19.99,
    currentPrice: 19.99,
    rating: 5.0,
    reviewCount: 54,
    status: "normal",
  },
];

export default function RealProductCard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const isOnSale = product.status === "sale";
  const isSoldOut = product.status === "soldOut";
  const discountPercent = isOnSale
    ? Math.round((1 - product.currentPrice / product.originalPrice) * 100)
    : 0;

  return (
    // TODO: bg-white rounded-lg shadow-md overflow-hidden max-w-sm
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
      {/* Image Section */}
      {/* TODO: relative h-48 bg-gray-200 */}
      <div className="relative h-48 bg-gray-200">
        {/* Placeholder */}
        {/* TODO: w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
          <span className="text-gray-400 text-sm">Product Image</span>
        </div>

        {/* Badge - chỉ hiển thị nếu không phải 'normal' */}
        {product.status !== "normal" && (
          // TODO: absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded
          // + bg-green-500 (new) / bg-red-500 (sale) / bg-gray-500 (soldOut)
          <span
            className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded ${
              product.status === "new"
                ? "bg-green-500"
                : product.status === "sale"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          >
            {product.status === "new" && "NEW"}
            {product.status === "sale" && `-${discountPercent}%`}
            {product.status === "soldOut" && "SOLD OUT"}
          </span>
        )}
      </div>

      {/* Content Section */}
      {/* TODO: p-4 space-y-3 */}
      <div className="p-4 space-y-3s">
        {/* Category */}
        {/* TODO: text-xs text-gray-400 uppercase tracking-wide */}
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Product Name */}
        {/* TODO: text-lg font-semibold text-gray-900 leading-tight */}
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          // TODO: text-sm text-gray-500 leading-relaxed
          <p className="text-sm text-gray-500 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Rating */}
        {/* TODO container: flex items-center gap-2 */}
        <div className="flex items-center gap-2">
          {/* Stars */}
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              // TODO: text-yellow-400 text-sm (if star <= rating) else text-gray-300 text-sm
              <span
                key={star}
                className={`${
                  star <= product.rating
                    ? "text-yellow-400 text-sm"
                    : "text-gray-300 text-sm"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          {/* TODO: text-sm text-gray-500 */}
          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        {/* TODO: flex items-center gap-2 */}
        <div className="flex items-center gap-2">
          {/* TODO: text-xl font-bold + (isSoldOut ? text-gray-400 : text-gray-900) */}
          <span
            className={`text-xl font-bold ${
              isSoldOut ? "text-gray-400" : "text-gray-900"
            }`}
          >
            ${product.currentPrice.toFixed(2)}
          </span>

          {isOnSale && (
            // TODO: text-sm text-gray-400 line-through
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Button */}
        {/* TODO: w-full py-2 px-4 rounded-lg font-semibold text-sm */}
        {/* + (isSoldOut ? bg-gray-300 text-gray-500 cursor-not-allowed : bg-blue-600 text-white) */}
        <button
          disabled={isSoldOut}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-sm ${
            isSoldOut
              ? "bg-gray-300 text-gray-500 cursor-not-allowed "
              : "bg-blue-600 text-white"
          }`}
        >
          {isSoldOut ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
