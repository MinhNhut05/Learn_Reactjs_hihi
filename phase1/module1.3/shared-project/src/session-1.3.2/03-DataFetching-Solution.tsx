/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                    EXERCISE 3: DATA FETCHING PATTERNS                    ║
 * ║                              ✅ SOLUTION                                 ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

// ✅ TODO 0: Import React hooks
import { useState, useEffect } from "react";

// ============================================================================
//                                TYPES
// ============================================================================

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

// ============================================================================
//                             MAIN COMPONENT
// ============================================================================

export function DataFetchingSolution() {
  // ✅ TODO 1: Declare states
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ✅ TODO 2: Setup useEffect with all the fetching logic
  useEffect(() => {
    // ✅ TODO 3: Create AbortController
    const abortController = new AbortController();
    console.log("🌐 Starting fetch for:", searchTerm || "all users");

    // ✅ TODO 4: Define async fetchUsers function
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build URL based on searchTerm
        const baseUrl = "https://jsonplaceholder.typicode.com";
        const url = searchTerm
          ? `${baseUrl}/users?username_like=${searchTerm}`
          : `${baseUrl}/users`;

        // Fetch with AbortController signal
        // 📝 The signal allows us to abort this request later
        const response = await fetch(url, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: User[] = await response.json();
        console.log("✅ Fetch success:", data.length, "users");
        setUsers(data);
      } catch (err) {
        // ✅ TODO 5: Error handling
        if (err instanceof Error) {
          // AbortError means we intentionally cancelled the request
          // This is NOT an error we want to show to users
          if (err.name === "AbortError") {
            console.log("🚫 Fetch aborted for:", searchTerm);
            return; // Exit early - don't set error state
          }

          // Real errors - show to user
          console.error("❌ Fetch error:", err.message);
          setError(err.message);
        }
      } finally {
        // Always runs - both success and error cases
        setLoading(false);
      }
    };

    // ✅ TODO 6: Call the async function
    fetchUsers();

    // ✅ TODO 7: Cleanup - abort pending request
    return () => {
      console.log("🧹 Aborting fetch for:", searchTerm || "all users");
      abortController.abort();
    };
  }, [searchTerm]);

  // 📝 HOW RACE CONDITION IS SOLVED:
  // ────────────────────────────────
  // User types: "B" → "Br" → "Bre" → "Bret" quickly
  //
  // Without cleanup:
  // - Request 1 ("B") sent
  // - Request 2 ("Br") sent
  // - Request 3 ("Bre") sent
  // - Request 4 ("Bret") sent
  // - Response 4 arrives first → shows "Bret" results
  // - Response 1 arrives LAST → OVERWRITES with "B" results! ❌
  //
  // With AbortController cleanup:
  // - Request 1 ("B") sent
  // - User types "Br" → Request 1 ABORTED, Request 2 sent
  // - User types "Bre" → Request 2 ABORTED, Request 3 sent
  // - User types "Bret" → Request 3 ABORTED, Request 4 sent
  // - Only Request 4 completes → shows correct "Bret" results ✅

  // ✅ TODO 8: Search input handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // ✅ TODO 9: Render UI
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Exercise 3: Data Fetching Patterns ✅</h2>

      {/* Search Input */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by username..."
          style={inputStyle}
        />
        <span style={{ color: "#666" }}>
          Type to search (try: "Bret", "Anton", "Delphine")
        </span>
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

      {/* Data State - Only show when not loading and no error */}
      {!loading && !error && (
        <div>
          <p style={{ marginBottom: "1rem" }}>
            Found <strong>{users.length}</strong> user(s)
          </p>
          {users.length === 0 ? (
            <div style={emptyStyle}>No users found matching "{searchTerm}"</div>
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
        <h3>📋 How to Test Race Conditions:</h3>
        <ol>
          <li>Open Network tab in DevTools (F12)</li>
          <li>
            Throttle to "Slow 3G" (Network tab → dropdown near "Disable cache")
          </li>
          <li>Type quickly: "B", "Br", "Bre", "Bret"</li>
          <li>
            Watch console: <code>🚫 Fetch aborted</code> for old requests
          </li>
          <li>
            Watch Network: Old requests show <code>(canceled)</code>
          </li>
        </ol>

        <h3>💡 Key Takeaways:</h3>
        <ul>
          <li>
            <strong>AbortController</strong> cancels pending fetch requests
          </li>
          <li>
            <strong>AbortError</strong> is not a real error - don't show to user
          </li>
          <li>
            <strong>Cleanup runs</strong> before new effect = old request aborted
          </li>
          <li>
            <strong>finally block</strong> ensures loading state is always reset
          </li>
        </ul>
      </div>
    </div>
  );
}

// ============================================================================
//                                STYLES
// ============================================================================

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
};

export default DataFetchingSolution;
