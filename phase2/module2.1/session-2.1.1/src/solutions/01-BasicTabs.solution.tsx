/**
 * ============================================================================
 * SOLUTION 1: Basic Tabs - Compound Components với Context API
 * ============================================================================
 *
 * Đây là solution hoàn chỉnh cho Exercise 1.
 * So sánh với code của bạn để xem sự khác biệt.
 * ============================================================================
 */

import { createContext, useContext, useState, type ReactNode } from 'react'

// =============================================================================
// STEP 1: Types
// =============================================================================

interface TabsContextType {
  activeValue: string
  setActiveValue: (value: string) => void
}

interface TabsProps {
  children: ReactNode
  defaultValue: string
}

interface TabListProps {
  children: ReactNode
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
// STEP 2: Context
// =============================================================================

const TabsContext = createContext<TabsContextType | null>(null)

// =============================================================================
// STEP 3: Custom Hook
// =============================================================================

function useTabsContext(): TabsContextType {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error(
      'Tabs compound components must be used within <Tabs>. ' +
      'Make sure you wrap Tab, TabList, TabPanel, TabPanels inside a Tabs component.'
    )
  }

  return context
}

// =============================================================================
// STEP 4: Root Component
// =============================================================================

function TabsRoot({ children, defaultValue }: TabsProps) {
  const [activeValue, setActiveValue] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  )
}

// =============================================================================
// STEP 5: Sub-components
// =============================================================================

function TabList({ children }: TabListProps) {
  return <div className="flex">{children}</div>
}

function Tab({ children, value }: TabProps) {
  const { activeValue, setActiveValue } = useTabsContext()
  const isActive = activeValue === value

  return (
    <button
      onClick={() => setActiveValue(value)}
      className={`px-4 py-2 ${isActive ? 'font-bold bg-blue-100' : ''}`}
    >
      {children}
    </button>
  )
}

function TabPanels({ children }: TabPanelsProps) {
  return <div className="mt-4">{children}</div>
}

function TabPanel({ children, value }: TabPanelProps) {
  const { activeValue } = useTabsContext()

  if (activeValue !== value) {
    return null
  }

  return <div>{children}</div>
}

// =============================================================================
// STEP 6: Export Compound Component
// =============================================================================

export const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab: Tab,
  Panels: TabPanels,
  Panel: TabPanel,
})

// =============================================================================
// DEMO
// =============================================================================

export function Solution01Demo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Solution 1: Basic Tabs</h2>

      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="tab1">
            <p className="p-4 bg-gray-100 rounded">Content for Tab 1</p>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <p className="p-4 bg-gray-100 rounded">Content for Tab 2</p>
          </Tabs.Panel>
          <Tabs.Panel value="tab3">
            <p className="p-4 bg-gray-100 rounded">Content for Tab 3</p>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
  )
}
