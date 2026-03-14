"use client";

import { LoaderIcon, RotateCcwIcon } from "lucide-react";
import useRestoreSector from "@/features/sectors/hooks/use-restore-sector";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

interface RestoreSectorDialogProps {
  sectorId: string;
  sectorName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RestoreSectorDialog({
  sectorId,
  sectorName,
  open,
  onOpenChange,
}: RestoreSectorDialogProps) {
  const mutation = useRestoreSector(sectorId);

  const handleConfirmRestore = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Restaurar setor</DialogTitle>
          <DialogDescription>
            Deseja restaurar o setor <strong>{sectorName}</strong>? Ele voltará a
            ficar disponível nas listagens ativas.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleConfirmRestore}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : (
              <RotateCcwIcon className="h-4 w-4" />
            )}
            {mutation.isPending ? "Restaurando..." : "Confirmar restauração"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}