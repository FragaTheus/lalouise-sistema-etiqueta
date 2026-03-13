"use client";

import { Building2 } from "lucide-react";
import { useParams } from "next/navigation";
import AppRouterBack from "@/shared/components/app-router-back";
import AppItemInfo from "@/shared/components/app-item-info-layout/app-intem-info";
import { AppItemInfoProps } from "@/shared/components/app-item-info-layout/app-item-data";
import { DataError } from "@/shared/components/data-error";
import { ItemInfoLoadingSkeleton } from "@/shared/components/loading-skeleton";
import { useSector } from "@/features/sectors/hooks/use-sector";
import useRestoreSector from "@/features/sectors/hooks/use-restore-sector";
import SectorStorageDetails from "@/features/sectors/components/sector-storage-details";

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

export default function DeletedSectorDetailPageWrapper() {
  const params = useParams();
  const sectorIdParam = params?.id;
  const sectorId = Array.isArray(sectorIdParam)
    ? sectorIdParam[0]
    : sectorIdParam;

  const { data, isLoading, error, refetch } = useSector(sectorId);
  const restoreSectorMutation = useRestoreSector(sectorId);

  if (!sectorId) {
    return <DataError error={new Error("ID do setor não encontrado na URL")} />;
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

  const sectorItemConfig: AppItemInfoProps = {
    icon: Building2,
    title: data.name,
    subtitle: `ID: ${data.id}`,
    isDeleted: true,
    restoreMutation: restoreSectorMutation,
    sections: [
      {
        fields: [
          {
            key: "description",
            label: "Descrição",
            value: data.description,
          },
          {
            key: "responsibleName",
            label: "Responsável",
            value: data.responsibleName,
          },
          {
            key: "responsibleId",
            label: "ID do Responsável",
            value: <SectorStorageDetails responsibleId={data.responsibleId} />,
          },
          {
            key: "status",
            label: "Status",
            value: data.isActive ? "Ativo" : "Inativo",
            isBadge: true,
            badgeColor: data.isActive ? "primary" : "secondary",
          },
          {
            key: "deletedAt",
            label: "Data de Exclusão",
            value: formatBackendDateTime(data.deletedAt),
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
        <AppRouterBack />
        <AppItemInfo {...sectorItemConfig} />
      </div>
    </div>
  );
}
