import api from "@/config/http/api";

interface UpdatePerfilRequest{
    nickname?: string;
    password?: string;
    confirmPassword?: string
}

export interface PerfilInfo{
  nickname: string;
  email: string;
  role: string;
  createdAt: string;
}

export type UpdateUserPayload = {
    nickname?: string;
    password?: string;
    confirmPassword?: string;
};

export async function getMe(): Promise<PerfilInfo> {
    const response = await api.get<PerfilInfo>("/me");
    return response.data;
}

export async function updatePerfilMe(request: UpdatePerfilRequest): Promise<void> {
    await api.patch("/me", request);
}