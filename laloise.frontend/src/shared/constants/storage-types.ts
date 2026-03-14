export const storageTypeValues = [
  "AMBIENTE",
  "REFRIGERADO",
  "CONGELADO",
  "HIPER_CONGELADO",
] as const;

export type StorageType = (typeof storageTypeValues)[number];