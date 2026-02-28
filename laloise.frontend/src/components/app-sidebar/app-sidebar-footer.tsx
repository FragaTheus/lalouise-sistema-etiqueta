import { LogOut, User } from "lucide-react";
import { SidebarFooter, SidebarMenuButton } from "../ui/sidebar";

export default function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenuButton size="sm" className="flex-1">
        <User className="text-primary " />
        Perfil
      </SidebarMenuButton>
      <SidebarMenuButton size="sm" className="flex-1 bg-destructive/10">
        <LogOut className="text-destructive" />
        Logout
      </SidebarMenuButton>
    </SidebarFooter>
  );
}
