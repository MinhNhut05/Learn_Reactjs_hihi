/**
 * BÀI TẬP 3: USER DASHBOARD với Data Fetching
 *
 * Kiến thức cần dùng:
 * - Session 1.1.1: Interface, Generic <T>, ReactNode, children
 * - Session 1.1.2: ChangeEvent, KeyboardEvent, MouseEvent
 * - Session 1.1.3: useFetch, useDebounce
 * - Session 1.1.4: Pick, Omit, Discriminated Union, Type Guards
 *
 * Thời gian: 60-90 phút
 */

import { useState, useEffect, ChangeEvent, KeyboardEvent, MouseEvent, ReactNode } from 'react'

// ============================================
// TODO 1: Define interfaces
// ============================================

interface User {
  // YOUR CODE HERE
  // id: number
  // name: string
  // email: string
  // phone: string
  // website: string
  // company: { name: string; catchPhrase: string }
  // address: { street: string; city: string }
}

// Discriminated Union cho fetch state
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

type SortField = 'name' | 'email' | 'company'
type SortOrder = 'asc' | 'desc'

interface SortConfig {
  field: SortField
  order: SortOrder
}

// ============================================
// TODO 2: Implement useFetch hook
// ============================================

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: 'idle' })

  useEffect(() => {
    // YOUR CODE HERE

    // 1. Create AbortController
    // 2. Set loading state
    // 3. Fetch data
    // 4. Check response.ok
    // 5. Set success state với data
    // 6. Catch errors (ignore AbortError)
    // 7. Cleanup: abort on unmount

    // Return type phải là FetchState<T>
  }, [url])

  return state
}

// ============================================
// TODO 3: Implement useDebounce hook
// ============================================

function useDebounce<T>(value: T, delay: number): T {
  // YOUR CODE HERE
  return value
}

// ============================================
// TODO 4: SearchBar Component
// ============================================

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // YOUR CODE HERE
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // YOUR CODE HERE
    // Escape để clear
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* YOUR JSX HERE */}
      {/* Input với search icon */}
      {/* Clear button khi có value */}
    </div>
  )
}

// ============================================
// TODO 5: SortControls Component
// ============================================

interface SortControlsProps {
  sortConfig: SortConfig
  onSortChange: (config: SortConfig) => void
}

function SortControls({ sortConfig, onSortChange }: SortControlsProps) {
  const sortFields: SortField[] = ['name', 'email', 'company']

  const handleSortClick = (field: SortField) => {
    // YOUR CODE HERE
    // Toggle order nếu cùng field, reset to 'asc' nếu khác field
  }

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      {/* YOUR JSX HERE */}
      {/* Buttons for each sort field */}
      {/* Indicate current sort with arrow ↑ ↓ */}
    </div>
  )
}

// ============================================
// TODO 6: Generic List Component
// ============================================

interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
  emptyMessage?: string
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage = 'No items found' }: ListProps<T>) {
  // YOUR CODE HERE

  return null
}

// ============================================
// TODO 7: UserCard Component
// ============================================

// Chỉ cần một số fields để display trong card
type UserCardData = Pick<User, 'id' | 'name' | 'email' | 'company'>

interface UserCardProps {
  user: UserCardData
  onClick: (user: UserCardData) => void
}

function UserCard({ user, onClick }: UserCardProps) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    // YOUR CODE HERE
  }

  return (
    <div
      onClick={handleClick}
      style={{
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        marginBottom: '12px',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s'
      }}
    >
      {/* YOUR JSX HERE */}
      {/* Name (bold) */}
      {/* Email */}
      {/* Company name */}
    </div>
  )
}

// ============================================
// TODO 8: UserModal Component
// ============================================

interface UserModalProps {
  user: User | null
  onClose: () => void
}

function UserModal({ user, onClose }: UserModalProps) {
  // Global keyboard listener for Escape
  useEffect(() => {
    // YOUR CODE HERE
    // 1. Add keydown listener for Escape
    // 2. Cleanup on unmount

    // Gợi ý: Native KeyboardEvent, không phải React.KeyboardEvent
  }, [onClose])

  if (!user) return null

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    // YOUR CODE HERE
    // Close only when clicking backdrop, not modal content
    // Gợi ý: e.target === e.currentTarget
  }

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto'
        }}
      >
        {/* YOUR JSX HERE */}
        {/* Close button (X) */}
        {/* User details: name, email, phone, website, company, address */}
      </div>
    </div>
  )
}

// ============================================
// TODO 9: LoadingSpinner Component
// ============================================

function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      {/* YOUR JSX HERE */}
      {/* Simple loading text hoặc CSS spinner */}
      <div>Loading...</div>
    </div>
  )
}

// ============================================
// TODO 10: ErrorMessage Component
// ============================================

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
      {/* YOUR JSX HERE */}
      {/* Error icon/message */}
      {/* Retry button nếu có onRetry */}
    </div>
  )
}

// ============================================
// TODO 11: Main UserDashboard Component
// ============================================

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export default function UserDashboard() {
  // Fetch users
  const fetchState = useFetch<User[]>(API_URL)

  // Local state
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'name', order: 'asc' })
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Debounced search
  const debouncedSearch = useDebounce(searchTerm, 300)

  // ============================================
  // TODO 12: Filter users based on search
  // ============================================

  const filterUsers = (users: User[]): User[] => {
    // YOUR CODE HERE
    // Filter by name hoặc email (case-insensitive)

    return users
  }

  // ============================================
  // TODO 13: Sort users based on sortConfig
  // ============================================

  const sortUsers = (users: User[]): User[] => {
    // YOUR CODE HERE
    // Sort by sortConfig.field, sortConfig.order

    return users
  }

  // ============================================
  // TODO 14: Handle user card click
  // ============================================

  const handleUserClick = (cardData: UserCardData) => {
    // YOUR CODE HERE
    // Tìm full user từ fetchState.data và setSelectedUser

    // Type guard cần thiết vì fetchState có thể không phải 'success'
  }

  // ============================================
  // TODO 15: Render based on fetch state
  // ============================================

  // Type guard helper
  const isSuccess = (state: FetchState<User[]>): state is { status: 'success'; data: User[] } => {
    return state.status === 'success'
  }

  // Get processed users
  const getProcessedUsers = (): User[] => {
    if (!isSuccess(fetchState)) return []

    const filtered = filterUsers(fetchState.data)
    const sorted = sortUsers(filtered)
    return sorted
  }

  // Render content based on state
  const renderContent = () => {
    switch (fetchState.status) {
      case 'idle':
        return null

      case 'loading':
        return <LoadingSpinner />

      case 'error':
        return (
          <ErrorMessage
            message={fetchState.error}
            onRetry={() => {
              // Trigger refetch - có thể dùng key hoặc state
              window.location.reload()
            }}
          />
        )

      case 'success':
        const users = getProcessedUsers()
        return (
          <List<User>
            items={users}
            keyExtractor={(user) => user.id}
            renderItem={(user) => (
              <UserCard
                user={user}
                onClick={handleUserClick}
              />
            )}
            emptyMessage="No users found matching your search"
          />
        )
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>User Dashboard</h1>

      {/* Search Bar */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by name or email..."
      />

      {/* Sort Controls */}
      <SortControls
        sortConfig={sortConfig}
        onSortChange={setSortConfig}
      />

      {/* User count (chỉ hiện khi success) */}
      {isSuccess(fetchState) && (
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>
          Showing {getProcessedUsers().length} of {fetchState.data.length} users
        </p>
      )}

      {/* Main Content */}
      {renderContent()}

      {/* User Modal */}
      <UserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  )
}

// ============================================
// BONUS CHALLENGES
// ============================================

/*
 * BONUS 1: Pagination
 * - Show 5 users per page
 * - Next/Previous buttons
 * - Page indicator: "Page 1 of 2"
 *
 * BONUS 2: Copy email button
 * - Click để copy email to clipboard
 * - Show "Copied!" tooltip
 *
 * BONUS 3: Persist preferences
 * - Save search/sort to localStorage
 * - Load on mount
 *
 * BONUS 4: Skeleton loading
 * - Show skeleton cards while loading
 * - Animate shimmer effect
 *
 * BONUS 5: Keyboard navigation
 * - Arrow Up/Down để navigate users
 * - Enter để open modal
 * - Focus ring on selected user
 */
