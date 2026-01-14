/**
 * Mini Exercise: Responsive ProductCard (15 phút)
 *
 * MỤC TIÊU:
 * Tạo ProductCard layout thay đổi theo screen size:
 *
 * MOBILE (< 768px):
 * ┌──────────────────┐
 * │    [Image]       │
 * │                  │
 * ├──────────────────┤
 * │ Title            │
 * │ Description      │
 * │ Price    [Buy]   │
 * └──────────────────┘
 *
 * DESKTOP (≥ 768px):
 * ┌──────────┬───────────────────────┐
 * │          │ Title                 │
 * │ [Image]  │ Description           │
 * │          │ Price          [Buy]  │
 * └──────────┴───────────────────────┘
 *
 * HƯỚNG DẪN:
 * 1. Mobile: flex-col (ảnh trên, info dưới)
 * 2. Desktop: flex-row (ảnh trái, info phải)
 * 3. Padding tăng theo breakpoint
 */

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description:
      "Premium noise-canceling headphones with 30-hour battery life.",
    price: 299.99,
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track your fitness, receive notifications, and more.",
    price: 199.99,
  },
  {
    id: 3,
    name: "Portable Speaker",
    description: "Waterproof Bluetooth speaker with amazing sound quality.",
    price: 79.99,
  },
];

export default function MiniResponsiveCard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Mini Exercise: Responsive ProductCard
        </h1>

        <div className="space-y-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Breakpoint indicator */}
        <div className="fixed bottom-4 right-4 bg-black text-white px-3 py-1 rounded text-sm">
          <span className="md:hidden">Mobile (flex-col)</span>
          <span className="hidden md:inline">Desktop (flex-row)</span>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    // TODO: Thêm responsive flex direction
    // Mobile: flex-col
    // Desktop: flex-row
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      {/* TODO: Responsive width
          - Mobile: w-full, h-48
          - Desktop: w-48, h-auto (hoặc w-64)
      */}
      <div className="w-full  md:w-48 h-48 md:h-auto bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
        <span className="text-4xl">📦</span>
      </div>

      {/* Content Section */}
      {/* TODO: Responsive padding
          - Mobile: p-4
          - Desktop: p-6
      */}
      <div className="p-4 md:p-6 flex-1 flex flex-col justify-between ">
        {/* TODO: Responsive text sizes */}
        <div>
          <h3 className="text-lg md:text-2xl font-semibold text-gray-900">
            {/* Mobile: text-lg, Desktop: text-xl */}
            {product.name}
          </h3>
          <p className="text-sm md:text-base mt-1 text-gray-600">
            {/* Mobile: text-sm, Desktop: text-base */}
            {product.description}
          </p>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * CHECKLIST:
 *
 * □ Card container: flex flex-col md:flex-row
 * □ Image section:
 *   - Mobile: w-full h-48
 *   - Desktop: w-48 md:w-64 h-auto (hoặc self-stretch)
 * □ Content padding: p-4 md:p-6
 * □ Title: text-lg md:text-xl
 * □ Description: text-sm md:text-base
 * □ Card có shrink-0 cho image trên desktop
 *
 * HINTS:
 * - Dùng flex-col md:flex-row trên container
 * - Image cần w-full md:w-48 hoặc md:w-64
 * - Image cần h-48 md:h-auto để responsive height
 * - Thêm shrink-0 cho image để không bị co lại
 */
