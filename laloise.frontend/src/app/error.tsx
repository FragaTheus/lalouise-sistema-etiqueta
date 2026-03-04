"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">500</h1>
      <h2 className="text-xl font-medium">Algo deu errado</h2>
      <p className="text-muted-foreground text-sm">
        Tivemos um problema interno. Tente novamente em instantes.
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  );
}
