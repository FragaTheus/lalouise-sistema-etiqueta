import api from "../api";

interface CreateUserRequest {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const createAdmin = async (data: CreateUserRequest): Promise<void> => {
  try {
    await api.post("/accounts/admins", data);
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: CreateUserRequest): Promise<void> => {
  try {
    await api.post("/accounts", data);
  } catch (error) {
    throw error;
  }
};
