import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AppListPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AppListPagination({
  page,
  totalPages,
  onPageChange,
}: AppListPaginationProps) {
  return (
    <Pagination className="fixed bottom-0 w-full bg-card border-t py-2">
      <PaginationContent className="m-auto">
        <PaginationPrevious
          onClick={() => onPageChange(Math.max(0, page - 1))}
          aria-disabled={page === 0}
          className="[&_span]:hidden cursor-pointer"
        />

        <PaginationLink
          isActive={page === 0}
          onClick={() => onPageChange(0)}
          className="cursor-pointer"
        >
          1
        </PaginationLink>

        {page > 2 && <PaginationEllipsis />}

        {Array.from({ length: totalPages }, (_, i) => i)
          .filter((i) => i !== 0 && i !== totalPages - 1)
          .filter((i) => Math.abs(i - page) <= 1)
          .map((i) => (
            <PaginationLink
              key={i}
              isActive={i === page}
              onClick={() => onPageChange(i)}
              className="cursor-pointer"
            >
              {i + 1}
            </PaginationLink>
          ))}

        {page < totalPages - 3 && <PaginationEllipsis />}

        {totalPages > 1 && (
          <PaginationLink
            isActive={page === totalPages - 1}
            onClick={() => onPageChange(totalPages - 1)}
          >
            {totalPages}
          </PaginationLink>
        )}

        <PaginationNext
          onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
          aria-disabled={page + 1 === totalPages}
          className="[&_span]:hidden cursor-pointer "
        />
      </PaginationContent>
    </Pagination>
  );
}
