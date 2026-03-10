"use client";

import { Suspense } from "react";
import { ListLoadingSkeleton } from "@/components/loading-skeleton";

interface ProductsClientWrapperProps {
  children: React.ReactNode;
}

export function ProductsClientWrapper({
  children,
}: ProductsClientWrapperProps) {
  return <Suspense fallback={<ListLoadingSkeleton />}>{children}</Suspense>;
}
