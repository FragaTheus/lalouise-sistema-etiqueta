"use client";

import { Suspense } from "react";
import { ListLoadingSkeleton } from "@/shared/components/loading-skeleton";

interface AccountsClientWrapperProps {
  children: React.ReactNode;
}

export function AccountsClientWrapper({
  children,
}: AccountsClientWrapperProps) {
  return <Suspense fallback={<ListLoadingSkeleton />}>{children}</Suspense>;
}
