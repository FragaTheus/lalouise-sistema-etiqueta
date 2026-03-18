"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { CreateProductRequest } from "@/features/products/api/api.products.data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseCreateProductOptions {
  mutationFn: (data: CreateProductRequest) => Promise<void>;
  successMsg: string;
}

export default function useCreateProduct({
  mutationFn,
  successMsg,
}: UseCreateProductOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,

    onSuccess: () => {
      toast.success(successMsg);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/painel/produtos");
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
