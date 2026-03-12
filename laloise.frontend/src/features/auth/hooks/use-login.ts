"use client"

import { extractErrorMessage } from "@/config/http/api.error";
import { login, LoginRequest } from "@/features/auth/api/api.login";
import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useLogin(){
    const router = useRouter();
    const setUSer = useAuthStore((state)=> state.setUser) 

    return useMutation({
        mutationFn: (data: LoginRequest) => login(data),

        onSuccess: (user) => {
            setUSer(user);
            toast.success(`Bem vindo de volta! ${user.nickname}. Redirecionando para o painel...`)
            router.push("/painel")
        },

        onError: (error) => {
            toast.error(extractErrorMessage(error))
        }
    })
}