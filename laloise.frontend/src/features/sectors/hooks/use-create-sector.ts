"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { createSector } from "@/features/sectors/api/api.sectors";
import { CreateSectorRequest } from "@/features/sectors/api/api.sectors.data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useCreateSector() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateSectorRequest) => createSector(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
      toast.success("Setor cadastrado com sucesso! Redirecionando para o painel...");
      router.push("/painel");
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
