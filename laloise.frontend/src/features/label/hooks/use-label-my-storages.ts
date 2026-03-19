"use client";

import { getMyStorages } from "@/shared/api/api.shared.sectors";
import type { StorageType } from "@/shared/constants/storage-types";
import { useQuery } from "@tanstack/react-query";

export function useLabelMyStorages() {
  const storagesQuery = useQuery<StorageType[], Error>({
    queryKey: ["label-my-storages"],
    queryFn: getMyStorages,
    staleTime: 1000 * 60 * 5,
  });

  return {
    storages: storagesQuery.data ?? [],
    isLoading: storagesQuery.isLoading,
    isError: storagesQuery.isError,
    refetch: storagesQuery.refetch,
  };
}
