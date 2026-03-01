import { Sidebar, SidebarRail } from "../ui/sidebar";
import AppSidebarHeader from "./app-sidebar-header";
import AppSidebarFooter from "./app-sidebar-footer";
import AppSidebarContentClient from "@/wrapper/sidebar-content-client";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarContentClient />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
