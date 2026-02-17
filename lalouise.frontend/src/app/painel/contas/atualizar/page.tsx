"use client";

import { IInputConfig } from "@/components/Input";
import FormPagesLayout from "@/layouts/FormPagesLayout";
import updateAccountImg from "@/assets/update-account.svg";

interface UpdateAccount {
  nickname: string;
  password: string;
}

export default function UpdateAccount() {
  return (
    <FormPagesLayout
      title="Atualizar Conta"
      subtitle="Insira os novos dados para atualizar."
      btnText="Atualizar Conta"
      defaultValues={{
        nickname: "",
        password: "",
      }}
      imgSrc={updateAccountImg}
      inputConfigs={UpdateAccountInputs}
      onSubmit={() => console.log("submit")}
    />
  );
}

const UpdateAccountInputs: IInputConfig<UpdateAccount>[] = [
  {
    name: "nickname",
    label: "Nome de usuário",
    type: "text",
    rules: {
      required: "O nome de usuário é obrigatório",
    },
  },
  {
    name: "password",
    label: "Senha",
    type: "password",
    rules: {
      required: "A senha é obrigatória",
      minLength: {
        value: 6,
        message: "A senha deve ter no mínimo 6 caracteres",
      },
    },
  },
];
