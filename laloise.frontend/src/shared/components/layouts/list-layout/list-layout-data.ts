import { FilterOption } from "@/shared/hooks/use-filter";
import { ColumnDef } from "@tanstack/react-table";

export interface ListLayoutHeaderProps {
  createHref: string;
  placeholder: string;
  filterParam?: string;
  filterOptions?: FilterOption[];
}

export interface HeaderMenuProps {
  filterParam: string;
  filterOptions: FilterOption[];
}

export interface ListLayoutContentProps<T extends { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  totalItems: number;
  caption?: string;
  actionHref: string;
}

export interface ListPageLayoutProps<T extends { id: string }>
  extends ListLayoutHeaderProps,
    ListLayoutContentProps<T> {}

export interface ListLayoutFooterProps {
  totalItems: number;
}