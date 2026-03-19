import api from "@/config/http/api";
import type { StorageType } from "@/shared/constants/storage-types";

interface StoragesMeResponse {
  sectorId: string;
  storages: StorageType[];
}

function hasStoragesMePayload(
  data: StorageType[] | StoragesMeResponse,
): data is StoragesMeResponse {
  return !Array.isArray(data);
}

export const getMyStorages = async (): Promise<StorageType[]> => {
  const { data } = await api.get<StorageType[] | StoragesMeResponse>(
    "/storages/me",
  );

  if (hasStoragesMePayload(data)) {
    console.log(data)
    return data.storages;
  }
    console.log(data)
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
