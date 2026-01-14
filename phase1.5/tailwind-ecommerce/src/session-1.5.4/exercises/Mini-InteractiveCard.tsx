/**
 * MINI EXERCISE: Interactive Product Card
 * Session 1.5.4 - States & Interactivity
 *
 * MỤC TIÊU: Tạo Product Card với đầy đủ hover effects
 *
 * YÊU CẦU:
 * 1. Card: hover → shadow lớn hơn, di chuyển lên trên
 * 2. Image: hover vào card → image scale lên (dùng GROUP PATTERN)
 * 3. Button Add to Cart: hover/active states
 * 4. Tất cả có transition smooth
 *
 * THỜI GIAN: 15 phút
 *
 * CONCEPTS:
 * - group pattern (parent controls children)
 * - hover:shadow-xl
 * - hover:-translate-y-1
 * - group-hover:scale-105
 * - transition-all / transition-transform
 */

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image?: string;
}

const sampleProduct: Product = {
  id: 1,
  name: "Wireless Headphones",
  category: "Electronics",
  price: 199.99,
  originalPrice: 249.99,
};

export default function MiniInteractiveCard() {
  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">
        Mini: Interactive Product Card
      </h2>

      <div className="flex gap-8">
        {/* TODO Card - Thêm interactivity */}
        <div className="max-w-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Your Card:</h3>

          {/*
            TODO: Hoàn thiện card này với:

            1. CARD CONTAINER:
               - Thêm class "group" để enable group pattern
               - hover:shadow-xl (shadow lớn hơn)
               - hover:-translate-y-1 (nâng lên)
               - transition-all duration-300

            2. IMAGE SECTION:
               - group-hover:scale-105 (zoom khi hover card)
               - transition-transform duration-300
               - Wrapper cần overflow-hidden để ẩn phần scale ra ngoài

            3. ADD TO CART BUTTON:
               - hover:bg-blue-700
               - active:scale-95
               - transition-all duration-200
          */}
          <div
            className=" group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
              bg-white rounded-lg shadow-md overflow-hidden
            "
          >
            {/* Image Section */}
            <div className="overflow-hidden">
              <div
                className="
                  h-48 bg-gradient-to-br from-gray-100 to-gray-300
                  flex items-center justify-center group-hover:scale-130 transition-all duration-200
                "
              >
                <span className="text-gray-400">Product Image</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide group-hover:text-amber-600 active:scale-95 transition-all duration-200">
                {sampleProduct.category}
              </p>

              <h3 className="text-lg font-semibold text-gray-900">
                {sampleProduct.name}
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ${sampleProduct.price}
                </span>
                {sampleProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${sampleProduct.originalPrice}
                  </span>
                )}
              </div>

              {/* Add to Cart Button - Thêm hover/active states */}
              <button
                className="
                  w-full py-2 px-4 rounded-lg font-semibold text-sm
                  bg-blue-600 text-white group-hover:bg-accent-500 active:scale-90 transition-all duration-200 
                "
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reference Card */}
        <div className="max-w-sm">
          <h3 className="text-sm font-medium text-green-600 mb-2">
            Reference (hover me):
          </h3>

          <div
            className="
              group
              bg-white rounded-lg shadow-md overflow-hidden
              hover:shadow-xl hover:-translate-y-1
              transition-all duration-300 ease-out
              cursor-pointer
            "
          >
            {/* Image Section */}
            <div className="overflow-hidden">
              <div
                className="
                  h-48 bg-gradient-to-br from-blue-100 to-blue-300
                  flex items-center justify-center
                  group-hover:scale-105
                  transition-transform duration-300
                "
              >
                <span className="text-blue-400">Product Image</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                {sampleProduct.category}
              </p>

              <h3 className="text-lg font-semibold text-gray-900">
                {sampleProduct.name}
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ${sampleProduct.price}
                </span>
                {sampleProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${sampleProduct.originalPrice}
                  </span>
                )}
              </div>

              <button
                className="
                  w-full py-2 px-4 rounded-lg font-semibold text-sm
                  bg-blue-600 text-white
                  hover:bg-blue-700
                  active:scale-95
                  transition-all duration-200
                "
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="max-w-2xl p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-2">Checklist:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>☐ Card có class "group"</li>
          <li>☐ Card nâng lên khi hover (hover:-translate-y-1)</li>
          <li>☐ Shadow lớn hơn khi hover (hover:shadow-xl)</li>
          <li>☐ Image scale lên khi hover card (group-hover:scale-105)</li>
          <li>☐ Image wrapper có overflow-hidden</li>
          <li>☐ Button đổi màu khi hover</li>
          <li>☐ Button thu nhỏ khi click (active:scale-95)</li>
          <li>☐ Tất cả có transition smooth</li>
        </ul>
      </div>
    </div>
  );
}
