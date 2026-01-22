/**
 * AppProvider - Composed Provider
 * ================================
 *
 * Gộp tất cả providers thành một
 * Clean App.tsx với single provider
 *
 * THỨ TỰ PROVIDERS:
 * 1. AuthProvider (ngoài cùng) - Hầu hết features cần auth
 * 2. ThemeProvider - UI cần theme
 * 3. NotificationProvider (trong cùng) - Có thể cần auth và theme
 */

import React, { ReactNode } from "react";
import { AuthProvider } from "../contexts/auth";
import { ThemeProvider } from "../contexts/theme";
import { NotificationProvider } from "../contexts/notification";

// ============================================
// APPROACH 1: MANUAL COMPOSITION
// ============================================

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider: Single provider wrap tất cả
 *
 * USAGE trong App.tsx:
 *
 * function App() {
 *   return (
 *     <AppProvider>
 *       <Router>
 *         <AppRoutes />
 *       </Router>
 *     </AppProvider>
 *   );
 * }
 */
export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// ============================================
// APPROACH 2: USING composeProviders UTILITY
// ============================================

/**
 * composeProviders: Utility function
 *
 * Đã được tạo trong composeProviders.tsx
 * Có thể sử dụng như sau:
 *
 * import { composeProviders } from './composeProviders';
 *
 * const AppProviders = composeProviders(
 *   AuthProvider,
 *   ThemeProvider,
 *   NotificationProvider
 * );
 *
 * function App() {
 *   return (
 *     <AppProviders>
 *       <Router>
 *         <AppRoutes />
 *       </Router>
 *     </AppProviders>
 *   );
 * }
 */

// ============================================
// DEMO: App với AppProvider
// ============================================

/**
 * Demo App Component
 *
 * Uncomment và chạy để test
 */
export function DemoApp() {
  return (
    <AppProvider>
      <div style={{ padding: "20px" }}>
        <h1>Social App Demo</h1>

        {/* Import và sử dụng các demo components */}
        {/* <ThemeDemo /> */}
        {/* <NotificationDemo /> */}
        {/* <AuthDemo /> */}

        <p>
          All providers are working! Check console for auth state changes.
        </p>
      </div>
    </AppProvider>
  );
}

export default AppProvider;
