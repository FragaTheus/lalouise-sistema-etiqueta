"use client";

import AppFormPageLayoutRouterBack from "@/components/app-router-back";
import AppItemInfo from "@/components/app-item-info-layout/app-intem-info";
import {
  AppItemInfoProps,
  ItemInfoSection,
} from "@/components/app-item-info-layout/app-item-data";
import { Users } from "lucide-react";

const mockUserData = {
  id: "usr_123456",
  nickname: "João Silva",
  email: "joao.silva@example.com",
  role: "admin",
  status: "ativo",
  createdAt: "2025-03-01",
  lastLogin: "2026-03-08",
};

const userItemConfig: AppItemInfoProps = {
  icon: Users,
  title: mockUserData.nickname,
  subtitle: `ID: ${mockUserData.id}`,
  sections: [
    {
      fields: [
        {
          key: "email",
          label: "Email",
          value: mockUserData.email,
        },
        {
          key: "role",
          label: "Função",
          value: mockUserData.role,
          isBadge: true,
          badgeColor: "secondary",
        },
        {
          key: "status",
          label: "Status",
          value: mockUserData.status,
          isBadge: true,
          badgeColor: "primary",
        },
        {
          key: "lastLogin",
          label: "Último Acesso",
          value: mockUserData.lastLogin,
        },
      ],
    },
    {
      title: "Mais Informações",
      fields: [
        {
          key: "createdAt",
          label: "Data de Criação",
          value: mockUserData.createdAt,
        },
      ],
    },
  ],
};

export default function AccountInfo() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl flex flex-col gap-2">
        <AppFormPageLayoutRouterBack />
        <AppItemInfo {...userItemConfig} />
      </div>
    </div>
  );
}
