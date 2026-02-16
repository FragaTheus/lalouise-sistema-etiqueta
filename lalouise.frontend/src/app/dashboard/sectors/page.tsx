import MenuPageLayout from "@/layouts/MenuPageLayout";
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  RectangleGroupIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const sectors = [
  {
    icon: PlusIcon,
    title: "Novo Setor",
    subtitle: "Criar área",
    children: <></>,
    href: "",
  },
  {
    icon: RectangleGroupIcon,
    title: "Organizar",
    subtitle: "Vincular produtos",
    children: <></>,
    href: "",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Mapa",
    subtitle: "Fluxo de trabalho",
    children: <></>,
    href: "",
  },
  {
    icon: PencilSquareIcon,
    title: "Renomear",
    subtitle: "Editar nome",
    children: <></>,
    href: "",
  },
  {
    icon: ChartBarIcon,
    title: "Eficiência",
    subtitle: "Produtividade",
    children: <></>,
    href: "",
  },
  {
    icon: TrashIcon,
    title: "Excluir",
    subtitle: "Remover setor",
    children: <></>,
    href: "",
  },
];

export default function Sectors() {
  return <MenuPageLayout cards={sectors} />;
}
