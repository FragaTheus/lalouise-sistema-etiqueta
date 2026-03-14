import userIcon from "@/shared/assets/user-icon.svg";
import createUserIcon from "@/shared/assets/create-user.svg";
import createAdminIcon from "@/shared/assets/create-admin.svg";
import productIcon from "@/shared/assets/product-icon.svg";
import tagIcon from "@/shared/assets/labels-icon.svg";
import sectorIcon from "@/shared/assets/sector-icon.svg";

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
    title: "Cadastrar Usuário",
    description: "Adicione um novo usuário ao sistema com acesso padrão",
    link: "/painel/contas/cadastrar/usuarios",
    srcUrl: createUserIcon,
  },
  {
    title: "Cadastrar Admin",
    description: "Crie uma conta com privilégios administrativos",
    link: "/painel/contas/cadastrar/admins",
    srcUrl: createAdminIcon,
  },
  {
    title: "Produtos",
    description:
      "Organize seu catálogo e acompanhe cada item do seu inventário",
    link: "/painel/produtos",
    srcUrl: productIcon,
  },
  {
    title: "Cadastrar Produto",
    description: "Adicione um novo produto ao catálogo do sistema",
    link: "/painel/produtos/cadastrar",
    srcUrl: productIcon,
  },
  {
    title: "Etiquetas",
    description: "Categorize e organize tudo de forma fácil e intuitiva",
    link: "/painel/etiquetas",
    srcUrl: tagIcon,
  },
  {
    title: "Setores",
    description: "Estruture sua empresa e defina áreas de atuação",
    link: "/painel/setores",
    srcUrl: sectorIcon,
  },
  {
    title: "Cadastrar Setor",
    description: "Crie um novo setor para organizar sua empresa",
    link: "/painel/setores/cadastrar",
    srcUrl: sectorIcon,
  },
] satisfies DashboardCardProps[];
