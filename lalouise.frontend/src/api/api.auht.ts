import { LoginFormData } from "@/constants/schemas";
import { api } from "./api";

export interface LoginResponse{
    id: string;
    nickname: string;
    role: string;
}

export const loginService = {
    async login(credentials: LoginFormData): Promise<LoginResponse>{
        const response = await api.post<LoginResponse>("/auth/login", credentials);
        return response.data;
    }
}