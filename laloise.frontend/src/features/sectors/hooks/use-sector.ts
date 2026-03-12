"use client";

import { getSectorById } from "@/features/sectors/api/api.sectors";
import { SectorInfo } from "@/features/sectors/api/api.sectors.data";
import { useQuery } from "@tanstack/react-query";

export function useSector(id?: string) {
  return useQuery<SectorInfo, Error>({
    queryKey: ["sector", id],
    queryFn: () => {
      if (!id) {
        throw new Error("ID do setor não informado");
      }

      return getSectorById(id);
    },
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(id),
  });
}
