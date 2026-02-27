"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";

export default function CreateUser() {
  const form = useForm();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardContent>
          <FieldSet>
            <FieldGroup>
              <FieldLegend>Criar usuario</FieldLegend>
              <form>
                <Controller
                  control={form.control}
                  name="nickname"
                  render={({ field, fieldState: { error } }) => (
                    <Field>
                      <FieldLabel>Nome de usuario</FieldLabel>
                      <FieldContent>
                        <Input placeholder="Lalouise" />
                      </FieldContent>
                      {!error ? (
                        <FieldDescription>
                          Digite um nome para o usuario
                        </FieldDescription>
                      ) : (
                        <FieldError>Erro</FieldError>
                      )}
                    </Field>
                  )}
                />
                <Field>
                  <FieldContent>
                    <Button className="mt-2">Cadastrar</Button>
                  </FieldContent>
                </Field>
              </form>
            </FieldGroup>
          </FieldSet>
        </CardContent>
      </Card>
    </div>
  );
}
