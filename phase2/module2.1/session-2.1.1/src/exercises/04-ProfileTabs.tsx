/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * ============================================================================
 * EXERCISE 4: ProfileTabs - Final Project
 * ============================================================================
 *
 * 🎯 MỤC TIÊU:
 * Build ProfileTabs component hoàn chỉnh cho Social App, kết hợp tất cả
 * kiến thức đã học: Context, Styling, Accessibility.
 *
 * 📚 KIẾN THỨC CẦN ÁP DỤNG:
 * - Exercise 1: Context API, useContext hook
 * - Exercise 2: Tailwind styling
 * - Exercise 3: ARIA attributes, keyboard navigation
 * - MỚI: Icon support, Badge component
 *
 * ⏱️ THỜI GIAN: 40 phút
 *
 * 📋 YÊU CẦU:
 * 1. ProfileTabs - Root component với Context
 * 2. ProfileTabs.List - TabList với keyboard navigation
 * 3. ProfileTabs.Tab - Tab với icon support
 * 4. ProfileTabs.Badge - Badge hiển thị count (99+ nếu > 99)
 * 5. ProfileTabs.Panels - Wrapper cho panels
 * 6. ProfileTabs.Panel - Individual panel
 *
 * 💡 GỢI Ý:
 * - Copy code từ Exercise 3 làm base
 * - Thêm onChange callback vào root
 * - Thêm icon prop vào Tab
 * - Tạo Badge component mới
 * ============================================================================
 */

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type KeyboardEvent,
  use,
} from "react";

// =============================================================================
// TYPES - Đã cho sẵn
// =============================================================================

interface ProfileTabsContextType {
  activeValue: string;
  setActiveValue: (value: string) => void;
  registerTab: (value: string) => void;
  getTabValues: () => string[];
}

interface ProfileTabsProps {
  children: ReactNode;
  defaultValue: string;
  onChange?: (value: string) => void; // 👈 MỚI: callback khi tab thay đổi
}

interface TabListProps {
  children: ReactNode;
  "aria-label"?: string;
}

interface TabProps {
  children: ReactNode;
  value: string;
  icon?: ReactNode; // 👈 MỚI: icon hiển thị bên trái
  disabled?: boolean;
}

interface BadgeProps {
  count: number; // 👈 MỚI: số hiển thị trong badge
}

interface TabPanelsProps {
  children: ReactNode;
}

interface TabPanelProps {
  children: ReactNode;
  value: string;
}

// =============================================================================
// TODO 1: TẠO CONTEXT VÀ HOOK
// Gợi ý: Giống Exercise 1-3
// =============================================================================

// 👇 VIẾT CODE Ở ĐÂY
const ProfileTabsContext = createContext<ProfileTabsContextType | null>(null);

function useProfileTabsContext(): ProfileTabsContextType {
  const context = useContext(ProfileTabsContext);
  if (!context) {
    throw new Error("TODO: Implement useProfileTabsContext");
  }
  return context;
}

// =============================================================================
// TODO 2: ROOT COMPONENT
// Gợi ý:
// - useState cho activeValue
// - useRef cho tabValues (để keyboard nav biết thứ tự tabs)
// - handleChange phải gọi cả setActiveValue VÀ onChange prop
// =============================================================================

function ProfileTabsRoot({
  children,
  defaultValue,
  onChange,
}: ProfileTabsProps) {
  // 👇 VIẾT CODE Ở ĐÂY
  const [activeValue, setActiveValue] = useState(defaultValue);
  const tabValuesRef = useRef<string[]>([]);
  // Placeholder - thay thế return này
  const handleChange = useCallback(
    (value: string) => {
      setActiveValue(value);
      onChange?.(value);
    },
    [onChange, setActiveValue]
  );
  const registerTab = useCallback((value: string) => {
    if (!tabValuesRef.current.includes(value)) {
      tabValuesRef.current.push(value);
    }
  }, []);
  const getTabValues = useCallback(() => tabValuesRef.current, []);
  return (
    <ProfileTabsContext.Provider
      value={{
        activeValue,
        setActiveValue: handleChange,
        registerTab,
        getTabValues,
      }}
    >
      {children}
    </ProfileTabsContext.Provider>
  );
}

// =============================================================================
// TODO 3: TAB LIST VỚI KEYBOARD NAVIGATION
// Gợi ý: Copy từ Exercise 3, thêm ARIA attributes
// =============================================================================

function TabList({
  children,
  "aria-label": ariaLabel = "Profile sections",
}: TabListProps) {
  const { activeValue, setActiveValue, getTabValues } = useProfileTabsContext();
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabValues = getTabValues();
    const currentIndex = tabValues.indexOf(activeValue);

    let newIndex: number | null = null;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabValues.length;
        break;

      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabValues.length) % tabValues.length;
        break;

      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;

      case "End":
        e.preventDefault();
        newIndex = tabValues.length - 1;
        break;
    }

    if (newIndex !== null) {
      setActiveValue(tabValues[newIndex]);
      const tabs = listRef.current?.querySelectorAll('[role="tab"]');
      const targetTab = tabs?.[newIndex] as HTMLElement;
      targetTab?.focus();
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className="flex border-b border-gray-200 overflow-x-auto"
    >
      {children}
    </div>
  );
}

// =============================================================================
// TODO 4: TAB VỚI ICON SUPPORT
// Gợi ý:
// - Giống Exercise 3 nhưng thêm:
// - Nếu có icon prop, render icon trước children
// - Dùng flex items-center gap-2 để icon và text nằm ngang
// =============================================================================

function Tab({ children, value, icon, disabled = false }: TabProps) {
  const { activeValue, setActiveValue, registerTab } = useProfileTabsContext();
  const isActive = activeValue === value;

  registerTab(value);

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      aria-disabled={disabled}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && setActiveValue(value)}
      className={`
        relative flex items-center gap-2
        px-4 py-3 text-sm font-medium whitespace-nowrap
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${
          disabled
            ? "text-gray-300 cursor-not-allowed"
            : isActive
            ? "text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }
      `}
    >
      {/* Icon */}
      {icon && (
        <span
          className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`}
        >
          {icon}
        </span>
      )}

      {/* Children (label + badge) */}
      {children}

      {/* Active indicator underline */}
      <span
        className={`
          absolute bottom-0 left-0 right-0 h-0.5
          transition-all duration-200
          ${isActive ? "bg-blue-600" : "bg-transparent"}
        `}
      />
    </button>
  );
}

// =============================================================================
// TODO 5: BADGE COMPONENT (MỚI!)
// Gợi ý:
// - Nếu count > 99, hiển thị "99+"
// - Styling: ml-1.5 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full
// =============================================================================

function Badge({ count }: BadgeProps) {
  const disPlayCount = count > 99 ? "99+" : count.toString();
  // 👇 VIẾT CODE Ở ĐÂY
  // - Format count (99+ nếu > 99)
  // - Return span với styling

  return (
    <span className="ml-1.5 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
      {disPlayCount}
    </span>
  );
}

// =============================================================================
// TODO 6: TAB PANELS VÀ TAB PANEL
// Gợi ý: Giống Exercise 3
// =============================================================================

function TabPanels({ children }: TabPanelsProps) {
  // 👇 VIẾT CODE Ở ĐÂY
  return <div className="mt-4">{children}</div>;
}

function TabPanel({ children, value }: TabPanelProps) {
  const { activeValue } = useProfileTabsContext();
  if (activeValue !== value) return null;
  <div
    role="tabpanel"
    id={`panel-${value}`}
    aria-labelledby={`tab-${value}`}
    tabIndex={0}
    className="focus:outline-none"
  >
    {children}
  </div>;
}

// =============================================================================
// TODO 7: EXPORT COMPOUND COMPONENT
// Gợi ý: Object.assign(ProfileTabsRoot, { List, Tab, Badge, ... })
// =============================================================================

export const ProfileTabs = Object.assign(ProfileTabsRoot, {
  List: TabList,
  Tab: Tab,
  Badge: Badge,
  Panels: TabPanels,
  Panel: TabPanel,
});

// =============================================================================
// ICONS - Đã cho sẵn, không cần sửa
// =============================================================================

function PostIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}

// =============================================================================
// TEST COMPONENT - Sẽ hoạt động khi bạn implement xong
// =============================================================================

export function Exercise04Demo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Exercise 4: ProfileTabs</h2>

      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-6">
        <p className="text-yellow-800 font-medium">
          ⚠️ Bài tập chưa hoàn thành!
        </p>
        <p className="text-yellow-700 text-sm mt-1">
          Implement các TODO ở trên để component hoạt động.
        </p>
      </div>

      {/* Profile Header Mock */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
          <p className="text-gray-500">@johndoe</p>
        </div>
      </div>

      {/* Uncomment khi implement xong */}

      <ProfileTabs
        defaultValue="posts"
        onChange={(v) => console.log("Tab:", v)}
      >
        <ProfileTabs.List>
          <ProfileTabs.Tab value="posts" icon={<PostIcon />}>
            Posts
            <ProfileTabs.Badge count={42} />
          </ProfileTabs.Tab>

          <ProfileTabs.Tab value="about" icon={<InfoIcon />}>
            About
          </ProfileTabs.Tab>

          <ProfileTabs.Tab value="friends" icon={<UsersIcon />}>
            Friends
            <ProfileTabs.Badge count={128} />
          </ProfileTabs.Tab>

          <ProfileTabs.Tab value="photos" icon={<PhotoIcon />}>
            Photos
            <ProfileTabs.Badge count={56} />
          </ProfileTabs.Tab>
        </ProfileTabs.List>

        <ProfileTabs.Panels>
          <ProfileTabs.Panel value="posts">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">This is post #{i}</p>
                </div>
              ))}
            </div>
          </ProfileTabs.Panel>

          <ProfileTabs.Panel value="about">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                Software Developer | React enthusiast
              </p>
            </div>
          </ProfileTabs.Panel>

          <ProfileTabs.Panel value="friends">
            <div className="grid grid-cols-2 gap-4">
              {["Alice", "Bob", "Carol", "David"].map((name) => (
                <div key={name} className="p-4 bg-gray-50 rounded-lg">
                  {name}
                </div>
              ))}
            </div>
          </ProfileTabs.Panel>

          <ProfileTabs.Panel value="photos">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
              ))}
            </div>
          </ProfileTabs.Panel>
        </ProfileTabs.Panels>
      </ProfileTabs>

      {/* Checklist */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Checklist:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>☐ Context và useProfileTabsContext hook</li>
          <li>☐ ProfileTabsRoot với onChange callback</li>
          <li>☐ TabList với keyboard navigation</li>
          <li>☐ Tab với icon support</li>
          <li>☐ Badge với 99+ logic</li>
          <li>☐ TabPanels và TabPanel với ARIA</li>
          <li>☐ Object.assign để tạo compound component</li>
        </ul>
      </div>
    </div>
  );
}
