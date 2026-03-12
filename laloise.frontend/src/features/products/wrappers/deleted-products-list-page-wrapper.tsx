"use client";

import ListPageLayout from "@/shared/components/layouts/list-layout/list-page-layout";
import { useListPagination } from "@/shared/hooks/use-list-pagination";
import { useDeletedProducts } from "@/features/products/hooks/use-deleted-products";
import { useListFilters } from "@/shared/hooks/use-filter";
import { ColumnDef } from "@tanstack/react-table";
import { ListLoadingSkeleton } from "@/shared/components/loading-skeleton";
import { DataError } from "@/shared/components/data-error";
import { ProductSummary } from "@/features/products/api/api.products.data";
import ProductsSuspenseWrapper from "./products-suspense-wrapper";

const COLUMNS: ColumnDef<ProductSummary>[] = [
  { accessorKey: "name", header: "Nome" },
  {
    accessorKey: "description",
    header: "Descrição",
    meta: { hideOnMobile: true },
  },
];

function DeletedProductsClient() {
  const { offset, pageSize } = useListPagination();
  const { search } = useListFilters({});

  const { data, isLoading, error, refetch } = useDeletedProducts({
    page: offset / pageSize,
    size: pageSize,
    search: search || null,
  });

  const products = data?.content || [];
  const totalItems = data?.totalElements || 0;

  if (isLoading) {
    return <ListLoadingSkeleton />;
  }

  if (error) {
    return <DataError error={error as Error} onRetry={() => refetch()} />;
  }

  return (
    <ListPageLayout
      createHref="/painel/produtos/cadastrar/adicionar"
      actionHref="/painel/produtos/deletados"
      placeholder="Busque por nome"
      data={products}
      columns={COLUMNS}
      totalItems={totalItems}
      caption="Lista de produtos deletados"
    />
  );
}

export default function DeletedProductsListPageWrapper() {
  return (
    <ProductsSuspenseWrapper>
      <DeletedProductsClient />
    </ProductsSuspenseWrapper>
  );
}
