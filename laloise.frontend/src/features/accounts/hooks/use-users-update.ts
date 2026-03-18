"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { updateUser } from "@/features/accounts/api/api.accounts";
import { UpdateUserPayload } from "@/features/profile/api/api.perfil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useUsersUpdate(id?: string) {
	const queryClient = useQueryClient();
	const router = useRouter();

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
			router.refresh();
		},

		onError: (error) => {
			toast.error(extractErrorMessage(error));
		},
	});
}

