import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email não pode estar vazio")
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Formato de email inválido.",
    ),
  password: z
    .string()
    .min(1, "Senha não pode estar vazia")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
      "Senha deve ter entre 08 e 12 caracteres, com no mínimo, uma letra maiúscula, uma minúscula, um número e um caractere especial",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
