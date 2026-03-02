import axios from "axios";
import { HandlerResponse } from "./api.types";

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as HandlerResponse<unknown> | undefined;
    return response?.message ?? error.message;
  }
  return "Erro inesperado";
}