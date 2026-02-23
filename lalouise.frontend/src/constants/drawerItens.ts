import { 
  HomeIcon,
  UserGroupIcon,
  SparklesIcon,
  BuildingStorefrontIcon,
  TagIcon
} from "@heroicons/react/24/outline"

export const navItems = [
    {
        href: "/dashboard",
        Icon: HomeIcon,
        linkText: "Dashboard"
    },
    {
        href: "/dashboard/accounts",
        Icon: UserGroupIcon,
        linkText: "Usuários"
    },
    {
        href: "/dashboard/desenvolvimento",
        Icon: SparklesIcon,
        linkText: "Alimentos"
    },
    {
        href: "/dashboard/desenvolvimento",
        Icon: BuildingStorefrontIcon,
        linkText: "Setores"
    },
    {
        href: "/dashboard/desenvolvimento",
        Icon: TagIcon,
        linkText: "Etiquetas"
    }
]