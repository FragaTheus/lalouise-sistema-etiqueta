"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderIcon, RotateCcwIcon } from "lucide-react";
import { UserSummary } from "@/features/accounts/api/api.accounts.data";
import CreateSectorResponsibleDialog from "@/features/sectors/components/create-sector-responsible-dialog";
import {
  RestoreSectorSchemaRequest,
  restoreSectorSchema,
} from "@/features/sectors/constants/schemas/restore-sector-schema";
import useRestoreSector from "@/features/sectors/hooks/use-restore-sector";
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
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

interface RestoreSectorDialogProps {
  sectorId: string;
  sectorName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RestoreSectorDialog({
  sectorId,
  sectorName,
  open,
  onOpenChange,
}: RestoreSectorDialogProps) {
  const [selectedResponsible, setSelectedResponsible] =
    useState<UserSummary | null>(null);

  const mutation = useRestoreSector(sectorId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RestoreSectorSchemaRequest>({
    resolver: zodResolver(restoreSectorSchema),
    mode: "onBlur",
    defaultValues: {
      responsibleId: "",
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

  const handleConfirmRestore = (formData: RestoreSectorSchemaRequest) => {
    mutation.mutate(formData, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Restaurar setor</DialogTitle>
          <DialogDescription>
            Deseja restaurar o setor <strong>{sectorName}</strong>? Ele voltará
            a ficar disponível nas listagens ativas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleConfirmRestore)}>
          <FieldSet>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel>Novo responsável</FieldLabel>
                <FieldContent>
                  <CreateSectorResponsibleDialog
                    selectedResponsible={selectedResponsible}
                    onSelectResponsible={handleSelectResponsible}
                    isRestoreMode
                  />
                  <Input type="hidden" {...register("responsibleId")} />
                </FieldContent>
                {errors.responsibleId?.message && (
                  <FieldError>
                    {String(errors.responsibleId.message)}
                  </FieldError>
                )}
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
                  {mutation.isPending ? (
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    <RotateCcwIcon className="h-4 w-4" />
                  )}
                  {mutation.isPending
                    ? "Restaurando..."
                    : "Confirmar restauração"}
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
