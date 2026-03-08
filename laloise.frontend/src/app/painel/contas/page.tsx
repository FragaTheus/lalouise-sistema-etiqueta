"use client";

import ListPageLayout from "@/components/layouts/list-layout/list-page-layout";
import { useListPagination } from "@/hooks/use-list-pagination";
import { useUsersAccounts } from "@/hooks/use-users-accounts";
import { useListFilters } from "@/hooks/use-filter";
import { ColumnDef } from "@tanstack/react-table";
import { UserSummary } from "@/api/api.accounts";
import { ListLoadingSkeleton } from "@/components/loading-skeleton";
import { DataError } from "@/components/data-error";
import { AccountsClientWrapper } from "@/wrapper/accounts-client";

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
      createHref="/painel/contas/cadastrar"
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

export default function Accounts() {
  return (
    <AccountsClientWrapper>
      <AccountClient />
    </AccountsClientWrapper>
  );
}
