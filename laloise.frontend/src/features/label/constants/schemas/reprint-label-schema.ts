import { storageTypeValues } from "@/shared/constants/storage-types";
import { z } from "zod";

export const reprintLabelSchema = z.object({
  storageType: z.enum(storageTypeValues, {
    errorMap: () => ({ message: "Selecione um tipo de armazenamento" }),
  }),
  copies: z
    .number({ invalid_type_error: "Informe a quantidade de cópias" })
    .int("A quantidade deve ser um número inteiro")
    .min(1, "Mínimo de 1 cópia")
    .max(100, "Máximo de 100 cópias"),
});

export type ReprintLabelSchemaRequest = z.infer<typeof reprintLabelSchema>;
