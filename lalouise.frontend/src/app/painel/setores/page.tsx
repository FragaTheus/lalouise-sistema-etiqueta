import MenuPageLayout from "@/layouts/MenuPageLayout";
import { ChartBarIcon, PlusIcon } from "@heroicons/react/16/solid";

const sectors = [
  {
    icon: PlusIcon,
    title: "Novo Setor",
    subtitle: "Criar área",
    children: <></>,
    href: "",
  },
  {
    icon: ChartBarIcon,
    title: "Armazenamentos",
    subtitle: "Verificar armazenamentos",
    children: <></>,
    href: "",
  },
];

export default function Sectors() {
  return <MenuPageLayout cards={sectors} />;
}
