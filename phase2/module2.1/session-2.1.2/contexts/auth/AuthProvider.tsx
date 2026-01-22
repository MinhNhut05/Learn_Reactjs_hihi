/**
 * REAL EXERCISE: AuthProvider với Split Contexts
 * ===============================================
 *
 * QUAN TRỌNG: Đây là pattern SPLIT CONTEXTS
 *
 * VẤN ĐỀ với Single Context:
 * - Khi user data thay đổi, TẤT CẢ consumers re-render
 * - LogoutButton chỉ cần logout() nhưng vẫn re-render khi user đổi
 *
 * GIẢI PHÁP: Tách thành 2 contexts
 * - UserContext: Chỉ chứa user data (thay đổi khi login/logout)
 * - AuthActionsContext: Chứa actions (STABLE - không thay đổi)
 *
 * KẾT QUẢ:
 * - Components dùng useUser() sẽ re-render khi user đổi
 * - Components dùng useAuthActions() KHÔNG re-render khi user đổi
 */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

// ============================================
// TYPES
// ============================================

/**
 * User: Thông tin user
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
}

/**
 * LoginCredentials: Thông tin đăng nhập
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * AuthActions: Các actions liên quan đến auth
 *
 * LƯU Ý: Đây là functions, sẽ được memoize để stable reference
 */
export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

/**
 * AuthState: Full state bao gồm cả data và loading
 */
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// ============================================
// CONTEXTS - SPLIT!
// ============================================

/**
 * UserContext: Chỉ chứa user data
 *
 * Consumers:
 * - UserAvatar (cần user.avatar)
 * - UserProfile (cần user.*)
 * - Navbar (cần user.name)
 */
const UserContext = createContext<User | null>(null);
UserContext.displayName = "UserContext";

/**
 * AuthStateContext: Chứa loading và auth status
 *
 * Consumers:
 * - Components cần check loading state
 * - Components cần check isAuthenticated
 */
interface AuthStateValue {
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthStateContext = createContext<AuthStateValue>({
  isLoading: true,
  isAuthenticated: false,
});
AuthStateContext.displayName = "AuthStateContext";

/**
 * AuthActionsContext: Chứa actions - STABLE REFERENCE
 *
 * Consumers:
 * - LoginForm (cần login)
 * - LogoutButton (cần logout)
 * - ProfileEditForm (cần updateProfile)
 *
 * QUAN TRỌNG: Context này KHÔNG thay đổi sau khi mount
 * => Components dùng nó KHÔNG re-render khi user đổi!
 */
const AuthActionsContext = createContext<AuthActions | null>(null);
AuthActionsContext.displayName = "AuthActionsContext";

// ============================================
// PROVIDER
// ============================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // ============================================
  // STATE
  // ============================================
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ============================================
  // INITIALIZE: Check existing session
  // ============================================
  useEffect(() => {
    async function checkAuth() {
      try {
        // Simulate checking localStorage/cookie for existing session
        const savedUser = localStorage.getItem("auth_user");

        if (savedUser) {
          const parsedUser = JSON.parse(savedUser) as User;
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to restore auth session:", error);
        localStorage.removeItem("auth_user");
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  // ============================================
  // ACTIONS - Memoized for stable reference
  // ============================================

  /**
   * login: Đăng nhập
   *
   * FLOW:
   * 1. Set loading
   * 2. Call API (simulated)
   * 3. Save user to state và localStorage
   * 4. Clear loading
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful login
      const newUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: "John Doe",
        email: credentials.email,
        role: "user",
      };

      // Save to localStorage
      localStorage.setItem("auth_user", JSON.stringify(newUser));

      // Update state
      setUser(newUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * logout: Đăng xuất
   *
   * FLOW:
   * 1. Clear localStorage
   * 2. Clear user state
   */
  const logout = useCallback(() => {
    localStorage.removeItem("auth_user");
    setUser(null);
  }, []);

  /**
   * updateProfile: Cập nhật profile
   *
   * FLOW:
   * 1. Merge new data với existing user
   * 2. Save to localStorage
   * 3. Update state
   */
  const updateProfile = useCallback(
    async (data: Partial<User>) => {
      if (!user) {
        throw new Error("No user logged in");
      }

      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const updatedUser = { ...user, ...data };

        localStorage.setItem("auth_user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (error) {
        console.error("Update profile failed:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  // ============================================
  // MEMOIZED VALUES
  // ============================================

  /**
   * authState: Loading và auth status
   *
   * Chỉ thay đổi khi isLoading hoặc user thay đổi
   */
  const authState = useMemo<AuthStateValue>(
    () => ({
      isLoading,
      isAuthenticated: !!user,
    }),
    [isLoading, user]
  );

  /**
   * actions: Auth actions - STABLE REFERENCE
   *
   * useMemo đảm bảo object này chỉ tạo lại khi dependencies thay đổi
   * login và logout KHÔNG thay đổi (useCallback với empty deps)
   * => actions object STABLE!
   */
  const actions = useMemo<AuthActions>(
    () => ({
      login,
      logout,
      updateProfile,
    }),
    [login, logout, updateProfile]
  );

  // ============================================
  // RENDER: NESTED PROVIDERS
  // ============================================
  /**
   * Thứ tự nesting không quan trọng ở đây
   * vì cả 3 contexts đều cùng 1 cấp trong AuthProvider
   */

  return (
    <UserContext.Provider value={user}>
      <AuthStateContext.Provider value={authState}>
        <AuthActionsContext.Provider value={actions}>
          {children}
        </AuthActionsContext.Provider>
      </AuthStateContext.Provider>
    </UserContext.Provider>
  );
}

// ============================================
// HOOKS - Clean API for consumers
// ============================================

/**
 * useUser: Lấy user data
 *
 * USAGE:
 * const user = useUser();
 * if (!user) return <Login />;
 * return <div>{user.name}</div>;
 *
 * RE-RENDERS: Khi user thay đổi
 */
export function useUser(): User | null {
  return useContext(UserContext);
}

/**
 * useAuthState: Lấy loading và auth status
 *
 * USAGE:
 * const { isLoading, isAuthenticated } = useAuthState();
 *
 * RE-RENDERS: Khi isLoading hoặc isAuthenticated thay đổi
 */
export function useAuthState(): AuthStateValue {
  return useContext(AuthStateContext);
}

/**
 * useAuthActions: Lấy auth actions
 *
 * USAGE:
 * const { login, logout, updateProfile } = useAuthActions();
 *
 * RE-RENDERS: KHÔNG RE-RENDER khi user thay đổi!
 * (Vì actions được memoized và stable)
 */
export function useAuthActions(): AuthActions {
  const context = useContext(AuthActionsContext);

  if (!context) {
    throw new Error("useAuthActions must be used within AuthProvider");
  }

  return context;
}

/**
 * useAuth: Convenience hook - get everything
 *
 * CẢNH BÁO: Hook này sẽ re-render khi BẤT KỲ giá trị nào thay đổi
 * Chỉ dùng khi thực sự cần tất cả!
 */
export function useAuth() {
  const user = useUser();
  const { isLoading, isAuthenticated } = useAuthState();
  const actions = useAuthActions();

  return {
    user,
    isLoading,
    isAuthenticated,
    ...actions,
  };
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default AuthProvider;
