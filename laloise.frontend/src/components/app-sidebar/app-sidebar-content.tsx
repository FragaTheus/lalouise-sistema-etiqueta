"use client";

import Link from "next/link";
import { Collapsible } from "../ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  useSidebar,
} from "../ui/sidebar";
import { HomeIcon } from "lucide-react";
import { AppSideBarGroupItems } from "./app-sidebar-types";
import AppSidebarGroups from "./app-sidebar-group";
import { motion } from "framer-motion";

export interface AppSidebarContentProps {
  groups: AppSideBarGroupItems[];
}

export default function AppSidebarContent({ groups }: AppSidebarContentProps) {
  const { setOpenMobile, setOpen } = useSidebar();
  const setClose = () => {
    setOpenMobile(false);
    setOpen(false);
  };
  return (
    <SidebarContent className="py-2">
      <SidebarGroup>
        <SidebarGroupLabel className="gap-2 text-foreground/60 text-xs font-semibold tracking-widest uppercase px-2 py-3">
          <p>Recursos</p>
        </SidebarGroupLabel>
        <SidebarGroupContent className="gap-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link href={"/painel"}>
              <SidebarMenuButton
                size={"sm"}
                className="bg-transparent hover:bg-primary/8 active:bg-primary/15 transition-all duration-200 rounded-lg"
                onClick={() => setClose()}
              >
                <HomeIcon className="text-primary" />
                <span className="font-semibold text-foreground">Painel</span>
              </SidebarMenuButton>
            </Link>
          </motion.div>
          <Collapsible className="bg-transparent mt-2">
            {groups.map((groups, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 * (index + 1),
                  ease: "easeOut",
                }}
              >
                <AppSidebarGroups
                  TriggerIcon={groups.TriggerIcon}
                  triggerText={groups.triggerText}
                  items={groups.items}
                />
              </motion.div>
            ))}
          </Collapsible>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
