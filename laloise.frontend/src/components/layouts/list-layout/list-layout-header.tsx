"use client";

import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { ListFiltersConfig, useListFilters } from "@/hooks/use-filter";
import { Filter, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { ListLayoutHeaderProps } from "./list-layout-data";

const HeaderMenu = ({
  filterParam = "filters",
  filterOptions = [],
}: ListFiltersConfig) => {
  const { toggleFilter, filters, hasActiveFilter } = useListFilters({
    filterParam,
    filterOptions,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent hover:bg-primary/5 active:bg-primary/10 data-[state=open]:bg-primary/10 text-primary cursor-pointer">
          <Filter className="size-4 text-primary relative" />
          {hasActiveFilter && (
            <div className="rounded-full bg-primary h-1 w-1" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {filterOptions.map((option) => (
          <Toggle
            key={option.value}
            pressed={filters.includes(option.value)}
            onPressedChange={() => toggleFilter(option.value)}
            className="w-full hover:bg-primary/5 active:bg-primary/10 data-[state=on]:bg-primary/10 data-[state=on]:text-primary text-primary"
          >
            {option.label}
          </Toggle>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function ListLayoutHeader({
  createHref,
  placeholder = "Buscar...",
  filterParam = "filters",
  filterOptions = [],
}: ListLayoutHeaderProps) {
  const { search, setSearch } = useListFilters({ filterParam, filterOptions });
  return (
    <CardHeader className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-start relative">
          <Input
            placeholder={placeholder}
            className=" pl-8 text-ellipsis lg:min-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className="text-primary absolute left-2 size-4" />
        </div>
        {filterOptions.length > 0 && (
          <HeaderMenu filterParam={filterParam} filterOptions={filterOptions} />
        )}
      </div>
      <Link href={createHref}>
        <Button className="bg-transparent hover:bg-primary/5 active:bg-primary/10 cursor-pointer">
          <PlusIcon className="text-primary size-4" />
        </Button>
      </Link>
    </CardHeader>
  );
}
