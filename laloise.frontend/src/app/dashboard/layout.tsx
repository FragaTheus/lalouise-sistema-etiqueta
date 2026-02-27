import Drawer from "@/components/app-drawer";
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
      {children}
    </main>
  );
}
