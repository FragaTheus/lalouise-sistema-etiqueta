import MenuPageLayout from "@/layouts/MenuPageLayout";
import {
  ArchiveBoxIcon,
  Cog6ToothIcon,
  PlusIcon,
  PrinterIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const labels = [
  {
    icon: PrinterIcon,
    title: "Imprimir",
    subtitle: "Gerar agora",
    children: <></>,
    href: "",
  },
  {
    icon: TagIcon,
    title: "Modelos",
    subtitle: "Layouts e tamanhos",
    children: <></>,
    href: "",
  },
  {
    icon: PlusIcon,
    title: "Novo Design",
    subtitle: "Criar visual",
    children: <></>,
    href: "",
  },
  {
    icon: ArchiveBoxIcon,
    title: "Lotes",
    subtitle: "Histórico",
    children: <></>,
    href: "",
  },
  {
    icon: Cog6ToothIcon,
    title: "Ajustes",
    subtitle: "Calibrar",
    children: <></>,
    href: "",
  },
  {
    icon: TrashIcon,
    title: "Limpar Fila",
    subtitle: "Cancelar pendentes",
    children: <></>,
    href: "",
  },
];

export default function Labels() {
  return <MenuPageLayout cards={labels} />;
}
