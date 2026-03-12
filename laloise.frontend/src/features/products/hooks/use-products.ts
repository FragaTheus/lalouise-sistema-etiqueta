"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/features/products/api/api.products";
import { ProductSummary, PageResponse } from "@/features/products/api/api.products.data";

interface UseProductsParams {
  page?: number;
  size?: number;
  search?: string | null;
}

export function useProducts({
  page = 0,
  size = 20,
  search,
}: UseProductsParams = {}) {
  return useQuery<PageResponse<ProductSummary>>({
    queryKey: ["products", page, size, search],
    queryFn: () => getProducts({ page, size, search }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
