import { HTMLInputTypeAttribute } from "react";

import {
  RegisterOptions,
  UseFormRegister,
  FieldErrors,
  FieldPath,
  get,
} from "react-hook-form";

export interface IInputConfig<T extends object> {
  name: FieldPath<T>;
  label: string;
  type: HTMLInputTypeAttribute;
  rules?: RegisterOptions<T, FieldPath<T>>;
}

interface IInputProps<T extends object> {
  config: IInputConfig<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export function Input<T extends object>({
  config,
  register,
  errors,
}: IInputProps<T>) {
  const error = get(errors, config.name);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-small font-semibold">{config.label}</label>

      <input
        type={config.type}
        className={`outline-none rounded-sm p-1 lg:p-2 border border-gray-300 transition-all focus:bg-background
        ${error ? "ring-2 ring-secondary-light border-secondary-light" : "focus:ring-2 focus:ring-primary-light"}`}
        {...register(config.name, config.rules)}
      />

      {error && (
        <span className="text-xs text-secondary-light font-bold italic">
          {error.message}
        </span>
      )}
    </div>
  );
}
