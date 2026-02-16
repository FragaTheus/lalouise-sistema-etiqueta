"use client";

import LoginForm from "@/components/Form";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="grid grid-rows-6 max-w-lg h-full w-full">
      <motion.div
        id="logo-layout"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <Image
            src={logo}
            alt="Logo Lalouise"
            className="absolute -left-25 -top-10 w-50 md:w-60"
            priority
          />
        </div>
      </motion.div>

      <div id="form-layout" className="row-span-4 flex flex-col gap-4 md:gap-8">
        <motion.div
          id="title-layout"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold">Olá!</h1>
          <h1 className="mb-2 md:mb-4 text-2xl">
            É bom ter você por aqui novamente.
          </h1>
          <small className="opacity-70">
            Faça login para acessar mais recursos.
          </small>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <LoginForm />
        </motion.div>
      </div>

      <motion.div
        id="logo"
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="absolute flex flex-col bottom-0">
          <small className="opacity-70">Está com problemas para entrar?</small>
          <small className="opacity-70">
            Entre em contato com a administradora do sistema.
          </small>
        </div>
      </motion.div>
    </div>
  );
}
