import {
  AppSideBarGroupItems,
  ItemsProps,
} from "@/components/app-sidebar/app-sidebar-group";
import { GroupIcon, PlusIcon, ShieldIcon, User2Icon } from "lucide-react";

// Lista de itens
const sidebarUserItensImpl = [
  {
    itemHref: "/dashboard/usuarios/criar",
    ItemIcon: PlusIcon,
    itemText: "Criar Usuario",
  },
  {
    itemHref: "/dashboard/admin/criar",
    ItemIcon: ShieldIcon,
    itemText: "Criar Admin",
  },
  {
    itemHref: "/dashboard/usuarios",
    ItemIcon: GroupIcon,
    itemText: "Usuarios",
  },
] satisfies ItemsProps[];

// Lista de itens agrupados
export const appSideBarGroupsLabelImpl = [
  {
    TriggerIcon: User2Icon,
    triggerText: "Usuarios",
    items: sidebarUserItensImpl,
  },
] satisfies AppSideBarGroupItems[];
