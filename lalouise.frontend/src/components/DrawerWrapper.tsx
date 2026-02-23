"use client";

import { usePathname } from "next/navigation";
import Drawer from "./Drawer";

export default function DrawerWrapper() {
  const pathname = usePathname();
  return <Drawer pathname={pathname} />;
}
