import userIcon from "@/assets/user-icon.svg";
import productIcon from "@/assets/product-icon.svg";
import tagIcon from "@/assets/labels-icon.svg";
import sectorIcon from "@/assets/sector-icon.svg";

interface DashboardCardProps {
  srcUrl: string;
  link: string;
  title: string;
  description: string;
}

export const dashboardCardProps = [
  {
    title: "Usuarios",
    description: "Gerencie sua equipe e controle quem tem acesso ao sistema",
    link: "/painel/contas",
    srcUrl: userIcon,
  },
  {
    title: "Produtos",
    description:
      "Organize seu catálogo e acompanhe cada item do seu inventário",
    link: "",
    srcUrl: productIcon,
  },
  {
    title: "Etiquetas",
    description: "Categorize e organize tudo de forma fácil e intuitiva",
    link: "",
    srcUrl: tagIcon,
  },
  {
    title: "Setores",
    description: "Estruture sua empresa e defina áreas de atuação",
    link: "",
    srcUrl: sectorIcon,
  },
] satisfies DashboardCardProps[];
