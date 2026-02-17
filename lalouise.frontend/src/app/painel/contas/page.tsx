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
    href: "/painel/contas/criar",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Listar Todos",
    subtitle: "Gerenciar ativos",
    children: <></>,
    href: "/painel/contas/listar",
  },
  {
    icon: PencilSquareIcon,
    title: "Alterar Dados",
    subtitle: "Segurança",
    children: <></>,
    href: "/painel/contas/atualizar",
  },
];

export default function Accounts() {
  return <MenuPageLayout cards={contas} />;
}
