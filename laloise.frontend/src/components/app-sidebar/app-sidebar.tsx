import { Sidebar, SidebarRail } from "../ui/sidebar";
import AppSidebarHeader from "./app-sidebar-header";
import AppSidebarFooter from "./app-sidebar-footer";
import AppSidebarContent from "./app-sidebar-content";
import { contentsImpl } from "@/constants/navListItens";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />

      <AppSidebarContent contents={contentsImpl} />

      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
