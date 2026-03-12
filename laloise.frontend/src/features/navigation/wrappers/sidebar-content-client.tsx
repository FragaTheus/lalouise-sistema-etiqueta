"use client";

import AppSidebarContent from "@/shared/components/app-sidebar/app-sidebar-content";
import { appSideBarGroupsLabelImpl } from "@/features/navigation/constants/app-side-bar-items-impl";

export default function AppSidebarContentClient() {
  return <AppSidebarContent groups={appSideBarGroupsLabelImpl} />;
}
