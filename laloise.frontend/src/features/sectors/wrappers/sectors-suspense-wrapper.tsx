"use client";

import { Suspense } from "react";
import { ListLoadingSkeleton } from "@/shared/components/loading-skeleton";

interface SectorsSuspenseWrapperProps {
  children: React.ReactNode;
}

export default function SectorsSuspenseWrapper({
  children,
}: SectorsSuspenseWrapperProps) {
  return <Suspense fallback={<ListLoadingSkeleton />}>{children}</Suspense>;
}
