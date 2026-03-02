"use client";

import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();
  return (
    <header className="w-full px-4 py-2 items-center justify-items-center h-auto grid grid-cols-12 fixed  bg-card border-b shadow-xs lg:hidden z-50">
      <div className="col-span-3 mt-1">
        <Image src={logo} alt="" className="lg:hidden" priority />
      </div>
      <div className="col-span-8 mt-1"></div>
      <div>
        <SidebarTrigger className="active:bg-primary/10 text-primary hover:text-primary active:text-primary" />
      </div>
    </header>
  );
}
