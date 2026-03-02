"use client";

import AppForm from "@/components/app-form";
import {
  signupAdminBtnText,
  signupAdminDefaultValues,
  signupAdminsFields,
} from "@/constants/create-user-form-fields";
import { createUserSchema } from "@/constants/create-user-schema";

export default function CreateAdminClient() {
  const handleSubmit = (data: any) => {
    console.log("Signup data:", data);
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
