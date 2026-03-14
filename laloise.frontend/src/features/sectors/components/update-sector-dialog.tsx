"use client";

import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoaderIcon } from "lucide-react";
import { UserSummary } from "@/features/accounts/api/api.accounts.data";
import {
  SectorInfo,
  UpdateSectorRequest,
} from "@/features/sectors/api/api.sectors.data";
import CreateSectorResponsibleDialog from "@/features/sectors/components/create-sector-responsible-dialog";
import CreateSectorStoragesCheckbox from "@/features/sectors/components/create-sector-storages-checkbox";
import useUpdateSector from "@/features/sectors/hooks/use-update-sector";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

interface UpdateSectorDialogProps {
  sector: SectorInfo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UpdateSectorDialog({
  sector,
  open,
  onOpenChange,
}: UpdateSectorDialogProps) {
  const mutation = useUpdateSector(sector.id);

  const initialResponsible = useMemo<UserSummary | null>(() => {
    if (!sector.responsibleId) {
      return null;
    }

    return {
      id: sector.responsibleId,
      nickname: sector.responsibleName,
      email: "",
      role: "",
    };
  }, [sector.responsibleId, sector.responsibleName]);

  const [selectedResponsible, setSelectedResponsible] =
    useState<UserSummary | null>(initialResponsible);

  const {
    register,
    control,
    handleSubmit,
    formState: { dirtyFields },
    setValue,
  } = useForm<UpdateSectorRequest>({
    mode: "onBlur",
    defaultValues: {
      name: sector.name,
      description: sector.description,
      storages: sector.storages,
      responsibleId: sector.responsibleId,
    },
  });

  const handleSelectResponsible = (user: UserSummary) => {
    setSelectedResponsible(user);
    setValue("responsibleId", user.id, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleFormSubmit = (formData: UpdateSectorRequest) => {
    const payload = Object.entries(formData).reduce(
      (accumulator, [key, value]) => {
        const isDirty = Boolean(
          dirtyFields[key as keyof UpdateSectorRequest],
        );

        if (!isDirty) {
          return accumulator;
        }

        if (typeof value === "string" && value.trim() === "") {
          return accumulator;
        }

        if (value === undefined) {
          return accumulator;
        }

        return {
          ...accumulator,
          [key]: value,
        };
      },
      {} as Partial<UpdateSectorRequest>,
    );

    mutation.mutate(payload, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Editar setor</DialogTitle>
          <DialogDescription>
            Atualize os dados do setor mantendo o mesmo padrão do cadastro.
          </DialogDescription>
        </DialogHeader>

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
              </Field>

              <Field>
                <FieldLabel>Tipo de Armazenamento</FieldLabel>
                <Controller
                  control={control}
                  name="storages"
                  render={({ field }) => {
                    const selectedValues = Array.isArray(field.value)
                      ? field.value
                      : [];

                    return (
                      <FieldContent>
                        <CreateSectorStoragesCheckbox
                          selectedStorages={selectedValues}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      </FieldContent>
                    );
                  }}
                />
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
              </Field>

              <Field className="flex-row justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending && (
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                  )}
                  {mutation.isPending ? "Salvando..." : "Salvar alterações"}
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
