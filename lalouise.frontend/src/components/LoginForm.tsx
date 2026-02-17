"use client";

import { useForm } from "react-hook-form";
import { Input, IInputConfig } from "./Input";

type FormData = {
  email: string;
  password: string;
};

const loginConfigs: IInputConfig<FormData>[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    rules: {
      required: "Email é obrigatório",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Email inválido",
      },
    },
  },
  {
    name: "password",
    label: "Senha",
    type: "password",
    rules: {
      required: "Senha é obrigatória",
      minLength: {
        value: 6,
        message: "Senha deve ter no mínimo 6 caracteres",
      },
    },
  },
];

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    console.log("Login data:", data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      {loginConfigs.map((config) => (
        <div key={config.name} className="flex flex-col gap-1">
          <label className="text-small font-semibold">{config.label}</label>
          <Input config={config} register={register} errors={errors} />
        </div>
      ))}

      <button
        type="submit"
        className="bg-primary text-white p-2 rounded-sm mt-4 md:mt-8 cursor-pointer hover:scale-102 active:scale-98 transition-all hover:bg-secondary font-bold"
      >
        Entrar
      </button>
    </form>
  );
}
