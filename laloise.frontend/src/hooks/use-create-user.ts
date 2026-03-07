"use client"

import { createUser } from "@/api/api.accounts";
import { extractErrorMessage } from "@/api/api.error";
import { CreateUserRequest } from "@/constants/schemas/create-user-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseCreateAccountOptions {
  mutationFn: (data: CreateUserRequest) => Promise<any>;
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