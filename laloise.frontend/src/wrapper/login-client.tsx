"use client";

import AppForm from "@/components/app-form";
import { loginDefaultValues, loginFields } from "@/constants/login-form-fields";
import { loginSchema } from "@/constants/loginSchema";
import loginContent from "@/constants/loginTextContent.json";

export default function LoginClient() {
  return (
    <AppForm
      schema={loginSchema}
      btnText={loginContent.login.form.btnText}
      onSubmit={(data) => console.log(data)}
      fields={loginFields}
      defaultValues={loginDefaultValues}
    />
  );
}
