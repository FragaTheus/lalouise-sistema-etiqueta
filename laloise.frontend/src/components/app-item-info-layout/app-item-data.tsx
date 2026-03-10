import { LucideIcon } from "lucide-react";
import { UseMutationResult } from "@tanstack/react-query";
import { ZodType } from "zod";
import { FormFieldConfig } from "@/components/app-form/app-form-types";

export interface AppItemEditConfig {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: ZodType<any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: FormFieldConfig<any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues: Record<string, any>;
  btnText: string;
}

export interface ItemInfoField {
  key: string;
  label: string;
  value: string | React.ReactNode;
  isBadge?: boolean;
  badgeColor?: "primary" | "secondary";
}

export interface ItemInfoSection {
  title?: string;
  fields: ItemInfoField[];
}

export interface AppItemInfoProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  sections: ItemInfoSection[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateMutation?: UseMutationResult<void, Error, any>;
  deleteMutation?: UseMutationResult<void, Error, void, unknown>;
  restoreMutation?: UseMutationResult<void, Error, void, unknown>;
  editConfig?: AppItemEditConfig;
  isProfile?: boolean;
  isDeleted?: boolean;
}
