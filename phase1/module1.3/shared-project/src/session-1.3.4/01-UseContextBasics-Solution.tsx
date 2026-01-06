/**
 * Exercise 1: useContext Basics - Theme System (SOLUTION)
 *
 * COMPLETED VERSION with explanations
 */

import { createContext, useContext, useState, ReactNode } from "react";

// ============================================================
// STEP 1: TYPE DEFINITIONS
// ============================================================

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// ============================================================
// STEP 2: CREATE CONTEXT
// ============================================================

// createContext<T>(defaultValue) tao context voi type T
// Dung undefined lam default de bat buoc phai co Provider
// Neu khong co Provider, context se la undefined -> error
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================================
// STEP 3: CREATE PROVIDER COMPONENT
// ============================================================

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // State cho theme
  const [theme, setTheme] = useState<Theme>("light");

  // Function de toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Provider component cung cap value cho tat ca descendants
  // value prop chua tat ca data/functions muon share
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================================
// STEP 4: CUSTOM HOOK WITH ERROR CHECK
// ============================================================

export function useTheme(): ThemeContextType {
  // useContext(Context) lay value tu nearest Provider
  const context = useContext(ThemeContext);

  // Check undefined - xay ra khi dung hook ngoai Provider
  // Fail fast pattern: error message ro rang giup debug
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  // TypeScript hieu context khong con undefined sau check
  return context;
}

// ============================================================
// DEMO COMPONENTS
// ============================================================

function ThemeToggleButton() {
  // Custom hook - clean, type-safe, co error handling
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        cursor: "pointer",
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#333" : "#fff",
        border: `2px solid ${theme === "light" ? "#333" : "#fff"}`,
        borderRadius: "8px",
        transition: "all 0.3s ease",
      }}
    >
      Toggle Theme (Current: {theme})
    </button>
  );
}

function ThemedCard() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        padding: "1.5rem",
        margin: "1rem 0",
        borderRadius: "12px",
        backgroundColor: theme === "light" ? "#f5f5f5" : "#1a1a1a",
        color: theme === "light" ? "#333" : "#f5f5f5",
        border: `1px solid ${theme === "light" ? "#ddd" : "#444"}`,
        transition: "all 0.3s ease",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0" }}>Themed Card</h3>
      <p style={{ margin: 0 }}>
        This card automatically updates based on the current theme.
        Theme value comes from Context, not props!
      </p>
    </div>
  );
}

function DeepNestedComponent() {
  // Access theme truc tiep - khong can prop drilling
  const { theme } = useTheme();

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: theme === "light" ? "#e3f2fd" : "#0d47a1",
        color: theme === "light" ? "#1565c0" : "#bbdefb",
        borderRadius: "8px",
        textAlign: "center",
        transition: "all 0.3s ease",
      }}
    >
      I'm deeply nested but still access theme: <strong>{theme}</strong>
    </div>
  );
}

function Sidebar() {
  // Sidebar khong can theme - chi pass xuong DeepNestedComponent
  // Voi Context, no khong can biet ve theme!
  return (
    <div style={{ padding: "1rem", border: "1px dashed #999", borderRadius: "8px" }}>
      <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem", color: "#666" }}>
        Sidebar (doesn't need theme)
      </p>
      <DeepNestedComponent />
    </div>
  );
}

function MainContent() {
  return (
    <div>
      <ThemedCard />
      <Sidebar />
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function UseContextBasicsSolution() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exercise 1: useContext Basics - Theme System (Solution)</h2>

      <div
        style={{
          backgroundColor: "#e8f5e9",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Key Concepts:</h4>
        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>
            <strong>createContext</strong> - tao context object voi default value
          </li>
          <li>
            <strong>Provider</strong> - wrap components can access context
          </li>
          <li>
            <strong>useContext</strong> - consume context value
          </li>
          <li>
            <strong>Custom Hook</strong> - encapsulate error check va type safety
          </li>
        </ul>
      </div>

      {/* Provider wrap tat ca components can access theme */}
      <ThemeProvider>
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#fafafa",
            borderRadius: "12px",
            border: "1px solid #ddd",
          }}
        >
          <ThemeToggleButton />
          <MainContent />
        </div>
      </ThemeProvider>

      {/* Pattern Summary */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f3e5f5",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Pattern Summary:</h4>
        <pre
          style={{
            backgroundColor: "#263238",
            color: "#ce93d8",
            padding: "1rem",
            borderRadius: "8px",
            overflow: "auto",
            margin: 0,
          }}
        >
{`// 1. CREATE - Tao context
const MyContext = createContext<Type | undefined>(undefined);

// 2. PROVIDE - Tao Provider component
function MyProvider({ children }) {
  const [value, setValue] = useState(initialValue);
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

// 3. CONSUME - Custom hook (recommended)
function useMyContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("Must be used within Provider");
  }
  return context;
}

// 4. USE - Trong components
function MyComponent() {
  const { value, setValue } = useMyContext();
  // ...
}`}
        </pre>
      </div>
    </div>
  );
}
