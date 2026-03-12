import api from "@/config/http/api";
import {
  CreateProductRequest,
  UpdateProductRequest,
  GetProductsParams,
  PageResponse,
  ProductInfo,
  ProductSummary,
} from "./api.products.data";

export const createProduct = async (
  data: CreateProductRequest,
): Promise<void> => {
  try {
    await api.post("/products", data);
  } catch (error) {
    throw error;
  }
};

export const getProducts = async ({
  page = 0,
  size = 20,
  search,
}: GetProductsParams): Promise<PageResponse<ProductSummary>> => {
  const { data } = await api.get("/products", {
    params: { page, size, search },
  });
  return data;
};

export const getProductById = async (id: string): Promise<ProductInfo> => {
  const { data } = await api.get<ProductInfo>(`/products/${id}`);
  console.log("Fetched product data:", data);

  return {
    id: data.id ?? id,
    name: data.name,
    description: data.description,
    active: data.active ?? true,
    createdAt: data.createdAt ?? "",
    updatedAt: data.updatedAt ?? "",
    deletedAt: data.deletedAt ?? null,
  };
};

export const updateProduct = async (
  id: string,
  data: Partial<UpdateProductRequest>,
): Promise<void> => {
  await api.patch(`/products/${id}`, data);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};

export const getDeletedProducts = async ({
  page = 0,
  size = 20,
  search,
}: GetProductsParams): Promise<PageResponse<ProductSummary>> => {
  const { data } = await api.get("/products/deleted", {
    params: { page, size, search },
  });
  return data;
};

export const restoreProduct = async (id: string): Promise<void> => {
  await api.post(`/products/${id}/restore`);
};
