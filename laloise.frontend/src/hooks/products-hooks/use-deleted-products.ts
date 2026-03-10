"use client";

import { getDeletedProducts } from "@/api/api-products/api.products";
import { ProductSummary, PageResponse } from "@/api/api-products/api.products.data";
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
