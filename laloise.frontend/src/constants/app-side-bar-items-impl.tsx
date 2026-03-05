import {
  AppSideBarGroupItems,
  ItemsProps,
} from "@/components/app-sidebar/app-sidebar-group";
import { GroupIcon, PlusIcon, ShieldIcon, UsersIcon } from "lucide-react";

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
] satisfies ItemsProps[];

export const appSideBarGroupsLabelImpl = [
  {
    TriggerIcon: UsersIcon,
    triggerText: "Usuarios",
    items: sidebarUserItensImpl,
  },
] satisfies AppSideBarGroupItems[];
