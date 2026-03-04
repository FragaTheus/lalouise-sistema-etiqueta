"use client";

import { createUser } from "@/api/api.accounts";
import AppForm from "@/components/app-form";
import {
  signupBtnText,
  signupDefaultValues,
  signupUsersFields,
} from "@/constants/form-fields/create-user-form-fields";
import { createUserSchema } from "@/constants/schemas/create-user-schema";

export default function CreateUserClient() {
  return (
    <AppForm
      onSubmit={createUser}
      fields={signupUsersFields}
      defaultValues={signupDefaultValues}
      schema={createUserSchema}
      btnText={signupBtnText}
      sucessMsg="Usuário cadastrado com sucesso!"
    />
  );
}
