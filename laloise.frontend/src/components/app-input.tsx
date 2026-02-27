import { InputHTMLAttributes } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";

export interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description: string;
  error?: string;
}

export default function AppInput({
  label,
  description,
  error,
  ...inputProps
}: AppInputProps) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <FieldContent>
        <Input {...inputProps} />
      </FieldContent>
      {!error ? (
        <FieldDescription>{description}</FieldDescription>
      ) : (
        <FieldError>{error}</FieldError>
      )}
    </Field>
  );
}
