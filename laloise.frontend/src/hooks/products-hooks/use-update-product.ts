"use client";

import { extractErrorMessage } from "@/api/api.error";
import { updateProduct } from "@/api/api-products/api.products";
import { UpdateProductRequest } from "@/api/api-products/api.products.data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateProduct(id?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Partial<UpdateProductRequest>) => {
			if (!id) {
				throw new Error("ID do produto não informado");
			}

			return updateProduct(id, data);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["product", id] });
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.success("Produto atualizado com sucesso!");
		},

		onError: (error) => {
			toast.error(extractErrorMessage(error));
		},
	});
}
