"use client";

import { useEffect, useMemo, useState } from "react";
import { FunnelIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export type SelectOption = { value: string; label: string };

export type FilterSpec =
  | { type: "search"; name: string; placeholder?: string }
  | { type: "select"; name: string; label?: string; options: SelectOption[] }
  | { type: "button"; name: string; label: string };

type Props = {
  filters?: FilterSpec[];
  onChange?: (values: Record<string, any>) => void;
  debounceMs?: number;
};

function useDebouncedValue<T>(value: T, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}

export default function FilterBar({
  filters,
  onChange,
  debounceMs = 300,
}: Props) {
  const computed = useMemo<FilterSpec[]>(() => {
    if (filters && filters.length) return filters;
    return [
      { type: "search", name: "q", placeholder: "Buscar..." },
      { type: "button", name: "categoria", label: "Categoria" },
      { type: "button", name: "status", label: "Status" },
      { type: "button", name: "setor", label: "Setor" },
    ];
  }, [filters]);

  const initial = useMemo(() => {
    const s: Record<string, any> = {};
    computed.forEach((f) => (s[f.name] = f.type === "button" ? false : ""));
    return s;
  }, [computed]);

  const [values, setValues] = useState<Record<string, any>>(initial);
  useEffect(() => setValues(initial), [initial]);

  const debounced = useDebouncedValue(values, debounceMs);

  useEffect(() => {
    onChange?.(debounced);
  }, [debounced, onChange]);

  function handle(name: string, value: any) {
    setValues((p) => ({ ...p, [name]: value }));
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
      <div className="w-full sm:max-w-md">
        {computed.map((f, i) => {
          if (f.type === "search") {
            return (
              <div key={i} className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  value={values[f.name] ?? ""}
                  onChange={(e) => handle(f.name, e.target.value)}
                  placeholder={f.placeholder ?? "Buscar..."}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 bg-white"
                />
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="flex gap-2 flex-wrap">
        {computed.map((f, i) => {
          if (f.type === "select") {
            return (
              <select
                key={i}
                value={values[f.name] ?? ""}
                onChange={(e) => handle(f.name, e.target.value)}
                className="p-2 rounded-lg border border-slate-200 bg-white"
              >
                <option value="">{f.label ?? "Selecione"}</option>
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            );
          }

          if (f.type === "button") {
            return (
              <button
                key={i}
                onClick={() => handle(f.name, !values[f.name])}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  values[f.name] ? "bg-primary text-white" : "bg-surface"
                }`}
                aria-pressed={!!values[f.name]}
              >
                <FunnelIcon className="w-4 text-gray-500" />
                {f.label}
                <ChevronDownIcon className="w-3 text-gray-400" />
              </button>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
