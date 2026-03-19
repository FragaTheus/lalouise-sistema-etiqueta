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
  // Converter productId string para formato que o backend espera
  const payload = {
    productId: data.productId, // Backend espera UUID, o Axios/Jackson converte automaticamente
    storageType: data.storageType,
    copies: data.copies,
  };

  console.log("[PRINT] Sending data to /labels/print:", payload);
  console.log("[PRINT] Data types:", {
    productId: typeof payload.productId,
    storageType: typeof payload.storageType,
    copies: typeof payload.copies,
  });
  console.log("[PRINT] Full payload:", JSON.stringify(payload, null, 2));
  await api.post("/labels/print", payload);
  console.log("Label printed with data:", payload);
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
  console.log(`[REPRINT] Sending data to /labels/${oldLabelId}/reprint:`, data);
  console.log(`[REPRINT] Data types:`, {
    storageType: typeof data.storageType,
    copies: typeof data.copies,
  });
  console.log(`[REPRINT] Full payload:`, JSON.stringify(data, null, 2));
  await api.post(`/labels/${oldLabelId}/reprint`, data);
  console.log(`Label ${oldLabelId} reprinted with new data:`, data);
};

