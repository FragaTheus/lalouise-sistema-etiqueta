import { api } from "./api";


export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  nickname: string;
  role: string;
}


export const login = async (
  data: LoginRequest
): Promise<AuthUser> =>
  (await api.post<AuthUser>("/auth/login", data)).data;

