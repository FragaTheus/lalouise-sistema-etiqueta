"use client";

import { usePathname } from "next/navigation";

export const useIsActive = (href: string) => {
  const pathname = usePathname();
  return pathname === href;
};
