"use client";

import { createAdmin } from "@/features/accounts/api/api.accounts";
import AppForm from "@/shared/components/app-form/app-form";
import {
  signupAdminBtnText,
  signupAdminDefaultValues,
  signupAdminsFields,
} from "@/features/accounts/constants/form-fields/create-user-form-fields";
import { createUserSchema } from "@/features/accounts/constants/schemas/create-user-schema";
import useCreateUser from "@/features/accounts/hooks/use-create-user";

export default function CreateAdminClientWrapper() {
  const mutation = useCreateUser({
    mutationFn: createAdmin,
    successMsg: "Administrador cadastrado com sucesso!",
  });
  return (
    <AppForm
      fields={signupAdminsFields}
      defaultValues={signupAdminDefaultValues}
      schema={createUserSchema}
      btnText={signupAdminBtnText}
      mutation={mutation}
    />
  );
}
