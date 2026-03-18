"use client";

import { restoreProduct } from "@/features/products/api/api.products";
import { extractErrorMessage } from "@/config/http/api.error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function useRestoreProduct(id?: string) {
	const queryClient = useQueryClient();
	const router = useRouter();

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
			router.refresh();
		},

		onError: (error) => {
			toast.error(extractErrorMessage(error));
		},
	});
}
