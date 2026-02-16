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
    subtitle: "Criar acesso para funcionário",
    children: <></>,
    href: "",
  },
  {
    icon: ShieldCheckIcon,
    title: "Permissões",
    subtitle: "Definir níveis de acesso",
    children: <></>,
    href: "",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Listar Todos",
    subtitle: "Gerenciar usuários ativos",
    children: <></>,
    href: "",
  },
  {
    icon: PencilSquareIcon,
    title: "Alterar Senha",
    subtitle: "Segurança das contas",
    children: <></>,
    href: "",
  },
  {
    icon: Cog6ToothIcon,
    title: "Logs",
    subtitle: "Histórico de ações no sistema",
    children: <></>,
    href: "",
  },
  {
    icon: TrashIcon,
    title: "Desativar",
    subtitle: "Bloquear acesso ao sistema",
    children: <></>,
    href: "",
  },
];

export default function Accounts() {
  return <MenuPageLayout cards={contas} />;
}
