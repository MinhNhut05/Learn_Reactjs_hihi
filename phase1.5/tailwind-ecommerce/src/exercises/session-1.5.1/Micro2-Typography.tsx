/**
 * MICRO EXERCISE 2: Typography Classes (5 phút)
 *
 * YÊU CẦU:
 * 1. Label: text-xs, gray-400, uppercase, tracking-wide
 * 2. Heading: text-2xl, font-bold, gray-800, margin-bottom
 * 3. Paragraph: text-base, gray-600, leading-relaxed
 * 4. Small text: text-sm, gray-500
 *
 * CLASSES CẦN DÙNG:
 * - Font size: text-xs, text-sm, text-base, text-2xl
 * - Font weight: font-bold
 * - Text color: text-gray-400, text-gray-500, text-gray-600, text-gray-800
 * - Line height: leading-relaxed
 * - Text transform: uppercase
 * - Letter spacing: tracking-wide
 * - Margin: mb-1, mb-2, mb-4
 */

export default function Micro2Typography() {
  return (
    <div className="p-4 bg-white rounded-lg space-y-3">
      {/* TODO: text-xs text-gray-400 uppercase tracking-wide */}
      <p className="text-xs text-gray-400 uppercase tracking-wide">
        Product Category
      </p>

      {/* TODO: text-2xl font-bold text-gray-800 */}
      <h2 className="text-2xl font-bold text-gray-800">
        Wireless Bluetooth Headphones
      </h2>

      {/* TODO: text-base text-gray-600 leading-relaxed */}
      <p className="text-base text-gray-600 leading-relaxed">
        Experience premium sound quality with our latest wireless headphones.
        Featuring active noise cancellation, 30-hour battery life, and
        ultra-comfortable ear cushions for extended listening sessions.
      </p>

      {/* TODO: text-sm text-gray-500 */}
      <p className="text-sm text-gray-500">Free shipping on orders over $50</p>
    </div>
  );
}
