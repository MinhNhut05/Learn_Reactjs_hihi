/**
 * Exercise 1: useContext Basics - Theme System
 * Difficulty: Medium
 * Time: 20-25 minutes
 *
 * LEARNING GOALS:
 * - Hieu createContext syntax va TypeScript typing
 * - Biet cach tao Provider component
 * - Biet cach consume context voi useContext
 * - Hieu custom hook pattern voi error handling
 *
 * SCENARIO:
 * Tao Theme context cho phep components access theme (light/dark)
 * va toggle theme bat ky dau trong component tree.
 *
 * FILL-IN-THE-BLANK MODE:
 * - Dien vao cac cho ??? de hoan thanh code
 * - Moi cho can dien co <- hint de huong dan
 * - Xem Hints section o cuoi component neu can tro giup
 */

import { useState, ReactNode } from "react";

// ============================================================
// STEP 1: TYPE DEFINITIONS (DONE)
// ============================================================

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// ============================================================
// STEP 2: CREATE CONTEXT
// Fill: createContext hook voi correct type
// ============================================================

// TODO: Tao context voi createContext
// Hint: createContext<Type | undefined>(defaultValue)
const ThemeContext = ???<??? | ???>(???);
//                   ^createContext   ^ThemeContextType   ^undefined   ^undefined

// ============================================================
// STEP 3: CREATE PROVIDER COMPONENT
// Fill: Provider value prop
// ============================================================

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // TODO: Return Provider voi value chua theme va toggleTheme
  return (
    <???.Provider value={{ ???, ??? }}>
      {/* ^ThemeContext        ^theme  ^toggleTheme */}
      {children}
    </???.Provider>
    //  ^ThemeContext
  );
}

// ============================================================
// STEP 4: CUSTOM HOOK WITH ERROR CHECK
// Fill: useContext call va error check
// ============================================================

export function useTheme(): ThemeContextType {
  // TODO: Lay context bang useContext
  const context = ???(???);
  //              ^useContext  ^ThemeContext

  // TODO: Check neu undefined thi throw error
  if (context === ???) {
    //              ^undefined
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

// ============================================================
// DEMO COMPONENTS (DONE - chi de test)
// ============================================================

function ThemeToggleButton() {
  // Using custom hook - clean and type-safe
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

// Layout components to show deep nesting
function Sidebar() {
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
// MAIN COMPONENT - Wrapped with Provider
// ============================================================

export default function UseContextBasicsExercise() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exercise 1: useContext Basics - Theme System</h2>

      <div
        style={{
          backgroundColor: "#fff3e0",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Instructions:</h4>
        <ol style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>Tao ThemeContext bang createContext</li>
          <li>Complete ThemeProvider voi value prop</li>
          <li>Complete useTheme custom hook</li>
          <li>Kiem tra toggle button thay doi theme</li>
        </ol>
      </div>

      {/* TODO: Bao boc voi ThemeProvider */}
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

      {/* Hints Section */}
      <details style={{ marginTop: "2rem" }}>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          Show Hints
        </summary>
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h4>Hints for each blank:</h4>
          <pre
            style={{
              backgroundColor: "#263238",
              color: "#aed581",
              padding: "1rem",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
{`// STEP 2: Create Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// STEP 3: Provider value
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  {children}
</ThemeContext.Provider>

// STEP 4: Custom Hook
const context = useContext(ThemeContext);
if (context === undefined) {
  throw new Error("...");
}`}
          </pre>
        </div>
      </details>
    </div>
  );
}
