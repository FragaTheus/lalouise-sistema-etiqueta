import { z } from "zod";

const optionalField = (schema: z.ZodString) =>
  z
    .union([schema, z.literal("")])
    .optional()
    .transform((val) => (val === "" ? undefined : val));

export const updateUserSchema = z
  .object({
    nickname: optionalField(
      z
        .string()
        .max(20, "Nome deve ter no máximo 20 caracteres")
        .regex(
          /^[\p{L}\s]{3,20}$/u,
          "Nome não pode conter números ou caracteres especiais"
        )
    ),

    password: optionalField(
      z
        .string()
        .max(12, "Senha deve ter no máximo 12 caracteres")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
          "Senha deve conter maiúscula, minúscula, número e caractere especial (@$!%*?&)"
        )
    ),

    confirmPassword: optionalField(
      z
        .string()
        .max(12, "Confirmação deve ter no máximo 12 caracteres")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
          "Confirmação deve conter maiúscula, minúscula, número e caractere especial (@$!%*?&)"
        )
    ),
  })
  .refine(
    (data) => !data.password || data.password === data.confirmPassword,
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    }
  );

export type UpdateUserRequest = z.infer<typeof updateUserSchema>;