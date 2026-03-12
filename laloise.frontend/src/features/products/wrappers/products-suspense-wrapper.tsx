"use client";

import { Suspense } from "react";
import { ListLoadingSkeleton } from "@/shared/components/loading-skeleton";

interface ProductsSuspenseWrapperProps {
  children: React.ReactNode;
}

export default function ProductsSuspenseWrapper({
  children,
}: ProductsSuspenseWrapperProps) {
  return <Suspense fallback={<ListLoadingSkeleton />}>{children}</Suspense>;
}
