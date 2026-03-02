import { FormFieldConfig } from "@/components/app-form";
import { CreateUserRequest } from "./create-user-schema";

export const signupUsersFields: FormFieldConfig<CreateUserRequest>[] = [
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

export const signupAdminsFields: FormFieldConfig<CreateUserRequest>[] = [
  {
    name: "nickname",
    label: "Nome do Admin",
    description: "Digite um apelido para o Administrador",
    type: "text",
    placeholder: "João Gabriel",
  },
  {
    name: "email",
    label: "Email",
    description: "Crie um email Administrador",
    type: "email",
    placeholder: "administrador@exemplo.com",
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

export const signupAdminDefaultValues = {
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const signupAdminBtnText = "Cadastrar Administrador";