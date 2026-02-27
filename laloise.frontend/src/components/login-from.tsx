"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { LoginFormData, loginSchema } from "@/schemas/loginSchema";
import { Button } from "./ui/button";

export default function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="email@exemplo.com.br"
                    type="email"
                    {...field}
                  />
                </FieldContent>
                {!error ? (
                  <FieldDescription>Insira seu email</FieldDescription>
                ) : (
                  <FieldError>{error.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <Field>
                <FieldLabel>Senha</FieldLabel>
                <FieldContent>
                  <Input placeholder="Senha@123" type="password" {...field} />
                </FieldContent>
                {!error ? (
                  <FieldDescription>Digite sua senha</FieldDescription>
                ) : (
                  <FieldError>{error.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Field>
            <Button className="mt-2" type="submit">
              Entrar
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
