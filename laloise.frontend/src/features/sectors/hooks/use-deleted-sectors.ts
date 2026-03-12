"use client";

import { getDeletedSectors } from "@/features/sectors/api/api.sectors";
import {
  GetSectorsParams,
  PageResponse,
  SectorSummary,
} from "@/features/sectors/api/api.sectors.data";
import { useQuery } from "@tanstack/react-query";

export function useDeletedSectors({
  page = 0,
  size = 20,
  search,
}: GetSectorsParams = {}) {
  return useQuery<PageResponse<SectorSummary>>({
    queryKey: ["sectors-deleted", page, size, search],
    queryFn: () => getDeletedSectors({ page, size, search }),
    staleTime: 1000 * 60 * 5,
  });
}
