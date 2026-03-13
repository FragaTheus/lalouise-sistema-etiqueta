"use client";

import { getStorages } from "@/features/sectors/api/api.sectors";
import { StorageType } from "@/features/sectors/api/api.sectors.data";
import { useQuery } from "@tanstack/react-query";

interface UseSectorStoragesOptions {
  enabled?: boolean;
}

export function useSectorStorages({
  enabled = true,
}: UseSectorStoragesOptions = {}) {
  return useQuery<StorageType[]>({
    queryKey: ["sectors-storages"],
    queryFn: getStorages,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}
