// =============================================================
// CHALLENGE 2: BUILD TESTIMONIAL CARD (20 phút)
// =============================================================
//
// COMPONENT HOÀN TOÀN MỚI - Chưa từng làm trước đó
//
// YÊU CẦU:
// 1. Avatar image (rounded-full)
// 2. Tên người, chức danh (job title)
// 3. Quote text (italic, có quote icon ")
// 4. Star rating (5 stars, có thể filled/empty)
// 5. Hover effect (shadow, translate)
// 6. RESPONSIVE
// 7. DARK MODE
//
// DESIGN HINTS:
// - Card layout: có thể vertical hoặc horizontal
// - Quote icon: có thể dùng text ", hoặc SVG
// - Stars: có thể dùng ★ (filled) và ☆ (empty)
// - Colors: neutral tones để quote nổi bật
//
// EVALUATION CHECKLIST:
// [ ] Design looks professional
// [ ] All elements styled correctly
// [ ] Hover effects present
// [ ] Responsive
// [ ] Reusable component
// =============================================================

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number; // 1-5
}

// Sample data để test
const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Product Manager",
    company: "TechCorp",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    quote:
      "This product has completely transformed how our team works. The attention to detail and user experience is unmatched. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Senior Developer",
    company: "StartupXYZ",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    quote:
      "I've tried many similar solutions, but nothing comes close to this. The performance and reliability are outstanding.",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Davis",
    title: "UX Designer",
    company: "DesignStudio",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    quote:
      "Beautiful design, intuitive interface, and excellent customer support. Everything you need in one package.",
    rating: 5,
  },
];

// ============================================
// 👇 CODE CỦA BẠN Ở ĐÂY 👇
// ============================================

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  // TODO: Thêm Tailwind classes vào các elements bên dưới
  //
  // CHECKLIST:
  // [ ] Card: rounded-xl, shadow, hover effects, bg, dark:bg
  // [ ] Quote icon: large size, light color
  // [ ] Quote text: italic, good line height
  // [ ] Stars: flex, yellow color
  // [ ] Avatar: rounded-full, proper size
  // [ ] Name & Title: proper hierarchy, dark mode

  return (
    // CARD CONTAINER - cần: bg-white, dark:bg-gray-800, rounded-xl, shadow-md, p-6,
    // transition-all, duration-300, hover:shadow-xl, hover:-translate-y-1
    <div className="group  rounded-lg bg-accent-50 dark:bg-gray-800 shadow-md p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-1">
      {/* QUOTE ICON - cần: text-4xl hoặc text-5xl, text-gray-200, dark:text-gray-700,
          font-serif, leading-none */}
      <div className="text-4xl text-gray-500 dark:text-teal-700 font-serif leading-none">
        "
      </div>

      {/* QUOTE TEXT - cần: text-gray-600, dark:text-gray-300, italic, mt-2,
          leading-relaxed */}
      <p className="text-gray-600 dark:text-gray-300 italic mt-2">
        {testimonial.quote}
      </p>

      {/* STAR RATING - cần: flex, gap-1, mt-4, text-yellow-400 */}
      <div className="flex gap-1 mt-4 text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>{star <= testimonial.rating ? "★" : "☆"}</span>
        ))}
      </div>

      {/* AUTHOR SECTION - cần: flex, items-center, gap-3, mt-4 */}
      <div className="flew items-center gap-3 mt-4">
        {/* AVATAR - cần: w-12, h-12, rounded-full, object-cover */}
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-l h-50 rounded-lg object-cover"
        />

        {/* NAME & TITLE */}
        <div>
          {/* NAME - cần: font-semibold, text-gray-800, dark:text-white */}
          <p className="font-semibold text-gray-800 dark:text-white mt-2">
            {testimonial.name}
          </p>

          {/* TITLE & COMPANY - cần: text-sm, text-gray-500, dark:text-gray-400 */}
          <p className="text-sm text-gray-500 dark:text-white">
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Demo Component - KHÔNG CẦN SỬA
// ============================================
export default function Challenge2Demo() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Challenge 2: Testimonial Cards
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
