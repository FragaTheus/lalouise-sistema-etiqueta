"use client";

import { getLabelById } from "@/features/label/api/api.labels";
import { LabelInfo } from "@/features/label/api/api.labels.data";
import { useQuery } from "@tanstack/react-query";

export function useLabel(id?: string) {
  return useQuery<LabelInfo, Error>({
    queryKey: ["label", id],
    queryFn: () => {
      if (!id) {
        throw new Error("ID da etiqueta não informado");
      }

      return getLabelById(id);
    },
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(id),
  });
}