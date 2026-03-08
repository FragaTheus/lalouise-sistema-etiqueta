"use client";

import AppFormPageLayoutRouterBack from "@/components/app-router-back";
import AppItemInfo from "@/components/app-item-info-layout/app-intem-info";
import { AppItemInfoProps } from "@/components/app-item-info-layout/app-item-data";
import { DataError } from "@/components/data-error";
import { ItemInfoLoadingSkeleton } from "@/components/loading-skeleton";
import useProfile from "@/hooks/use-profile";
import { Users } from "lucide-react";

export default function AccountPerfil() {
  const { data: profileData, isLoading, error, refetch } = useProfile();

  if (isLoading) {
    return <ItemInfoLoadingSkeleton />;
  }

  if (error) {
    return <DataError error={error} onRetry={() => refetch()} />;
  }

  if (!profileData) {
    return <DataError error={null} onRetry={() => refetch()} />;
  }

  const userItemConfig: AppItemInfoProps = {
    icon: Users,
    title: profileData.nickname,
    subtitle: profileData.email,
    sections: [
      {
        fields: [
          {
            key: "email",
            label: "Email",
            value: profileData.email,
          },
          {
            key: "role",
            label: "Função",
            value: profileData.role,
            isBadge: true,
            badgeColor: "secondary",
          },
          {
            key: "createdAt",
            label: "Data de Criação",
            value: new Date(profileData.createdAt).toLocaleDateString("pt-BR"),
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
