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
  { label: "Painel de controle", href: "/painel", icon: HomeIcon },
  { label: "Contas", href: "/painel/contas", icon: UserGroupIcon },
  { label: "Setores", href: "/painel/setores", icon: Squares2X2Icon },
  { label: "Produtos", href: "/painel/produtos", icon: BeakerIcon },
  { label: "Etiquetas", href: "/painel/etiquetas", icon: TagIcon },
];

export default function NavList() {
  return (
    <ul className="grid grid-cols-5 lg:flex lg:flex-col items-center lg:items-start w-full h-full px-2 gap-2 lg:mt-4">
      <p className="font-bold ml-2 hidden lg:block mb-2 text-gray-500 opacity-70">
        Recursos
      </p>

      {NAV_ITEMS.map((item, i) => (
        <ListItem key={i} href={item.href} index={i} text={item.label}>
          <item.icon />
        </ListItem>
      ))}
    </ul>
  );
}
