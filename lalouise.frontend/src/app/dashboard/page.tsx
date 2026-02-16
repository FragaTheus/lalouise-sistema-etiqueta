import MenuPageLayout from "@/layouts/MenuPageLayout";
import { FireIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { Squares2X2Icon, TagIcon } from "@heroicons/react/24/outline";

const pages = [
  {
    icon: UserGroupIcon,
    children: <></>,
    title: "Contas",
    subtitle: "Gestao de usuarios",
    href: "/account",
  },
  {
    icon: Squares2X2Icon,
    children: <></>,
    title: "Setores",
    subtitle: "Gestao de setores",
    href: "/sectors",
  },
  {
    icon: FireIcon,
    children: <></>,
    title: "Produtos",
    subtitle: "Gestao de produtos",
    href: "/products",
  },
  {
    icon: TagIcon,
    children: <></>,
    title: "Etiquetas",
    subtitle: "Gestao de etiquetas",
    href: "/labels",
  },
  {
    icon: TagIcon,
    children: <></>,
    title: "Etiquetas",
    subtitle: "Gestao de etiquetas",
    href: "/labels",
  },
  {
    icon: TagIcon,
    children: <></>,
    title: "Etiquetas",
    subtitle: "Gestao de etiquetas",
    href: "/labels",
  },
];

export default function Dashboard() {
  return <MenuPageLayout cards={pages} />;
}
