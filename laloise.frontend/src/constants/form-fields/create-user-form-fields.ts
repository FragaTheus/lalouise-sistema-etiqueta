import { FormFieldConfig } from "@/components/app-form";
import { CreateUserRequest } from "../schemas/create-user-schema";

export const signupUsersFields: FormFieldConfig<CreateUserRequest>[] = [
  {
    name: "nickname",
    label: "Nome de usuário",
    type: "text",
    placeholder: "João Silva",
  },
  {
    name: "email",
    label: "Email",
        type: "email",
    placeholder: "usuario@exemplo.com",
  },
  {
    name: "password",
    label: "Senha",
    type: "password",
    placeholder: "Senha@123",
  },
  {
    name: "confirmPassword",
    label: "Confirmar Senha",
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
    type: "text",
    placeholder: "João Gabriel",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "administrador@exemplo.com",
  },
  {
    name: "password",
    label: "Senha",
    type: "password",
    placeholder: "Senha@123",
  },
  {
    name: "confirmPassword",
    label: "Confirmar Senha",
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