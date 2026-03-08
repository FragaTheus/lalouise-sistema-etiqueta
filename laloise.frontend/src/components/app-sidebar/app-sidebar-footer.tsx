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
import { motion } from "framer-motion";

export default function AppSidebarFooter() {
  const { setOpenMobile } = useSidebar();
  const logout = useAuthStore((state) => state.logout);

  return (
    <SidebarFooter className="border-t border-border/30 py-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={"sm"}
              className="bg-linear-to-r from-secondary/8 to-secondary/5 hover:from-secondary/15 hover:to-secondary/10 active:from-secondary/20 active:to-secondary/15 data-[state=open]:from-secondary/15 data-[state=open]:to-secondary/10 transition-all duration-200 rounded-lg"
            >
              <SettingsIcon className="text-secondary" />
              <span className="font-semibold text-foreground">
                Configuracoes
              </span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem className="cursor-pointer">
              <Link href={"/painel/perfil"} className="w-full">
                <SidebarMenuButton
                  size={"sm"}
                  className="bg-transparent hover:bg-primary/8 active:bg-primary/15 transition-all duration-200 rounded-lg"
                  onClick={() => setOpenMobile(false)}
                >
                  <UserIcon className="text-primary" />
                  <span className="text-foreground">Perfil</span>
                </SidebarMenuButton>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <SidebarMenuButton
                size={"sm"}
                className="bg-transparent hover:bg-destructive/8 active:bg-destructive/15 transition-all duration-200 rounded-lg w-full"
                onClick={() => {
                  setOpenMobile(false);
                  logout();
                }}
              >
                <LogOutIcon className="text-destructive" />
                <span className="text-foreground">Sair</span>
              </SidebarMenuButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </SidebarFooter>
  );
}
