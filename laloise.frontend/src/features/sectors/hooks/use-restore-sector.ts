"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { restoreSector } from "@/features/sectors/api/api.sectors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useRestoreSector(id?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!id) {
        throw new Error("ID do setor não informado");
      }

      return restoreSector(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
      queryClient.invalidateQueries({ queryKey: ["sectors-deleted"] });
      queryClient.invalidateQueries({ queryKey: ["sector", id] });
      toast.success("Setor restaurado com sucesso!");
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
