/**
 * withAuth HOC - Protected Routes
 * =================================
 *
 * HOC để protect routes yêu cầu authentication
 *
 * FEATURES:
 * 1. Check auth status
 * 2. Show loading while checking
 * 3. Redirect to login if not authenticated
 * 4. Optional: Role-based access control
 * 5. Optional: Custom redirect URL
 * 6. Optional: Custom loading component
 *
 * USAGE:
 *
 * // Basic
 * const ProtectedDashboard = withAuth(Dashboard);
 *
 * // With options
 * const AdminPanel = withAuth(AdminPanel, {
 *   allowedRoles: ['admin'],
 *   redirectTo: '/login',
 *   LoadingComponent: CustomSpinner,
 * });
 *
 * // In routes
 * <Route path="/dashboard" element={<ProtectedDashboard />} />
 * <Route path="/admin" element={<AdminPanel />} />
 */

import React, { ComponentType } from "react";
import { useUser, useAuthState, User } from "../contexts/auth";

// ============================================
// TYPES
// ============================================

/**
 * WithAuthOptions: Config options cho HOC
 */
interface WithAuthOptions {
  /**
   * URL để redirect nếu chưa authenticated
   * Default: '/login'
   */
  redirectTo?: string;

  /**
   * Roles được phép access
   * Nếu undefined, cho phép tất cả authenticated users
   */
  allowedRoles?: User["role"][];

  /**
   * Custom loading component
   */
  LoadingComponent?: ComponentType;

  /**
   * Custom unauthorized component
   */
  UnauthorizedComponent?: ComponentType<{ requiredRoles?: User["role"][] }>;
}

// ============================================
// DEFAULT COMPONENTS
// ============================================

/**
 * Default Loading Component
 */
function DefaultLoading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #3498db",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

/**
 * Default Redirect Component
 *
 * Trong production, sử dụng Navigate từ react-router-dom
 */
function DefaultRedirect({ to }: { to: string }) {
  // Simulate redirect (in real app, use react-router's Navigate)
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h2>Authentication Required</h2>
      <p>You need to login to access this page.</p>
      <a
        href={to}
        style={{
          display: "inline-block",
          marginTop: "16px",
          padding: "12px 24px",
          backgroundColor: "#3498db",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Go to Login
      </a>
    </div>
  );
}

/**
 * Default Unauthorized Component
 */
function DefaultUnauthorized({
  requiredRoles,
}: {
  requiredRoles?: User["role"][];
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        backgroundColor: "#fee2e2",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ color: "#dc2626" }}>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
      {requiredRoles && (
        <p>Required role(s): {requiredRoles.join(", ")}</p>
      )}
    </div>
  );
}

// ============================================
// withAuth HOC
// ============================================

/**
 * withAuth: HOC để protect components
 *
 * @param WrappedComponent - Component cần protect
 * @param options - Config options
 * @returns Protected component
 *
 * TYPE EXPLANATION:
 * - P extends object: Props của WrappedComponent
 * - Trả về component với cùng props P
 */
export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const {
    redirectTo = "/login",
    allowedRoles,
    LoadingComponent = DefaultLoading,
    UnauthorizedComponent = DefaultUnauthorized,
  } = options;

  /**
   * WithAuthComponent: Component wrapper
   *
   * FLOW:
   * 1. Check isLoading -> Show loading
   * 2. Check isAuthenticated -> Redirect if not
   * 3. Check roles (if specified) -> Show unauthorized if no match
   * 4. Render WrappedComponent
   */
  function WithAuthComponent(props: P) {
    const user = useUser();
    const { isLoading, isAuthenticated } = useAuthState();

    // ============================================
    // STATE 1: LOADING
    // ============================================
    if (isLoading) {
      return <LoadingComponent />;
    }

    // ============================================
    // STATE 2: NOT AUTHENTICATED
    // ============================================
    if (!isAuthenticated || !user) {
      return <DefaultRedirect to={redirectTo} />;
    }

    // ============================================
    // STATE 3: CHECK ROLES (if specified)
    // ============================================
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(user.role)) {
        return <UnauthorizedComponent requiredRoles={allowedRoles} />;
      }
    }

    // ============================================
    // STATE 4: AUTHENTICATED & AUTHORIZED
    // ============================================
    return <WrappedComponent {...props} />;
  }

  // ============================================
  // SET displayName FOR DEVTOOLS
  // ============================================
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithAuthComponent.displayName = `withAuth(${displayName})`;

  return WithAuthComponent;
}

// ============================================
// EXAMPLE USAGE
// ============================================

/**
 * Example: Dashboard component
 */
function Dashboard() {
  const user = useUser();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <p>This is a protected page.</p>
    </div>
  );
}

/**
 * Example: Admin Panel component
 */
function AdminPanel() {
  const user = useUser();

  return (
    <div style={{ padding: "20px", backgroundColor: "#fef3c7" }}>
      <h1>Admin Panel</h1>
      <p>Welcome Admin {user?.name}!</p>
      <p>This page is only accessible by admins.</p>
    </div>
  );
}

/**
 * Example: User Profile component
 */
function UserProfile() {
  const user = useUser();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}

// ============================================
// EXPORT PROTECTED COMPONENTS
// ============================================

/**
 * ProtectedDashboard: Yêu cầu authenticated
 */
export const ProtectedDashboard = withAuth(Dashboard);

/**
 * ProtectedAdminPanel: Yêu cầu role admin
 */
export const ProtectedAdminPanel = withAuth(AdminPanel, {
  allowedRoles: ["admin"],
});

/**
 * ProtectedProfile: Với custom loading
 */
export const ProtectedProfile = withAuth(UserProfile, {
  LoadingComponent: () => <div>Loading profile...</div>,
});

// ============================================
// DEMO COMPONENT
// ============================================

export function WithAuthDemo() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>withAuth HOC Demo</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>1. Protected Dashboard</h3>
        <ProtectedDashboard />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>2. Admin Only Panel</h3>
        <ProtectedAdminPanel />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>3. Protected Profile</h3>
        <ProtectedProfile />
      </div>
    </div>
  );
}

export default withAuth;
