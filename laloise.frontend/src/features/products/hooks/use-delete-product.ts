"use client";

import { deleteProduct } from "@/features/products/api/api.products";
import { extractErrorMessage } from "@/config/http/api.error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function useDeleteProduct(id?: string) {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: () => {
			if (!id) {
				throw new Error("ID do produto não informado");
			}

			return deleteProduct(id);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["product", id] });
			toast.success("Produto excluído com sucesso!");
			router.push("/contas/produtos");
		},

		onError: (error) => {
			toast.error(extractErrorMessage(error));
		},
	});
}
