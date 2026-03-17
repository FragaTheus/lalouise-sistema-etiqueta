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
    const data = error.response?.data;

    if (data) {
      console.error(`Erro ${data.status}: ${data.message}`);
    } else {
      console.error("Erro na API:", error.message);
    }

    return Promise.reject(error);
  }
);



export default api;