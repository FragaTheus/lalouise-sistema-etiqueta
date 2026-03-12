"use client";

import AppFormPageLayoutRouterBack from "@/shared/components/app-router-back";
import AppItemInfo from "@/shared/components/app-item-info-layout/app-intem-info";
import { AppItemInfoProps } from "@/shared/components/app-item-info-layout/app-item-data";
import { DataError } from "@/shared/components/data-error";
import { ItemInfoLoadingSkeleton } from "@/shared/components/loading-skeleton";
import { useProduct } from "@/features/products/hooks/use-product";
import useUpdateProduct from "@/features/products/hooks/use-update-product";
import useDeleteProduct from "@/features/products/hooks/use-delete-product";
import { updateProductSchema } from "@/features/products/constants/schemas/create-product-schema";
import {
  createProductFields,
  createProductDefaultValues,
} from "@/features/products/constants/form-fields/create-product-form-fields";
import { Package } from "lucide-react";
import { useParams } from "next/navigation";

function formatBackendDateTime(value?: string | null) {
  if (!value) {
    return "Nunca";
  }

  const localDateTimeMatch = value.match(
    /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?/,
  );

  if (localDateTimeMatch) {
    const [, year, month, day, hour, minute, second] = localDateTimeMatch;
    const parsedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second || 0),
    );

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleString("pt-BR");
    }
  }

  const fallbackDate = new Date(value);
  if (!Number.isNaN(fallbackDate.getTime())) {
    return fallbackDate.toLocaleString("pt-BR");
  }

  return value;
}

export default function ProductDetailPageWrapper() {
  const params = useParams();
  const productIdParam = params?.id;
  const productId = Array.isArray(productIdParam)
    ? productIdParam[0]
    : productIdParam;

  const { data, isLoading, error, refetch } = useProduct(productId);
  const updateProductMutation = useUpdateProduct(productId);
  const deleteProductMutation = useDeleteProduct(productId);

  if (!productId) {
    return (
      <DataError error={new Error("ID do produto não encontrado na URL")} />
    );
  }

  if (isLoading) {
    return <ItemInfoLoadingSkeleton />;
  }

  if (error) {
    return <DataError error={error} onRetry={() => refetch()} />;
  }

  if (!data) {
    return <DataError error={null} onRetry={() => refetch()} />;
  }

  const productItemConfig: AppItemInfoProps = {
    icon: Package,
    title: data.name,
    subtitle: `ID: ${data.id}`,
    isProfile: false,
    updateMutation: updateProductMutation,
    deleteMutation: deleteProductMutation,
    editConfig: {
      title: "Editar Produto",
      description:
        "Atualize os dados do produto. Deixe os campos em branco para não alterá-los.",
      schema: updateProductSchema,
      fields: createProductFields,
      defaultValues: createProductDefaultValues,
      btnText: "Salvar Alterações",
    },
    sections: [
      {
        fields: [
          {
            key: "description",
            label: "Descrição",
            value: data.description,
          },
        ],
      },
      {
        title: "Mais Informações",
        fields: [
          {
            key: "createdAt",
            label: "Data de Criação",
            value: formatBackendDateTime(data.createdAt),
          },
          {
            key: "updatedAt",
            label: "Última Atualização",
            value: formatBackendDateTime(data.updatedAt),
          },
        ],
      },
    ],
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl flex flex-col gap-2">
        <AppFormPageLayoutRouterBack />
        <AppItemInfo {...productItemConfig} />
      </div>
    </div>
  );
}
