"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { reprintLabel } from "@/features/label/api/api.labels";
import { ReprintLabelRequest } from "@/features/label/api/api.labels.data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useReprintLabel(oldLabelId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReprintLabelRequest) => {
      if (!oldLabelId) {
        throw new Error("ID da etiqueta não informado");
      }

      return reprintLabel(oldLabelId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] });
      queryClient.invalidateQueries({ queryKey: ["label", oldLabelId] });
      queryClient.invalidateQueries({ queryKey: ["label-reprint-data", oldLabelId] });
      toast.success("Etiqueta reimpressa com sucesso!");
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}