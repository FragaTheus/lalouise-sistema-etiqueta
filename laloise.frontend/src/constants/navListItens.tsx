import { SidebarContentProps } from "@/components/app-sidebar/app-sidebar-content";
import { Users, Package, Layers, Tag } from "lucide-react";

export const contentsImpl = [
  {
    href: "",
    Icon: Users,
    text: "Usuários",
  },
  {
    href: "",
    Icon: Package,
    text: "Produtos",
  },
  {
    href: "",
    Icon: Layers,
    text: "Setores",
  },
  {
    href: "",
    Icon: Tag,
    text: "Etiquetas",
  },
] satisfies SidebarContentProps[];
