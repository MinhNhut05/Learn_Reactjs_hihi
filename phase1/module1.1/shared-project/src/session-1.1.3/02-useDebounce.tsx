/**
 * 📚 EXERCISE 2: Custom useDebounce Hook
 *
 * 🎯 MỤC TIÊU:
 * - Implement generic debounce hook để delay value updates
 * - Use setTimeout với cleanup pattern
 * - Type-safe với generic <T>
 * - Prevent excessive operations (API calls, searches)
 *
 * 📖 ĐỌC TRƯỚC KHI LÀM:
 * - COMPLETE_THEORY.md - PART 2: Custom useDebounce Hook
 *
 * ✅ REQUIREMENTS:
 * 1. Hook signature: function useDebounce<T>(value: T, delay: number): T
 * 2. State để lưu debounced value
 * 3. useEffect với setTimeout
 * 4. Cleanup với clearTimeout
 * 5. Demo component cho search input
 */

import { ChangeEvent, useEffect, useState } from "react";

// ============================================================
// TODO 1: Implement useDebounce Hook
// ============================================================

/**
 * Custom hook để debounce value updates
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 *
 * 💡 HƯỚNG DẪN:
 * 1. Create state: debouncedValue initialized với value
 * 2. useEffect:
 *    - Create setTimeout handler
 *    - Update debouncedValue sau delay
 *    - Return cleanup function để clearTimeout
 *    - Dependencies: [value, delay]
 * 3. Return debouncedValue
 */
function useDebounce<T>(value: T, delay: number): T {
  // TODO: Implement hook logic here
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  // Step 1: State để lưu debounced value
  // Hint: const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  // Step 2: useEffect với setTimeout
  // Hint: useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedValue(value)
  //   }, delay)
  //   return () => clearTimeout(handler)
  // }, [value, delay])

  // Step 3: Return debounced value
  // Hint: return debouncedValue

  // TEMPORARY: Return value để TypeScript không error
  // XÓA dòng này sau khi implement
  return debouncedValue;
}

// ============================================================
// TODO 2: Demo Component - Search với Debounce
// ============================================================

/**
 * Demo component để test useDebounce hook
 *
 * 💡 HƯỚNG DẪN:
 * 1. searchTerm state (updates immediately)
 * 2. debouncedSearchTerm = useDebounce(searchTerm, 500)
 * 3. useEffect depends on debouncedSearchTerm → perform search
 * 4. Display both values để show difference
 */

export default function UseDebounceDemo() {
  // TODO: State cho search term
  // Hint: const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  // TODO: Debounced search term
  // Hint: const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("Searching for:", debouncedSearchTerm);
      const mockResults = [
        `Result 1 for "${debouncedSearchTerm}"`,
        `Result 2 for "${debouncedSearchTerm}"`,
        `Result 3 for "${debouncedSearchTerm}"`,
      ];
      setResults(mockResults);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);
  // TODO: State cho search results
  // Hint: const [results, setResults] = useState<string[]>([])

  // TODO: useEffect để perform search khi debouncedSearchTerm thay đổi
  // Hint: useEffect(() => {
  //   if (debouncedSearchTerm) {
  //     console.log('Searching for:', debouncedSearchTerm)
  //     // Mock search results
  //     setResults([...])
  //   }
  // }, [debouncedSearchTerm])

  // TODO: handleChange handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h3>useDebounce Hook Demo</h3>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Search:
        </label>
        <input
          type="text"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={handleChange}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            fontSize: "16px",
            border: "2px solid #ddd",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Values Display */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#f9f9f9",
          borderRadius: "4px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <strong>Immediate Value (searchTerm):</strong>
          <p
            style={{
              margin: "5px 0 0 0",
              fontSize: "16px",
              color: searchTerm ? "#000" : "#999",
            }}
          >
            {searchTerm || "(empty)"}
          </p>
          <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>
            Updates on every keystroke
          </p>
        </div>
        <div>
          <strong>Debounced Value (500ms delay):</strong>
          <p
            style={{
              margin: "5px 0 0 0",
              fontSize: "16px",
              color: debouncedSearchTerm ? "#2196F3" : "#999",
            }}
          >
            {debouncedSearchTerm || "(empty)"}
          </p>
          <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>
            Updates 500ms after you stop typing
          </p>
        </div>
      </div>

      {/* Search Results */}
      <div>
        <h4>Search Results:</h4>
        {results.length > 0 ? (
          <ul style={{ marginTop: "10px" }}>
            {results.map((result, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {result}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#999", fontStyle: "italic" }}>
            No results (start typing to search)
          </p>
        )}
        <p
          style={{
            fontSize: "12px",
            color: "#666",
            fontStyle: "italic",
            marginTop: "10px",
          }}
        >
          💡 Search only happens when you stop typing for 500ms
        </p>
      </div>

      {/* Instructions */}
      <div
        style={{
          marginTop: "30px",
          padding: "10px",
          background: "#e3f2fd",
          borderRadius: "4px",
        }}
      >
        <strong>🧪 Testing Instructions:</strong>
        <ol style={{ fontSize: "14px", marginTop: "5px" }}>
          <li>Type quickly: "react"</li>
          <li>Watch "Immediate Value" update on every keystroke</li>
          <li>Watch "Debounced Value" update only after you stop typing</li>
          <li>Check console.log → Should see 1 search, not 5</li>
        </ol>
      </div>
    </div>
  );
}

/**
 * 🎯 SUCCESS CRITERIA:
 *
 * ✅ Hook Implementation:
 * - [ ] Generic type <T> works correctly
 * - [ ] State initialized với value
 * - [ ] useEffect với setTimeout
 * - [ ] Cleanup với clearTimeout
 * - [ ] Dependencies [value, delay]
 * - [ ] Return type is T
 *
 * ✅ Demo Component:
 * - [ ] searchTerm updates immediately
 * - [ ] debouncedSearchTerm updates after delay
 * - [ ] Clear visual difference between immediate vs debounced
 * - [ ] Search only happens after delay
 * - [ ] console.log shows debounced behavior
 *
 * ✅ Best Practices:
 * - [ ] Cleanup prevents memory leaks
 * - [ ] Type-safe (generic works)
 * - [ ] No TypeScript errors
 *
 * 📝 GHI CHÚ:
 * - setTimeout returns timeout ID
 * - clearTimeout cancels pending timeout
 * - useEffect cleanup runs BEFORE next effect hoặc on unmount
 * - Dependencies [value, delay] → re-run khi value/delay thay đổi
 *
 * 💡 REAL-WORLD USE CASES:
 * - Search input (wait for user to finish typing)
 * - Auto-save editor (save after user stops editing)
 * - Window resize (recalculate layout after resize ends)
 * - API calls (reduce request count)
 * - Form validation (validate after user stops typing)
 *
 * 🎯 BONUS (Optional):
 * - Add "searching..." indicator while waiting
 * - Add configurable delay với input
 * - Test với different types (number, object)
 */
