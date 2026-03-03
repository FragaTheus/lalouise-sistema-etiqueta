"use client";

import { createAdmin } from "@/api/accounts/api.createAccounts";
import AppForm from "@/components/app-form";
import {
  signupAdminBtnText,
  signupAdminDefaultValues,
  signupAdminsFields,
} from "@/constants/create-user-form-fields";
import { createUserSchema } from "@/constants/create-user-schema";

export default function CreateAdminClient() {
  const handleSubmit = async (data: any) => {
    try {
      await createAdmin(data);
      console.log("Admin criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar admin:", error);
    }
  };
  return (
    <AppForm
      onSubmit={handleSubmit}
      fields={signupAdminsFields}
      defaultValues={signupAdminDefaultValues}
      schema={createUserSchema}
      btnText={signupAdminBtnText}
    />
  );
}
