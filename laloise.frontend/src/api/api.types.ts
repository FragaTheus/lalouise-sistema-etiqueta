//Interface do handler response
export interface HandlerResponse<T> {
  timestamp: string;
  status: number;
  message: string;
  data: T | null;
}

//Interfaces para autenticacao
export interface LoginResponse {
  id: string;
  nickname: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
