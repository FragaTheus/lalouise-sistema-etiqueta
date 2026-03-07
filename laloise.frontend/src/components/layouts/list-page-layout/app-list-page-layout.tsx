"use client";

import { useEffect, useRef, useState } from "react";
import AppListPageLayoutHeader from "./app-list-page-layout-header";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { PageResponse } from "@/api/api.accounts";
import AppListPagination from "./app-list-layout-pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppErrorComponent from "@/components/error";
import AppListLoadingCard from "./loading-card";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";

const usePageSize = () => {
  const getSize = () => {
    if (typeof window === "undefined") return 10;
    if (window.innerWidth >= 1024) return 20;
    if (window.innerWidth >= 768) return 15;
    return 10;
  };

  const [size, setSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => setSize(getSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

interface AppListPageLayoutProps<T> {
  Icon: React.ElementType;
  apiCall: (params: {
    page: number;
    size: number;
    search?: string | null;
    role?: string | null;
  }) => Promise<PageResponse<T>>;
  renderItem: (item: T) => React.ReactNode;
  getHref: (item: T) => string;
}

export default function AppListPageLayout<T>({
  Icon,
  apiCall,
  renderItem,
  getHref,
}: AppListPageLayoutProps<T>) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<PageResponse<T> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [search] = useQueryState("search");
  const [role] = useQueryState("role");
  const [debouncedSearch] = useDebounce(search, 400);

  const size = usePageSize();

  const apiCallRef = useRef(apiCall);

  useEffect(() => {
    apiCallRef.current = apiCall;
  }, [apiCall]);

  useEffect(() => {
    setError(null);
    setLoading(true);
    apiCallRef
      .current({ page, size, search: debouncedSearch, role })
      .then(setData)
      .catch(() => setError("Erro ao carregar dados."))
      .finally(() => setLoading(false));
  }, [page, size, debouncedSearch, role]);

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className="pt-16 lg:pt-0">
      <AppListPageLayoutHeader />

      <div className="mt-30 flex-1 flex flex-col max-w-screen mb-25 px-4 gap-2">
        {loading ? (
          Array.from({ length: size }).map((_, i) => (
            <AppListLoadingCard key={i} />
          ))
        ) : error ? (
          <AppErrorComponent error={error} />
        ) : data?.content.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Icon className="size-10 mb-2" />
            <span>Nenhum item encontrado.</span>
          </div>
        ) : (
          data?.content.map((item, index) => (
            <Card key={index}>
              <CardContent className="flex justify-between items-center ">
                <div className="flex items-center gap-1 lg:gap-4 w-full">
                  <Icon className="size-10 text-primary" />
                  <div className="flex flex-1 flex-col overflow-hidden lg:flex-row justify-evenly max-w-1/2 lg:max-w-full">
                    {renderItem(item)}
                  </div>
                </div>
                <Link href={getHref(item)}>
                  <Button className="bg-muted cursor-pointer hover:bg-primary/10 active:bg-primary/20">
                    <MoreHorizontal className="text-primary" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <AppListPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
