import { UserIcon } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
} from "../ui/sidebar";
import Link from "next/link";

export type SidebarContentProps = {
  href: string;
  Icon: React.ElementType;
  text: string;
};

interface AppSidebarContentProps {
  contents: SidebarContentProps[];
}

export default function AppSidebarContent({
  contents,
}: AppSidebarContentProps) {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Recursos</SidebarGroupLabel>
        <SidebarGroupContent>
          {contents.map((c, i) => (
            <Link href={c.href} key={i}>
              <SidebarMenuButton
                size={"sm"}
                className="mt-2 bg-transparent hover:bg-primary/10"
              >
                <c.Icon className="text-primary" />
                {c.text}
              </SidebarMenuButton>
            </Link>
          ))}
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
