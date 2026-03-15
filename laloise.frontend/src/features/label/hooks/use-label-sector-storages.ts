"use client";

import {
  getActiveSectorId,
  getStoragesBySectorId,
} from "@/shared/api/api.shared.sectors";
import type { StorageType } from "@/shared/constants/storage-types";
import { useQuery } from "@tanstack/react-query";

export function useLabelSectorStorages() {
  const sectorQuery = useQuery<string, Error>({
    queryKey: ["label-active-sector-id"],
    queryFn: getActiveSectorId,
    staleTime: 1000 * 60 * 5,
  });

  const sectorId = sectorQuery.data;

  const storagesQuery = useQuery<StorageType[], Error>({
    queryKey: ["label-sector-storages", sectorId],
    queryFn: () => getStoragesBySectorId(sectorId!),
    staleTime: 1000 * 60 * 5,
    enabled: !!sectorId,
  });

  return {
    sectorId,
    storages: storagesQuery.data ?? [],
    isLoading: sectorQuery.isLoading || storagesQuery.isLoading,
    isError: sectorQuery.isError || storagesQuery.isError,
    refetch: async () => {
      await sectorQuery.refetch();
      await storagesQuery.refetch();
    },
  };
}
