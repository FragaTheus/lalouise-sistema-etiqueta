"use client";

import { extractErrorMessage } from "@/api/api.error";
import { updatePerfilMe, UpdateUserPayload } from "@/api/api.perfil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserPayload) => updatePerfilMe(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Perfil atualizado com sucesso!");
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
