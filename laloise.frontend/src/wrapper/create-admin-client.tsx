"use client";

import { createAdmin } from "@/api/api-accounts/api.accounts";
import AppForm from "@/components/app-form/app-form";
import {
  signupAdminBtnText,
  signupAdminDefaultValues,
  signupAdminsFields,
} from "@/constants/form-fields/create-user-form-fields";
import { createUserSchema } from "@/constants/schemas/create-user-schema";
import useCreateUser from "@/hooks/accounts-hooks/use-create-user";

export default function CreateAdminClient() {
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
