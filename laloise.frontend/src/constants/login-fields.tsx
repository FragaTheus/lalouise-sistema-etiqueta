import { FormFieldConfig } from "@/components/app-form";
import { loginSchema } from "@/constants/loginSchema";
import z from "zod";

export const loginFields = [
  {
    name: "email",
    inputProps: {
      label: "Email",
      inputProps: {
        type: "email",
        placeholder: "email@exemplo.com",
      },
      description: "Digite seu email",
    },
  },
  {
    name: "password",
    inputProps: {
      label: "Senha",
      inputProps: {
        type: "password",
        placeholder: "Senha@123",
      },
      description: "Digite sua senha",
    },
  },
] satisfies FormFieldConfig<z.infer<typeof loginSchema>>[];
