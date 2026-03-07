"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Button } from "../ui/button";
import z from "zod";
import { LoaderIcon } from "lucide-react";
import { AppFormProps } from "./app-form-types";
import { Input } from "../ui/input";

export default function AppForm<TSchema extends z.ZodType<any, any>>({
  legend,
  schema,
  fields,
  mutation,
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

  const handleFormSubmit = (data: z.infer<TSchema>) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldSet>
        {legend && <FieldLegend>{legend}</FieldLegend>}
        <FieldGroup className="gap-6 lg:gap-8">
          {fields.map((fieldConfig) => {
            const fieldError = errors[fieldConfig.name];

            return (
              <Field key={String(fieldConfig.name)}>
                <FieldLabel>{fieldConfig.label}</FieldLabel>
                <FieldContent>
                  <Input
                    type={fieldConfig.type}
                    placeholder={fieldConfig.placeholder}
                    {...register(fieldConfig.name as any)}
                  />
                </FieldContent>
                {fieldError?.message && (
                  <FieldError>{String(fieldError.message)}</FieldError>
                )}
              </Field>
            );
          })}
          <Field>
            <Button
              className="mt-2 flex items-center gap-2 cursor-pointer"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending && (
                <LoaderIcon className="h-4 w-4 animate-spin" />
              )}
              {mutation.isPending ? "Carregando..." : btnText}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
