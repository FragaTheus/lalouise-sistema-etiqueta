import { FormFieldConfig } from "@/components/app-form/app-form-types";
import { UpdateUserRequest } from "../schemas/updateProfileSchema";

export const updateUserFields: FormFieldConfig<UpdateUserRequest>[] = [
  {
    name: "nickname",
    label: "Nome de usuário",
    type: "text",
    placeholder: "João Silva",
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

export const updateUserDefaultValues: UpdateUserRequest = {
  nickname: "",
  password: "",
  confirmPassword: "",
};

export const updateUserBtnText = "Atualizar Perfil";