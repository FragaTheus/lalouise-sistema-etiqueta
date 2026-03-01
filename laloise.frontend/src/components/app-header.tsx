"use client";

import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export default function AppHeader() {
  const router = useRouter();
  return (
    <header className="w-full px-4 py-2 items-center justify-items-center h-auto grid grid-cols-12 fixed lg:hidden">
      <div>
        <Button
          onClick={() => router.back()}
          className="bg-primary/5 active:bg-primary/10"
        >
          <ChevronLeft className="text-primary" />
        </Button>
      </div>
      <div className="col-span-10">
        <Image src={logo} alt="" className="w-10 lg:w-20 lg:hidden" />
      </div>
      <div>
        <SidebarTrigger className="bg-primary/5 active:bg-primary/10 text-primary hover:text-primary active:text-primary" />
      </div>
    </header>
  );
}
