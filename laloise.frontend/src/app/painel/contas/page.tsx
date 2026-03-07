import ListPageLayout from "@/components/layouts/list-layout/list-page-layout";

const MOCK_FILTERS = [
  { label: "Admin", value: "admin" },
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
];

export default function Accounts() {
  return (
    <ListPageLayout
      createHref="/painel/contas/cadastrar/usuarios"
      placeholder="Busque por nome ou email"
      filterOptions={MOCK_FILTERS}
    />
  );
}
