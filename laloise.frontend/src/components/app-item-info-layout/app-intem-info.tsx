"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import {
  AppItemInfoProps,
  ItemInfoField,
  ItemInfoSection,
} from "./app-item-data";

export default function AppItemInfo({
  icon: Icon,
  title,
  subtitle,
  sections,
}: AppItemInfoProps) {
  const renderField = (field: ItemInfoField) => {
    if (field.isBadge) {
      const badgeColor = field.badgeColor || "primary";
      const colorClass =
        badgeColor === "primary"
          ? "bg-primary/10 text-primary"
          : "bg-secondary/10 text-secondary";

      return (
        <div key={field.key} className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-foreground/70">
            {field.label}
          </span>
          <span
            className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
          >
            {field.value}
          </span>
        </div>
      );
    }

    return (
      <div key={field.key} className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-foreground/70">
          {field.label}
        </span>
        <span className="text-base text-foreground">{field.value}</span>
      </div>
    );
  };

  const renderSection = (section: ItemInfoSection, index: number) => {
    return (
      <div key={index}>
        {section.title && (
          <FieldSeparator className="mb-6">{section.title}</FieldSeparator>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.fields.map(renderField)}
        </div>
      </div>
    );
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl">{title}</CardTitle>
            {subtitle && (
              <CardDescription className="text-sm">{subtitle}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-6">
        {sections.map(renderSection)}
      </CardContent>
    </Card>
  );
}
