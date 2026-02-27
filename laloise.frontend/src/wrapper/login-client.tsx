"use client";

import AppForm from "@/components/app-form";
import { loginFields } from "@/constants/login-fields";
import { loginSchema } from "@/constants/loginSchema";

export default function LoginClient() {
  return (
    <AppForm
      schema={loginSchema}
      btnText="Entrar"
      onSubmit={(data) => console.log(data)}
      fields={loginFields}
    />
  );
}
