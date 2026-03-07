import { UseMutationResult } from "@tanstack/react-query";
import { FieldPath, FieldValues } from "react-hook-form";
import z from "zod";

export interface FormFieldConfig<TFormValues extends FieldValues> {
  name: FieldPath<TFormValues>;
  label: string;
  type?: string;
  placeholder?: string;
}

export interface AppFormProps<TSchema extends z.ZodType<any, any>> {
  legend?: string;
  schema: TSchema;
  fields: FormFieldConfig<any>[];
  mutation: UseMutationResult<any, Error, z.infer<TSchema>>;
  defaultValues: any;
  btnText: string;
}