"use client";

import AppForm from "@/components/app-form/app-form";
import {
  loginDefaultValues,
  loginFields,
} from "@/constants/form-fields/login-form-fields";
import { loginSchema } from "@/constants/schemas/loginSchema";
import loginContent from "@/constants/loginTextContent.json";
import useLogin from "@/hooks/use-login";

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
