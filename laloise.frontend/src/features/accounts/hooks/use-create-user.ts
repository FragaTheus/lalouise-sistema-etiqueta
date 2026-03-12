"use client"

import { extractErrorMessage } from "@/config/http/api.error";
import { CreateUserRequest } from "@/features/accounts/constants/schemas/create-user-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseCreateAccountOptions {
    mutationFn: (data: CreateUserRequest) => Promise<unknown>;
  successMsg: string;
}

export default function useCreateUser({mutationFn, successMsg}: UseCreateAccountOptions){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,

        onSuccess: ()=>{
            toast.success(successMsg)
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },

        onError: (error) =>{
            toast.error(extractErrorMessage(error))
        }
    })
}