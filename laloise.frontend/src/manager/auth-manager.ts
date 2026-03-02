import { login as loginRequest } from "@/api/api.login";
import { useAuthStore } from "@/store/zustand.user";
import type { LoginRequest } from "@/api/api.types";


export async function loginAndSetUser(data: LoginRequest) {
  const response = await loginRequest(data);

  const { setUser } = useAuthStore.getState();

  setUser(response);

  return response;
}

export function logoutUser() {
  const { logout } = useAuthStore.getState();
  logout();
}