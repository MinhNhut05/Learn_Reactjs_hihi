/**
 * MINI EXERCISE: Interactive Product Card - SOLUTION
 * Session 1.5.4 - States & Interactivity
 */

interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image?: string
}

const sampleProduct: Product = {
  id: 1,
  name: 'Wireless Headphones',
  category: 'Electronics',
  price: 199.99,
  originalPrice: 249.99,
}

export default function MiniInteractiveCardSolution() {
  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">
        Mini: Interactive Product Card - Solution
      </h2>

      <div className="flex gap-8 flex-wrap">
        {/* Solution Card */}
        <div className="max-w-sm">
          <h3 className="text-sm font-medium text-green-600 mb-2">Complete Solution:</h3>

          {/* SOLUTION: Card với đầy đủ interactivity */}
          <div
            className="
              group
              bg-white rounded-lg shadow-md overflow-hidden
              hover:shadow-xl
              hover:-translate-y-1
              transition-all duration-300 ease-out
              cursor-pointer
            "
          >
            {/* Image Section với group-hover scale */}
            <div className="overflow-hidden">
              <div
                className="
                  h-48 bg-gradient-to-br from-blue-100 to-blue-300
                  flex items-center justify-center
                  group-hover:scale-105
                  transition-transform duration-500 ease-out
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

              {/* Title với color change on hover */}
              <h3
                className="
                  text-lg font-semibold text-gray-900 leading-tight
                  group-hover:text-blue-600
                  transition-colors duration-200
                "
              >
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

              {/* Button với full states */}
              <button
                className="
                  w-full py-2 px-4 rounded-lg font-semibold text-sm
                  bg-blue-600 text-white
                  hover:bg-blue-700
                  hover:shadow-md
                  active:scale-95
                  active:bg-blue-800
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:ring-offset-2
                  transition-all duration-200
                "
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Code Explanation */}
      <div className="max-w-2xl p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Key Classes Used:</h3>

        <div className="space-y-4 text-sm">
          {/* Card Container */}
          <div>
            <p className="font-medium text-gray-800 mb-1">1. Card Container:</p>
            <code className="block bg-gray-100 p-2 rounded text-xs">
              group hover:shadow-xl hover:-translate-y-1 transition-all duration-300
            </code>
            <p className="text-gray-600 mt-1">
              - <code>group</code>: Enable group pattern cho children
              - <code>hover:shadow-xl</code>: Shadow lớn hơn
              - <code>hover:-translate-y-1</code>: Nâng lên 4px
            </p>
          </div>

          {/* Image */}
          <div>
            <p className="font-medium text-gray-800 mb-1">2. Image:</p>
            <code className="block bg-gray-100 p-2 rounded text-xs">
              group-hover:scale-105 transition-transform duration-500
            </code>
            <p className="text-gray-600 mt-1">
              - Scale 105% khi parent (card) được hover
              - Wrapper cần <code>overflow-hidden</code>
            </p>
          </div>

          {/* Button */}
          <div>
            <p className="font-medium text-gray-800 mb-1">3. Button:</p>
            <code className="block bg-gray-100 p-2 rounded text-xs">
              hover:bg-blue-700 active:scale-95 transition-all duration-200
            </code>
            <p className="text-gray-600 mt-1">
              - Hover: màu đậm hơn + shadow
              - Active: thu nhỏ 5%
            </p>
          </div>
        </div>
      </div>

      {/* Completed Checklist */}
      <div className="max-w-2xl p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-700 mb-2">✓ Completed Checklist:</h3>
        <ul className="text-sm text-green-600 space-y-1">
          <li>✓ Card có class "group"</li>
          <li>✓ Card nâng lên khi hover (hover:-translate-y-1)</li>
          <li>✓ Shadow lớn hơn khi hover (hover:shadow-xl)</li>
          <li>✓ Image scale lên khi hover card (group-hover:scale-105)</li>
          <li>✓ Image wrapper có overflow-hidden</li>
          <li>✓ Title đổi màu khi hover card (group-hover:text-blue-600)</li>
          <li>✓ Button đổi màu khi hover (hover:bg-blue-700)</li>
          <li>✓ Button thu nhỏ khi click (active:scale-95)</li>
          <li>✓ Button có focus ring cho accessibility</li>
          <li>✓ Tất cả có transition smooth</li>
        </ul>
      </div>
    </div>
  )
}
