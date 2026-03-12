"use client";

import { extractErrorMessage } from "@/config/http/api.error";
import { CreateProductRequest } from "@/features/products/api/api.products.data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseCreateProductOptions {
  mutationFn: (data: CreateProductRequest) => Promise<void>;
  successMsg: string;
}

export default function useCreateProduct({
  mutationFn,
  successMsg,
}: UseCreateProductOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,

    onSuccess: () => {
      toast.success(successMsg);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
