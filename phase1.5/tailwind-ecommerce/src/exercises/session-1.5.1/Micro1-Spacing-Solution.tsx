/**
 * MICRO EXERCISE 1: Spacing Classes - SOLUTION
 */

export default function Micro1SpacingSolution() {
  return (
    <div className="p-4 mt-2 mb-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-3">
        <p className="text-gray-700">
          Đây là paragraph đầu tiên. Container này có padding 1rem (p-4).
        </p>
        <p className="text-gray-700">
          Đây là paragraph thứ hai. Khoảng cách với paragraph trên là 0.75rem (space-y-3).
        </p>
        <p className="text-gray-700">
          Đây là paragraph thứ ba. Margin-top của container là 0.5rem (mt-2),
          margin-bottom là 1.5rem (mb-6).
        </p>
      </div>
    </div>
  )
}

/**
 * GIẢI THÍCH:
 *
 * 1. Container div:
 *    - p-4: padding 1rem (16px) tất cả 4 phía
 *    - mt-2: margin-top 0.5rem (8px)
 *    - mb-6: margin-bottom 1.5rem (24px)
 *    - bg-white: background màu trắng
 *    - rounded-lg: border-radius lớn
 *    - shadow-sm: subtle shadow (bonus)
 *
 * 2. Inner div với space-y-3:
 *    - space-y-3: tự động thêm margin-top 0.75rem (12px)
 *      cho tất cả children TRỪ child đầu tiên
 *
 * 3. Paragraphs:
 *    - text-gray-700: màu text dễ đọc
 *
 * LƯU Ý:
 * - space-y-* cần một wrapper div để hoạt động
 * - Có thể dùng trực tiếp trên container nếu structure cho phép
 */
