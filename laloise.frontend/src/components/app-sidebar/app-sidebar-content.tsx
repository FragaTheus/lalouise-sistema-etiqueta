"use client";

import { Collapsible } from "../ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../ui/sidebar";
import AppSidebarGroups, { AppSideBarGroupItems } from "./app-sidebar-group";

export interface AppSidebarContentProps {
  groups: AppSideBarGroupItems[];
}

export default function AppSidebarContent({ groups }: AppSidebarContentProps) {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="gap-2">
          <p>Recursos</p>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <Collapsible className="bg-transparent">
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
