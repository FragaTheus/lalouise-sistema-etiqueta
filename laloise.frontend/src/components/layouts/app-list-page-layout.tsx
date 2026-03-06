"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

import AppListPageLayoutHeader from "./app-list-page-layout-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardAction, CardContent, CardHeader } from "../ui/card";
import { MoreHorizontal, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const ITEMS_PER_PAGE = 10;

export default function AppListPageLayout() {
  const [page, setPage] = useState(1);

  const paginated = rows.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="pt-16 lg:pt-0">
      <AppListPageLayoutHeader />
      <div className="mt-30 flex-1 flex flex-col max-w-screen mb-25 px-4 gap-2">
        {paginated.map((page) => (
          <Card key={page}>
            <CardContent className="flex justify-between items-center">
              <div className="flex items-center gap-2 lg:gap-4 w-full">
                <UserIcon className="size-10 text-primary" />
                <div className="flex flex-1 flex-col overflow-hidden lg:flex-row justify-evenly max-w-1/2 lg:max-w-full">
                  <span className="truncate">Matheus</span>
                  <span className="truncate">matheusguto1@hotmail.com</span>
                  <span className="truncate">Ativo</span>
                </div>
              </div>
              <Link href={""}>
                <Button className="bg-muted cursor-pointer hover:bg-primary/10 active:bg-primary/20">
                  <MoreHorizontal className="text-primary" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination className="fixed bottom-0 w-full bg-card border-t">
        <PaginationContent>
          <PaginationPrevious />
          <PaginationLink>1</PaginationLink>
          <PaginationLink isActive>2</PaginationLink>
          <PaginationEllipsis />
          <PaginationNext />
        </PaginationContent>
      </Pagination>
    </div>
  );
}

const rows = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];
