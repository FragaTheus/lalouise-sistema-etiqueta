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
    subtitle: "Criar nova área de produção",
    children: <></>,
    href: "",
  },
  {
    icon: RectangleGroupIcon,
    title: "Organizar",
    subtitle: "Vincular produtos a áreas",
    children: <></>,
    href: "",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Mapa de Setores",
    subtitle: "Visualizar fluxo de trabalho",
    children: <></>,
    href: "",
  },
  {
    icon: PencilSquareIcon,
    title: "Renomear",
    subtitle: "Editar nome do setor",
    children: <></>,
    href: "",
  },
  {
    icon: ChartBarIcon,
    title: "Eficiência",
    subtitle: "Produtividade por setor",
    children: <></>,
    href: "",
  },
  {
    icon: TrashIcon,
    title: "Excluir",
    subtitle: "Remover setor sem uso",
    children: <></>,
    href: "",
  },
];

export default function Sectors() {
  return <MenuPageLayout cards={sectors} />;
}
