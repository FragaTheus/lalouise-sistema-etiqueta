"use client";

import { LoaderIcon, Trash2Icon } from "lucide-react";
import useDeleteSector from "@/features/sectors/hooks/use-delete-sector";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

interface DeleteSectorDialogProps {
  sectorId: string;
  sectorName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteSectorDialog({
  sectorId,
  sectorName,
  open,
  onOpenChange,
}: DeleteSectorDialogProps) {
  const mutation = useDeleteSector(sectorId);

  const handleConfirmDelete = () => {
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
          <DialogTitle>Excluir setor</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o setor <strong>{sectorName}</strong>
            ? Essa ação poderá ser desfeita pela tela de setores deletados.
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
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2Icon className="h-4 w-4" />
            )}
            {mutation.isPending ? "Excluindo..." : "Confirmar exclusão"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
