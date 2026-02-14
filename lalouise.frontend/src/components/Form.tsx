"use client";

import { useForm } from "react-hook-form";
import { Input } from "./Input";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 md:gap-4"
      noValidate
    >
      <div>
        <label className="text-small font-semibold">Email</label>
        <Input
          type="email"
          {...register("email", {
            required: "Email é obrigatório",
          })}
          error={errors.email?.message}
        />
      </div>

      <div>
        <label className="text-small font-semibold">Senha</label>
        <Input
          type="password"
          {...register("password", {
            required: "Senha é obrigatória",
            minLength: {
              value: 6,
              message: "Senha deve ter no mínimo 6 caracteres",
            },
          })}
          error={errors.password?.message}
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-white p-2 rounded-sm mt-4 md:mt-8 cursor-pointer hover:scale-102 active:scale-98 transition-all hover:bg-secondary"
      >
        Entrar
      </button>
    </form>
  );
}
