/**
 * MICRO EXERCISE 1: Spacing Classes (5 phút)
 *
 * YÊU CẦU:
 * 1. Container div: padding 4, margin-top 2, margin-bottom 6, bg trắng, rounded
 * 2. Inner div: space-y-3 (khoảng cách vertical giữa paragraphs)
 * 3. Paragraphs: text màu gray-700
 *
 * CLASSES CẦN DÙNG:
 * - Padding: p-4
 * - Margin: mt-2, mb-6
 * - Background: bg-white
 * - Border radius: rounded-lg
 * - Space between: space-y-3
 * - Text color: text-gray-700
 */

export default function Micro1Spacing() {
  return (
    // TODO: Thêm classes cho container: p-4 mt-2 mb-6 bg-white rounded-lg
    <div className="p-4 mt-2 bg-white rounded-lg">
      {/* TODO: Thêm class space-y-3 */}
      <div className="space-y-3">
        {/* TODO: Thêm class text-gray-700 cho mỗi paragraph */}
        <p className="text-gray-700">
          Đây là paragraph đầu tiên. Container có padding 1rem (p-4).
        </p>
        <p className="text-gray-700">
          Đây là paragraph thứ hai. Khoảng cách với paragraph trên là 0.75rem.
        </p>
        <p className="text-gray-700">
          Đây là paragraph thứ ba. Margin-top: 0.5rem, margin-bottom: 1.5rem.
        </p>
      </div>
    </div>
  );
}
