/**
 * SESSION 2.1.2 - HIGHER-ORDER COMPONENTS (HOC)
 * =============================================
 *
 * HOC là gì?
 * - Một FUNCTION nhận vào component, trả về component mới
 * - Component mới có thêm functionality
 * - Pattern "wrapper" - bọc component gốc
 *
 * NAMING CONVENTION:
 * - HOC functions bắt đầu bằng "with"
 * - withAuth, withTheme, withLoading, withErrorBoundary
 *
 * KHI NÀO DÙNG HOC?
 * - Route protection (withAuth)
 * - Feature flags (withFeatureFlag)
 * - Analytics tracking (withTracking)
 * - Error boundaries (class component required)
 */

import React, { ComponentType, useEffect, useState } from "react";

// ============================================
// VÍ DỤ 1: withLoading HOC
// ============================================

/**
 * withLoading: Thêm loading state cho component
 *
 * VẤN ĐỀ: Nhiều components cần hiển thị loading
 * GIẢI PHÁP: HOC inject loading logic
 */

// Props mà HOC sẽ inject vào component
interface WithLoadingInjectedProps {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

/**
 * withLoading HOC
 *
 * @param WrappedComponent - Component gốc cần enhance
 * @returns Component mới có thêm isLoading và setLoading
 *
 * TYPE EXPLANATION:
 * - P extends object: Props của WrappedComponent
 * - Omit<P, keyof WithLoadingInjectedProps>: Props mà user cần pass
 *   (bỏ đi các props mà HOC sẽ inject)
 */
export function withLoading<P extends WithLoadingInjectedProps>(
  WrappedComponent: ComponentType<P>
) {
  // Return new component
  function WithLoadingComponent(
    props: Omit<P, keyof WithLoadingInjectedProps>
  ) {
    // HOC quản lý state
    const [isLoading, setLoading] = useState(false);

    // Render WrappedComponent với props gốc + injected props
    return (
      <WrappedComponent
        {...(props as P)}
        isLoading={isLoading}
        setLoading={setLoading}
      />
    );
  }

  // Set displayName cho React DevTools
  // Giúp debug dễ hơn: WithLoading(MyComponent)
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithLoadingComponent.displayName = `withLoading(${displayName})`;

  return WithLoadingComponent;
}

// ============================================
// VÍ DỤ 2: withAuth HOC - QUAN TRỌNG!
// ============================================

/**
 * withAuth: Protect routes yêu cầu authentication
 *
 * FLOW:
 * 1. Check auth status
 * 2. Nếu đang loading -> show loading spinner
 * 3. Nếu chưa auth -> redirect to login
 * 4. Nếu đã auth -> render component gốc
 */

// Giả lập User type
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

// Giả lập auth state
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Giả lập useAuth hook
function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Simulate checking auth status
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Giả sử có user đã login (thực tế sẽ check localStorage/cookie)
      setState({
        user: { id: "1", name: "John", email: "john@example.com", role: "user" },
        isLoading: false,
        isAuthenticated: true,
      });
    };
    checkAuth();
  }, []);

  return state;
}

/**
 * withAuth HOC
 *
 * @param WrappedComponent - Component cần protect
 * @param options - Config options
 * @returns Protected component
 */
interface WithAuthOptions {
  // URL để redirect nếu chưa auth
  redirectTo?: string;
  // Roles được phép access (optional)
  allowedRoles?: ("admin" | "user")[];
  // Custom loading component
  LoadingComponent?: ComponentType;
}

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const {
    redirectTo = "/login",
    allowedRoles,
    LoadingComponent = () => <div>Loading...</div>,
  } = options;

  function WithAuthComponent(props: P) {
    const { user, isLoading, isAuthenticated } = useAuth();

    // ============================================
    // STATE 1: ĐANG CHECK AUTH
    // ============================================
    if (isLoading) {
      return <LoadingComponent />;
    }

    // ============================================
    // STATE 2: CHƯA AUTHENTICATED
    // ============================================
    if (!isAuthenticated || !user) {
      // Trong thực tế, sử dụng Navigate từ react-router
      console.log(`Redirecting to ${redirectTo}`);
      return (
        <div>
          <p>You need to login to access this page.</p>
          <a href={redirectTo}>Go to Login</a>
        </div>
      );
    }

    // ============================================
    // STATE 3: CHECK ROLE (NẾU CÓ)
    // ============================================
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return (
        <div>
          <p>Access Denied. Required roles: {allowedRoles.join(", ")}</p>
        </div>
      );
    }

    // ============================================
    // STATE 4: ĐÃ AUTH VÀ CÓ QUYỀN
    // ============================================
    return <WrappedComponent {...props} />;
  }

  // Set displayName
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithAuthComponent.displayName = `withAuth(${displayName})`;

  return WithAuthComponent;
}

// ============================================
// VÍ DỤ 3: withLogger HOC
// ============================================

/**
 * withLogger: Log lifecycle events của component
 *
 * HỮU ÍCH CHO:
 * - Debugging
 * - Performance monitoring
 * - Analytics
 */
export function withLogger<P extends object>(
  WrappedComponent: ComponentType<P>,
  componentName: string
) {
  function WithLoggerComponent(props: P) {
    useEffect(() => {
      console.log(`[${componentName}] Mounted`);
      console.log(`[${componentName}] Props:`, props);

      return () => {
        console.log(`[${componentName}] Unmounted`);
      };
    }, []);

    // Log khi props thay đổi
    useEffect(() => {
      console.log(`[${componentName}] Props updated:`, props);
    }, [props]);

    return <WrappedComponent {...props} />;
  }

  WithLoggerComponent.displayName = `withLogger(${componentName})`;

  return WithLoggerComponent;
}

// ============================================
// VÍ DỤ 4: COMPOSE NHIỀU HOCs
// ============================================

/**
 * VẤN ĐỀ: WRAPPER HELL
 *
 * const EnhancedComponent = withAuth(
 *   withTheme(
 *     withLogger(
 *       withLoading(MyComponent)
 *     )
 *   )
 * );
 *
 * - Khó đọc
 * - Khó debug
 * - Props có thể bị override
 */

/**
 * compose: Utility để compose nhiều HOCs
 *
 * USAGE:
 * const EnhancedComponent = compose(
 *   withAuth,
 *   withTheme,
 *   withLogger
 * )(MyComponent);
 */
type HOC<P> = (component: ComponentType<P>) => ComponentType<P>;

export function compose<P extends object>(...hocs: HOC<P>[]) {
  return (component: ComponentType<P>) =>
    hocs.reduceRight((acc, hoc) => hoc(acc), component);
}

// ============================================
// VÍ DỤ SỬ DỤNG
// ============================================

/**
 * Dashboard: Component cần được protect
 */
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the protected dashboard!</p>
    </div>
  );
}

/**
 * AdminPanel: Component chỉ admin mới access được
 */
function AdminPanel() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Only admins can see this.</p>
    </div>
  );
}

// Apply HOCs
export const ProtectedDashboard = withAuth(Dashboard);
export const ProtectedAdminPanel = withAuth(AdminPanel, {
  allowedRoles: ["admin"],
  redirectTo: "/login",
});

// Với logger
export const LoggedDashboard = withLogger(Dashboard, "Dashboard");

// ============================================
// TẠI SAO HOOKS THAY THẾ HOC?
// ============================================

/**
 * HOOKS APPROACH (MODERN - RECOMMENDED)
 *
 * function Dashboard() {
 *   const { user, isLoading } = useAuth();
 *   const theme = useTheme();
 *
 *   if (isLoading) return <Loading />;
 *   if (!user) return <Navigate to="/login" />;
 *
 *   return <div>Dashboard</div>;
 * }
 *
 * ADVANTAGES:
 * ✅ Không có wrapper components
 * ✅ Không có props collision
 * ✅ Dễ compose (chỉ cần gọi nhiều hooks)
 * ✅ Dễ hiểu flow
 * ✅ Better TypeScript support
 */

export default withAuth;
