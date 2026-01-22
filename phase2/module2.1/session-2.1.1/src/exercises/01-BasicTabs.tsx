/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * ============================================================================
 * EXERCISE 1: Basic Tabs - Compound Components với Context API
 * ============================================================================
 *
 * 🎯 MỤC TIÊU:
 * Tạo Tabs component cơ bản sử dụng Context API để share state.
 *
 * 📚 KIẾN THỨC SẼ HỌC:
 * - createContext và useContext
 * - Custom hook với error handling
 * - Cách attach sub-components vào main component
 *
 * ⏱️ THỜI GIAN: 30 phút
 *
 * 📋 YÊU CẦU:
 * 1. Tạo TabsContext với activeValue và setActiveValue
 * 2. Tạo useTabsContext hook với error handling
 * 3. Tạo Tabs root component (provider)
 * 4. Tạo TabList, Tab, TabPanels, TabPanel components
 * 5. Attach sub-components vào Tabs
 *
 * 🔍 KẾT QUẢ MONG ĐỢI:
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
 *     <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panels>
 *     <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
 *     <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
 *   </Tabs.Panels>
 * </Tabs>
 * ```
 *
 * 💡 HINTS:
 * - Xem lại THEORY.md section 4 nếu quên
 * - Context default value nên là null
 * - Custom hook phải throw error nếu context là null
 * ============================================================================
 */

import { createContext, useContext, useState, type ReactNode } from "react";

// =============================================================================
// STEP 1: Định nghĩa Types
// =============================================================================

// TODO 1.1: Định nghĩa TabsContextType
// Gợi ý: Cần có activeValue (string) và setActiveValue (function)
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
}

interface TabProps {
  children: ReactNode;
  value: string;
}

interface TabPanelsProps {
  children: ReactNode;
}

interface TabPanelProps {
  children: ReactNode;
  value: string;
}

// =============================================================================
// STEP 2: Tạo Context
// =============================================================================

// TODO 2.1: Tạo TabsContext với createContext
// Gợi ý: Default value là null, type là TabsContextType | null
// 👇 VIẾT CODE Ở ĐÂY
const TabsContext = createContext<TabsContextType | null>(null);

// =============================================================================
// STEP 3: Tạo Custom Hook
// =============================================================================

// TODO 3.1: Tạo useTabsContext hook
// Gợi ý:
// - Dùng useContext để lấy context
// - Nếu context là null, throw Error với message rõ ràng
// - Return context
function useTabsContext(): TabsContextType {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a Tabs component");
  }
  return context;
}

// =============================================================================
// STEP 4: Tạo Root Component (Provider)
// =============================================================================

// TODO 4.1: Implement Tabs root component
// Gợi ý:
// - Dùng useState với defaultValue
// - Wrap children trong TabsContext.Provider
// - Truyền value={{ activeValue, setActiveValue }}
function TabsRoot({ children, defaultValue }: TabsProps) {
  const [activeValue, setActiveValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      {children}
    </TabsContext.Provider>
  );
}

// =============================================================================
// STEP 5: Tạo Sub-components
// =============================================================================

// TODO 5.1: Implement TabList
// Gợi ý: Đơn giản chỉ cần wrap children trong một div
function TabList({ children }: TabListProps) {
  // 👇 VIẾT CODE Ở ĐÂY

  return <div className="flex">{children}</div>;
}

// TODO 5.2: Implement Tab
// Gợi ý:
// - Dùng useTabsContext() để lấy activeValue và setActiveValue
// - Check isActive = activeValue === value
// - onClick gọi setActiveValue(value)
function Tab({ children, value }: TabProps) {
  const { activeValue, setActiveValue } = useTabsContext();
  const active = activeValue === value;
  return (
    <button
      onClick={() => {
        setActiveValue(value);
      }}
      className={`px-4 py-2 ${active ? "font-bold bg-blue-100" : ""}`}
    >
      {children}
    </button>
  );
}

// TODO 5.3: Implement TabPanels
// Gợi ý: Đơn giản wrap children
function TabPanels({ children }: TabPanelsProps) {
  return <div className="mt-4">{children}</div>;
}

// TODO 5.4: Implement TabPanel
// Gợi ý:
// - Dùng useTabsContext() để lấy activeValue
// - Nếu activeValue !== value, return null (không render)
// - Nếu match, render children
function TabPanel({ children, value }: TabPanelProps) {
  const { activeValue } = useTabsContext();
  if (activeValue !== value) {
    return null;
  }
  return <div className="mt-4">{children}</div>;
}

// =============================================================================
// STEP 6: Attach Sub-components và Export
// =============================================================================

// TODO 6.1: Dùng Object.assign để attach sub-components
// Gợi ý: Object.assign(TabsRoot, { List: TabList, Tab: Tab, ... })
export const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab: Tab,
  Panels: TabPanels,
  Panel: TabPanel,
});

// =============================================================================
// TEST COMPONENT - Uncomment để test
// =============================================================================

export function Exercise01Demo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Exercise 1: Basic Tabs</h2>

      {/* Uncomment khi đã implement xong */}

      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="tab1">
            <p>This is content for Tab 1</p>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <p>This is content for Tab 2</p>
          </Tabs.Panel>
          <Tabs.Panel value="tab3">
            <p>This is content for Tab 3</p>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>

      <p className="text-gray-500 italic">
        Implement các TODO ở trên, sau đó uncomment phần test.
      </p>
    </div>
  );
}
