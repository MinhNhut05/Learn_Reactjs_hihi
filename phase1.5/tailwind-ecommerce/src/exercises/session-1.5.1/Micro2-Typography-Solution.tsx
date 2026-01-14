/**
 * MICRO EXERCISE 2: Typography Classes - SOLUTION
 */

export default function Micro2TypographySolution() {
  return (
    <div className="p-4 bg-white rounded-lg space-y-3">
      {/* Small label - category style */}
      <p className="text-xs text-gray-400 uppercase tracking-wide">
        Product Category
      </p>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800">
        Wireless Bluetooth Headphones
      </h2>

      {/* Paragraph with relaxed line height */}
      <p className="text-base text-gray-600 leading-relaxed">
        Experience premium sound quality with our latest wireless headphones.
        Featuring active noise cancellation, 30-hour battery life, and
        ultra-comfortable ear cushions for extended listening sessions.
      </p>

      {/* Additional small text */}
      <p className="text-sm text-gray-500">
        Free shipping on orders over $50
      </p>
    </div>
  )
}

/**
 * GIẢI THÍCH:
 *
 * 1. Category label:
 *    - text-xs: font size nhỏ nhất (12px)
 *    - text-gray-400: màu nhạt cho secondary info
 *    - uppercase: chuyển thành chữ in hoa
 *    - tracking-wide: letter-spacing rộng hơn (thường dùng với uppercase)
 *
 * 2. Heading:
 *    - text-2xl: font size 1.5rem (24px) - phù hợp cho heading
 *    - font-bold: font-weight 700
 *    - text-gray-800: màu đậm, dễ đọc, tạo hierarchy
 *
 * 3. Paragraph:
 *    - text-base: font size mặc định 1rem (16px)
 *    - text-gray-600: màu vừa phải, không quá đậm
 *    - leading-relaxed: line-height 1.625 - thoáng, dễ đọc đoạn dài
 *
 * 4. Small text:
 *    - text-sm: font size 0.875rem (14px)
 *    - text-gray-500: màu trung tính
 *
 * TYPOGRAPHY HIERARCHY:
 * - Heading: Largest + Boldest + Darkest
 * - Body: Medium size + Normal weight + Medium gray
 * - Secondary: Smaller + Lighter color
 * - Labels: Smallest + Uppercase + Lightest
 */
