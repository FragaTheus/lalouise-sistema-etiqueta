import MenuPageLayout from "@/layouts/MenuPageLayout";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UserPlusIcon,
} from "@heroicons/react/16/solid";

const contas = [
  {
    icon: UserPlusIcon,
    title: "Novo Usuário",
    subtitle: "Criar acesso",
    children: <></>,
    href: "/dashboard/accounts/create",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Listar Todos",
    subtitle: "Gerenciar ativos",
    children: <></>,
    href: "/dashboard/accounts/list",
  },
  {
    icon: PencilSquareIcon,
    title: "Alterar Dados",
    subtitle: "Segurança",
    children: <></>,
    href: "/dashboard/accounts/update",
  },
];

export default function Accounts() {
  return <MenuPageLayout cards={contas} />;
}
