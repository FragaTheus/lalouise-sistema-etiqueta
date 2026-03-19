import api from "@/config/http/api";
import {
  GetLabelsParams,
  LabelInfo,
  LabelReprintData,
  LabelSummary,
  PageResponse,
  PrintLabelRequest,
  CreateLabelOverOldLabelRequest,
} from "./api.labels.data";

export const printLabel = async (data: PrintLabelRequest): Promise<void> => {
  await api.post("/labels/print", data);
  console.log("Label printed with data:", data);
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
  console.log("Reprint data:", data);

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
  data: CreateLabelOverOldLabelRequest,
): Promise<void> => {
  await api.post(`/labels/${oldLabelId}/reprint`, data);
  console.log(`Label ${oldLabelId} reprinted with new data:`, data);
};

