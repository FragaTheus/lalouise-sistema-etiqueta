"use client";

import { createProduct } from "@/api/api-products/api.products";
import AppForm from "@/components/app-form/app-form";
import {
  createProductBtnText,
  createProductDefaultValues,
  createProductFields,
} from "@/constants/form-fields/create-product-form-fields";
import { createProductSchema } from "@/constants/schemas/create-product-schema";
import useCreateProduct from "@/hooks/products-hooks/use-create-product";

export default function CreateProductClient() {
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
