import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

// Enhanced error types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
  timestamp: string;
}

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

const configApi: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
};

export const api = axios.create(configApi);

// Request interceptor with enhanced logging
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.user?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
      );
    }

    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(createApiError(error));
  },
);

// Response interceptor with retry logic and enhanced error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response time in development
    if (process.env.NODE_ENV === "development" && response.config.metadata) {
      const duration =
        new Date().getTime() - response.config.metadata.startTime.getTime();
      console.log(
        `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`,
      );
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle network errors
    if (!error.response) {
      console.error("[Network Error]", error.message);
      return Promise.reject(createApiError(error, "Network error occurred"));
    }

    const { status } = error.response;

    // Retry logic for specific status codes
    if (
      RETRY_CONFIG.retryableStatuses.includes(status) &&
      originalRequest &&
      !originalRequest._retry &&
      (originalRequest._retryCount || 0) < RETRY_CONFIG.maxRetries
    ) {
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

      const delay =
        RETRY_CONFIG.retryDelay * Math.pow(2, originalRequest._retryCount - 1);

      console.warn(
        `[API Retry] Attempt ${originalRequest._retryCount}/${RETRY_CONFIG.maxRetries} after ${delay}ms`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
      return api(originalRequest);
    }

    // Handle authentication errors
    if (status === 401) {
      console.warn("[Auth Error] Unauthorized access");
      // TODO: Redirect to login or refresh token
      if (typeof window !== "undefined") {
        // Only redirect on client side
        window.location.href = "/login";
      }
    }

    // Handle forbidden access
    if (status === 403) {
      console.warn("[Access Error] Forbidden access");
    }

    // Handle rate limiting
    if (status === 429) {
      console.warn("[Rate Limit] Too many requests");
    }

    // Log error details in development
    if (process.env.NODE_ENV === "development") {
      console.error("[API Error]", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    return Promise.reject(createApiError(error));
  },
);

// Helper function to create standardized API errors
function createApiError(error: AxiosError, customMessage?: string): ApiError {
  const status = error.response?.status || 0;
  const responseData = error.response?.data as Record<string, unknown>;

  let message = customMessage || "An unexpected error occurred";

  if (responseData?.message && typeof responseData.message === "string") {
    message = responseData.message;
  } else if (error.message) {
    message = error.message;
  }

  // Map common HTTP status codes to user-friendly messages
  const statusMessages: Record<number, string> = {
    400: "Invalid request. Please check your input.",
    401: "Authentication required. Please log in.",
    403: "Access denied. You don't have permission.",
    404: "The requested resource was not found.",
    408: "Request timeout. Please try again.",
    429: "Too many requests. Please wait and try again.",
    500: "Server error. Please try again later.",
    502: "Service temporarily unavailable.",
    503: "Service temporarily unavailable.",
    504: "Request timeout. Please try again.",
  };

  if (statusMessages[status]) {
    message = statusMessages[status];
  }

  return {
    message,
    status,
    code:
      typeof responseData?.code === "string"
        ? responseData.code
        : typeof error.code === "string"
          ? error.code
          : undefined,
    details: responseData?.details || responseData,
    timestamp: new Date().toISOString(),
  };
}

// Utility function to check if error is an API error
export function isApiError(error: unknown): error is ApiError {
  return (
    error !== null &&
    typeof error === "object" &&
    "message" in error &&
    "status" in error
  );
}

// Utility function to get user-friendly error message
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}
