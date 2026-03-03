"use client";

import { createUser } from "@/api/accounts/api.createAccounts";
import AppForm from "@/components/app-form";
import {
  signupBtnText,
  signupDefaultValues,
  signupUsersFields,
} from "@/constants/create-user-form-fields";
import { createUserSchema } from "@/constants/create-user-schema";

export default function CreateUserClient() {
  const handleSubmit = async (data: any) => {
    try {
      await createUser(data);
      console.log("Usuario criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar admin:", error);
    }
  };
  return (
    <AppForm
      onSubmit={handleSubmit}
      fields={signupUsersFields}
      defaultValues={signupDefaultValues}
      schema={createUserSchema}
      btnText={signupBtnText}
    />
  );
}
