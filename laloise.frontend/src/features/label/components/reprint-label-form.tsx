"use client";

import { useCallback, useState } from "react";
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
  reprintLabelSchema,
  type ReprintLabelSchemaRequest,
} from "@/features/label/constants/schemas/reprint-label-schema";
import useReprintLabel from "@/features/label/hooks/use-reprint-label";
import type { StorageType } from "@/shared/constants/storage-types";
import PrintLabelStorageDialog from "@/features/label/components/print-label-storage-dialog";
import { useLabelMyStorages } from "@/features/label/hooks/use-label-my-storages";
import { useRouter } from "next/navigation";

interface ReprintLabelFormProps {
  labelId: string;
}

export default function ReprintLabelForm({ labelId }: ReprintLabelFormProps) {
  const [selectedStorage, setSelectedStorage] = useState<StorageType | null>(
    null,
  );

  const router = useRouter();
  const mutation = useReprintLabel(labelId);
  const {
    storages,
    isLoading: isLoadingStorages,
    isError: isErrorStorages,
    refetch: refetchStorages,
  } = useLabelMyStorages();

  const getDefaultValues = (): ReprintLabelSchemaRequest => ({
    storageType: "AMBIENTE",
    copies: 1,
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReprintLabelSchemaRequest>({
    resolver: zodResolver(reprintLabelSchema),
    mode: "onBlur",
    defaultValues: getDefaultValues(),
  });

  const handleSelectStorage = useCallback(
    (storage: StorageType) => {
      setSelectedStorage(storage);
      setValue("storageType", storage, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const handleFormSubmit = (formData: ReprintLabelSchemaRequest) => {
    mutation.mutate(formData, {
      onSuccess: () => {
        router.push("/painel/etiquetas");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldSet>
        <FieldGroup className="gap-6 lg:gap-8">
          <Field>
            <FieldLabel>Tipo de Armazenamento</FieldLabel>
            <Controller
              control={control}
              name="storageType"
              render={({ field }) => (
                <FieldContent>
                  <PrintLabelStorageDialog
                    selectedStorage={selectedStorage}
                    storages={storages}
                    isLoadingStorages={isLoadingStorages}
                    isErrorStorages={isErrorStorages}
                    onRetryStorages={() => {
                      void refetchStorages();
                    }}
                    onSelectStorage={(storage) => {
                      field.onChange(storage);
                      handleSelectStorage(storage);
                    }}
                  />
                </FieldContent>
              )}
            />
            {errors.storageType?.message && (
              <FieldError>{String(errors.storageType.message)}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Quantidade de Cópias</FieldLabel>
            <FieldContent>
              <Input
                type="number"
                min={1}
                max={100}
                placeholder="Ex: 1"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 max-w-15"
                {...register("copies", { valueAsNumber: true })}
              />
            </FieldContent>
            {errors.copies?.message && (
              <FieldError>{String(errors.copies.message)}</FieldError>
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
              {mutation.isPending ? "Reimprindo..." : "Reimprimir Etiqueta"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
