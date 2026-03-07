import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-svh">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <NuqsAdapter>{children}</NuqsAdapter>
        </div>
      </SidebarProvider>
    </main>
  );
}
