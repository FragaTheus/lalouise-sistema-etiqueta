import { z } from "zod";
import { storageTypeValues } from "@/features/sectors/api/api.sectors.data";

const optionalTextField = (schema: z.ZodString) =>
  z
    .union([schema, z.literal("")])
    .optional()
    .transform((value) => (value === "" ? undefined : value));

export const updateSectorSchema = z.object({
  name: optionalTextField(
    z
      .string()
      .min(5, "Nome deve ter no mínimo 5 caracteres")
      .max(50, "Nome deve ter no máximo 50 caracteres")
      .regex(/^[\p{L} ]+$/u, "Nome deve conter apenas letras e espaços"),
  ),
  description: optionalTextField(
    z
      .string()
      .max(200, "Descrição não pode ter mais que 200 caracteres")
      .regex(/^[\p{L} ]*$/u, "Descrição deve conter apenas letras e espaços"),
  ),
  storages: z
    .array(z.enum(storageTypeValues))
    .min(1, "Deve ter pelo menos um tipo de armazenamento")
    .optional(),
  responsibleId: z
    .string()
    .uuid("Responsável deve ser informado")
    .optional(),
});

export type UpdateSectorSchemaRequest = z.infer<typeof updateSectorSchema>;
