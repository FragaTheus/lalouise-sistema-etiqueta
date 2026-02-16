"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import { motion } from "framer-motion";
import NavList from "./NavList";
import ConfigList from "./ConfigList";

export default function Drawer() {
  return (
    <div
      id="drawer"
      className="h-full w-full bg-surface grid grid-rows-1 lg:grid-rows-12 p-2"
    >
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="order-2 lg:order-1 hidden lg:block relative"
      >
        <Image
          src={logo}
          alt="Lalouise Logo"
          className="absolute w-60 -left-8 -top-6"
        />
      </motion.div>

      <div className="lg:row-span-9 order-1 lg:order-2">
        <NavList />
      </div>

      <div className="hidden lg:block order-last lg:row-span-2">
        <ConfigList />
      </div>
    </div>
  );
}
