import api from "@/config/http/api";
import type {
  GetProductsParams,
  PageResponse,
  ProductSummary,
} from "@/features/products/api/api.products.data";

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
