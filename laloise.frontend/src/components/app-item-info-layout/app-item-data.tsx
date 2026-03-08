import { LucideIcon } from "lucide-react";

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
}
