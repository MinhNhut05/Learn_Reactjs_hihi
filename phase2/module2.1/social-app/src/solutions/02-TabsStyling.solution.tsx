/**
 * ============================================================================
 * SOLUTION 2: Tabs Styling với Tailwind CSS
 * ============================================================================
 */

import { createContext, useContext, useState, type ReactNode } from 'react'

// =============================================================================
// TYPES
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
  className?: string
}

interface TabProps {
  children: ReactNode
  value: string
  className?: string
}

interface TabPanelsProps {
  children: ReactNode
  className?: string
}

interface TabPanelProps {
  children: ReactNode
  value: string
  className?: string
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
// COMPONENTS WITH STYLING
// =============================================================================

function TabsRoot({ children, defaultValue }: TabsProps) {
  const [activeValue, setActiveValue] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children, className = '' }: TabListProps) {
  return (
    <div
      className={`
        flex
        border-b border-gray-200
        gap-1
        ${className}
      `}
    >
      {children}
    </div>
  )
}

function Tab({ children, value, className = '' }: TabProps) {
  const { activeValue, setActiveValue } = useTabsContext()
  const isActive = activeValue === value

  return (
    <button
      onClick={() => setActiveValue(value)}
      className={`
        px-4 py-2
        text-sm font-medium
        transition-colors duration-200
        border-b-2 -mb-px
        ${isActive
          ? 'text-blue-600 border-blue-600'
          : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
        }
        ${className}
      `}
    >
      {children}
    </button>
  )
}

function TabPanels({ children, className = '' }: TabPanelsProps) {
  return (
    <div className={`mt-4 ${className}`}>
      {children}
    </div>
  )
}

function TabPanel({ children, value, className = '' }: TabPanelProps) {
  const { activeValue } = useTabsContext()

  if (activeValue !== value) return null

  return (
    <div className={`p-4 bg-gray-50 rounded ${className}`}>
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
// DEMO
// =============================================================================

export function Solution02Demo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Solution 2: Tabs Styling</h2>

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
              Your posts appear here. Notice the blue underline on active tab.
            </p>
          </Tabs.Panel>
          <Tabs.Panel value="about">
            <h3 className="font-medium text-gray-900 mb-2">About</h3>
            <p className="text-gray-600">
              About section with gray background panel.
            </p>
          </Tabs.Panel>
          <Tabs.Panel value="friends">
            <h3 className="font-medium text-gray-900 mb-2">Friends</h3>
            <p className="text-gray-600">
              Friends list. Hover over tabs to see the effect.
            </p>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
  )
}
