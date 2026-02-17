import MenuPageLayout from "@/layouts/MenuPageLayout";
import { FireIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { Squares2X2Icon, TagIcon } from "@heroicons/react/24/outline";

const pages = [
  {
    icon: UserGroupIcon,
    children: <></>,
    title: "Contas",
    subtitle: "Gestao de usuarios",
    href: "/painel/contas",
  },
  {
    icon: Squares2X2Icon,
    children: <></>,
    title: "Setores",
    subtitle: "Gestao de setores",
    href: "/painel/setores",
  },
  {
    icon: FireIcon,
    children: <></>,
    title: "Produtos",
    subtitle: "Gestao de produtos",
    href: "/painel/produtos",
  },
  {
    icon: TagIcon,
    children: <></>,
    title: "Etiquetas",
    subtitle: "Gestao de etiquetas",
    href: "/painel/etiquetas",
  },
  {
    icon: TagIcon,
    children: <></>,
    title: "Etiquetas",
    subtitle: "Gestao de etiquetas",
    href: "/painel/etiquetas",
  },
  {
    icon: TagIcon,
    children: <></>,
    title: "Etiquetas",
    subtitle: "Gestao de etiquetas",
    href: "/painel/etiquetas",
  },
];

export default function Dashboard() {
  return <MenuPageLayout cards={pages} />;
}
