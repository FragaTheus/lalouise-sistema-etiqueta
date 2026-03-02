import api from "./api";
import { LoginRequest, LoginResponse } from "./api.types";

export async function login(data: LoginRequest): Promise<LoginResponse> {
    const { data: user } = await api.post<LoginResponse>(
      "/api/v1/auth/login",
      data
    );
    return user;
}