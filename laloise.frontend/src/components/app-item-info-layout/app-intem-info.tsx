"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import {
  AppItemInfoProps,
  ItemInfoField,
  ItemInfoSection,
} from "./app-item-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import AppForm from "@/components/app-form/app-form";
import { updateUserSchema } from "@/constants/schemas/updateProfileSchema";
import {
  updateUserBtnText,
  updateUserDefaultValues,
  updateUserFields,
} from "@/constants/form-fields/update-profile-form-field";

export default function AppItemInfo({
  icon: Icon,
  title,
  subtitle,
  sections,
  updateMutation,
  deleteMutation,
  restoreMutation,
  isProfile = false,
  isDeleted = false,
}: AppItemInfoProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const canUpdate = Boolean(updateMutation);
  const canDelete = !isProfile && Boolean(deleteMutation);
  const canRestore = Boolean(restoreMutation);

  const handleUpdateSuccess = () => {
    setIsEditDialogOpen(false);
  };

  const renderField = (field: ItemInfoField) => {
    if (field.isBadge) {
      const badgeColor = field.badgeColor || "primary";
      const colorClass =
        badgeColor === "primary"
          ? "bg-primary/10 text-primary"
          : "bg-secondary/10 text-secondary";

      return (
        <div key={field.key} className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-foreground/70">
            {field.label}
          </span>
          <span
            className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
          >
            {field.value}
          </span>
        </div>
      );
    }

    return (
      <div key={field.key} className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-foreground/70">
          {field.label}
        </span>
        <span className="text-base text-foreground">{field.value}</span>
      </div>
    );
  };

  const renderSection = (section: ItemInfoSection, index: number) => {
    return (
      <div key={index}>
        {section.title && (
          <FieldSeparator className="mb-6">{section.title}</FieldSeparator>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.fields.map(renderField)}
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">{title}</CardTitle>
              {subtitle && (
                <CardDescription className="text-sm">
                  {subtitle}
                </CardDescription>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              {isDeleted ? (
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setIsRestoreDialogOpen(true)}
                    disabled={!canRestore}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restaurar conta
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent align="end">
                  {canUpdate && (
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                      <Edit className="w-4 h-4" />
                      Editar dados
                    </DropdownMenuItem>
                  )}
                  {canDelete && (
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir conta
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="grid gap-6">
          {sections.map(renderSection)}
        </CardContent>
      </Card>

      {canUpdate && updateMutation && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-125">
            <DialogHeader>
              <DialogTitle>Editar Perfil</DialogTitle>
              <DialogDescription>
                Atualize suas informações de perfil. Deixe os campos em branco
                para não alterá-los.
              </DialogDescription>
            </DialogHeader>
            <AppForm
              schema={updateUserSchema}
              fields={updateUserFields}
              mutation={{
                ...updateMutation,
                mutate: (data) => {
                  updateMutation.mutate(data, {
                    onSuccess: handleUpdateSuccess,
                  });
                },
              }}
              defaultValues={updateUserDefaultValues}
              btnText={updateUserBtnText}
            />
          </DialogContent>
        </Dialog>
      )}

      {canDelete && deleteMutation && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Excluir Conta</DialogTitle>
              <DialogDescription>
                Deseja realmente excluir a conta em questão? Esta ação é
                irreversível e removerá os dados deste usuário.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteMutation.mutate(undefined, {
                    onSuccess: () => setIsDeleteDialogOpen(false),
                  });
                }}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Excluindo..." : "Excluir Conta"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isDeleted && (
        <Dialog
          open={isRestoreDialogOpen}
          onOpenChange={setIsRestoreDialogOpen}
        >
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Restaurar Conta</DialogTitle>
              <DialogDescription>
                Deseja realmente restaurar esta conta? O usuário voltará para a
                lista de contas ativas.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsRestoreDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  restoreMutation?.mutate(undefined, {
                    onSuccess: () => setIsRestoreDialogOpen(false),
                  });
                }}
                disabled={!canRestore || restoreMutation?.isPending}
              >
                {restoreMutation?.isPending
                  ? "Restaurando..."
                  : "Restaurar Conta"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
