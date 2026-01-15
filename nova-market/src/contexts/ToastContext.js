"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Toast from "@/components/ui/Toast";

const ToastContext = createContext(undefined);

/**
 * Toast context provider for global notification management
 * Supports success, error, info, and warning notification types
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  /**
   * Add a new toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type (success, error, warning, info)
   * @param {number} duration - Auto-dismiss duration in milliseconds (0 = no auto-dismiss)
   */
  const showToast = useCallback((message, type = "info", duration = 5000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  /**
   * Remove a toast notification
   * @param {number} id - Toast ID
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Convenience methods for different toast types
   */
  const toast = {
    success: (message, duration) => showToast(message, "success", duration),
    error: (message, duration) => showToast(message, "error", duration),
    warning: (message, duration) => showToast(message, "warning", duration),
    info: (message, duration) => showToast(message, "info", duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast container */}
      <div
        className="fixed top-4 right-4 z-50 flex flex-col gap-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Hook to use toast notifications
 * @returns {object} Toast methods (success, error, warning, info)
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
