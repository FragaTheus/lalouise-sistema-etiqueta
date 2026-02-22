import { NavItemProps } from "@/components/NavItem"
import { 
  UserGroupIcon,
  CreditCardIcon,
  SparklesIcon,
  BuildingStorefrontIcon,
  TagIcon
} from "@heroicons/react/24/outline"

export const navItems = [
    {
        href: "/",
        Icon: UserGroupIcon,
        linkText: "Usuários"
    },
    {
        href: "/",
        Icon: SparklesIcon,
        linkText: "Alimentos"
    },
    {
        href: "/",
        Icon: BuildingStorefrontIcon,
        linkText: "Setores"
    },
    {
        href: "/",
        Icon: TagIcon,
        linkText: "Etiquetas"
    }
] 