import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";

export interface AppInputProps {
  label: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  description: string;
  error?: string | undefined;
}

export default function AppInput({
  label,
  inputProps,
  description,
  error,
}: AppInputProps) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <FieldContent>
        <Input type={inputProps.type} placeholder={inputProps.placeholder} />
      </FieldContent>
      {!error ? (
        <FieldDescription>{description}</FieldDescription>
      ) : (
        <FieldError>{error}</FieldError>
      )}
    </Field>
  );
}
