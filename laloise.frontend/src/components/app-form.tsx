"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldPath,
  FieldValues,
  useForm,
} from "react-hook-form";
import { Field, FieldGroup, FieldLegend, FieldSet } from "./ui/field";
import { Button } from "./ui/button";
import z from "zod";
import AppInput from "./app-input";

export interface FormFieldConfig<TFormValues extends FieldValues> {
  name: FieldPath<TFormValues>;
  label: string;
  description: string;
  type?: string;
  placeholder?: string;
}

interface AppFormProps<TSchema extends z.ZodObject<any>> {
  legend?: string;
  schema: TSchema;
  fields: FormFieldConfig<z.infer<TSchema>>[];
  onSubmit: (data: z.infer<TSchema>) => void | Promise<void>;
  defaultValues: DefaultValues<z.infer<TSchema>>;
  btnText: string;
}

export default function AppForm<TSchema extends z.ZodObject<any>>({
  legend,
  schema,
  fields,
  onSubmit,
  defaultValues,
  btnText,
}: AppFormProps<TSchema>) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        {legend && <FieldLegend>{legend}</FieldLegend>}
        <FieldGroup>
          {fields.map((fieldConfig) => {
            const fieldError = errors[fieldConfig.name];

            return (
              <AppInput
                key={String(fieldConfig.name)}
                label={fieldConfig.label}
                description={fieldConfig.description}
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
            <Button className="mt-2" type="submit">
              {btnText}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
