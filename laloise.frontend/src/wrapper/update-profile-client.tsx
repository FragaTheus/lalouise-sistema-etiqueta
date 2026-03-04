"use client";

import { extractErrorMessage } from "@/api/api.error";
import { updatePerfilMe } from "@/api/api.perfil";
import AppForm from "@/components/app-form";
import {
  updateUserBtnText,
  updateUserDefaultValues,
  updateUserFields,
} from "@/constants/form-fields/update-profile-form-field";
import {
  UpdateUserRequest,
  updateUserSchema,
} from "@/constants/schemas/updateProfileSchema";
import { useRouter } from "next/navigation";

export default function UpdateProfileClient() {
  const router = useRouter();

  async function handleSubmit(data: UpdateUserRequest) {
    try {
      await updatePerfilMe(data);
      console.log("Perfil atualizado com sucesso!");
      router.refresh();
    } catch (error) {
      const message = extractErrorMessage(error);
      console.error(message);
    }
  }
  return (
    <AppForm
      schema={updateUserSchema}
      btnText={updateUserBtnText}
      defaultValues={updateUserDefaultValues}
      fields={updateUserFields}
      onSubmit={handleSubmit}
      sucessMsg="Perfil atualizado com sucesso!"
    />
  );
}
