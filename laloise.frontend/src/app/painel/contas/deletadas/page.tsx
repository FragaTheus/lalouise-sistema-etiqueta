"use client";

import ListPageLayout from "@/components/layouts/list-layout/list-page-layout";
import { useListPagination } from "@/hooks/use-list-pagination";
import { useUsersDeletedAccounts } from "@/hooks/accounts-hooks/use-users-deleted-accounts";
import { useListFilters } from "@/hooks/use-filter";
import { ColumnDef } from "@tanstack/react-table";
import { ListLoadingSkeleton } from "@/components/loading-skeleton";
import { DataError } from "@/components/data-error";
import { AccountsClientWrapper } from "@/wrapper/accounts-client";
import { UserSummary } from "@/api/api-accounts/api.accounts.data";

const COLUMNS: ColumnDef<UserSummary>[] = [
  { accessorKey: "nickname", header: "Nome" },
  { accessorKey: "email", header: "Email", meta: { hideOnMobile: true } },
  { accessorKey: "role", header: "Role", meta: { hideOnMobile: true } },
];

function DeletedAccountsClient() {
  const { offset, pageSize } = useListPagination();
  const { search } = useListFilters({});

  const { data, isLoading, error, refetch } = useUsersDeletedAccounts({
    page: offset / pageSize,
    size: pageSize,
    search: search || null,
  });

  const users = data?.content || [];
  const totalItems = data?.totalElements || 0;

  if (isLoading) {
    return <ListLoadingSkeleton />;
  }

  if (error) {
    return <DataError error={error as Error} onRetry={() => refetch()} />;
  }

  return (
    <ListPageLayout
      createHref="/painel/contas/cadastrar"
      actionHref="/painel/contas/deletadas"
      placeholder="Busque por nome ou email"
      data={users}
      columns={COLUMNS}
      totalItems={totalItems}
      caption="Lista de contas deletadas"
    />
  );
}

export default function DeletedAccounts() {
  return (
    <AccountsClientWrapper>
      <DeletedAccountsClient />
    </AccountsClientWrapper>
  );
}
