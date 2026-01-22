/**
 * NotificationProvider với Toast Methods
 * =======================================
 *
 * Features:
 * 1. showSuccess, showError, showInfo, showWarning
 * 2. Auto dismiss sau timeout
 * 3. Stack multiple notifications
 * 4. Dismiss individual notification
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";

// ============================================
// TYPES
// ============================================

/**
 * NotificationType: Các loại notification
 */
export type NotificationType = "success" | "error" | "info" | "warning";

/**
 * Notification: Một notification item
 */
export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number; // milliseconds, 0 = persistent
}

/**
 * NotificationOptions: Options khi tạo notification
 */
interface NotificationOptions {
  title?: string;
  duration?: number;
}

/**
 * NotificationActions: Methods để show/dismiss notifications
 *
 * SPLIT PATTERN: Tách actions ra context riêng để tránh re-render
 */
interface NotificationActions {
  showSuccess: (message: string, options?: NotificationOptions) => void;
  showError: (message: string, options?: NotificationOptions) => void;
  showInfo: (message: string, options?: NotificationOptions) => void;
  showWarning: (message: string, options?: NotificationOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_DURATION = 5000; // 5 seconds

const TYPE_STYLES: Record<
  NotificationType,
  { backgroundColor: string; icon: string }
> = {
  success: { backgroundColor: "#10b981", icon: "✓" },
  error: { backgroundColor: "#ef4444", icon: "✕" },
  info: { backgroundColor: "#3b82f6", icon: "ℹ" },
  warning: { backgroundColor: "#f59e0b", icon: "⚠" },
};

// ============================================
// CONTEXTS - Split pattern
// ============================================

/**
 * NotificationsContext: Chứa danh sách notifications
 *
 * Consumers: NotificationList (render notifications)
 * RE-RENDERS: Khi list thay đổi
 */
const NotificationsContext = createContext<Notification[]>([]);
NotificationsContext.displayName = "NotificationsContext";

/**
 * NotificationActionsContext: Chứa actions
 *
 * Consumers: Bất kỳ component nào cần show notification
 * RE-RENDERS: KHÔNG - actions được memoized
 */
const NotificationActionsContext = createContext<NotificationActions | null>(
  null
);
NotificationActionsContext.displayName = "NotificationActionsContext";

// ============================================
// PROVIDER
// ============================================

interface NotificationProviderProps {
  children: ReactNode;
  maxNotifications?: number;
}

export function NotificationProvider({
  children,
  maxNotifications = 5,
}: NotificationProviderProps) {
  // ============================================
  // STATE
  // ============================================
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // ============================================
  // HELPER: Generate unique ID
  // ============================================
  const generateId = useCallback(() => {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // ============================================
  // CORE ACTION: Add notification
  // ============================================
  const addNotification = useCallback(
    (type: NotificationType, message: string, options?: NotificationOptions) => {
      const id = generateId();
      const duration = options?.duration ?? DEFAULT_DURATION;

      const notification: Notification = {
        id,
        type,
        message,
        title: options?.title,
        duration,
      };

      // Add to list (limit to maxNotifications)
      setNotifications((prev) => {
        const updated = [notification, ...prev];
        return updated.slice(0, maxNotifications);
      });

      // Auto dismiss after duration (if not persistent)
      if (duration > 0) {
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, duration);
      }
    },
    [generateId, maxNotifications]
  );

  // ============================================
  // ACTIONS - Memoized
  // ============================================

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const showSuccess = useCallback(
    (message: string, options?: NotificationOptions) => {
      addNotification("success", message, options);
    },
    [addNotification]
  );

  const showError = useCallback(
    (message: string, options?: NotificationOptions) => {
      addNotification("error", message, { duration: 0, ...options }); // Errors persist by default
    },
    [addNotification]
  );

  const showInfo = useCallback(
    (message: string, options?: NotificationOptions) => {
      addNotification("info", message, options);
    },
    [addNotification]
  );

  const showWarning = useCallback(
    (message: string, options?: NotificationOptions) => {
      addNotification("warning", message, options);
    },
    [addNotification]
  );

  // ============================================
  // MEMOIZED ACTIONS OBJECT
  // ============================================

  const actions = useMemo<NotificationActions>(
    () => ({
      showSuccess,
      showError,
      showInfo,
      showWarning,
      dismiss,
      dismissAll,
    }),
    [showSuccess, showError, showInfo, showWarning, dismiss, dismissAll]
  );

  // ============================================
  // RENDER
  // ============================================

  return (
    <NotificationsContext.Provider value={notifications}>
      <NotificationActionsContext.Provider value={actions}>
        {children}
        {/* Render notification list */}
        <NotificationList />
      </NotificationActionsContext.Provider>
    </NotificationsContext.Provider>
  );
}

// ============================================
// HOOKS
// ============================================

/**
 * useNotifications: Lấy danh sách notifications
 *
 * USAGE: Thường dùng internal trong NotificationList
 */
export function useNotifications(): Notification[] {
  return useContext(NotificationsContext);
}

/**
 * useNotification: Lấy actions để show notifications
 *
 * USAGE:
 * const { showSuccess, showError } = useNotification();
 * showSuccess("Profile updated!");
 */
export function useNotification(): NotificationActions {
  const context = useContext(NotificationActionsContext);

  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }

  return context;
}

// ============================================
// NOTIFICATION LIST COMPONENT
// ============================================

function NotificationList() {
  const notifications = useNotifications();
  const { dismiss } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        maxWidth: "400px",
      }}
    >
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={() => dismiss(notification.id)}
        />
      ))}
    </div>
  );
}

// ============================================
// NOTIFICATION ITEM COMPONENT
// ============================================

interface NotificationItemProps {
  notification: Notification;
  onDismiss: () => void;
}

function NotificationItem({ notification, onDismiss }: NotificationItemProps) {
  const { type, title, message } = notification;
  const style = TYPE_STYLES[type];

  return (
    <div
      style={{
        backgroundColor: style.backgroundColor,
        color: "white",
        padding: "12px 16px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        animation: "slideIn 0.3s ease",
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: "18px" }}>{style.icon}</span>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{title}</div>
        )}
        <div>{message}</div>
      </div>

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        style={{
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          opacity: 0.7,
          fontSize: "16px",
        }}
      >
        ×
      </button>
    </div>
  );
}

// ============================================
// DEMO COMPONENT
// ============================================

export function NotificationDemo() {
  const { showSuccess, showError, showInfo, showWarning, dismissAll } =
    useNotification();

  return (
    <div style={{ padding: "20px" }}>
      <h3>Notification Demo</h3>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          onClick={() => showSuccess("Profile updated successfully!")}
          style={{ backgroundColor: "#10b981", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Success
        </button>

        <button
          onClick={() => showError("Failed to save changes", { title: "Error" })}
          style={{ backgroundColor: "#ef4444", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Error
        </button>

        <button
          onClick={() => showInfo("New features available!")}
          style={{ backgroundColor: "#3b82f6", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Info
        </button>

        <button
          onClick={() => showWarning("Your session will expire soon")}
          style={{ backgroundColor: "#f59e0b", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Warning
        </button>

        <button
          onClick={dismissAll}
          style={{ backgroundColor: "#6b7280", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Dismiss All
        </button>
      </div>
    </div>
  );
}

export default NotificationProvider;
