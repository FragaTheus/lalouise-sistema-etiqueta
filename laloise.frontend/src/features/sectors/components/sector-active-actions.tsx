"use client";

import { useState } from "react";
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { SectorInfo } from "@/features/sectors/api/api.sectors.data";
import DeleteSectorDialog from "@/features/sectors/components/delete-sector-dialog";
import UpdateSectorDialog from "@/features/sectors/components/update-sector-dialog";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface SectorActiveActionsProps {
  sector: SectorInfo;
}

export default function SectorActiveActions({
  sector,
}: SectorActiveActionsProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="bg-transparent hover:bg-primary/5 active:bg-primary/10 text-primary hover:text-primary active:text-primary"
          >
            <EllipsisVerticalIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Ações</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
            <PencilIcon className="h-4 w-4" />
            Editar setor
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2Icon className="h-4 w-4" />
            Excluir setor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateSectorDialog
        sector={sector}
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
      />

      <DeleteSectorDialog
        sectorId={sector.id}
        sectorName={sector.name}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
