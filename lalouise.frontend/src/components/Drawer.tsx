"use client";

import Image from "next/image";
import logo from "@/assets/logo.svg";
import DrawerNavList from "./DrawerNavList";
import DrawerFooter from "./DrawerFooter";

export default function Drawer() {
  return (
    <div
      id="drawer"
      className="h-full w-full bg-surface grid grid-rows-1 lg:grid-rows-12 p-2"
    >
      <div className="order-2 lg:order-1 hidden md:block relative ">
        <Image
          src={logo}
          alt="Lalouise Logo"
          className="absolute w-60 -left-8 -top-6"
        />
      </div>

      <div className="lg:row-span-10 order-1 lg:order-2 ">
        <DrawerNavList />
      </div>

      <div className="hidden lg:block order-last ">
        <DrawerFooter />
      </div>
    </div>
  );
}
