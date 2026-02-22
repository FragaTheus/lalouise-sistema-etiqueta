import Drawer from "@/components/Drawer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //<ProtectedRoute>
    <main className="h-svh w-full bg-amber-500 flex flex-col lg:flex-row">
      <Drawer />
      <div className="flex-1 order-first lg:order-last">{children}</div>
    </main>
    //</ProtectedRoute>
  );
}
