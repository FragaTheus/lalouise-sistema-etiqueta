import { z } from "zod";

export const createUserSchema = z.object({
  nickname: z
    .string()
    .min(1, "Nome não pode estar vazio")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(20, "Nome deve ter no máximo 20 caracteres")
    .regex(
      /^[\p{L}\s]{3,20}$/u,
      "Nome não pode conter números ou caracteres especiais"
    ),
  email: z
    .string()
    .min(1, "Email não pode estar vazio")
    .email("Insira um email válido"),
  password: z
    .string()
    .min(1, "Senha não pode estar vazia")
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(12, "Senha deve ter no máximo 12 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
      "Senha deve conter maiúscula, minúscula, número e caractere especial (@$!%*?&)"
    ),
  confirmPassword: z
    .string()
    .min(1, "Confirmação de senha não pode estar vazia"),
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;