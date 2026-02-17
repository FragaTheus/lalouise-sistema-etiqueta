import MenuPageLayout from "@/layouts/MenuPageLayout";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/16/solid";

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
    subtitle: "Ver produtos cadastrados",
    children: <></>,
    href: "",
  },
];

export default function Products() {
  return <MenuPageLayout cards={products} />;
}
