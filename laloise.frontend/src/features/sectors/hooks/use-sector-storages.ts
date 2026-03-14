"use client";

import { getStorages } from "@/features/sectors/api/api.sectors";
import { StorageType } from "@/features/sectors/api/api.sectors.data";
import { useQuery } from "@tanstack/react-query";

interface UseSectorStoragesOptions {
  sectorId: string;
  enabled?: boolean;
}

export function useSectorStorages({
  sectorId,
  enabled = true,
}: UseSectorStoragesOptions) {
  return useQuery<StorageType[]>({
    queryKey: ["sectors-storages", sectorId],
    queryFn: () => getStorages(sectorId),
    staleTime: 1000 * 60 * 5,
    enabled: enabled && !!sectorId,
  });
}
