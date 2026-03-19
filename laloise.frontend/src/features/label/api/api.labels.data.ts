import type { StorageType } from "../../../shared/constants/storage-types";

export type LabelStatus = string;

export interface PrintLabelRequest {
  productId: string;
  storageType: StorageType;
  copies: number;
}

export interface ReprintLabelRequest {
  storageType: StorageType;
  copies: number;
}

export interface LabelSummary {
  id: string;
  lote: string;
  sector: string;
  product: string;
  status: LabelStatus;
}

export interface LabelInfo {
  product: string;
  sector: string;
  responsible: string;
  lote: string;
  issueDate: string;
  expirationDate: string;
  status: LabelStatus;
}

export interface LabelReprintData {
  id: string;
  lote: string;
  productId: string;
  productName: string;
  expirationDate: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface GetLabelsParams {
  page?: number;
  size?: number;
  resId?: string | null;
  productName?: string | null;
  resName?: string | null;
  secName?: string | null;
  status?: LabelStatus | null;
}