"use client";

import { motion } from "framer-motion";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function DrawerFooter() {
  const handleLogout = () => {
    console.log("Fazendo logoff do Lalouise System...");
  };

  return (
    <div className="w-full p-2">
      <motion.button
        onClick={handleLogout}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 p-3 w-full rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
      >
        <ArrowLeftStartOnRectangleIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />

        <span className="text-sm font-semibold">Sair do sistema</span>
      </motion.button>
    </div>
  );
}
