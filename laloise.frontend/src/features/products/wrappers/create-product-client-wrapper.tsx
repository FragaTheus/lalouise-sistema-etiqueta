"use client";

import { createProduct } from "@/features/products/api/api.products";
import AppForm from "@/shared/components/app-form/app-form";
import {
  createProductBtnText,
  createProductDefaultValues,
  createProductFields,
} from "@/features/products/constants/form-fields/create-product-form-fields";
import { createProductSchema } from "@/features/products/constants/schemas/create-product-schema";
import useCreateProduct from "@/features/products/hooks/use-create-product";

export default function CreateProductClientWrapper() {
  const mutation = useCreateProduct({
    mutationFn: createProduct,
    successMsg: "Produto criado com sucesso!",
  });
  return (
    <AppForm
      fields={createProductFields}
      defaultValues={createProductDefaultValues}
      schema={createProductSchema}
      btnText={createProductBtnText}
      mutation={mutation}
    />
  );
}
