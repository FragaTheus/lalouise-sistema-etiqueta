"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import {
  StorageType,
  storageTypeValues,
} from "@/features/sectors/api/api.sectors.data";
import {
  createSectorSchema,
  CreateSectorSchemaRequest,
} from "@/features/sectors/constants/schemas/create-sector-schema";
import useCreateSector from "@/features/sectors/hooks/use-create-sector";
import { UserSummary } from "@/features/accounts/api/api.accounts.data";
import CreateSectorResponsibleDialog from "@/features/sectors/components/create-sector-responsible-dialog";

const createSectorDefaultValues: CreateSectorSchemaRequest = {
  name: "",
  description: "",
  storages: [],
  responsibleId: "",
};

function getStorageLabel(storage: StorageType) {
  return storage.replaceAll("_", " ");
}

const storageOptions = storageTypeValues.map((storageType) => ({
  label: getStorageLabel(storageType),
  value: storageType,
}));

export default function CreateSectorForm() {
  const [selectedResponsible, setSelectedResponsible] =
    useState<UserSummary | null>(null);

  const mutation = useCreateSector();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateSectorSchemaRequest>({
    resolver: zodResolver(createSectorSchema),
    mode: "onBlur",
    defaultValues: createSectorDefaultValues,
  });

  const handleSelectResponsible = (user: UserSummary) => {
    setSelectedResponsible(user);
    setValue("responsibleId", user.id, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleFormSubmit = (formData: CreateSectorSchemaRequest) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FieldSet>
          <FieldGroup className="gap-6 lg:gap-8">
            <Field>
              <FieldLabel>Nome do Setor</FieldLabel>
              <FieldContent>
                <Input
                  type="text"
                  placeholder="Ex: Laticínios"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                  {...register("name")}
                />
              </FieldContent>
              {errors.name?.message && (
                <FieldError>{String(errors.name.message)}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Descrição</FieldLabel>
              <FieldContent>
                <Input
                  type="text"
                  placeholder="Descrição do setor"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                  {...register("description")}
                />
              </FieldContent>
              {errors.description?.message && (
                <FieldError>{String(errors.description.message)}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Tipo de Armazenamento</FieldLabel>
              <Controller
                control={control}
                name="storages"
                render={({ field }) => {
                  const selectedValues: string[] = Array.isArray(field.value)
                    ? field.value
                    : [];

                  return (
                    <FieldContent>
                      <div data-slot="checkbox-group" className="grid gap-2">
                        {storageOptions.map((option) => {
                          const isChecked = selectedValues.includes(
                            option.value,
                          );

                          return (
                            <label
                              key={option.value}
                              className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm has-checked:border-primary has-checked:bg-primary/5"
                            >
                              <input
                                type="checkbox"
                                className="size-4 accent-primary"
                                checked={isChecked}
                                onBlur={field.onBlur}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    field.onChange([
                                      ...selectedValues,
                                      option.value,
                                    ]);
                                    return;
                                  }

                                  field.onChange(
                                    selectedValues.filter(
                                      (selectedValue) =>
                                        selectedValue !== option.value,
                                    ),
                                  );
                                }}
                              />
                              <span>{option.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </FieldContent>
                  );
                }}
              />
              {errors.storages?.message && (
                <FieldError>{String(errors.storages.message)}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Responsável</FieldLabel>
              <FieldContent>
                <CreateSectorResponsibleDialog
                  selectedResponsible={selectedResponsible}
                  onSelectResponsible={handleSelectResponsible}
                />
                <Input type="hidden" {...register("responsibleId")} />
              </FieldContent>

              {errors.responsibleId?.message && (
                <FieldError>{String(errors.responsibleId.message)}</FieldError>
              )}
            </Field>

            <Field>
              <Button
                className="mt-2 flex items-center gap-2 cursor-pointer bg-linear-to-r from-primary to-primary/80 text-white hover:shadow-md hover:from-primary/90 hover:to-primary/70 transition-all duration-300 w-full font-semibold"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                )}
                {mutation.isPending ? "Carregando..." : "Cadastrar Setor"}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </>
  );
}
