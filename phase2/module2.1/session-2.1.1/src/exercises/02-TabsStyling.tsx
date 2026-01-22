/**
 * ============================================================================
 * EXERCISE 2: Tabs Styling với Tailwind CSS
 * ============================================================================
 *
 * 🎯 MỤC TIÊU:
 * Thêm styling cho Tabs component bằng Tailwind CSS.
 *
 * 📚 KIẾN THỨC SẼ HỌC:
 * - Conditional classes dựa trên state
 * - Active/inactive styling
 * - Hover và transition effects
 *
 * ⏱️ THỜI GIAN: 20 phút
 *
 * 📋 YÊU CẦU:
 * 1. TabList có border-bottom
 * 2. Tab có hover effect
 * 3. Active tab có màu khác và underline
 * 4. Panel có padding và background nhẹ
 * 5. Transition mượt mà
 *
 * 🎨 DESIGN SPECS:
 * - Active tab: text-blue-600, border-bottom blue
 * - Inactive tab: text-gray-500, hover:text-gray-700
 * - Tab: px-4 py-2
 * - Panel: mt-4 p-4 bg-gray-50 rounded
 * ============================================================================
 */

import { createContext, useContext, useState, type ReactNode } from "react";

// =============================================================================
// TYPES (Đã có sẵn)
// =============================================================================

interface TabsContextType {
  activeValue: string;
  setActiveValue: (value: string) => void;
}

interface TabsProps {
  children: ReactNode;
  defaultValue: string;
}

interface TabListProps {
  children: ReactNode;
  className?: string;
}

interface TabProps {
  children: ReactNode;
  value: string;
  className?: string;
}

interface TabPanelsProps {
  children: ReactNode;
  className?: string;
}

interface TabPanelProps {
  children: ReactNode;
  value: string;
  className?: string;
}

// =============================================================================
// CONTEXT & HOOK (Copy từ Exercise 1 hoặc implement lại)
// =============================================================================

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext(): TabsContextType {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within <Tabs>");
  }
  return context;
}

// =============================================================================
// ROOT COMPONENT
// =============================================================================

function TabsRoot({ children, defaultValue }: TabsProps) {
  const [activeValue, setActiveValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

// =============================================================================
// STYLED COMPONENTS - Thêm Tailwind Classes
// =============================================================================

// TODO 1: Thêm styling cho TabList
// Gợi ý:
// - flex để items nằm ngang
// - border-b border-gray-200 để có đường kẻ dưới
// - gap-1 hoặc gap-2 để có khoảng cách giữa tabs
function TabList({ children, className = "" }: TabListProps) {
  return (
    <div
      className={`flex border-b border-gray-200 gap-1

        ${className}
      `}
    >
      {children}
    </div>
  );
}

// TODO 2: Thêm styling cho Tab
// Gợi ý:
// - px-4 py-2 cho padding
// - text-sm font-medium
// - transition-colors duration-200
// - Conditional: isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
// - -mb-px để underline đè lên border của TabList
function Tab({ children, value, className = "" }: TabProps) {
  const { activeValue, setActiveValue } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <button
      onClick={() => setActiveValue(value)}
      className={`
         px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px
        ${
          isActive
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// TODO 3: Thêm styling cho TabPanels
// Gợi ý: mt-4 để có margin top
function TabPanels({ children, className = "" }: TabPanelsProps) {
  return (
    <div
      className={` mt-4

        ${className}
      `}
    >
      {children}
    </div>
  );
}

// TODO 4: Thêm styling cho TabPanel
// Gợi ý:
// - p-4 cho padding
// - bg-gray-50 rounded cho background
function TabPanel({ children, value, className = "" }: TabPanelProps) {
  const { activeValue } = useTabsContext();

  if (activeValue !== value) return null;

  return (
    <div
      className={` p-4 bg-gray-50 rounded

        ${className}
      `}
    >
      {children}
    </div>
  );
}

// =============================================================================
// EXPORT
// =============================================================================

export const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab: Tab,
  Panels: TabPanels,
  Panel: TabPanel,
});

// =============================================================================
// TEST COMPONENT
// =============================================================================

export function Exercise02Demo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Exercise 2: Tabs Styling</h2>

      <Tabs defaultValue="posts">
        <Tabs.List>
          <Tabs.Tab value="posts">Posts</Tabs.Tab>
          <Tabs.Tab value="about">About</Tabs.Tab>
          <Tabs.Tab value="friends">Friends</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="posts">
            <h3 className="font-medium text-gray-900 mb-2">Posts</h3>
            <p className="text-gray-600">
              Your posts will appear here. This panel should have a gray
              background.
            </p>
          </Tabs.Panel>
          <Tabs.Panel value="about">
            <h3 className="font-medium text-gray-900 mb-2">About</h3>
            <p className="text-gray-600">
              Information about you. Try switching tabs to see the active
              styling.
            </p>
          </Tabs.Panel>
          <Tabs.Panel value="friends">
            <h3 className="font-medium text-gray-900 mb-2">Friends</h3>
            <p className="text-gray-600">
              Your friends list. Hover over inactive tabs to see hover effect.
            </p>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>

      <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Check:</strong> Active tab có màu xanh và underline? Inactive
          tabs có hover effect?
        </p>
      </div>
    </div>
  );
}
