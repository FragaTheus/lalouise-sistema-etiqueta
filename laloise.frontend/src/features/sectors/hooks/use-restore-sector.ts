"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { RestoreSectorRequest } from "@/features/sectors/api/api.sectors.data";
import { restoreSector } from "@/features/sectors/api/api.sectors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useRestoreSector(id?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RestoreSectorRequest) => {
      if (!id) {
        throw new Error("ID do setor não informado");
      }

      return restoreSector(id, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
      queryClient.invalidateQueries({ queryKey: ["sectors-deleted"] });
      queryClient.invalidateQueries({ queryKey: ["sector", id] });
      toast.success("Setor restaurado com sucesso! Redirecionando para o painel...");
      router.push("/painel");
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
