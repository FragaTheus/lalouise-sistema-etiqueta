import api from "@/config/http/api";
import {
  GetLabelsParams,
  LabelInfo,
  LabelReprintData,
  LabelSummary,
  PageResponse,
  PrintLabelRequest,
  ReprintLabelRequest,
} from "./api.labels.data";

export const printLabel = async (data: PrintLabelRequest): Promise<void> => {
  await api.post("/labels/print", data);
};

export const getLabels = async ({
  page = 0,
  size = 20,
  resId,
  productName,
  resName,
  secName,
  status,
}: GetLabelsParams): Promise<PageResponse<LabelSummary>> => {
  const { data } = await api.get("/labels", {
    params: { page, size, resId, productName, resName, secName, status },
  });

  return data;
};

export const getLabelById = async (id: string): Promise<LabelInfo> => {
  const { data } = await api.get<LabelInfo>(`/labels/${id}`);

  return {
    product: data.product,
    sector: data.sector,
    responsible: data.responsible,
    lote: data.lote,
    issueDate: data.issueDate,
    expirationDate: data.expirationDate,
    status: data.status,
  };
};

export const getLabelReprintData = async (
  id: string,
): Promise<LabelReprintData> => {
  const { data } = await api.get<LabelReprintData>(`/labels/${id}/reprint-data`);

  return {
    id: data.id,
    lote: data.lote,
    productId: data.productId,
    productName: data.productName,
    expirationDate: data.expirationDate,
  };
};

export const reprintLabel = async (
  oldLabelId: string,
  data: ReprintLabelRequest,
): Promise<void> => {
  await api.post(`/labels/${oldLabelId}/reprint`, data);
};

export const runLabelMaintenanceJobs = async (): Promise<void> => {
  await api.post("/labels/maintenance/run-jobs");
};

export const cleanupLabelMaintenance = async (): Promise<void> => {
  await api.delete("/labels/maintenance/cleanup");
};