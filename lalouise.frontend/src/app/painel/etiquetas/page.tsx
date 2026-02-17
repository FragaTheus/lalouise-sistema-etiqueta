import MenuPageLayout from "@/layouts/MenuPageLayout";
import { PrinterIcon, TagIcon } from "@heroicons/react/16/solid";

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
    title: "Ver etiquetas",
    subtitle: "Todas as etiquetas",
    children: <></>,
    href: "",
  },
];

export default function Labels() {
  return <MenuPageLayout cards={labels} />;
}
