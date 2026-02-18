import axios, { AxiosError } from "axios";
import { ApiError } from "./ApiError";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      const isLoginRoute = error.config?.url?.includes("/auth/login");

      if (!isLoginRoute) {
        window.location.href = "/login";
        return Promise.reject({
          status: 401,
          message: "Sessão expirada",
        });
      }
    }

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      status: 500,
      message: "Erro inesperado ao comunicar com o servidor",
    });
  }
);

