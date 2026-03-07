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
    filters: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const toggleFilter = (value: string) => {
    setParams((prev) => ({
      filters: prev.filters.includes(value)
        ? prev.filters.filter((f) => f !== value)
        : [...prev.filters, value],
    }));
  };

  const hasActiveFilter = params.filters.length > 0;

  const activeFilters = filterOptions.filter((opt) =>
    params.filters.includes(opt.value)
  );

  return {
    search: params.search,
    setSearch: (value: string) => setParams({ search: value }),
    filters: params.filters,
    toggleFilter,
    hasActiveFilter,
    activeFilters,
  };
}