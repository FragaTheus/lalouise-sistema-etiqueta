"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function AppRouterBack() {
  const router = useRouter();
  return (
    <div className="max-w-min max-h-min h-auto">
      <Button
        onClick={router.back}
        className="text-destructive bg-destructive/5 hover:bg-destructive/10 active:bg-destructive/20 cursor-pointer "
      >
        <ChevronLeft />
        <span>Voltar</span>
      </Button>
    </div>
  );
}
