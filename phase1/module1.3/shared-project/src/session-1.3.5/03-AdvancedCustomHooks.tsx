/**
 * Exercise 3: Advanced Custom Hooks
 * Difficulty: Expert
 *
 * MỤC TIÊU HỌC:
 * - useDebounce với setTimeout/clearTimeout
 * - useFetch với AbortController
 * - Async patterns trong custom hooks
 * - Error handling và loading states
 *
 * HƯỚNG DẪN:
 * 1. Implement useDebounce hook (Part A)
 * 2. Implement useFetch hook (Part B)
 * 3. Test bằng demo UI bên dưới
 */

import { useState, useEffect, useCallback } from "react";

// =============================================================================
// PART A: useDebounce Hook
// TODO: Implement hook để delay value updates
// =============================================================================

/**
 * useDebounce - Delay value updates
 *
 * Requirements:
 * - Nhận value và delay (ms)
 * - Return debounced value (update sau delay)
 * - Cancel timeout khi value thay đổi trước delay
 */
function useDebounce<T>(value: T, delay: number): T {
  // TODO: Implement hook
  // 1. State để lưu debounced value
  // 2. useEffect với setTimeout
  // 3. Cleanup clearTimeout

  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // TODO: Set timeout để update sau delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // TODO: Cleanup - clear timeout khi value thay đổi
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// =============================================================================
// PART B: useFetch Hook
// TODO: Implement hook để fetch data với loading/error states
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
 * Requirements:
 * - Generic type <T> cho data
 * - Loading, error, data states
 * - AbortController để cancel request khi unmount
 * - Refetch function để manually refetch
 */
function useFetch<T>(url: string): UseFetchResult<T> {
  // TODO: Implement hook
  // 1. Tạo 3 states: data, loading, error
  // 2. Fetch function với AbortController
  // 3. useEffect để gọi fetch
  // 4. Return object với refetch

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    // TODO: Tạo AbortController
    const controller = new AbortController();

    try {
      setLoading(true);
      setError(null);

      // TODO: Fetch với signal
      const response = await fetch(url, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      // TODO: Ignore AbortError
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }

    // Return cleanup function
    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    const cleanup = fetchData();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// =============================================================================
// DEMO COMPONENT
// =============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

export default function AdvancedCustomHooks() {
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
      <h2>Exercise 3: Advanced Custom Hooks</h2>
      <p>
        <strong>Mục tiêu:</strong> Implement useDebounce và useFetch hooks
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

        <p style={{ marginTop: "1rem", color: "#666" }}>
          💡 Gõ nhanh và dừng lại - debounced value chỉ update sau 500ms idle
        </p>
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

        {/* Loading state */}
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

        {/* Error state */}
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

        {/* Data state */}
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

      {/* Hints */}
      <details>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          💡 Hints (click to expand)
        </summary>
        <div
          style={{
            background: "#f5f5f5",
            padding: "1rem",
            marginTop: "0.5rem",
            borderRadius: "4px",
          }}
        >
          <h4>Part A - useDebounce pattern:</h4>
          <pre>{`useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedValue(value);
  }, delay);
  return () => clearTimeout(timer);
}, [value, delay]);`}</pre>

          <h4>Part B - useFetch với AbortController:</h4>
          <pre>{`const controller = new AbortController();
fetch(url, { signal: controller.signal });
// Cleanup:
return () => controller.abort();`}</pre>
        </div>
      </details>
    </div>
  );
}
