import {
  AppSideBarGroupItems,
  ItemsProps,
} from "@/components/app-sidebar/app-sidebar-group";
import { GroupIcon, PlusIcon, ShieldIcon, User2Icon } from "lucide-react";

// Lista de itens
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

// Lista de itens agrupados
export const appSideBarGroupsLabelImpl = [
  {
    TriggerIcon: User2Icon,
    triggerText: "Usuarios",
    items: sidebarUserItensImpl,
  },
] satisfies AppSideBarGroupItems[];
