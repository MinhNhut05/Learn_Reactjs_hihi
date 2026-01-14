/**
 * Exercise 3: Advanced Custom Hooks - SOLUTION
 *
 * Đã điền đầy đủ các chỗ trống với giải thích
 */

import { useState, useEffect, useCallback } from "react";

// =============================================================================
// PART A: useDebounce Hook - SOLUTION
// =============================================================================

/**
 * useDebounce - Delay value updates
 *
 * Use case phổ biến:
 * - Search input: Không gọi API mỗi keystroke
 * - Form validation: Validate sau khi user ngừng gõ
 * - Window resize: Handle resize sau khi user dừng resize
 */
function useDebounce<T>(value: T, delay: number): T {
  // State để lưu giá trị đã debounce
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set timeout để update debounced value sau delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: Nếu value thay đổi TRƯỚC KHI delay hết
    // → Clear timeout cũ, set timeout mới
    // Như vậy chỉ update khi user "dừng" thay đổi
    return () => clearTimeout(timer);
  }, [value, delay]); // Chạy lại khi value hoặc delay thay đổi

  return debouncedValue;
}

// =============================================================================
// PART B: useFetch Hook - SOLUTION
// =============================================================================

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * useFetch - Data fetching với states và cleanup
 *
 * Features:
 * - Loading state cho UI feedback
 * - Error handling
 * - AbortController để cancel pending requests
 * - Refetch function để manually refetch
 * - Generic type cho type safety
 */
function useFetch<T>(url: string): UseFetchResult<T> {
  // 3 states cho fetch lifecycle
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true); // true ban đầu vì sẽ fetch ngay
  const [error, setError] = useState<Error | null>(null);

  // useCallback để stable reference
  // fetchData chỉ thay đổi khi url thay đổi
  const fetchData = useCallback(async () => {
    // AbortController cho phép cancel fetch request
    // Quan trọng để tránh:
    // 1. Race conditions (request cũ resolve sau request mới)
    // 2. Memory leaks (set state trên unmounted component)
    const controller = new AbortController();

    try {
      setLoading(true);
      setError(null);

      // Fetch với signal từ controller
      // Khi controller.abort() được gọi, fetch sẽ throw AbortError
      const response = await fetch(url, {
        signal: controller.signal,
      });

      // Check HTTP status
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse JSON response
      const json = await response.json();
      setData(json);
    } catch (err) {
      // Quan trọng: Ignore AbortError
      // AbortError xảy ra khi component unmount hoặc url thay đổi
      // Đây là expected behavior, không phải error
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }

    // Return cleanup function để abort request
    return () => controller.abort();
  }, [url]); // Dependency: url

  // Effect để fetch khi mount hoặc khi url thay đổi
  useEffect(() => {
    const cleanup = fetchData();

    // Cleanup: abort request khi:
    // 1. Component unmount
    // 2. url thay đổi (effect re-run)
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [fetchData]); // Dependency: fetchData (đã memoized với useCallback)

  return {
    data,
    loading,
    error,
    refetch: fetchData, // Expose fetchData để manually refetch
  };
}

// =============================================================================
// DEMO COMPONENT - SOLUTION
// =============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

export default function AdvancedCustomHooksSolution() {
  // Part A: Debounced search
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Part B: Fetch users
  const [userId, setUserId] = useState(1);
  const {
    data: user,
    loading,
    error,
    refetch,
  } = useFetch<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exercise 3: Advanced Custom Hooks - SOLUTION ✅</h2>
      <p>
        <strong>Mục tiêu:</strong> Tạo useDebounce và useFetch hooks
      </p>

      {/* Part A: useDebounce */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h3>Part A: useDebounce Hook</h3>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            style={{
              padding: "0.5rem",
              width: "100%",
              maxWidth: "400px",
              fontSize: "1rem",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            maxWidth: "600px",
          }}
        >
          <div
            style={{
              padding: "1rem",
              background: "#fff3e0",
              borderRadius: "4px",
            }}
          >
            <strong>Current value:</strong>
            <div style={{ marginTop: "0.5rem", fontFamily: "monospace" }}>
              "{searchTerm}"
            </div>
            <small>Updates ngay khi gõ</small>
          </div>

          <div
            style={{
              padding: "1rem",
              background: "#e8f5e9",
              borderRadius: "4px",
            }}
          >
            <strong>Debounced value (500ms):</strong>
            <div style={{ marginTop: "0.5rem", fontFamily: "monospace" }}>
              "{debouncedSearch}"
            </div>
            <small>Updates sau 500ms không gõ</small>
          </div>
        </div>
      </section>

      {/* Part B: useFetch */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h3>Part B: useFetch Hook</h3>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            <strong>Select User ID: </strong>
            <select
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
              style={{ padding: "0.5rem", marginLeft: "0.5rem" }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
                <option key={id} value={id}>
                  User {id}
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={refetch}
            style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
          >
            🔄 Refetch
          </button>
        </div>

        {loading && (
          <div
            style={{
              padding: "1rem",
              background: "#e3f2fd",
              borderRadius: "4px",
            }}
          >
            ⏳ Loading user {userId}...
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "1rem",
              background: "#ffebee",
              borderRadius: "4px",
              color: "#c62828",
            }}
          >
            ❌ Error: {error.message}
          </div>
        )}

        {user && !loading && (
          <div
            style={{
              padding: "1rem",
              background: "#e8f5e9",
              borderRadius: "4px",
            }}
          >
            <h4 style={{ marginTop: 0 }}>👤 {user.name}</h4>
            <p>📧 Email: {user.email}</p>
            <p>🌐 Website: {user.website}</p>
            <pre
              style={{
                background: "#f5f5f5",
                padding: "0.5rem",
                borderRadius: "4px",
                overflow: "auto",
              }}
            >
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}
      </section>

      {/* Key takeaways */}
      <div
        style={{
          padding: "1rem",
          background: "#e8f5e9",
          borderRadius: "4px",
        }}
      >
        <h4>📝 Key Takeaways:</h4>
        <ol>
          <li>
            <strong>useDebounce:</strong> setTimeout + clearTimeout trong
            useEffect
          </li>
          <li>
            <strong>useFetch:</strong> AbortController để cancel pending
            requests
          </li>
          <li>
            <strong>AbortError:</strong> Luôn ignore AbortError trong catch
          </li>
          <li>
            <strong>Loading state:</strong> true ban đầu, false sau fetch
          </li>
          <li>
            <strong>Cleanup:</strong> Quan trọng để tránh memory leaks và race
            conditions
          </li>
        </ol>
      </div>
    </div>
  );
}
