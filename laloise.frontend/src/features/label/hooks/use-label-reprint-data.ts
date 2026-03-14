"use client";

import { getLabelReprintData } from "@/features/label/api/api.labels";
import { LabelReprintData } from "@/features/label/api/api.labels.data";
import { useQuery } from "@tanstack/react-query";

export function useLabelReprintData(id?: string) {
  return useQuery<LabelReprintData, Error>({
    queryKey: ["label-reprint-data", id],
    queryFn: () => {
      if (!id) {
        throw new Error("ID da etiqueta não informado");
      }

      return getLabelReprintData(id);
    },
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(id),
  });
}