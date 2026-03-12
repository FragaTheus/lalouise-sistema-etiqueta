import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Nome do produto não pode estar vazio")
    .min(5, "Nome do produto tem que ter entre 05 e 30 caracteres")
    .max(30, "Nome do produto tem que ter entre 05 e 30 caracteres")
    .regex(
      /^[\p{L}\s]+$/u,
      "Nome deve conter apenas letras e espaços"
    ),
  description: z
    .string()
    .min(1, "Descrição do produto não pode estar vazia")
    .max(200, "Descrição do produto não pode ter mais que 200 caracteres")
    .regex(
      /^[\p{L}\s]*$/u,
      "Descrição deve conter apenas letras e espaços"
    ),
});

export type CreateProductRequest = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
  name: z
    .string()
    .max(30, "Nome do produto tem que ter no máximo 30 caracteres")
    .regex(
      /^[\p{L}\s]+$/u,
      "Nome deve conter apenas letras e espaços"
    )
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(200, "Descrição do produto não pode ter mais que 200 caracteres")
    .regex(
      /^[\p{L}\s]*$/u,
      "Descrição deve conter apenas letras e espaços"
    )
    .optional()
    .or(z.literal("")),
});

export type UpdateProductRequest = z.infer<typeof updateProductSchema>;
