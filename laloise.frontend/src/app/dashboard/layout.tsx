import Drawer from "@/components/drawer";
import Header from "@/components/ui/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-svh flex flex-col lg:flex-row">
      <Header />
      <Drawer />
      <div className="flex-1 order-first lg:order-last overflow-auto p-4 lg:p-12 gap-2">
        {children}
      </div>
    </main>
  );
}
