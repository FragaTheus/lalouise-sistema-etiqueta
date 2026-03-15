"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useLabelProducts } from "@/features/label/hooks/use-label-products";
import type { ProductSummary } from "@/features/products/api/api.products.data";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";

interface PrintLabelProductDialogProps {
  selectedProduct: ProductSummary | null;
  onSelectProduct: (product: ProductSummary) => void;
}

export default function PrintLabelProductDialog({
  selectedProduct,
  onSelectProduct,
}: PrintLabelProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(searchValue.trim());
    }, 300);
    return () => window.clearTimeout(timeoutId);
  }, [searchValue]);

  const { data, isLoading, isError, refetch } = useLabelProducts({
    page: 0,
    search: debouncedSearch || null,
  });

  const products = useMemo(() => data?.content ?? [], [data]);

  const handleSelect = (product: ProductSummary) => {
    onSelectProduct(product);
    setIsOpen(false);
  };

  return (
    <>
      <div className="space-y-3">
        {selectedProduct ? (
          <p className="rounded-md border bg-primary/5 px-3 py-2 text-sm text-foreground">
            Produto selecionado: {selectedProduct.name}
          </p>
        ) : (
          <p className="rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground">
            Nenhum produto selecionado
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          className="w-fit"
          onClick={() => setIsOpen(true)}
        >
          {selectedProduct ? "Trocar produto" : "Selecionar produto"}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Selecionar produto</DialogTitle>
            <DialogDescription>
              Busque pelo nome e selecione o produto para a etiqueta.
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <SearchIcon className="text-primary absolute left-2 top-1/2 size-4 -translate-y-1/2" />
            <Input
              placeholder="Buscar por nome"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2">
            {isLoading && (
              <p className="text-sm text-muted-foreground">
                Buscando produtos...
              </p>
            )}

            {isError && (
              <div className="flex items-center justify-between gap-2 rounded-md border p-3">
                <p className="text-sm text-destructive">
                  Erro ao carregar produtos.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => refetch()}
                >
                  Tentar novamente
                </Button>
              </div>
            )}

            {!isLoading && !isError && products.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum produto encontrado para o termo pesquisado.
              </p>
            )}

            {!isLoading &&
              !isError &&
              products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelect(product)}
                  className="w-full rounded-md border px-3 py-2 text-left transition-colors hover:bg-primary/5"
                >
                  <p className="text-sm font-medium text-foreground">
                    {product.name}
                  </p>
                  {product.description && (
                    <p className="text-xs text-muted-foreground">
                      {product.description}
                    </p>
                  )}
                </button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
