import axios, { AxiosError } from "axios";
import { HandlerResponse } from "./api.error";

const API_BASE_URL = `/api`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<HandlerResponse<null>>) => {
    // Sem resposta do servidor: proxy ou rede inacessível
    if (!error.response) {
      console.error("[api] Network error — backend ou proxy indisponível:", error.message);
      return Promise.reject(error);
    }

    const data = error.response.data;

    if (data?.message) {
      console.error(`[api] Erro ${data.status}: ${data.message}`);
    } else {
      console.error(`[api] Erro HTTP ${error.response.status}:`, error.message);
    }

    return Promise.reject(error);
  }
);

export default api;