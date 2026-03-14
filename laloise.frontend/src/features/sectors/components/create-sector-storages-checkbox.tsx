"use client";

import { useState } from "react";
import {
  StorageType,
  storageTypeValues,
} from "@/features/sectors/api/api.sectors.data";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

interface CreateSectorStoragesCheckboxProps {
  selectedStorages: StorageType[];
  onChange: (storages: StorageType[]) => void;
  onBlur: () => void;
}

function getStorageLabel(storage: StorageType) {
  return storage.replaceAll("_", " ");
}

const storageOptions = storageTypeValues.map((storageType) => ({
  label: getStorageLabel(storageType),
  value: storageType,
}));

export default function CreateSectorStoragesCheckbox({
  selectedStorages,
  onChange,
  onBlur,
}: CreateSectorStoragesCheckboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleStorage = (storage: StorageType, checked: boolean) => {
    if (checked) {
      onChange([...selectedStorages, storage]);
      return;
    }

    onChange(
      selectedStorages.filter((selectedStorage) => selectedStorage !== storage),
    );
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      onBlur();
    }
  };

  return (
    <>
      <div className="space-y-3">
        {selectedStorages.length > 0 ? (
          <div className="flex flex-wrap gap-2 rounded-md border bg-primary/5 px-3 py-2">
            {selectedStorages.map((storage) => (
              <span
                key={storage}
                className="rounded-full border border-primary/20 bg-background px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {getStorageLabel(storage)}
              </span>
            ))}
          </div>
        ) : (
          <p className="rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground">
            Nenhum tipo de armazenamento selecionado
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          className="w-fit"
          onClick={() => setIsOpen(true)}
        >
          {selectedStorages.length > 0
            ? "Editar armazenamentos"
            : "Adicionar armazenamentos"}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar armazenamentos</DialogTitle>
            <DialogDescription>
              Marque um ou mais tipos de armazenamento para o setor.
            </DialogDescription>
          </DialogHeader>

          <div data-slot="checkbox-group" className="grid gap-2">
            {storageOptions.map((option) => {
              const isChecked = selectedStorages.includes(option.value);

              return (
                <label
                  key={option.value}
                  className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm has-checked:border-primary has-checked:bg-primary/5"
                >
                  <input
                    type="checkbox"
                    className="size-4 accent-primary"
                    checked={isChecked}
                    onBlur={onBlur}
                    onChange={(event) => {
                      handleToggleStorage(option.value, event.target.checked);
                    }}
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
