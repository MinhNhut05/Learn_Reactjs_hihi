/**
 * MICRO EXERCISE 1: Flex Centering - SOLUTION
 */

export default function Micro1FlexCenteringSolution() {
  return (
    <div>
      {/* Hero section with perfect centering */}
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome</h1>
          <p className="text-xl">Centered with Flexbox</p>
        </div>
      </div>
    </div>
  )
}

/**
 * GIẢI THÍCH CHI TIẾT:
 *
 * === CONTAINER ===
 * - flex: Tạo flex container
 * - items-center: Căn giữa theo cross axis (vertical trong flex-row)
 * - justify-center: Căn giữa theo main axis (horizontal trong flex-row)
 * - h-screen: height: 100vh - full viewport height
 * - bg-gradient-to-r: Gradient từ trái sang phải
 * - from-blue-500: Màu bắt đầu
 * - to-purple-600: Màu kết thúc
 *
 * === CONTENT ===
 * - text-center: Căn giữa text trong container
 * - text-white: Màu chữ trắng (contrast với background)
 * - text-5xl: Font size lớn cho heading (3rem)
 * - font-bold: Font weight 700
 * - mb-4: Margin bottom 1rem
 * - text-xl: Font size cho subtitle (1.25rem)
 *
 * === WHY THIS WORKS ===
 * 1. flex + items-center + justify-center = perfect centering
 * 2. h-screen cần thiết để có không gian vertical để center
 * 3. Không có h-screen, container chỉ cao bằng content -> không thấy được centering
 *
 * === ALTERNATIVE APPROACHES ===
 *
 * Method 1: Grid place-items-center
 * <div className="grid place-items-center h-screen ...">
 *
 * Method 2: Grid place-content-center
 * <div className="grid place-content-center h-screen ...">
 *
 * Method 3: Flex with margin auto
 * <div className="flex h-screen ...">
 *   <div className="m-auto">...</div>
 * </div>
 */
