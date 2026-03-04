"use client";

import { CardTitle } from "./ui/card";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { PencilIcon } from "lucide-react";
import AppProfileEditDialog from "./app-dialog-profile-edit";
import { Button } from "./ui/button";
import { Field, FieldContent, FieldError, FieldLabel } from "./ui/field";
import { useEffect, useState } from "react";
import { getMe, PerfilInfo } from "@/api/api.perfil";
import { Skeleton } from "./ui/skeleton";
import { extractErrorMessage } from "@/api/api.error";
import { toast } from "sonner";

type AccountInfoFields = {
  label: string;
  content: string | boolean;
};

export default function AppPerfilInfo() {
  const [perfil, setPerfil] = useState<PerfilInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const data = await getMe();
        console.log(data);
        setPerfil(data);
      } catch (error) {
        toast.error(extractErrorMessage(error));
        setApiError(extractErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    fetchPerfil();
  }, []);

  const fields: AccountInfoFields[] = [
    { label: "Como te chamamos", content: perfil?.nickname ?? "" },
    { label: "Seu e-mail", content: perfil?.email ?? "" },
    { label: "Nível de acesso", content: perfil?.role ?? "" },
    {
      label: "Conosco desde",
      content: perfil?.createdAt
        ? new Date(perfil.createdAt).toLocaleString("pt-BR")
        : "",
    },
  ];

  return (
    <>
      <div className="w-full mb-4 flex items-center justify-between border-b py-2">
        <CardTitle>Suas informações</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"ghost"}
              className="text-secondary hover:text-secondary active:text-secondary hover:bg-secondary/5 active:bg-secondary/10 cursor-pointer"
            >
              <PencilIcon />
              <span>Atualizar</span>
            </Button>
          </DialogTrigger>
          <AppProfileEditDialog />
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Field key={index}>
              <Skeleton className="bg-muted w-full h-4 mb-1" />
              <Skeleton className="bg-muted w-full h-5" />
            </Field>
          ))
        ) : apiError ? (
          <p className="text-destructive col-span-2 font-semibold">
            Não conseguimos carregar seus dados. Tente novamente mais tarde.
          </p>
        ) : (
          fields.map((field, index) => (
            <Field key={index}>
              <FieldLabel>{field.label}</FieldLabel>
              <FieldContent>{field.content}</FieldContent>
            </Field>
          ))
        )}
      </div>
    </>
  );
}
