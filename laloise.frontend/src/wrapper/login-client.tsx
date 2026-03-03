"use client";

import { useRouter } from "next/navigation";
import AppForm from "@/components/app-form";
import { loginDefaultValues, loginFields } from "@/constants/login-form-fields";
import { loginSchema } from "@/constants/loginSchema";
import loginContent from "@/constants/loginTextContent.json";
import type { LoginRequest } from "@/api/api.types";
import { loginAndSetUser } from "@/manager/auth-manager";

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
    />
  );
}
