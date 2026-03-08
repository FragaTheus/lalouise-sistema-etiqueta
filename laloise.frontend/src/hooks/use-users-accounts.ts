import { useQuery } from "@tanstack/react-query";
import { getUsers, UserSummary, PageResponse } from "@/api/api.accounts";

interface UseUsersAccountsParams {
  page?: number;
  size?: number;
  search?: string | null;
  role?: string | null;
}

export function useUsersAccounts({
  page = 0,
  size = 20,
  search,
  role,
}: UseUsersAccountsParams = {}) {
  return useQuery<PageResponse<UserSummary>>({
    queryKey: ["users", page, size, search, role],
    queryFn: () => getUsers({ page, size, search, role }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
