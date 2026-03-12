import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
import logo from "@/shared/assets/logo.png";

export default function AppHeader() {
  return (
    <header className="w-full px-4 py-3 h-auto flex items-center justify-between fixed bg-linear-to-r from-card to-card/95 border-b border-border/50 shadow-sm lg:hidden z-50 backdrop-blur-sm bg-card/80">
      <div className="shrink-0">
        <Image src={logo} alt="LaLouise Logo" className="h-8 w-auto" priority />
      </div>

      <div className="flex-1" />

      <div className="shrink-0">
        <SidebarTrigger className="p-2 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 active:bg-primary/20 transition-all duration-200 hover:scale-105 active:scale-95" />
      </div>
    </header>
  );
}
