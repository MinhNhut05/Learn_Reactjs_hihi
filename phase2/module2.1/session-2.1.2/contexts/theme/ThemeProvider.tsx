/**
 * ThemeProvider với localStorage Persist
 * =======================================
 *
 * Features:
 * 1. Dark/Light theme toggle
 * 2. Persist theme preference to localStorage
 * 3. Respect system preference initially
 * 4. CSS variables for easy styling
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";

// ============================================
// TYPES
// ============================================

/**
 * Theme: Các theme có sẵn
 */
export type Theme = "light" | "dark";

/**
 * ThemeContextValue: Giá trị context cung cấp
 */
interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// ============================================
// CONSTANTS
// ============================================

const STORAGE_KEY = "app_theme";

/**
 * CSS Variables cho mỗi theme
 *
 * Trong production, bạn có thể dùng CSS-in-JS
 * hoặc set CSS variables trên :root
 */
export const themeColors = {
  light: {
    "--bg-primary": "#ffffff",
    "--bg-secondary": "#f5f5f5",
    "--text-primary": "#1a1a1a",
    "--text-secondary": "#666666",
    "--border-color": "#e0e0e0",
    "--accent-color": "#2563eb",
  },
  dark: {
    "--bg-primary": "#1a1a1a",
    "--bg-secondary": "#2d2d2d",
    "--text-primary": "#ffffff",
    "--text-secondary": "#a0a0a0",
    "--border-color": "#404040",
    "--accent-color": "#3b82f6",
  },
} as const;

// ============================================
// CONTEXT
// ============================================

const ThemeContext = createContext<ThemeContextValue | null>(null);
ThemeContext.displayName = "ThemeContext";

// ============================================
// HELPER: Get initial theme
// ============================================

function getInitialTheme(): Theme {
  // 1. Check localStorage first
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }

    // 2. Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }

  // 3. Default to light
  return "light";
}

// ============================================
// PROVIDER
// ============================================

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  // ============================================
  // STATE
  // ============================================
  const [theme, setThemeState] = useState<Theme>(
    defaultTheme ?? getInitialTheme
  );

  // ============================================
  // EFFECTS
  // ============================================

  /**
   * Effect 1: Apply theme to document
   *
   * - Set data-theme attribute cho CSS selectors
   * - Apply CSS variables to :root
   */
  useEffect(() => {
    const root = document.documentElement;

    // Set attribute for CSS selectors: [data-theme="dark"]
    root.setAttribute("data-theme", theme);

    // Apply CSS variables
    const colors = themeColors[theme];
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  /**
   * Effect 2: Listen for system theme changes
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if no saved preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // ============================================
  // CALLBACKS
  // ============================================

  /**
   * setTheme: Set theme và persist to localStorage
   */
  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem(STORAGE_KEY, newTheme);
    setThemeState(newTheme);
  }, []);

  /**
   * toggleTheme: Toggle between light/dark
   */
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  // ============================================
  // MEMOIZED VALUE
  // ============================================

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDark: theme === "dark",
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme]
  );

  // ============================================
  // RENDER
  // ============================================

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

/**
 * useTheme: Access theme context
 *
 * USAGE:
 * const { theme, isDark, toggleTheme } = useTheme();
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

// ============================================
// DEMO COMPONENT
// ============================================

export function ThemeDemo() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
      }}
    >
      <h3>Theme Demo</h3>
      <p>Current theme: {theme}</p>
      <p>Is dark mode: {isDark ? "Yes" : "No"}</p>

      <button
        onClick={toggleTheme}
        style={{
          padding: "8px 16px",
          backgroundColor: "var(--accent-color)",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeProvider;
