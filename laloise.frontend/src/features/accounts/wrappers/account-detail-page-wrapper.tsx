"use client";

import AppFormPageLayoutRouterBack from "@/shared/components/app-router-back";
import AppItemInfo from "@/shared/components/app-item-info-layout/app-intem-info";
import { AppItemInfoProps } from "@/shared/components/app-item-info-layout/app-item-data";
import { DataError } from "@/shared/components/data-error";
import { ItemInfoLoadingSkeleton } from "@/shared/components/loading-skeleton";
import { useUsersProfile } from "@/features/accounts/hooks/use-users-profile";
import useUsersUpdate from "@/features/accounts/hooks/use-users-update";
import useUsersDelete from "@/features/accounts/hooks/use-users-delete";
import { updateUserSchema } from "@/features/profile/constants/schemas/updateProfileSchema";
import {
  updateUserFields,
  updateUserDefaultValues,
  updateUserBtnText,
} from "@/features/profile/constants/form-fields/update-profile-form-field";
import { Users } from "lucide-react";
import { useParams } from "next/navigation";

function formatBackendDateTime(value?: string | null) {
  if (!value) {
    return "Nunca";
  }

  const localDateTimeMatch = value.match(
    /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?/,
  );

  if (localDateTimeMatch) {
    const [, year, month, day, hour, minute, second] = localDateTimeMatch;
    const parsedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second || 0),
    );

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleString("pt-BR");
    }
  }

  const fallbackDate = new Date(value);
  if (!Number.isNaN(fallbackDate.getTime())) {
    return fallbackDate.toLocaleString("pt-BR");
  }

  return value;
}

export default function AccountDetailPageWrapper() {
  const params = useParams();
  const userIdParam = params?.id;
  const userId = Array.isArray(userIdParam) ? userIdParam[0] : userIdParam;

  const { data, isLoading, error, refetch } = useUsersProfile(userId);
  const updateUserMutation = useUsersUpdate(userId);
  const deleteUserMutation = useUsersDelete(userId);

  if (!userId) {
    return (
      <DataError error={new Error("ID do usuário não encontrado na URL")} />
    );
  }

  if (isLoading) {
    return <ItemInfoLoadingSkeleton />;
  }

  if (error) {
    return <DataError error={error} onRetry={() => refetch()} />;
  }

  if (!data) {
    return <DataError error={null} onRetry={() => refetch()} />;
  }

  const userItemConfig: AppItemInfoProps = {
    icon: Users,
    title: data.nickname,
    subtitle: `ID: ${data.id}`,
    isProfile: false,
    updateMutation: updateUserMutation,
    deleteMutation: deleteUserMutation,
    editConfig: {
      title: "Editar Perfil",
      description:
        "Atualize as informações de perfil. Deixe os campos em branco para não alterá-los.",
      schema: updateUserSchema,
      fields: updateUserFields,
      defaultValues: updateUserDefaultValues,
      btnText: updateUserBtnText,
    },
    sections: [
      {
        fields: [
          {
            key: "email",
            label: "Email",
            value: data.email,
          },
          {
            key: "role",
            label: "Função",
            value: data.role,
            isBadge: true,
            badgeColor: "secondary",
          },
          {
            key: "lastLoginAt",
            label: "Último Acesso",
            value: formatBackendDateTime(data.lastLoginAt),
          },
        ],
      },
      {
        title: "Mais Informações",
        fields: [
          {
            key: "createdAt",
            label: "Data de Criação",
            value: formatBackendDateTime(data.createdAt),
          },
          {
            key: "updatedAt",
            label: "Última Atualização",
            value: formatBackendDateTime(data.updatedAt),
          },
        ],
      },
    ],
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl flex flex-col gap-2">
        <AppFormPageLayoutRouterBack />
        <AppItemInfo {...userItemConfig} />
      </div>
    </div>
  );
}
