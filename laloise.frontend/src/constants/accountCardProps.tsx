import { ListChecks, Shield, UserPlus, Users } from "lucide-react";

interface CardProps {
  href: string;
  Icon: React.ComponentType;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const accountCardProps = [
  {
    href: "",
    Icon: UserPlus,
    title: "Criar usuário",
    description: "Criar novo usuário na plataforma",
    children: <div>Children</div>,
  },
  {
    href: "",
    Icon: Shield,
    title: "Criar admin",
    description: "Criar novo administrador",
    children: <div>Children</div>,
  },
  {
    href: "",
    Icon: Users,
    title: "Usuários",
    description: "Visualizar lista de usuários",
    children: <div>Children</div>,
  },
] satisfies CardProps[];
