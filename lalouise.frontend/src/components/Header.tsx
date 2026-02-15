"use client";
import logo from "@/assets/logo.svg";
import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
export default function Header() {
  return (
    <header className="bg-surface flex justify-between w-full h-15 items-center px-4 shadow-2xs">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex"
      >
        <Image src={logo} alt="Lalouise logo" className="w-40 -ml-6" priority />
      </motion.div>
      <div className="items-center flex gap-3">
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="active:scale-95"
        >
          <Link href={""}>
            <UserIcon className="w-5 text-gray-500" />
          </Link>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => console.log("saindo")}
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 text-secondary-light" />
        </motion.button>
      </div>
    </header>
  );
}
