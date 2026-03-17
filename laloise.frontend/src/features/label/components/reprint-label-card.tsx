"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { DataError } from "@/shared/components/data-error";
import { ItemInfoLoadingSkeleton } from "@/shared/components/loading-skeleton";
import { useLabelReprintData } from "@/features/label/hooks/use-label-reprint-data";
import ReprintLabelForm from "@/features/label/components/reprint-label-form";
import AppRouterBack from "@/shared/components/app-router-back";
import { useParams } from "next/navigation";

function formatBackendDateTime(value?: string | null) {
  if (!value) {
    return "Nunca";
  }

  const localDateTimeMatch = value.match(
    /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?/,
  );

  if (localDateTimeMatch) {
    const [, year, month, day, hour, minute, second] = localDateTimeMatch;
    const parsedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second || 0),
    );

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleString("pt-BR");
    }
  }

  const fallbackDate = new Date(value);
  if (!Number.isNaN(fallbackDate.getTime())) {
    return fallbackDate.toLocaleString("pt-BR");
  }

  return value;
}

export default function ReprintLabelCard() {
  const params = useParams();
  const labelIdParam = params?.id;
  const labelId = Array.isArray(labelIdParam) ? labelIdParam[0] : labelIdParam;

  const { data, isLoading, error, refetch } = useLabelReprintData(labelId);

  if (!labelId) {
    return (
      <DataError error={new Error("ID da etiqueta não encontrado na URL")} />
    );
  }

  if (isLoading) {
    return <ItemInfoLoadingSkeleton />;
  }

  if (error) {
    return <DataError error={error} onRetry={() => refetch()} />;
  }

  if (!data) {
    return <DataError error={null} onRetry={() => refetch()} />;
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 pt-10 lg:pt-4">
      <div className="max-h-min max-w-7xl w-full min-w-xs gap-4 flex flex-col pt-4">
        <AppRouterBack />

        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle>{data.productName}</CardTitle>
            <CardDescription>Reimpressão de Etiqueta</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Seção de dados fixos da etiqueta original */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Dados da Etiqueta Original
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    Lote
                  </span>
                  <span className="text-sm text-foreground">{data.lote}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    Data de Validade
                  </span>
                  <span className="text-sm text-foreground">
                    {formatBackendDateTime(data.expirationDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Seção de formulário para novos dados */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Dados da Nova Etiqueta
              </h3>
              <ReprintLabelForm labelId={labelId} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
