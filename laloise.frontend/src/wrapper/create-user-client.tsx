"use client";

import { createUser } from "@/api/api.accounts";
import AppForm from "@/components/app-form/app-form";
import {
  signupBtnText,
  signupDefaultValues,
  signupUsersFields,
} from "@/constants/form-fields/create-user-form-fields";
import { createUserSchema } from "@/constants/schemas/create-user-schema";
import useCreateUser from "@/hooks/use-create-user";

export default function CreateUserClient() {
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
