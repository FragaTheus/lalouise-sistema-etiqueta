"use client";

import { getDeletedUsers } from "@/api/api-accounts/api.accounts";
import { UserSummary, PageResponse } from "@/api/api-accounts/api.accounts.data";
import { useQuery } from "@tanstack/react-query";

interface UseUsersDeletedAccountsParams {
  page?: number;
  size?: number;
  search?: string | null;
}

export function useUsersDeletedAccounts({
  page = 0,
  size = 20,
  search,
}: UseUsersDeletedAccountsParams = {}) {
  return useQuery<PageResponse<UserSummary>>({
    queryKey: ["users-deleted", page, size, search],
    queryFn: () => getDeletedUsers({ page, size, search }),
    staleTime: 1000 * 60 * 5,
  });
}
