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
  printLabelSchema,
  type PrintLabelSchemaRequest,
} from "@/features/label/constants/schemas/print-label-schema";
import usePrintLabel from "@/features/label/hooks/use-print-label";
import type { ProductSummary } from "@/features/products/api/api.products.data";
import type { StorageType } from "@/shared/constants/storage-types";
import PrintLabelProductDialog from "@/features/label/components/print-label-product-dialog";
import PrintLabelStorageDialog from "@/features/label/components/print-label-storage-dialog";

const printLabelDefaultValues: PrintLabelSchemaRequest = {
  productId: "",
  storageType: "AMBIENTE",
  copies: 1,
};

export default function PrintLabelForm() {
  const [selectedProduct, setSelectedProduct] = useState<ProductSummary | null>(
    null,
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageType | null>(
    null,
  );

  const mutation = usePrintLabel();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PrintLabelSchemaRequest>({
    resolver: zodResolver(printLabelSchema),
    mode: "onBlur",
    defaultValues: printLabelDefaultValues,
  });

  const handleSelectProduct = useCallback(
    (product: ProductSummary) => {
      setSelectedProduct(product);
      setValue("productId", product.id, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue],
  );

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

  const handleFormSubmit = (formData: PrintLabelSchemaRequest) => {
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldSet>
        <FieldGroup className="gap-6 lg:gap-8">
          <Field>
            <FieldLabel>Produto</FieldLabel>
            <FieldContent>
              <PrintLabelProductDialog
                selectedProduct={selectedProduct}
                onSelectProduct={handleSelectProduct}
              />
              <Input type="hidden" {...register("productId")} />
            </FieldContent>
            {errors.productId?.message && (
              <FieldError>{String(errors.productId.message)}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Tipo de Armazenamento</FieldLabel>
            <Controller
              control={control}
              name="storageType"
              render={({ field }) => (
                <FieldContent>
                  <PrintLabelStorageDialog
                    selectedStorage={selectedStorage}
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
              {mutation.isPending ? "Enviando..." : "Imprimir Etiqueta"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
