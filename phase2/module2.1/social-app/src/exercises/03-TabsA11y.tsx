/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * ============================================================================
 * EXERCISE 3: Tabs Accessibility (A11y)
 * ============================================================================
 *
 * 🎯 MỤC TIÊU:
 * Thêm accessibility attributes và keyboard navigation cho Tabs.
 *
 * 📚 KIẾN THỨC SẼ HỌC:
 * - ARIA attributes (role, aria-selected, aria-controls, etc.)
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Focus management
 * - Screen reader support
 *
 * ⏱️ THỜI GIAN: 20 phút
 *
 * 📋 YÊU CẦU:
 *
 * TabList:
 * - role="tablist"
 * - aria-label="Tab navigation"
 *
 * Tab:
 * - role="tab"
 * - aria-selected={isActive}
 * - aria-controls={`panel-${value}`}
 * - id={`tab-${value}`}
 * - tabIndex={isActive ? 0 : -1}
 *
 * TabPanel:
 * - role="tabpanel"
 * - id={`panel-${value}`}
 * - aria-labelledby={`tab-${value}`}
 *
 * Keyboard Navigation:
 * - ArrowRight/ArrowDown: Next tab
 * - ArrowLeft/ArrowUp: Previous tab
 * - Home: First tab
 * - End: Last tab
 *
 * 💡 TIPS:
 * - Xem WAI-ARIA Tabs Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
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
} from 'react'

// =============================================================================
// TYPES
// =============================================================================

interface TabsContextType {
  activeValue: string
  setActiveValue: (value: string) => void
  registerTab: (value: string) => void
  getTabValues: () => string[]
}

interface TabsProps {
  children: ReactNode
  defaultValue: string
}

interface TabListProps {
  children: ReactNode
  'aria-label'?: string
}

interface TabProps {
  children: ReactNode
  value: string
}

interface TabPanelsProps {
  children: ReactNode
}

interface TabPanelProps {
  children: ReactNode
  value: string
}

// =============================================================================
// CONTEXT & HOOK
// =============================================================================

const TabsContext = createContext<TabsContextType | null>(null)

function useTabsContext(): TabsContextType {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within <Tabs>')
  }
  return context
}

// =============================================================================
// ROOT COMPONENT - Với tab registration
// =============================================================================

function TabsRoot({ children, defaultValue }: TabsProps) {
  const [activeValue, setActiveValue] = useState(defaultValue)
  const tabValuesRef = useRef<string[]>([])

  const registerTab = useCallback((value: string) => {
    if (!tabValuesRef.current.includes(value)) {
      tabValuesRef.current.push(value)
    }
  }, [])

  const getTabValues = useCallback(() => tabValuesRef.current, [])

  return (
    <TabsContext.Provider
      value={{ activeValue, setActiveValue, registerTab, getTabValues }}
    >
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  )
}

// =============================================================================
// TABLIST - Với Keyboard Navigation
// =============================================================================

// TODO 1: Thêm ARIA attributes và keyboard navigation
// Gợi ý:
// - role="tablist"
// - aria-label prop
// - onKeyDown handler cho keyboard navigation
function TabList({
  children,
  'aria-label': ariaLabel = 'Tab navigation',
}: TabListProps) {
  const { activeValue, setActiveValue, getTabValues } = useTabsContext()
  const listRef = useRef<HTMLDivElement>(null)

  // TODO 1.1: Implement handleKeyDown
  // Gợi ý:
  // - ArrowRight/ArrowDown: (currentIndex + 1) % length
  // - ArrowLeft/ArrowUp: (currentIndex - 1 + length) % length
  // - Home: index = 0
  // - End: index = length - 1
  // - Sau khi đổi tab, focus vào tab mới
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabValues = getTabValues()
    const currentIndex = tabValues.indexOf(activeValue)

    let newIndex: number | null = null

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        // 👇 VIẾT CODE Ở ĐÂY
        break

      case 'ArrowLeft':
      case 'ArrowUp':
        // 👇 VIẾT CODE Ở ĐÂY
        break

      case 'Home':
        // 👇 VIẾT CODE Ở ĐÂY
        break

      case 'End':
        // 👇 VIẾT CODE Ở ĐÂY
        break
    }

    if (newIndex !== null) {
      e.preventDefault()
      setActiveValue(tabValues[newIndex])

      // Focus vào tab mới
      const tabs = listRef.current?.querySelectorAll('[role="tab"]')
      const targetTab = tabs?.[newIndex] as HTMLElement
      targetTab?.focus()
    }
  }

  return (
    <div
      ref={listRef}
      // TODO 1.2: Thêm role và aria-label
      // 👇 THÊM ATTRIBUTES Ở ĐÂY

      onKeyDown={handleKeyDown}
      className="flex border-b border-gray-200"
    >
      {children}
    </div>
  )
}

// =============================================================================
// TAB - Với ARIA Attributes
// =============================================================================

// TODO 2: Thêm ARIA attributes cho Tab
function Tab({ children, value }: TabProps) {
  const { activeValue, setActiveValue, registerTab } = useTabsContext()
  const isActive = activeValue === value

  // Register tab value
  registerTab(value)

  return (
    <button
      // TODO 2.1: Thêm các ARIA attributes
      // 👇 THÊM ATTRIBUTES Ở ĐÂY
      // role="tab"
      // aria-selected={isActive}
      // aria-controls={`panel-${value}`}
      // id={`tab-${value}`}
      // tabIndex={isActive ? 0 : -1}

      onClick={() => setActiveValue(value)}
      className={`
        px-4 py-2 text-sm font-medium transition-colors -mb-px
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${isActive
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
        }
      `}
    >
      {children}
    </button>
  )
}

// =============================================================================
// TAB PANELS
// =============================================================================

function TabPanels({ children }: TabPanelsProps) {
  return <div className="mt-4">{children}</div>
}

// =============================================================================
// TAB PANEL - Với ARIA Attributes
// =============================================================================

// TODO 3: Thêm ARIA attributes cho TabPanel
function TabPanel({ children, value }: TabPanelProps) {
  const { activeValue } = useTabsContext()

  if (activeValue !== value) return null

  return (
    <div
      // TODO 3.1: Thêm các ARIA attributes
      // 👇 THÊM ATTRIBUTES Ở ĐÂY
      // role="tabpanel"
      // id={`panel-${value}`}
      // aria-labelledby={`tab-${value}`}
      // tabIndex={0}

      className="p-4 bg-gray-50 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {children}
    </div>
  )
}

// =============================================================================
// EXPORT
// =============================================================================

export const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab: Tab,
  Panels: TabPanels,
  Panel: TabPanel,
})

// =============================================================================
// TEST COMPONENT
// =============================================================================

export function Exercise03Demo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Exercise 3: Tabs Accessibility</h2>

      <Tabs defaultValue="tab1">
        <Tabs.List aria-label="Demo tabs">
          <Tabs.Tab value="tab1">First</Tabs.Tab>
          <Tabs.Tab value="tab2">Second</Tabs.Tab>
          <Tabs.Tab value="tab3">Third</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="tab1">
            <p>First panel content. Try using arrow keys to navigate!</p>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <p>Second panel content. Press Home to go to first tab.</p>
          </Tabs.Panel>
          <Tabs.Panel value="tab3">
            <p>Third panel content. Press End to go to last tab.</p>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>

      <div className="mt-6 space-y-2">
        <div className="p-3 bg-blue-50 rounded border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Test Keyboard:</strong>
          </p>
          <ul className="text-sm text-blue-700 mt-1 space-y-1">
            <li>• Arrow Right/Left: Chuyển tab</li>
            <li>• Home: Tab đầu tiên</li>
            <li>• End: Tab cuối cùng</li>
          </ul>
        </div>

        <div className="p-3 bg-green-50 rounded border border-green-200">
          <p className="text-sm text-green-800">
            <strong>Test ARIA:</strong> Mở DevTools → Elements → Inspect tab button
            → Check có role="tab", aria-selected, etc.
          </p>
        </div>
      </div>
    </div>
  )
}
