/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                    EXERCISE 3: DATA FETCHING PATTERNS                    ║
 * ║                        Difficulty: ⭐⭐⭐⭐ (Expert)                       ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * LEARNING GOALS:
 * - Async operations trong useEffect
 * - AbortController pattern
 * - Race condition prevention
 *
 * HƯỚNG DẪN: Điền vào các chỗ ??? để hoàn thành code
 */

import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export function DataFetchingExercise() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ════════════════════════════════════════════════════════════════
  // useEffect với async fetch + AbortController
  // Điền vào các chỗ ??? để hoàn thành
  // ════════════════════════════════════════════════════════════════

  useEffect(() => {
    const abortController = new AbortController(); // 👈 Tạo controller để cancel request
    console.log("🌐 Starting fetch for:", searchTerm || "all users");

    const fetchUsers = async () => {
      setLoading(true); // 👈 Set loading state
      setError(null); // 👈 Clear error state

      try {
        const baseUrl = "https://jsonplaceholder.typicode.com";
        const url = searchTerm
          ? `${baseUrl}/users?username_like=${searchTerm}`
          : `${baseUrl}/users`;

        const res = await fetch(url, {
          signal: abortController.signal, // 👈 Pass signal để có thể cancel
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data: User[] = await res.json();
        console.log("✅ Fetch success:", data.length, "users");
        setUsers(data); // 👈 Set users data
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            // 👈 Property để check loại error
            console.log("🚫 Fetch aborted for:", searchTerm);
            return;
          }
          console.error("❌ Fetch error:", err.message);
          setError(err.message); // 👈 Set error state
        }
      } finally {
        setLoading(false); // 👈 Set loading = false
      }
    };

    fetchUsers();

    return () => {
      console.log("🧹 Aborting fetch for:", searchTerm || "all users");
      abortController.abort(); // 👈 Method để cancel request
    };
  }, [searchTerm]); // 👈 Dependency - re-fetch khi biến này thay đổi

  // ════════════════════════════════════════════════════════════════
  // HANDLER (ĐÃ VIẾT SẴN)
  // ════════════════════════════════════════════════════════════════

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // ════════════════════════════════════════════════════════════════
  // UI (ĐÃ VIẾT SẴN)
  // ════════════════════════════════════════════════════════════════

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Exercise 3: Data Fetching Patterns</h2>

      {/* Search Input */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by username..."
          style={inputStyle}
        />
        <span style={{ color: "#666" }}>Try: "Bret", "Anton", "Delphine"</span>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={loadingStyle}>
          <span style={{ fontSize: "1.5rem" }}>⏳</span> Loading...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={errorStyle}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {/* Data State */}
      {!loading && !error && (
        <div>
          <p style={{ marginBottom: "1rem" }}>
            Found <strong>{users.length}</strong> user(s)
          </p>
          {users.length === 0 ? (
            <div style={emptyStyle}>
              {searchTerm
                ? `No users found matching "${searchTerm}"`
                : "Type to search users"}
            </div>
          ) : (
            <ul style={listStyle}>
              {users.map((user) => (
                <li key={user.id} style={userCardStyle}>
                  <strong style={{ fontSize: "1.1rem" }}>{user.name}</strong>
                  <span style={{ color: "#1976d2" }}>@{user.username}</span>
                  <span style={{ color: "#666" }}>{user.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Instructions */}
      <div style={instructionStyle}>
        <h3>📋 How to Test Race Condition:</h3>
        <ol>
          <li>Điền vào các chỗ ??? trong useEffect</li>
          <li>Open Network tab → Throttle to "Slow 3G"</li>
          <li>Type nhanh: "B", "Br", "Bre", "Bret"</li>
          <li>Xem console: old requests bị abort!</li>
        </ol>

        <h3>💡 Hints:</h3>
        <ul style={{ textAlign: "left" }}>
          <li>
            Controller class: <code>AbortController</code>
          </li>
          <li>
            Pass to fetch: <code>signal</code>
          </li>
          <li>
            Check error type: <code>name</code>
          </li>
          <li>
            Cancel method: <code>abort()</code>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ============================================================
// Styles
// ============================================================

const searchContainerStyle: React.CSSProperties = {
  marginBottom: "1.5rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "1rem",
  border: "2px solid #ddd",
  borderRadius: "8px",
  marginBottom: "0.5rem",
};

const loadingStyle: React.CSSProperties = {
  padding: "2rem",
  textAlign: "center",
  background: "#e3f2fd",
  borderRadius: "8px",
  fontSize: "1.2rem",
};

const errorStyle: React.CSSProperties = {
  padding: "1rem",
  background: "#ffebee",
  color: "#c62828",
  borderRadius: "8px",
  marginBottom: "1rem",
};

const emptyStyle: React.CSSProperties = {
  padding: "2rem",
  textAlign: "center",
  background: "#f5f5f5",
  borderRadius: "8px",
  color: "#666",
  fontStyle: "italic",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  display: "grid",
  gap: "0.5rem",
};

const userCardStyle: React.CSSProperties = {
  padding: "1rem",
  background: "#f5f5f5",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
};

const instructionStyle: React.CSSProperties = {
  marginTop: "2rem",
  padding: "1rem",
  background: "#e8f5e9",
  borderRadius: "8px",
  textAlign: "left",
};

export default DataFetchingExercise;
