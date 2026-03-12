export interface CreateUserRequest {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserInfoApiResponse {
  id?: string;
  nickname: string;
  email: string;
  role: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string | null;
  createAt?: string;
  updateAt?: string;
  lastLogin?: string | null;
}

export interface UserSummary {
  id: string;
  nickname: string;
  email: string;
  role: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface GetUsersParams {
  page?: number;
  size?: number;
  search?: string | null;
  role?: string | null;
}