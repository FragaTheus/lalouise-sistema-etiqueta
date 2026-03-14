"use client";

import { useParams } from "next/navigation";
import CardDetailsLayout from "@/features/sectors/layouts/card-details-layout";
import SectorActiveActions from "@/features/sectors/components/sector-active-actions";
import SectorInactiveActions from "@/features/sectors/components/sector-inactive-actions";
import { useSector } from "@/features/sectors/hooks/use-sector";
import AppRouterBack from "@/shared/components/app-router-back";
import { DataError } from "@/shared/components/data-error";
import { ItemInfoLoadingSkeleton } from "@/shared/components/loading-skeleton";

export default function SectorDetailsPageWrapper() {
  const params = useParams();
  const sectorIdParam = params?.id;
  const sectorId = Array.isArray(sectorIdParam)
    ? sectorIdParam[0]
    : sectorIdParam;

  const { data, isLoading, error, refetch } = useSector(sectorId);

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

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl flex flex-col gap-2">
        <AppRouterBack />
        <CardDetailsLayout sector={data}>
          {data.isActive ? (
            <SectorActiveActions sector={data} />
          ) : (
            <SectorInactiveActions sector={data} />
          )}
        </CardDetailsLayout>
      </div>
    </div>
  );
}
