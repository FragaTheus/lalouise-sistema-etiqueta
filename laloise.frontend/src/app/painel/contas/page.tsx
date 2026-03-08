"use client";

import ListPageLayout from "@/components/layouts/list-layout/list-page-layout";
import { useListPagination } from "@/hooks/use-list-pagination";
import { ColumnDef } from "@tanstack/react-table";
import { Suspense } from "react";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const MOCK_FILTERS = [
  { label: "Admin", value: "admin" },
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
];

const MOCK_DATA: MockUser[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    role: "Admin",
    status: "Ativo",
  },
  {
    id: "2",
    name: "Maria Souza",
    email: "maria@email.com",
    role: "User",
    status: "Ativo",
  },
  {
    id: "3",
    name: "Pedro Santos",
    email: "pedro@email.com",
    role: "Admin",
    status: "Inativo",
  },
  {
    id: "4",
    name: "Ana Lima",
    email: "ana@email.com",
    role: "User",
    status: "Ativo",
  },
  {
    id: "5",
    name: "Carlos Oliveira",
    email: "carlos@email.com",
    role: "User",
    status: "Inativo",
  },
  {
    id: "6",
    name: "Lucas Pereira",
    email: "lucas@email.com",
    role: "Admin",
    status: "Ativo",
  },
  {
    id: "7",
    name: "Fernanda Costa",
    email: "fernanda@email.com",
    role: "User",
    status: "Ativo",
  },
  {
    id: "8",
    name: "Rafael Mendes",
    email: "rafael@email.com",
    role: "User",
    status: "Inativo",
  },
  {
    id: "9",
    name: "Juliana Rocha",
    email: "juliana@email.com",
    role: "Admin",
    status: "Ativo",
  },
  {
    id: "10",
    name: "Bruno Alves",
    email: "bruno@email.com",
    role: "User",
    status: "Inativo",
  },
  {
    id: "11",
    name: "Camila Nunes",
    email: "camila@email.com",
    role: "User",
    status: "Ativo",
  },
];

const MOCK_COLUMNS: ColumnDef<MockUser>[] = [
  { accessorKey: "name", header: "Nome" },
  { accessorKey: "email", header: "Email", meta: { hideOnMobile: true } },
  { accessorKey: "role", header: "Cargo" },
  { accessorKey: "status", header: "Status", meta: { hideOnMobile: true } },
];

function AccountClient() {
  const { offset, pageSize } = useListPagination();
  const paginatedData = MOCK_DATA.slice(offset, offset + pageSize);

  return (
    <ListPageLayout
      createHref="/painel/contas/cadastrar"
      actionHref="/painel/contas"
      placeholder="Busque por nome ou email"
      filterParam="role"
      filterOptions={MOCK_FILTERS}
      data={paginatedData}
      columns={MOCK_COLUMNS}
      totalItems={MOCK_DATA.length}
      caption="Lista de contas"
    />
  );
}

export default function Accounts() {
  return (
    <Suspense>
      <AccountClient />
    </Suspense>
  );
}
