import MenuPageLayout from "@/layouts/MenuPageLayout";
import {
  ArchiveBoxIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const products = [
  {
    icon: PlusIcon,
    title: "Novo Produto",
    subtitle: "Cadastrar item",
    children: <></>,
    href: "",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Consultar",
    subtitle: "Preços e estoque",
    children: <></>,
    href: "",
  },
  {
    icon: PencilSquareIcon,
    title: "Editar",
    subtitle: "Atualizar dados",
    children: <></>,
    href: "",
  },
  {
    icon: ArchiveBoxIcon,
    title: "Estoque",
    subtitle: "Movimentação",
    children: <></>,
    href: "",
  },
  {
    icon: ChartBarIcon,
    title: "Relatórios",
    subtitle: "Análises",
    children: <></>,
    href: "",
  },
  {
    icon: TrashIcon,
    title: "Remover",
    subtitle: "Excluir item",
    children: <></>,
    href: "",
  },
];

export default function Products() {
  return <MenuPageLayout cards={products} />;
}
