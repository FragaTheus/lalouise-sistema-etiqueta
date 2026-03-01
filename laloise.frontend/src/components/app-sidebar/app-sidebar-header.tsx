"use client";

import Image from "next/image";
import { SidebarHeader, useSidebar } from "../ui/sidebar";
import logoOnlyIcon from "@/assets/logo-w-text.png";
import logo from "@/assets/logo.png";

export default function AppSidebarHeader() {
  const { open } = useSidebar();
  return (
    <SidebarHeader className="mt-2">
      <div className="transition-opacity">
        {open ? (
          <Image src={logo} alt="Lalouise Logo" className="w-30 lg:w-40" />
        ) : (
          <Image src={logoOnlyIcon} alt="Lalouise Logo" />
        )}
      </div>
    </SidebarHeader>
  );
}
