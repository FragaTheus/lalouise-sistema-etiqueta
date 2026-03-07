"use client";

import { getUsers, UserSummary } from "@/api/api.accounts";
import AppListPageLayout from "@/components/layouts/list-page-layout/app-list-page-layout";
import { UserIcon } from "lucide-react";
import { Suspense } from "react";

export default function AccountListClient() {
  return (
    <Suspense>
      <AppListPageLayout<UserSummary>
        Icon={UserIcon}
        apiCall={getUsers}
        getHref={(user) => `/painel/contas/${user.id}`}
        renderItem={(user) => (
          <>
            <span className="truncate">{user.nickname}</span>
            <span className="truncate">{user.email}</span>
            <span className="truncate">
              {user.isActive ? "Ativo" : "Inativo"}
            </span>
          </>
        )}
      />
    </Suspense>
  );
}
