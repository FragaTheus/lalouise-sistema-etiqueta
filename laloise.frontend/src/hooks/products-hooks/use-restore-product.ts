"use client";

import { restoreProduct } from "@/api/api-products/api.products";
import { extractErrorMessage } from "@/api/api.error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useRestoreProduct(id?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => {
			if (!id) {
				throw new Error("ID do produto não informado");
			}

			return restoreProduct(id);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["products-deleted"] });
			queryClient.invalidateQueries({ queryKey: ["product", id] });
			toast.success("Produto restaurado com sucesso!");
		},

		onError: (error) => {
			toast.error(extractErrorMessage(error));
		},
	});
}
