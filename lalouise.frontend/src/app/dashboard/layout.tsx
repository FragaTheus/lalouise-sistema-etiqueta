import Drawer from "@/components/Drawer";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //<ProtectedRoute>
    <main className="h-svh w-full flex flex-col lg:flex-row">
      <Header />
      <Drawer />
      <div className="flex-1 order-2 flex flex-col">{children}</div>
    </main>
    //</ProtectedRoute>
  );
}
