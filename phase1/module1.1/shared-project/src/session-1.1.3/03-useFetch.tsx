/**
 * 📚 EXERCISE 3: Custom useFetch Hook
 *
 * 🎯 MỤC TIÊU:
 * - Implement generic data fetching hook
 * - Handle loading, error, data states
 * - Type-safe response data với generic <T>
 * - AbortController cleanup pattern
 *
 * 📖 ĐỌC TRƯỚC KHI LÀM:
 * - COMPLETE_THEORY.md - PART 3: Custom useFetch Hook
 *
 * ✅ REQUIREMENTS:
 * 1. Hook signature: function useFetch<T>(url: string): { data: T | null, loading: boolean, error: string }
 * 2. States: data, loading, error
 * 3. useEffect với async fetch
 * 4. AbortController cleanup
 * 5. Demo component fetch từ public API
 */

import { useEffect, useState } from "react";

// ============================================================
// TODO 1: Implement useFetch Hook
// ============================================================

/**
 * Custom hook để fetch data từ API
 *
 * @param url - API endpoint URL
 * @returns Object với { data, loading, error }
 *
 * 💡 HƯỚNG DẪN:
 * 1. Create states: data (T | null), loading (boolean), error (string)
 * 2. useEffect:
 *    - Create AbortController
 *    - Async function để fetch data:
 *      - setLoading(true), setError('')
 *      - fetch(url, { signal: controller.signal })
 *      - Check response.ok
 *      - Parse JSON
 *      - setData(json)
 *      - Catch errors (ignore AbortError)
 *      - Finally setLoading(false)
 *    - Return cleanup: controller.abort()
 * 3. Return { data, loading, error }
 */
function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string;
} {
  // TODO: Implement hook logic here
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  // Step 1: States
  // Hint: const [data, setData] = useState<T | null>(null)
  // Hint: const [loading, setLoading] = useState<boolean>(true)
  // Hint: const [error, setError] = useState<string>('')
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(url, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);
  // Step 2: useEffect với fetch + AbortController
  // Hint: useEffect(() => {
  //   const controller = new AbortController()
  //   const fetchData = async () => { ... }
  //   fetchData()
  //   return () => controller.abort()
  // }, [url])

  // Step 3: Return object
  // Hint: return { data, loading, error }

  // TEMPORARY: Return dummy values để TypeScript không error
  // XÓA đoạn này sau khi implement
  return {
    data,
    loading,
    error,
  };
}

// ============================================================
// TODO 2: Demo Component - Fetch Users từ JSONPlaceholder
// ============================================================

/**
 * Demo component để test useFetch hook
 *
 * 💡 HƯỚNG DẪN:
 * 1. Define User interface
 * 2. Use hook: useFetch<User[]>('https://jsonplaceholder.typicode.com/users')
 * 3. Render loading state
 * 4. Render error state
 * 5. Render user list
 */

// TODO: Define User interface
// Hint: interface User { id: number; name: string; email: string; ... }
interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  website: string;
  company: {
    name: string;
  };
}
export default function UseFetchDemo() {
  // TODO: Use hook để fetch users
  // Hint: const { data, loading, error } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users')
  const { data, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/use"
  );
  // TODO: Render loading state
  // if (loading) return <div>Loading...</div>
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>useFetch Hook Demo</h3>
        <div style={{ marginTop: "50px", fontSize: "18px", color: "#2196F3" }}>
          Loading users...
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>useFetch Hook Demo</h3>
        <div
          style={{
            marginTop: "50px",
            padding: "20px",
            background: "#ffebee",
            borderRadius: "4px",
            color: "#c62828",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }
  if (!data) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>useFetch Hook Demo</h3>
        <div style={{ marginTop: "50px", color: "#999" }}>
          No data available
        </div>
      </div>
    );
  }
  // TODO: Render error state
  // if (error) return <div>Error: {error}</div>

  // TODO: Render user list
  // if (!data) return <div>No data</div>

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h3>useFetch Hook Demo</h3>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          background: "#e3f2fd",
          borderRadius: "4px",
        }}
      >
        <strong>📡 Fetching from:</strong>
        <p
          style={{ margin: "5px 0", fontSize: "14px", wordBreak: "break-all" }}
        >
          https://jsonplaceholder.typicode.com/users
        </p>
      </div>

      {/* TODO: Render user list */}
      <div>
        <h4>Users:</h4>
        {/* TODO: Map over data và render user cards */}
        <div style={{ display: "grid", gap: "15px", marginTop: "10px" }}>
          {data.map((user) => (
            <div
              key={user.id}
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                background: "#fafafa",
              }}
            >
              <div style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "16px", color: "#1976d2" }}>
                  {user.name}
                </strong>
              </div>
              <div
                style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}
              >
                📧 {user.email}
              </div>
              <div
                style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}
              >
                📞 {user.phone}
              </div>
              <div
                style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}
              >
                🌐 {user.website}
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                🏢 {user.company.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div
        style={{
          marginTop: "30px",
          padding: "10px",
          background: "#f0f0f0",
          borderRadius: "4px",
        }}
      >
        <strong>🧪 Testing Checklist:</strong>
        <ul style={{ fontSize: "14px", marginTop: "5px" }}>
          <li>✅ Should show "Loading..." initially</li>
          <li>✅ Should display list of users after load</li>
          <li>✅ Check Network tab → Should see 1 request</li>
          <li>✅ TypeScript auto-complete works (user.name, user.email)</li>
          <li>✅ No console warnings on unmount</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * 🎯 SUCCESS CRITERIA:
 *
 * ✅ Hook Implementation:
 * - [ ] Generic type <T> works correctly
 * - [ ] States: data (T | null), loading (boolean), error (string)
 * - [ ] Async fetch trong useEffect
 * - [ ] Check response.ok before parsing
 * - [ ] Parse JSON với await response.json()
 * - [ ] Error handling với try/catch
 * - [ ] AbortController created và used
 * - [ ] Cleanup với controller.abort()
 * - [ ] Ignore AbortError trong catch
 * - [ ] Return { data, loading, error }
 *
 * ✅ Demo Component:
 * - [ ] User interface defined
 * - [ ] useFetch<User[]> với correct URL
 * - [ ] Loading state displayed
 * - [ ] Error state displayed
 * - [ ] User list rendered
 * - [ ] No TypeScript errors
 *
 * ✅ Best Practices:
 * - [ ] AbortController prevents memory leaks
 * - [ ] No "Can't update unmounted component" warnings
 * - [ ] Type-safe (auto-complete works)
 * - [ ] Handles network errors gracefully
 *
 * 📝 GHI CHÚ:
 * - fetch() không throw on 404/500 → Phải check response.ok
 * - fetch() chỉ throw on network errors
 * - AbortController.abort() cancels request
 * - Abort throws error với name: 'AbortError'
 * - useEffect dependency [url] → re-fetch khi URL thay đổi
 *
 * 💡 BONUS (Optional):
 * - Add retry logic
 * - Add refetch function
 * - Support POST/PUT/DELETE methods
 * - Add request options (headers, etc.)
 *
 * 🌐 PUBLIC APIs FOR TESTING:
 * - JSONPlaceholder: https://jsonplaceholder.typicode.com/users
 * - Posts: https://jsonplaceholder.typicode.com/posts
 * - Todos: https://jsonplaceholder.typicode.com/todos
 */
