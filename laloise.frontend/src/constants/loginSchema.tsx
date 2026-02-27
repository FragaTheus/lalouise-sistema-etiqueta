import { z } from "zod";
import loginContent from "@/constants/loginTextContent.json";

const messages = loginContent.login.schema;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, messages.email.empty)
    .refine(
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      messages.email.invalid,
    ),
  password: z
    .string()
    .min(1, messages.password.empty)
    .min(8, messages.password.minLength)
    .max(12, messages.password.maxLength)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      messages.password.pattern,
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
