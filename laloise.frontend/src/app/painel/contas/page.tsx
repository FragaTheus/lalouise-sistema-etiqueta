import AppDashboardLayout from "@/components/app-dashboard-layout";
import AppTableContent from "@/components/app-table/app-table-content";
import AppTableHeader from "@/components/app-table/app-table-header";
import { Card, CardFooter } from "@/components/ui/card";
import {
  Pagination,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Accounts() {
  return (
    <AppDashboardLayout>
      <Card className="w-full max-w-sm max-h-138 lg:max-w-5xl">
        <AppTableHeader />
        <AppTableContent />
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
      </Card>
    </AppDashboardLayout>
  );
}
