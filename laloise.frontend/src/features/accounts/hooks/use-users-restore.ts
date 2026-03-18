"use client";

import { restoreUser } from "@/features/accounts/api/api.accounts";
import { extractErrorMessage } from "@/config/http/api.error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function useUsersRestore(id?: string) {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: () => {
			if (!id) {
				throw new Error("ID do usuário não informado");
			}

			return restoreUser(id);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["users-deleted"] });
			queryClient.invalidateQueries({ queryKey: ["user-profile", id] });
			toast.success("Usuário restaurado com sucesso!");
			router.push("/painel/contas");
		},

		onError: (error) => {
			toast.error(extractErrorMessage(error));
		},
	});
}
