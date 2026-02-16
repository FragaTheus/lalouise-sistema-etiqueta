import MenuPageLayout from "@/layouts/MenuPageLayout";
import { FireIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { Squares2X2Icon, TagIcon } from "@heroicons/react/24/outline";

const pages = [
  {
    icon: UserGroupIcon,
    children: <></>,
    title: "Contas",
    subtitle: "Gestao de usuarios",
    href: "/dashboard/accounts",
  },
  {
    icon: Squares2X2Icon,
    children: <></>,
    title: "Setores",
    subtitle: "Gestao de setores",
    href: "/dashboard/sectors",
  },
  {
    icon: FireIcon,
    children: <></>,
    title: "Produtos",
    subtitle: "Gestao de produtos",
    href: "/dashboard/products",
  },
  {
    icon: TagIcon,
    children: <></>,
    title: "Etiquetas",
    subtitle: "Gestao de etiquetas",
    href: "/dashboard/labels",
  },
  {
    icon: TagIcon,
    children: <></>,
    title: "Etiquetas",
    subtitle: "Gestao de etiquetas",
    href: "/dashboard/labels",
  },
  {
    icon: TagIcon,
    children: <></>,
    title: "Etiquetas",
    subtitle: "Gestao de etiquetas",
    href: "/dashboard/labels",
  },
];

export default function Dashboard() {
  return <MenuPageLayout cards={pages} />;
}
