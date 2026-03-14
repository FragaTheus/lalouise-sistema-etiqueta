import {
  StorageType,
  storageTypeValues,
} from "@/features/sectors/api/api.sectors.data";
import {
  CreateSectorSchemaRequest,
} from "@/features/sectors/constants/schemas/create-sector-schema";
import { UpdateSectorSchemaRequest } from "@/features/sectors/constants/schemas/update-sector-schema";
import { FormFieldConfig } from "@/shared/components/app-form/app-form-types";

function getStorageLabel(storage: StorageType) {
  return storage.replaceAll("_", " ");
}

const storageOptions = storageTypeValues.map((storageType) => ({
  label: getStorageLabel(storageType),
  value: storageType,
}));

export const createSectorFields: FormFieldConfig<CreateSectorSchemaRequest>[] = [
  {
    name: "name",
    label: "Nome do Setor",
    type: "text",
    placeholder: "Ex: Laticínios",
  },
  {
    name: "description",
    label: "Descrição",
    type: "text",
    placeholder: "Descrição do setor",
  },
  {
    name: "storages",
    label: "Tipo de Armazenamento",
    kind: "checkbox-group",
    options: storageOptions,
  },
  {
    name: "responsibleId",
    label: "ID do Responsável",
    type: "text",
    placeholder: "UUID do responsável",
  },
];

export const createSectorDefaultValues: CreateSectorSchemaRequest = {
  name: "",
  description: "",
  storages: [],
  responsibleId: "",
};

export const createSectorBtnText = "Cadastrar Setor";

export const updateSectorFields: FormFieldConfig<UpdateSectorSchemaRequest>[] = [
  {
    name: "name",
    label: "Nome do Setor",
    type: "text",
    placeholder: "Ex: Laticínios",
  },
  {
    name: "description",
    label: "Descrição",
    type: "text",
    placeholder: "Descrição do setor",
  },
  {
    name: "storages",
    label: "Tipo de Armazenamento",
    kind: "checkbox-group",
    options: storageOptions,
  },
  {
    name: "responsibleId",
    label: "ID do Responsável",
    type: "text",
    placeholder: "UUID do responsável",
  },
];

export const updateSectorDefaultValues: UpdateSectorSchemaRequest = {
  name: undefined,
  description: undefined,
  storages: undefined,
  responsibleId: undefined,
};

export const updateSectorBtnText = "Salvar Alterações";
