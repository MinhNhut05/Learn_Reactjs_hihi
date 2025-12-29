/**
 * ✅ SOLUTION: Custom useFetch Hook
 */

import { useEffect, useState } from "react";

// ============================================================
// SOLUTION: useFetch Hook
// ============================================================

function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string;
} {
  // 1. States
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // 2. useEffect với fetch + AbortController
  useEffect(() => {
    // Create AbortController
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        // Reset states
        setLoading(true);
        setError("");

        // Fetch với signal
        const response = await fetch(url, {
          signal: controller.signal,
        });

        // Check response ok (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON
        const json = await response.json();

        // Update data
        setData(json);
      } catch (err) {
        // Ignore abort errors (intentional cancellation)
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        // Handle other errors
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        // Always set loading to false
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: Abort request khi unmount hoặc url thay đổi
    return () => {
      controller.abort();
    };
  }, [url]); // Re-fetch khi URL thay đổi

  // 3. Return object
  return { data, loading, error };
}

// ============================================================
// DEMO COMPONENT
// ============================================================

// Define User interface để type-safe
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export default function UseFetchDemo() {
  // Use hook để fetch users từ JSONPlaceholder
  const { data, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  // Loading state
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

  // Error state
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

  // No data (shouldn't happen, but good to check)
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

  // Render user list
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
        <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>
          ✅ Loaded {data.length} users
        </p>
      </div>

      {/* User List */}
      <div>
        <h4>Users:</h4>
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
 * 📝 GIẢI THÍCH IMPLEMENTATION:
 *
 * 1. **Generic Type <T>:**
 *    - useFetch<User[]> → T = User[]
 *    - data type: User[] | null
 *    - TypeScript knows exact shape của data
 *    - Auto-complete: user.name, user.email, etc.
 *
 * 2. **Three States Pattern:**
 *    - loading: true → Show spinner/loading message
 *    - error: string → Show error message
 *    - data: T | null → Show content
 *
 * 3. **Async/Await trong useEffect:**
 *    - KHÔNG thể: useEffect(async () => {...})
 *    - PHẢI: useEffect(() => { async function fetch() {...}; fetch() }, [])
 *    - useEffect cleanup function KHÔNG async
 *
 * 4. **response.ok Check:**
 *    - fetch() KHÔNG throw on 404, 500, etc.
 *    - Chỉ throw on network errors
 *    - Phải manually check: if (!response.ok) throw new Error(...)
 *
 * 5. **AbortController Pattern:**
 *    - Create: const controller = new AbortController()
 *    - Pass signal: fetch(url, { signal: controller.signal })
 *    - Cleanup: return () => controller.abort()
 *    - Prevents: "Can't update unmounted component" warning
 *
 * 6. **AbortError Handling:**
 *    - controller.abort() throws error với name: 'AbortError'
 *    - We intentionally aborted → không phải real error
 *    - Ignore: if (err.name === 'AbortError') return
 *
 * 7. **Try/Catch/Finally:**
 *    - try: Fetch và parse data
 *    - catch: Handle errors (network, parse, abort)
 *    - finally: ALWAYS setLoading(false) (dù success hay error)
 *
 * 8. **Dependencies [url]:**
 *    - Re-fetch khi URL thay đổi
 *    - Cleanup cancels previous request
 *    - Useful cho dynamic URLs: `/api/posts/${postId}`
 *
 * 💡 REAL-WORLD PATTERNS:
 *
 * **Pattern 1: Dynamic URL:**
 * ```tsx
 * function PostDetail({ postId }: { postId: number }) {
 *   const { data } = useFetch<Post>(`/api/posts/${postId}`)
 *   // Re-fetches automatically when postId changes
 * }
 * ```
 *
 * **Pattern 2: Conditional Fetch:**
 * ```tsx
 * const { data } = useFetch<User>(userId ? `/api/users/${userId}` : '')
 * // Only fetches if userId exists
 * ```
 *
 * **Pattern 3: Error Retry:**
 * ```tsx
 * if (error) {
 *   return (
 *     <div>
 *       Error: {error}
 *       <button onClick={() => window.location.reload()}>Retry</button>
 *     </div>
 *   )
 * }
 * ```
 *
 * **Pattern 4: Loading Skeleton:**
 * ```tsx
 * if (loading) {
 *   return <UserListSkeleton />  // Better UX than "Loading..."
 * }
 * ```
 *
 * 🚀 ADVANCED IMPROVEMENTS (Beyond this exercise):
 * - Add POST/PUT/DELETE support
 * - Add request headers/options
 * - Add refetch function
 * - Add cache mechanism
 * - Use React Query for production (better DX)
 */
