import {
  AppSideBarGroupItems,
  ItemsProps,
} from "@/components/app-sidebar/app-sidebar-types";
import {
  GroupIcon,
  PlusIcon,
  ShieldIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";

const sidebarUserItensImpl = [
  {
    itemHref: "/painel/contas/cadastrar/usuarios",
    ItemIcon: PlusIcon,
    itemText: "Criar Usuario",
  },
  {
    itemHref: "/painel/contas/cadastrar/admins",
    ItemIcon: ShieldIcon,
    itemText: "Criar Admin",
  },
  {
    itemHref: "/painel/contas",
    ItemIcon: GroupIcon,
    itemText: "Usuarios",
  },
  {
    itemHref: "/painel/contas/deletadas",
    ItemIcon: Trash2Icon,
    itemText: "Usuarios Deletados",
  },
] satisfies ItemsProps[];

export const appSideBarGroupsLabelImpl = [
  {
    TriggerIcon: UsersIcon,
    triggerText: "Usuarios",
    items: sidebarUserItensImpl,
  },
] satisfies AppSideBarGroupItems[];
