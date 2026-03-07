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
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="gap-2">
          <p>Recursos</p>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <Link href={"/painel"}>
            <SidebarMenuButton
              size={"sm"}
              className="bg-transparent hover:bg-secondary/5 active:bg-secondary/10"
              onClick={() => setClose()}
            >
              <HomeIcon className="text-secondary" />
              <span className="font-semibold">Painel</span>
            </SidebarMenuButton>
          </Link>
          <Collapsible className="bg-transparent mt-1">
            {groups.map((groups, index) => (
              <AppSidebarGroups
                key={index}
                TriggerIcon={groups.TriggerIcon}
                triggerText={groups.triggerText}
                items={groups.items}
              />
            ))}
          </Collapsible>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
