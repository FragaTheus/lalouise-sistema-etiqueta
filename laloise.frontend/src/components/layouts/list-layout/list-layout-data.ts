import { FilterOption } from "@/hooks/use-filter";

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