import api from "@/config/http/api";
import {
  CreateSectorRequest,
  GetSectorsParams,
  PageResponse,
  RestoreSectorRequest,
  SectorInfo,
  SectorSummary,
  StorageType,
  UpdateSectorRequest,
} from "./api.sectors.data";

export const createSector = async (data: CreateSectorRequest): Promise<void> => {
  await api.post("/sectors", data);
};

export const getSectors = async ({
  page = 0,
  size = 20,
  search,
}: GetSectorsParams): Promise<PageResponse<SectorSummary>> => {
  const { data } = await api.get("/sectors", {
    params: { page, size, search },
  });

  return data;
};

export const getSectorById = async (id: string): Promise<SectorInfo> => {
  const { data } = await api.get<SectorInfo>(`/sectors/${id}`);

  return {
    id: data.id ?? id,
    name: data.name,
    description: data.description,
    responsibleId: data.responsibleId,
    responsibleName: data.responsibleName,
    storages: data.storages,
    isActive: data.isActive,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt ?? null,
  };
};

export const updateSector = async (
  id: string,
  data: Partial<UpdateSectorRequest>,
): Promise<void> => {
  await api.patch(`/sectors/${id}`, data);
};

export const deleteSector = async (id: string): Promise<void> => {
  await api.delete(`/sectors/${id}`);
};

export const getDeletedSectors = async ({
  page = 0,
  size = 20,
  search,
}: GetSectorsParams): Promise<PageResponse<SectorSummary>> => {
  const { data } = await api.get("/sectors/deleted", {
    params: { page, size, search },
  });

  return data;
};

export const restoreSector = async (
  id: string,
  data: RestoreSectorRequest,
): Promise<void> => {
  await api.patch(`/sectors/${id}/restore`, data);
};

export const getStorages = async (sectorId: string): Promise<StorageType[]> => {
  const { data } = await api.get<StorageType[]>(`/sectors/${sectorId}/storages`);
  return data;
};
