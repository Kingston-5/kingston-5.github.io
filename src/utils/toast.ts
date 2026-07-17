// utils/toast.ts - Toast utilities
import { toast as reactToast } from "react-toastify";

// Custom toast configuration
const defaultConfig = {
  position: "top-right" as const,
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  className: "custom-toast",
  bodyClassName: "custom-toast-body",
  progressClassName: "custom-toast-progress",
};

// Custom toast methods
export const toast = {
  success: (message: string, options = {}) => {
    return reactToast.success(message, {
      ...defaultConfig,
      className: "custom-toast custom-toast-success",
      ...options,
    });
  },

  error: (message: string, options = {}) => {
    return reactToast.error(message, {
      ...defaultConfig,
      autoClose: 6000, // Errors stay longer
      className: "custom-toast custom-toast-error",
      ...options,
    });
  },

  warning: (message: string, options = {}) => {
    return reactToast.warning(message, {
      ...defaultConfig,
      className: "custom-toast custom-toast-warning",
      ...options,
    });
  },

  info: (message: string, options = {}) => {
    return reactToast.info(message, {
      ...defaultConfig,
      className: "custom-toast custom-toast-info",
      ...options,
    });
  },

  loading: (message: string, options = {}) => {
    return reactToast.loading(message, {
      ...defaultConfig,
      className: "custom-toast custom-toast-loading",
      ...options,
    });
  },

  //TODO: add Promise-based toast

  //TODO add Update an existing toast

  // Dismiss methods
  dismiss: (toastId?: string | number) => reactToast.dismiss(toastId),
  dismissAll: () => reactToast.dismiss(),
};

// TODO add Helper hook for common toast patterns
