"use client";

import { HTMLInputTypeAttribute } from "react";

export type InputProps = {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
};

interface IInput {
  label: string;
  input: InputProps;
  error?: string;
  register: any;
}

export default function Input({ label, input, error, register }: IInput) {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-small font-semibold">{label}</label>
      <input
        type={input.type}
        name={input.name}
        placeholder={input.placeholder}
        className="border rounded-sm px-2 py-1 outline-none focus:bg-surface focus:ring focus:ring-primary-light transition-colors"
        {...register(input.name)}
      />
      {error && (
        <span className="text-small text-secondary-light">{error}</span>
      )}
    </div>
  );
}
