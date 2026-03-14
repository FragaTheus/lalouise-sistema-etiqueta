import { storageTypeValues } from "../../../shared/constants/storage-types";
import type { StorageType } from "../../../shared/constants/storage-types";

export { storageTypeValues };
export type { StorageType };

export interface CreateSectorRequest {
  name: string;
  description: string;
  storages: StorageType[];
  responsibleId: string;
}

export interface UpdateSectorRequest {
  name?: string;
  description?: string;
  storages?: StorageType[];
  responsibleId?: string;
}

export interface SectorSummary {
  id: string;
  name: string;
  description: string;
}

export interface SectorInfo {
  id: string;
  name: string;
  description: string;
  responsibleId?: string;
  responsibleName: string;
  storages?: StorageType[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface GetSectorsParams {
  page?: number;
  size?: number;
  search?: string | null;
}
