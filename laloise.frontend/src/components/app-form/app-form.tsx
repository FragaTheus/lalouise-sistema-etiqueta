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
import { SlideInFromBottom, FadeIn } from "@/animations/animations";

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
    <SlideInFromBottom delay={0}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FieldSet>
          {legend && (
            <FadeIn delay={0.1}>
              <FieldLegend>{legend}</FieldLegend>
            </FadeIn>
          )}
          <FieldGroup className="gap-6 lg:gap-8">
            {fields.map((fieldConfig, index) => {
              const fieldError = errors[fieldConfig.name];

              return (
                <SlideInFromBottom
                  key={String(fieldConfig.name)}
                  delay={0.1 + index * 0.08}
                >
                  <Field>
                    <FieldLabel>{fieldConfig.label}</FieldLabel>
                    <FieldContent>
                      <Input
                        type={fieldConfig.type}
                        placeholder={fieldConfig.placeholder}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                        {...register(fieldConfig.name as any)}
                      />
                    </FieldContent>
                    {fieldError?.message && (
                      <FadeIn delay={0.05}>
                        <FieldError>{String(fieldError.message)}</FieldError>
                      </FadeIn>
                    )}
                  </Field>
                </SlideInFromBottom>
              );
            })}
            <SlideInFromBottom delay={0.1 + fields.length * 0.08}>
              <Field>
                <Button
                  className="mt-2 flex items-center gap-2 cursor-pointer bg-linear-to-r from-primary to-primary/80 text-white hover:shadow-md hover:from-primary/90 hover:to-primary/70 transition-all duration-300 w-full font-semibold"
                  type="submit"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending && (
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                  )}
                  {mutation.isPending ? "Carregando..." : btnText}
                </Button>
              </Field>
            </SlideInFromBottom>
          </FieldGroup>
        </FieldSet>
      </form>
    </SlideInFromBottom>
  );
}
