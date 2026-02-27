"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  DefaultValues,
  FieldPath,
  FieldValues,
  useForm,
} from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { LoginFormData, loginSchema } from "@/constants/loginSchema";
import { Button } from "./ui/button";
import z from "zod";
import { ZodObject, ZodType } from "zod/v4";
import AppInput, { AppInputProps } from "./app-input";
import { error } from "console";

export interface FormFieldConfig<TFormValues extends FieldValues> {
  name: FieldPath<TFormValues>;
  inputProps: AppInputProps;
}

interface AppFormProps<TSchema extends z.ZodObject<any>> {
  legend?: string;
  schema: TSchema;
  fields: FormFieldConfig<z.infer<TSchema>>[];
  onSubmit: (data: z.infer<TSchema>) => void | Promise<void>;
  defaultValue?: DefaultValues<z.infer<TSchema>>;
  btnText: string;
}

export default function AppForm<TSchema extends z.ZodObject<any>>({
  legend,
  schema,
  fields,
  onSubmit,
  defaultValue,
  btnText,
}: AppFormProps<TSchema>) {
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: defaultValue,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        {legend && <FieldLegend>{legend}</FieldLegend>}
        <FieldGroup>
          {fields.map((fieldConfig) => (
            <Controller
              key={String(fieldConfig.name)}
              control={form.control}
              name={fieldConfig.name as any}
              render={({ field, fieldState: { error } }) => (
                <AppInput
                  {...field}
                  {...fieldConfig.inputProps}
                  error={error?.message}
                />
              )}
            />
          ))}
          <Field>
            <Button className="mt-2" type="submit">
              {btnText}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
