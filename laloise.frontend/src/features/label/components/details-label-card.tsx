"use client";

import { useParams } from "next/navigation";
import { useLabel } from "@/features/label/hooks/use-label";
import { DataError } from "@/shared/components/data-error";
import { ItemInfoLoadingSkeleton } from "@/shared/components/loading-skeleton";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { FieldSeparator } from "@/shared/components/ui/field";

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

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
	return (
		<div className="rounded-md border p-3">
			<p className="text-xs text-muted-foreground">{label}</p>
			<div className="mt-1 text-sm font-medium text-foreground">{value}</div>
		</div>
	);
}

export default function DetailsLabelCard() {
	const params = useParams();
	const labelIdParam = params?.id;
	const labelId = Array.isArray(labelIdParam) ? labelIdParam[0] : labelIdParam;

	const { data, isLoading, error, refetch } = useLabel(labelId);

	if (!labelId) {
		return <DataError error={new Error("ID da etiqueta não encontrado na URL")} />;
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
		<Card className="w-full max-w-7xl">
			<CardHeader className="w-full">
				<div>
					<CardTitle>{data.product}</CardTitle>
					<CardDescription>{data.sector}</CardDescription>
					<CardDescription className="mt-1">Lote: {data.lote}</CardDescription>
				</div>
			</CardHeader>

			<CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
				<InfoItem label="Produto" value={data.product || "Não informado"} />
				<InfoItem label="Setor" value={data.sector || "Não informado"} />
				<InfoItem
					label="Responsável"
					value={data.responsible || "Não informado"}
				/>
				<InfoItem label="Lote" value={data.lote || "Não informado"} />
				<InfoItem
					label="Status"
					value={
						<span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
							{data.status || "Não informado"}
						</span>
					}
				/>
			</CardContent>

			<FieldSeparator />

			<CardFooter className="grid grid-cols-1 gap-3 md:grid-cols-2">
				<InfoItem
					label="Data de emissão"
					value={formatBackendDateTime(data.issueDate)}
				/>
				<InfoItem
					label="Data de validade"
					value={formatBackendDateTime(data.expirationDate)}
				/>
			</CardFooter>
		</Card>
	);
}
