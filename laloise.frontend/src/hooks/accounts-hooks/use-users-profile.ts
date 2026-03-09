"use client";

import { getUserById } from "@/api/api-accounts/api.accounts";
import { UserInfoApiResponse } from "@/api/api-accounts/api.accounts.data";
import { useQuery } from "@tanstack/react-query";

export function useUsersProfile(id?: string) {
	return useQuery<UserInfoApiResponse, Error>({
		queryKey: ["user-profile", id],
		queryFn: () => {
			if (!id) {
				throw new Error("ID do usuário não informado");
			}

			return getUserById(id);
		},
		staleTime: 1000 * 60 * 5,
		enabled: Boolean(id),
	});
}

