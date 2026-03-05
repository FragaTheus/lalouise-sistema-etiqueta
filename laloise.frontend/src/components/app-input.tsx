import { InputHTMLAttributes } from "react";
import { Field, FieldContent, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function AppInput({
  label,
  error,
  ...inputProps
}: AppInputProps) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <FieldContent>
        <Input {...inputProps} />
      </FieldContent>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
