"use client";

import ListPageLayout from "@/shared/components/layouts/list-layout/list-page-layout";
import { useListPagination } from "@/shared/hooks/use-list-pagination";
import { useUsersAccounts } from "@/features/accounts/hooks/use-users-accounts";
import { useListFilters } from "@/shared/hooks/use-filter";
import { ColumnDef } from "@tanstack/react-table";
import { ListLoadingSkeleton } from "@/shared/components/loading-skeleton";
import { DataError } from "@/shared/components/data-error";
import { UserSummary } from "@/features/accounts/api/api.accounts.data";
import AccountsSuspenseWrapper from "./accounts-suspense-wrapper";

const COLUMNS: ColumnDef<UserSummary>[] = [
  { accessorKey: "nickname", header: "Nome" },
  { accessorKey: "email", header: "Email", meta: { hideOnMobile: true } },
  { accessorKey: "role", header: "Role", meta: { hideOnMobile: true } },
];

const ROLE_FILTERS = [
  { label: "Admin", value: "ADMIN" },
  { label: "User", value: "USER" },
];

function AccountClient() {
  const { offset, pageSize } = useListPagination();
  const { search, filters } = useListFilters({
    filterParam: "role",
    filterOptions: ROLE_FILTERS,
  });

  const role = filters.length > 0 ? filters[0] : null;

  const { data, isLoading, error, refetch } = useUsersAccounts({
    page: offset / pageSize,
    size: pageSize,
    search: search || null,
    role,
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
      createHref="/painel/contas/cadastrar/usuarios"
      actionHref="/painel/contas"
      placeholder="Busque por nome ou email"
      filterParam="role"
      filterOptions={ROLE_FILTERS}
      data={users}
      columns={COLUMNS}
      totalItems={totalItems}
      caption="Lista de contas"
    />
  );
}

export default function AccountsListPageWrapper() {
  return (
    <AccountsSuspenseWrapper>
      <AccountClient />
    </AccountsSuspenseWrapper>
  );
}
