"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

export default function DashHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);
  const rawTitle = segments[segments.length - 1] || "Dashboard";

  const pageTitle =
    rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1).replace(/-/g, " ");

  return (
    <div className="w-full min-h-15 lg:h-20 top-0 items-center px-2 lg:px-12 shadow-2xs  gap-4 hidden lg:flex">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-gray-400 hover:text-primary transition-colors group cursor-pointer"
      >
        <ChevronLeftIcon className="w-5 stroke-2" />
      </button>

      <h2 className="text-primary font-bold text-lg tracking-tight">
        {pageTitle}
      </h2>
    </div>
  );
}
