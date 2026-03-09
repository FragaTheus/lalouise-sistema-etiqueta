import { CreateUserRequest } from "@/constants/schemas/create-user-schema";
import api from "../api";
import { UpdateUserPayload } from "../api.perfil";
import { GetUsersParams, PageResponse, UserInfoApiResponse, UserSummary } from "./api.accounts.data";



export const createAdmin = async (data: CreateUserRequest): Promise<void> => {
  try {
    await api.post("/admins/create-admins", data);
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: CreateUserRequest): Promise<void> => {
  try {
    await api.post("/admins", data);
  } catch (error) {
    throw error;
  }
};

export const getUsers = async ({
  page = 0,
  size = 20,
  search,
  role,
}: GetUsersParams): Promise<PageResponse<UserSummary>> => {
  const { data } = await api.get("/admins", {
    params: { page, size, search, role },
  });
  return data;
};

export const getUserById = async (id: string): Promise<UserInfoApiResponse> => {
  const { data } = await api.get<UserInfoApiResponse>(`/admins/${id}`);

  return {
    id: data.id ?? id,
    nickname: data.nickname,
    email: data.email,
    role: data.role,
    status: data.status,
    createdAt: data.createdAt ?? data.createAt ?? "",
    updatedAt: data.updatedAt ?? data.updateAt ?? "",
    lastLoginAt: data.lastLoginAt ?? data.lastLogin ?? null,
  };
};

export const updateUser = async (
  id: string,
  data: Partial<UpdateUserPayload>,
): Promise<void> => {
  await api.patch(`/admins/${id}`, data);
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/admins/${id}`);
};

export const getDeletedUsers = async ({
  page = 0,
  size = 20,
  search,
}: GetUsersParams): Promise<PageResponse<UserSummary>> => {
  const { data } = await api.get("/admins/deleted", {
    params: { page, size, search },
  });
  return data;
};

export const restoreUser = async (id: string): Promise<void> => {
  await api.patch(`/admins/${id}/restore`);
}
