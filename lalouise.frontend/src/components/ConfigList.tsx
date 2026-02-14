import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ListItem from "./ListItem";

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
    <ul className="p-2">
      <small className="font-bold">Configuracoes</small>
      {NAV_ITEMS.map((item, i) => (
        <ListItem key={i} index={i} href={item.href} text={item.text}>
          <item.icon />
        </ListItem>
      ))}
    </ul>
  );
}
