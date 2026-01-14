// =============================================================
// CHALLENGE 3: DEBUG RESPONSIVE COMPONENT (20 phút)
// =============================================================
//
// Component này có NHIỀU LỖI responsive. Nhiệm vụ của bạn:
//
// 1. IDENTIFY: Tìm tất cả các lỗi
// 2. FIX: Sửa từng lỗi
// 3. TEST: Kiểm tra trên tất cả breakpoints
// 4. DOCUMENT: Ghi lại những gì đã sửa
//
// CÁC LỖI CỐ TÌNH TẠO RA:
// - Horizontal scroll on mobile
// - Text too small on mobile
// - Layout broken on tablet
// - Images not scaling
// - Buttons too close together
// - Fixed widths không responsive
// - Missing dark mode
//
// EVALUATION CHECKLIST:
// [ ] All issues identified
// [ ] All issues fixed
// [ ] Works on mobile (320px+)
// [ ] Works on tablet (768px+)
// [ ] Works on desktop (1024px+)
// =============================================================

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Thompson",
    role: "CEO & Founder",
    bio: "Alex has over 15 years of experience in tech leadership. Previously worked at Google and Microsoft before founding this company.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
    social: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Jessica Park",
    role: "CTO",
    bio: "Jessica is a full-stack developer with expertise in React, Node.js, and cloud architecture. She leads our engineering team.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "David Kim",
    role: "Lead Designer",
    bio: "David brings 10 years of UX/UI design experience. He's passionate about creating beautiful and intuitive user experiences.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Maria Garcia",
    role: "Product Manager",
    bio: "Maria has launched over 20 successful products. She ensures our roadmap aligns with customer needs and business goals.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    social: { twitter: "#", linkedin: "#" },
  },
];

// ============================================
// 🐛 COMPONENT CÓ LỖI - CẦN SỬA 🐛
// ============================================

function BrokenTeamCard({ member }: { member: TeamMember }) {
  // BUG 1: Fixed width gây horizontal scroll trên mobile
  // BUG 2: Image không scale đúng
  // BUG 3: Text quá nhỏ trên mobile
  // BUG 4: Buttons quá gần nhau
  // BUG 5: Không có dark mode
  return (
    <div className="bg-white w-full max-w-sm rounded-lg shadow p-6">
      {/* BUG: Fixed dimensions cho image */}
      <img
        src={member.image}
        alt={member.name}
        className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto"
      />

      {/* BUG: Font size cố định, quá nhỏ trên mobile */}
      <h3 className="text-center text-sm md:text-base mt-4 font-bold text-gray-900">
        {member.name}
      </h3>

      {/* BUG: Font size quá nhỏ */}
      <p className="text-s md:text-sm text-center text-blue-600">
        {member.role}
      </p>

      {/* BUG: Line height và font size gây khó đọc */}
      <p className=" leading-none mt-4 text-gray-600 text-center">
        {member.bio}
      </p>

      {/* BUG: Buttons quá gần nhau, không wrap trên mobile */}
      <div className="flex justify-center mt-4 gap-2 md:gap-3 py-1.5">
        {member.social.twitter && (
          <a
            href={member.social.twitter}
            style={{ padding: "4px 6px", fontSize: "10px" }}
            className="bg-blue-500 text-white rounded"
          >
            Twitter
          </a>
        )}
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            style={{ padding: "4px 6px", fontSize: "10px" }}
            className="bg-blue-700 text-white rounded"
          >
            LinkedIn
          </a>
        )}
        {member.social.github && (
          <a
            href={member.social.github}
            style={{ padding: "4px 6px", fontSize: "10px" }}
            className="bg-gray-800 text-white rounded"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}

function BrokenTeamSection() {
  // BUG 6: Grid không responsive
  // BUG 7: Gap quá lớn/nhỏ
  // BUG 8: Container không có max-width
  // BUG 9: Padding không responsive
  return (
    <div>
      {/* BUG: Heading không responsive */}
      <h2 style={{ fontSize: "24px" }} className="text-center font-bold mb-8">
        Meet Our Team
      </h2>

      {/* BUG: Grid 4 cột cố định, không responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <BrokenTeamCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}

// ============================================
// 👇 FIXED VERSION - CODE CỦA BẠN Ở ĐÂY 👇
// ============================================

// TODO: Sửa tất cả các lỗi trong BrokenTeamCard
// Loại bỏ TOÀN BỘ inline styles, thay bằng Tailwind classes

export function FixedTeamCard({ member }: { member: TeamMember }) {
  return (
    // CARD CONTAINER - cần: w-full (không fixed width!), bg-white, dark:bg-gray-800,
    // rounded-lg, shadow, p-4 md:p-6 (responsive padding)
    <div className="">
      {/* IMAGE - cần: w-20 h-20 md:w-24 md:h-24 (responsive size, KHÔNG inline style!),
          rounded-full, object-cover, mx-auto */}
      <img src={member.image} alt={member.name} className="" />

      {/* NAME - cần: text-base md:text-lg (responsive, min 16px!), text-center, mt-4,
          font-bold, text-gray-900, dark:text-white */}
      <h3 className="">{member.name}</h3>

      {/* ROLE - cần: text-sm md:text-base (readable size!), text-center,
          text-blue-600, dark:text-blue-400 */}
      <p className="">{member.role}</p>

      {/* BIO - cần: text-sm (min 14px!), mt-4, text-gray-600, dark:text-gray-300,
          text-center, leading-relaxed (good line height!) */}
      <p className="">{member.bio}</p>

      {/* SOCIAL BUTTONS - cần: flex flex-wrap (wrap on mobile!), justify-center,
          gap-2 md:gap-3 (proper spacing!), mt-4 */}
      <div className="">
        {member.social.twitter && (
          // BUTTON - cần: px-3 py-1.5 (proper padding!), text-sm (readable!),
          // bg-blue-500, hover:bg-blue-600, text-white, rounded, transition
          <a href={member.social.twitter} className="">
            Twitter
          </a>
        )}
        {member.social.linkedin && (
          <a href={member.social.linkedin} className="">
            LinkedIn
          </a>
        )}
        {member.social.github && (
          <a href={member.social.github} className="">
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}

export function FixedTeamSection() {
  return (
    // CONTAINER - cần: max-w-7xl (prevent too wide!), mx-auto, px-4 (side padding!)
    <div className="">
      {/* HEADING - cần: text-2xl md:text-3xl lg:text-4xl (responsive size!),
          text-center, font-bold, mb-8, text-gray-900, dark:text-white */}
      <h2 className="">Meet Our Team</h2>

      {/* GRID - cần: grid, grid-cols-1 md:grid-cols-2 lg:grid-cols-4 (responsive!),
          gap-6 (proper spacing!) */}
      <div className="">
        {teamMembers.map((member) => (
          <FixedTeamCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}

// ============================================
// Demo Component - Hiển thị cả 2 versions
// ============================================
export default function Challenge3Demo() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">
          Challenge 3: Debug Responsive
        </h1>

        {/* BROKEN VERSION */}
        <div className="mb-16">
          <div className="bg-red-100 border border-red-400 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold text-red-800">
              BROKEN VERSION (có {">"}10 lỗi responsive)
            </h2>
            <p className="text-red-600 text-sm">
              Thu nhỏ màn hình để thấy các lỗi. Scroll ngang? Text quá nhỏ?
              Layout vỡ?
            </p>
          </div>
          <BrokenTeamSection />
        </div>

        {/* FIXED VERSION */}
        <div>
          <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold text-green-800">
              YOUR FIXED VERSION
            </h2>
            <p className="text-green-600 text-sm">
              Implement FixedTeamCard và FixedTeamSection ở trên
            </p>
          </div>
          <FixedTeamSection />
        </div>

        {/* CHECKLIST */}
        <div className="mt-16 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Debug Checklist</h3>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Fixed horizontal scroll on mobile</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Text readable on mobile (min 14px)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Grid responsive (1 col mobile, 2 tablet, 4 desktop)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Images scale properly</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Buttons have proper spacing and size</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Dark mode added</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>All inline styles replaced with Tailwind</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
