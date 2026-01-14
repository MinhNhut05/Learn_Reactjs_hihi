/**
 * MINI EXERCISE: Product Price Display (15-20 phút)
 *
 * YÊU CẦU:
 * 1. Container: p-6, bg-white, rounded-lg, shadow-md, max-w-md
 * 2. Product name: text-xl, font-bold, text-gray-900, mb-3
 * 3. Price section (flex container): flex, items-center, gap-3, mb-2
 * 4. Sale price: text-2xl, font-bold, text-red-600
 * 5. Original price: text-lg, text-gray-400, line-through
 * 6. Sale badge: bg-red-500, text-white, text-xs, font-bold, px-2, py-1, rounded
 * 7. Savings text: text-sm, text-green-600
 */

export default function MiniPriceDisplay() {
  const product = {
    name: "Sony WH-1000XM5 Headphones",
    originalPrice: 399.99,
    salePrice: 299.99,
    discountPercent: 25,
  };

  return (
    // TODO: p-6 bg-white rounded-lg shadow-md max-w-md
    <div className="text-xl font-bold text-gray-900 mb-3">
      {/* Product Name */}
      {/* TODO: text-xl font-bold text-gray-900 mb-3 */}
      <h2 className="font-bold text-gray-900 mb-3">{product.name}</h2>

      {/* Price Section */}
      {/* TODO: flex items-center gap-3 mb-2 */}
      <div className="items-center gap-3 mb-2">
        {/* Sale Price */}
        {/* TODO: text-2xl font-bold text-red-600 */}
        <span className="text-2xl font-bold text-red-600">
          ${product.salePrice.toFixed(2)}
        </span>

        {/* Original Price */}
        {/* TODO: text-lg text-gray-400 line-through */}
        <span className="text-lg text-gray-400 line-through">
          ${product.originalPrice.toFixed(2)}
        </span>

        {/* Sale Badge */}
        {/* TODO: bg-red-500 text-white text-xs font-bold px-2 py-1 rounded */}
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{product.discountPercent}%
        </span>
      </div>

      {/* Savings text */}
      {/* TODO: text-sm text-green-600 */}
      <p className="text-sm text-green-600">
        You save ${(product.originalPrice - product.salePrice).toFixed(2)}
      </p>
    </div>
  );
}
