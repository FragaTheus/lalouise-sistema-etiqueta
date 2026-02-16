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
    subtitle: "Gerar etiquetas agora",
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
    subtitle: "Criar visual de etiqueta",
    children: <></>,
    href: "",
  },
  {
    icon: ArchiveBoxIcon,
    title: "Lotes",
    subtitle: "Histórico de impressões",
    children: <></>,
    href: "",
  },
  {
    icon: Cog6ToothIcon,
    title: "Ajustes",
    subtitle: "Calibrar impressora",
    children: <></>,
    href: "",
  },
  {
    icon: TrashIcon,
    title: "Limpar Fila",
    subtitle: "Cancelar impressões pendentes",
    children: <></>,
    href: "",
  },
];

export default function Labels() {
  return <MenuPageLayout cards={labels} />;
}
