"use client";

import {
  UserGroupIcon,
  BeakerIcon,
  TagIcon,
  HomeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import ListItem from "./ListItem";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Painel de controle", href: "/dashboard", icon: HomeIcon },
  { label: "Contas", href: "/dashboard/accounts", icon: UserGroupIcon },
  { label: "Setores", href: "/dashboard/sectors", icon: Squares2X2Icon },
  { label: "Produtos", href: "/dashboard/products", icon: BeakerIcon },
  { label: "Etiquetas", href: "/dashboard/labels", icon: TagIcon },
];

export default function NavList() {
  return (
    <ul className="grid grid-cols-5 md:flex md:flex-col items-start w-full h-full p-2 gap-2">
      <small className="font-bold ml-2 hidden md:block">Recursos</small>

      {NAV_ITEMS.map((item, i) => (
        <ListItem key={i} href={item.href} index={i} text={item.label}>
          <item.icon />
        </ListItem>
      ))}
    </ul>
  );
}
