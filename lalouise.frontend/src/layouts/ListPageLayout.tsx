"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";

interface IListPageLayout {
  createHref: string;
  itemHref: string;
}

export default function ListPageLayout({
  createHref,
  itemHref,
}: IListPageLayout) {
  // 1. Estado da página atual
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // 2. Lógica de cálculo (Slice)
  const totalPages = Math.ceil(test.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = test.slice(startIndex, startIndex + itemsPerPage);

  // 3. Funções de navegação
  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex-1 p-4 lg:p-12 grid grid-rows-12 gap-2 grid-cols-1">
      <div className="flex items-center justify-between gap-2">
        <SearchBar />
        <Link href={createHref}>
          <button className="bg-primary-light p-1 rounded-sm hover:scale-102 active:scale-98 text-white flex items-center justify-center gap-1 lg:p-2 transition-all cursor-pointer">
            <PlusIcon className="w-5" />
            <p>Cadastrar</p>
          </button>
        </Link>
      </div>

      <ul className="row-span-10 grid grid-rows-5 gap-2">
        {/* Mapeamos apenas os itens da página atual */}
        {currentItems.map((item, index) => (
          <Link
            href={itemHref}
            key={index}
            className="bg-surface rounded-sm flex items-center justify-between hover:scale-101 active:scale-99 transition-all px-4"
          >
            <li className="bg-surface rounded-sm flex items-center justify-between hover:scale-101 active:scale-99 transition-all px-4">
              <div className="flex items-center gap-4">
                <UserIcon className="w-5 text-primary" />
                <p>Item {item}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>

      {/* Seção de Paginação - Sem estilo para você editar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-gray-500 text-small">
            Página {page} de {totalPages}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="p-1 lg:p-2 bg-primary/5 rounded-sm hover:bg-primary/10 disabled:opacity-50 transition-all"
          >
            <ArrowLeftIcon className="w-5" />
          </button>

          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="p-1 lg:p-2 bg-primary/5 rounded-sm hover:bg-primary/10 disabled:opacity-50 transition-all cursor-pointer"
          >
            <ArrowRightIcon className="w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
