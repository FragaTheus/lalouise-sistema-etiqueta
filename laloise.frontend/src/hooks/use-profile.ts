"use client"

import { getMe, PerfilInfo } from "@/api/api.perfil";
import { useQuery } from "@tanstack/react-query";

export default function useProfile() {
    return useQuery<PerfilInfo, Error>({
        queryKey: ["profile"],
        queryFn: getMe,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });
}