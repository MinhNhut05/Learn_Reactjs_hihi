/**
 * SOLUTION - BÀI TẬP 3: USER DASHBOARD với Data Fetching
 */

import { useState, useEffect, ChangeEvent, KeyboardEvent, MouseEvent, ReactNode } from 'react'

// ============================================
// Types & Interfaces
// ============================================

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
  }
  address: {
    street: string
    city: string
  }
}

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
// useFetch Hook
// ============================================

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setState({ status: 'loading' })

        const response = await fetch(url, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setState({ status: 'success', data })
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        setState({
          status: 'error',
          error: err instanceof Error ? err.message : 'An error occurred'
        })
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url])

  return state
}

// ============================================
// useDebounce Hook
// ============================================

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// ============================================
// SearchBar Component
// ============================================

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onChange('')
    }
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <div style={{ marginBottom: '20px', position: 'relative' }}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 40px 12px 40px',
          fontSize: '16px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          outline: 'none'
        }}
      />
      <span style={{ position: 'absolute', left: '12px', top: '12px', fontSize: '20px' }}>
        🔍
      </span>
      {value && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '12px',
            top: '12px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#9ca3af'
          }}
        >
          ✕
        </button>
      )}
    </div>
  )
}

// ============================================
// SortControls Component
// ============================================

interface SortControlsProps {
  sortConfig: SortConfig
  onSortChange: (config: SortConfig) => void
}

function SortControls({ sortConfig, onSortChange }: SortControlsProps) {
  const sortFields: Array<{ field: SortField; label: string }> = [
    { field: 'name', label: 'Name' },
    { field: 'email', label: 'Email' },
    { field: 'company', label: 'Company' }
  ]

  const handleSortClick = (field: SortField) => {
    if (sortConfig.field === field) {
      // Toggle order
      onSortChange({
        field,
        order: sortConfig.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      // New field, reset to asc
      onSortChange({ field, order: 'asc' })
    }
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '8px', fontSize: '14px', color: '#6b7280' }}>
        Sort by:
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {sortFields.map(({ field, label }) => {
          const isActive = sortConfig.field === field
          const arrow = sortConfig.order === 'asc' ? '↑' : '↓'

          return (
            <button
              key={field}
              onClick={() => handleSortClick(field)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: isActive ? '#3b82f6' : '#e5e7eb',
                color: isActive ? 'white' : '#374151',
                cursor: 'pointer',
                fontWeight: isActive ? '500' : 'normal',
                fontSize: '14px'
              }}
            >
              {label} {isActive && arrow}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// Generic List Component
// ============================================

interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
  emptyMessage?: string
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage = 'No items found' }: ListProps<T>) {
  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
        {emptyMessage}
      </div>
    )
  }

  return (
    <div>
      {items.map(item => (
        <div key={keyExtractor(item)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}

// ============================================
// UserCard Component
// ============================================

type UserCardData = Pick<User, 'id' | 'name' | 'email' | 'company'>

interface UserCardProps {
  user: UserCardData
  onClick: (user: UserCardData) => void
}

function UserCard({ user, onClick }: UserCardProps) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    onClick(user)
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
        transition: 'all 0.2s',
        backgroundColor: 'white'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
        e.currentTarget.style.borderColor = '#3b82f6'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = '#e5e7eb'
      }}
    >
      <div style={{ fontWeight: '600', fontSize: '18px', color: '#1f2937', marginBottom: '4px' }}>
        {user.name}
      </div>
      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
        📧 {user.email}
      </div>
      <div style={{ fontSize: '14px', color: '#6b7280' }}>
        🏢 {user.company.name}
      </div>
    </div>
  )
}

// ============================================
// UserModal Component
// ============================================

interface UserModalProps {
  user: User | null
  onClose: () => void
}

function UserModal({ user, onClose }: UserModalProps) {
  useEffect(() => {
    if (!user) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [user, onClose])

  if (!user) return null

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
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
          overflow: 'auto',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#9ca3af',
            padding: '4px'
          }}
        >
          ✕
        </button>

        {/* User Details */}
        <h2 style={{ marginTop: 0, marginBottom: '24px', color: '#1f2937' }}>
          {user.name}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Email</div>
            <div style={{ fontSize: '16px', color: '#1f2937' }}>📧 {user.email}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Phone</div>
            <div style={{ fontSize: '16px', color: '#1f2937' }}>📞 {user.phone}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Website</div>
            <div style={{ fontSize: '16px', color: '#1f2937' }}>🌐 {user.website}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Company</div>
            <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>
              🏢 {user.company.name}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>
              "{user.company.catchPhrase}"
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Address</div>
            <div style={{ fontSize: '16px', color: '#1f2937' }}>
              📍 {user.address.street}, {user.address.city}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// LoadingSpinner Component
// ============================================

function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
      <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading users...</div>
    </div>
  )
}

// ============================================
// ErrorMessage Component
// ============================================

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
      <div style={{ fontSize: '18px', color: '#ef4444', marginBottom: '16px' }}>
        {message}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Try Again
        </button>
      )}
    </div>
  )
}

// ============================================
// Main UserDashboard Component
// ============================================

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export default function UserDashboard() {
  const fetchState = useFetch<User[]>(API_URL)

  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'name', order: 'asc' })
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const debouncedSearch = useDebounce(searchTerm, 300)

  // Filter users
  const filterUsers = (users: User[]): User[] => {
    if (!debouncedSearch.trim()) return users

    const searchLower = debouncedSearch.toLowerCase()
    return users.filter(user =>
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    )
  }

  // Sort users
  const sortUsers = (users: User[]): User[] => {
    return [...users].sort((a, b) => {
      let aValue: string
      let bValue: string

      switch (sortConfig.field) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'email':
          aValue = a.email
          bValue = b.email
          break
        case 'company':
          aValue = a.company.name
          bValue = b.company.name
          break
      }

      const comparison = aValue.localeCompare(bValue)
      return sortConfig.order === 'asc' ? comparison : -comparison
    })
  }

  // Handle user click
  const handleUserClick = (cardData: UserCardData) => {
    if (fetchState.status === 'success') {
      const fullUser = fetchState.data.find(u => u.id === cardData.id)
      if (fullUser) {
        setSelectedUser(fullUser)
      }
    }
  }

  // Type guard
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

  // Render content
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
            onRetry={() => window.location.reload()}
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
      <h1 style={{ marginBottom: '24px', color: '#1f2937' }}>User Dashboard</h1>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by name or email..."
      />

      <SortControls
        sortConfig={sortConfig}
        onSortChange={setSortConfig}
      />

      {isSuccess(fetchState) && (
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>
          Showing {getProcessedUsers().length} of {fetchState.data.length} users
        </p>
      )}

      {renderContent()}

      <UserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  )
}
