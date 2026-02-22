import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData } from "@/constants/schemas";
import { ApiError } from "@/api/ApiError";
import { loginService } from "@/api/api.auht";
import { useAuthStore } from "@/store/UserStore";

export const useLogin = () => {
  const {setUser} = useAuthStore();
   const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const login = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);

      const response = await loginService.login(data);
      setUser(response)
      router.push("/dashboard");
    } catch (error: any) {
      const apiErr = error as ApiError;
      setApiError(apiErr.message || "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, apiError };
};