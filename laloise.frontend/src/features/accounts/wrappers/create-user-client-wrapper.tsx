"use client";

import { createUser } from "@/features/accounts/api/api.accounts";
import AppForm from "@/shared/components/app-form/app-form";
import {
  signupBtnText,
  signupDefaultValues,
  signupUsersFields,
} from "@/features/accounts/constants/form-fields/create-user-form-fields";
import { createUserSchema } from "@/features/accounts/constants/schemas/create-user-schema";
import useCreateUser from "@/features/accounts/hooks/use-create-user";

export default function CreateUserClientWrapper() {
  const mutation = useCreateUser({
    mutationFn: createUser,
    successMsg: "Usuario criado com sucesso!",
  });
  return (
    <AppForm
      fields={signupUsersFields}
      defaultValues={signupDefaultValues}
      schema={createUserSchema}
      btnText={signupBtnText}
      mutation={mutation}
    />
  );
}
