"use client";

import Image from "next/image";
import { SidebarHeader, useSidebar } from "../ui/sidebar";
import logoOnlyIcon from "@/assets/logo-w-text.png";
import logo from "@/assets/logo.png";
import { motion } from "framer-motion";

export default function AppSidebarHeader() {
  const { open } = useSidebar();
  return (
    <SidebarHeader className="mt-3 mb-4 pb-3 border-b border-border/30">
      <motion.div
        className="transition-all duration-300 hidden lg:block"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {open ? (
          <Image
            src={logo}
            alt="Lalouise Logo"
            className="lg:block w-40 drop-shadow-sm"
          />
        ) : (
          <div className="flex items-center justify-center">
            <Image
              src={logoOnlyIcon}
              alt="Lalouise Logo"
              className="drop-shadow-sm"
            />
          </div>
        )}
      </motion.div>

      <motion.h4
        className="lg:hidden font-semibold text-foreground text-sm tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Navegação
      </motion.h4>
    </SidebarHeader>
  );
}
