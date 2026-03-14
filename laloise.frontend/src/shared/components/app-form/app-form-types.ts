import { UseMutationResult } from "@tanstack/react-query";
import { DefaultValues, FieldPath, FieldValues } from "react-hook-form";
import z from "zod";

export interface FormSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface BaseFormFieldConfig<TFormValues extends FieldValues> {
  name: FieldPath<TFormValues>;
  label: string;
  placeholder?: string;
}

interface InputFormFieldConfig<TFormValues extends FieldValues>
  extends BaseFormFieldConfig<TFormValues> {
  kind?: "input";
  type?: string;
}

interface SelectFormFieldConfig<TFormValues extends FieldValues>
  extends BaseFormFieldConfig<TFormValues> {
  kind: "select";
  options: FormSelectOption[];
  mapValueToArray?: boolean;
}

interface CheckboxGroupFieldConfig<TFormValues extends FieldValues>
  extends BaseFormFieldConfig<TFormValues> {
  kind: "checkbox-group";
  options: FormSelectOption[];
}

export type FormFieldConfig<TFormValues extends FieldValues> =
  | InputFormFieldConfig<TFormValues>
  | SelectFormFieldConfig<TFormValues>
  | CheckboxGroupFieldConfig<TFormValues>;

export interface AppFormProps<TSchema extends z.ZodTypeAny> {
  legend?: string;
  schema: TSchema;
  fields: FormFieldConfig<z.infer<TSchema>>[];
  mutation: UseMutationResult<unknown, Error, z.infer<TSchema>>;
  defaultValues: DefaultValues<z.infer<TSchema>>;
  btnText: string;
}