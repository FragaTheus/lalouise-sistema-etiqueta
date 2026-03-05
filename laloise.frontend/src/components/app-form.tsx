"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldPath, FieldValues, useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLegend, FieldSet } from "./ui/field";
import { Button } from "./ui/button";
import z from "zod";
import AppInput from "./app-input";
import { extractErrorMessage } from "@/api/api.error";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";

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
  onSubmit: (data: z.infer<TSchema>) => void | Promise<void>;
  defaultValues: any;
  btnText: string;
  sucessMsg: string;
}

export default function AppForm<TSchema extends z.ZodType<any, any>>({
  legend,
  schema,
  fields,
  onSubmit,
  defaultValues,
  btnText,
  sucessMsg,
}: AppFormProps<TSchema>) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues,
  });

  const handleFormSubmit = async (data: z.infer<TSchema>) => {
    try {
      await onSubmit(data);
      toast.success(sucessMsg);
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldSet>
        {legend && <FieldLegend>{legend}</FieldLegend>}
        <FieldGroup className="gap-6 lg:gap-8">
          {fields.map((fieldConfig) => {
            const fieldError = errors[fieldConfig.name];

            return (
              <AppInput
                key={String(fieldConfig.name)}
                label={fieldConfig.label}
                type={fieldConfig.type}
                placeholder={fieldConfig.placeholder}
                error={
                  fieldError?.message ? String(fieldError.message) : undefined
                }
                {...register(fieldConfig.name as any)}
              />
            );
          })}
          <Field>
            <Button
              className="mt-2 flex items-center gap-2 cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <LoaderIcon className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Carregando..." : btnText}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
