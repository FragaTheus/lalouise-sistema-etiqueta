import { z } from "zod";
import { storageTypeValues } from "@/features/sectors/api/api.sectors.data";

const uuidSchema = z.string().uuid("Responsável deve ser informado");

export const createSectorSchema = z.object({
  name: z
    .string()
    .min(1, "Nome não pode estar vazio")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .regex(/^[\p{L} ]+$/u, "Nome deve conter apenas letras e espaços"),
  description: z
    .string()
    .max(200, "Descrição não pode ter mais que 200 caracteres")
    .regex(/^[\p{L} ]*$/u, "Descrição deve conter apenas letras e espaços"),
  storages: z
    .array(z.enum(storageTypeValues), {
      message: "Armazenamento não pode estar vazio",
    })
    .min(1, "Deve ter pelo menos um tipo de armazenamento"),
  responsibleId: uuidSchema,
});

export type CreateSectorSchemaRequest = z.infer<typeof createSectorSchema>;
