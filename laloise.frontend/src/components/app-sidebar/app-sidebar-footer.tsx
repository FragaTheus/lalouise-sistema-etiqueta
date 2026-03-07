"use client";

import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarFooter, SidebarMenuButton, useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { useAuthStore } from "@/hooks/use-auth-store";

export default function AppSidebarFooter() {
  const { setOpenMobile } = useSidebar();
  const logout = useAuthStore((state) => state.logout);

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
            <Link href={"/painel/perfil"} className="w-full">
              <SidebarMenuButton
                size={"sm"}
                className="bg-transparent hover:bg-primary/5 active:bg-primary/10"
                onClick={() => setOpenMobile(false)}
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
              onClick={() => {
                setOpenMobile(false);
                logout();
              }}
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
