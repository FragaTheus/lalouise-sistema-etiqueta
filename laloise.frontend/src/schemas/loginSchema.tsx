import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email nao pode estar vazio")
    .refine(
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      "Formato de email invalido",
    ),
  password: z
    .string()
    .min(1, "Senha nao pode estar vazia")
    .min(8, "Mínimo 8 caracteres")
    .max(12, "Máximo 12 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Deve conter maiúscula, minúscula, número e caractere especial (@$!%*?&)",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
