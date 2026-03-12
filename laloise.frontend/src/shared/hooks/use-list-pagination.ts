"use client"

import { parseAsInteger, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";

const DESKTOP_PAGE_SIZE = 10;
const MOBILE_PAGE_SIZE = 5;
const MOBILE_BREAKPOINT = 768;

export function useListPagination() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pageSize = isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
  });

  const nextPage = () => setParams({ page: params.page + 1 });
  const prevPage = () => setParams({ page: Math.max(1, params.page - 1) });
  const goToPage = (page: number) => setParams({ page });

  return {
    page: params.page,
    pageSize,
    nextPage,
    prevPage,
    goToPage,
    offset: (params.page - 1) * pageSize,
  };
}