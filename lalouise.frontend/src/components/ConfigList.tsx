import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ListItem from "./NavListItem";

interface NavItem {
  text: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { text: "Perfil", href: "", icon: UserIcon },
  { text: "Sair", href: "", icon: ArrowLeftStartOnRectangleIcon },
];
export default function ConfigList() {
  return (
    <ul className="flex flex-row md:flex-col items-start w-full h-full px-2 py-4 gap-1">
      <p className="font-bold hidden md:block text-gray-500 opacity-70">
        Configurações
      </p>
      {NAV_ITEMS.map((item, i) => (
        <ListItem key={i} index={i} href={item.href} text={item.text}>
          <item.icon />
        </ListItem>
      ))}
    </ul>
  );
}
