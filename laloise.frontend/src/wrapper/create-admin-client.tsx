"use client";

import { createAdmin } from "@/api/api.accounts";
import AppForm from "@/components/app-form";
import {
  signupAdminBtnText,
  signupAdminDefaultValues,
  signupAdminsFields,
} from "@/constants/form-fields/create-user-form-fields";
import { createUserSchema } from "@/constants/schemas/create-user-schema";

export default function CreateAdminClient() {
  return (
    <AppForm
      onSubmit={createAdmin}
      fields={signupAdminsFields}
      defaultValues={signupAdminDefaultValues}
      schema={createUserSchema}
      btnText={signupAdminBtnText}
      sucessMsg="Admin cadastrado com sucesso!"
    />
  );
}
