import { Sidebar, SidebarRail } from "../ui/sidebar";
import AppSidebarHeader from "./app-sidebar-header";
import AppSidebarFooter from "./app-sidebar-footer";
import AppSidebarContentClient from "@/wrapper/sidebar-content-client";

export default function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-linear-to-b from-primary/5 to-transparent"
    >
      <AppSidebarHeader />
      <AppSidebarContentClient />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
