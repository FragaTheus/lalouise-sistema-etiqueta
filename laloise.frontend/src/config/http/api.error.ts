import axios from "axios";

export interface HandlerResponse<T> {
  timestamp: string;
  status: number;
  message: string;
  data: T | null;
}

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as HandlerResponse<unknown> | undefined;
    return response?.message ?? error.message;
  }
  return "Erro inesperado";
}