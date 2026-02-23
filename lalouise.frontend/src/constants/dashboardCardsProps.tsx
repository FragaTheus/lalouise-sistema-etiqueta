import { CardProps } from "@/components/Card";
import NoConection from "@/components/NoConection";
import {
  EyeIcon,
  PlusIcon,
  SparklesIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export const dashCard = [
  // USUÁRIOS
  {
    index: 0,
    title: "Visão Geral - Usuários",
    description: "Resumo do sistema de usuários",
    Icon: EyeIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },

  // PRODUTOS
  {
    index: 0,
    title: "Visão Geral - Produtos",
    description: "Resumo do sistema de produtos",
    Icon: EyeIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },
  {
    index: 0,
    title: "Novo Produto",
    description: "Cadastrar alimento",
    Icon: PlusIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },
  {
    index: 0,
    title: "Lista de Produtos",
    description: "Gerenciar alimentos",
    Icon: SparklesIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },

  // SETORES
  {
    index: 0,
    title: "Visão Geral - Setores",
    description: "Resumo do sistema de setores",
    Icon: EyeIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },
  {
    index: 0,
    title: "Novo Setor",
    description: "Criar novo setor",
    Icon: PlusIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },

  // ETIQUETAS
  {
    index: 0,
    title: "Visão Geral - Etiquetas",
    description: "Resumo do sistema de etiquetas",
    Icon: EyeIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },
  {
    index: 0,
    title: "Imprimir Etiqueta",
    description: "Gerar nova etiqueta",
    Icon: PlusIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },
  {
    index: 0,
    title: "Lista de Etiquetas",
    description: "Ver etiquetas impressas",
    Icon: TagIcon,
    href: "/dashboard/desenvolvimento",
    children: <NoConection />,
  },
] satisfies CardProps[];
