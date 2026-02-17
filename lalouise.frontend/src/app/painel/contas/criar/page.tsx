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
      pattern: {
        value: /^[a-zA-Z ]{3,20}$/i,
        message: "O nome não pode ter números nem caracteres especiais",
      },
    },
  },
  {
    name: "email",
    label: "E-mail",
    type: "email",
    rules: {
      required: "O e-mail é obrigatório",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        message: "Formato de e-mail inválido, tente novamente.",
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
        value: 8,
        message: "A senha deve conter no mínimo 8 caracteres",
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
        message:
          "Use letras maiúsculas, minúsculas, números e caracteres especiais",
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
