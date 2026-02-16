import MenuPageLayout from "@/layouts/MenuPageLayout";
import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/16/solid";

const contas = [
  {
    icon: UserPlusIcon,
    title: "Novo Usuário",
    subtitle: "Criar acesso",
    children: <></>,
    href: "",
  },
  {
    icon: ShieldCheckIcon,
    title: "Permissões",
    subtitle: "Níveis de acesso",
    children: <></>,
    href: "",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Listar Todos",
    subtitle: "Gerenciar ativos",
    children: <></>,
    href: "",
  },
  {
    icon: PencilSquareIcon,
    title: "Alterar Senha",
    subtitle: "Segurança",
    children: <></>,
    href: "",
  },
  {
    icon: Cog6ToothIcon,
    title: "Logs",
    subtitle: "Histórico",
    children: <></>,
    href: "",
  },
  {
    icon: TrashIcon,
    title: "Desativar",
    subtitle: "Bloquear acesso",
    children: <></>,
    href: "",
  },
];

export default function Accounts() {
  return <MenuPageLayout cards={contas} />;
}
