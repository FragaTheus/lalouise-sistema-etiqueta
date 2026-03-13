"use client";

import { SectorSummary } from "@/features/sectors/api/api.sectors.data";
import { useSectors } from "@/features/sectors/hooks/use-sectors";
import { DataError } from "@/shared/components/data-error";
import { ListLoadingSkeleton } from "@/shared/components/loading-skeleton";
import ListPageLayout from "@/shared/components/layouts/list-layout/list-page-layout";
import { useListFilters } from "@/shared/hooks/use-filter";
import { useListPagination } from "@/shared/hooks/use-list-pagination";
import { ColumnDef } from "@tanstack/react-table";
import SectorsSuspenseWrapper from "./sectors-suspense-wrapper";

const COLUMNS: ColumnDef<SectorSummary>[] = [
  { accessorKey: "name", header: "Nome" },
  {
    accessorKey: "description",
    header: "Descrição",
    meta: { hideOnMobile: true },
  },
];

function SectorsClient() {
  const { offset, pageSize } = useListPagination();
  const { search } = useListFilters({});

  const { data, isLoading, error, refetch } = useSectors({
    page: offset / pageSize,
    size: pageSize,
    search: search || null,
  });

  const sectors = data?.content || [];
  const totalItems = data?.totalElements || 0;

  if (isLoading) {
    return <ListLoadingSkeleton />;
  }

  if (error) {
    return <DataError error={error as Error} onRetry={() => refetch()} />;
  }

  return (
    <ListPageLayout
      createHref="/painel/setores/cadastrar"
      actionHref="/painel/setores"
      placeholder="Busque por nome"
      data={sectors}
      columns={COLUMNS}
      totalItems={totalItems}
      caption="Lista de setores"
    />
  );
}

export default function SectorsListPageWrapper() {
  return (
    <SectorsSuspenseWrapper>
      <SectorsClient />
    </SectorsSuspenseWrapper>
  );
}
