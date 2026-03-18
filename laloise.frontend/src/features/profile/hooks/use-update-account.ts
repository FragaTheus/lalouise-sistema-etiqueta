"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { updatePerfilMe, UpdateUserPayload } from "@/features/profile/api/api.perfil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useUpdateAccount() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateUserPayload) => updatePerfilMe(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Perfil atualizado com sucesso!");
      router.refresh();
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
