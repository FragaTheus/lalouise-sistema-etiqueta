"use client";

import { useState } from "react";
import { RotateCcwIcon } from "lucide-react";
import { SectorInfo } from "@/features/sectors/api/api.sectors.data";
import RestoreSectorDialog from "@/features/sectors/components/restore-sector-dialog";
import { Button } from "@/shared/components/ui/button";

interface SectorInactiveActionsProps {
  sector: SectorInfo;
}

export default function SectorInactiveActions({
  sector,
}: SectorInactiveActionsProps) {
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="text-primary"
        onClick={() => setIsRestoreDialogOpen(true)}
      >
        <RotateCcwIcon className="h-4 w-4" />
        Restaurar setor
      </Button>

      <RestoreSectorDialog
        sectorId={sector.id}
        sectorName={sector.name}
        open={isRestoreDialogOpen}
        onOpenChange={setIsRestoreDialogOpen}
      />
    </>
  );
}
