import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useListPagination } from "./use-list-pagination";
import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

interface UseListTableConfig<T> {
  data: T[];
  columns: ColumnDef<T>[];
  totalItems: number;
}

export function useListTable<T>({
  data,
  columns,
  totalItems,
}: UseListTableConfig<T>) {
  const { page, pageSize, goToPage } = useListPagination();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const columnVisibility: VisibilityState = isMobile
    ? Object.fromEntries(
        columns
          .filter((col) => (col.meta as any)?.hideOnMobile)
          .map((col) => [col.id ?? (col as any).accessorKey, false])
      )
    : {};

  const totalPages = Math.ceil(totalItems / pageSize);

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    state: {
      pagination: { pageIndex: page - 1, pageSize },
      columnVisibility,
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex: page - 1, pageSize });
        goToPage(newState.pageIndex + 1);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return { table, totalPages, pageSize };
}