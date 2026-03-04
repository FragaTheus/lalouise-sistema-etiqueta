import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function AppHeader() {
  return (
    <header className="w-full px-4  items-center justify-items-center h-auto grid grid-cols-12 fixed  bg-card border-b shadow-xs lg:hidden z-50">
      <div className="col-span-4 mt-1">
        <Image src={logo} alt="" className="lg:hidden" priority />
      </div>
      <div className="col-span-7 mt-1"></div>
      <div>
        <SidebarTrigger className="active:bg-primary/10 text-primary hover:text-primary active:text-primary" />
      </div>
    </header>
  );
}
