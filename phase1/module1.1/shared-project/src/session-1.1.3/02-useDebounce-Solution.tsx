/**
 * ✅ SOLUTION: Custom useDebounce Hook
 */

import { useEffect, useState } from 'react'

// ============================================================
// SOLUTION: useDebounce Hook
// ============================================================

function useDebounce<T>(value: T, delay: number): T {
  // 1. State để lưu debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  // 2. useEffect với setTimeout + cleanup
  useEffect(() => {
    // Set timeout để update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup: Clear timeout nếu value thay đổi trước khi delay hết
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])  // Re-run khi value hoặc delay thay đổi

  // 3. Return debounced value
  return debouncedValue
}

// ============================================================
// DEMO COMPONENT
// ============================================================

export default function UseDebounceDemo() {
  // State cho search term (updates immediately)
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Debounced search term (updates after 500ms)
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)

  // State cho search results
  const [results, setResults] = useState<string[]>([])

  // Perform search khi debouncedSearchTerm thay đổi
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('🔍 Searching for:', debouncedSearchTerm)

      // Mock search results
      const mockResults = [
        `Result 1 for "${debouncedSearchTerm}"`,
        `Result 2 for "${debouncedSearchTerm}"`,
        `Result 3 for "${debouncedSearchTerm}"`
      ]
      setResults(mockResults)
    } else {
      setResults([])
    }
  }, [debouncedSearchTerm])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h3>useDebounce Hook Demo</h3>

      {/* Search Input */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Search:
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Type to search..."
          style={{
            padding: '10px',
            width: '100%',
            maxWidth: '400px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Values Display */}
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '4px' }}>
        <div style={{ marginBottom: '10px' }}>
          <strong>Immediate Value (searchTerm):</strong>
          <p style={{ margin: '5px 0 0 0', fontSize: '16px', color: searchTerm ? '#000' : '#999' }}>
            {searchTerm || '(empty)'}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
            Updates on every keystroke
          </p>
        </div>
        <div>
          <strong>Debounced Value (500ms delay):</strong>
          <p style={{ margin: '5px 0 0 0', fontSize: '16px', color: debouncedSearchTerm ? '#2196F3' : '#999' }}>
            {debouncedSearchTerm || '(empty)'}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
            Updates 500ms after you stop typing
          </p>
        </div>
      </div>

      {/* Search Results */}
      <div>
        <h4>Search Results:</h4>
        {results.length > 0 ? (
          <ul style={{ marginTop: '10px' }}>
            {results.map((result, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                {result}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>
            No results (start typing to search)
          </p>
        )}
        <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic', marginTop: '10px' }}>
          💡 Search only happens when you stop typing for 500ms
        </p>
      </div>

      {/* Instructions */}
      <div style={{ marginTop: '30px', padding: '10px', background: '#e3f2fd', borderRadius: '4px' }}>
        <strong>🧪 Testing Instructions:</strong>
        <ol style={{ fontSize: '14px', marginTop: '5px' }}>
          <li>Type quickly: "react"</li>
          <li>Watch "Immediate Value" update on every keystroke</li>
          <li>Watch "Debounced Value" update only after you stop typing</li>
          <li>Check console.log → Should see 1 search, not 5</li>
          <li>Try typing and then deleting quickly → Notice fewer searches</li>
        </ol>
      </div>
    </div>
  )
}

/**
 * 📝 GIẢI THÍCH IMPLEMENTATION:
 *
 * 1. **How Debouncing Works:**
 *    User types: r -> re -> rea -> reac -> react
 *                |    |     |      |       |
 *    Time:       0    100   200    300     400   900ms
 *                                                  ↓
 *    Effect runs và setDebouncedValue("react")
 *    (500ms after last keystroke)
 *
 * 2. **setTimeout + Cleanup:**
 *    - Mỗi keystroke: Schedule update sau 500ms
 *    - Keystroke tiếp: Cancel previous timeout, schedule new one
 *    - Result: Only last value is used after user stops typing
 *
 * 3. **useEffect Dependencies:**
 *    - [value, delay] → Re-run khi value HOẶC delay thay đổi
 *    - Cleanup runs BEFORE next effect
 *    - clearTimeout prevents previous timeout from executing
 *
 * 4. **Generic Type <T>:**
 *    - Works with any type: string, number, object, array
 *    - Type-safe: debouncedValue has same type as value
 *
 * 5. **Performance Benefits:**
 *    - WITHOUT debounce: "react" → 5 API calls
 *    - WITH debounce: "react" → 1 API call
 *    - Saves bandwidth, processing, improves UX
 *
 * 💡 REAL-WORLD PATTERNS:
 *
 * **Pattern 1: Search với API:**
 * ```tsx
 * const debouncedQuery = useDebounce(query, 300)
 * useEffect(() => {
 *   if (debouncedQuery) {
 *     fetchSearchResults(debouncedQuery)
 *   }
 * }, [debouncedQuery])
 * ```
 *
 * **Pattern 2: Auto-save:**
 * ```tsx
 * const debouncedContent = useDebounce(content, 1000)
 * useEffect(() => {
 *   if (debouncedContent) {
 *     saveToBackend(debouncedContent)
 *   }
 * }, [debouncedContent])
 * ```
 *
 * **Pattern 3: Window Resize:**
 * ```tsx
 * const [size, setSize] = useState(window.innerWidth)
 * const debouncedSize = useDebounce(size, 200)
 * useEffect(() => {
 *   // Expensive recalculation only after resize ends
 *   recalculateLayout(debouncedSize)
 * }, [debouncedSize])
 * ```
 */
