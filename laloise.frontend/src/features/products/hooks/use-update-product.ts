"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { updateProduct } from "@/features/products/api/api.products";
import { UpdateProductRequest } from "@/features/products/api/api.products.data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useUpdateProduct(id?: string) {
	const queryClient = useQueryClient();
	const router = useRouter();

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
			router.refresh();
		},

		onError: (error) => {
			toast.error(extractErrorMessage(error));
		},
	});
}
