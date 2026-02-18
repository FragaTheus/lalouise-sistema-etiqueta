export interface ApiError<T = unknown> {
  timestamp: string;
  status: number;
  message: string;
  data?: T | null;
}
