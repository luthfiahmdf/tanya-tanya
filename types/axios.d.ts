import "axios";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
    _retry?: boolean;
    _retryCount?: number;
  }
}
