import ListPageLayout from "@/layouts/ListPageLayout";

export default function Accounts() {
  return (
    <ListPageLayout
      createHref="/painel/contas/cadastrar"
      itemHref="/painel/contas/usuario"
    />
  );
}
