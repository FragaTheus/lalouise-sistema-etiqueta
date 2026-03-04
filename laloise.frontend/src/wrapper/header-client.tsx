"use client";

import AppHeader from "@/components/app-header";
import { useRouter } from "next/navigation";

export default function AppHeaderClient() {
  const hiddenRoutes = ["/contas"];

  return <AppHeader />;
}
