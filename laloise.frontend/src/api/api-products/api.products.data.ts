export interface CreateProductRequest {
  name: string;
  description: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  description: string;
}

export interface ProductInfo {
  id: string;
  name: string;
  description: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface GetProductsParams {
  page?: number;
  size?: number;
  search?: string | null;
}
