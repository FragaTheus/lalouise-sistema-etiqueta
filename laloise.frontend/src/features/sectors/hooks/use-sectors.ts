"use client";

import { getSectors } from "@/features/sectors/api/api.sectors";
import {
  GetSectorsParams,
  PageResponse,
  SectorSummary,
} from "@/features/sectors/api/api.sectors.data";
import { useQuery } from "@tanstack/react-query";

export function useSectors({
  page = 0,
  size = 20,
  search,
}: GetSectorsParams = {}) {
  return useQuery<PageResponse<SectorSummary>>({
    queryKey: ["sectors", page, size, search],
    queryFn: () => getSectors({ page, size, search }),
    staleTime: 1000 * 60 * 5,
  });
}
