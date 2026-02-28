import { FormFieldConfig } from "@/components/app-form";
import { CreateUserRequest } from "./create-user-schema";

export const signupFields: FormFieldConfig<CreateUserRequest>[] = [
  {
    name: "nickname",
    label: "Nome de usuário",
    description: "Nome completo do usuário",
    type: "text",
    placeholder: "João Silva",
  },
  {
    name: "email",
    label: "Email",
    description: "Email do usuário",
    type: "email",
    placeholder: "usuario@exemplo.com",
  },
  {
    name: "password",
    label: "Senha",
    description: "Senha segura",
    type: "password",
    placeholder: "Senha@123",
  },
  {
    name: "confirmPassword",
    label: "Confirmar Senha",
    description: "Repita a senha para confirmar",
    type: "password",
    placeholder: "Senha@123",
  },
];

export const signupDefaultValues = {
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const signupBtnText = "Cadastrar Usuário";