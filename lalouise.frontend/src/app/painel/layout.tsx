import DashHeader from "@/components/DashHeader";
import Drawer from "@/components/Drawer";
import Header from "@/components/Header";
import { ModalConfigProvider } from "@/context/ModalConfigContext";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalConfigProvider>
      <main className="h-svh w-full flex flex-col lg:flex-row overflow-hidden">
        <div className="h-20 order-last lg:w-80 lg:order-1 lg:h-full flex overflow-hidden">
          <Drawer />
        </div>

        <div className="flex-1 lg:order-last lg:mb-0 flex flex-col">
          <div className="w-full flex lg:hidden">
            <Header />
          </div>

          <DashHeader />

          {children}
        </div>
      </main>
    </ModalConfigProvider>
  );
}
