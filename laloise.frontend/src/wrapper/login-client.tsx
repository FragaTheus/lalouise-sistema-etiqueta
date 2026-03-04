"use client";

import { useRouter } from "next/navigation";
import AppForm from "@/components/app-form";
import {
  loginDefaultValues,
  loginFields,
} from "@/constants/form-fields/login-form-fields";
import { loginSchema } from "@/constants/schemas/loginSchema";
import loginContent from "@/constants/loginTextContent.json";
import { loginAndSetUser } from "@/manager/auth-manager";
import { LoginRequest } from "@/api/api.login";

export default function LoginClient() {
  const router = useRouter();

  const handleLogin = async (data: LoginRequest) => {
    const user = await loginAndSetUser(data);
    if (!user) return;
    router.push("/painel");
  };

  return (
    <AppForm
      schema={loginSchema}
      btnText={loginContent.login.form.btnText}
      onSubmit={handleLogin}
      fields={loginFields}
      defaultValues={loginDefaultValues}
      sucessMsg="Bem-vindo de volta!"
    />
  );
}
