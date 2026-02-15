import Drawer from "@/components/Drawer";
import Header from "@/components/Header";
import { ModalConfigProvider } from "@/context/ModalConfigContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalConfigProvider>
      <main className="h-svh w-full flex flex-col lg:flex-row overflow-hidden">
        <div className="h-20 order-last lg:w-55 lg:order-1 lg:h-full flex overflow-hidden">
          <Drawer />
        </div>
        <div className="flex-1 lg:order-last mb-15 lg:mb-0">
          <div className="w-full flex lg:hidden">
            <Header />
          </div>
          {children}
        </div>
      </main>
    </ModalConfigProvider>
  );
}
