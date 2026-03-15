import { z } from "zod";

export const restoreSectorSchema = z.object({
  responsibleId: z.string().uuid("Novo responsável deve ser informado"),
});

export type RestoreSectorSchemaRequest = z.infer<typeof restoreSectorSchema>;
