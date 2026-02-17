"use client";

import FormPagesLayout from "@/layouts/FormPagesLayout";
import singup from "@/assets/sign-up.svg";
import { IInputConfig } from "@/components/Input";

interface ICreateAccountForm {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateAccount() {
  return (
    <FormPagesLayout
      imgSrc={singup}
      defaultValues={{
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      inputConfigs={CreateAccountInputs}
      onSubmit={() => {
        console.log("submit");
      }}
      title="Criar conta"
      subtitle="Preencha os campos abaixo para criar sua conta"
      btnText="Criar conta"
    />
  );
}

const CreateAccountInputs: IInputConfig<ICreateAccountForm>[] = [
  {
    name: "nickname",
    label: "Nome de usuário",
    type: "text",
    rules: {
      required: "O nome de usuário é obrigatório",
    },
  },
  {
    name: "email",
    label: "E-mail",
    type: "email",
    rules: {
      required: "O e-mail é obrigatório",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "O e-mail deve ser válido",
      },
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
        message: "A senha deve conter no mínimo 6 caracteres",
      },
    },
  },
  {
    name: "confirmPassword",
    label: "Confirmar senha",
    type: "password",
    rules: {
      required: "A confirmação de senha é obrigatória",
      validate: (value, values) =>
        value === values.password || "As senhas devem ser iguais",
    },
  },
];
