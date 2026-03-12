"use client";

import { ChevronDown } from "lucide-react";
import { CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { AppSideBarGroupItems } from "./app-sidebar-types";
import { motion } from "framer-motion";

export default function AppSidebarGroups({
  TriggerIcon,
  triggerText,
  items,
}: AppSideBarGroupItems) {
  const { open, setOpenMobile, setOpen } = useSidebar();
  const setClose = () => {
    setOpenMobile(false);
    setOpen(false);
  };
  return (
    <>
      <CollapsibleTrigger
        asChild
        className="w-full data-[state=open]:bg-secondary/8 data-[state=open]:hover:bg-secondary/15 hover:bg-secondary/8 group/collapsible transition-all duration-200 rounded-lg"
      >
        <SidebarMenuButton size={"sm"} className="bg-transparent">
          <TriggerIcon className="text-secondary" />
          <span className="font-semibold text-foreground">{triggerText}</span>
          <ChevronDown className="ml-auto group-data-[state=open]/collapsible:rotate-180 transition-transform duration-300 text-secondary" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={`${open && "border-l-2 border-secondary/30 ml-4 pl-2 mt-2"} transition-all mt-1 space-y-1`}
      >
        {items.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * i, ease: "easeOut" }}
          >
            <Link href={c.itemHref} onClick={() => setClose()}>
              <SidebarMenuButton
                size={"sm"}
                className="bg-transparent hover:bg-primary/8 active:bg-primary/15 transition-all duration-200 rounded-lg"
              >
                <c.ItemIcon className="text-primary" />
                <span className="text-foreground/90">{c.itemText}</span>
              </SidebarMenuButton>
            </Link>
          </motion.div>
        ))}
      </CollapsibleContent>
    </>
  );
}
