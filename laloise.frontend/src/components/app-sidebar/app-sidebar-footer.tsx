import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarFooter, SidebarMenuButton } from "../ui/sidebar";
import Link from "next/link";

export default function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size={"sm"}
            className="bg-transparent hover:bg-secondary/5 data-[state=open]:bg-secondary/10"
          >
            <SettingsIcon className="text-secondary" />
            <span className="font-semibold">Configuracoes</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50">
          <DropdownMenuItem>
            <Link href={""} className="w-full">
              <SidebarMenuButton
                size={"sm"}
                className="bg-transparent hover:bg-primary/5 active:bg-primary/10"
              >
                <UserIcon />
                <span>Perfil</span>
              </SidebarMenuButton>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SidebarMenuButton
              size={"sm"}
              className="bg-transparent hover:bg-destructive/5 active:bg-destructive/10"
            >
              <LogOutIcon className="text-destructive" />
              <span>Sair</span>
            </SidebarMenuButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  );
}
