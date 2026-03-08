"use client"

import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";

export interface FilterOption {
  label: string;
  value: string;
}

export interface ListFiltersConfig {
  filterParam?: string; 
  filterOptions?: FilterOption[];
}

export function useListFilters({filterParam = "filters", filterOptions = []}: ListFiltersConfig) {
  const [params, setParams] = useQueryStates({
    search: parseAsString.withDefault(""),
    [filterParam]: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const filters = (params[filterParam] ?? []) as string[];

  const toggleFilter = (value: string) => {
    const current = (params[filterParam] ?? []) as string[];
    setParams({
      [filterParam]: current.includes(value)
        ? current.filter((f: string) => f !== value)
        : [...current, value],
    });
  };

  const hasActiveFilter = filters.length > 0;

  const activeFilters = filterOptions.filter((opt) =>
    filters.includes(opt.value)
  );

  return {
    search: params.search,
    setSearch: (value: string) => setParams({ search: value }),
    filters,
    toggleFilter,
    hasActiveFilter,
    activeFilters,
  };
}