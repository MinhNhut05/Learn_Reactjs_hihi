/**
 * SESSION 2.1.2 - PROVIDER COMPOSITION PATTERN
 * =============================================
 *
 * VẤN ĐỀ: PROVIDER HELL
 *
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <ThemeProvider>
 *         <I18nProvider>
 *           <QueryProvider>
 *             <NotificationProvider>
 *               <ModalProvider>
 *                 <AppContent />  // 6 levels deep!
 *               </ModalProvider>
 *             </NotificationProvider>
 *           </QueryProvider>
 *         </I18nProvider>
 *       </ThemeProvider>
 *     </AuthProvider>
 *   );
 * }
 *
 * PROBLEMS:
 * 1. Khó đọc, khó maintain
 * 2. Thứ tự providers có thể quan trọng
 * 3. Khó test (phải wrap nhiều providers)
 * 4. Tất cả consumers re-render khi 1 context thay đổi
 *
 * SOLUTIONS:
 * 1. composeProviders utility
 * 2. Single AppProvider
 * 3. Split contexts (data vs actions)
 */

import React, { ReactNode, FC } from "react";

// ============================================
// SOLUTION 1: composeProviders UTILITY
// ============================================

/**
 * Provider type: Component nhận children và render children
 */
type ProviderComponent = FC<{ children: ReactNode }>;

/**
 * composeProviders: Gộp nhiều providers thành 1
 *
 * HOW IT WORKS:
 * - Nhận array of providers
 * - Return 1 component wrap tất cả
 * - Sử dụng reduceRight để wrap từ trong ra ngoài
 *
 * @param providers - Array of provider components
 * @returns Single composed provider
 */
export function composeProviders(...providers: ProviderComponent[]) {
  /**
   * reduceRight explanation:
   *
   * providers = [A, B, C]
   * reduceRight:
   *   Step 1: acc = children, Provider = C -> <C>{children}</C>
   *   Step 2: acc = <C>{children}</C>, Provider = B -> <B><C>{children}</C></B>
   *   Step 3: acc = <B><C>...</C></B>, Provider = A -> <A><B><C>{children}</C></B></A>
   *
   * Result: <A><B><C>{children}</C></B></A>
   */
  return function ComposedProviders({ children }: { children: ReactNode }) {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
  };
}

/**
 * USAGE:
 *
 * import { AuthProvider } from './contexts/auth';
 * import { ThemeProvider } from './contexts/theme';
 * import { NotificationProvider } from './contexts/notification';
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
 *       <AppContent />
 *     </AppProviders>
 *   );
 * }
 *
 * CLEAN! Từ 6 levels nesting -> 1 level
 */

// ============================================
// SOLUTION 2: SINGLE AppProvider COMPONENT
// ============================================

/**
 * AppProvider: Wrapper gom tất cả providers
 *
 * APPROACH NÀY PHÙ HỢP KHI:
 * - Providers có thể cần props
 * - Cần control thứ tự rõ ràng
 * - Có initialization logic
 */

// Import các providers (giả lập)
// import { AuthProvider } from './contexts/auth';
// import { ThemeProvider } from './contexts/theme';
// import { NotificationProvider } from './contexts/notification';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  /**
   * THỨ TỰ PROVIDERS QUAN TRỌNG!
   *
   * - AuthProvider ở ngoài cùng: Hầu hết features cần auth
   * - ThemeProvider tiếp theo: UI cần theme
   * - NotificationProvider: Có thể cần cả auth và theme
   *
   * Nếu ProviderB cần data từ ProviderA,
   * thì ProviderA phải wrap ProviderB
   */

  return (
    // Giả lập - thực tế import từ các file riêng
    <MockAuthProvider>
      <MockThemeProvider>
        <MockNotificationProvider>{children}</MockNotificationProvider>
      </MockThemeProvider>
    </MockAuthProvider>
  );
}

// Mock providers cho demo
function MockAuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
function MockThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
function MockNotificationProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// ============================================
// SOLUTION 3: SPLIT CONTEXTS (IMPORTANT!)
// ============================================

/**
 * VẤN ĐỀ VỚI SINGLE CONTEXT:
 *
 * const AuthContext = createContext({
 *   user: null,
 *   token: null,
 *   login: () => {},
 *   logout: () => {},
 *   updateProfile: () => {},
 * });
 *
 * PROBLEM: Khi user thay đổi, TẤT CẢ consumers re-render
 * - LogoutButton chỉ cần logout function
 * - Nhưng vẫn re-render khi user data thay đổi!
 *
 * SOLUTION: Split thành 2 contexts
 * - UserContext: Chỉ chứa user data
 * - AuthActionsContext: Chỉ chứa actions (stable references)
 */

// Xem file AuthProvider.tsx để thấy implementation đầy đủ

// ============================================
// ADVANCED: CONFIGURABLE PROVIDER COMPOSITION
// ============================================

/**
 * createProvider: Factory để tạo provider với default values
 *
 * HỮU ÍCH KHI:
 * - Cần test với mock values
 * - Cần override defaults trong một số cases
 */
interface ProviderConfig<T> {
  defaultValue: T;
  Provider: React.FC<{ children: ReactNode; value?: Partial<T> }>;
  useContext: () => T;
}

export function createProviderFactory<T extends object>(
  defaultValue: T,
  displayName: string
): ProviderConfig<T> {
  const Context = React.createContext<T>(defaultValue);
  Context.displayName = displayName;

  function Provider({
    children,
    value,
  }: {
    children: ReactNode;
    value?: Partial<T>;
  }) {
    const mergedValue = { ...defaultValue, ...value };
    return <Context.Provider value={mergedValue}>{children}</Context.Provider>;
  }

  function useContextHook(): T {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error(`use${displayName} must be used within ${displayName}Provider`);
    }
    return context;
  }

  return {
    defaultValue,
    Provider,
    useContext: useContextHook,
  };
}

/**
 * USAGE:
 *
 * const { Provider: FeatureFlagProvider, useContext: useFeatureFlags } =
 *   createProviderFactory(
 *     { darkMode: false, newUI: false },
 *     'FeatureFlags'
 *   );
 *
 * // In App
 * <FeatureFlagProvider value={{ darkMode: true }}>
 *   <App />
 * </FeatureFlagProvider>
 *
 * // In component
 * const { darkMode, newUI } = useFeatureFlags();
 */

// ============================================
// BEST PRACTICES SUMMARY
// ============================================

/**
 * 1. SPLIT DATA VÀ ACTIONS
 *    - Data context: user, theme, notifications
 *    - Actions context: login, logout, showNotification
 *    - Actions được memoized => không gây re-render
 *
 * 2. USE composeProviders UTILITY
 *    - Clean code
 *    - Dễ thêm/bớt providers
 *    - Dễ test
 *
 * 3. ĐẶT TÊN RÕ RÀNG
 *    - useUser() - lấy user data
 *    - useAuthActions() - lấy auth actions
 *    - useTheme() - lấy theme
 *
 * 4. HANDLE MISSING PROVIDER
 *    - Throw error rõ ràng khi dùng hook ngoài provider
 *    - Giúp debug nhanh hơn
 *
 * 5. SET displayName
 *    - Giúp debug trong React DevTools
 */

export default composeProviders;
