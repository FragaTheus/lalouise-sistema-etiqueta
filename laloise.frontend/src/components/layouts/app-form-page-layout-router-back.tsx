"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function AppFormPageLayoutRouterBack() {
  const router = useRouter();
  return (
    <div className="w-full max-h-min h-auto py-2 bg-transparent flex items-center justify-start lg:max-w-7xl mt-15">
      <Button
        onClick={router.back}
        className="text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 cursor-pointer"
      >
        <ChevronLeft />
        <span>Voltar</span>
      </Button>
    </div>
  );
}
