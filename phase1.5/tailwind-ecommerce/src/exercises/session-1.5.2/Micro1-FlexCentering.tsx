/**
 * MICRO EXERCISE 1: Flex Centering (5 phút)
 *
 * CHỈ CẦN THÊM TAILWIND CLASSES VÀO className=""
 */

export default function Micro1FlexCentering() {
  return (
    <div>
      {/* Container: flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 */}
      <div className="flew items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        {/* Content wrapper: text-center text-white */}
        <div className="text-center text-white bg-red-500">
          {/* Heading: text-5xl font-bold mb-4 */}
          <h1 className="text-5xl font-bold mb-4">Welcome</h1>
          {/* Paragraph: text-xl */}
          <p className="text-blue-600">Centered with Flexbox</p>
        </div>
      </div>
    </div>
  );
}
