"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { updateSector } from "@/features/sectors/api/api.sectors";
import { UpdateSectorRequest } from "@/features/sectors/api/api.sectors.data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useUpdateSector(id?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: Partial<UpdateSectorRequest>) => {
      if (!id) {
        throw new Error("ID do setor não informado");
      }

      return updateSector(id, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sector", id] });
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
      toast.success("Setor atualizado com sucesso! Redirecionando para o painel...");
      router.push("/painel");
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
