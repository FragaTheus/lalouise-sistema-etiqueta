"use client";

import { getDeletedProducts } from "@/features/products/api/api.products";
import { ProductSummary, PageResponse } from "@/features/products/api/api.products.data";
import { useQuery } from "@tanstack/react-query";

interface UseDeletedProductsParams {
  page?: number;
  size?: number;
  search?: string | null;
}

export function useDeletedProducts({
  page = 0,
  size = 20,
  search,
}: UseDeletedProductsParams = {}) {
  return useQuery<PageResponse<ProductSummary>>({
    queryKey: ["products-deleted", page, size, search],
    queryFn: () => getDeletedProducts({ page, size, search }),
    staleTime: 1000 * 60 * 5,
  });
}
