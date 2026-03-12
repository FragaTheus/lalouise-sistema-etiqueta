import { FormFieldConfig } from "@/shared/components/app-form/app-form-types";
import { CreateProductRequest } from "../schemas/create-product-schema";

export const createProductFields: FormFieldConfig<CreateProductRequest>[] = [
  {
    name: "name",
    label: "Nome do Produto",
    type: "text",
    placeholder: "Produto Exemplo",
  },
  {
    name: "description",
    label: "Descrição",
    type: "text",
    placeholder: "Descrição do produto",
  },
];

export const createProductDefaultValues = {
  name: "",
  description: "",
};

export const createProductBtnText = "Cadastrar Produto";
