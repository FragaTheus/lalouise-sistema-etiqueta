"use client";

import { LabelSummary } from "@/features/label/api/api.labels.data";
import { useLabels } from "@/features/label/hooks/use-labels";
import { DataError } from "@/shared/components/data-error";
import { ListLoadingSkeleton } from "@/shared/components/loading-skeleton";
import ListPageLayout from "@/shared/components/layouts/list-layout/list-page-layout";
import { useListFilters } from "@/shared/hooks/use-filter";
import { useListPagination } from "@/shared/hooks/use-list-pagination";
import { ColumnDef } from "@tanstack/react-table";
import LabelsSuspenseWrapper from "./labels-suspense-wrapper";

const COLUMNS: ColumnDef<LabelSummary>[] = [
  { accessorKey: "lote", header: "Lote" },
  { accessorKey: "product", header: "Produto" },
  {
    accessorKey: "sector",
    header: "Setor",
    meta: { hideOnMobile: true },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { hideOnMobile: true },
  },
];

function LabelsClient() {
  const { offset, pageSize } = useListPagination();
  const { search } = useListFilters({});

  const { data, isLoading, error, refetch } = useLabels({
    page: offset / pageSize,
    size: pageSize,
    productName: search || null,
  });

  const labels = data?.content || [];
  const totalItems = data?.totalElements || 0;

  if (isLoading) {
    return <ListLoadingSkeleton />;
  }

  if (error) {
    return <DataError error={error as Error} onRetry={() => refetch()} />;
  }

  return (
    <ListPageLayout
      createHref="/painel/etiquetas/imprimir"
      actionHref="/painel/etiquetas/imprimir"
      placeholder="Busque por produto"
      data={labels}
      columns={COLUMNS}
      totalItems={totalItems}
      caption="Lista de etiquetas"
    />
  );
}

export default function LabelsListPageWrapper() {
  return (
    <LabelsSuspenseWrapper>
      <LabelsClient />
    </LabelsSuspenseWrapper>
  );
}
