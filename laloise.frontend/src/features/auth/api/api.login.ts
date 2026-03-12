import api from "@/config/http/api";

export interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  nickname: string;
  role: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
    const { data: user } = await api.post<LoginResponse>(
      "/auth/login",
      data
    );
    return user;
}
