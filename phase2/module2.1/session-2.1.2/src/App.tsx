/**
 * SESSION 2.1.2 - DEMO APP
 * =========================
 *
 * App này demo các patterns:
 * 1. Render Props - MouseTracker
 * 2. Provider Composition - AppProvider
 * 3. Theme - ThemeProvider
 * 4. Notifications - NotificationProvider
 * 5. Toggle - Render Props exercise
 */

import { useState } from "react";

// Import providers
import { AppProvider } from "../providers/AppProvider";
import { useTheme } from "../contexts/theme";
import { useNotification } from "../contexts/notification";
import { useUser, useAuthActions, useAuthState } from "../contexts/auth";

// Import components
import { MouseTracker } from "../components/MouseTracker";
import { Toggle } from "../solutions/Toggle.solution";

// ============================================
// DEMO COMPONENTS
// ============================================

/**
 * Demo 1: MouseTracker (Render Props)
 */
function MouseTrackerDemo() {
  return (
    <section>
      <h2>1. Render Props - MouseTracker</h2>
      <p>Di chuyển chuột để xem vị trí:</p>

      <MouseTracker>
        {({ x, y }) => (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f0f9ff",
              borderRadius: "8px",
              marginTop: "12px",
            }}
          >
            <p>
              Mouse position: <strong>X: {x}, Y: {y}</strong>
            </p>
          </div>
        )}
      </MouseTracker>
    </section>
  );
}

/**
 * Demo 2: Toggle (Render Props)
 */
function ToggleDemo() {
  return (
    <section>
      <h2>2. Render Props - Toggle</h2>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {/* Basic Toggle */}
        <Toggle>
          {({ on, toggle }) => (
            <div>
              <p>Basic Toggle: {on ? "ON" : "OFF"}</p>
              <button
                onClick={toggle}
                style={{
                  backgroundColor: on ? "#10b981" : "#ef4444",
                  color: "white",
                }}
              >
                Toggle
              </button>
            </div>
          )}
        </Toggle>

        {/* Switch Style */}
        <Toggle>
          {({ on, toggle }) => (
            <div
              onClick={toggle}
              style={{
                width: "60px",
                height: "30px",
                backgroundColor: on ? "#10b981" : "#ccc",
                borderRadius: "15px",
                position: "relative",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "2px",
                  left: on ? "32px" : "2px",
                  transition: "left 0.3s",
                }}
              />
            </div>
          )}
        </Toggle>
      </div>
    </section>
  );
}

/**
 * Demo 3: Theme Provider
 */
function ThemeDemo() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <section>
      <h2>3. Provider - Theme</h2>
      <p>Current theme: {theme}</p>
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: isDark ? "#f59e0b" : "#1f2937",
          color: "white",
        }}
      >
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </section>
  );
}

/**
 * Demo 4: Notification Provider
 */
function NotificationDemo() {
  const { showSuccess, showError, showInfo, showWarning } = useNotification();

  return (
    <section>
      <h2>4. Provider - Notifications</h2>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          onClick={() => showSuccess("Profile saved successfully!")}
          style={{ backgroundColor: "#10b981", color: "white" }}
        >
          Success
        </button>
        <button
          onClick={() => showError("Failed to save changes")}
          style={{ backgroundColor: "#ef4444", color: "white" }}
        >
          Error
        </button>
        <button
          onClick={() => showInfo("New features available!")}
          style={{ backgroundColor: "#3b82f6", color: "white" }}
        >
          Info
        </button>
        <button
          onClick={() => showWarning("Session expiring soon")}
          style={{ backgroundColor: "#f59e0b", color: "white" }}
        >
          Warning
        </button>
      </div>
    </section>
  );
}

/**
 * Demo 5: Auth Provider (Split Contexts)
 */
function AuthDemo() {
  const user = useUser();
  const { isLoading } = useAuthState();
  const { login, logout } = useAuthActions();
  const [email, setEmail] = useState("demo@example.com");

  if (isLoading) {
    return (
      <section>
        <h2>5. Provider - Auth (Split Contexts)</h2>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h2>5. Provider - Auth (Split Contexts)</h2>

      {user ? (
        <div>
          <p>
            Logged in as: <strong>{user.name}</strong> ({user.email})
          </p>
          <p>Role: {user.role}</p>
          <button
            onClick={logout}
            style={{ backgroundColor: "#ef4444", color: "white" }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <button
              onClick={() => login({ email, password: "demo" })}
              style={{ backgroundColor: "#3b82f6", color: "white" }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================
// MAIN APP
// ============================================

function AppContent() {
  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🎯 Session 2.1.2 - Advanced Patterns Demo</h1>
      <p style={{ marginBottom: "32px", color: "#666" }}>
        Demo các patterns: Render Props, HOC, Provider Composition
      </p>

      <MouseTrackerDemo />
      <ToggleDemo />
      <ThemeDemo />
      <NotificationDemo />
      <AuthDemo />

      <section style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac" }}>
        <h2>✅ Bạn đã học được gì?</h2>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <strong>Render Props:</strong> MouseTracker, Toggle - children là function
          </li>
          <li>
            <strong>Provider Composition:</strong> AppProvider gộp nhiều providers
          </li>
          <li>
            <strong>Split Contexts:</strong> AuthProvider tách user và actions
          </li>
          <li>
            <strong>localStorage persist:</strong> Theme được lưu
          </li>
        </ul>
      </section>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
