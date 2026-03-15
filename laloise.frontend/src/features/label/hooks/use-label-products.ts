"use client";

import { getProducts } from "@/shared/api/api.shared.products";
import type {
  PageResponse,
  ProductSummary,
} from "@/features/products/api/api.products.data";
import { useQuery } from "@tanstack/react-query";

interface UseLabelProductsParams {
  page?: number;
  search?: string | null;
}

export function useLabelProducts({
  page = 0,
  search,
}: UseLabelProductsParams = {}) {
  return useQuery<PageResponse<ProductSummary>>({
    queryKey: ["label-products", page, search],
    queryFn: () => getProducts({ page, size: 20, search }),
    staleTime: 1000 * 60 * 5,
  });
}
