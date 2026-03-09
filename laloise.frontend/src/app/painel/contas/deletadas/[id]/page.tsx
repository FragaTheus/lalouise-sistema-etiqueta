"use client";

import AppFormPageLayoutRouterBack from "@/components/app-router-back";
import AppItemInfo from "@/components/app-item-info-layout/app-intem-info";
import { AppItemInfoProps } from "@/components/app-item-info-layout/app-item-data";
import { DataError } from "@/components/data-error";
import { ItemInfoLoadingSkeleton } from "@/components/loading-skeleton";
import { useUsersProfile } from "@/hooks/accounts-hooks/use-users-profile";
import useUsersRestore from "@/hooks/accounts-hooks/use-users-restore";
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

export default function DeletedAccountInfo() {
  const params = useParams();
  const userIdParam = params?.id;
  const userId = Array.isArray(userIdParam) ? userIdParam[0] : userIdParam;

  const { data, isLoading, error, refetch } = useUsersProfile(userId);
  const restoreUserMutation = useUsersRestore(userId);

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
    isDeleted: true,
    restoreMutation: restoreUserMutation,
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
            key: "status",
            label: "Status",
            value: data.status ? "Ativo" : "Deletado",
            isBadge: true,
            badgeColor: data.status ? "primary" : "secondary",
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
