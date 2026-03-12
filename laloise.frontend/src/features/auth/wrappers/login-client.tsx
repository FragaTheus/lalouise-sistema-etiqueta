"use client";

import AppForm from "@/shared/components/app-form/app-form";
import {
  loginDefaultValues,
  loginFields,
} from "@/features/auth/constants/form-fields/login-form-fields";
import { loginSchema } from "@/features/auth/constants/schemas/loginSchema";
import loginContent from "@/features/auth/constants/loginTextContent.json";
import useLogin from "@/features/auth/hooks/use-login";

export default function LoginClient() {
  const mutation = useLogin();

  return (
    <AppForm
      schema={loginSchema}
      btnText={loginContent.login.form.btnText}
      mutation={mutation}
      fields={loginFields}
      defaultValues={loginDefaultValues}
    />
  );
}
