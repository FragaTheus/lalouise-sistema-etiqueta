import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AppListPageLayoutHeader from "./app-list-page-layout-header";

export default function AppListPageLayout() {
  return (
    <>
      <AppListPageLayoutHeader />
      <div className="flex-1 pt-44 lg:pt-27 flex flex-col overflow-hidden max-h-svh">
        <Table className="bg-card m-auto rounded-sm">
          <TableHeader className="sticky top-0 w-full max-w-7xl z-50 bg-card border-b shadow-xs pb-1">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-x-auto overflow-y-hidden z-10">
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>Matheus</TableCell>
                <TableCell>email@email.com</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="sticky bg-card border-t">
          <PaginationContent>
            <PaginationPrevious href="#" />
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
            <PaginationLink href="#">2</PaginationLink>
            <PaginationLink href="#">3</PaginationLink>
            <PaginationEllipsis />

            <PaginationNext href="#" />
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

const rows = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];
