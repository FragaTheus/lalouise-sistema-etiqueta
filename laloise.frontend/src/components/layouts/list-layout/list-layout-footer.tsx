"use client";

import { CardFooter } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useListPagination } from "@/hooks/use-list-pagination";
import { ListLayoutFooterProps } from "./list-layout-data";

const paginationButtonClass =
  "hover:bg-primary/5 hover:text-primary active:bg-primary/10 active:text-primary";

export default function ListLayoutFooter({
  totalItems,
}: ListLayoutFooterProps) {
  const { page, pageSize, goToPage, nextPage, prevPage } = useListPagination();

  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  return (
    <CardFooter className="flex items-center justify-center">
      <Pagination>
        <PaginationContent className="m-0">
          <PaginationPrevious
            onClick={prevPage}
            className={`[&>span]:hidden ${paginationButtonClass} ${page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
          />

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
            )
            .reduce<(number | "ellipsis")[]>((acc, p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("ellipsis");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "ellipsis" ? (
                <PaginationEllipsis key={`ellipsis-${i}`} />
              ) : (
                <PaginationLink
                  key={p}
                  isActive={page === p}
                  onClick={() => goToPage(p)}
                  className={`cursor-pointer ${paginationButtonClass}`}
                >
                  {p}
                </PaginationLink>
              ),
            )}

          <PaginationNext
            onClick={nextPage}
            className={`[&>span]:hidden ${paginationButtonClass} ${page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
          />
        </PaginationContent>
      </Pagination>
    </CardFooter>
  );
}
