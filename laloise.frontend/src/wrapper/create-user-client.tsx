"use client";

import AppForm from "@/components/app-form";
import {
  signupDefaultValues,
  signupFields,
} from "@/constants/create-user-form-fields";
import { createUserSchema } from "@/constants/create-user-schema";

export default function CreateUserClient() {
  const handleSubmit = (data: any) => {
    console.log("Signup data:", data);
  };
  return (
    <AppForm
      onSubmit={handleSubmit}
      fields={signupFields}
      defaultValues={signupDefaultValues}
      schema={createUserSchema}
      btnText="Cadastrar"
    />
  );
}
