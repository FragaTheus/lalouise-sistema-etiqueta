"use client";

import AppForm from "@/shared/components/app-form/app-form";
import {
  createSectorBtnText,
  createSectorDefaultValues,
  createSectorFields,
} from "@/features/sectors/constants/form-fields/sector-form-fields";
import { createSectorSchema } from "@/features/sectors/constants/schemas/create-sector-schema";
import useCreateSector from "@/features/sectors/hooks/use-create-sector";

export default function CreateSectorClientWrapper() {
  const mutation = useCreateSector();

  return (
    <AppForm
      fields={createSectorFields}
      defaultValues={createSectorDefaultValues}
      schema={createSectorSchema}
      btnText={createSectorBtnText}
      mutation={mutation}
    />
  );
}
