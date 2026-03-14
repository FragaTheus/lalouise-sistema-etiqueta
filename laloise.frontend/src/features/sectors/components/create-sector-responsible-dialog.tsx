"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { UserSummary } from "@/features/accounts/api/api.accounts.data";
import { useUsersAccounts } from "@/features/accounts/hooks/use-users-accounts";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";

interface CreateSectorResponsibleDialogProps {
  selectedResponsible: UserSummary | null;
  onSelectResponsible: (user: UserSummary) => void;
}

export default function CreateSectorResponsibleDialog({
  selectedResponsible,
  onSelectResponsible,
}: CreateSectorResponsibleDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(searchValue.trim());
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue]);

  const { data, isLoading, isError, refetch } = useUsersAccounts({
    page: 0,
    size: 20,
    search: debouncedSearch || null,
  });

  const users = useMemo(() => data?.content ?? [], [data]);

  const handleSelectResponsible = (user: UserSummary) => {
    onSelectResponsible(user);
    setIsOpen(false);
  };

  return (
    <>
      <div className="space-y-3">
        {selectedResponsible ? (
          <p className="rounded-md border bg-primary/5 px-3 py-2 text-sm text-foreground">
            Responsável selecionado: {selectedResponsible.nickname}
          </p>
        ) : (
          <p className="rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground">
            Nenhum responsável selecionado
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          className="w-fit"
          onClick={() => setIsOpen(true)}
        >
          {selectedResponsible ? "Trocar responsável" : "Adicionar responsável"}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Selecionar responsável</DialogTitle>
            <DialogDescription>
              Busque por nome ou email e selecione um usuário responsável.
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <SearchIcon className="text-primary absolute left-2 top-1/2 size-4 -translate-y-1/2" />
            <Input
              placeholder="Buscar por nome ou email"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="pl-8"
            />
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2">
            {isLoading && (
              <p className="text-sm text-muted-foreground">
                Buscando usuários...
              </p>
            )}

            {isError && (
              <div className="flex items-center justify-between gap-2 rounded-md border p-3">
                <p className="text-sm text-destructive">
                  Erro ao carregar usuários.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => refetch()}
                >
                  Tentar novamente
                </Button>
              </div>
            )}

            {!isLoading && !isError && users.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum usuário encontrado para o termo pesquisado.
              </p>
            )}

            {!isLoading &&
              !isError &&
              users.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleSelectResponsible(user)}
                  className="w-full rounded-md border px-3 py-2 text-left transition-colors hover:bg-primary/5"
                >
                  <p className="text-sm font-medium text-foreground">
                    {user.nickname}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
