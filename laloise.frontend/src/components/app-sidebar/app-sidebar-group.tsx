"use client";

import { ChevronDown } from "lucide-react";
import { CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { AppSideBarGroupItems } from "./app-sidebar-types";

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
        className="w-full data-[state=open]:bg-secondary/5 data-[state=open]:hover:bg-secondary/10 data-[state=open]:hover:text-inherit hover:bg-secondary/5 group/collapsible"
      >
        <SidebarMenuButton size={"sm"} className="bg-transparent">
          <TriggerIcon className="text-secondary" />
          <span className="font-semibold">{triggerText}</span>
          <ChevronDown className="ml-auto group-data-[state=open]/collapsible:rotate-180 text-secondary" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={`${open && "border-l border-muted-foreground/50 ml-3.5 px-2 mt-2"} transition-all mt-1`}
      >
        {items.map((c, i) => (
          <Link href={c.itemHref} key={i} onClick={() => setClose()}>
            <SidebarMenuButton
              size={"sm"}
              className="bg-transparent group/menubutton hover:bg-primary/5 active:bg-primary/10 w-3/4"
            >
              <c.ItemIcon className="text-primary" />
              <span>{c.itemText}</span>
            </SidebarMenuButton>
          </Link>
        ))}
      </CollapsibleContent>
    </>
  );
}
