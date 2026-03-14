"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { printLabel } from "@/features/label/api/api.labels";
import { PrintLabelRequest } from "@/features/label/api/api.labels.data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function usePrintLabel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PrintLabelRequest) => printLabel(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] });
      toast.success("Etiqueta enviada para impressão com sucesso!");
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}