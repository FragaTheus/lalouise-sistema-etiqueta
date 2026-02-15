import Drawer from "@/components/Drawer";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { ModalConfigProvider } from "@/context/ModalConfigContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalConfigProvider>
      <main className="h-svh w-full flex flex-col lg:flex-row overflow-hidden">
        <div className="h-18 order-last lg:w-55 lg:order-1 lg:h-full">
          <Drawer />
        </div>
        <div className="flex-1 lg:order-last">
          <div className="w-full flex lg:hidden">
            <Header />
          </div>
          <div className="w-full flex p-2 items-center justify-between px-4 shadow-2xs flex-wrap">
            <SearchBar />
          </div>
          {children}
        </div>
      </main>
    </ModalConfigProvider>
  );
}
