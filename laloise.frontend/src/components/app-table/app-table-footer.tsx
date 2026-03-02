import { CardFooter } from "../ui/card";
import {
  Pagination,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export default function AppTableFooter() {
  return (
    <CardFooter>
      <Pagination>
        <PaginationPrevious href="#" />
        <PaginationLink href="#">1</PaginationLink>
        <PaginationLink href="#">2</PaginationLink>
        <PaginationLink href="#">3</PaginationLink>
        <PaginationEllipsis />
        <PaginationNext href="#" />
      </Pagination>
    </CardFooter>
  );
}
