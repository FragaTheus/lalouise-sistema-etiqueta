"use client";

import AppFormPageLayoutRouterBack from "@/shared/components/app-router-back";
import AppItemInfo from "@/shared/components/app-item-info-layout/app-intem-info";
import { AppItemInfoProps } from "@/shared/components/app-item-info-layout/app-item-data";
import { DataError } from "@/shared/components/data-error";
import { ItemInfoLoadingSkeleton } from "@/shared/components/loading-skeleton";
import useProfile from "@/features/profile/hooks/use-profile";
import useUpdateAccount from "@/features/profile/hooks/use-update-account";
import { Users } from "lucide-react";

export default function ProfilePageWrapper() {
  const { data: profileData, isLoading, error, refetch } = useProfile();
  const updateAccountMutation = useUpdateAccount();

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
    isProfile: true,
    updateMutation: updateAccountMutation,
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
