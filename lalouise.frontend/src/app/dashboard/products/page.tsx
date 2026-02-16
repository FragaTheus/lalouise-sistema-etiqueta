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
    subtitle: "Cadastrar item no catálogo",
    children: <></>,
    href: "",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Consultar",
    subtitle: "Verificar preços e estoque",
    children: <></>,
    href: "",
  },
  {
    icon: PencilSquareIcon,
    title: "Editar",
    subtitle: "Atualizar dados do produto",
    children: <></>,
    href: "",
  },
  {
    icon: ArchiveBoxIcon,
    title: "Estoque",
    subtitle: "Entradas e saídas",
    children: <></>,
    href: "",
  },
  {
    icon: ChartBarIcon,
    title: "Relatórios",
    subtitle: "Análise de movimentação",
    children: <></>,
    href: "",
  },
  {
    icon: TrashIcon,
    title: "Remover",
    subtitle: "Excluir permanentemente",
    children: <></>,
    href: "",
  },
];

export default function Products() {
  return <MenuPageLayout cards={products} />;
}
