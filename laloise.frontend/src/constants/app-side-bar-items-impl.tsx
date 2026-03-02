import {
  AppSideBarGroupItems,
  ItemsProps,
} from "@/components/app-sidebar/app-sidebar-group";
import { GroupIcon, PlusIcon, ShieldIcon, User2Icon } from "lucide-react";

// Lista de itens
const sidebarUserItensImpl = [
  {
    itemHref: "/painel/contas/usuarios/cadastrar",
    ItemIcon: PlusIcon,
    itemText: "Criar Usuario",
  },
  {
    itemHref: "/painel/contas/admins/cadastrar",
    ItemIcon: ShieldIcon,
    itemText: "Criar Admin",
  },
  {
    itemHref: "/painel/usuarios",
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
