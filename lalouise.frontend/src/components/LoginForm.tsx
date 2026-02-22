"use client";

import { loginInputProps } from "@/constants/inputProps";
import { LoginFormData, loginSchema } from "@/constants/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import textContent from "@/textContent/loginPageTextContent.json";
import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {
  const { login, isLoading, apiError } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  return (
    <form
      onSubmit={handleSubmit(login)}
      noValidate
      className="flex flex-col h-full w-full items-start justify-evenly"
    >
      {apiError && (
        <span className="p-2 bg-secondary-light/5 border border-secondary-light text-small text-secondary-light rounded-sm">
          {apiError}
        </span>
      )}
      <Input
        label={textContent.form.email.label}
        input={loginInputProps[0]}
        error={errors.email?.message}
        register={register}
      />
      <Input
        label={textContent.form.password.label}
        input={loginInputProps[1]}
        error={errors.password?.message}
        register={register}
      />
      <Button
        type="submit"
        btnTxt={textContent.form.buttonTxt}
        disable={isLoading}
      />
    </form>
  );
}
