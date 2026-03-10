"use client";

import ListPageLayout from "@/components/layouts/list-layout/list-page-layout";
import { useListPagination } from "@/hooks/use-list-pagination";
import { useDeletedProducts } from "@/hooks/products-hooks/use-deleted-products";
import { useListFilters } from "@/hooks/use-filter";
import { ColumnDef } from "@tanstack/react-table";
import { ListLoadingSkeleton } from "@/components/loading-skeleton";
import { DataError } from "@/components/data-error";
import { ProductsClientWrapper } from "@/wrapper/products-client";
import { ProductSummary } from "@/api/api-products/api.products.data";

const COLUMNS: ColumnDef<ProductSummary>[] = [
  { accessorKey: "name", header: "Nome" },
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

export default function DeletedProducts() {
  return (
    <ProductsClientWrapper>
      <DeletedProductsClient />
    </ProductsClientWrapper>
  );
}
