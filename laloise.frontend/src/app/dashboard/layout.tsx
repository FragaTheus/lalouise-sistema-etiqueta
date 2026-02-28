import AppSidebar from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-svh flex flex-col">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="lg:hidden" />
        {children}
      </SidebarProvider>
    </main>
  );
}
