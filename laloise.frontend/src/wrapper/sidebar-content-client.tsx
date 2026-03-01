"use client";

import AppSidebarContent from "@/components/app-sidebar/app-sidebar-content";
import { appSideBarGroupsLabelImpl } from "@/constants/app-side-bar-items-impl";

export default function AppSidebarContentClient() {
  return <AppSidebarContent groups={appSideBarGroupsLabelImpl} />;
}
