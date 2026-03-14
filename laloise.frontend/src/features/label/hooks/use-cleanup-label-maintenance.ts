"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { cleanupLabelMaintenance } from "@/features/label/api/api.labels";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCleanupLabelMaintenance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cleanupLabelMaintenance(),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] });
      toast.success("Limpeza de etiquetas executada com sucesso!");
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}