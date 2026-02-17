"use client";

import { IInputConfig, Input } from "@/components/Input";
import Image from "next/image";
import { DefaultValues, useForm } from "react-hook-form";
import { motion } from "framer-motion";

interface IFormPagesLayout<T extends object> {
  imgSrc: string;
  inputConfigs: IInputConfig<T>[];
  onSubmit: (data: T) => void;
  defaultValues: DefaultValues<T>;
  title: string;
  subtitle: string;
  btnText: string;
}

export default function FormPagesLayout<T extends object>(
  i: IFormPagesLayout<T>,
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({ defaultValues: i.defaultValues });

  return (
    <div className="flex-1 p-4 lg:p-12 flex">
      <div className="bg-primary/5 flex-1 grid lg:grid-cols-2 gap-8 p-4 lg:p-12 rounded-lg justify-items-center">
        <form
          className="max-w-lg h-full w-full flex flex-col justify-evenly"
          onSubmit={handleSubmit(i.onSubmit)}
        >
          <motion.div className="flex flex-col gap-2">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-bold"
            >
              {i.title}
            </motion.h2>
            <motion.small
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 font-semibold"
            >
              {i.subtitle}
            </motion.small>
          </motion.div>

          <div className="flex flex-col gap-4 lg:gap-8">
            {i.inputConfigs.map((config, index) => (
              <Input
                key={index}
                config={config}
                register={register}
                errors={errors}
                index={index}
              />
            ))}
          </div>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            type="submit"
            className="bg-primary p-2 rounded-sm text-p text-white active:scale-98 hover:scale-102 transition-all"
          >
            {i.btnText}
          </motion.button>
        </form>

        <div className="hidden lg:block bg-background rounded-lg w-full">
          <Image src={i.imgSrc} alt="Sign up illustration" className="w-full" />
        </div>
      </div>
    </div>
  );
}
