"use client";

import { useEffect, useState } from "react";
import { useLabelMyStorages } from "@/features/label/hooks/use-label-my-storages";
import type { StorageType } from "@/shared/constants/storage-types";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

function getStorageLabel(storage: StorageType) {
  return storage.replaceAll("_", " ");
}

interface PrintLabelStorageDialogProps {
  selectedStorage: StorageType | null;
  onSelectStorage: (storage: StorageType) => void;
  storages?: StorageType[];
  isLoadingStorages?: boolean;
  isErrorStorages?: boolean;
  onRetryStorages?: () => void;
}

export default function PrintLabelStorageDialog({
  selectedStorage,
  onSelectStorage,
  storages: externalStorages,
  isLoadingStorages,
  isErrorStorages,
  onRetryStorages,
}: PrintLabelStorageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    storages: fetchedStorages,
    isLoading: isFetchingStorages,
    isError: hasStoragesError,
    refetch,
  } = useLabelMyStorages();

  const storages = externalStorages ?? fetchedStorages;
  const isLoading = isLoadingStorages ?? isFetchingStorages;
  const isError = isErrorStorages ?? hasStoragesError;
  const handleRetry =
    onRetryStorages ??
    (() => {
      void refetch();
    });

  useEffect(() => {
    if (storages.length === 1 && !selectedStorage) {
      onSelectStorage(storages[0]);
    }
  }, [storages, selectedStorage, onSelectStorage]);

  const isSingleOption = storages.length === 1;

  const handleSelect = (storage: StorageType) => {
    onSelectStorage(storage);
    setIsOpen(false);
  };

  return (
    <>
      <div className="space-y-3">
        {selectedStorage ? (
          <p className="rounded-md border bg-primary/5 px-3 py-2 text-sm text-foreground">
            Armazenamento selecionado: {getStorageLabel(selectedStorage)}
          </p>
        ) : (
          <p className="rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground">
            {isLoading
              ? "Carregando armazenamentos..."
              : "Nenhum armazenamento selecionado"}
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          className="w-fit"
          onClick={() => setIsOpen(true)}
          disabled={isLoading || isSingleOption}
        >
          {selectedStorage
            ? "Trocar armazenamento"
            : "Selecionar armazenamento"}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar armazenamento</DialogTitle>
            <DialogDescription>
              Selecione o tipo de armazenamento disponível no seu setor.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            {isError && (
              <div className="flex items-center justify-between gap-2 rounded-md border p-3">
                <p className="text-sm text-destructive">
                  Não foi possível carregar os armazenamentos do seu usuário.
                  Verifique se há um setor vinculado ao responsável e tente
                  novamente.
                </p>
                <Button type="button" variant="outline" onClick={handleRetry}>
                  Tentar novamente
                </Button>
              </div>
            )}

            {!isLoading && !isError && storages.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum armazenamento disponível para o seu setor.
              </p>
            )}

            {!isLoading &&
              !isError &&
              storages.map((storage) => (
                <button
                  key={storage}
                  type="button"
                  onClick={() => handleSelect(storage)}
                  className="w-full rounded-md border px-3 py-2 text-left transition-colors hover:bg-primary/5"
                >
                  <p className="text-sm font-medium text-foreground">
                    {getStorageLabel(storage)}
                  </p>
                </button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
