/**
 * ============================================================================
 * SOLUTION 4: ProfileTabs - Final Project
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

interface ProfileTabsContextType {
  activeValue: string
  setActiveValue: (value: string) => void
  registerTab: (value: string) => void
  getTabValues: () => string[]
}

interface ProfileTabsProps {
  children: ReactNode
  defaultValue: string
  onChange?: (value: string) => void
}

interface TabListProps {
  children: ReactNode
  'aria-label'?: string
}

interface TabProps {
  children: ReactNode
  value: string
  icon?: ReactNode
  disabled?: boolean
}

interface BadgeProps {
  count: number
}

interface TabPanelsProps {
  children: ReactNode
}

interface TabPanelProps {
  children: ReactNode
  value: string
}

// =============================================================================
// CONTEXT
// =============================================================================

const ProfileTabsContext = createContext<ProfileTabsContextType | null>(null)

function useProfileTabsContext(): ProfileTabsContextType {
  const context = useContext(ProfileTabsContext)
  if (!context) {
    throw new Error('ProfileTabs components must be used within <ProfileTabs>')
  }
  return context
}

// =============================================================================
// ROOT COMPONENT
// =============================================================================

function ProfileTabsRoot({
  children,
  defaultValue,
  onChange,
}: ProfileTabsProps) {
  const [activeValue, setActiveValue] = useState(defaultValue)
  const tabValuesRef = useRef<string[]>([])

  const handleChange = useCallback(
    (value: string) => {
      setActiveValue(value)
      onChange?.(value)
    },
    [onChange]
  )

  const registerTab = useCallback((value: string) => {
    if (!tabValuesRef.current.includes(value)) {
      tabValuesRef.current.push(value)
    }
  }, [])

  const getTabValues = useCallback(() => tabValuesRef.current, [])

  return (
    <ProfileTabsContext.Provider
      value={{
        activeValue,
        setActiveValue: handleChange,
        registerTab,
        getTabValues,
      }}
    >
      <div className="w-full">{children}</div>
    </ProfileTabsContext.Provider>
  )
}

// =============================================================================
// TAB LIST
// =============================================================================

function TabList({
  children,
  'aria-label': ariaLabel = 'Profile sections',
}: TabListProps) {
  const { activeValue, setActiveValue, getTabValues } = useProfileTabsContext()
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
      className="flex border-b border-gray-200 overflow-x-auto"
    >
      {children}
    </div>
  )
}

// =============================================================================
// TAB - Với Icon Support
// =============================================================================

function Tab({ children, value, icon, disabled = false }: TabProps) {
  const { activeValue, setActiveValue, registerTab } = useProfileTabsContext()
  const isActive = activeValue === value

  registerTab(value)

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
        ${disabled
          ? 'text-gray-300 cursor-not-allowed'
          : isActive
            ? 'text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }
      `}
    >
      {/* Icon */}
      {icon && (
        <span className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
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
          ${isActive ? 'bg-blue-600' : 'bg-transparent'}
        `}
      />
    </button>
  )
}

// =============================================================================
// BADGE
// =============================================================================

function Badge({ count }: BadgeProps) {
  const displayCount = count > 99 ? '99+' : count.toString()

  return (
    <span className="ml-1.5 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
      {displayCount}
    </span>
  )
}

// =============================================================================
// TAB PANELS & PANEL
// =============================================================================

function TabPanels({ children }: TabPanelsProps) {
  return <div className="mt-4">{children}</div>
}

function TabPanel({ children, value }: TabPanelProps) {
  const { activeValue } = useProfileTabsContext()

  if (activeValue !== value) return null

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className="focus:outline-none"
    >
      {children}
    </div>
  )
}

// =============================================================================
// EXPORT
// =============================================================================

export const ProfileTabs = Object.assign(ProfileTabsRoot, {
  List: TabList,
  Tab: Tab,
  Badge: Badge,
  Panels: TabPanels,
  Panel: TabPanel,
})

// =============================================================================
// ICONS
// =============================================================================

function PostIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  )
}

function PhotoIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  )
}

// =============================================================================
// DEMO
// =============================================================================

export function Solution04Demo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Solution 4: ProfileTabs</h2>

      {/* Profile Header Mock */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
          <p className="text-gray-500">@johndoe</p>
        </div>
      </div>

      {/* ProfileTabs */}
      <ProfileTabs defaultValue="posts" onChange={(v) => console.log('Tab:', v)}>
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
                  <p className="text-sm text-gray-500 mt-2">{i} hour ago</p>
                </div>
              ))}
            </div>
          </ProfileTabs.Panel>

          <ProfileTabs.Panel value="about">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">About</h4>
              <p className="text-gray-600">Software Developer | React enthusiast</p>
            </div>
          </ProfileTabs.Panel>

          <ProfileTabs.Panel value="friends">
            <div className="grid grid-cols-2 gap-4">
              {['Alice', 'Bob', 'Carol', 'David'].map((name) => (
                <div key={name} className="p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  <span className="font-medium text-gray-900">{name}</span>
                </div>
              ))}
            </div>
          </ProfileTabs.Panel>

          <ProfileTabs.Panel value="photos">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"
                />
              ))}
            </div>
          </ProfileTabs.Panel>
        </ProfileTabs.Panels>
      </ProfileTabs>
    </div>
  )
}
