"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  BeakerIcon,
  TagIcon,
  HomeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

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

export default function DrawerNavList() {
  const pathname = usePathname();

  return (
    <ul className="grid grid-cols-5 md:flex md:flex-col items-center justify-items-center w-full h-full p-2 gap-2">
      {NAV_ITEMS.map((item, index) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <motion.li
            key={item.label}
            className="w-full flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={item.href}
              className={`relative flex flex-col md:flex-row items-center gap-2 p-3 w-full rounded-lg transition-all duration-200 group
                ${
                  isActive
                    ? "text-primary  bg-primary/15"
                    : "text-slate-500 hover:text-primary hover:bg-primary/15"
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-primary/15 rounded-lg -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <item.icon
                className={`w-6 h-6 md:w-5 md:h-5 transition-transform group-hover:scale-110 
                ${isActive ? "text-primary font-bold" : "text-slate-400 group-hover:text-primary"}`}
              />

              <span
                className={`hidden md:block text-sm ${isActive ? "font-bold" : "font-semibold"}`}
              >
                {item.label}
              </span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
