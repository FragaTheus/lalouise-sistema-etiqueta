import { CardProps } from "@/components/Card";
import NoConection from "@/components/NoConection";
import {
  EyeIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const accountsCards = [
  {
    index: 0,
    title: "Visão Geral",
    description: "Resumo do sistema",
    Icon: EyeIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },
  {
    index: 0,
    title: "Novo Usuário",
    description: "Criar conta de funcionário",
    Icon: PlusIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },
  {
    index: 0,
    title: "Novo Admin",
    description: "Criar conta administrador",
    Icon: ShieldCheckIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },
  {
    index: 0,
    title: "Meu Perfil",
    description: "Ver e editar dados",
    Icon: UserIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },
  {
    index: 0,
    title: "Lista de Usuários",
    description: "Gerenciar funcionários",
    Icon: UsersIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },
] satisfies CardProps[];
