import { SectorInfo } from "@/features/sectors/api/api.sectors.data";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { FieldSeparator } from "@/shared/components/ui/field";

interface SectorDetailsCardProps {
  sector: SectorInfo;
  children?: React.ReactNode;
}

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

function formatStorageLabel(storage: string) {
  return storage.replaceAll("_", " ");
}

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-md border p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

export default function SectorDetailsCard({
  sector,
  children,
}: SectorDetailsCardProps) {
  const statusLabel = sector.isActive ? "Ativo" : "Inativo";

  return (
    <Card className="w-full max-w-7xl">
      <CardHeader className="flex items-center justify-between w-full">
        <div>
          <CardTitle>{sector.name}</CardTitle>
          <CardDescription>
            {sector.description || "Sem descrição"}
          </CardDescription>
          <CardDescription className="mt-1">ID: {sector.id}</CardDescription>
        </div>
        {children ? <CardAction>{children}</CardAction> : null}
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InfoItem
          label="Responsável"
          value={sector.responsibleName || "Não informado"}
        />
        <InfoItem
          label="ID do responsável"
          value={sector.responsibleId || "Não informado"}
        />
        <InfoItem
          label="Storages"
          value={
            sector.storages?.length ? (
              <div className="flex flex-wrap gap-2">
                {sector.storages.map((storage) => (
                  <span
                    key={storage}
                    className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-xs"
                  >
                    {formatStorageLabel(storage)}
                  </span>
                ))}
              </div>
            ) : (
              "Não informado"
            )
          }
        />
        <InfoItem
          label="Status"
          value={
            <span
              className={
                sector.isActive
                  ? "inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                  : "inline-flex rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              }
            >
              {statusLabel}
            </span>
          }
        />
      </CardContent>

      <FieldSeparator />

      <CardFooter className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <InfoItem
          label="Data de criação"
          value={formatBackendDateTime(sector.createdAt)}
        />
        <InfoItem
          label="Última atualização"
          value={formatBackendDateTime(sector.updatedAt)}
        />
        <InfoItem
          label="Data de exclusão"
          value={formatBackendDateTime(sector.deletedAt)}
        />
      </CardFooter>
    </Card>
  );
}
