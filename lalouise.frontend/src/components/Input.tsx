"use client";

import { HTMLInputTypeAttribute } from "react";
import { motion } from "framer-motion";

import { UseFormRegister, FieldPath } from "react-hook-form";

export interface IInputConfig<T extends object> {
  name: FieldPath<T>;
  label: string;
  type: HTMLInputTypeAttribute;
}

interface IInputProps<T extends object> {
  config: IInputConfig<T>;
  register: UseFormRegister<T>;
  index: number;
}

export function Input<T extends object>({
  config,
  register,
  index,
}: IInputProps<T>) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col gap-1"
    >
      <motion.label
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2 }}
        className="text-small font-semibold"
      >
        {config.label}
      </motion.label>

      <motion.input
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.3 }}
        type={config.type}
        className="outline-none rounded-sm  lg:p-1 border border-gray-300 transition-all focus:bg-background"
        {...register(config.name)}
      />
    </motion.div>
  );
}
