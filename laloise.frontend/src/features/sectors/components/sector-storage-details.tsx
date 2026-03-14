"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useSectorStorages } from "@/features/sectors/hooks/use-sector-storages";
import { ItemInfoLoadingSkeleton } from "@/shared/components/loading-skeleton";
import { DataError } from "@/shared/components/data-error";

interface SectorStorageDetailsProps {
  responsibleId?: string;
}

function formatStorageLabel(storage: string) {
  return storage.replaceAll("_", " ");
}

export default function SectorStorageDetails({
  responsibleId,
}: SectorStorageDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useSectorStorages({ enabled: isOpen });

  return (
    <div className="flex flex-col gap-2">
      <span className="text-base text-foreground">
        {responsibleId || "Não informado"}
      </span>

      <Button
        type="button"
        variant="outline"
        className="w-fit"
        onClick={() => setIsOpen(true)}
      >
        Ver storages
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Tipos de armazenamento</DialogTitle>
            <DialogDescription>
              Lista de tipos de armazenamento disponíveis para setores.
            </DialogDescription>
          </DialogHeader>

          {isLoading && <ItemInfoLoadingSkeleton />}

          {isError && (
            <DataError error={new Error("Erro ao carregar storages")} />
          )}

          {!isLoading && !isError && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {(data || []).map((storage) => (
                <div
                  key={storage}
                  className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {formatStorageLabel(storage)}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
