"use client";

import { useState } from "react";
import { Pagination } from "../ui/pagination";

import AppListPageLayoutHeader from "./app-list-page-layout-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const ITEMS_PER_PAGE = 10;

export default function AppListPageLayout() {
  const [page, setPage] = useState(1);

  const paginated = rows.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="pt-17 lg:pt-0">
      <AppListPageLayoutHeader />
      <div className="mt-30 lg:pt-0 flex-1 flex flex-col max-w-screen mb-15 px-2">
        <Table className="bg-card">
          <TableHeader>
            <TableRow>
              <TableHead>Head</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((row) => (
              <TableRow key={row}>
                <TableCell>Nome {row}</TableCell>
                <TableCell className="hidden lg:inline">Email</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const rows = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];
