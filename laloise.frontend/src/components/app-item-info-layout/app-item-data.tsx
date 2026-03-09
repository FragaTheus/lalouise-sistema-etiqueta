import { LucideIcon } from "lucide-react";
import { UseMutationResult } from "@tanstack/react-query";
import { UpdateUserPayload } from "@/api/api.perfil";

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
  updateMutation?: UseMutationResult<void, Error, Partial<UpdateUserPayload>>;
  deleteMutation?: UseMutationResult<void, Error, void, unknown>;
  restoreMutation?: UseMutationResult<void, Error, void, unknown>;
  isProfile?: boolean;
  isDeleted?: boolean;
}
