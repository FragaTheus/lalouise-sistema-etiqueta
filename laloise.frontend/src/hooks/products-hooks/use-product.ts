"use client";

import { getProductById } from "@/api/api-products/api.products";
import { ProductInfo } from "@/api/api-products/api.products.data";
import { useQuery } from "@tanstack/react-query";

export function useProduct(id?: string) {
	return useQuery<ProductInfo, Error>({
		queryKey: ["product", id],
		queryFn: () => {
			if (!id) {
				throw new Error("ID do produto não informado");
			}

			return getProductById(id);
		},
		staleTime: 1000 * 60 * 5,
		enabled: Boolean(id),
	});
}
