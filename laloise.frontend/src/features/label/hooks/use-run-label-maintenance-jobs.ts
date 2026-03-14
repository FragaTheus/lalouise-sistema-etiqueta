"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { runLabelMaintenanceJobs } from "@/features/label/api/api.labels";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useRunLabelMaintenanceJobs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => runLabelMaintenanceJobs(),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] });
      toast.success("Rotinas de manutenção executadas com sucesso!");
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}