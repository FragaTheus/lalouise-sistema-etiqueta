"use client";

import { Suspense } from "react";
import { ListLoadingSkeleton } from "@/shared/components/loading-skeleton";

interface AccountsSuspenseWrapperProps {
  children: React.ReactNode;
}

export default function AccountsSuspenseWrapper({
  children,
}: AccountsSuspenseWrapperProps) {
  return <Suspense fallback={<ListLoadingSkeleton />}>{children}</Suspense>;
}
