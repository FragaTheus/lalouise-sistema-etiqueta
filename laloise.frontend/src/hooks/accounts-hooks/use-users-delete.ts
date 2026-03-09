"use client";

import { deleteUser } from "@/api/api-accounts/api.accounts";
import { extractErrorMessage } from "@/api/api.error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUsersDelete(id?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => {
			if (!id) {
				throw new Error("ID do usuário não informado");
			}

			return deleteUser(id);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["user-profile", id] });
			toast.success("Usuário excluído com sucesso!");
		},

		onError: (error) => {
			toast.error(extractErrorMessage(error));
		},
	});
}
