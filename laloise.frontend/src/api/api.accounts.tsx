import api from "./api";

interface CreateUserRequest {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserSummary {
  id: string;
  nickname: string;
  email: string;
  isActive: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

interface GetUsersParams {
  page?: number;
  size?: number;
  search?: string | null;
  role?: string | null;
}

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
