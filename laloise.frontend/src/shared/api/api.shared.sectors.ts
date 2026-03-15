import api from "@/config/http/api";
import type { StorageType } from "@/shared/constants/storage-types";

export const getActiveSectorId = async (): Promise<string> => {
  const { data } = await api.get<string>("/sectors/me");
  return data;
};

export const getStoragesBySectorId = async (
  sectorId: string,
): Promise<StorageType[]> => {
  const { data } = await api.get<StorageType[]>(
    `/sectors/${sectorId}/storages`,
  );
  return data;
};
