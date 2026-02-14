import Drawer from "@/components/Drawer";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-svh w-full flex flex-col lg:flex-row">
      <div className="h-20 order-last lg:w-70 lg:order-1 lg:h-full">
        <Drawer />
      </div>
      <div className="flex-1 lg:order-last">{children}</div>
    </main>
  );
}
