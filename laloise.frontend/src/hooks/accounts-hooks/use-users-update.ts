"use client";

import { extractErrorMessage } from "@/api/api.error";
import { updateUser } from "@/api/api-accounts/api.accounts";
import { UpdateUserPayload } from "@/api/api.perfil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUsersUpdate(id?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Partial<UpdateUserPayload>) => {
			if (!id) {
				throw new Error("ID do usuário não informado");
			}

			return updateUser(id, data);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user-profile", id] });
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast.success("Usuário atualizado com sucesso!");
		},

		onError: (error) => {
			toast.error(extractErrorMessage(error));
		},
	});
}

