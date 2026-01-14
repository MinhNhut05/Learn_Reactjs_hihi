/**
 * MINI EXERCISE: Product Price Display - SOLUTION
 */

export default function MiniPriceDisplaySolution() {
  const product = {
    name: 'Sony WH-1000XM5 Headphones',
    originalPrice: 399.99,
    salePrice: 299.99,
    discountPercent: 25,
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      {/* Product Name */}
      <h2 className="text-xl font-bold text-gray-900 mb-3">
        {product.name}
      </h2>

      {/* Price Section */}
      <div className="flex items-center gap-3 mb-2">
        {/* Sale Price - prominent */}
        <span className="text-2xl font-bold text-red-600">
          ${product.salePrice.toFixed(2)}
        </span>

        {/* Original Price - strikethrough */}
        <span className="text-lg text-gray-400 line-through">
          ${product.originalPrice.toFixed(2)}
        </span>

        {/* Sale Badge */}
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{product.discountPercent}%
        </span>
      </div>

      {/* Savings text */}
      <p className="text-sm text-green-600">
        You save ${(product.originalPrice - product.salePrice).toFixed(2)}
      </p>
    </div>
  )
}

/**
 * GIẢI THÍCH:
 *
 * 1. Container:
 *    - p-6: padding rộng rãi
 *    - bg-white: background trắng
 *    - rounded-lg: góc bo tròn
 *    - shadow-md: shadow medium cho depth
 *    - max-w-md: giới hạn max-width
 *
 * 2. Product Name (h2):
 *    - text-xl: font size 1.25rem
 *    - font-bold: nhấn mạnh tên sản phẩm
 *    - text-gray-900: màu đậm nhất cho heading
 *    - mb-3: margin-bottom tạo spacing
 *
 * 3. Price Section (flex container):
 *    - flex items-center: align items theo vertical center
 *    - gap-3: khoảng cách giữa các items
 *
 * 4. Sale Price:
 *    - text-2xl: lớn nhất trong nhóm giá
 *    - font-bold: nhấn mạnh
 *    - text-red-600: màu đỏ thu hút chú ý
 *
 * 5. Original Price:
 *    - text-lg: nhỏ hơn sale price
 *    - text-gray-400: màu nhạt, ít quan trọng hơn
 *    - line-through: gạch ngang qua giá
 *
 * 6. Sale Badge:
 *    - bg-red-500: background đỏ
 *    - text-white: text trắng contrast tốt
 *    - text-xs: font size nhỏ cho badge
 *    - font-bold: dễ đọc
 *    - px-2 py-1: padding horizontal > vertical
 *    - rounded: góc bo tròn nhẹ
 *
 * 7. Savings text:
 *    - text-sm: font nhỏ, supplementary info
 *    - text-green-600: màu xanh = positive/savings
 *
 * DESIGN PATTERNS:
 * - Sale price nổi bật nhất (size + color + weight)
 * - Original price mờ đi (lighter color + strikethrough)
 * - Badge nhỏ gọn nhưng vẫn đọc được
 * - Savings message = positive reinforcement
 */
