"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input, IInputConfig } from "./Input";
import { login } from "@/api/auth.api";
import { ApiError } from "@/api/ApiError";
import { useAuthStore } from "@/store/UserStore";

type FormData = {
  email: string;
  password: string;
};

const loginConfigs: IInputConfig<FormData>[] = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Senha", type: "password" },
];

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setFormErrors([]);
    setLoading(true);

    try {
      const user = await login(data);
      setUser(user);
      await new Promise((resolve) => setTimeout(resolve, 100));
      user.role === "ADMIN"
        ? router.push("/painel")
        : router.push("/painel/etiquetas");
    } catch (err) {
      const error = err as ApiError<Record<string, string>>;

      if (error.data) {
        setFormErrors(Object.values(error.data));
      } else {
        setFormErrors([error.message]);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      {loginConfigs.map((config, i) => (
        <Input key={i} config={config} register={register} index={i} />
      ))}

      {formErrors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-1 text-sm text-red-500 bg-red-50 border border-red-200 rounded-sm p-2"
        >
          {formErrors.map((err, i) => (
            <span key={i}>{err}</span>
          ))}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white p-2 rounded-sm mt-4 md:mt-8 cursor-pointer hover:scale-101 active:scale-98 transition-all font-bold"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
