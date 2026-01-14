// =============================================================
// CHALLENGE 1: REBUILD PRODUCTCARD (20 phút)
// =============================================================
//
// RULES:
// ❌ KHÔNG xem code cũ ở /components/ProductCard.tsx
// ❌ KHÔNG copy paste
// ✅ Có thể xem Tailwind docs
// ✅ Tự code từ đầu
//
// YÊU CẦU:
// 1. Card container với rounded corners, shadow
// 2. Image với aspect ratio, hover zoom effect (group pattern)
// 3. Badge "Sale" hoặc "New" ở góc
// 4. Product name, price (có giá cũ gạch ngang)
// 5. Star rating
// 6. Add to Cart button với hover/active states
// 7. RESPONSIVE: đẹp trên mobile và desktop
// 8. DARK MODE support
//
// EVALUATION CHECKLIST:
// [ ] Component renders correctly
// [ ] Responsive on mobile/desktop
// [ ] Hover effects smooth
// [ ] Dark mode works
// [ ] Code clean
// =============================================================

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  badge?: "sale" | "new";
}

// Sample data để test
const sampleProduct: Product = {
  id: 1,
  name: "Wireless Bluetooth Headphonesqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
  price: 79.99,
  originalPrice: 129.99,
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  rating: 4,
  badge: "new",
};

// ============================================
// 👇 CODE CỦA BẠN Ở ĐÂY 👇
// ============================================

export function ProductCardChallenge({ product }: { product: Product }) {
  // TODO: Thêm Tailwind classes vào các elements bên dưới
  //
  // CHECKLIST:
  // [ ] Card: rounded, shadow, overflow, bg, dark:bg
  // [ ] Image: aspect ratio, hover zoom (group pattern)
  // [ ] Badge: absolute position, colored bg
  // [ ] Title: font weight, dark mode text
  // [ ] Price: bold + line-through
  // [ ] Stars: flex, yellow color
  // [ ] Button: hover effects, transitions

  return (
    // CARD CONTAINER - cần: group, rounded-lg, shadow, overflow-hidden, bg-white, dark:bg-gray-800
    <div
      className="group rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 hover:-translate-y-1
              transition-all duration-300 ease-out
              cursor-pointer"
    >
      {/* IMAGE WRAPPER - cần: relative, overflow-hidden */}
      <div className="relative overflow-hidden">
        {/* IMAGE - cần: w-full, aspect-square, object-cover, transition, group-hover:scale-110 */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover transition-all duration-200 group-hover:scale-110"
        />

        {/* BADGE - cần: absolute, top-2, right-2, px-2, py-1, rounded-full, text-xs, font-medium, bg-red-500/bg-green-500, text-white */}
        {product.badge && (
          <span
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
              product.badge === "sale" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {product.badge === "sale" ? "Sale" : "New"}
          </span>
        )}
      </div>

      {/* CONTENT - cần: p-4 */}
      <div className="p-4">
        {/* PRODUCT NAME - cần: font-semibold, text-gray-800, dark:text-white, truncate */}
        <h3 className="font-semibold text-gray-800 dark:text-white truncate ">
          {product.name}
        </h3>

        {/* PRICE ROW - cần: flex, items-center, gap-2, mt-2 */}
        <div className="flex items-center gap-2 mt-2">
          {/* CURRENT PRICE - cần: text-lg, font-bold, text-gray-900, dark:text-white */}
          <span className="text-lg, font-bold, text-gray-900, dark:text-white">
            ${product.price}
          </span>

          {/* ORIGINAL PRICE - cần: text-sm, text-gray-500, line-through */}
          {product.originalPrice && (
            <span className="text-sm, text-gray-500, line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* STAR RATING - cần: flex, gap-1, mt-2, text-yellow-400 */}
        <div className="flex gap-1 mt-2 text-yellow-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>{star <= product.rating ? "★" : "☆"}</span>
          ))}
        </div>

        {/* BUTTON - cần: w-full, mt-4, py-2, rounded-lg, bg-blue-500, text-white, font-medium, hover:bg-blue-600, active:bg-blue-700, transition */}
        <button className="w-full mt-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 active:scale-95 transition-all duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ============================================
// Demo Component - KHÔNG CẦN SỬA
// ============================================
export default function Challenge1Demo() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Challenge 1: ProductCard
        </h1>
        <ProductCardChallenge product={sampleProduct} />
      </div>
    </div>
  );
}
