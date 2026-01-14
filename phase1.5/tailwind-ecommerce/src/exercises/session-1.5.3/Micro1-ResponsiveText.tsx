/**
 * Micro Exercise 1: Responsive Text (5 phút)
 *
 * MỤC TIÊU:
 * Tạo một heading có font size thay đổi theo screen size:
 * - Mobile: text-xl
 * - Tablet (md): text-2xl
 * - Desktop (lg): text-4xl
 *
 * HƯỚNG DẪN:
 * 1. Sử dụng mobile-first approach
 * 2. Base style là cho mobile
 * 3. Thêm breakpoint prefix cho larger screens
 *
 * PATTERN:
 * className="base-style md:medium-style lg:large-style"
 */

export default function Micro1ResponsiveText() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Micro 1: Responsive Text
        </h1>

        {/* TODO: Làm heading này responsive */}
        {/* Mobile: text-xl, Tablet: text-2xl, Desktop: text-4xl */}
        <div className="  bg-white p-6 rounded-lg shadow ">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-900">
            {/* Thêm responsive classes ở đây */}
            Welcome to Our Store
          </h2>
          <p className="mt-2 text-gray-600">
            Resize browser để xem text size thay đổi
          </p>
        </div>

        {/* TODO: Làm subtitle responsive */}
        {/* Mobile: text-sm, Tablet: text-base, Desktop: text-lg */}
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm md:text-base lg:text-lg text-gray-600">
            {/* Thêm responsive classes ở đây */}
            This is a subtitle that should scale with screen size
          </p>
        </div>

        {/* BONUS: Responsive paragraph với line-height */}
        {/* Mobile: text-sm leading-relaxed */}
        {/* Desktop: text-base leading-loose */}
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-700 text-sm leading-relaxed lg:text-base leading-loose">
            {/* Thêm responsive classes ở đây */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

        {/* Current breakpoint indicator */}
        <div className="fixed bottom-4 right-4 bg-black text-white px-3 py-1 rounded text-sm">
          <span className="sm:hidden">Mobile</span>
          <span className="hidden sm:inline md:hidden">SM (640px+)</span>
          <span className="hidden md:inline lg:hidden">MD (768px+)</span>
          <span className="hidden lg:inline xl:hidden">LG (1024px+)</span>
          <span className="hidden xl:inline">XL (1280px+)</span>
        </div>
      </div>
    </div>
  );
}

/**
 * TIPS:
 *
 * 1. Mobile-first: Base class không có prefix
 *    className="text-xl md:text-2xl lg:text-4xl"
 *               ↑ mobile  ↑ 768px+   ↑ 1024px+
 *
 * 2. Đọc từ trái sang phải = nhỏ đến lớn
 *
 * 3. Breakpoints của Tailwind:
 *    - sm: 640px
 *    - md: 768px
 *    - lg: 1024px
 *    - xl: 1280px
 *    - 2xl: 1536px
 */
