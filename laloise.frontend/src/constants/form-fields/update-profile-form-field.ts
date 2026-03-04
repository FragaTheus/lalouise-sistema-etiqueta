import { FormFieldConfig } from "@/components/app-form";
import { UpdateUserRequest } from "../schemas/updateProfileSchema";

export const updateUserFields: FormFieldConfig<UpdateUserRequest>[] = [
  {
    name: "nickname",
    label: "Nome de usuário",
    description: "Nome completo do usuário",
    type: "text",
    placeholder: "João Silva",
  },
  {
    name: "password",
    label: "Senha",
    description: "Senha segura (8-12 caracteres, letras maiúsculas e minúsculas, número e caractere especial)",
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

export const updateUserDefaultValues: UpdateUserRequest = {
  nickname: "",
  password: "",
  confirmPassword: "",
};

export const updateUserBtnText = "Atualizar Perfil";