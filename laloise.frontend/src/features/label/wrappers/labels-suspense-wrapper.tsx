"use client";

import { Suspense } from "react";
import { ListLoadingSkeleton } from "@/shared/components/loading-skeleton";

interface LabelsSuspenseWrapperProps {
  children: React.ReactNode;
}

export default function LabelsSuspenseWrapper({
  children,
}: LabelsSuspenseWrapperProps) {
  return <Suspense fallback={<ListLoadingSkeleton />}>{children}</Suspense>;
}
