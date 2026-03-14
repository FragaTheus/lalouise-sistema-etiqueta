"use client";

import { getLabels } from "@/features/label/api/api.labels";
import {
  GetLabelsParams,
  LabelSummary,
  PageResponse,
} from "@/features/label/api/api.labels.data";
import { useQuery } from "@tanstack/react-query";

export function useLabels({
  page = 0,
  size = 20,
  resId,
  productName,
  resName,
  secName,
  status,
}: GetLabelsParams = {}) {
  return useQuery<PageResponse<LabelSummary>>({
    queryKey: ["labels", page, size, resId, productName, resName, secName, status],
    queryFn: () =>
      getLabels({ page, size, resId, productName, resName, secName, status }),
    staleTime: 1000 * 60 * 5,
  });
}