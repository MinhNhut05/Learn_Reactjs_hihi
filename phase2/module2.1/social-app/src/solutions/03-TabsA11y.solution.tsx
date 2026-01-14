/**
 * ============================================================================
 * SOLUTION 3: Tabs Accessibility (A11y)
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
// ROOT COMPONENT
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

function TabList({
  children,
  'aria-label': ariaLabel = 'Tab navigation',
}: TabListProps) {
  const { activeValue, setActiveValue, getTabValues } = useTabsContext()
  const listRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabValues = getTabValues()
    const currentIndex = tabValues.indexOf(activeValue)

    let newIndex: number | null = null

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        newIndex = (currentIndex + 1) % tabValues.length
        break

      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        newIndex = (currentIndex - 1 + tabValues.length) % tabValues.length
        break

      case 'Home':
        e.preventDefault()
        newIndex = 0
        break

      case 'End':
        e.preventDefault()
        newIndex = tabValues.length - 1
        break
    }

    if (newIndex !== null) {
      setActiveValue(tabValues[newIndex])

      // Focus the new active tab
      const tabs = listRef.current?.querySelectorAll('[role="tab"]')
      const targetTab = tabs?.[newIndex] as HTMLElement
      targetTab?.focus()
    }
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
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

function Tab({ children, value }: TabProps) {
  const { activeValue, setActiveValue, registerTab } = useTabsContext()
  const isActive = activeValue === value

  // Register tab value
  registerTab(value)

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveValue(value)}
      className={`
        px-4 py-2 text-sm font-medium transition-colors -mb-px
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
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
// TAB PANELS & PANEL
// =============================================================================

function TabPanels({ children }: TabPanelsProps) {
  return <div className="mt-4">{children}</div>
}

function TabPanel({ children, value }: TabPanelProps) {
  const { activeValue } = useTabsContext()

  if (activeValue !== value) return null

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
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
// DEMO
// =============================================================================

export function Solution03Demo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Solution 3: Tabs Accessibility</h2>

      <Tabs defaultValue="tab1">
        <Tabs.List aria-label="Demo tabs">
          <Tabs.Tab value="tab1">First</Tabs.Tab>
          <Tabs.Tab value="tab2">Second</Tabs.Tab>
          <Tabs.Tab value="tab3">Third</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="tab1">
            <p>First panel. Use arrow keys to navigate between tabs.</p>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <p>Second panel. Press Home to go to first tab, End for last.</p>
          </Tabs.Panel>
          <Tabs.Panel value="tab3">
            <p>Third panel. Check DevTools to see ARIA attributes.</p>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>

      <div className="mt-4 p-3 bg-green-50 rounded text-sm text-green-800">
        <strong>ARIA attributes added:</strong>
        <ul className="mt-1 ml-4 list-disc">
          <li>role="tablist" on TabList</li>
          <li>role="tab", aria-selected, aria-controls, id on Tab</li>
          <li>role="tabpanel", id, aria-labelledby on TabPanel</li>
        </ul>
      </div>
    </div>
  )
}
