import {
  createContext,
  useContext,
  useState,
  useCallback,
  type PropsWithChildren,
} from "react";
import type { Theme } from "../types";

/**
 * TODO: Implement ThemeContext
 *
 * This context provides theme state and toggle function.
 *
 * Requirements:
 * 1. Create context type for { theme, toggleTheme }
 * 2. Use useState for theme ('light' | 'dark')
 * 3. Load theme from localStorage on init (lazy useState)
 * 4. Save theme to localStorage when it changes
 * 5. Memoize toggleTheme with useCallback
 *
 * Hints:
 * - Use lazy initialization: useState(() => { ... })
 * - toggleTheme should flip between 'light' and 'dark'
 */

// TODO: Define context type
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
const STORAGE_KEY = "task-manager-themes";
// TODO: Create context
const ThemeContext = createContext<ThemeContextType | null>(null);

// TODO: Create Provider component
export function ThemeProvider({ children }: PropsWithChildren) {
  // TODO: Initialize theme from localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        return saved;
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    } catch {
      return "light";
    }
    return "light";
  });

  // TODO: Memoize toggleTheme function
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // TODO: useEffect to save theme to localStorage

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// TODO: Create custom hook
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
