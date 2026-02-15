"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function SearchBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group flex items-center w-full max-w-sm"
    >
      <div className="absolute left-3 pointer-events-none z-10">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110" />
      </div>

      <input
        type="text"
        placeholder="Buscar..."
        className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-primary-light outline-none transition-all focus:bg-background placeholder:text-small"
      />
    </motion.div>
  );
}
