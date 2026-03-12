"use client";

import { CardContent } from "@/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useListTable } from "@/shared/hooks/use-list-table";
import { ListLayoutContentProps } from "./list-layout-data";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function ListLayoutContent<T extends { id: string }>({
  data,
  columns,
  totalItems,
  caption,
  actionHref,
}: ListLayoutContentProps<T>) {
  const actionColumn: ColumnDef<T> = {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Link href={`${actionHref}/${row.original.id}`}>
        <Button
          size="sm"
          className="bg-transparent hover:bg-primary/5 active:bg-primary/10 text-primary cursor-pointer"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </Link>
    ),
  };

  const { table } = useListTable({
    data,
    columns: [...columns, actionColumn],
    totalItems,
  });

  return (
    <CardContent>
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="max-w-37.5">
                  <span className="block truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
}
